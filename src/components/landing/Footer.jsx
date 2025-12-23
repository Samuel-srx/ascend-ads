import React from 'react';
import { TrendingUp, Facebook } from 'lucide-react';  // Remova Instagram, Linkedin, Youtube

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Ascend Ads</span>
            </div>
            
            <p className="text-slate-400 mb-6 max-w-sm">
              Tráfego pago e publicidade digital focados em crescimento estratégico. Transformamos investimento em resultados.
            </p>
            
            <div className="flex gap-4">
  <a
    href="https://www.facebook.com/share/1Brfzr5NVU/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook da Ascend Ads"
    className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 transition-colors"
  >
    <Facebook className="w-5 h-5" />
  </a>
</div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links rápidos</h4>
            <ul className="space-y-3">
              {['Serviços', 'Resultados', 'Sobre', 'Blog', 'Contato'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Serviços</h4>
            <ul className="space-y-3">
              {['Google Ads', 'Meta Ads', 'Analytics', 'Estratégia Digital', 'Consultoria'].map((service) => (
                <li key={service}>
                  <a
                    href="#servicos"
                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Ascend Ads. Todos os direitos reservados.
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-slate-400 transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-400 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}