import { useEffect } from 'react';
import { useGamificationStore } from '../stores/gamificationStore';
import { useAuthStore } from '../stores/authStore';

export function useStreak() {
  const { streak, maiorStreak, checkStreak } = useGamificationStore();
  const { session } = useAuthStore();

  useEffect(() => {
    if (session?.user?.id) {
      checkStreak(session.user.id);
    }
  }, [session?.user?.id]);

  return { streak, maiorStreak };
}
