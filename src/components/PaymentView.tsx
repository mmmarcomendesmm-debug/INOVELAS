import React, { useState, useEffect } from 'react';
import { Clipboard, Check, RefreshCw, Smartphone } from 'lucide-react';

interface PaymentViewProps {
  totalAmount: number;
  onPaymentSuccess: () => void;
  onNavigate: (view: string) => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  totalAmount,
  onPaymentSuccess,
  onNavigate
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [paymentDone, setPaymentDone] = useState(false);

  // Mock code PIX
  const pixCode = "00020101021226870014br.gov.bcb.pix2565pix.itau.com.br/qr/v2/448cda66-5085-48b4-a6bc-e2ec9b057fc505bc55039865204000053039865802BR5925InovElas Tecnologia Ltda6009Sao Paulo62070503***6304CA4D";

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verifyPayment = () => {
    setPaymentDone(true);
    setTimeout(() => {
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-[#eff4ff] shadow-sm p-6 md:p-8 space-y-6">
        
        {/* Top Header */}
        <div className="text-center">
          <span className="text-[10px] bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Pague com PIX
          </span>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mt-3">Finalizar Contratação</h2>
          <p className="text-xs text-slate-500 mt-1">O seu serviço de consultoria ou manutenção será agendado imediatamente após o pagamento.</p>
        </div>

        {/* Dynamic Price */}
        <div className="bg-[#f8f9ff] rounded-2xl p-5 border border-slate-100 flex justify-between items-center text-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Total a pagar</span>
            <p className="text-2xl font-black text-pink-600 mt-1">R$ {totalAmount.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">Vence em</span>
            <span className="font-mono text-sm font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100 inline-block mt-1">
              ⌛ {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* QR Code and Mobile Step-by-Step Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
          
          {/* QR Code frame mockup */}
          <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-inner">
            <div className="bg-white p-4 rounded-xl shadow-md border-4 border-pink-100 relative group overflow-hidden">
              {/* QR Code Scanner Overlay Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-bounce" />
              
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9C7P2H6j8fM0a6H8vU0L5F6H8fM0a6H8fM0a6H8fM0a6H8fM0a6H8f" 
                alt="PIX QR Code" 
                className="w-40 h-40 object-cover"
                onError={(e) => {
                  // Fallback to high-quality SVG/mock QR representation because this URL might fail
                  (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pixCode)}`;
                }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-3 font-semibold flex items-center gap-1">
              <Smartphone size={12} className="text-pink-600" />
              Abra o app do seu banco e escaneie
            </span>
          </div>

          {/* Copiar e colar instructions */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Ou pague via Pix Copia e Cola:</h4>
            
            <div className="bg-[#f8f9ff] p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] text-slate-500 truncate max-w-[180px] break-all select-all">
                {pixCode}
              </p>
              <button 
                onClick={handleCopyCode}
                className="bg-white hover:bg-pink-50 border border-slate-200 text-slate-600 hover:text-pink-600 p-2 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Copiar código"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Clipboard size={14} />}
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-500">
              <p className="flex items-start gap-2">
                <span className="bg-pink-100 text-pink-700 font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0 text-[10px]">1</span>
                <span>Copie o código PIX acima clicando no botão.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="bg-pink-100 text-pink-700 font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0 text-[10px]">2</span>
                <span>Cole no campo "Copia e Cola" do aplicativo bancário.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="bg-pink-100 text-pink-700 font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0 text-[10px]">3</span>
                <span>Revise e confirme a transação em nome da InovElas.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Verification Check triggers */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button 
            type="button"
            onClick={() => onNavigate('checkout')}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ◀ Voltar ao carrinho
          </button>
          
          <button 
            type="button"
            onClick={verifyPayment}
            disabled={paymentDone}
            className={`w-full sm:w-auto font-extrabold py-3.5 px-8 rounded-xl transition-all flex items-center justify-center gap-2 text-xs cursor-pointer shadow-sm ${
              paymentDone 
                ? 'bg-emerald-600 text-white' 
                : 'bg-[#0b1c30] text-white hover:bg-pink-600'
            }`}
          >
            {paymentDone ? (
              <>
                <Check size={16} className="animate-ping" />
                Pagamento confirmado! Redirecionando...
              </>
            ) : (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Já paguei, confirmar transferência
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
