import React, { useState } from 'react';
import { Provider, Service } from '../types';
import { Calendar as CalendarIcon, MapPin, ClipboardList, Clock, ArrowRight, CheckCircle } from 'lucide-react';

interface BookingViewProps {
  providers: Provider[];
  selectedProvider: Provider | null;
  onNavigate: (view: string) => void;
  onAddServiceToCheckout: (service: Service, provider: Provider) => void;
}

export const BookingView: React.FC<BookingViewProps> = ({
  providers,
  selectedProvider,
  onNavigate,
  onAddServiceToCheckout
}) => {
  const currentProvider = selectedProvider || providers[0];
  const [selectedService, setSelectedService] = useState<Service>(currentProvider.services[0]);
  const [selectedDay, setSelectedDay] = useState<number | null>(14);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const timeSlots = [
    { time: '08:00', available: false },
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '14:05', available: true },
    { time: '15:30', available: true },
    { time: '17:00', available: true }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert('Por favor, digite seu endereço completo.');
      return;
    }
    // Add selected service to checkout & transfer there
    onAddServiceToCheckout(selectedService, currentProvider);
  };

  return (
    <div className="flex-1 overflow-y-auto max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-2">Agendar Serviço</h2>
        <p className="text-sm text-slate-500">Solicite atendimento rápido com {currentProvider.name}.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#eff4ff] shadow-sm p-6 md:p-8 space-y-6">
        
        {/* Service Type Category Picker */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-800 font-bold border-b pb-2">
            <ClipboardList className="text-pink-600" size={18} />
            <h3 className="text-sm uppercase tracking-wider">Escolha o Serviço</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentProvider.services.map((service) => (
              <label 
                key={service.id}
                className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedService.id === service.id 
                    ? 'border-pink-600 bg-pink-50' 
                    : 'border-slate-100 bg-[#f8f9ff] hover:bg-slate-50'
                }`}
                onClick={() => setSelectedService(service)}
              >
                <span className="font-bold text-slate-800 text-xs">{service.name}</span>
                <span className="text-[10px] text-slate-500 mt-1">{service.description}</span>
                <span className="text-xs font-bold text-pink-600 mt-2">R$ {service.price.toFixed(2)}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Date and Time slots picker */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold border-b pb-2">
            <CalendarIcon className="text-pink-600" size={18} />
            <h3 className="text-sm uppercase tracking-wider">Data e Horário</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Visual Calendar */}
            <div className="bg-[#f8f9ff] p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <button type="button" className="text-slate-400 hover:text-slate-600">◀</button>
                <span className="font-bold text-xs text-slate-700">Outubro 2026</span>
                <button type="button" className="text-slate-400 hover:text-slate-600">▶</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2 border-b pb-1">
                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-700">
                {[...Array(5)].map((_, i) => (
                  <span key={`empty-${i}`} className="text-slate-300"></span>
                ))}
                {[...Array(20)].map((_, i) => {
                  const day = i + 1;
                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`p-1.5 rounded-full text-center transition-all ${
                        isSelected 
                          ? 'bg-pink-600 text-white font-bold shadow-md shadow-pink-100' 
                          : 'hover:bg-pink-100 text-slate-700'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                <Clock size={12} className="text-pink-600" />
                Horários Disponíveis para dia {selectedDay} de Outubro:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => {
                      if (slot.available) setSelectedTimeSlot(slot.time);
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs font-semibold text-center transition-all ${
                      !slot.available 
                        ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 line-through border-transparent' 
                        : selectedTimeSlot === slot.time
                          ? 'border-pink-600 bg-pink-100 text-primary font-bold shadow-sm'
                          : 'border-outline-variant bg-surface hover:bg-surface-container transition-colors text-on-surface'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form Fields */}
        <section className="space-y-4 pt-4 border-t border-[#eff4ff]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-pink-600">📍</span>
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-800">Endereço & Detalhes</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="address">Endereço Completo</label>
              <input 
                id="address"
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, Número, Bairro, Cidade"
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent py-2.5 px-4 text-xs font-medium text-[#0b1c30] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="description">Descrição das Necessidades</label>
              <textarea 
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva brevemente o que você precisa..."
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent py-2.5 px-4 text-xs font-medium text-[#0b1c30] transition-all resize-none"
              />
            </div>
          </div>
        </section>

        {/* Summary box and action */}
        <section className="bg-pink-50 rounded-2xl border border-pink-100 p-5 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="text-[10px] text-pink-700 uppercase tracking-wide font-bold">Resumo Estimado</h4>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-pink-600">R$ {selectedService.price.toFixed(2)}</span>
              <span className="text-xs text-slate-500">/ sessão {selectedService.perTime ? `(${selectedService.perTime})` : ''}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
              <CheckCircle size={10} className="text-emerald-500" />
              Ambiente verificado, pagamento seguro.
            </p>
          </div>
          <button 
            type="submit"
            className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-md shadow-pink-100 hover:shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            Solicitar Agendamento
            <ArrowRight size={18} />
          </button>
        </section>

      </form>
    </div>
  );
};
