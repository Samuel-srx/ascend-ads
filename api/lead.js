export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const body = req.body || {};
  const formData = body.formData;
  const token = body.recaptchaToken || body.captchaToken; // aceita os dois

  if (!formData || !token) {
    return res.status(400).json({ ok: false, error: "missing_data" });
  }

  // Por enquanto só confirma recebimento
  return res.status(200).json({ ok: true });
}
