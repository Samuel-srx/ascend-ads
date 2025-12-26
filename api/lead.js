import crypto from "crypto";

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function norm(str) {
  return String(str || "").trim().toLowerCase();
}

function normPhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return String(xff).split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

function parseCookies(cookie = "") {
  return cookie.split(";").reduce((acc, part) => {
    const [k, ...v] = part.trim().split("=");
    if (!k) return acc;
    acc[k] = decodeURIComponent(v.join("="));
    return acc;
  }, {});
}

function splitName(fullName = "") {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  const first = parts[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  return { first, last };
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    // ✅ Garantir parse
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

    const { formData, recaptchaToken, event_id, event_source_url, fbp, fbc } = body;

    if (!formData || !recaptchaToken) {
      return res.status(400).json({ ok: false, error: "missing_data" });
    }

    // (Opcional) validar reCAPTCHA no server
    const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
    if (RECAPTCHA_SECRET) {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET,
          response: recaptchaToken,
        }),
      });

      const verifyJson = await verifyRes.json().catch(() => ({}));
      if (!verifyJson.success) {
        return res.status(400).json({ ok: false, error: "recaptcha_failed" });
      }
    }

    const META_PIXEL_ID = process.env.META_PIXEL_ID;
    const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
    const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || "";

    // Se você quiser “só aceitar lead” mesmo sem Meta:
    if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
      return res.status(200).json({ ok: true, warning: "meta_env_missing" });
    }

    const ip = getClientIp(req);
    const ua = req.headers["user-agent"] || "";
    const cookies = parseCookies(req.headers.cookie || "");

    const email = norm(formData.email);
    const phone = normPhone(formData.phone);
    const { first, last } = splitName(formData.name);

    // ✅ user_data: use arrays (Meta aceita e evita inconsistência)
    const user_data = {
      client_ip_address: ip,
      client_user_agent: ua,

      // cookies do pixel (se existirem)
      fbp: fbp || cookies._fbp || undefined,
      fbc: fbc || cookies._fbc || undefined,

      // identificadores (HASH)
      em: email ? [sha256(email)] : undefined,
      ph: phone ? [sha256(phone)] : undefined,
      fn: first ? [sha256(norm(first))] : undefined,
      ln: last ? [sha256(norm(last))] : undefined,
    };

    // remove undefined
    Object.keys(user_data).forEach((k) => user_data[k] === undefined && delete user_data[k]);

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: event_id || undefined,
          event_source_url: event_source_url || undefined,
          user_data,
        },
      ],
      access_token: META_ACCESS_TOKEN,
    };

    if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

    // limpa undefined
    if (!payload.data[0].event_id) delete payload.data[0].event_id;
    if (!payload.data[0].event_source_url) delete payload.data[0].event_source_url;

    const metaRes = await fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const metaJson = await metaRes.json().catch(() => ({}));

    if (!metaRes.ok) {
      return res.status(500).json({ ok: false, error: "meta_failed", meta: metaJson });
    }

    return res.status(200).json({ ok: true, meta: metaJson });
  } catch (err) {
    console.error("API /lead error:", err);
    return res.status(500).json({ ok: false, error: "server_crash", message: err?.message });
  }
}
