// ============================================
// UniSlim — TypeScript Types
// ============================================

// --- Auth ---
export interface Usuario {
  id: string;
  email: string;
  nome: string | null;
  avatar_url?: string | null;
  ativo?: boolean;
  role?: string;
  created_at: string;
}

export interface Perfil {
  id: string;
  user_id: string;
  genero?: string | null;
  idade?: number | null;
  altura: number | null;
  peso_atual: number | null;
  peso_meta: number | null;
  nivel_atividade: string | null;
  restricoes?: string[] | null;
  estrategia: string | null;
  refeicoes_dia: number | null;
  motivacao?: string | null;
  onboarding_done?: boolean;
  agua_meta_ml?: number;
  created_at?: string;
  updated_at: string;
}

// --- Plans ---
export interface MacroTargets {
  proteina: number;
  carbs: number;
  gordura: number;
}

export interface MealItem {
  nome: string;
  calorias: number;
  proteina: number;
  carbs: number;
  gordura: number;
  peso_g: number;
  horario?: string;
  foto_url?: string;
}

export interface Meal {
  tipo: MealType;
  nome: string;
  horario: string;
  itens: MealItem[];
  calorias_total: number;
}

export interface DayPlan {
  dia: string;
  refeicoes: Meal[];
  calorias_total: number;
}

export interface Workout {
  nome: string;
  duracao_min: number;
  exercicios: Exercise[];
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  grupos_musculares: string[];
  calorias_estimadas: number;
}

export interface Exercise {
  nome: string;
  sets: number;
  reps: string;
  duracao_seg?: number;
  descanso_seg: number;
  instrucoes: string[];
  grupo_muscular: string;
  equipamento: string;
}

export interface FastingSchedule {
  protocolo: string;
  horas_jejum: number;
  horas_alimentacao: number;
  hora_inicio: string;
  hora_fim: string;
}

export interface Plano {
  id: string;
  user_id: string;
  calorias_diarias: number;
  proteina_meta: number;
  carbs_meta: number;
  gordura_meta: number;
  cardapio: DayPlan[];
  treinos: Workout[];
  jejum: FastingSchedule | null;
  created_at: string;
}

// --- Logs ---
export type MealType = 'cafe' | 'almoco' | 'lanche' | 'jantar';
export type LogSource = 'manual' | 'scanner' | 'plano';

export interface FoodLog {
  id: string;
  user_id: string;
  data: string;
  tipo: MealType;
  nome: string;
  calorias: number;
  proteina: number;
  carbs: number;
  gordura: number;
  fonte: LogSource;
  created_at: string;
}

export interface WaterLog {
  id: string;
  user_id: string;
  data: string;
  copos: number;
}

export interface WeightLog {
  id: string;
  user_id: string;
  data: string;
  peso: number;
  created_at: string;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  data: string;
  treino_nome: string;
  duracao_min: number;
  calorias_queimadas: number;
  concluido: boolean;
}

export interface FastingLog {
  id: string;
  user_id: string;
  inicio: string;
  fim: string | null;
  protocolo: string;
  concluido: boolean;
}

// --- Scanner ---
export interface ScanItem {
  nome: string;
  peso_g: number;
  calorias: number;
  proteina: number;
  carbs: number;
  gordura: number;
}

export interface ScanResult {
  prato: string;
  itens: ScanItem[];
  total_calorias: number;
  total_proteina: number;
  total_carbs: number;
  total_gordura: number;
  qualidade: 'excelente' | 'boa' | 'moderada' | 'ruim';
  mensagem: string;
  sugestao?: string;
}

export interface ScanLog {
  id: string;
  user_id: string;
  resultado: ScanResult;
  calorias_total: number;
  adicionado: boolean;
  created_at: string;
}

// --- Gamification ---
export type XPAction =
  | 'meal_log'
  | 'daily_goal'
  | 'water_goal'
  | 'workout'
  | 'fasting'
  | 'scan'
  | 'scan_perfect'
  | 'weight_log'
  | 'streak_7'
  | 'perfect_week';

export interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  category: 'streak' | 'peso' | 'treino' | 'jejum' | 'scanner';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface GamificationData {
  id: string;
  user_id: string;
  xp: number;
  level: number;
  streak_atual: number;
  maior_streak: number;
  badges: Badge[];
  ultima_atividade: string | null;
  updated_at: string;
}

export interface Level {
  level: number;
  title: string;
  xp: number;
}

// --- Food Database ---
export interface FoodItem {
  nome: string;
  calorias_100g: number;
  proteina: number;
  carbs: number;
  gordura: number;
  categoria: string;
}

// --- UI ---
export type Theme = 'light' | 'dark';
export type TabId = 'inicio' | 'plano' | 'treino' | 'registro' | 'perfil';

export type SoundType =
  | 'app_open'
  | 'goal_achieved'
  | 'streak'
  | 'level_up'
  | 'fasting_start'
  | 'fasting_end'
  | 'scanner'
  | 'water'
  | 'meal_log';

export type MascotExpression = 'happy' | 'proud' | 'sleeping' | 'excited' | 'sad';
export type MascotSize = 'sm' | 'md' | 'lg';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'xp';
  message: string;
  duration?: number;
}

export interface WeeklyChallenge {
  id: string;
  titulo: string;
  descricao: string;
  meta: number;
  progresso: number;
  xp_bonus: number;
  dias_restantes: number;
}
