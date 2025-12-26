import crypto from "crypto";
import fetch from "node-fetch";


function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizePhone(phone) {
  // deixa só números. Ex: (11) 99848-3915 -> 11998483915
  return String(phone || "").replace(/\D/g, "");
}

function getClientIp(req) {
  // Vercel/Proxy: x-forwarded-for vem tipo "IP, IP, IP"
  const xff = req.headers["x-forwarded-for"];
  if (xff) return String(xff).split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

function parseCookie(headerCookie = "") {
  const out = {};
  headerCookie.split(";").forEach((part) => {
    const [k, ...v] = part.trim().split("=");
    if (!k) return;
    out[k] = decodeURIComponent(v.join("=") || "");
  });
  return out;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const body = req.body || {};
    const formData = body.formData || null;
    const recaptchaToken = body.recaptchaToken || body.captchaToken || null;

    // Dados extras vindos do front (vamos adicionar já já)
    const event_source_url = body.event_source_url || "";
    const event_id = body.event_id || "";
    const fbp = body.fbp || "";
    const fbc = body.fbc || "";

    if (!formData || !recaptchaToken) {
      return res.status(400).json({ ok: false, error: "missing_data" });
    }

    // ✅ 1) (Opcional, mas recomendado) Verificar reCAPTCHA no servidor
    const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY; // adicione no Vercel
    if (RECAPTCHA_SECRET) {
      const verifyRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: RECAPTCHA_SECRET,
            response: recaptchaToken,
          }),
        }
      );

      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return res.status(400).json({ ok: false, error: "recaptcha_failed" });
      }
    }

    // ✅ 2) Preparar dados pro Meta CAPI
    const META_PIXEL_ID = process.env.META_PIXEL_ID; // adicione no Vercel
    const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN; // adicione no Vercel
    const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || ""; // opcional (pra aba "Eventos de teste")

    if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
      // se faltar, ainda confirmamos recebimento do lead, mas avisamos
      return res.status(200).json({
        ok: true,
        warning: "meta_env_missing",
      });
    }

    const client_ip_address = getClientIp(req);
    const client_user_agent = req.headers["user-agent"] || "";

    // Cookies (se você quiser pegar _fbp/_fbc direto do cookie no server)
    const cookies = parseCookie(req.headers.cookie || "");
    const cookie_fbp = cookies._fbp || "";
    const cookie_fbc = cookies._fbc || "";

    const emailNorm = normalizeEmail(formData.email);
    const phoneNorm = normalizePhone(formData.phone);

    // ⚠️ Meta exige hash SHA-256 dos identificadores (email/telefone)
    const user_data = {
      client_ip_address,
      client_user_agent,
      // usa o que vier do front, senão tenta cookie do server
      fbp: fbp || cookie_fbp || undefined,
      fbc: fbc || cookie_fbc || undefined,
      em: emailNorm ? sha256(emailNorm) : undefined,
      ph: phoneNorm ? sha256(phoneNorm) : undefined,
    };

    // remove undefined
    Object.keys(user_data).forEach((k) => user_data[k] === undefined && delete user_data[k]);

    const now = Math.floor(Date.now() / 1000);

    // Evento LEAD (é o que você quer pro formulário)
    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: now,
          event_id: event_id || undefined, // deduplicação com pixel (se usar pixel)
          event_source_url: event_source_url || undefined,
          action_source: "website",
          user_data,
          custom_data: {
            currency: "BRL",
            // aqui você pode enviar info não-sensível (ex: budget, company)
            // NUNCA envie mensagem inteira ou dados sensíveis.
            content_name: "Contact Form",
          },
        },
      ],
      access_token: META_ACCESS_TOKEN,
      test_event_code: TEST_EVENT_CODE || undefined,
    };

    // remove undefined de cima
    if (!payload.test_event_code) delete payload.test_event_code;
    if (!payload.data[0].event_id) delete payload.data[0].event_id;
    if (!payload.data[0].event_source_url) delete payload.data[0].event_source_url;

    const metaRes = await fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const metaJson = await metaRes.json().catch(() => ({}));

    if (!metaRes.ok) {
      console.error("Meta CAPI error:", metaJson);
      // Ainda devolve ok=false pro front (pra você ver que falhou)
      return res.status(500).json({ ok: false, error: "meta_failed", meta: metaJson });
    }

    // ✅ sucesso total
    return res.status(200).json({ ok: true, meta: metaJson });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "server_error" });
  }
}
