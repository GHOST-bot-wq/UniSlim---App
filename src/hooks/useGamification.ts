import { useEffect } from 'react';
import { useGamificationStore } from '../stores/gamificationStore';
import { useAuthStore } from '../stores/authStore';

export function useGamification() {
  const store = useGamificationStore();
  const { session } = useAuthStore();

  useEffect(() => {
    if (session?.user?.id) {
      store.fetch(session.user.id);
      store.checkStreak(session.user.id);
    }
  }, [session?.user?.id]);

  return store;
}
