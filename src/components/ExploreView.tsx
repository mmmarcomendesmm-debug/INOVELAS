import React, { useState } from 'react';
import { Provider } from '../types';
import { Search, MapPin, Star, ShieldAlert, Award, ArrowRight } from 'lucide-react';

interface ExploreViewProps {
  providers: Provider[];
  onSelectProvider: (provider: Provider) => void;
  onNavigate: (view: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  providers,
  onSelectProvider,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [urgentMode, setUrgentMode] = useState(false);

  // Filter logic
  const filtered = providers.filter(provider => {
    const matchesSearch = searchQuery === '' || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.about.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || 
      provider.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesUrgent = !urgentMode || provider.verified; // Verified represent urgent capacity here

    return matchesSearch && matchesCategory && matchesUrgent;
  });

  const categories = [
    { name: 'Faxina', icon: '🧹', searchKey: 'Limpeza' },
    { name: 'Cuidado com Idosos', icon: '👵', searchKey: 'Cuidado' },
    { name: 'Reformas', icon: '🛠️', searchKey: 'Reforma' },
    { name: 'Estética', icon: '💆‍♀️', searchKey: 'Estética' }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-6 text-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-50/50 rounded-2xl mb-8 border border-pink-100 shadow-sm">
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
            O que você precisa hoje?
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto mb-6">
            Conecte-se com mulheres empreendedoras verificadas e encontre serviços de excelência perto de você.
          </p>

          {/* Search bar */}
          <div className="w-full bg-[#f8f9ff]/90 border border-slate-200 rounded-full p-2 flex items-center shadow-md mb-4 bg-white focus-within:ring-2 focus-within:ring-pink-400 focus-within:border-transparent transition-all">
            <Search className="text-slate-400 ml-3 mr-2" size={20} />
            <input 
              type="text"
              placeholder="Ex: Faxina, Manicure, Reforma..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent border-none text-[#0b1c30] placeholder-slate-400 py-2 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 mr-2"
              >
                Limpar
              </button>
            )}
            <button className="bg-pink-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-pink-700 transition-colors shadow-sm">
              Buscar
            </button>
          </div>

          {/* Urgent button */}
          <button 
            onClick={() => setUrgentMode(!urgentMode)}
            className={`flex items-center gap-2 border px-5 py-2.5 rounded-full transition-all group ${
              urgentMode 
                ? 'bg-pink-600 text-white border-pink-600 scale-95 shadow-md shadow-pink-100' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className={`transition-transform duration-300 ${urgentMode ? 'scale-125 animate-pulse text-amber-300' : 'text-pink-600 group-hover:scale-110'}`}>⚡</span>
            <span className="font-semibold text-xs">Modo Urgente/Hoje</span>
          </button>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-5">Categorias Populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedCategory(selectedCategory === cat.searchKey ? null : cat.searchKey)}
              className={`p-5 rounded-2xl flex flex-col items-center justify-center border text-center transition-all cursor-pointer ${
                selectedCategory === cat.searchKey 
                  ? 'bg-pink-50 border-pink-600 ring-2 ring-pink-400 scroll-mt-2 scale-[1.02] shadow-md shadow-pink-100' 
                  : 'bg-white border-[#f1f5f9] shadow-sm hover:translate-y-[-2px] hover:shadow-md'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-pink-100 text-2xl flex items-center justify-center mb-2">
                {cat.icon}
              </div>
              <span className="text-xs font-semibold text-slate-800">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Near Providers Section */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Empreendedoras Próximas</h2>
            <p className="text-xs text-slate-500">Profissionais verificadas de confiança perto de você.</p>
          </div>
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold text-pink-600 hover:underline"
            >
              Ver Todas
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-slate-500 border border-slate-100 shadow-sm">
            Nenhuma empreendedora encontrada para esta pesquisa. Tente remover filtros ou buscar outro termo!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((provider) => (
              <div 
                key={provider.id}
                className="bg-white rounded-2xl p-4 border border-[#eff4ff] shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all flex flex-col group justify-between"
              >
                <div>
                  {/* Top info */}
                  <div className="flex items-start gap-3 mb-3">
                    <img 
                      src={provider.photo} 
                      alt={provider.name} 
                      className="w-16 h-16 rounded-xl object-cover" 
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          {provider.category}
                        </span>
                        {provider.verified && (
                          <span 
                            className="text-emerald-600 flex items-center gap-0.5 text-[10px] font-bold"
                            title="Perfil Verificado"
                          >
                            <Award size={12} /> Verificada
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm mt-1 group-hover:text-pink-600 transition-colors">
                        {provider.name}
                      </h3>
                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-slate-800">{provider.rating}</span>
                        <span className="text-slate-400">({provider.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Location */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-3 bg-[#f8f9ff] px-2 py-1.5 rounded-lg border border-[#eff4ff]">
                    <MapPin size={12} className="text-pink-600" />
                    <span>{provider.location} - {provider.distance}</span>
                  </div>

                  {/* Body description */}
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {provider.about}
                  </p>
                </div>

                {/* Card footer */}
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide">Valor inicial</span>
                    <span className="font-bold text-slate-800 text-xs">{provider.priceLabel}</span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => onSelectProvider(provider)}
                      className="bg-pink-50 text-pink-700 hover:bg-pink-100 font-bold px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer"
                    >
                      Ver Perfil
                    </button>
                    <button 
                      onClick={() => {
                        onSelectProvider(provider);
                        onNavigate('booking');
                      }}
                      className="bg-pink-600 text-white hover:bg-pink-700 font-bold px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer shadow-sm shadow-pink-100"
                    >
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
