import React, { useState } from 'react';
import { Appointment } from '../types';
import { Clock, Phone, Mail, MapPin, CheckCircle, ArrowLeft, MessageSquare, AlertTriangle, FileText } from 'lucide-react';

interface AppointmentDetailViewProps {
  appointment: Appointment | null;
  onNavigate: (view: string) => void;
  onUpdateStatus: (id: string, newStatus: 'pending' | 'in_progress' | 'completed' | 'delayed', notes?: string) => void;
}

export const AppointmentDetailView: React.FC<AppointmentDetailViewProps> = ({
  appointment,
  onNavigate,
  onUpdateStatus
}) => {
  const [internalNotes, setInternalNotes] = useState(appointment?.notes || '');
  const [savedNotesMessage, setSavedNotesMessage] = useState(false);

  if (!appointment) {
    return (
      <div className="text-center p-8 bg-white border rounded-2xl max-w-md mx-auto">
        <p className="text-slate-500 text-sm">Selecione um agendamento na agenda.</p>
        <button onClick={() => onNavigate('calendar')} className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Agenda</button>
      </div>
    );
  }

  const handleSaveNotes = () => {
    onUpdateStatus(appointment.id, appointment.status, internalNotes);
    setSavedNotesMessage(true);
    setTimeout(() => setSavedNotesMessage(false), 2000);
  };

  const handleMarkComplete = () => {
    onUpdateStatus(appointment.id, 'completed', internalNotes);
  };

  const isDelayed = appointment.status === 'delayed' || appointment.warning;

  return (
    <div className="flex-1 overflow-y-auto space-y-6 max-w-4xl mx-auto">
      {/* Back to calendar button */}
      <button 
        onClick={() => onNavigate('calendar')}
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-700 font-bold cursor-pointer"
      >
        <ArrowLeft size={14} /> Voltar para a Agenda
      </button>

      {/* Warning alert if critical status */}
      {isDelayed && (
        <div className="bg-[#fff9e6] border border-amber-250 p-4 rounded-xl flex gap-3 text-slate-800 items-start">
          <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wide">Atraso Limite ou Alerta Ativado</h4>
            <p className="text-xs text-slate-600 mt-1">Este serviço necessita de conclusão urgente até às 15:30. Garanta o preenchimento de todas as notas internas e do relatório financeiro.</p>
          </div>
        </div>
      )}

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left main card element */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-6 space-y-6">
            
            {/* Upper profile information row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <img 
                  src={appointment.clientPhoto} 
                  alt={appointment.clientName} 
                  className="w-16 h-16 rounded-full object-cover border" 
                />
                <div>
                  <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 uppercase tracking-wider">
                    {appointment.category}
                  </span>
                  <h2 className="text-lg font-black text-slate-800 tracking-tight mt-1">{appointment.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Identificador do Agendamento: <span className="font-mono font-bold text-slate-700">{appointment.id}</span></p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 capitalize">Valor</span>
                <p className="font-extrabold text-slate-900 text-lg">R$ {appointment.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Client address & phone contacts block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#f8f9ff] rounded-2xl border border-slate-100 flex items-start gap-3">
                <MapPin className="text-purple-700 shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Endereço de Atendimento</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{appointment.locationDesc}</p>
                </div>
              </div>

              <div className="p-4 bg-[#f8f9ff] rounded-2xl border border-slate-100 flex items-start gap-3 justify-between">
                <div className="flex items-start gap-3">
                  <Phone className="text-purple-700 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">Contatos da Cliente</h4>
                    <p className="text-xs text-slate-500 mt-1">{appointment.clientPhone}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{appointment.clientEmail}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => onNavigate('chat')}
                  className="bg-purple-100 text-purple-700 p-2 rounded-xl hover:bg-purple-200 transition-colors cursor-pointer"
                  title="Abrir Chat"
                >
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>

            {/* Internal Notes area */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-slate-800 font-bold border-b pb-2">
                <FileText className="text-purple-700" size={16} />
                <h3 className="text-xs uppercase tracking-wider">Notas Internas & Relatório</h3>
              </div>
              <textarea 
                rows={4}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Insira notas técnicas do atendimento, particularidades da casa, produtos utilizados ou pendências..."
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent py-2.5 px-4 text-xs font-medium text-[#0b1c30] transition-all resize-none"
              />
              <div className="flex justify-between items-center">
                {savedNotesMessage ? (
                  <span className="text-emerald-600 text-xs font-semibold">✔ Anotações salvas localmente!</span>
                ) : <span />}
                <button 
                  type="button" 
                  onClick={handleSaveNotes}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold text-xs px-4  py-2 rounded-xl transition-all cursor-pointer"
                >
                  Salvar Notas
                </button>
              </div>
            </div>

          </section>
        </div>

        {/* Right sidebar: timeline log tracker & appointment status manager */}
        <div className="space-y-6">
          <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-5 space-y-6">
            <h3 className="font-extrabold text-slate-800 text-sm">Controle de Status</h3>

            {/* Current status display card */}
            <div className="p-3 rounded-2xl bg-[#f8f9ff] border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 capitalize block">Status Atual</span>
              <span className="font-black text-purple-800 text-sm mt-1 block uppercase tracking-wider">
                {appointment.status === 'in_progress' ? '⚡ Em Andamento' : appointment.status === 'completed' ? '✔ Concluído' : '⌛ Pendente'}
              </span>
            </div>

            {/* CTAs to change status */}
            <div className="space-y-2">
              {appointment.status === 'pending' && (
                <button 
                  onClick={() => onUpdateStatus(appointment.id, 'in_progress', internalNotes)}
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-xl text-xs transition-all cursor-pointer shadow-sm shadow-purple-50"
                >
                  Iniciar Atendimento Hoje
                </button>
              )}
              {appointment.status !== 'completed' && (
                <button 
                  onClick={handleMarkComplete}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-50"
                >
                  <CheckCircle size={16} /> Finalizar e Registrar
                </button>
              )}
              {appointment.status !== 'completed' && appointment.status !== 'delayed' && (
                <button 
                  onClick={() => onUpdateStatus(appointment.id, 'delayed', internalNotes)}
                  className="w-full border border-red-200 hover:bg-red-50 text-red-700 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Sinalizar Atraso / Ajustar Agenda
                </button>
              )}
            </div>
          </section>

          {/* Timeline Tracking */}
          <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-5">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Registro Histórico de Ações</h3>
            <div className="space-y-4 relative before:absolute before:top-2 before:left-3.5 before:w-0.5 before:h-[calc(100%-16px)] before:bg-purple-100 pb-2">
              {appointment.timeline.map((act, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  <div className={`w-7- h-7 bg-white border-2 rounded-full flex items-center justify-center shrink-0 z-10 w-7 h-7 text-xs ${idx === appointment.timeline.length - 1 ? 'border-purple-600 text-purple-700 font-bold' : 'border-slate-200 text-slate-400'}`}>
                    o
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">{act.title}</h5>
                    <p className="text-[10px] text-slate-400">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};
