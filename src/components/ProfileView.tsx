import React from 'react';
import { Provider, Service } from '../types';
import { MapPin, Star, Briefcase, Users, Image as PhotoIcon, Award, MessageCircle, Calendar, PlusCircle } from 'lucide-react';

interface ProfileViewProps {
  provider: Provider;
  onNavigate: (view: string) => void;
  onAddServiceToCheckout: (service: Service, provider: Provider) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  provider,
  onNavigate,
  onAddServiceToCheckout
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Cover and header profile overlap section */}
      <header className="relative mb-6 bg-white rounded-3xl border border-[#eff4ff] shadow-sm overflow-hidden">
        {/* Cover Photo */}
        <div 
          className="bg-cover bg-center w-full h-48 md:h-64" 
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLaEJG0qqn91Q0fosbqVDszMmFyy273ZQXG2YlYl75V83i9T3UK7KZDlZpfWKenSUQrxYXPEy8Z2F2IRFLX5rTVKBezjPAS_cAbw4LGxAbB6VaSclZ_dNnMDR8K7UDmb2jMD5Eq3w3Jx8MdQlL_7SEtejCIfQdcHn4vA1C-OR0iIc9AyQqB87y54N8x2aPc7QiUulJ_UyowqRFSGKxscEDpFvVFdyVHsTwl6BDihXvapRt18EhyEdtqRA8Xgsw3h0VWeRJf4u8VZ8')` }}
        />
        
        <div className="px-6 pb-6 pt-16 relative">
          {/* Profile Avatar */}
          <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden shadow-md bg-white">
            <img 
              src={provider.photo} 
              alt={provider.name} 
              className="w-28 h-28 object-cover" 
            />
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mt-2">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{provider.name}</h1>
                {provider.verified && (
                  <span className="text-pink-600 bg-pink-50 p-1.5 rounded-full inline-flex" title="Perfil Verificado">
                    <Award size={18} />
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                <MapPin size={14} className="text-pink-600" />
                {provider.location}
              </p>

              {/* Rating and Reviews Counter */}
              <div className="flex items-center gap-2 mt-2 bg-[#f8f9ff] py-1 px-3 rounded-full w-fit border border-[#eff4ff]">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-700">{provider.rating} ({provider.reviewCount} avaliações)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={() => onNavigate('chat')}
                className="flex-1 md:flex-none border border-pink-300 text-pink-700 font-bold px-6 py-2.5 rounded-xl hover:bg-pink-50 transition-colors text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={16} />
                Ver Contatos
              </button>
              <button 
                onClick={() => onNavigate('booking')}
                className="flex-1 md:flex-none bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar size={16} />
                Solicitar Orçamento
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <h2 className="text-base font-bold text-slate-800 mb-2">Sobre o Negócio</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {provider.about}
            </p>
          </div>
        </div>
      </header>

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Services offered & Portfolio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Services Offered list */}
          <section className="bg-white rounded-2xl p-6 border border-[#eff4ff] shadow-sm">
            <h2 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-50 pb-3">
              <Briefcase className="text-pink-600" size={18} />
              Serviços Ofertados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {provider.services.map((service) => (
                <div 
                  key={service.id}
                  className="bg-[#f8f9ff] hover:bg-white rounded-2xl p-5 border border-[#eff4ff] flex flex-col justify-between hover:shadow-md transition-all group hover:scale-[1.01]"
                >
                  <div>
                    <span className="text-[10px] bg-pink-100 text-pink-800 px-3 py-1 font-bold rounded-full mb-3 inline-block">
                      {service.category}
                    </span>
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-pink-600 transition-colors mb-2">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 capitalize">Valor</span>
                      <span className="font-bold text-pink-600 text-sm">
                        R$ {service.price.toFixed(2)} {service.perTime ? ` / ${service.perTime}` : ''}
                      </span>
                    </div>
                    {/* Add to checkout trigger */}
                    <button 
                      onClick={() => onAddServiceToCheckout(service, provider)}
                      className="bg-white hover:bg-pink-600 text-pink-600 hover:text-white border border-pink-200 hover:border-pink-600 p-2 rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
                      title="Contratar este serviço"
                    >
                      <PlusCircle size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Portfolio Portfolio picture gallery */}
          {provider.portfolio.length > 0 && (
            <section className="bg-white rounded-2xl p-6 border border-[#eff4ff] shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-50 pb-3">
                <PhotoIcon className="text-pink-600" size={18} />
                Galeria e Certificações
              </h2>
              <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden bg-slate-50 p-2">
                <div className="col-span-2 row-span-2 aspect-video overflow-hidden rounded-xl border border-[#eff4ff]">
                  <img 
                    src={provider.portfolio[1] || provider.portfolio[0]} 
                    alt="Portfolio 1" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl border border-[#eff4ff]">
                  <img 
                    src={provider.portfolio[0]} 
                    alt="Portfolio 2" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl border border-[#eff4ff]">
                  <img 
                    src={provider.portfolio[2] || provider.portfolio[0]} 
                    alt="Portfolio 3" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sidebar (Relation info & Ratings Score wall) */}
        <div className="space-y-6">
          {/* Team registered list */}
          {provider.team.length > 0 && (
            <section className="bg-[#eff4ff] dark:bg-slate-800 rounded-2xl p-5 border border-pink-100">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 border-b border-pink-200 pb-2">
                <Users className="text-pink-600" size={16} />
                Equipe de Suporte Familiar
              </h2>
              <div className="space-y-3">
                {provider.team.map((member) => (
                  <div 
                    key={member.id} 
                    className="flex items-center gap-3 p-3 bg-white dark:bg-[#111c2d] rounded-xl border border-[#eff4ff]"
                  >
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-10 h-10 rounded-full object-cover border border-[#f1f5f9]" 
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-white">{member.name}</h4>
                      <p className="text-[10px] text-pink-600 font-semibold">{member.relationship} • {member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick review/comments block */}
          <section className="bg-white rounded-2xl p-5 border border-[#eff4ff] shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center justify-between border-b pb-2 border-slate-50">
              <span>Avaliações Recentes</span>
              <span className="text-[10px] text-pink-600 hover:underline cursor-pointer" onClick={() => onNavigate('reviews')}>Ver todas</span>
            </h2>
            <div className="space-y-4">
              <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#eff4ff]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs">J</div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Juliana M.</h5>
                    <span className="text-[9px] text-slate-400">Há 2 dias</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">
                  "Serviço impecável! A equipe da Maria foi extremamente cuidadosa com meus móveis e deixou a casa brilhando. Recomendo de olhos fechados."
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
