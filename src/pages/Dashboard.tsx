import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CalorieRing from '../components/charts/CalorieRing';
import WeightChart from '../components/charts/WeightChart';
import Card from '../components/ui/Card';
import GradientText from '../components/brand/GradientText';
import { useAuthStore } from '../stores/authStore';
import { useLogStore } from '../stores/logStore';
import { usePlanStore } from '../stores/planStore';
import { useGamificationStore } from '../stores/gamificationStore';
import { getGreeting, formatDate, capitalize } from '../utils/formatters';
import { MOCK_MEAL_PLAN } from '../utils/mockData';
import type { MealType } from '../types';

const mealTabs: { id: MealType; label: string }[] = [
  { id: 'cafe', label: 'Café da Manhã' },
  { id: 'almoco', label: 'Almoço' },
  { id: 'jantar', label: 'Jantar' },
  { id: 'lanche', label: 'Lanches' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, session } = useAuthStore();
  const { todayCalories, todayProtein, todayCarbs, todayFat, todayWater, addWater, fetchTodayLogs, weightLogs, fetchWeightHistory } = useLogStore();
  const { dailyCalories, macroTargets } = usePlanStore();
  const { streak, level, levelTitle, xp, xpProgress } = useGamificationStore();
  const [activeMeal, setActiveMeal] = useState<MealType>('almoco');
  const { text: greetText, emoji: greetEmoji } = getGreeting();
  const nome = user?.nome || profile?.genero === 'feminino' ? 'Maria' : 'Usuário';
  const today = formatDate(new Date());

  useEffect(() => {
    if (session?.user?.id) {
      fetchTodayLogs(session.user.id);
      fetchWeightHistory(session.user.id);
    }
  }, [session?.user?.id]);

  const currentMeal = MOCK_MEAL_PLAN[0]?.refeicoes.find(r => r.tipo === activeMeal) || MOCK_MEAL_PLAN[0]?.refeicoes[0];
  const latestWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].peso : (profile?.peso_atual || 64.2);
  const waterGoalL = 2.5;
  const waterCurrentL = (todayWater * 0.2);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="relative px-5 pt-14 pb-8" style={{ background: 'linear-gradient(160deg, #FF8C42 0%, #FF6B9D 50%, #C77DFF 100%)' }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Olá, {nome}! {greetEmoji}</h1>
            <p className="text-white/80 text-sm mt-0.5">{capitalize(today)}</p>
          </div>
          <button onClick={() => navigate('/perfil')} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-lg">
            {user?.avatar_url ? <img src={user.avatar_url} className="w-full h-full rounded-full object-cover" /> : '👤'}
          </button>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-3">
        {/* Daily Progress Card */}
        <Card>
          <h3 className="text-base font-bold mb-4">Progresso Diário</h3>
          <div className="flex items-center justify-between">
            {/* Steps */}
            <div className="text-center flex-shrink-0">
              <span className="text-lg">👣</span>
              <p className="text-[10px] text-[var(--text-3)]">Passos:</p>
              <p className="text-sm font-bold">7.812</p>
              <p className="text-[10px] text-[var(--text-3)]">(Meta 10k)</p>
            </div>

            {/* Calorie Ring */}
            <CalorieRing
              consumed={todayCalories || 1450}
              goal={dailyCalories}
              protein={todayProtein || 85}
              carbs={todayCarbs || 140}
              fat={todayFat || 35}
              proteinGoal={macroTargets.proteina}
              carbsGoal={macroTargets.carbs}
              fatGoal={macroTargets.gordura}
            />

            {/* Activity */}
            <div className="text-center flex-shrink-0">
              <span className="text-lg">🏃</span>
              <p className="text-[10px] text-[var(--text-3)]">Atividade:</p>
              <p className="text-sm font-bold">45 min</p>
            </div>
          </div>
        </Card>

        {/* Meal Plan Card */}
        <Card>
          <h3 className="text-base font-bold mb-3">Plano de Refeições</h3>

          {/* Segmented tabs */}
          <div className="flex bg-[#F2F2F7] rounded-xl p-1 mb-4">
            {mealTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMeal(tab.id)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeMeal === tab.id ? 'bg-white shadow-sm text-[var(--text-1)]' : 'text-[var(--text-3)]'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Meal card */}
            <div className="bg-[#F9F9FB] rounded-xl p-3">
              <p className="font-bold text-sm leading-tight">{currentMeal?.nome || 'Salmão Grelhado com Quinoa e Legumes'}</p>
              <p className="text-xs text-[var(--text-3)] mt-1">{currentMeal?.horario || '12:30'}</p>
              <div className="w-full h-20 rounded-lg mt-2 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-3xl">🍽️</div>
              <div className="mt-2">
                <p className="font-bold text-sm">{currentMeal?.calorias_total || 580} kcal</p>
                <p className="text-[10px] text-[var(--text-3)]">
                  {currentMeal ? `${currentMeal.itens.reduce((s,i)=>s+i.proteina,0).toFixed(0)}g Prot. ${currentMeal.itens.reduce((s,i)=>s+i.carbs,0).toFixed(0)}g Carb ${currentMeal.itens.reduce((s,i)=>s+i.gordura,0).toFixed(0)}g Gord` : '45g Prot. 62g Carb 18g Gord'}
                </p>
              </div>
            </div>

            {/* Hydration card */}
            <div className="bg-[#F9F9FB] rounded-xl p-3">
              <p className="font-bold text-sm">Hidratação</p>
              <p className="text-xs text-[var(--text-3)]">Ingestão de Água</p>
              <p className="mt-1"><span className="text-lg font-bold">{waterCurrentL.toFixed(1)}L</span> <span className="text-xs text-[var(--text-3)]">/ {waterGoalL}L Objetivo</span></p>
              <div className="text-center text-2xl my-1">🥤</div>
              <div className="grid grid-cols-3 gap-1">
                {[1,2,3,4,5,6,7,8].map((n) => (
                  <button
                    key={n}
                    onClick={() => { if (n > todayWater && session?.user?.id) addWater(session.user.id); }}
                    className={`w-full aspect-square rounded-lg text-xs font-bold flex items-center justify-center transition-all ${n <= todayWater ? 'text-white' : 'bg-gray-100 text-[var(--text-3)]'}`}
                    style={n <= todayWater ? { background: 'linear-gradient(135deg, #2EC4B6, #007AFF)' } : {}}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => session?.user?.id && addWater(session.user.id)}
                  className="w-full aspect-square rounded-lg bg-gray-100 text-[var(--text-3)] text-lg font-bold flex items-center justify-center"
                >+</button>
              </div>
            </div>
          </div>
        </Card>

        {/* Weight Card */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold">Peso Atual: {latestWeight} kg</p>
              <p className="text-xs text-[#34C759] font-medium">(−0.8 kg essa semana)</p>
            </div>
            <div className="w-32"><WeightChart data={weightLogs.length ? weightLogs : [{ id: '1', user_id: '', data: '2026-05-10', peso: 65, created_at: '' }, { id: '2', user_id: '', data: '2026-05-12', peso: 64.5, created_at: '' }, { id: '3', user_id: '', data: '2026-05-15', peso: 64.2, created_at: '' }]} /></div>
          </div>
        </Card>

        {/* Scanner Quick Access */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => navigate('/scanner')}>
          <Card gradient>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">📸 Escanear Refeição</p>
                <p className="text-sm text-white/80 mt-1">Fotografe seu prato e descubra as calorias</p>
                <button className="mt-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">Escanear →</button>
              </div>
              <span className="text-5xl opacity-20">📷</span>
            </div>
          </Card>
        </motion.div>

        {/* Streak + XP */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-2xl font-bold">🔥 {streak || 5}</p>
              <p className="text-xs text-[var(--text-3)]">dias de sequência</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex-1 text-center">
              <p className="font-bold">⚡ Nível {level}</p>
              <p className="text-xs text-[var(--text-3)] mb-1">{levelTitle}</p>
              <div className="h-1.5 rounded-full bg-gray-100 mx-4 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${xpProgress()}%`, background: 'linear-gradient(90deg, #FF6B35, #FF3CAC)' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
