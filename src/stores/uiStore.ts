import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, TabId, ToastMessage } from '../types';

interface UIState {
  theme: Theme;
  soundEnabled: boolean;
  activeTab: TabId;
  toasts: ToastMessage[];
  isOnboarding: boolean;
  setTheme: (theme: Theme) => void;
  toggleSound: () => void;
  setActiveTab: (tab: TabId) => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  setOnboarding: (val: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      soundEnabled: true,
      activeTab: 'inicio',
      toasts: [],
      isOnboarding: false,

      setTheme: (theme: Theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },

      toggleSound: () => set({ soundEnabled: !get().soundEnabled }),

      setActiveTab: (tab: TabId) => set({ activeTab: tab }),

      addToast: (toast) => {
        const id = Date.now().toString() + Math.random().toString(36).slice(2);
        const newToast: ToastMessage = { ...toast, id };
        set({ toasts: [...get().toasts, newToast] });
        setTimeout(() => {
          get().removeToast(id);
        }, toast.duration || 3000);
      },

      removeToast: (id: string) => {
        set({ toasts: get().toasts.filter((t) => t.id !== id) });
      },

      setOnboarding: (val: boolean) => set({ isOnboarding: val }),
    }),
    {
      name: 'unislim-ui',
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
