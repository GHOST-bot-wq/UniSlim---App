import { create } from 'zustand';
import type { FoodLog, WaterLog, WeightLog, WorkoutLog, FastingLog, ScanLog, MealType, LogSource } from '../types';
import { supabase } from '../services/supabase';
import { format } from 'date-fns';

interface LogState {
  foodLogs: FoodLog[];
  waterLog: WaterLog | null;
  weightLogs: WeightLog[];
  workoutLogs: WorkoutLog[];
  fastingLogs: FastingLog[];
  scanLogs: ScanLog[];
  todayCalories: number;
  todayProtein: number;
  todayCarbs: number;
  todayFat: number;
  todayWater: number;
  isLoading: boolean;
  fetchTodayLogs: (userId: string) => Promise<void>;
  addFoodLog: (userId: string, log: { tipo: MealType; nome: string; calorias: number; proteina: number; carbs: number; gordura: number; fonte: LogSource }) => Promise<void>;
  deleteFoodLog: (logId: string) => Promise<void>;
  addWater: (userId: string) => Promise<void>;
  removeWater: (userId: string) => Promise<void>;
  addWeightLog: (userId: string, peso: number) => Promise<void>;
  addWorkoutLog: (userId: string, log: { treino_nome: string; duracao_min: number; calorias_queimadas: number }) => Promise<void>;
  fetchWeightHistory: (userId: string) => Promise<void>;
}

const today = () => format(new Date(), 'yyyy-MM-dd');

export const useLogStore = create<LogState>((set, get) => ({
  foodLogs: [],
  waterLog: null,
  weightLogs: [],
  workoutLogs: [],
  fastingLogs: [],
  scanLogs: [],
  todayCalories: 0,
  todayProtein: 0,
  todayCarbs: 0,
  todayFat: 0,
  todayWater: 0,
  isLoading: false,

  fetchTodayLogs: async (userId: string) => {
    set({ isLoading: true });
    try {
      const todayStr = today();

      const [foodRes, waterRes, workoutRes] = await Promise.all([
        supabase.from('food_logs').select('*').eq('user_id', userId).eq('data', todayStr).order('created_at', { ascending: true }),
        supabase.from('water_logs').select('*').eq('user_id', userId).eq('data', todayStr).single(),
        supabase.from('workout_logs').select('*').eq('user_id', userId).eq('data', todayStr),
      ]);

      const foods = (foodRes.data as FoodLog[]) || [];
      const water = (waterRes.data as WaterLog) || null;
      const workouts = (workoutRes.data as WorkoutLog[]) || [];

      const totalCal = foods.reduce((s, f) => s + f.calorias, 0);
      const totalProt = foods.reduce((s, f) => s + f.proteina, 0);
      const totalCarbs = foods.reduce((s, f) => s + f.carbs, 0);
      const totalFat = foods.reduce((s, f) => s + f.gordura, 0);

      set({
        foodLogs: foods,
        waterLog: water,
        workoutLogs: workouts,
        todayCalories: totalCal,
        todayProtein: totalProt,
        todayCarbs: totalCarbs,
        todayFat: totalFat,
        todayWater: water?.copos || 0,
      });
    } catch {
      // Will use fallback
    } finally {
      set({ isLoading: false });
    }
  },

  addFoodLog: async (userId, log) => {
    const newLog = { user_id: userId, data: today(), ...log };
    const { data, error } = await supabase.from('food_logs').insert(newLog).select().single();
    if (error) throw new Error(error.message);
    const food = data as FoodLog;
    const state = get();
    set({
      foodLogs: [...state.foodLogs, food],
      todayCalories: state.todayCalories + food.calorias,
      todayProtein: state.todayProtein + food.proteina,
      todayCarbs: state.todayCarbs + food.carbs,
      todayFat: state.todayFat + food.gordura,
    });
  },

  deleteFoodLog: async (logId: string) => {
    const state = get();
    const log = state.foodLogs.find(f => f.id === logId);
    if (!log) return;
    await supabase.from('food_logs').delete().eq('id', logId);
    set({
      foodLogs: state.foodLogs.filter(f => f.id !== logId),
      todayCalories: state.todayCalories - log.calorias,
      todayProtein: state.todayProtein - log.proteina,
      todayCarbs: state.todayCarbs - log.carbs,
      todayFat: state.todayFat - log.gordura,
    });
  },

  addWater: async (userId: string) => {
    const state = get();
    const newCopos = (state.waterLog?.copos || 0) + 1;
    if (state.waterLog) {
      await supabase.from('water_logs').update({ copos: newCopos }).eq('id', state.waterLog.id);
      set({
        waterLog: { ...state.waterLog, copos: newCopos },
        todayWater: newCopos,
      });
    } else {
      const { data } = await supabase
        .from('water_logs')
        .insert({ user_id: userId, data: today(), copos: 1 })
        .select()
        .single();
      set({
        waterLog: data as WaterLog,
        todayWater: 1,
      });
    }
  },

  removeWater: async (userId: string) => {
    const state = get();
    if (!state.waterLog || state.waterLog.copos <= 0) return;
    const newCopos = state.waterLog.copos - 1;
    await supabase.from('water_logs').update({ copos: newCopos }).eq('user_id', userId).eq('data', today());
    set({
      waterLog: { ...state.waterLog, copos: newCopos },
      todayWater: newCopos,
    });
  },

  addWeightLog: async (userId: string, peso: number) => {
    const { data, error } = await supabase
      .from('weight_logs')
      .insert({ user_id: userId, data: today(), peso })
      .select()
      .single();
    if (error) throw new Error(error.message);
    const state = get();
    set({ weightLogs: [...state.weightLogs, data as WeightLog] });
  },

  addWorkoutLog: async (userId, log) => {
    const { data, error } = await supabase
      .from('workout_logs')
      .insert({ user_id: userId, data: today(), ...log, concluido: true })
      .select()
      .single();
    if (error) throw new Error(error.message);
    const state = get();
    set({ workoutLogs: [...state.workoutLogs, data as WorkoutLog] });
  },

  fetchWeightHistory: async (userId: string) => {
    const { data } = await supabase
      .from('weight_logs')
      .select('*')
      .eq('user_id', userId)
      .order('data', { ascending: true })
      .limit(90);
    set({ weightLogs: (data as WeightLog[]) || [] });
  },
}));
