import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Rocket, Zap, BarChart3 } from 'lucide-react';

const goals = [
  {
    icon: TrendingUp,
    title: 'Crescimento Exponencial',
    description: 'Nosso objetivo é escalar negócios de forma inteligente e sustentável, com foco em resultados mensuráveis.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    title: 'Estratégias Personalizadas',
    description: 'Cada negócio é único. Desenvolvemos estratégias sob medida alinhadas aos seus objetivos específicos.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: BarChart3,
    title: 'Decisões Baseadas em Dados',
    description: 'Utilizamos análises profundas e métricas precisas para otimizar cada centavo investido em ads.',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    icon: Rocket,
    title: 'Parcerias de Longo Prazo',
    description: 'Buscamos construir relacionamentos duradouros, crescendo junto com nossos clientes.',
    gradient: 'from-pink-500 to-rose-500',
  },
];

export default function ResultsSection() {
  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden" id="resultados">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6">
            Nossos Objetivos
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Prontos para criar{' '}
            <span className="block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              grandes resultados
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Somos uma agência recém-iniciada com visão de futuro. Estamos construindo nossa base de clientes e focados em entregar resultados excepcionais desde o primeiro dia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 md:p-10 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-indigo-500/30 transition-all">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${goal.gradient} mb-6`}>
                  <goal.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {goal.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-8 md:p-12 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/50 to-violet-950/50 backdrop-blur-sm text-center">
            <Zap className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Seja um dos nossos primeiros clientes
            </h3>
            
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Estamos oferecendo condições especiais para os primeiros parceiros que acreditarem no nosso trabalho. Vamos crescer juntos!
            </p>
            
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105"
            >
              Quero fazer parte
              <Rocket className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}