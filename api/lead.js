export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  const { formData, recaptchaToken } = req.body;

  if (!formData) {
    return res.status(400).json({ ok: false, error: "missing_form" });
  }

  // 🔥 EVENTO DE TESTE PARA O META
  const META_PIXEL_ID = process.env.META_PIXEL_ID;
  const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

  const event = {
    data: [
      {
        event_name: "Contact",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: "https://www.ascendads.com.br/#contato",
        test_event_code: "TEST88358", // 👈 SEU CÓDIGO DE TESTE
      },
    ],
  };

  try {
    await fetch(
      `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      }
    );
  } catch (err) {
    console.error("Erro ao enviar evento para o Meta:", err);
  }

  return res.status(200).json({ ok: true });
}
