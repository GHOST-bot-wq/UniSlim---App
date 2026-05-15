import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { ScanResult } from '../../types';
import Button from '../ui/Button';

interface ScanResultProps {
  result: ScanResult;
  onAdd: () => void;
  onRescan: () => void;
  dailyConsumed: number;
  dailyGoal: number;
}

const COLORS = ['#FF6B35', '#34C759', '#007AFF'];

const qualityConfig: Record<string, { bg: string; border: string; icon: string }> = {
  excelente: { bg: 'bg-green-50', border: 'border-green-400', icon: '✅' },
  boa: { bg: 'bg-green-50', border: 'border-green-300', icon: '✅' },
  moderada: { bg: 'bg-yellow-50', border: 'border-yellow-400', icon: '⚠️' },
  ruim: { bg: 'bg-red-50', border: 'border-red-400', icon: '🔴' },
};

const ScanResultCard: React.FC<ScanResultProps> = ({ result, onAdd, onRescan, dailyConsumed, dailyGoal }) => {
  const macroData = [
    { name: 'Prot', value: result.total_proteina },
    { name: 'Carbs', value: result.total_carbs },
    { name: 'Gord', value: result.total_gordura },
  ];
  const q = qualityConfig[result.qualidade] || qualityConfig.moderada;
  const newTotal = dailyConsumed + result.total_calorias;
  const pctUsed = Math.round((newTotal / dailyGoal) * 100);

  return (
    <div className="bg-[var(--surface)] rounded-t-3xl animate-slide-up">
      {/* Header */}
      <div className="rounded-t-3xl px-5 py-4 text-white" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' }}>
        <p className="text-sm font-medium opacity-80">📊 Análise Nutricional Completa</p>
        <p className="font-bold text-lg mt-1">{result.prato}</p>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Items */}
        {result.itens.map((item, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <div>
              <span className="font-medium text-sm">{item.nome}</span>
              <span className="text-xs text-[var(--text-3)] ml-1">({item.peso_g}g)</span>
            </div>
            <span className="font-mono font-bold text-sm">{item.calorias} kcal</span>
          </div>
        ))}

        {/* Total */}
        <div className="rounded-xl p-3 text-white text-center" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' }}>
          <span className="font-mono text-2xl font-bold">{result.total_calorias}</span>
          <span className="text-sm ml-1">kcal</span>
          <div className="flex justify-center gap-4 mt-1 text-xs opacity-90">
            <span>🍗 {result.total_proteina}g</span>
            <span>🌾 {result.total_carbs}g</span>
            <span>🥑 {result.total_gordura}g</span>
          </div>
        </div>

        {/* Donut */}
        <div className="flex items-center justify-center">
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie data={macroData} innerRadius={35} outerRadius={50} dataKey="value" strokeWidth={0}>
                {macroData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="ml-4 space-y-1 text-xs">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background: COLORS[0]}} /> Proteína {Math.round((result.total_proteina*4/result.total_calorias)*100)}%</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background: COLORS[1]}} /> Carbs {Math.round((result.total_carbs*4/result.total_calorias)*100)}%</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background: COLORS[2]}} /> Gordura {Math.round((result.total_gordura*9/result.total_calorias)*100)}%</div>
          </div>
        </div>

        {/* Daily context */}
        <div>
          <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pctUsed, 100)}%`, background: 'linear-gradient(90deg, #FF6B35, #FF3CAC)' }} />
          </div>
          <p className="text-xs text-[var(--text-3)] mt-1">{newTotal} de {dailyGoal} kcal hoje — {pctUsed}% da meta</p>
        </div>

        {/* AI Evaluation */}
        <div className={`${q.bg} border ${q.border} rounded-xl p-3`}>
          <p className="text-sm font-medium">{q.icon} {result.mensagem}</p>
          {result.sugestao && <p className="text-xs text-[var(--text-2)] mt-1">💡 {result.sugestao}</p>}
        </div>

        <p className="text-[10px] text-center text-[var(--text-3)]">Estimativa com ~85-95% de precisão. Valores podem variar.</p>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <Button variant="gradient" fullWidth size="lg" onClick={onAdd}>✅ Adicionar ao diário</Button>
          <Button variant="white" fullWidth onClick={onRescan}>🔄 Escanear novamente</Button>
        </div>
      </div>
    </div>
  );
};

export default ScanResultCard;
