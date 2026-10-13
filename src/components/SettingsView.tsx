import React, { useState } from 'react';
import { Settings, Shield, User, Bell, Clock, Award, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [passwordModal, setPasswordModal] = useState(false);
  const [tfa, setTfa] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  // Form Fields
  const [bizName, setBizName] = useState('Brilho Perfeito Limpezas');
  const [contactName, setContactName] = useState('Maria Silva');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [bizHours, setBizHours] = useState('08:00 às 18:00');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-6 max-w-4xl mx-auto">
      
      {/* Upper header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Configurações Gerais</h1>
        <p className="text-xs text-slate-500">Configure suas preferências de perfil comercial, segurança, horários e faturamento.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile and general Settings form */}
        <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-6 lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50 font-extrabold text-slate-800 text-sm">
            <User size={18} className="text-purple-700" />
            Dados Cadastrais do Perfil
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Nome de Exibição do Negócio</label>
                <input 
                  type="text" 
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2.5 px-4 text-xs font-semibold text-[#0b1c30] transition-colors" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Representante Legal</label>
                <input 
                  type="text" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2.5 px-4 text-xs font-semibold text-[#0b1c30] transition-colors" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Telefone Principal</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2.5 px-4 text-xs font-semibold text-[#0b1c30] transition-colors" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Horário de Funcionamento</label>
                <input 
                  type="text" 
                  value={bizHours}
                  onChange={(e) => setBizHours(e.target.value)}
                  className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2.5 px-4 text-xs font-semibold text-[#0b1c30] transition-colors" 
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              {savedSettings ? (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">✔ Configurações salvas internacionalmente!</span>
              ) : <span />}
              <button 
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </section>

        {/* Security & Subscription elements side column */}
        <div className="space-y-6">
          {/* Subscription widget */}
          <section className="bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-3xl p-5 space-y-4 shadow-md shadow-pink-100">
            <h3 className="font-extrabold text-xs flex items-center gap-1.5 border-b border-white/20 pb-2">
              <Award size={16} /> Meu Assinatura Ativa
            </h3>
            
            <div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">PLANO PRO COOPERATIVA</span>
              <p className="text-2xl font-black mt-2">R$ 49,90 / mês</p>
              <p className="text-[10px] text-pink-100 mt-1">Próxima renovação em 10 Nov 2026 via Pix recorrente.</p>
            </div>

            <div className="space-y-1.5 text-[10.5px] text-pink-50 pt-2 border-t border-white/10">
              <p>✔ Agenda compartilhada ilimitada</p>
              <p>✔ Taxas reduzidas para R$ 1.5% por agendamento</p>
              <p>✔ Destaque prioritário no feed explore</p>
            </div>
          </section>

          {/* Security details cards */}
          <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-5 space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm pb-2 border-b">Segurança & Chaves</h3>

            <div className="space-y-4">
              {/* password mod toggle */}
              <div className="flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-slate-850">Alterar Senha</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Renove sua chave mestre</p>
                </div>
                <button 
                  onClick={() => setPasswordModal(true)}
                  className="border text-[10px] border-slate-200 hover:bg-slate-50 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Modificar
                </button>
              </div>

              {/* tfa toggle state */}
              <div className="flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-slate-850">Verificação de Duas Etapas (2FA)</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Mais proteção para os relatórios</p>
                </div>
                <button 
                  onClick={() => setTfa(!tfa)}
                  className={`text-[9px] font-black px-2.5 py-1.5 rounded-lg border transition-all ${
                    tfa ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-400 border-transparent'
                  }`}
                >
                  {tfa ? 'Ativo 2FA' : 'Ativar'}
                </button>
              </div>
            </div>
          </section>
        </div>

      </div>

      {/* Password updater Modal mockup visualizer */}
      {passwordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border shadow-xl p-6 max-w-sm w-full space-y-4 relative">
            <button 
              onClick={() => setPasswordModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 font-bold text-base"
            >
              ✖
            </button>
            <h3 className="font-extrabold text-slate-800 text-base">Modificar Senha Mestre</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Senha Atual</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 rounded-xl border p-2.5 focus:outline-none" />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">Nova Senha</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 rounded-xl border p-2.5 focus:outline-none" />
              </div>
            </div>
            <button 
              onClick={() => {
                setPasswordModal(false);
                alert('Sua senha mestre foi alterada com sucesso!');
              }}
              className="w-full bg-purple-755 bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Definir Nova Senha Mestre ✔
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
