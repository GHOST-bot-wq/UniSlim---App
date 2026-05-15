import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children, title }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        />
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] rounded-t-3xl max-h-[90vh] overflow-auto"
          style={{ maxWidth: 430, margin: '0 auto', boxShadow: '0 -8px 32px rgba(0,0,0,0.15)' }}
        >
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
          </div>
          {title && <h3 className="text-lg font-bold px-5 pb-3">{title}</h3>}
          <div className="px-5 pb-8">{children}</div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default BottomSheet;
