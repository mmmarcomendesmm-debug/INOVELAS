import React from 'react';
import { 
  Home, 
  Group, 
  Briefcase, 
  Settings, 
  HelpCircle, 
  LogOut, 
  LayoutDashboard, 
  Calendar, 
  FolderHeart, 
  Star, 
  MessageSquare, 
  Sparkles, 
  FileText, 
  Users, 
  PlusCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface SidebarProps {
  role: 'customer' | 'entrepreneur';
  activeView: string;
  onNavigate: (view: string) => void;
  onToggleRole: () => void;
  onOpenNewBookingModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeView,
  onNavigate,
  onToggleRole,
  onOpenNewBookingModal
}) => {
  return (
    <aside className="bg-white dark:bg-[#111c2d] h-screen w-64 border-r border-[#dee9fc] dark:border-[#ccc3d8]/20 flex flex-col p-4 flex-shrink-0 relative overflow-y-auto">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6 mt-2 pb-6 border-b border-[#eff4ff]">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-pink-600 flex items-center justify-center text-white font-bold text-lg font-sans">
            IE
          </div>
          <div>
            <h1 className="text-xl font-bold text-pink-600 tracking-tight">InovElas</h1>
            <p className="text-xs text-slate-500">Portal de Negócios</p>
          </div>
        </div>

        {/* Role Toggle Visual Indicator */}
        <div className="mt-4 w-full px-2">
          <button 
            onClick={onToggleRole}
            className="w-full flex items-center justify-between gap-2 bg-[#eff4ff] hover:bg-pink-50 p-2 rounded-xl transition-all border border-[#dee9fc] group"
          >
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-pink-600 tracking-wider">Perfil Ativo</p>
              <p className="text-xs font-semibold text-slate-800">
                {role === 'customer' ? '👩 Cliente Final' : '💼 Empreendedora'}
              </p>
            </div>
            <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-1 rounded-lg font-bold group-hover:bg-pink-600 group-hover:text-white transition-colors">
              Mudar
            </span>
          </button>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-1 mb-6">
        {role === 'customer' ? (
          <button 
            onClick={() => onNavigate('booking')}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
          >
            <PlusCircle size={18} />
            Agendar Serviço
          </button>
        ) : (
          <button 
            onClick={onOpenNewBookingModal}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
          >
            <PlusCircle size={18} />
            Novo Agendamento
          </button>
        )}
      </div>

      {/* Navigation Space */}
      <nav className="flex-1 space-y-1">
        {role === 'customer' ? (
          <>
            {/* Customer Views */}
            <button 
              onClick={() => onNavigate('explore')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'explore' 
                  ? 'bg-pink-100 text-pink-800 font-bold border-l-4 border-pink-600' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-pink-600'
              }`}
            >
              <Home size={18} />
              Explorar Serviços
            </button>

            <button 
              onClick={() => onNavigate('profile')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'profile' 
                  ? 'bg-pink-100 text-pink-800 font-bold border-l-4 border-pink-600' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-pink-600'
              }`}
            >
              <Briefcase size={18} />
              Perfil Profissional
            </button>

            <button 
              onClick={() => onNavigate('booking')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'booking' 
                  ? 'bg-pink-100 text-pink-800 font-bold border-l-4 border-pink-600' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-pink-600'
              }`}
            >
              <Calendar size={18} />
              Agendar Serviço
            </button>

            <button 
              onClick={() => onNavigate('checkout')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'checkout' 
                  ? 'bg-pink-100 text-pink-800 font-bold border-l-4 border-pink-600' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-pink-600'
              }`}
            >
              <FileText size={18} />
              Resumo do Pedido
            </button>

            <button 
              onClick={() => onNavigate('chat')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'chat' 
                  ? 'bg-pink-100 text-pink-800 font-bold border-l-4 border-pink-600' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-pink-600'
              }`}
            >
              <MessageSquare size={18} />
              Chat / Suporte
            </button>
          </>
        ) : (
          <>
            {/* Entrepreneur Views */}
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'dashboard' 
                  ? 'bg-purple-100 text-purple-900 font-bold border-l-4 border-purple-700' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-purple-700'
              }`}
            >
              <LayoutDashboard size={18} />
              Visão Geral
            </button>

            <button 
              onClick={() => onNavigate('calendar')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'calendar' || activeView === 'appointment-detail'
                  ? 'bg-purple-100 text-purple-900 font-bold border-l-4 border-purple-700' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-purple-700'
              }`}
            >
              <Calendar size={18} />
              Agenda / Serviços
            </button>

            <button 
              onClick={() => onNavigate('finance')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'finance' 
                  ? 'bg-purple-100 text-purple-900 font-bold border-l-4 border-purple-700' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-purple-700'
              }`}
            >
              <TrendingUp size={18} />
              Finanças / Relatórios
            </button>

            <button 
              onClick={() => onNavigate('team')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'team' 
                  ? 'bg-purple-100 text-purple-900 font-bold border-l-4 border-purple-700' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-purple-700'
              }`}
            >
              <Group size={18} />
              Equipe Familiar
            </button>

            <button 
              onClick={() => onNavigate('community')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'community' 
                  ? 'bg-purple-100 text-purple-900 font-bold border-l-4 border-purple-700' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-purple-700'
              }`}
            >
              <Users size={18} />
              Comunidade
            </button>

            <button 
              onClick={() => onNavigate('chat')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'chat' 
                  ? 'bg-purple-100 text-purple-900 font-bold border-l-4 border-purple-700' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-purple-700'
              }`}
            >
              <MessageSquare size={18} />
              Mensagens inbox
            </button>

            <button 
              onClick={() => onNavigate('reviews')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeView === 'reviews' 
                  ? 'bg-purple-100 text-purple-900 font-bold border-l-4 border-purple-700' 
                  : 'text-slate-600 hover:bg-[#eff4ff] hover:text-purple-700'
              }`}
            >
              <Star size={18} />
              Avaliações Equipe
            </button>
          </>
        )}

        {/* Global Utilities */}
        <button 
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeView === 'settings' 
              ? 'bg-pink-100 text-pink-800 font-bold' 
              : 'text-slate-600 hover:bg-[#eff4ff] hover:text-pink-600'
          }`}
        >
          <Settings size={18} />
          Configurações
        </button>

        <button 
          onClick={() => onNavigate('help')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeView === 'help' 
              ? 'bg-pink-100 text-pink-800 font-bold' 
              : 'text-slate-600 hover:bg-[#eff4ff] hover:text-pink-600'
          }`}
        >
          <HelpCircle size={18} />
          Ajuda & Suporte
        </button>
      </nav>

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <div className="flex gap-2">
          <button 
            onClick={onToggleRole}
            className="flex-1 text-[11px] font-semibold text-pink-700 border border-pink-200 rounded-lg py-2 hover:bg-pink-50 transition-colors"
          >
            Mudar Modo
          </button>
          <button 
            onClick={() => onNavigate('explore')}
            className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Sair"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
