import { useEffect } from 'react';
import { usePlanStore } from '../stores/planStore';
import { useAuthStore } from '../stores/authStore';

export function usePlan() {
  const store = usePlanStore();
  const { session } = useAuthStore();

  useEffect(() => {
    if (session?.user?.id) {
      store.fetchPlan(session.user.id);
    }
  }, [session?.user?.id]);

  return store;
}
