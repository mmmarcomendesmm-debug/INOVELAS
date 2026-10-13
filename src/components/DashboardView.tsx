import React from 'react';
import { Appointment, TeamMember } from '../types';
import { TrendingUp, Users, Calendar, ArrowRight, Star, AlertTriangle, MessageSquare, DollarSign } from 'lucide-react';

interface DashboardViewProps {
  appointments: Appointment[];
  teamMembers: TeamMember[];
  onNavigate: (view: string) => void;
  onSelectAppointment: (appointment: Appointment) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  appointments,
  teamMembers,
  onNavigate,
  onSelectAppointment
}) => {
  const activeAppts = appointments.filter(a => a.status === 'in_progress' || a.status === 'pending');
  const delayedAppts = appointments.filter(a => a.status === 'delayed' || a.warning);

  return (
    <div className="flex-1 overflow-y-auto space-y-8">
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Painel Executivo</h1>
          <p className="text-xs text-slate-500">Mantenha o controle da sua cooperativa familiar em tempo real.</p>
        </div>
        <div className="text-xs bg-purple-100 text-purple-900 border border-purple-200 py-1.5 px-3 rounded-full font-bold flex items-center gap-1.5 shadow-sm">
          <span>👑</span> Plano Pro Ativo • Brilho Perfeito
        </div>
      </div>

      {/* Stats Cards Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rev */}
        <div className="bg-white p-5 rounded-2xl border border-[#eff4ff] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 capitalize font-bold tracking-wide">Faturamento do Mês</span>
            <p className="text-xl font-extrabold text-slate-800 mt-1">R$ 5.700,00</p>
            <span className="text-[9px] text-emerald-600 font-semibold mt-1 inline-block">📈 +12% vs mês anterior</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <DollarSign size={18} />
          </div>
        </div>

        {/* Servs */}
        <div className="bg-white p-5 rounded-2xl border border-[#eff4ff] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 capitalize font-bold tracking-wide">Serviços Pendentes</span>
            <p className="text-xl font-extrabold text-[#0b1c30] mt-1">{activeAppts.length} agendados</p>
            <span className="text-[9px] text-purple-600 font-semibold mt-1 inline-block">🗓️ Próximo: Amanhã às 11h</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Calendar size={18} />
          </div>
        </div>

        {/* Team */}
        <div className="bg-white p-5 rounded-2xl border border-[#eff4ff] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 capitalize font-bold tracking-wide">Equipe Familiar</span>
            <p className="text-xl font-extrabold text-[#0b1c30] mt-1">{teamMembers.length} pessoas</p>
            <span className="text-[9px] text-emerald-600 font-semibold mt-1 inline-block">🟢 {teamMembers.filter(t => t.status === 'available').length} disponíveis hoje</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Users size={18} />
          </div>
        </div>

        {/* Reviews cumulative */}
        <div className="bg-white p-5 rounded-2xl border border-[#eff4ff] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 capitalize font-bold tracking-wide">Reputação Cooperativa</span>
            <p className="text-xl font-extrabold text-[#0b1c30] mt-1">4.9 / 5.0</p>
            <div className="flex gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="text-amber-500 fill-amber-500" />
              ))}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Star size={18} />
          </div>
        </div>
      </section>

      {/* Delayed Alerts Panel */}
      {delayedAppts.length > 0 && (
        <div className="bg-[#fff9e6] rounded-2xl p-5 border border-amber-250 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 shadow-sm animate-pulse">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5 sm:mt-0" size={20} />
            <div>
              <h4 className="text-sm font-bold text-slate-800">Verifique os alertas críticos da semana</h4>
              <p className="text-xs text-slate-600">{delayedAppts[0].warning || 'Atraso detectado na execução do serviço da cliente Mariana.'}</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => {
              onSelectAppointment(delayedAppts[0]);
              onNavigate('appointment-detail');
            }}
            className="bg-amber-600 text-white font-bold py-2 px-4 rounded-xl text-xs hover:bg-amber-700 transition-all cursor-pointer shadow-sm w-full sm:w-auto text-center"
          >
            Ver Detalhes do Alerta
          </button>
        </div>
      )}

      {/* Splits layout: appointment list vs team status sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Appts schedule list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-slate-800 text-sm">Serviços Ativos Hoje</h3>
            <button 
              type="button" 
              onClick={() => onNavigate('calendar')} 
              className="text-xs font-bold text-purple-700 hover:underline"
            >
              Ver Agenda Completa ➜
            </button>
          </div>

          <div className="space-y-3">
            {appointments.map((appt) => {
              const statusPill = appt.status === 'in_progress' 
                ? { bg: 'bg-emerald-100 text-emerald-800', lbl: 'Em Andamento' }
                : appt.status === 'completed'
                  ? { bg: 'bg-slate-100 text-slate-500', lbl: 'Concluído' }
                  : { bg: 'bg-amber-100 text-amber-800', lbl: 'Pendente' };

              return (
                <div 
                  key={appt.id}
                  onClick={() => {
                    onSelectAppointment(appt);
                    onNavigate('appointment-detail');
                  }}
                  className="bg-white rounded-2xl p-4 border border-[#eff4ff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <img 
                      src={appt.clientPhoto} 
                      alt={appt.clientName} 
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border" 
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${statusPill.bg}`}>
                          {statusPill.lbl}
                        </span>
                        <span className="font-mono text-[9px] text-slate-400">{appt.id}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mt-1.5 group-hover:text-purple-700 transition-colors">
                        {appt.title}
                      </h4>
                      <div className="flex gap-2 text-[10px] text-slate-400 mt-0.5 flex-wrap">
                        <span>Cliente: <strong className="text-slate-600">{appt.clientName}</strong></span>
                        <span>•</span>
                        <span>Colaborador: <strong className="text-slate-600">{appt.employeeName}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-50">
                    <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-1 rounded-md font-bold mt-1">
                      {appt.timeStart} - {appt.timeEnd}
                    </span>
                    <span className="font-black text-slate-800 text-xs mt-1 block">R$ {appt.price.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Sidebar Status */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-slate-800 text-sm">Status da Equipe</h3>
            <button 
              type="button" 
              onClick={() => onNavigate('team')} 
              className="text-xs font-bold text-purple-700 hover:underline"
            >
              Adicionar Membro
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#eff4ff] shadow-sm space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">{member.name}</h5>
                    <p className="text-[10px] font-semibold text-purple-700">{member.relationship} • {member.role}</p>
                  </div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${member.status === 'available' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                  {member.statusLabel}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Chat Bubble trigger card */}
          <div 
            onClick={() => onNavigate('chat')}
            className="bg-purple-700 hover:bg-purple-800 rounded-2xl p-4 text-white border-none flex items-center justify-between transition-all cursor-pointer shadow-sm shadow-purple-100 group"
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-purple-200" />
              <div>
                <h5 className="font-bold text-xs">Acessar Mensagens</h5>
                <p className="text-[10px] text-purple-200">Mariana Costa mandou 1 mensagem</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-purple-200 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
};
