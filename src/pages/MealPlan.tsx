import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import BottomSheet from '../components/ui/BottomSheet';
import PortionEditor from '../components/scanner/PortionEditor';
import Header from '../components/layout/Header';
import UniMascot from '../components/brand/UniMascot';
import { useLogStore } from '../stores/logStore';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { FOOD_DATABASE, MOCK_MEAL_PLAN } from '../utils/mockData';
import { getMealLabel } from '../utils/formatters';
import type { MealType, FoodItem } from '../types';

const mealTypes: MealType[] = ['cafe', 'almoco', 'lanche', 'jantar'];

const MealPlan: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealType>('cafe');
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const { session } = useAuthStore();
  const { addFoodLog, foodLogs } = useLogStore();
  const { addToast } = useUIStore();

  const plan = MOCK_MEAL_PLAN[0];
  const meal = plan?.refeicoes.find(r => r.tipo === selectedMeal);
  const todayMealLogs = foodLogs.filter(f => f.tipo === selectedMeal);
  const filtered = search.length > 1 ? FOOD_DATABASE.filter(f => f.nome.toLowerCase().includes(search.toLowerCase())).slice(0, 20) : [];

  const handleAddFood = async (grams: number) => {
    if (!selectedFood || !session?.user?.id) return;
    const m = grams / 100;
    try {
      await addFoodLog(session.user.id, {
        tipo: selectedMeal, nome: selectedFood.nome,
        calorias: Math.round(selectedFood.calorias_100g * m),
        proteina: Math.round(selectedFood.proteina * m),
        carbs: Math.round(selectedFood.carbs * m),
        gordura: Math.round(selectedFood.gordura * m),
        fonte: 'manual',
      });
      addToast({ type: 'success', message: `${selectedFood.nome} adicionado! 🎉` });
      setSelectedFood(null);
      setShowAdd(false);
      setSearch('');
    } catch { addToast({ type: 'error', message: 'Erro ao adicionar' }); }
  };

  return (
    <div className="pb-24">
      <Header height="100px"><h1 className="text-xl font-bold text-white">Plano de Refeições</h1></Header>

      <div className="px-4 -mt-2 space-y-3">
        {/* Meal type tabs */}
        <div className="flex bg-[#F2F2F7] rounded-xl p-1">
          {mealTypes.map(t => (
            <button key={t} onClick={() => setSelectedMeal(t)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${selectedMeal === t ? 'bg-white shadow-sm' : 'text-[var(--text-3)]'}`}>
              {getMealLabel(t)}
            </button>
          ))}
        </div>

        {/* Plan items */}
        {meal && (
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">{getMealLabel(selectedMeal)}</h3>
              <span className="text-xs text-[var(--text-3)]">{meal.calorias_total} kcal</span>
            </div>
            {meal.itens.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium">{item.nome}</p>
                  <p className="text-xs text-[var(--text-3)]">{item.peso_g}g</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B35]">{item.calorias} kcal</span>
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Logged items */}
        {todayMealLogs.length > 0 && (
          <Card>
            <h3 className="font-bold text-sm mb-2">Registrado Hoje</h3>
            {todayMealLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm">{log.nome}</span>
                <span className="text-xs font-bold text-[#FF6B35]">{log.calorias} kcal</span>
              </div>
            ))}
          </Card>
        )}

        {/* Add button */}
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowAdd(true)}
          className="w-full py-3 rounded-2xl text-sm font-bold text-[#FF6B35] bg-orange-50 active:bg-orange-100 transition">
          + Adicionar {getMealLabel(selectedMeal).toLowerCase()}
        </motion.button>

        {/* Empty state */}
        {!meal && todayMealLogs.length === 0 && (
          <div className="text-center py-12">
            <UniMascot expression="happy" size="md" className="mx-auto mb-3" />
            <p className="font-bold">Nenhum alimento ainda</p>
            <p className="text-sm text-[var(--text-3)] mb-4">Adicione sua primeira refeição</p>
          </div>
        )}
      </div>

      {/* Add Food Bottom Sheet */}
      <BottomSheet isOpen={showAdd} onClose={() => { setShowAdd(false); setSelectedFood(null); setSearch(''); }} title={selectedFood ? 'Porção' : '🔍 Buscar alimento'}>
        {selectedFood ? (
          <PortionEditor nome={selectedFood.nome} calsPer100g={selectedFood.calorias_100g} protPer100g={selectedFood.proteina}
            carbsPer100g={selectedFood.carbs} fatPer100g={selectedFood.gordura} onConfirm={handleAddFood} onCancel={() => setSelectedFood(null)} />
        ) : (
          <>
            <input type="text" placeholder="Buscar alimento..." value={search} onChange={(e) => setSearch(e.target.value)} autoFocus
              className="w-full h-12 px-4 rounded-xl bg-[#F2F2F7] outline-none mb-3" />
            <div className="max-h-[50vh] overflow-auto space-y-1">
              {filtered.map((f, i) => (
                <button key={i} onClick={() => setSelectedFood(f)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition text-left">
                  <div><p className="text-sm font-medium">{f.nome}</p><p className="text-xs text-[var(--text-3)]">{f.categoria}</p></div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#FF6B35]">{f.calorias_100g} kcal</p>
                    <p className="text-[10px] text-[var(--text-3)]">por 100g</p>
                  </div>
                </button>
              ))}
              {search.length > 1 && filtered.length === 0 && <p className="text-center text-sm text-[var(--text-3)] py-8">Nenhum resultado</p>}
              {search.length <= 1 && <p className="text-center text-sm text-[var(--text-3)] py-8">Digite para buscar</p>}
            </div>
          </>
        )}
      </BottomSheet>
    </div>
  );
};

export default MealPlan;
