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
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: usuario } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', session.user.id)
          .single();

        const { data: perfil } = await supabase
          .from('perfis')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        set({
          session,
          user: usuario || null,
          profile: perfil || null,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }

      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          const { data: usuario } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const { data: perfil } = await supabase
            .from('perfis')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          set({
            session,
            user: usuario || null,
            profile: perfil || null,
            isAuthenticated: true,
          });
        } else {
          set({
            session: null,
            user: null,
            profile: null,
            isAuthenticated: false,
          });
        }
      });
    } catch {
      set({ isLoading: false });
    }
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
