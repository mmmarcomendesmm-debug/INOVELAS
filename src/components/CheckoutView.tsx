import React, { useState } from 'react';
import { Service, Provider } from '../types';
import { ShoppingBag, ChevronRight, CheckCircle, Tag, AlertCircle } from 'lucide-react';

interface CheckoutViewProps {
  checkoutItem: { service: Service; provider: Provider } | null;
  onNavigate: (view: string) => void;
  onConfirmOrder: (finalTotal: number) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  checkoutItem,
  onNavigate,
  onConfirmOrder
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  if (!checkoutItem) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white rounded-2xl border text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-4 text-3xl">🛒</div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Seu carrinho está vazio</h2>
        <p className="text-sm text-slate-500 mb-6">Explore o nosso catálogo para selecionar serviços de profissionais qualificadas.</p>
        <button 
          onClick={() => onNavigate('explore')}
          className="bg-pink-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-pink-700 transition-colors"
        >
          Explorar Serviços
        </button>
      </div>
    );
  }

  const { service, provider } = checkoutItem;
  const subtotal = service.price;
  const serviceFee = 15.00;
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'INOVELAS10') {
      setAppliedCoupon('INOVELAS10');
      setDiscount(subtotal * 0.10); // 10% discount
    } else {
      alert('Cupom inválido. Tente usar INOVELAS10');
    }
  };

  const finalTotal = subtotal + serviceFee - discount;

  return (
    <div className="flex-1 overflow-y-auto max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-2 text-slate-500 text-sm">
        <span>Sacola</span>
        <ChevronRight size={14} />
        <span className="text-pink-600 font-bold">Identificação & Pagamento</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left main: review items */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl p-6 border border-[#eff4ff] shadow-sm">
            <h2 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
              <ShoppingBag className="text-pink-600" size={18} />
              Revisar Detalhes do Serviço
            </h2>

            {/* Provider and Service details row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#f8f9ff] rounded-2xl border border-slate-100">
              <img 
                src={provider.photo} 
                alt={provider.name} 
                className="w-16 h-16 rounded-xl object-cover" 
              />
              <div className="flex-grow">
                <span className="text-[10px] bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full font-bold">
                  {provider.category}
                </span>
                <h3 className="font-bold text-slate-800 text-sm mt-1">{service.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Profissional parceira: <span className="font-semibold text-slate-700">{provider.name}</span></p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Preço</span>
                <p className="font-bold text-slate-800 text-base">R$ {service.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Inclusões/Garantias list */}
            <div className="mt-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Incluso na contratação:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <span className="flex items-center gap-2">✔ Suporte e mediação de conflitos InovElas</span>
                <span className="flex items-center gap-2">✔ Proteção contra danos acidentais</span>
                <span className="flex items-center gap-2">✔ Profissional qualificada e verificada</span>
                <span className="flex items-center gap-2">✔ Facilidade de pagamento via PIX ou Cartão</span>
              </div>
            </div>
          </section>

          {/* Cupom section */}
          <section className="bg-white rounded-2xl p-6 border border-[#eff4ff] shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Tag className="text-pink-600" size={16} />
              Tem um cupom de desconto?
            </h2>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input 
                type="text" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Insira o cupom (dica: INOVELAS10)" 
                className="flex-grow bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent py-2 px-4 text-xs font-semibold text-[#0b1c30] transition-all"
              />
              <button 
                type="submit" 
                className="bg-slate-100 hover:bg-pink-600 text-slate-700 hover:text-white border border-slate-200 hover:border-pink-600 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Aplicar
              </button>
            </form>
            {appliedCoupon && (
              <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                ✔ Cupom INOVELAS10 aplicado com sucesso! (10% de desconto)
              </p>
            )}
          </section>
        </div>

        {/* Right side: Payment summary panel */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl p-6 border border-[#eff4ff] shadow-sm">
            <h2 className="text-base font-bold text-slate-800 mb-5 pb-3 border-b border-slate-50">
              Resumo do Pedido
            </h2>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa da plataforma</span>
                <span>R$ {serviceFee.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Desconto Cupom</span>
                  <span>- R$ {discount.toFixed(2)}</span>
                </div>
              )}
              <div className="h-px bg-slate-100 my-2" />
              <div className="flex justify-between items-baseline font-bold text-slate-850">
                <span className="text-sm">Total final</span>
                <span className="text-xl text-pink-600">R$ {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button 
                onClick={() => onConfirmOrder(finalTotal)}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md shadow-pink-100 hover:shadow-lg hover:shadow-pink-200 text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Ir para o Pagamento
                <ChevronRight size={16} />
              </button>
              <button 
                onClick={() => onNavigate('explore')}
                className="w-full border border-slate-200 text-slate-500 font-semibold py-2.5 rounded-xl text-xs text-center hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Escolher outro serviço
              </button>
            </div>

            <p className="text-[10px] text-slate-400 mt-4 text-center flex items-center justify-center gap-1">
              <AlertCircle size={12} className="text-pink-600" />
              Checkout blindado contra vazamento de dados.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};
