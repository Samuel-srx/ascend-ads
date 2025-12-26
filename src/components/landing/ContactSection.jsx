import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // reCAPTCHA
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Bloqueia bots
    if (!captchaToken) {
      alert('Confirme que você não é um robô.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    formData,
    recaptchaToken: captchaToken,
  }),
});


      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        alert('Erro ao enviar o formulário. Tente novamente.');
        setIsSubmitting(false);
        return;
      }

      // ✅ Sucesso
      setIsSubmitting(false);
      setIsSubmitted(true);

      // WhatsApp integration (abre depois do server confirmar)
      const message = `Olá! Sou ${formData.name} da empresa ${formData.company}. ${formData.message}. Investimento: ${formData.budget}. Contato: ${formData.email} | ${formData.phone}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/5511998483915?text=${encodedMessage}`, '_blank');

      // Reset captcha após enviar
      try {
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      } catch {}
    } catch (err) {
      console.error(err);
      alert('Falha de rede ao enviar. Verifique sua conexão e tente novamente.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden" id="contato">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6">
              Vamos conversar
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Pronto para{' '}
              <span className="block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                escalar?
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              Entre em contato e descubra como podemos transformar seus investimentos em ads em resultados reais para o seu negócio.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Telefone', value: '+55 11 99848-3915' },
                { icon: Mail, label: 'E-mail', value: 'ascendads0@gmail.com' },
                { icon: MapPin, label: 'Localização', value: '100% Digital - Atendimento Online' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <item.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-8 md:p-10 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-6">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Mensagem enviada!</h3>
                  <p className="text-slate-400">Entraremos em contato em até 24 horas úteis.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-slate-300 text-sm font-medium">
                        Nome
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-slate-300 text-sm font-medium">
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-slate-300 text-sm font-medium">
                        Telefone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-slate-300 text-sm font-medium">
                        Empresa
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Nome da empresa"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="block text-slate-300 text-sm font-medium">
                      Investimento mensal em Ads
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => handleChange('budget', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    >
                      <option value="">Selecione uma faixa</option>
                      <option value="300-1k">R$ 300 - R$ 1.000</option>
                      <option value="1k-3k">R$ 1.000 - R$ 3.000</option>
                      <option value="3k-5k">R$ 3.000 - R$ 5.000</option>
                      <option value="5k-10k">R$ 5.000 - R$ 10.000</option>
                      <option value="10k-plus">Acima de R$ 10.000</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-slate-300 text-sm font-medium">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      placeholder="Conte-nos sobre seu projeto e objetivos..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none"
                      required
                    />
                  </div>

                  {/* ✅ reCAPTCHA */}
                  <div className="pt-2">
                    {!SITE_KEY ? (
                      <p className="text-sm text-red-400">
                        Falta configurar a variável <b>VITE_RECAPTCHA_SITE_KEY</b> no arquivo <b>.env.local</b>.
                      </p>
                    ) : (
                      <ReCAPTCHA ref={recaptchaRef} sitekey={SITE_KEY} onChange={handleCaptchaChange} />
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !captchaToken || !SITE_KEY}
                    className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Enviar mensagem
                        <Send className="w-5 h-5" />
                      </span>
                    )}
                  </button>

                  <p className="text-xs text-slate-500">
                    Ao enviar, você confirma que não é um robô. (Protegido por reCAPTCHA)
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
