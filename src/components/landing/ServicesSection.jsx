import React from 'react';
import { motion } from 'framer-motion';
import { Search, Instagram, BarChart3, Target, Rocket, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'Google Ads',
    description: 'Campanhas de pesquisa, display e YouTube otimizadas para máxima conversão e menor custo por aquisição.',
    features: ['Search Ads', 'Display Network', 'YouTube Ads', 'Performance Max'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Instagram,
    title: 'Meta Ads',
    description: 'Estratégias avançadas para Facebook e Instagram que conectam sua marca ao público certo.',
    features: ['Feed & Stories', 'Reels Ads', 'Retargeting', 'Lookalike Audiences'],
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics & BI',
    description: 'Dashboards personalizados e análises profundas para tomada de decisão baseada em dados.',
    features: ['Google Analytics 4', 'Data Studio', 'Tracking Avançado', 'Relatórios'],
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    icon: Target,
    title: 'Estratégia Digital',
    description: 'Planejamento completo de mídia paga alinhado aos objetivos do seu negócio.',
    features: ['Funil de Vendas', 'Copywriting', 'Criativos', 'Testes A/B'],
    gradient: 'from-violet-500 to-purple-500',
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-32 bg-white overflow-hidden" id="servicos">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6">
            Nossos Serviços
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Soluções completas em <span className="block text-indigo-600">tráfego pago</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Estratégias personalizadas para cada etapa do seu funil de vendas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 md:p-10 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  {service.title}
                  <ArrowUpRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
            <Rocket className="w-5 h-5 text-indigo-600" />
            <span className="text-slate-700">
              Não sabe por onde começar?{' '}
              <a href="#contato" className="text-indigo-600 font-semibold ml-1 hover:underline">
                Fale com um especialista
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}