import React, { useState } from 'react';
import { Appointment } from '../types';
import { Calendar, Filter, AlertCircle, Clock, Check } from 'lucide-react';

interface CalendarViewProps {
  appointments: Appointment[];
  onSelectAppointment: (appt: Appointment) => void;
  onNavigate: (view: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  appointments,
  onSelectAppointment,
  onNavigate
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAppointments = appointments.filter(appt => {
    if (filterStatus === 'all') return true;
    return appt.status === filterStatus;
  });

  const weekDays = [
    { name: 'Seg', date: '12', isToday: false },
    { name: 'Ter', date: '13', isToday: false },
    { name: 'Qua', date: '14', isToday: false },
    { name: 'Qui', date: '15', isToday: true },
    { name: 'Sex', date: '16', isToday: false },
    { name: 'Sáb', date: '17', isToday: false },
    { name: 'Dom', date: '18', isToday: false }
  ];

  // Delayed warning highlight
  const delayedAppts = appointments.filter(a => a.status === 'delayed' || a.warning);

  return (
    <div className="flex-1 overflow-y-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Agenda / Serviços</h1>
          <p className="text-xs text-slate-500">Monitore o cronograma e atribuições de serviços da semana.</p>
        </div>

        {/* Filter Tags Buttons group */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex-wrap">
          <button 
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === 'all' ? 'bg-purple-700 text-white shadow-sm' : 'text-slate-500 hover:text-purple-700'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilterStatus('in_progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === 'in_progress' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-emerald-750'}`}
          >
            Em Andamento
          </button>
          <button 
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === 'pending' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:text-amber-600'}`}
          >
            Marcados
          </button>
          <button 
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === 'completed' ? 'bg-slate-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Concluídos
          </button>
        </div>
      </div>

      {/* Critical late warning banner alerts list */}
      {delayedAppts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 items-center">
          <AlertCircle className="text-red-650 shrink-0" size={20} />
          <div className="flex-grow">
            <span className="text-[10px] uppercase font-black text-red-700 tracking-wider">Atenção Crítica</span>
            <p className="text-xs text-red-800 font-medium">Existe {delayedAppts.length} serviço com alerta de atraso ou próximo do limite de conclusão. Revise com a equipe.</p>
          </div>
          <button 
            onClick={() => {
              onSelectAppointment(delayedAppts[0]);
              onNavigate('appointment-detail');
            }}
            className="text-white bg-red-650 hover:bg-red-700 font-extrabold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            Ver Alerta
          </button>
        </div>
      )}

      {/* Weekly row schedule planner header visualizer */}
      <section className="bg-white rounded-2xl p-5 border border-[#eff4ff] shadow-sm">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-xl text-center border transition-all ${day.isToday ? 'bg-purple-700 text-white border-purple-750 shadow-md shadow-purple-100' : 'bg-[#f8f9ff] border-slate-50'}`}
            >
              <span className={`text-[10px] font-bold block ${day.isToday ? 'text-purple-200' : 'text-slate-400'}`}>{day.name}</span>
              <span className="text-sm font-black mt-1 block">{day.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Structured list of filtered appointments */}
      <section className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-100">
            Nenhum serviço agendado neste filtro.
          </div>
        ) : (
          filteredAppointments.map((appt) => {
            const isDelayed = appt.status === 'delayed' || appt.warning;
            const statusConfig = appt.status === 'in_progress'
              ? { border: 'border-l-4 border-l-emerald-500', bg: 'bg-emerald-55/60', text: 'text-emerald-800' }
              : appt.status === 'completed'
                ? { border: 'border-l-4 border-l-slate-300', bg: 'bg-slate-50', text: 'text-slate-600' }
                : isDelayed
                  ? { border: 'border-l-4 border-l-red-500', bg: 'bg-red-50', text: 'text-red-800' }
                  : { border: 'border-l-4 border-l-amber-500', bg: 'bg-amber-50/70', text: 'text-amber-800' };

            return (
              <div 
                key={appt.id}
                onClick={() => {
                  onSelectAppointment(appt);
                  onNavigate('appointment-detail');
                }}
                className={`bg-white rounded-2xl p-4 border border-[#eff4ff] ${statusConfig.border} flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 hover:shadow-md transition-all cursor-pointer group`}
              >
                <div className="flex items-start gap-4">
                  {/* Time box identifier */}
                  <div className="bg-slate-50 rounded-xl p-2.5 text-center shrink-0 border border-slate-250 flex flex-col justify-center min-w-[70px]">
                    <Clock size={14} className="text-purple-700 mx-auto mb-1" />
                    <span className="font-extrabold text-[11px] text-slate-700 font-mono block">{appt.timeStart}</span>
                    <span className="text-[9px] text-slate-400 font-mono block mt-0.5">{appt.timeEnd}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${statusConfig.text} ${statusConfig.bg}`}>
                        {appt.category}
                      </span>
                      {isDelayed && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-100 text-red-700 animate-pulse">
                          ⚠ Alerta / Atraso
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm mt-1.5 group-hover:text-purple-700 transition-colors">
                      {appt.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Atendente: <strong className="text-slate-600 font-medium">{appt.employeeName}</strong> | Cliente: <strong className="text-slate-600 font-medium">{appt.clientName}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 shrink-0">
                  <span className="font-black text-slate-800 text-sm">R$ {appt.price.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{appt.locationDesc}</span>
                </div>
              </div>
            );
          })
        )}
      </section>

    </div>
  );
};
