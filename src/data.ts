import { Provider, Transaction, Chat, ForumPost, Appointment, Review } from './types';

export const initialProviders: Provider[] = [
  {
    id: 'brilho-perfeito',
    name: 'Brilho Perfeito Limpezas',
    category: 'Limpeza',
    rating: 4.8,
    reviewCount: 124,
    location: 'São Paulo, SP',
    distance: 'A 2km',
    priceLabel: 'A partir de R$ 150/dia',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEcGon0MlVFCwWJxIc5zpObIJE4sBZm8zSsivaZJI7ZWauih7rtA2yn94NxxymVrahCeg6ogujeVge-BRqF6YcQtVN60rfPtStpKIMbxNTXK1VlmJLokKTyieSyfrXs6KnkCg5oIHOFFpZtl7sifIQBRi-bJ4KEAr4iOQZX_Jk8nJ9ak9OHy0Bt-cAK_8hrDAcJD098sX5XhB2edBL5xSgA4huYMNmvFIvjBZp0qLtwBn6gdis5LipeE5Ut-FRBAKnM9LIodKQpxw',
    verified: true,
    about: 'Especialistas em transformar ambientes. A Brilho Perfeito oferece serviços de limpeza residencial e comercial com alto padrão de qualidade e produtos eco-friendly. Nossa equipe é treinada para garantir não apenas a limpeza, mas o bem-estar e a segurança do seu espaço. Mais de 5 anos de experiência no mercado paulistano.',
    services: [
      { id: 'bp-1', name: 'Diária de Faxina Completa', category: 'Limpeza', description: 'Limpeza profunda de todos os cômodos, incluindo lavagem de banheiros, limpeza de vidros e organização básica.', price: 180 },
      { id: 'bp-2', name: 'Limpeza Pós-Obra', category: 'Especializado', description: 'Remoção de resíduos pesados, tintas, gesso e poeira fina. Ideal para deixar seu imóvel novo pronto para morar.', price: 350, perTime: 'sob consulta' }
    ],
    team: [
      { id: 't-1', name: 'Maria Silva', relationship: 'Filha', role: 'Especialista em Pós-Obra', status: 'available', statusLabel: 'Disponível para Pós-Obra', skills: ['Pós-Obra', 'Pesada'], photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrjYDrbBITTgDIsJthD0fAKGAR6x-Wv-xnhV4mLgPgBJ16Whg2TnGVhZUpgor4tJ1vK5vPu-pjVGpi9quierE2-n--x7xf9ZiMku16z9c0aQmwhFzjTq7cFPlzB-HjrD8U0jWjI33vAOe72fjgkkMmcSclStVp25bwe02sEAU9wl_QN72Us1oWEn4UyP6x-2UBj0D0Nk96AZH3aEZlCRUwl_eeBFyepbuDoO6454LlYzwoCccPkPSVIgARDeB5et92mm7zMbdA6Vg' },
      { id: 't-2', name: 'Ana Costa', relationship: 'Filha', role: 'Regular/Residencial', status: 'available', statusLabel: 'Disponível hoje', skills: ['Residencial', 'Organização'], photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOaUVG8zq2uAOEOFO-AY3_mWIDXyXj4wrY1JZ_vQx9bkknySF3tXqn8rZW_hcEe741Ecl0aoQUmsh-xbaFDhfjTPQxkpYuzQf6MSdZ0n6zhweM3rjG9bzimuyM4V_KMyeF9hDS8KtBXQo7IfsC5JuyIiuKaf4i686qn_f8LcbAK0mpR7dGnslCtkorPPky1kRFiJqmK4M7V0XBrm1F1Ljoc8Vje8JxESEtJC8sWjkrdq81k4TIU9tBb-SfZKnIToRpGZmOcctVn3k' }
    ],
    portfolio: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCi3B8QlxVd8kQqeDOMI0430hvG5Vkqa0Rqnc-vYCFdSL4505-gnSML7pmadrYZ9YdW19j6dg4jzV7zRWFKRpsdqsDve_VUUw5dSYlo8TfINGVAxHZkj71BJInCzjcY7MRJLyj0oQrBkbERD1_u79Jin_pkcW3mgbPS45UzuHKgLy_4mAb6S9FtqQT0hPK13Z0S2WD9pro42ITYj4e-bRG-T0FAypBaGaVAF8-lZi2Ii_ERp4aKMB4-c9pXISPKN3jbNfBLczgCQxg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGsHM3BCjfwTuD8aQlh8AYJRoq0cQ6OJVq1ZYo0BKw0U7ZoNHf2As_i1ntPwUtud0gFqBshvTGuzTgObMqVJmekT94hKAOzt3ClNkRWKqCMShkHjfPuASAYvd96A9LIfk8AyS4ARJ-nzTnV6eLH4FECPMSWZr3tAxvpiLEF16nZroz3nhMsz0YJvBpPoyVGq3-ZXLNqObRFpX8auTfNZe4IY5_5TzL9Mi-n92SE-_75cD8qOPszWF7mxXXnZ0iDf24R1WIfYG9vrU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9U3KakZ7XD3cPJxCzoohhlQ9oNLMwS28jgm9M2VaPjRev3UWmVGoiDLbVqV9IKbAjEKZPvcHtF5Myc2G0ea0-A12fEQKla1Kz_sCvj1WsFSrUyIFMQsGgITyxHv-I838MsX0NK7RGeB-MsFsG5khGgCzXVw9CZ0ilPbywNA6BX1WGmBtkUEG0baTyLM4STeaHhHDwPQDRihtzTPVAY_bIcVD75qDIuQasDFHsn37vSKIPdtynVCGqhViMcgUQX8YichxyheNWgYk'
    ]
  },
  {
    id: 'bela-pele',
    name: 'Clínica Bela Pele',
    category: 'Estética',
    rating: 5.0,
    reviewCount: 89,
    location: 'Pinheiros, São Paulo, SP',
    distance: 'A 3.5km',
    priceLabel: 'A partir de R$ 80/sessão',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC44u3IjxJcwHW1cIGW2bq_VaQ3TkQpsGB21HcGJjr5jvVbl3CXhyPUnH5nsLex6gCE6ETM_qTENmlhA2IrTDSPqZ_qkyVFh2409DNZMND71kgLqmVTFTLiXbFr-4WB_ii99nNMe77ZRWLugTMH3bWxUDmVpkcErDs3ESjfhJ8FvZeZ_rnNs0acEADjRyXpucn-1ufrx_IqK8LZ24-gjv4tGRS_4IaLiv38-YFVdUngdoEe1wx1VqlzVCF5I-OjCprFfTVi60msNMc',
    verified: true,
    about: 'Clínica estética focada no empoderamento e no autocuidado de mulheres reais. Com produtos naturais, orgânicos e tratamentos de última geração conduzidos por profissionais dedicados e de altíssima competência.',
    services: [
      { id: 'bp-3', name: 'Limpeza de Pele Profunda', category: 'Estética', description: 'Tratamento detox com remoção de impurezas, peeling de diamante e máscara com ativos clareadores.', price: 120 },
      { id: 'bp-4', name: 'Massagem Relaxante / Drenagem', category: 'Bem-estar', description: 'Manual com óleos essenciais para desinchar, relaxar os músculos e ativar a circulação.', price: 90 }
    ],
    team: [],
    portfolio: []
  },
  {
    id: 'ana-constroi',
    name: 'Ana Constrói Reformas',
    category: 'Reformas/Manutenção',
    rating: 4.7,
    reviewCount: 45,
    location: 'Moema, São Paulo, SP',
    distance: 'A 5km',
    priceLabel: 'Orçamento gratuito',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7qG52u86GEbKpBHLcSfMg8rp713oRDkxDBoZ6dN--rlzdVZzHvzkNPLotSIVusx9R3nbsJzp_AJH-u48FjPoRuSWLAkZtAQZaRuWvX3KZerzHijoiUCwa2tHpbxrhXejAi4HpNjYEj2rM0qM_aX8__HvC5ktrdkuS67-wqgE6Gk2PaxXPLLT2zEz5c-sT_FNVsg36XzT7zkCKJYuSrRE5mCysTGU-7gapi_PKQXhoPTscpJAWUXdXu265hbc8xuzUr5178gxudG8',
    verified: false,
    about: 'Serviços de reforma residencial e manutenção comercial executados por mulheres engenheiras e profissionais da construção civil. Segurança, compromisso e obra impecável sem surpresas.',
    services: [
      { id: 'bp-5', name: 'Consultoria de Obra', category: 'Reformas', description: 'Análise técnica da viabilidade estrutural, materiais necessários e elaboração de cronograma detalhado.', price: 250 },
      { id: 'bp-6', name: 'Instalação / Pequenas Reformas', category: 'Manutenção', description: 'Serviço hidráulico, elétrico de baixa tensão, fixação de armários e reparações em geral.', price: 150 }
    ],
    team: [],
    portfolio: []
  }
];

export const initialTransactions: Transaction[] = [
  { id: 'tr-1', date: 'Hoje, 10:45', title: 'Consultoria Executiva', client: 'Mariana S.', direction: 'income', value: 1200, status: 'paid', category: 'Consultoria' },
  { id: 'tr-2', date: 'Ontem, 15:30', title: 'Anúncios Instagram', client: 'Meta Ads', direction: 'expense', value: 350, status: 'paid', category: 'Marketing' },
  { id: 'tr-3', date: '12 Nov, 09:00', title: 'Mentoria em Grupo', client: 'Turma 04', direction: 'income', value: 4500, status: 'pending', category: 'Mentoria' },
  { id: 'tr-4', date: '10 Nov, 14:15', title: 'Hospedagem Plataforma', client: 'InovElas Host', direction: 'expense', value: 120, status: 'paid', category: 'Infraestrutura' }
];

export const initialChats: Chat[] = [
  {
    id: 'chat-mariana-costa',
    clientName: 'Mariana Costa',
    clientPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIfG0EM-Tjy1byIdezuqUhkvTICZlILqzrrdYUvXa8X8Nw0nVxikB-a9gEN_uffKOUyOGI85x0__7riN79QL_V3qY_4g5ARALS2t-a7RsVXEzdXcM44BInuZlz-Gq3-TKoynUNmHaHCeA05NkyjuURMalOMWlHnazbQkaPIFRsDDArqcPPtzGanZElinczS0_i3Qs0d-e_tSEn48tmls921lXQMjhWoxZcL1TCb3E4vkJhqYvQgIeRkyYnSuhXa2bDFL9Mj-rSGDY',
    lastMessage: 'Certo, podemos fechar esse horário.',
    unreadCount: 0,
    online: true,
    time: '10:42',
    messages: [
      { id: 'm-1', sender: 'client', text: 'Olá! Gostaria de agendar uma sessão de consultoria financeira para a próxima semana. Vocês têm disponibilidade na terça à tarde?', time: '10:30' },
      { id: 'm-2', sender: 'me', text: 'Olá Mariana, bom dia! Sim, temos um horário disponível às 14h ou às 16h na terça-feira. Qual prefere?', time: '10:35' },
      { id: 'm-3', sender: 'client', text: 'Às 14h seria perfeito. Podemos fazer online?', time: '10:40' },
      { id: 'm-4', sender: 'me', text: 'Com certeza. Vou preparar o resumo do agendamento aqui na plataforma e já te envio para confirmação.', time: '10:41' },
      { id: 'm-5', sender: 'client', text: 'Certo, podemos fechar esse horário.', time: '10:42' }
    ]
  },
  {
    id: 'chat-luciana-silva',
    clientName: 'Luciana Silva',
    clientPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZDmL6jhrBGPiIBvsoSgmtWSFUthG_-UKPNz6maDl_zJGbhuzVUVPr9PzZezXCMJnV2o-xG793VBawQJz5WfDNfObQ0haUpLK8UpW8NespON9e-hxN1eupxgegxJmFzxKu3m6UHsFNnjVcptSn26r1rZFOorkmDcqRf7MqYHTnDtoGJwegSC5VcwcYPDGEku2jKInEz5c4Y6-xQEVMlrYgLJY7D1vGRNLiE8o0jlTosaaR4BtR0bpEewNEP1mocM762LfTQAYFsJ8',
    lastMessage: 'Gostaria de saber mais sobre a mentoria.',
    unreadCount: 2,
    online: false,
    time: 'Ontem',
    messages: [
      { id: 'm-luc-1', sender: 'client', text: 'Olá, gostaria de saber mais sobre como contratar o pacote mensal de mentoria de marca.', time: '14:22' },
      { id: 'm-luc-2', sender: 'client', text: 'Gostaria de saber mais sobre a mentoria.', time: '14:25' }
    ]
  }
];

export const initialForumPosts: ForumPost[] = [
  {
    id: 'post-1',
    authorName: 'Mariana Silva',
    authorRole: 'Estúdio Criativa',
    authorPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKSIWNxEd1cLIWCMsGfs-TPWS43KlzQzXvAuoMo-am8GXLylbu4f8i-S6wv8C74xKG5RGOX7TsMEiS7DoLnP-Mmmp7rC5ezIpPGv5ZjKuYb2xVCHiAyJWATSCXyXQcO4338AMzMR2Y9ohJkvxiBFjJXWHcOhMzNMaVeVy_7VcUPcH1d6HGQgIqXBWhKKyZtllwPHp4yHB2F3yh9nSYTrEE6FODmzABs1eVHpSTdazofT32_yWEgTBmwL_FKj-u59rjY5iJLdILnyo',
    category: 'Dicas de Marketing',
    title: 'Como vocês estão lidando com as mudanças no algoritmo do Instagram?',
    content: 'Tenho notado uma queda significativa no engajamento orgânico nas últimas semanas. Estou pensando em focar mais em Reels e parcerias locais. Alguém mais passando por isso ou tem alguma estratégia que esteja funcionando bem?',
    likes: 24,
    commentsCount: 12,
    timeAgo: 'Há 2 horas',
    userLiked: false
  },
  {
    id: 'post-2',
    authorName: 'Camila Costa',
    authorRole: 'Consultoria Financeira CC',
    authorPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBXEGNcxGmtbFxBmTq_tL7d4TxSXCYjRR_9n5gqh-KfUNiwELChb8QtxqrLDyOKOyCPfQQdipa-3wLcTPNcXlhaSs7fWv08Iu_qSGIiobwS8KtwZORUa-7nsdu6O8m9vx7ur239qaZxp5r2Awu-74lROHD55wo2TI3gm-rWVt2ZxlmqOLcmTQ81ckz8dNP4-AVbQdU2KbWoUUyXucLMhOowgJBLe6qzHz-payYY1kbyY_JkcJkftRflHK_fqliSdYlOXiRHzv2flA',
    category: 'Histórias de Sucesso',
    title: 'Fechamos nosso primeiro grande contrato B2B!',
    content: 'Meninas, queria compartilhar essa vitória com vocês! Depois de meses prospectando, finalmente assinamos com uma grande rede de varejo para consultoria contínua. A dica de ouro foi a estruturação da proposta que aprendi no último webinar aqui da InovElas.',
    likes: 89,
    commentsCount: 34,
    timeAgo: 'Há 5 horas',
    userLiked: true
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'AGD-1042',
    title: 'Consultoria Estratégica',
    date: '15 de Outubro de 2023',
    timeStart: '14:00',
    timeEnd: '15:30',
    status: 'in_progress',
    clientName: 'Mariana Vasconcelos',
    clientEmail: 'mariana.vasconcelos@empresa.com.br',
    clientPhone: '(11) 98765-4321',
    clientPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCukvX3uTvy9GbBMzwc50Bvhw3-1Zx-HGu0vmsuA19Ki9yiduDFVB949UsM3uMJt0CsZQ5iDC7Ibrkd1lYI-SCb0v2Gr0ZktXLz0SszeGTA3oBPEhIzz5ewtGQsjyyZTuj_A_KmJyk-JvtB6ELABRSb4mmmhQccPnl5Ceto0tff0fH9GNv9Oyi0wl1mGygRPm6x0VIb3tmfs3wufJL7eNM78KmRCTl-eAnJSlnnwo4nktBXvI56o89UasTNR_2NGZGSgVqK-ALEEnU',
    employeeName: 'Maria Silva',
    locationDesc: 'Reunião Online',
    category: 'Consultoria Financeira',
    price: 350,
    notes: 'A cliente solicitou uma análise profunda do fluxo de caixa dos últimos 6 meses da sua loja online, com foco em identificar gargalos de despesas operacionais e sugestões para reserva de emergência.',
    timeline: [
      { title: 'Agendamento Realizado', time: '10 Out 2023, 09:15' },
      { title: 'Confirmado pela Empreendedora', time: '11 Out 2023, 14:30' },
      { title: 'Serviço em Andamento', time: '15 Out 2023, 14:00 (Atual)' },
      { title: 'Conclusão do Serviço', time: 'Aguardando marcação' }
    ],
    warning: 'Atendimento Próximo do Prazo Limite de Conclusão.'
  },
  {
    id: 'AGD-1043',
    title: 'Mentoria de Marketing',
    date: '16 de Outubro de 2023',
    timeStart: '11:00',
    timeEnd: '12:00',
    status: 'pending',
    clientName: 'Joana Santos',
    clientEmail: 'joana.santos@marketing.com',
    clientPhone: '(11) 97777-6666',
    clientPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB54_3E9SJgoHpboJjxzVqnwvI2dZ8uk1azrwtds7gaXD-3V9cPwJxJPre5NI5wRJVLm3UkzD62kQIkvT3cA7_ivenrWvM1A0secDFs5e1G4KT7z5aTeCc978Fvy7rX2ucdzq7GC_PK-Tg0gquyhW9O874BBNDoFOuO-xR9ML2horykR_tG-IoAd_g6m7rOQN8f7VMmPscaRasLN8LjD6vL1m7BbVQbulSpdtl9slYBQK8M1OrDjvL2C5HiZhor7uBPoKIkj6IRSXM',
    employeeName: 'Você (InovElas Admin)',
    locationDesc: 'Online (Link na confirmação)',
    category: 'Marketing',
    price: 350,
    timeline: [
      { title: 'Inscrito na plataforma', time: '12 Out 2023, 10:00' }
    ]
  },
  {
    id: 'AGD-1044',
    title: 'Design de Marca',
    date: '17 de Outubro de 2023',
    timeStart: '10:00',
    timeEnd: '12:00',
    status: 'completed',
    clientName: 'Ana Lima',
    clientEmail: 'ana.lima@designstudio.cc',
    clientPhone: '(11) 96666-5555',
    clientPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIxMDXRW5F8PY3gCFstEjg9F2gMVClCSH51b-DPJn2v8NbZM19L9r_3tbZK9lWt0VjqpxgXTcm0D2cQyHIDDXY6wN-l57pneVZslbs9Q4xm9dgS_a0XDYh4GB7_XKsllQErVAAGU45CHSAu_oYf-lNq1kK9s9TC-kebNINYJdlJHML-hQlp93UfaJhLNrGcoX55n4vllxUoe_UYmo8OYN1GQl2fBZIgFLl64k8v_ubaU-X2N9yi-UfZcxufUeAFtce1wjPeWEo1jY',
    employeeName: 'Ana Silva',
    locationDesc: 'Presencial - Moema',
    category: 'Estética / Design',
    price: 500,
    timeline: [
      { title: 'Agendado e Pago', time: '08 Out 2023, 11:20' },
      { title: 'Trabalho Concluído', time: '17 Out 2023, 12:00' }
    ]
  }
];

export const initialReviews: Review[] = [
  { id: 'rev-1', author: 'Carla Ferreira', daysAgo: 'Há 2 dias', rating: 5, text: 'Serviço impecável! A Ana foi super pontual e me atendeu com muita cordialidade. O resultado do procedimento estético superou minhas expectativas. O ambiente também é lindo e acolhedor.', targetMember: 'Ana Silva' },
  { id: 'rev-2', author: 'Sônia Ribeiro', daysAgo: 'Há 5 dias', rating: 4.5, text: 'A Mariana entende perfeitamente o que o cliente quer. Fez um corte moderno que combinou muito comigo. Único ponto é que atrasou uns 5 minutinhos, mas a qualidade compensou demais!', targetMember: 'Mariana Costa' },
  { id: 'rev-3', author: 'Patrícia Gomes', daysAgo: 'Há 8 dias', rating: 5, text: 'Mãos de fada! A sessão de massagem com a Juliana foi a melhor que já tive. O ambiente tem uma música ambiente relaxante incrível. Já deixei meu retorno agendado.', targetMember: 'Juliana Mendes' }
];
