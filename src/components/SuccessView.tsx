import React from 'react';
import { Check, Calendar, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';

interface SuccessViewProps {
  totalPaid: number;
  onNavigate: (view: string) => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  totalPaid,
  onNavigate
}) => {
  const currentDate = new Date();
  const dateFormatted = currentDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const orderCode = 'IE-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="flex-1 overflow-y-auto max-w-2xl mx-auto pt-8">
      <div className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-6 sm:p-10 text-center relative overflow-hidden">
        
        {/* Confetti/Success background shape overlay */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-pink-100/50 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -right-12 w-45 h-45 bg-purple-100/35 rounded-full blur-3xl animate-pulse" />

        {/* Success badge anim */}
        <div className="relative z-10 w-20 h-20 bg-emerald-100 border-4 border-emerald-50 rounded-full mx-auto flex items-center justify-center mb-6 shadow-sm shadow-emerald-50">
          <Check className="text-emerald-600 stroke-[3]" size={36} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          Pagamento Confirmado!
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
          Prontinho! O seu pagamento foi processado com sucesso. A empreendedora já foi notificada para iniciar os preparativos do serviço.
        </p>

        {/* Info Order Code Card */}
        <div className="bg-[#f8f9ff] rounded-2xl p-5 border border-slate-100 max-w-lg mx-auto text-left space-y-4 mb-8">
          <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Código do pedido</span>
              <p className="font-mono text-sm font-bold text-slate-700 mt-0.5">{orderCode}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Data de conf.</span>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">{dateFormatted}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400">Método de pagamento</span>
              <p className="font-bold text-emerald-600 mt-0.5">⚡ PIX Instantâneo</p>
            </div>
            <div>
              <span className="text-slate-400">Valor transferido</span>
              <p className="font-extrabold text-slate-800 mt-0.5">R$ {totalPaid.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Helpful alert */}
        <div className="bg-pink-50 rounded-xl border border-pink-100 p-4 max-w-lg mx-auto flex items-start gap-3 text-left text-xs mb-8">
          <AlertCircle className="text-pink-600 shrink-0 mt-0.5" size={16} />
          <p className="text-slate-600 leading-relaxed">
            Você receberá avisos em tempo real sempre que a equipe alterar o andamento ou se deslocar para o local. Em caso de dúvidas, utilize o chat direto de suporte.
          </p>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
          <button 
            type="button"
            onClick={() => onNavigate('chat')}
            className="flex-1 border border-pink-300 hover:bg-pink-50 text-pink-700 font-extrabold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare size={14} />
            Mandar mensagem profissional
          </button>
          
          <button 
            type="button"
            onClick={() => onNavigate('explore')}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-extrabold py-3 rounded-xl text-xs transition-all shadow-md shadow-pink-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            Voltar para Início
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
