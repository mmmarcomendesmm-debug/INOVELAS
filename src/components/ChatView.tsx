import React, { useState } from 'react';
import { Chat, Message, Provider } from '../types';
import { Send, MapPin, Calendar, Clock, DollarSign, Sparkles, MessageCircle, MoreVertical } from 'lucide-react';

interface ChatViewProps {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onSendMessage: (chatId: string, text: string) => void;
  onNavigate: (view: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  chats,
  activeChatId,
  onSelectChat,
  onSendMessage,
  onNavigate
}) => {
  const [inputText, setInputText] = useState('');
  
  // Custom states for Draft Quote Builder in right sidebar
  const [draftService, setDraftService] = useState('Diária de Faxina Completa');
  const [draftPrice, setDraftPrice] = useState('180.00');
  const [draftDate, setDraftDate] = useState('2026-10-15');
  const [draftTime, setDraftTime] = useState('14:00');
  const [quoteSentStatus, setQuoteSentStatus] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(activeChat.id, inputText);
    setInputText('');
  };

  const handleSendQuote = () => {
    // Generate a beautiful formatted quote text and append to chat
    const quoteText = `🧾 *PROPOSTA DE AGENDAMENTO INOVELAS*\n\nServiço: *${draftService}*\nValor: *R$ ${parseFloat(draftPrice).toFixed(2)}*\nData sugerida: *${new Date(draftDate).toLocaleDateString('pt-BR')}*\nHorário: *${draftTime}*\n\nClique no botão "Confirmar" ou "Agendar Serviço" no menu lateral para finalizar o pagamento de forma segura.`;
    onSendMessage(activeChat.id, quoteText);
    setQuoteSentStatus(true);
    setTimeout(() => setQuoteSentStatus(false), 2500);
  };

  return (
    <div className="flex-1 h-[calc(100vh-140px)] flex bg-white rounded-3xl border border-[#eff4ff] shadow-sm overflow-hidden">
      
      {/* 1. Left List panel */}
      <div className="w-1/4 min-w-[200px] border-r border-[#eff4ff] flex flex-col">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-800 text-sm">Contatos</h3>
          <span className="bg-pink-100 text-pink-800 text-[10px] font-bold py-0.5 px-2 rounded-full"> inbox </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 p-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all relative ${chat.id === activeChat.id ? 'bg-pink-50 border border-pink-100' : 'hover:bg-[#f8f9ff]'}`}
            >
              <div className="relative">
                <img 
                  src={chat.clientPhoto} 
                  alt={chat.clientName} 
                  className="w-10 h-10 rounded-full object-cover border" 
                />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-slate-800 text-xs truncate">{chat.clientName}</h4>
                  <span className="text-[9px] text-slate-400 shrink-0">{chat.time}</span>
                </div>
                <p className="text-[10px] text-slate-450 truncate">{chat.lastMessage}</p>
              </div>

              {chat.unreadCount ? (
                <span className="bg-pink-600 text-white w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0">
                  {chat.unreadCount}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Middle messaging feed */}
      <div className="flex-1 flex flex-col h-full bg-slate-50">
        
        {/* Active Header */}
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src={activeChat.clientPhoto} 
              alt={activeChat.clientName} 
              className="w-10 h-10 rounded-full object-cover border" 
            />
            <div>
              <h4 className="font-bold text-slate-800 text-xs">{activeChat.clientName}</h4>
              <p className="text-[9px] text-slate-400">{activeChat.online ? 'Online agora' : 'Ocups. há instantes'}</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Messaging Body container list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
          {activeChat.messages.map((m) => {
            const isMe = m.sender === 'me';
            return (
              <div 
                key={m.id} 
                className={`max-w-[70%] rounded-2xl p-3.5 text-xs whitespace-pre-wrap leading-relaxed flex flex-col ${isMe ? 'bg-purple-700 text-white rounded-tr-none self-end text-left shadow-sm' : 'bg-white text-slate-700 rounded-tl-none self-start border border-slate-100'}`}
              >
                <p>{m.text}</p>
                <span className={`text-[9px] mt-1.5 self-end font-mono ${isMe ? 'text-purple-200' : 'text-slate-400'}`}>
                  {m.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Messaging footer input builder */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-10 border-slate-100 flex gap-2 shrink-0">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua resposta segura para a cliente..." 
            className="flex-grow bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 px-4 text-xs font-semibold text-[#0b1c30] transition-colors"
          />
          <button 
            type="submit" 
            className="bg-purple-700 hover:bg-purple-850 text-white p-3 rounded-xl transition-colors cursor-pointer"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* 3. Right draft schedule sidebar */}
      <aside className="w-1/4 min-w-[200px] border-l border-[#eff4ff] p-4 space-y-6 flex flex-col overflow-y-auto">
        <div className="border-b pb-2">
          <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
            <Sparkles size={16} className="text-pink-600 animate-pulse" />
            Rascunho de Proposta
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">Gere propostas de agendamento rápidas diretamente no chat.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSendQuote(); }} className="space-y-4 text-xs">
          <div>
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Serviço Ofertado</label>
            <select
              value={draftService}
              onChange={(e) => setDraftService(e.target.value)}
              className="w-full bg-[#f8f9ff] hover:bg-white rounded-lg border border-slate-200 py-1.5 px-2 text-[11px] font-semibold text-[#0b1c30]"
            >
              <option value="Diária de Faxina Completa">Diária de Faxina Completa</option>
              <option value="Limpeza Pós-Obra">Limpeza Pós-Obra</option>
              <option value="Sessão Limpeza Carpete">Sessão Limpeza Carpete</option>
              <option value="Consultoria Financeira Estratégica">Consultoria Financeira</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preço Proposto (R$)</label>
            <input 
              type="number" 
              value={draftPrice}
              onChange={(e) => setDraftPrice(e.target.value)}
              className="w-full bg-[#f8f9ff] hover:bg-white rounded-lg border border-slate-200 py-1.5 px-2 text-[11px] font-semibold text-[#0b1c30]" 
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dia sugerido</label>
              <input 
                type="date" 
                value={draftDate}
                onChange={(e) => setDraftDate(e.target.value)}
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-lg border border-slate-200 py-1 px-1.5 text-[10px] font-semibold text-[#0b1c30]" 
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Horário</label>
              <input 
                type="text" 
                value={draftTime}
                onChange={(e) => setDraftTime(e.target.value)}
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-lg border border-slate-200 py-1 px-1.5 text-[10px] font-semibold text-[#0b1c30]" 
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0b1c30] hover:bg-pink-650 hover:bg-pink-650 text-white font-extrabold py-2 px-3 rounded-xl transition-colors cursor-pointer text-[10px] uppercase tracking-wider block text-center"
          >
            Enviar Proposta de Acordo
          </button>
          
          {quoteSentStatus && (
            <p className="text-[10px] text-emerald-600 font-semibold text-center mt-1">✔ Proposta anexada ao Chat!</p>
          )}
        </form>
      </aside>

    </div>
  );
};
