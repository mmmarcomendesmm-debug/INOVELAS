import React, { useState } from 'react';
import { ForumPost } from '../types';
import { MessageSquare, Heart, Share2, Sparkles, PlusCircle, Filter } from 'lucide-react';

interface CommunityViewProps {
  posts: ForumPost[];
  onAddPost: (post: ForumPost) => void;
  onLikePost: (id: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  posts,
  onAddPost,
  onLikePost
}) => {
  const [filterCat, setFilterCat] = useState<string>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCat, setNewCat] = useState('Dicas de Marketing');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    onAddPost({
      id: 'post-' + Math.floor(Math.random() * 10000),
      authorName: 'Sônia Ribeiro (Você)',
      authorRole: 'Brilho Perfeito',
      authorPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcg-yydbJMyJgO-eEUl2wAt3syk9eZWMYAnw57PgLNR2s546WwbqSF3sVVv2cc-bFttRPLPEdmPtGsY0i9esKN5tD-i1eQJs458BqVxKA__8ceGT9cly1wU_UsibN-Q71iaEeZ_aFjzuWLn3dT58t0YR1KD2fDgXpEdp1bocFxXiGUH4-yCxgc60m62oAg55oYqfkIQi5LpOn4pUWUYj8qCWr9MW62nHxEs8UgiCRNhTzfGULxRKTyGC4EpM19aXdiAoa3CI0362k',
      category: newCat,
      title: newTitle,
      content: newContent,
      likes: 0,
      commentsCount: 0,
      timeAgo: 'Agora mesmo',
      userLiked: false
    });

    setNewTitle('');
    setNewContent('');
  };

  const categories = ['Dicas de Marketing', 'Histórias de Sucesso', 'Parcerias', 'Desafios Diários'];

  const filteredPosts = posts.filter(post => {
    if (filterCat === 'all') return true;
    return post.category === filterCat;
  });

  return (
    <div className="flex-1 overflow-y-auto space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Comunidade de Empreendedoras</h1>
        <p className="text-xs text-slate-500">Troque dicas, faça parcerias comerciais e inspire-se com histórias de outras mulheres líderes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Discussion posts left panel */}
        <div className="lg:col-span-2 space-y-5">
          {/* Categories tag bar filter */}
          <section className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setFilterCat('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${filterCat === 'all' ? 'bg-purple-700 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50 border border-[#eff4ff]'}`}
            >
              Feed Geral
            </button>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setFilterCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${filterCat === cat ? 'bg-purple-700 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50 border border-[#eff4ff]'}`}
              >
                {cat}
              </button>
            ))}
          </section>

          {/* New post builder launcher card */}
          <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2 font-bold text-slate-700 text-xs">
              <Sparkles size={16} className="text-purple-600 animate-spin" /> Compartilhar dúvida ou conquista...
            </div>
            <form onSubmit={handleCreatePost} className="space-y-3">
              <input 
                type="text" 
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Insira um título chamativo..." 
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2.5 px-4 text-xs font-semibold text-[#0b1c30] transition-colors"
              />
              <textarea 
                rows={3}
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Escreva sua publicação aqui..." 
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2.5 px-4 text-xs font-semibold text-[#0b1c30] transition-colors resize-none"
              />

              <div className="flex justify-between items-center flex-wrap gap-2 pt-2">
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="bg-[#f8f9ff] hover:bg-white border rounded-xl py-2 px-3 text-xs font-semibold text-[#0b1c30]"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
                <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-2 px-5 rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer">
                  Publicar no Feed <PlusCircle size={14} />
                </button>
              </div>
            </form>
          </section>

          {/* Posts list ledger */}
          <section className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl border border-[#eff4ff] p-5 shadow-sm space-y-4 hover:shadow-md transition-all">
                {/* Author row */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-50 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.authorPhoto} 
                      alt={post.authorName} 
                      className="w-10 h-10 rounded-full object-cover border" 
                    />
                    <div>
                      <h4 className="font-extrabold text-[#0b1c30] text-xs">{post.authorName}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{post.authorRole} • {post.timeAgo}</p>
                    </div>
                  </div>
                  <span className="bg-pink-100 text-pink-800 font-bold px-3 py-1 rounded-full text-[9px]">
                    {post.category}
                  </span>
                </div>

                {/* Post body content */}
                <div className="space-y-2">
                  <h3 className="font-black text-slate-800 text-sm leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                </div>

                {/* Actions row footer */}
                <div className="pt-3 border-t border-slate-50 flex justify-between items-center text-slate-400 text-xs">
                  <button 
                    onClick={() => onLikePost(post.id)}
                    className={`flex items-center gap-1 font-semibold cursor-pointer transition-colors ${post.userLiked ? 'text-pink-650 text-pink-600' : 'hover:text-pink-600'}`}
                  >
                    <Heart size={14} className={post.userLiked ? 'fill-pink-600 stroke-pink-650' : ''} />
                    <span>{post.likes} Curtidas</span>
                  </button>

                  <button className="flex items-center gap-1 hover:text-purple-700 font-semibold cursor-pointer">
                    <MessageSquare size={14} />
                    <span>{post.commentsCount} Comentários</span>
                  </button>

                  <button className="flex items-center gap-1 hover:text-slate-600 font-semibold cursor-pointer">
                    <Share2 size={13} />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Right column elements (upcoming webinars, active leaders) */}
        <div className="space-y-6">
          <section className="bg-[#eff4ff] dark:bg-[#111c2d] border border-pink-150 rounded-3xl p-5 space-y-4">
            <h3 className="font-extrabold text-[#0b1c30] dark:text-white text-xs border-b pb-2">Webinars & Mentorias</h3>
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full inline-block mb-1.5">Mentoria Exclusiva</span>
                <h4 className="font-bold text-slate-800 dark:text-white">Captação B2B para cooperativas</h4>
                <p className="text-[10px] text-slate-500 mt-1">Sexta-feira, às 19:30 • Gratuito via Zoom</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block mb-1.5">Marketing Estratégico</span>
                <h4 className="font-bold text-slate-800 dark:text-white">Alavanque vendas com vídeos curtos</h4>
                <p className="text-[10px] text-slate-500 mt-1">Dia 20 de Out • Com Roberta Vasques</p>
              </div>
            </div>
          </section>

          {/* Active members */}
          <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-4 space-y-3">
            <h3 className="font-extrabold text-slate-800 text-xs border-b pb-2">Destaques da Comunidade</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-pink-150 bg-pink-100 flex items-center justify-center font-bold text-xs text-pink-700 shrink-0">RC</div>
                <div>
                  <h5 className="font-semibold text-xs text-slate-800">Roberta Constrói</h5>
                  <p className="text-[9px] text-slate-400">95 respostas úteis nesta semana</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-150 bg-purple-100 flex items-center justify-center font-bold text-xs text-purple-700 shrink-0">CC</div>
                <div>
                  <h5 className="font-semibold text-xs text-slate-800">Camila Consultoria</h5>
                  <p className="text-[9px] text-slate-400">Palestrante do último bootcamp</p>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};
