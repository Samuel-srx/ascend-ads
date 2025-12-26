import crypto from "crypto";


/**
 * Helpers
 */
function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return xff.split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

function parseCookies(cookie = "") {
  return cookie.split(";").reduce((acc, c) => {
    const [k, ...v] = c.trim().split("=");
    if (!k) return acc;
    acc[k] = decodeURIComponent(v.join("="));
    return acc;
  }, {});
}

/**
 * Handler
 */
export default async function handler(req, res) {

}

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    // 🔴 Vercel NÃO faz parse automático em todas configs
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { formData, recaptchaToken } = body || {};

    if (!formData || !recaptchaToken) {
      return res.status(400).json({ ok: false, error: "missing_data" });
    }

    /**
     * ENV
     */
    const META_PIXEL_ID = process.env.META_PIXEL_ID;
    const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
    const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

    if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
      return res.status(200).json({
        ok: true,
        warning: "meta_env_missing",
      });
    }

    /**
     * User data
     */
    const ip = getClientIp(req);
    const ua = req.headers["user-agent"] || "";
    const cookies = parseCookies(req.headers.cookie || "");

    const user_data = {
      client_ip_address: ip,
      client_user_agent: ua,
      em: formData.email ? sha256(normalizeEmail(formData.email)) : undefined,
      ph: formData.phone ? sha256(normalizePhone(formData.phone)) : undefined,
      fbp: cookies._fbp,
      fbc: cookies._fbc,
    };

    Object.keys(user_data).forEach(
      (k) => user_data[k] === undefined && delete user_data[k]
    );

    /**
     * Payload Meta
     */
    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          user_data,
        },
      ],
      access_token: META_ACCESS_TOKEN,
    };

    if (TEST_EVENT_CODE) {
      payload.test_event_code = TEST_EVENT_CODE;
    }

    /**
     * Send to Meta
     */
    const metaRes = await fetch(
      `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const metaJson = await metaRes.json();

    return res.status(200).json({
      ok: true,
      meta: metaJson,
    });

  } catch (err) {
    console.error("API /lead error:", err);
    return res.status(500).json({
      ok: false,
      error: "server_crash",
      message: err.message,
    });
  };