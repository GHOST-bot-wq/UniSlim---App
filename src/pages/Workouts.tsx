import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import UniMascot from '../components/brand/UniMascot';
import { MOCK_WORKOUTS, MOCK_WEEK_WORKOUTS } from '../utils/mockData';

const Workouts: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDay] = useState(0);
  const todayWorkout = MOCK_WORKOUTS[0];

  return (
    <div className="pb-24">
      <Header height="100px"><h1 className="text-xl font-bold text-white">Treinos</h1></Header>

      <div className="px-4 -mt-2 space-y-3">
        {/* Week view */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {MOCK_WEEK_WORKOUTS.map((d, i) => (
            <div key={i} className={`flex-shrink-0 w-12 h-16 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all ${i === selectedDay ? 'text-white shadow-lg' : d.treino ? 'bg-white shadow-sm text-[var(--text-1)]' : 'bg-gray-50 text-[var(--text-3)]'}`}
              style={i === selectedDay ? { background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' } : {}}>
              <span>{d.dia}</span>
              <span className="mt-1">{d.treino ? '🏋️' : '🌙'}</span>
            </div>
          ))}
        </div>

        {/* Today's workout */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <Card gradient>
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white mb-2">TREINO DE HOJE</span>
            <h2 className="text-xl font-bold text-white">{todayWorkout.nome}</h2>
            <div className="flex gap-3 mt-2 text-sm text-white/80">
              <span>{todayWorkout.duracao_min} min</span>
              <span>•</span>
              <span>{todayWorkout.exercicios.length} exercícios</span>
              <span>•</span>
              <span>Moderado</span>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {todayWorkout.grupos_musculares.map((g) => (
                <span key={g} className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">{g}</span>
              ))}
            </div>
            <p className="text-sm text-white/70 mt-2">~{todayWorkout.calorias_estimadas} kcal</p>
            <div className="mt-3 space-y-1">
              {todayWorkout.exercicios.slice(0, 3).map((ex, i) => (
                <p key={i} className="text-xs text-white/60">{i + 1}. {ex.nome} — {ex.sets}x{ex.reps}</p>
              ))}
            </div>
            <button onClick={() => navigate('/treino-ativo')}
              className="w-full mt-4 py-3 bg-white rounded-xl font-bold text-sm active:scale-[0.97] transition"
              style={{ background: 'white', color: '#FF6B35' }}>
              ▶ Iniciar Treino
            </button>
          </Card>
        </motion.div>

        {/* Other workouts */}
        <h3 className="font-bold text-sm">Outros treinos</h3>
        {MOCK_WORKOUTS.slice(1).map((w, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">{w.nome}</p>
                <p className="text-xs text-[var(--text-3)]">{w.duracao_min} min • {w.exercicios.length} exercícios • ~{w.calorias_estimadas} kcal</p>
              </div>
              <span className="text-2xl">💪</span>
            </div>
          </Card>
        ))}

        {MOCK_WORKOUTS.length === 0 && (
          <div className="text-center py-12">
            <UniMascot expression="excited" size="md" className="mx-auto mb-3" />
            <p className="font-bold">Nenhum treino disponível</p>
            <p className="text-sm text-[var(--text-3)]">Em breve novos treinos!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
