import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Fundo gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
      
      {/* Bolhas animadas */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8"
          >
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300 font-medium">
              Começando nossa jornada de crescimento
            </span>
          </motion.div>

          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            <span className="block">Escale seus</span>
            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              resultados
            </span>
          </h1>

          {/* Descrição */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Tráfego pago e publicidade digital focados em crescimento estratégico.
            Transformamos investimento em ads em retorno real para o seu negócio.
          </p>

          {/* Botões CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contato"
              className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white px-8 py-4 text-lg rounded-full shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 flex items-center"
            >
              Quero escalar meu negócio
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#resultados"
              className="text-slate-300 hover:text-white hover:bg-white/5 px-8 py-4 text-lg rounded-full border border-slate-700"
            >
              Ver resultados
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}