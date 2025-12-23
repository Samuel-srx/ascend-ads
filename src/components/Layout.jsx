import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Menu, X } from 'lucide-react';

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navegação */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
<a href="/" className="flex items-center gap-3 group">
  <img 
    src="/logo.png" 
    alt="Ascend Ads Logo" 
    className="w-12 h-12 object-contain"
  />
  <div>
    <span className="text-2xl font-bold text-white block leading-tight">ASCEND</span>
    <span className="text-sm text-indigo-300 font-medium block leading-tight uppercase tracking-wider">Performance Ads</span>
  </div>
</a>

            {/* Navegação Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-300 hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-full px-6 py-2"
              >
                Fale conosco
              </a>
            </div>

            {/* Botão do Menu Mobile */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-t border-slate-800"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contato"
                  className="block w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-full py-3 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fale conosco
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Conteúdo principal */}
      <main className="pt-20">{children}</main>
    </div>
  );
}