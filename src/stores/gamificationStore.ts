import { create } from 'zustand';
import type { Badge, GamificationData, XPAction, Level, WeeklyChallenge } from '../types';
import { supabase } from '../services/supabase';
import { playSound } from '../services/audio';

export const LEVELS: Level[] = [
  { level: 1, title: 'Iniciante', xp: 0 },
  { level: 2, title: 'Aprendiz', xp: 200 },
  { level: 3, title: 'Dedicado', xp: 500 },
  { level: 4, title: 'Focado', xp: 1000 },
  { level: 5, title: 'Avançado', xp: 2000 },
  { level: 6, title: 'Guerreiro', xp: 3500 },
  { level: 7, title: 'Elite', xp: 5500 },
  { level: 8, title: 'Campeão', xp: 8000 },
  { level: 9, title: 'Lenda', xp: 12000 },
  { level: 10, title: 'Imortal', xp: 18000 },
];

const XP_VALUES: Record<XPAction, number> = {
  meal_log: 10,
  daily_goal: 25,
  water_goal: 15,
  workout: 50,
  fasting: 40,
  scan: 5,
  scan_perfect: 15,
  weight_log: 10,
  streak_7: 100,
  perfect_week: 200,
};

export const ALL_BADGES: Omit<Badge, 'unlocked' | 'unlockedAt'>[] = [
  // Streak
  { id: 'streak_3', emoji: '🔥', name: 'Chama', description: '3 dias de streak', category: 'streak' },
  { id: 'streak_7', emoji: '🔥🔥', name: 'Fogo', description: '7 dias de streak', category: 'streak' },
  { id: 'streak_14', emoji: '⚡', name: 'Raio', description: '14 dias de streak', category: 'streak' },
  { id: 'streak_30', emoji: '💫', name: 'Estrela', description: '30 dias de streak', category: 'streak' },
  { id: 'streak_60', emoji: '👑', name: 'Lenda', description: '60 dias de streak', category: 'streak' },
  { id: 'streak_100', emoji: '🏆', name: 'Imortal', description: '100 dias de streak', category: 'streak' },
  // Weight
  { id: 'weight_1', emoji: '🌱', name: 'Primeiro Passo', description: 'Perdeu 1kg', category: 'peso' },
  { id: 'weight_3', emoji: '💪', name: 'Determinado', description: 'Perdeu 3kg', category: 'peso' },
  { id: 'weight_5', emoji: '🦋', name: 'Transformação', description: 'Perdeu 5kg', category: 'peso' },
  { id: 'weight_10', emoji: '🌟', name: 'Inspiração', description: 'Perdeu 10kg', category: 'peso' },
  { id: 'weight_goal', emoji: '👑', name: 'Campeão', description: 'Atingiu a meta', category: 'peso' },
  // Workout
  { id: 'workout_1', emoji: '🥊', name: 'Iniciante', description: '1 treino completo', category: 'treino' },
  { id: 'workout_10', emoji: '⚡', name: 'Guerreiro', description: '10 treinos completos', category: 'treino' },
  { id: 'workout_30', emoji: '🏋️', name: 'Atleta', description: '30 treinos completos', category: 'treino' },
  { id: 'workout_100', emoji: '🦾', name: 'Elite', description: '100 treinos completos', category: 'treino' },
  // Fasting
  { id: 'fast_1', emoji: '🌙', name: 'Noturno', description: '1 jejum concluído', category: 'jejum' },
  { id: 'fast_7', emoji: '⏰', name: 'Disciplinado', description: '7 jejuns concluídos', category: 'jejum' },
  { id: 'fast_30', emoji: '🧘', name: 'Zen', description: '30 jejuns concluídos', category: 'jejum' },
  // Scanner
  { id: 'scan_1', emoji: '📸', name: 'Explorador', description: '1 scan realizado', category: 'scanner' },
  { id: 'scan_10', emoji: '🔍', name: 'Detetive', description: '10 scans realizados', category: 'scanner' },
  { id: 'scan_50', emoji: '👨‍🍳', name: 'Chef', description: '50 scans realizados', category: 'scanner' },
  { id: 'scan_100', emoji: '🥗', name: 'Nutricionista', description: '100 scans realizados', category: 'scanner' },
];

function getLevel(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) return LEVELS[i];
  }
  return LEVELS[0];
}

function getNextLevel(xp: number): Level {
  for (const l of LEVELS) {
    if (xp < l.xp) return l;
  }
  return LEVELS[LEVELS.length - 1];
}

interface GamificationState {
  xp: number;
  level: number;
  levelTitle: string;
  streak: number;
  maiorStreak: number;
  badges: Badge[];
  weeklyChallenge: WeeklyChallenge;
  showLevelUp: boolean;
  showBadge: Badge | null;
  soundEnabled: boolean;
  fetch: (userId: string) => Promise<void>;
  addXP: (userId: string, action: XPAction) => Promise<void>;
  checkStreak: (userId: string) => Promise<void>;
  dismissLevelUp: () => void;
  dismissBadge: () => void;
  xpForNextLevel: () => number;
  xpProgress: () => number;
}

export const useGamificationStore = create<GamificationState>((set, get) => ({
  xp: 0,
  level: 1,
  levelTitle: 'Iniciante',
  streak: 0,
  maiorStreak: 0,
  badges: ALL_BADGES.map(b => ({ ...b, unlocked: false })),
  weeklyChallenge: {
    id: 'wc_1',
    titulo: 'Registre 5 refeições',
    descricao: 'Registre pelo menos 5 refeições esta semana',
    meta: 5,
    progresso: 0,
    xp_bonus: 100,
    dias_restantes: 7,
  },
  showLevelUp: false,
  showBadge: null,
  soundEnabled: true,

  fetch: async (userId: string) => {
    try {
      const { data } = await supabase
        .from('gamification')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) {
        const gData = data as GamificationData;
        const lvl = getLevel(gData.xp);
        const savedBadges = (gData.badges as Badge[]) || [];
        const mergedBadges = ALL_BADGES.map(b => {
          const saved = savedBadges.find(sb => sb.id === b.id);
          return saved ? { ...b, ...saved } : { ...b, unlocked: false };
        });

        set({
          xp: gData.xp,
          level: lvl.level,
          levelTitle: lvl.title,
          streak: gData.streak_atual,
          maiorStreak: gData.maior_streak,
          badges: mergedBadges,
        });
      }
    } catch {
      // Use defaults
    }
  },

  addXP: async (userId: string, action: XPAction) => {
    const state = get();
    const xpGain = XP_VALUES[action];
    const newXP = state.xp + xpGain;
    const oldLevel = getLevel(state.xp);
    const newLevel = getLevel(newXP);

    set({ xp: newXP, level: newLevel.level, levelTitle: newLevel.title });

    if (newLevel.level > oldLevel.level) {
      set({ showLevelUp: true });
      if (state.soundEnabled) playSound('level_up');
    }

    try {
      await supabase
        .from('gamification')
        .update({ xp: newXP, level: newLevel.level, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
    } catch {
      // Continue anyway
    }
  },

  checkStreak: async (userId: string) => {
    const state = get();
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    try {
      const { data } = await supabase
        .from('gamification')
        .select('ultima_atividade, streak_atual, maior_streak')
        .eq('user_id', userId)
        .single();

      if (data) {
        let newStreak = data.streak_atual || 0;
        const lastActivity = data.ultima_atividade;

        if (lastActivity === todayStr) {
          // Already logged today
          set({ streak: newStreak, maiorStreak: data.maior_streak || 0 });
          return;
        } else if (lastActivity === yesterday) {
          newStreak += 1;
        } else if (lastActivity && lastActivity < yesterday) {
          newStreak = 1;
        } else {
          newStreak = 1;
        }

        const newMaior = Math.max(newStreak, data.maior_streak || 0);
        await supabase
          .from('gamification')
          .update({
            streak_atual: newStreak,
            maior_streak: newMaior,
            ultima_atividade: todayStr,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        set({ streak: newStreak, maiorStreak: newMaior });

        if (newStreak === 7) {
          get().addXP(userId, 'streak_7');
          if (state.soundEnabled) playSound('streak');
        }
      }
    } catch {
      // Continue
    }
  },

  dismissLevelUp: () => set({ showLevelUp: false }),
  dismissBadge: () => set({ showBadge: null }),

  xpForNextLevel: () => {
    const state = get();
    const next = getNextLevel(state.xp);
    return next.xp - state.xp;
  },

  xpProgress: () => {
    const state = get();
    const current = getLevel(state.xp);
    const next = getNextLevel(state.xp);
    if (next.xp === current.xp) return 100;
    return ((state.xp - current.xp) / (next.xp - current.xp)) * 100;
  },
}));
