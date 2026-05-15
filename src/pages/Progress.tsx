import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import WeightChart from '../components/charts/WeightChart';
import ProgressRing from '../components/charts/ProgressRing';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import GradientText from '../components/brand/GradientText';
import { useLogStore } from '../stores/logStore';
import { useAuthStore } from '../stores/authStore';
import { useGamificationStore, LEVELS } from '../stores/gamificationStore';
import { useUIStore } from '../stores/uiStore';
import { calculateBMI, getBMICategory } from '../utils/calculations';

const Progress: React.FC = () => {
  const { session, profile } = useAuthStore();
  const { weightLogs, fetchWeightHistory, addWeightLog } = useLogStore();
  const { xp, level, levelTitle, streak, badges, xpProgress, weeklyChallenge } = useGamificationStore();
  const { addToast } = useUIStore();
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [badgeFilter, setBadgeFilter] = useState('todos');

  useEffect(() => { if (session?.user?.id) fetchWeightHistory(session.user.id); }, [session?.user?.id]);

  const currentWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].peso : (profile?.peso_atual || 80);
  const goalWeight = profile?.peso_meta || 65;
  const lost = profile?.peso_atual ? Number((profile.peso_atual - currentWeight).toFixed(1)) : 0;
  const goalPct = profile?.peso_atual ? Math.round(((profile.peso_atual - currentWeight) / (profile.peso_atual - goalWeight)) * 100) : 0;
  const bmi = calculateBMI(currentWeight, profile?.altura || 170);
  const bmiCat = getBMICategory(bmi);

  const handleAddWeight = async () => {
    if (!newWeight || !session?.user?.id) return;
    try {
      await addWeightLog(session.user.id, Number(newWeight));
      addToast({ type: 'success', message: 'Peso registrado! ⚖️' });
      setShowAddWeight(false); setNewWeight('');
    } catch { addToast({ type: 'error', message: 'Erro' }); }
  };

  const filteredBadges = badgeFilter === 'todos' ? badges : badges.filter(b => b.category === badgeFilter);

  return (
    <div className="pb-24">
      <Header height="100px"><h1 className="text-xl font-bold text-white">Progresso</h1></Header>
      <div className="px-4 -mt-2 space-y-3">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">Evolução do Peso</h3>
            <button onClick={() => setShowAddWeight(true)} className="w-8 h-8 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center">+</button>
          </div>
          <WeightChart data={weightLogs} height={180} showAxes />
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card><p className="text-sm text-[var(--text-3)]">🏆 Perdidos</p><GradientText className="text-2xl font-bold">{lost > 0 ? lost : 0} kg</GradientText></Card>
          <Card><p className="text-sm text-[var(--text-3)]">🔥 Streak</p><p className="text-2xl font-bold">{streak} dias</p></Card>
          <Card><p className="text-sm text-[var(--text-3)]">📅 Jornada</p><p className="text-2xl font-bold">{profile ? Math.floor((Date.now() - new Date(profile.updated_at).getTime()) / 86400000) : 0} dias</p></Card>
          <Card className="flex flex-col items-center"><p className="text-sm text-[var(--text-3)] mb-1">Meta</p><ProgressRing progress={Math.max(goalPct, 0)} size={50} color="#34C759"><span className="text-xs font-bold">{Math.max(goalPct, 0)}%</span></ProgressRing></Card>
        </div>

        <Card>
          <h3 className="font-bold text-sm mb-3">IMC</h3>
          <div className="h-3 rounded-full overflow-hidden flex"><div className="flex-1 bg-blue-400" /><div className="flex-1 bg-green-400" /><div className="flex-1 bg-yellow-400" /><div className="flex-1 bg-red-400" /></div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold">IMC: {bmi}</p>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: bmiCat.color + '20', color: bmiCat.color }}>{bmiCat.label}</span>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-sm mb-2">Conquistas 🏅</h3>
          <p className="text-sm mb-1">Nível {level} — {levelTitle}</p>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-1"><div className="h-full rounded-full" style={{ width: `${xpProgress()}%`, background: 'linear-gradient(90deg, #FF6B35, #FF3CAC)' }} /></div>
          <p className="text-xs text-[var(--text-3)] mb-3">{xp} XP</p>
          <div className="flex gap-1 overflow-x-auto no-scrollbar mb-3">
            {['todos', 'streak', 'peso', 'treino', 'jejum', 'scanner'].map(f => (
              <button key={f} onClick={() => setBadgeFilter(f)} className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${badgeFilter === f ? 'text-white' : 'bg-gray-100 text-[var(--text-3)]'}`} style={badgeFilter === f ? { background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' } : {}}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {filteredBadges.map(b => (
              <div key={b.id} className={`text-center p-2 rounded-xl ${b.unlocked ? 'bg-orange-50' : 'bg-gray-50 opacity-40'}`}>
                <span className="text-xl">{b.unlocked ? b.emoji : '🔒'}</span>
                <p className="text-[9px] font-semibold mt-0.5">{b.unlocked ? b.name : '???'}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ border: '2px solid #FF6B35' }}>
          <span className="text-xs font-bold text-[#FF6B35]">Desafio da semana</span>
          <p className="font-bold text-sm mt-1">{weeklyChallenge.titulo}</p>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden mt-2"><div className="h-full rounded-full" style={{ width: `${(weeklyChallenge.progresso / weeklyChallenge.meta) * 100}%`, background: 'linear-gradient(90deg, #FF6B35, #FF3CAC)' }} /></div>
          <p className="text-xs text-[var(--text-3)] mt-1">{weeklyChallenge.progresso}/{weeklyChallenge.meta} • +{weeklyChallenge.xp_bonus} XP</p>
        </Card>
      </div>

      <Modal isOpen={showAddWeight} onClose={() => setShowAddWeight(false)}>
        <h3 className="font-bold text-lg mb-4">Registrar Peso</h3>
        <input type="number" step="0.1" placeholder="64.2" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} className="w-full h-14 text-center font-mono text-3xl bg-[#F2F2F7] rounded-xl outline-none" autoFocus />
        <p className="text-center text-sm text-[var(--text-3)] mt-1">kg</p>
        <div className="flex gap-2 mt-4"><Button variant="ghost" fullWidth onClick={() => setShowAddWeight(false)}>Cancelar</Button><Button variant="gradient" fullWidth onClick={handleAddWeight}>Salvar</Button></div>
      </Modal>
    </div>
  );
};

export default Progress;
