export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const body = req.body || {};
  const formData = body.formData;
  const token = body.recaptchaToken || body.captchaToken;

  if (!formData || !token) {
    return res.status(400).json({ ok: false, error: "missing_data" });
  }

  // =========================
  // 1) Monta evento (Lead)
  // =========================
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return res.status(500).json({
      ok: false,
      error: "missing_meta_env",
      message: "Configure META_PIXEL_ID e META_ACCESS_TOKEN no .env.local",
    });
  }

  // Hora atual em UNIX (segundos)
  const event_time = Math.floor(Date.now() / 1000);

  // URL do evento (origem) - se você tiver o domínio, coloque fixo aqui
  const event_source_url = req.headers?.referer || "https://www.ascendads.com.br/contato";

  // IP e User-Agent ajudam MUITO na correspondência
  const client_ip_address =
    (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "";

  const client_user_agent = req.headers["user-agent"] || "";

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time,
        action_source: "website",
        event_source_url,

        user_data: {
          client_ip_address,
          client_user_agent,

          // Se você quiser melhorar match, depois dá pra colocar email/phone HASHEADO
          // por enquanto vamos no básico + IP/UA
        },

        custom_data: {
          content_name: "Contato - Formulário",
          // opcional: passar infos do form
          // company: formData.company,
          // budget: formData.budget,
        },
      },
    ],
  };

  // =========================
  // 2) Envia pro Meta CAPI
  // =========================
  try {
    const url = `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`;

    const metaRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const metaJson = await metaRes.json().catch(() => ({}));

    if (!metaRes.ok) {
      console.error("Meta CAPI error:", metaJson);
      return res.status(500).json({ ok: false, error: "meta_failed", meta: metaJson });
    }

    // ✅ Retorna sucesso
    return res.status(200).json({ ok: true, meta: metaJson });
  } catch (err) {
    console.error("Meta CAPI request failed:", err);
    return res.status(500).json({ ok: false, error: "meta_request_failed" });
  }
}
