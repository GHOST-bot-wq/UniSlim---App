import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Button from '../components/ui/Button';
import UniMascot from '../components/brand/UniMascot';
import GradientText from '../components/brand/GradientText';
import { useAudio } from '../hooks/useAudio';
import { useLogStore } from '../stores/logStore';
import { useGamificationStore } from '../stores/gamificationStore';
import { useAuthStore } from '../stores/authStore';
import { MOCK_WORKOUTS } from '../utils/mockData';

const ActiveWorkout: React.FC = () => {
  const navigate = useNavigate();
  const workout = MOCK_WORKOUTS[0];
  const [exIndex, setExIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [resting, setResting] = useState(false);
  const [restTime, setRestTime] = useState(60);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const { play } = useAudio();
  const { addWorkoutLog } = useLogStore();
  const { addXP } = useGamificationStore();
  const { session } = useAuthStore();

  const ex = workout.exercicios[exIndex];
  const totalSets = workout.exercicios.reduce((s, e) => s + e.sets, 0);
  const completedSets = workout.exercicios.slice(0, exIndex).reduce((s, e) => s + e.sets, 0) + setIndex;

  // Timer
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [done]);

  // Rest timer
  useEffect(() => {
    if (!resting) return;
    if (restTime <= 0) { setResting(false); return; }
    const t = setInterval(() => setRestTime(r => r - 1), 1000);
    return () => clearInterval(t);
  }, [resting, restTime]);

  const completeSet = useCallback(() => {
    if (setIndex + 1 < ex.sets) {
      setSetIndex(s => s + 1);
      setResting(true);
      setRestTime(ex.descanso_seg);
    } else if (exIndex + 1 < workout.exercicios.length) {
      setExIndex(i => i + 1);
      setSetIndex(0);
      setResting(true);
      setRestTime(60);
    } else {
      setDone(true);
      play('goal_achieved');
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      if (session?.user?.id) {
        addWorkoutLog(session.user.id, { treino_nome: workout.nome, duracao_min: Math.round(elapsed / 60), calorias_queimadas: workout.calorias_estimadas });
        addXP(session.user.id, 'workout');
      }
    }
  }, [setIndex, exIndex, ex, workout, elapsed, session]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--bg-primary)] text-center">
        <UniMascot expression="proud" size="lg" className="mb-4" />
        <h1 className="text-2xl font-extrabold mb-2"><GradientText>TREINO COMPLETO! 💥</GradientText></h1>
        <div className="grid grid-cols-3 gap-4 my-6 w-full">
          <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-2xl font-bold font-mono">{formatTime(elapsed)}</p><p className="text-xs text-[var(--text-3)]">Duração</p></div>
          <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-2xl font-bold font-mono">{workout.calorias_estimadas}</p><p className="text-xs text-[var(--text-3)]">Calorias</p></div>
          <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-2xl font-bold font-mono">{workout.exercicios.length}</p><p className="text-xs text-[var(--text-3)]">Exercícios</p></div>
        </div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.5 }} className="px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' }}>
          <span className="text-white font-bold">+50 XP ⚡</span>
        </motion.div>
        <Button variant="gradient" fullWidth size="lg" onClick={() => navigate('/treinos')}>Ótimo! →</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-3">
        <button onClick={() => navigate('/treinos')} className="text-lg">✕</button>
        <span className="font-bold text-sm">{workout.nome}</span>
        <span className="font-mono text-[#FF6B35] font-bold">{formatTime(elapsed)}</span>
      </div>
      <p className="text-center text-xs text-[var(--text-3)]">Exercício {exIndex + 1} de {workout.exercicios.length}</p>

      {/* Progress */}
      <div className="px-5 mt-2"><div className="h-1.5 rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${(completedSets / totalSets) * 100}%`, background: 'linear-gradient(90deg, #FF6B35, #FF3CAC)' }} /></div></div>

      {resting ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E5EA" strokeWidth="6" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#2EC4B6" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`} strokeDashoffset={`${2 * Math.PI * 45 * (1 - restTime / ex.descanso_seg)}`} style={{ transition: 'stroke-dashoffset 1s linear' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-mono font-bold">{restTime}s</span>
              <span className="text-sm text-[var(--text-3)]">Descansando...</span>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="ghost" onClick={() => setRestTime(r => Math.max(0, r - 10))}>−10s</Button>
            <Button variant="gradient" onClick={() => { setResting(false); setRestTime(0); }}>Pular ▶</Button>
            <Button variant="ghost" onClick={() => setRestTime(r => r + 30)}>+30s</Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-extrabold mb-2">{ex.nome}</h2>
          <p className="text-xl font-mono text-[var(--text-2)] mb-6">{ex.sets}x {ex.reps}</p>
          <div className="flex gap-2 mb-8">
            {Array.from({ length: ex.sets }).map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${i < setIndex ? 'bg-[#34C759]' : i === setIndex ? 'bg-[#FF6B35] animate-pulse' : 'bg-gray-200'}`} />
            ))}
          </div>
          <Button variant="gradient" fullWidth size="lg" onClick={completeSet}>✓ Série concluída</Button>
          <p className="text-xs text-[var(--text-3)] mt-3">{completedSets}/{totalSets} séries totais</p>
        </div>
      )}
    </div>
  );
};

export default ActiveWorkout;
