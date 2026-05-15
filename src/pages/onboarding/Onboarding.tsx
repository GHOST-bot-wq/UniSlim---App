import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import UniMascot from '../../components/brand/UniMascot';
import GradientText from '../../components/brand/GradientText';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../stores/authStore';

const slides = [
  { id: 0, type: 'welcome' },
  { id: 1, type: 'plan' },
  { id: 2, type: 'workout' },
  { id: 3, type: 'goal' },
  { id: 4, type: 'tour' },
  { id: 5, type: 'objective' },
] as const;

const Onboarding: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const navigate = useNavigate();
  const { updateProfile } = useAuthStore();

  const next = () => { if (current < slides.length - 1) setCurrent(current + 1); };

  const finish = async () => {
    try {
      await updateProfile({ onboarding_done: true });
    } catch { /* continue */ }
    navigate('/dashboard');
  };

  React.useEffect(() => {
    if (current === 0) {
      setTimeout(() => confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } }), 500);
    }
  }, [current]);

  const objectives = [
    { id: 'meal', icon: '🍽️', label: 'Registrar 1ª refeição', desc: 'Comece pelo básico' },
    { id: 'weight', icon: '⚖️', label: 'Registrar meu peso', desc: 'Ponto de partida' },
    { id: 'workout', icon: '💪', label: 'Fazer 1° treino', desc: 'Ative o corpo' },
    { id: 'scan', icon: '📸', label: 'Escanear um prato', desc: 'Descubra a mágica' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Progress dots */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6' : 'w-2'}`}
            style={{ background: i === current ? 'linear-gradient(135deg, #FF6B35, #FF3CAC)' : i <= current ? '#FF6B35' : '#E5E5EA' }} />
        ))}
      </div>

      {/* Skip */}
      {current > 0 && current < slides.length - 1 && (
        <button onClick={finish} className="absolute top-6 right-5 text-sm font-semibold text-[var(--text-3)] z-10">Pular</button>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} transition={{ duration: 0.3 }} className="min-h-screen">

          {/* Slide 0 — Welcome */}
          {current === 0 && (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-white text-center" style={{ background: 'linear-gradient(160deg, #FF8C42 0%, #FF6B9D 50%, #C77DFF 100%)' }}>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }} className="text-7xl mb-4">👋</motion.span>
              <h1 className="text-3xl font-extrabold mb-2">Bem-vindo(a) ao UniSlim!</h1>
              <p className="text-white/80 mb-8">Seu plano personalizado está pronto.</p>
              <Button variant="white" size="lg" onClick={next}>
                <GradientText className="font-bold">Ver meu plano →</GradientText>
              </Button>
            </div>
          )}

          {/* Slide 1 — Plan preview */}
          {current === 1 && (
            <div className="min-h-screen bg-[var(--bg-primary)] pt-16 px-5">
              <div className="h-[60px] rounded-b-2xl -mx-5 mb-6" style={{ background: 'linear-gradient(160deg, #FF8C42, #FF6B9D, #C77DFF)' }} />
              <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
                <h2 className="text-xl font-bold">Seu Plano Alimentar</h2>
                <div className="text-center py-4">
                  <GradientText className="text-5xl font-extrabold font-mono">1900</GradientText>
                  <p className="text-sm text-[var(--text-3)] mt-1">kcal diárias</p>
                </div>
                <div className="space-y-2">
                  {['✅ Cardápio personalizado', '✅ Receitas fáceis e rápidas', '✅ Lista de compras automática'].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm"><span>{t}</span></div>
                  ))}
                </div>
              </div>
              <div className="mt-6"><Button variant="gradient" fullWidth size="lg" onClick={next}>Continuar →</Button></div>
            </div>
          )}

          {/* Slide 2 — Workouts */}
          {current === 2 && (
            <div className="min-h-screen bg-[var(--bg-primary)] pt-16 px-5">
              <div className="h-[60px] rounded-b-2xl -mx-5 mb-6" style={{ background: 'linear-gradient(160deg, #FF8C42, #FF6B9D, #C77DFF)' }} />
              <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
                <h2 className="text-xl font-bold">Seus Treinos</h2>
                <p className="text-sm text-[var(--text-3)]">4 dias por semana • Personalizados</p>
                <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF3CAC] text-white rounded-xl p-4">
                  <p className="font-bold">Queima de Gordura — Corpo Inteiro</p>
                  <p className="text-sm opacity-80 mt-1">35 min • 6 exercícios • ~280 kcal</p>
                </div>
              </div>
              <div className="mt-6"><Button variant="gradient" fullWidth size="lg" onClick={next}>Continuar →</Button></div>
            </div>
          )}

          {/* Slide 3 — Goal */}
          {current === 3 && (
            <div className="min-h-screen bg-[var(--bg-primary)] pt-16 px-5">
              <div className="h-[60px] rounded-b-2xl -mx-5 mb-6" style={{ background: 'linear-gradient(160deg, #FF8C42, #FF6B9D, #C77DFF)' }} />
              <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
                <h2 className="text-xl font-bold">Seu Objetivo</h2>
                <div className="flex items-center justify-between py-3">
                  <div className="text-center"><p className="text-2xl font-bold">80 kg</p><p className="text-xs text-[var(--text-3)]">Atual</p></div>
                  <div className="flex-1 mx-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '35%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #FF6B35, #34C759)' }} />
                  </div>
                  <div className="text-center"><p className="text-2xl font-bold text-[#34C759]">65 kg</p><p className="text-xs text-[var(--text-3)]">Meta</p></div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-medium text-green-600">📅 Chegada estimada: Dezembro 2026</p>
                </div>
              </div>
              <div className="mt-6"><Button variant="gradient" fullWidth size="lg" onClick={next}>Continuar →</Button></div>
            </div>
          )}

          {/* Slide 4 — Tour */}
          {current === 4 && (
            <div className="min-h-screen bg-[var(--bg-primary)] pt-16 px-5 flex flex-col items-center justify-center text-center">
              <UniMascot expression="excited" size="lg" className="mb-4" />
              <h2 className="text-xl font-bold mb-2">Conheça o UniSlim!</h2>
              <p className="text-sm text-[var(--text-3)] mb-6 max-w-xs">Navegue entre as telas usando a barra inferior</p>
              <div className="bg-white rounded-2xl p-4 shadow-md w-full space-y-3">
                {[
                  { icon: '🏠', label: 'Início', desc: 'Dashboard com progresso diário' },
                  { icon: '📋', label: 'Plano', desc: 'Cardápio e receitas' },
                  { icon: '💪', label: 'Treino', desc: 'Exercícios guiados' },
                  { icon: '📊', label: 'Registro', desc: 'Progresso e conquistas' },
                  { icon: '👤', label: 'Perfil', desc: 'Configurações e dados' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-left">
                    <span className="text-2xl">{item.icon}</span>
                    <div><p className="font-semibold text-sm">{item.label}</p><p className="text-xs text-[var(--text-3)]">{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 w-full"><Button variant="gradient" fullWidth size="lg" onClick={next}>Quase lá →</Button></div>
            </div>
          )}

          {/* Slide 5 — First objective */}
          {current === 5 && (
            <div className="min-h-screen bg-[var(--bg-primary)] pt-16 px-5">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold">Qual é seu primeiro objetivo hoje?</h2>
                <p className="text-sm text-[var(--text-3)] mt-1">Escolha um para começar</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {objectives.map((obj) => (
                  <motion.button
                    key={obj.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGoal(obj.id)}
                    className={`bg-white rounded-2xl p-4 text-center shadow-sm transition-all ${selectedGoal === obj.id ? 'ring-2 ring-[#FF6B35] scale-[1.02]' : ''}`}
                  >
                    <span className="text-3xl block mb-2">{obj.icon}</span>
                    <p className="font-bold text-sm">{obj.label}</p>
                    <p className="text-xs text-[var(--text-3)] mt-1">{obj.desc}</p>
                  </motion.button>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="gradient" fullWidth size="lg" onClick={finish} disabled={!selectedGoal}>
                  Começar agora →
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
