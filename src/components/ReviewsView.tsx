import React from 'react';
import { Review } from '../types';
import { Star, ShieldAlert, Award, MessageCircle, BarChart2 } from 'lucide-react';

interface ReviewsViewProps {
  reviews: Review[];
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ reviews }) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Avaliações da Equipe</h1>
        <p className="text-xs text-slate-500">Monitore as opiniões e notas da comunidade em relação ao atendimento de cada integrante.</p>
      </div>

      {/* Structured metrics breakdown block */}
      <section className="bg-white rounded-3xl border border-[#eff4ff] p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Score card */}
        <div className="text-center md:border-r border-slate-100 py-3">
          <span className="text-4xl font-black text-slate-800">4.9</span>
          <span className="text-sm font-semibold text-slate-400 block mt-1">Nota Geral Acumulada</span>
          <div className="flex justify-center gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
            ))}
          </div>
          <span className="text-[10px] text-slate-450 mt-1 block">Brilho Perfeito Limpezas</span>
        </div>

        {/* Quality categories level bars */}
        <div className="space-y-3 md:col-span-2">
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Pontualidade</span>
              <span className="text-purple-700">98% excelente</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-purple-700 h-full rounded-full" style={{ width: '98%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Simpatia & Gentileza</span>
              <span className="text-purple-700">95% excelente</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-purple-700 h-full rounded-full" style={{ width: '95%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Qualidade do Serviço</span>
              <span className="text-purple-700">100% excelente</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-purple-700 h-full rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Review wall wall listing */}
      <section className="space-y-4">
        <h3 className="font-extrabold text-slate-800 text-sm">Mural de Comentários de Clientes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white rounded-3xl border border-[#eff4ff] p-5 shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-50 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-pink-100 font-bold text-xs text-pink-700 flex items-center justify-center shrink-0">
                      {rev.author[0]}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0b1c30] text-xs">{rev.author}</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">{rev.daysAgo}</p>
                    </div>
                  </div>

                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className={`${i < Math.floor(rev.rating) ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`} />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-650 leading-relaxed italic mt-4">
                  "{rev.text}"
                </p>
              </div>

              {rev.targetMember && (
                <div className="pt-3 border-t border-slate-50 mt-4 flex items-center justify-between">
                  <span className="text-[9px] text-slate-400 capitalize">Membro avaliado</span>
                  <span className="text-[9px] bg-purple-50 text-purple-800 border border-purple-100 px-2 py-0.5 rounded-full font-bold">
                    {rev.targetMember}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
