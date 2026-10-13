import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ExploreView } from './components/ExploreView';
import { ProfileView } from './components/ProfileView';
import { BookingView } from './components/BookingView';
import { CheckoutView } from './components/CheckoutView';
import { PaymentView } from './components/PaymentView';
import { SuccessView } from './components/SuccessView';
import { DashboardView } from './components/DashboardView';
import { CalendarView } from './components/CalendarView';
import { AppointmentDetailView } from './components/AppointmentDetailView';
import { FinanceView } from './components/FinanceView';
import { TeamView } from './components/TeamView';
import { CommunityView } from './components/CommunityView';
import { ChatView } from './components/ChatView';
import { ReviewsView } from './components/ReviewsView';
import { SettingsView } from './components/SettingsView';
import { HelpView } from './components/HelpView';

import { 
  Provider, 
  Service, 
  Transaction, 
  Chat, 
  ForumPost, 
  Appointment, 
  TeamMember,
  Message
} from './types';

import {
  initialProviders,
  initialTransactions,
  initialChats,
  initialForumPosts,
  initialAppointments,
  initialReviews
} from './data';

import { Bell, Sparkles, LogOut, ChevronRight, Menu } from 'lucide-react';

export default function App() {
  // Navigation role state
  const [role, setRole] = useState<'customer' | 'entrepreneur'>('customer');
  const [activeView, setActiveView] = useState<string>('explore');
  const [menuOpen, setMenuOpen] = useState(false);

  // Core business structures
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(initialProviders[0]);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(initialForumPosts);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [reviews, setReviews] = useState(initialReviews);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialProviders[0].team);

  // Checkout and scheduling states
  const [checkoutItem, setCheckoutItem] = useState<{ service: Service; provider: Provider } | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(initialAppointments[0]);
  const [totalPaid, setTotalPaid] = useState<number>(0);

  // New Booking Modal state
  const [newBookingModal, setNewBookingModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalClient, setModalClient] = useState('');
  const [modalPrice, setModalPrice] = useState('');

  // Helper selectors
  const activeChatId = chats[0]?.id || '';

  // Interactivity handlers
  const handleToggleRole = () => {
    if (role === 'customer') {
      setRole('entrepreneur');
      setActiveView('dashboard');
    } else {
      setRole('customer');
      setActiveView('explore');
    }
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    setMenuOpen(false);
  };

  const handleSelectProvider = (provider: Provider) => {
    setSelectedProvider(provider);
    handleNavigate('profile');
  };

  const handleAddServiceToCheckout = (service: Service, provider: Provider) => {
    setCheckoutItem({ service, provider });
    handleNavigate('checkout');
  };

  const handleConfirmOrder = (finalTotal: number) => {
    setTotalPaid(finalTotal);
    setActiveView('payment');
  };

  const handlePaymentSuccess = () => {
    // Inject transaction row on success
    if (checkoutItem) {
      const newTrans: Transaction = {
        id: 'tr-' + Math.floor(Math.random() * 10000),
        date: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        title: checkoutItem.service.name,
        client: 'Você (Pág. Confirmado)',
        direction: 'income',
        value: totalPaid,
        status: 'paid',
        category: checkoutItem.service.category
      };
      setTransactions(prev => [newTrans, ...prev]);

      // Add actual scheduling appointment to client dashboard
      const newAppt: Appointment = {
        id: 'AGD-' + Math.floor(1000 + Math.random() * 9000),
        title: checkoutItem.service.name,
        date: 'Amanhã',
        timeStart: '14:00',
        timeEnd: '15:30',
        status: 'pending',
        clientName: 'Sônia Ribeiro (Você)',
        clientEmail: 'sonia@usuario.com',
        clientPhone: '(11) 99999-9999',
        clientPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcg-yydbJMyJgO-eEUl2wAt3syk9eZWMYAnw57PgLNR2s546WwbqSF3sVVv2cc-bFttRPLPEdmPtGsY0i9esKN5tD-i1eQJs458BqVxKA__8ceGT9cly1wU_UsibN-Q71iaEeZ_aFjzuWLn3dT58t0YR1KD2fDgXpEdp1bocFxXiGUH4-yCxgc60m62oAg55oYqfkIQi5LpOn4pUWUYj8qCWr9MW62nHxEs8UgiCRNhTzfGULxRKTyGC4EpM19aXdiAoa3CI0362k',
        employeeName: checkoutItem.provider.team[0]?.name || 'Maria Silva',
        locationDesc: 'Seu endereço (Cadastrado)',
        category: checkoutItem.service.category,
        price: totalPaid,
        timeline: [{ title: 'Solicitação criada', time: 'Hoje, agora' }]
      };
      setAppointments(prev => [newAppt, ...prev]);
    }

    setActiveView('success');
  };

  const handleUpdateAppointmentStatus = (
    id: string, 
    newStatus: 'pending' | 'in_progress' | 'completed' | 'delayed',
    notes?: string
  ) => {
    setAppointments(prev => prev.map(appt => {
      if (appt.id === id) {
        const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        // Define timeline labels
        const label = newStatus === 'in_progress' ? 'Atendimento Iniciado' 
                    : newStatus === 'completed' ? 'Trabalho Concluído'
                    : newStatus === 'delayed' ? 'Sinalizado Atrasado/Reagendamento' : 'Status Alterado';

        return {
          ...appt,
          status: newStatus,
          notes: notes !== undefined ? notes : appt.notes,
          timeline: [...appt.timeline, { title: label, time: `Hoje, ${timeStr}` }]
        };
      }
      return appt;
    }));
  };

  const handleAddTransaction = (newTrans: Transaction) => {
    setTransactions(prev => [newTrans, ...prev]);
  };

  const handleAddTeamMember = (newMember: TeamMember) => {
    setTeamMembers(prev => [...prev, newMember]);
  };

  const handleUpdateTeamStatus = (id: string, status: 'available' | 'busy') => {
    setTeamMembers(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status,
          statusLabel: status === 'available' ? 'Disponível hoje' : 'Ocupado / Em Atendimento'
        };
      }
      return m;
    }));
  };

  const handleAddForumPost = (newPost: ForumPost) => {
    setForumPosts(prev => [newPost, ...prev]);
  };

  const handleLikeForumPost = (id: string) => {
    setForumPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.userLiked ? post.likes - 1 : post.likes + 1,
          userLiked: !post.userLiked
        };
      }
      return post;
    }));
  };

  const handleSendMessage = (chatId: string, text: string) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const newMsg: Message = {
          id: 'msg-' + Math.floor(Math.random() * 10000),
          sender: 'me',
          text,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...chat,
          lastMessage: text,
          messages: [...chat.messages, newMsg]
        };
      }
      return chat;
    }));
  };

  // Create Manual Appointment (Modal trigger in Sidebar)
  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle || !modalPrice) return;

    const newAppt: Appointment = {
      id: 'AGD-' + Math.floor(1000 + Math.random() * 9000),
      title: modalTitle,
      date: 'Outubro 15, 2026',
      timeStart: '16:00',
      timeEnd: '17:30',
      status: 'pending',
      clientName: modalClient || 'Mariana Costa',
      clientEmail: 'cliente@gerado.cc',
      clientPhone: '(11) 98765-4321',
      clientPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZDmL6jhrBGPiIBvsoSgmtWSFUthG_-UKPNz6maDl_zJGbhuzVUVPr9PzZezXCMJnV2o-xG793VBawQJz5WfDNfObQ0haUpLK8UpW8NespON9e-hxN1eupxgegxJmFzxKu3m6UHsFNnjVcptSn26r1rZFOorkmDcqRf7MqYHTnDtoGJwegSC5VcwcYPDGEku2jKInEz5c4Y6-xQEVMlrYgLJY7D1vGRNLiE8o0jlTosaaR4BtR0bpEewNEP1mocM762LfTQAYFsJ8',
      employeeName: 'Você (InovElas)',
      locationDesc: 'Online ou Endereço Cliente',
      category: 'Prestação de Serviço',
      price: parseFloat(modalPrice),
      timeline: [{ title: 'Criado pela empreendedora', time: 'Hoje' }]
    };

    setAppointments(prev => [newAppt, ...prev]);
    setNewBookingModal(false);
    setModalTitle('');
    setModalClient('');
    setModalPrice('');
    handleNavigate('calendar');
  };

  // Active appointment sync on ID
  const syncAppt = appointments.find(a => a.id === selectedAppointment?.id) || appointments[0];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar navigation */}
      <div className="hidden md:block">
        <Sidebar 
          role={role} 
          activeView={activeView} 
          onNavigate={handleNavigate} 
          onToggleRole={handleToggleRole}
          onOpenNewBookingModal={() => setNewBookingModal(true)}
        />
      </div>

      {/* Main viewport Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Responsive top bar */}
        <header className="bg-white border-b border-[#eff4ff] px-6 py-4 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-slate-50 rounded-xl text-slate-500"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold capitalize">
              <span>{role === 'customer' ? '👩 Espaço Cliente' : '💼 Painel Empreendedora'}</span>
              <ChevronRight size={12} className="text-slate-350" />
              <span className="text-[#0b1c30] select-none lowercase">{activeView}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick help button stats */}
            <button 
              onClick={() => handleNavigate('help')}
              className="p-2 relative bg-[#f8f9ff] text-[#0b1c30] hover:text-pink-650 hover:bg-pink-50 rounded-xl transition-all border border-[#f1f5f9]"
              title="Central de Ajuda"
            >
              <span className="text-xs">💡 Tutorial</span>
            </button>

            {/* Quick Profile bar */}
            <button 
              onClick={() => handleNavigate('settings')}
              className="flex items-center gap-2.5 p-1 pr-3 bg-slate-50 hover:bg-[#eff4ff] rounded-full border border-[#f1f5f9] transition-all text-left"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcg-yydbJMyJgO-eEUl2wAt3syk9eZWMYAnw57PgLNR2s546WwbqSF3sVVv2cc-bFttRPLPEdmPtGsY0i9esKN5tD-i1eQJs458BqVxKA__8ceGT9cly1wU_UsibN-Q71iaEeZ_aFjzuWLn3dT58t0YR1KD2fDgXpEdp1bocFxXiGUH4-yCxgc60m62oAg55oYqfkIQi5LpOn4pUWUYj8qCWr9MW62nHxEs8UgiCRNhTzfGULxRKTyGC4EpM19aXdiAoa3CI0362k"
                alt="Profile Avatar" 
                className="w-8 h-8 rounded-full object-cover border" 
              />
              <div className="hidden sm:block">
                <p className="text-[10px] font-extrabold text-slate-800 leading-none">Sônia Ribeiro</p>
                <p className="text-[9px] text-[#db2777] font-semibold mt-0.5">{role === 'customer' ? 'Membro ativo' : 'Assinante Pro'}</p>
              </div>
            </button>
          </div>
        </header>

        {/* Floating Mobile Sidebar Drawer */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/45 z-50 flex md:hidden" onClick={() => setMenuOpen(false)}>
            <div className="w-64 h-full bg-white text-slate-800" onClick={(e) => e.stopPropagation()}>
              <Sidebar 
                role={role} 
                activeView={activeView} 
                onNavigate={handleNavigate} 
                onToggleRole={handleToggleRole}
                onOpenNewBookingModal={() => { setNewBookingModal(true); setMenuOpen(false); }}
              />
            </div>
          </div>
        )}

        {/* Interactive screens multiplexer */}
        <main className="flex-grow p-6 overflow-y-auto">
          {activeView === 'explore' && (
            <ExploreView 
              providers={providers} 
              onSelectProvider={handleSelectProvider}
              onNavigate={handleNavigate}
            />
          )}

          {activeView === 'profile' && selectedProvider && (
            <ProfileView 
              provider={selectedProvider} 
              onNavigate={handleNavigate}
              onAddServiceToCheckout={handleAddServiceToCheckout}
            />
          )}

          {activeView === 'booking' && (
            <BookingView 
              providers={providers}
              selectedProvider={selectedProvider}
              onNavigate={handleNavigate}
              onAddServiceToCheckout={handleAddServiceToCheckout}
            />
          )}

          {activeView === 'checkout' && (
            <CheckoutView 
              checkoutItem={checkoutItem}
              onNavigate={handleNavigate}
              onConfirmOrder={handleConfirmOrder}
            />
          )}

          {activeView === 'payment' && (
            <PaymentView 
              totalAmount={totalPaid}
              onPaymentSuccess={handlePaymentSuccess}
              onNavigate={handleNavigate}
            />
          )}

          {activeView === 'success' && (
            <SuccessView 
              totalPaid={totalPaid}
              onNavigate={handleNavigate}
            />
          )}

          {/* Entrepreneur Views */}
          {activeView === 'dashboard' && (
            <DashboardView 
              appointments={appointments}
              teamMembers={teamMembers}
              onNavigate={handleNavigate}
              onSelectAppointment={(appt) => setSelectedAppointment(appt)}
            />
          )}

          {activeView === 'calendar' && (
            <CalendarView 
              appointments={appointments}
              onSelectAppointment={(appt) => setSelectedAppointment(appt)}
              onNavigate={handleNavigate}
            />
          )}

          {activeView === 'appointment-detail' && (
            <AppointmentDetailView 
              appointment={syncAppt}
              onNavigate={handleNavigate}
              onUpdateStatus={handleUpdateAppointmentStatus}
            />
          )}

          {activeView === 'finance' && (
            <FinanceView 
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
            />
          )}

          {activeView === 'team' && (
            <TeamView 
              teamMembers={teamMembers}
              onAddMember={handleAddTeamMember}
              onUpdateStatus={handleUpdateTeamStatus}
            />
          )}

          {activeView === 'community' && (
            <CommunityView 
              posts={forumPosts}
              onAddPost={handleAddForumPost}
              onLikePost={handleLikeForumPost}
            />
          )}

          {activeView === 'chat' && (
            <ChatView 
              chats={chats}
              activeChatId={activeChatId}
              onSelectChat={(id) => {}}
              onSendMessage={handleSendMessage}
              onNavigate={handleNavigate}
            />
          )}

          {activeView === 'reviews' && (
            <ReviewsView 
              reviews={reviews}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView />
          )}

          {activeView === 'help' && (
            <HelpView />
          )}
        </main>
      </div>

      {/* New Booking Modal for Empreendedora manual entry */}
      {newBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleCreateManualBooking}
            className="bg-white rounded-3xl border shadow-xl p-6 max-w-sm w-full space-y-4 relative"
          >
            <button 
              type="button"
              onClick={() => setNewBookingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-base"
            >
              ✖
            </button>
            <h3 className="font-extrabold text-slate-800 text-base">Registrar Novo Agendamento</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Título do Serviço</label>
                <input 
                  type="text" 
                  required
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="Ex: Consultoria Financeira B2B" 
                  className="w-full bg-[#f8f9ff] rounded-xl border p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-700" 
                />
              </div>
              
              <div>
                <label className="block text-slate-400 font-bold mb-1">Nome da Cliente</label>
                <input 
                  type="text" 
                  value={modalClient}
                  onChange={(e) => setModalClient(e.target.value)}
                  placeholder="Mariana Costa" 
                  className="w-full bg-[#f8f9ff] rounded-xl border p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-700" 
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Valor do Serviço (R$)</label>
                <input 
                  type="number" 
                  required
                  value={modalPrice}
                  onChange={(e) => setModalPrice(e.target.value)}
                  placeholder="350.00" 
                  className="w-full bg-[#f8f9ff] rounded-xl border p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-700" 
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors hover:bg-purple-800 cursor-pointer"
            >
              Confirmar e Cadastrar ✔
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
