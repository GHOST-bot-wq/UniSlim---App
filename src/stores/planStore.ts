import { create } from 'zustand';
import type { Plano, DayPlan, Workout, FastingSchedule, MacroTargets } from '../types';
import { supabase } from '../services/supabase';

interface PlanState {
  plan: Plano | null;
  mealPlan: DayPlan[];
  workouts: Workout[];
  fastingSchedule: FastingSchedule | null;
  dailyCalories: number;
  macroTargets: MacroTargets;
  isLoading: boolean;
  fetchPlan: (userId: string) => Promise<void>;
  setPlan: (plan: Plano) => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  plan: null,
  mealPlan: [],
  workouts: [],
  fastingSchedule: null,
  dailyCalories: 1900,
  macroTargets: { proteina: 120, carbs: 200, gordura: 55 },
  isLoading: false,

  fetchPlan: async (userId: string) => {
    set({ isLoading: true });
    try {
      const { data } = await supabase
        .from('planos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data) {
        set({
          plan: data as Plano,
          mealPlan: (data.cardapio as DayPlan[]) || [],
          workouts: (data.treinos as Workout[]) || [],
          fastingSchedule: (data.jejum as FastingSchedule) || null,
          dailyCalories: data.calorias_diarias || 1900,
          macroTargets: {
            proteina: data.proteina_meta || 120,
            carbs: data.carbs_meta || 200,
            gordura: data.gordura_meta || 55,
          },
        });
      }
    } catch {
      // Will use mock data
    } finally {
      set({ isLoading: false });
    }
  },

  setPlan: (plan: Plano) => {
    set({
      plan,
      mealPlan: plan.cardapio || [],
      workouts: plan.treinos || [],
      fastingSchedule: plan.jejum || null,
      dailyCalories: plan.calorias_diarias,
      macroTargets: {
        proteina: plan.proteina_meta,
        carbs: plan.carbs_meta,
        gordura: plan.gordura_meta,
      },
    });
  },
}));
