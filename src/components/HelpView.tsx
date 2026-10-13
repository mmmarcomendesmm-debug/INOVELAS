import React, { useState } from 'react';
import { HelpCircle, Search, Mail, MessageSquare, ChevronRight, Play, Youtube } from 'lucide-react';

export const HelpView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const videos = [
    {
      id: 'v1',
      title: '1. Começando no InovElas: Visão Geral do Sistema',
      duration: '4:20',
      description: 'Aprenda como alternar de forma segura entre a visão de Cliente e de Empreendedora, e configure suas preferências do microempreendimento liderado por mulheres.',
      youtubeId: 'fHpeS0w8XLY',
    },
    {
      id: 'v2',
      title: '2. Cadastro de Equipe Familiar & Cooperação',
      duration: '3:45',
      description: 'Saiba como cadastrar suas filhas, maridos ou parceiras, criar perfis de identificação com fotos, detalhar as habilidades e marcar a escala de disponibilidade diária.',
      youtubeId: 'uG6Xv0fXuxA',
    },
    {
      id: 'v3',
      title: '3. Gestão de Escala, Propostas no Chat & PIX',
      duration: '5:10',
      description: 'Como funciona a emissão de acordos de serviços dentro do Chat integrado, o monitoramento de agendamentos futuros no Calendário, e a confirmação automática do PIX.',
      youtubeId: '8-GzCeeXAt4',
    }
  ];

  const [activeVideo, setActiveVideo] = useState(videos[0]);

  const faqs = [
    { id: '1', q: 'Como cadastrar minhas filhas e maridos no mesmo perfil cooperativo?', a: 'Vá até o menu lateral esquerdo, clique no botão "Equipe Familiar", lá você poderá preencher os dados de relação (Filho, filha, parceiro, etc.), carregar imagem de perfil e atribuir habilidades específicas para fins de organização das ordens de serviço.', category: 'equipe' },
    { id: '2', q: 'Como funciona o processamento do pagamento via PIX?', a: 'O PIX é integrado e rastreado instantaneamente. A plataforma detecta a transferência através de webhooks bancários em até 10 segundos, disparando notificações visuais no dashboard e confirmando as datas do agendamento.', category: 'financeiro' },
    { id: '3', q: 'O que devo fazer caso uma cliente solicite estorno ou cancelamento?', a: 'Em caso de cancelamento amigável, você pode definir a Ordem de Serviço como Cancelada na aba Agenda. O reembolso das taxas para a cliente será conduzido automaticamente pelo nosso suporte se realizado em até 24h antes do início agendado.', category: 'plataforma' },
    { id: '4', q: 'Quais as taxas fixas da plataforma InovElas?', a: 'O cadastro mestre na plataforma é gratuito. Cobramos uma taxa de intermediação de apenas 1.5% do valor total dos serviços contratados para usuárias do Plano Pro (R$ 49,90/mês), ou 5% para usuárias associadas do Plano Gratuito de Experimentação.', category: 'financeiro' }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || faq.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 overflow-y-auto space-y-8 max-w-4xl mx-auto">
      
      {/* Search Header */}
      <section className="relative pt-12 pb-8 px-6 text-center overflow-hidden bg-gradient-to-br from-[#eff4ff] to-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          <HelpCircle size={36} className="text-purple-700 mb-3" />
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Central de Ajuda & FAQ</h1>
          <p className="text-xs text-slate-500 max-w-sm mt-1">Busque respostas rápidas ou entre em contato com nosso atendimento 24h.</p>

          <div className="w-full bg-[#f8f9ff] border border-slate-200 rounded-full p-2.5 flex items-center shadow-sm mt-5 focus-within:ring-2 focus-within:ring-purple-700 focus-within:border-transparent transition-all">
            <Search className="text-slate-400 ml-3 mr-2" size={16} />
            <input 
              type="text"
              placeholder="Digite sua dúvida ou palavra-chave..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow bg-transparent border-none text-[#0b1c30] placeholder-slate-450 py-1 text-xs focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Tutorial Videos Hub */}
      <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-50 pb-4 flex-wrap gap-2">
          <div>
            <h2 className="text-xs font-black text-[#0b1c30] flex items-center gap-2 uppercase tracking-wide">
              <Youtube className="text-red-600 fill-red-600" size={18} />
              Vídeo Manual de Utilização do Aplicativo
            </h2>
            <p className="text-[11px] text-slate-550 mt-0.5">Assista aos tutoriais completos criados para impulsionar você e sua equipe familiar.</p>
          </div>
          <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse" />
            3 Aulas do Guia
          </span>
        </div>

        {/* Video Player + Play List split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Selected Video Player element */}
          <div className="lg:col-span-3 space-y-3">
            <div className="aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden shadow-inner border border-slate-100 relative group">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-[#fbf2f7] text-[#db2777] border border-[#fce4f1] font-bold px-2 py-0.5 rounded-full">
                  Duração: {activeVideo.duration}
                </span>
                <span className="text-[9px] bg-slate-100 text-slate-550 font-bold px-2 py-0.5 rounded-full">
                  Tutorial Recomendado
                </span>
              </div>
              <h3 className="font-extrabold text-slate-800 text-xs mt-2">{activeVideo.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{activeVideo.description}</p>
            </div>
          </div>

          {/* Selector panel listing */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h4 className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Módulos Disponíveis</h4>
            <div className="flex-grow space-y-2.5">
              {videos.map((vid) => {
                const isActive = vid.id === activeVideo.id;
                return (
                  <button
                    type="button"
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex gap-3 cursor-pointer ${
                      isActive 
                        ? 'bg-purple-50/70 border-purple-200 shadow-sm' 
                        : 'bg-[#f8f9ff] border-transparent hover:bg-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-purple-750 bg-purple-700 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      <Play size={12} className={isActive ? 'fill-current' : ''} />
                    </div>
                    <div className="min-w-0">
                      <h5 className={`font-bold text-xs truncate ${isActive ? 'text-purple-900 font-extrabold' : 'text-slate-700'}`}>
                        {vid.title}
                      </h5>
                      <p className="text-[10px] text-slate-450 line-clamp-1 mt-0.5">{vid.description}</p>
                      <span className="text-[9px] text-[#db2777] font-semibold mt-1 block">Duração: {vid.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-[#eff4ff]/70 border border-slate-100 rounded-2xl p-3 flex gap-2 text-slate-650 text-[10px] items-start">
              <span className="text-pink-600 font-bold">💡 Dica InovElas:</span>
              <p className="leading-relaxed">A assista aos manuais em alta definição clicando em "Expandir" para acompanhar em tela cheia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* FAQs List left */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-extrabold text-slate-800 text-sm">Perguntas Frequentes</h3>
            <div className="flex gap-1">
              <button onClick={() => setCategory('all')} className={`text-[10px] font-bold px-3 py-1 rounded-lg ${category === 'all' ? 'bg-purple-100 text-purple-900 shadow-sm' : 'text-slate-400 hover:text-purple-700'}`}>Tudo</button>
              <button onClick={() => setCategory('equipe')} className={`text-[10px] font-bold px-3 py-1 rounded-lg ${category === 'equipe' ? 'bg-purple-100 text-purple-900 shadow-sm' : 'text-slate-400 hover:text-purple-700'}`}>Equipe</button>
              <button onClick={() => setCategory('financeiro')} className={`text-[10px] font-bold px-3 py-1 rounded-lg ${category === 'financeiro' ? 'bg-purple-100 text-purple-900 shadow-sm' : 'text-slate-400 hover:text-purple-700'}`}>Finanças</button>
              <button onClick={() => setCategory('plataforma')} className={`text-[10px] font-bold px-3 py-1 rounded-lg ${category === 'plataforma' ? 'bg-purple-100 text-purple-900 shadow-sm' : 'text-slate-400 hover:text-purple-700'}`}>Plataforma</button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <details key={faq.id} className="bg-white rounded-2xl border border-slate-100 p-4 transition-all group overflow-hidden">
                <summary className="font-extrabold text-slate-755 text-xs text-slate-800 flex justify-between items-center cursor-pointer list-none">
                  <span>{faq.q}</span>
                  <ChevronRight size={14} className="text-slate-400 group-open:rotate-90 transition-transform duration-200" />
                </summary>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed border-t pt-3 border-slate-50">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Right Help Desk cards details contacts */}
        <div className="space-y-6">
          <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-5 space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm">Canais de Atendimento</h3>
            
            <div className="space-y-3 text-xs">
              <a 
                href="mailto:suporte@inovelas.com.br"
                className="flex items-center gap-3 p-3 bg-[#f8f9ff] hover:bg-pink-50 hover:border-pink-200 rounded-2xl border border-transparent transition-all group"
              >
                <Mail className="text-purple-700 group-hover:text-pink-600 shrink-0" size={16} />
                <div>
                  <h4 className="font-bold text-slate-800">Enviar E-mail</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Resposta em até 2 horas úteis</p>
                </div>
              </a>

              <button 
                type="button"
                className="w-full flex items-center gap-3 p-3 bg-[#f8f9ff] hover:bg-pink-50 hover:border-pink-200 rounded-2xl border border-transparent transition-all group text-left"
              >
                <MessageSquare className="text-purple-700 group-hover:text-pink-600 shrink-0" size={16} />
                <div>
                  <h4 className="font-bold text-slate-800">Suporte Chat 24h</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Fale com nossa assessora virtual</p>
                </div>
              </button>
            </div>
          </section>

          <section className="bg-[#eff4ff]/60 border border-purple-100 rounded-3xl p-5 text-xs text-slate-700 leading-relaxed">
            <p><strong>Dica de Segurança:</strong> Nunca forneça suas chaves de API, senhas mestre ou QR Code de PIX pessoal para qualquer pessoa que afirmar trabalhar no suporte da InovElas.</p>
          </section>
        </div>

      </div>
    </div>
  );
};
