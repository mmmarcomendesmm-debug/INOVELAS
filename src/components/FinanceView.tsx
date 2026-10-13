import React, { useState } from 'react';
import { Transaction } from '../types';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, Printer, Download, Filter, FileText } from 'lucide-react';

interface FinanceViewProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Transaction) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({
  transactions,
  onAddTransaction
}) => {
  const [filterDirection, setFilterDirection] = useState<'all' | 'income' | 'expense'>('all');
  
  // Add new manual transaction form states
  const [newTitle, setNewTitle] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newDirection, setNewDirection] = useState<'income' | 'expense'>('income');
  const [newCategory, setNewCategory] = useState('Consultoria');

  const filteredTrans = transactions.filter(t => {
    if (filterDirection === 'all') return true;
    return t.direction === filterDirection;
  });

  const totalIncomes = transactions.filter(t => t.direction === 'income').reduce((sum, t) => sum + t.value, 0);
  const totalExpenses = transactions.filter(t => t.direction === 'expense').reduce((sum, t) => sum + t.value, 0);
  const currentBalance = totalIncomes - totalExpenses;

  // Monthly comparison chart helper data
  const monthlyData = [
    { month: 'Jan', value: 1800, budget: 1500 },
    { month: 'Fev', value: 2400, budget: 2000 },
    { month: 'Mar', value: 3100, budget: 2500 },
    { month: 'Abr', value: 2900, budget: 3000 },
    { month: 'Mai', value: 4500, budget: 3500 },
    { month: 'Jun', value: 5700, budget: 4000 }
  ];

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newValue) {
      alert('Preencha os campos obrigatórios!');
      return;
    }
    onAddTransaction({
      id: 'tr-' + Math.floor(Math.random() * 10000),
      date: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      title: newTitle,
      client: newClient || 'Geral/Avulso',
      direction: newDirection,
      value: parseFloat(newValue),
      status: 'paid',
      category: newCategory
    });
    setNewTitle('');
    setNewValue('');
    setNewClient('');
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Finanças / Relatórios</h1>
          <p className="text-xs text-slate-500">Mantenha a saúde financeira de sua empresa cooperativa estruturada e transparente.</p>
        </div>

        {/* Action button rows */}
        <div className="flex gap-2">
          <button type="button" onClick={() => window.print()} className="border border-slate-200 text-slate-600 hover:text-purple-700 hover:bg-slate-50 p-2.5 rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer">
            <Printer size={14} /> Imprimir Relatório
          </button>
          
          <button type="button" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-purple-50">
            <Download size={14} /> Exportar CSV
          </button>
        </div>
      </div>

      {/* Finance Bento cards row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Actual balance */}
        <div className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-6 rounded-3xl border-none shadow-md shadow-purple-100 flex flex-col justify-between h-44">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-black tracking-wider text-purple-200">Saldo Atual Líquido</span>
            <DollarSign className="text-purple-200" size={20} />
          </div>
          <div>
            <p className="text-3xl font-black tracking-tight">R$ {currentBalance.toFixed(2)}</p>
            <p className="text-[10px] text-purple-200 mt-1">Disponível para transferir/PIX</p>
          </div>
        </div>

        {/* Monthly Income vs goals line progress bar */}
        <div className="bg-white p-6 rounded-3xl border border-[#eff4ff] shadow-sm flex flex-col justify-between h-44">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Receita Acumulada</span>
            <span className="text-emerald-600 bg-emerald-55 p-1 rounded-full"><ArrowUpRight size={16} /></span>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">R$ {totalIncomes.toFixed(2)}</p>
            <div className="mt-2">
              {/* Progress target vs 20k target */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((totalIncomes/20000)*100, 100)}%` }} />
              </div>
              <p className="text-[9px] text-slate-400 mt-1.5">Meta Mensal: {((totalIncomes/20000)*100).toFixed(1)}% atingido do objetivo de R$ 20.000</p>
            </div>
          </div>
        </div>

        {/* Monthly expenses cards */}
        <div className="bg-white p-6 rounded-3xl border border-[#eff4ff] shadow-sm flex flex-col justify-between h-44">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Despesas do Mês</span>
            <span className="text-rose-600 bg-rose-50 p-1.5 rounded-full"><ArrowDownRight size={16} /></span>
          </div>
          <div>
            <p className="text-2xl font-black text-[#0b1c30]">R$ {totalExpenses.toFixed(2)}</p>
            <p className="text-[10px] text-slate-400 mt-1">Gargalo principal: anúncios de marketing digital</p>
          </div>
        </div>
      </section>

      {/* Comparison CSS chart & New transaction adder form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CSS dashboard budget comparison chart */}
        <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-6 lg:col-span-2 space-y-6">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm">Comparativo de Receitas (Semestre)</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Visão de barras comparativa entre faturamento real (azul) e objetivo orçado (cinza).</p>
          </div>

          <div className="h-48 flex items-end justify-between gap-4 pt-4 border-b border-slate-100">
            {monthlyData.map((item, idx) => {
              const maxVal = 6000;
              const valHeight = (item.value / maxVal) * 100;
              const budHeight = (item.budget / maxVal) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex justify-center items-end gap-1 mb-2 h-36">
                    {/* Budget bar (light gray) */}
                    <div 
                      className="w-2 sm:w-3 bg-slate-200 rounded-t-sm transition-all duration-500 hover:bg-slate-300"
                      style={{ height: `${budHeight}%` }}
                      title={`Orçado: R$ ${item.budget}`}
                    />
                    {/* Revenue real bar (deep purple) */}
                    <div 
                      className="w-3 sm:w-4 bg-purple-700 rounded-t-sm transition-all duration-500 hover:bg-purple-800"
                      style={{ height: `${valHeight}%` }}
                      title={`Faturamento Real: R$ ${item.value}`}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">{item.month}</span>
                </div>
              );
            })}
          </div>

          {/* Bar legend block */}
          <div className="flex gap-4 text-xs justify-center text-slate-450 pt-2 text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-200 rounded-sm" /> Orçado Estimado</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-purple-700 rounded-sm" /> Faturamento Real</span>
          </div>
        </section>

        {/* Quick launcher transaction registry form */}
        <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-5 space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm pb-2 border-b border-slate-50">Registrar Lançamento</h3>

          <form onSubmit={handleCreateTransaction} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Título do Lançamento *</label>
              <input 
                type="text" 
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ex: Diária de faxina, Material de pós-obra" 
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2 px-3 text-xs font-semibold text-[#0b1c30] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Valor (R$) *</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="350.00" 
                  className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2 px-3 text-xs font-semibold text-[#0b1c30] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Direção</label>
                <select 
                  value={newDirection}
                  onChange={(e) => setNewDirection(e.target.value as 'income' | 'expense')}
                  className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2 px-2 text-xs font-semibold text-[#0b1c30]"
                >
                  <option value="income">Receita (+)</option>
                  <option value="expense">Despesa (-)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Doador/Cliente</label>
              <input 
                type="text" 
                value={newClient}
                onChange={(e) => setNewClient(e.target.value)}
                placeholder="Ex: Mariana Costa" 
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2 px-3 text-xs font-semibold text-[#0b1c30] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Categoria</label>
              <select 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-[#f8f9ff] hover:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 py-2 px-2 text-xs font-semibold text-[#0b1c30]"
              >
                <option value="Limpeza">Limpeza Residencial</option>
                <option value="Especializado">Pós-Obra</option>
                <option value="Marketing">Anúncios/Marketing</option>
                <option value="Infraestrutura">Softwares/Local</option>
                <option value="Consultoria">Consultoria Técnica</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-2.5 rounded-xl text-xs transition-colors shadow-sm focus:outline-none"
            >
              Registrar Lançamento ✔
            </button>
          </form>
        </section>

      </div>

      {/* Transaction log ledger table */}
      <section className="bg-white rounded-3xl border border-[#eff4ff] shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 flex-wrap gap-2">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm">Livro Razão de Lançamentos</h3>
            <p className="text-[10px] text-slate-400">Lista completa de faturamento verificado de agendamentos e compras registradas.</p>
          </div>

          <div className="flex gap-1">
            <button 
              onClick={() => setFilterDirection('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterDirection === 'all' ? 'bg-purple-100 text-purple-900 shadow-inner' : 'text-slate-400 hover:text-purple-700'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFilterDirection('income')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterDirection === 'income' ? 'bg-emerald-100 text-emerald-900 shadow-inner' : 'text-slate-400 hover:text-emerald-600'}`}
            >
              Entradas
            </button>
            <button 
              onClick={() => setFilterDirection('expense')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterDirection === 'expense' ? 'bg-rose-100 text-rose-900 shadow-inner' : 'text-slate-400 hover:text-rose-600'}`}
            >
              Saídas
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                <th className="py-3 px-4">Lançamento</th>
                <th className="py-3 px-4">Doador/Cliente</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrans.map((t) => (
                <tr key={t.id} className="border-b border-slate-50 hover:bg-[#f8f9ff] transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <span className={`p-1.5 rounded-full ${t.direction === 'income' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {t.direction === 'income' ? '+' : '-'}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-[#0b1c30]">{t.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{t.date} • {t.category}</p>
                    </div>
                  </td>
                  <td className="py-3 pt-4 px-4 text-slate-600 font-medium">
                    {t.client}
                  </td>
                  <td className="py-3 pt-5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full font-bold text-[9px] uppercase tracking-wide">
                      {t.status === 'paid' ? 'Efetivado' : 'Aguardando'}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-right font-black ${t.direction === 'income' ? 'text-emerald-600' : 'text-rose-605 text-rose-600'}`}>
                    R$ {t.value.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
