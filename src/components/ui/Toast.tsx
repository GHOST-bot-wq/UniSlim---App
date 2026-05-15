import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';

const iconMap: Record<string, string> = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  xp: '⚡',
};

const borderMap: Record<string, string> = {
  success: 'border-l-[#34C759]',
  error: 'border-l-[#FF3B30]',
  info: 'border-l-[#007AFF]',
  xp: 'border-l-transparent',
};

const Toast: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[90%] max-w-[400px]">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ y: -40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={() => removeToast(t.id)}
            className={`rounded-xl p-4 border-l-4 cursor-pointer ${borderMap[t.type]} ${t.type === 'xp' ? 'text-white' : 'bg-[var(--surface)] text-[var(--text-1)]'}`}
            style={{
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              ...(t.type === 'xp' ? { background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' } : {}),
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{iconMap[t.type]}</span>
              <span className="text-sm font-medium flex-1">{t.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
