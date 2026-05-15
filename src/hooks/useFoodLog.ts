import { useEffect } from 'react';
import { useLogStore } from '../stores/logStore';
import { useAuthStore } from '../stores/authStore';

export function useFoodLog() {
  const store = useLogStore();
  const { session } = useAuthStore();

  useEffect(() => {
    if (session?.user?.id) {
      store.fetchTodayLogs(session.user.id);
    }
  }, [session?.user?.id]);

  return store;
}
