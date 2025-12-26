export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { formData, recaptchaToken } = req.body || {};

  if (!formData || !recaptchaToken) {
    return res.status(400).json({ ok: false, error: "missing_data" });
  }

  // Por enquanto só confirma recebimento
  return res.status(200).json({ ok: true });
}
