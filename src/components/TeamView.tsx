import React, { useState } from 'react';
import { TeamMember } from '../types';
import { Users, UserPlus, ShieldAlert, BadgeCheck, Camera, Check } from 'lucide-react';

interface TeamViewProps {
  teamMembers: TeamMember[];
  onAddMember: (member: TeamMember) => void;
  onUpdateStatus: (id: string, status: 'available' | 'busy') => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  teamMembers,
  onAddMember,
  onUpdateStatus
}) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Filha');
  const [role, setRole] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) {
      alert('Por favor, digite o nome e a função obrigatórios.');
      return;
    }

    const skills = skillsStr ? skillsStr.split(',').map(s => s.trim()) : ['Regular', 'Auxiliar'];

    const avatars = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrjYDrbBITTgDIsJthD0fAKGAR6x-Wv-xnhV4mLgPgBJ16Whg2TnGVhZUpgor4tJ1vK5vPu-pjVGpi9quierE2-n--x7xf9ZiMku16z9c0aQmwhFzjTq7cFPlzB-HjrD8U0jWjI33vAOe72fjgkkMmcSclStVp25bwe02sEAU9wl_QN72Us1oWEn4UyP6x-2UBj0D0Nk96AZH3aEZlCRUwl_eeBFyepbuDoO6454LlYzwoCccPkPSVIgARDeB5et92mm7zMbdA6Vg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOaUVG8zq2uAOEOFO-AY3_mWIDXyXj4wrY1JZ_vQx9bkknySF3tXqn8rZW_hcEe741Ecl0aoQUmsh-xbaFDhfjTPQxkpYuzQf6MSdZ0n6zhweM3rjG9bzimuyM4V_KMyeF9hDS8KtBXQo7IfsC5JuyIiuKaf4i686qn_f8LcbAK0mpR7dGnslCtkorPPky1kRFiJqmK4M7V0XBrm1F1Ljoc8Vje8JxESEtJC8sWjkrdq81k4TIU9tBb-SfZKnIToRpGZmOcctVn3k',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDIxMDXRW5F8PY3gCFstEjg9F2gMVClCSH51b-DPJn2v8NbZM19L9r_3tbZK9lWt0VjqpxgXTcm0D2cQyHIDDXY6wN-l57pneVZslbs9Q4xm9dgS_a0XDYh4GB7_XKsllQErVAAGU45CHSAu_oYf-lNq1kK9s9TC-kebNINYJdlJHML-hQlp93UfaJhLNrGcoX55n4vllxUoe_UYmo8OYN1GQl2fBZIgFLl64k8v_ubaU-X2N9yi-UfZcxufUeAFtce1wjPeWEo1jY'
    ];

    onAddMember({
      id: 't-' + Math.floor(Math.random() * 10000),
      name,
      relationship,
      role,
      status: 'available',
      statusLabel: 'Disponível hoje',
      skills,
      photo: avatars[Math.floor(Math.random() * avatars.length)]
    });

    setName('');
    setRole('');
    setSkillsStr('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Equipe Familiar</h1>
        <p className="text-xs text-slate-500">Adicione e coordene membros da família ou colaboradoras em seu microempreendimento.</p>
      </div>

      {/* Main split: card grids lists vs registration card form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Registration form card */}
        <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-6 space-y-4 h-fit">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50 font-extrabold text-slate-800 text-sm">
            <UserPlus size={18} className="text-purple-700" />
            Cadastrar Colaborador Familiar
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Foto uploader placeholder */}
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Foto do Perfil</span>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-700 transition-colors cursor-pointer relative group">
                  <Camera size={18} />
                  <span className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-[8px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Mais
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Clique para enviar. Imagem de identificação para as ordens de serviço.</p>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Nome Completo *</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João da Silva" 
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2.5 px-4 text-xs font-semibold text-[#0b1c30] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Relação</label>
                <select 
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2 px-2 text-xs font-semibold text-[#0b1c30]"
                >
                  <option value="Filha">Filha (o)</option>
                  <option value="Cônjuge">Cônjuge/Marido</option>
                  <option value="Irmão(ã)">Irmão(ã)</option>
                  <option value="Primo(a)">Primo(a)</option>
                  <option value="Amiga">Amiga/Parceira</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Função / Foco *</label>
                <input 
                  type="text" 
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: Faxina pesada" 
                  className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2.5 px-3 text-xs font-semibold text-[#0b1c30] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Habilidades (vírgulas)</label>
              <input 
                type="text" 
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="Ex: Organização, Pós-Obra, Lavanderia" 
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2.5 px-4 text-xs font-semibold text-[#0b1c30] transition-colors"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-3 rounded-xl text-xs transition-colors shadow-sm focus:outline-none"
            >
              Registrar Cooperação ✔
            </button>
            {successMsg && (
              <p className="text-xs text-emerald-600 font-semibold text-center mt-2 flex items-center justify-center gap-1">
                ✔ Cadastrado com sucesso na cooperativa!
              </p>
            )}
          </form>
        </section>

        {/* Team cards dashboard lists */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-slate-800 text-sm">Integrantes Registrados</h3>
            <span className="text-xs text-slate-400 font-medium">{teamMembers.length} pessoas cooperando</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-3xl border border-[#eff4ff] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top info */}
                  <div className="flex items-start gap-3">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-14 h-14 rounded-full object-cover shrink-0 border" 
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] bg-purple-100 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-full font-bold">
                          {member.relationship}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${member.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mt-1.5">{member.name}</h4>
                      <p className="text-[10px] text-slate-550 font-semibold text-purple-700">{member.role}</p>
                    </div>
                  </div>

                  {/* Skills tags map */}
                  <div className="mt-4 flex gap-1.5 flex-wrap">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-600 px-2.5 py-0.5 rounded-md text-[9px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer status selectors */}
                <div className="pt-4 mt-5 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 capitalize">Situação: <strong className="text-slate-650 font-medium">{member.statusLabel}</strong></span>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => onUpdateStatus(member.id, 'available')}
                      className={`text-[9px] font-bold px-2 py-1 rounded-lg transition-all ${member.status === 'available' ? 'bg-emerald-100 text-emerald-800 border border-emerald-250' : 'bg-slate-50 text-slate-400 border border-transparent'}`}
                    >
                      Livre
                    </button>
                    <button
                      onClick={() => onUpdateStatus(member.id, 'busy')}
                      className={`text-[9px] font-bold px-2 py-1 rounded-lg transition-all ${member.status === 'busy' ? 'bg-amber-100 text-amber-800 border border-amber-250' : 'bg-slate-50 text-slate-400 border border-transparent'}`}
                    >
                      Ocupado
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#eff4ff] border border-pink-100 rounded-2xl p-4 flex gap-3 text-slate-700 items-start text-xs mt-6">
            <ShieldAlert size={20} className="text-pink-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Proteção Trabalhista Solidária:</strong> A InovElas assegura suporte jurídico e cooperativismo autônomo para microempreendimentos familiares liderados por mulheres.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
