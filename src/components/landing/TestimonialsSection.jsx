import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Users, Heart } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6">
            Depoimentos
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Construindo nossa <span className="block text-indigo-600">história juntos</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Estamos no início da nossa jornada. Os depoimentos dos nossos futuros clientes aparecerão aqui em breve!
          </p>
        </motion.div>

        {/* Empty state with promise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-12 md:p-16 rounded-3xl border-2 border-dashed border-slate-300 bg-white/50 backdrop-blur-sm text-center">
            <div className="flex justify-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-indigo-50">
                <MessageSquare className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="p-4 rounded-2xl bg-violet-50">
                <Star className="w-8 h-8 text-violet-600" />
              </div>
              <div className="p-4 rounded-2xl bg-purple-50">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Seu depoimento pode ser o primeiro!
            </h3>
            
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Somos uma agência recém-criada, ansiosos para construir histórias de sucesso com nossos clientes. Seja um dos primeiros a fazer parte dessa jornada.
            </p>
            
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
              <Users className="w-5 h-5 text-indigo-600" />
              <span className="text-slate-700">
                <strong className="text-indigo-600 font-semibold">0 clientes atendidos</strong> até agora. Você será o próximo?
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}