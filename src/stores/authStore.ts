import { create } from 'zustand';
import type { Usuario, Perfil } from '../types';
import { supabase } from '../services/supabase';
import type { Session } from '@supabase/supabase-js';

interface AuthState {
  user: Usuario | null;
  session: Session | null;
  profile: Perfil | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setProfile: (profile: Perfil) => void;
  updateProfile: (updates: Partial<Perfil>) => Promise<void>;
  mockLogin: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    // Força o login simulado para rodar o app localmente sem a tela de login
    get().mockLogin();
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ isLoading: false });
      throw new Error(error.message === 'Invalid login credentials'
        ? 'Email ou senha incorretos'
        : error.message);
    }
    await get().initialize();
  },

  signUp: async (email: string, password: string) => {
    set({ isLoading: true });
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      set({ isLoading: false });
      throw new Error(error.message);
    }
    await get().initialize();
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      session: null,
      profile: null,
      isAuthenticated: false,
    });
  },

  mockLogin: () => {
    set({
      isAuthenticated: true,
      isLoading: false,
      user: { id: 'mock-user-id', nome: 'Usuário Teste', email: 'teste@unislim.com', role: 'user', created_at: new Date().toISOString() },
      session: { user: { id: 'mock-user-id' } } as any,
      profile: { id: 'mock-profile-id', user_id: 'mock-user-id', peso_atual: 80, peso_meta: 70, altura: 175, nivel_atividade: 'leve', estrategia: 'Equilibrada', refeicoes_dia: 4, agua_meta_ml: 2500, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    });
  },

  setProfile: (profile: Perfil) => {
    set({ profile });
  },

  updateProfile: async (updates: Partial<Perfil>) => {
    const state = get();
    if (!state.session) return;
    const { error } = await supabase
      .from('perfis')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', state.session.user.id);
    if (error) throw new Error(error.message);
    if (state.profile) {
      set({ profile: { ...state.profile, ...updates } });
    }
  },
}));
