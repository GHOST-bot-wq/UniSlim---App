import React from 'react';
import type { MascotExpression, MascotSize } from '../../types';

interface UniMascotProps {
  expression?: MascotExpression;
  size?: MascotSize;
  animate?: boolean;
  className?: string;
}

const sizes: Record<MascotSize, number> = { sm: 40, md: 80, lg: 120 };

const UniMascot: React.FC<UniMascotProps> = ({ expression = 'happy', size = 'md', animate = true, className = '' }) => {
  const s = sizes[size];
  const eyes: Record<MascotExpression, React.ReactNode> = {
    happy: <><circle cx="35" cy="40" r="4" fill="#1C1C1E"/><circle cx="65" cy="40" r="4" fill="#1C1C1E"/><path d="M38 55 Q50 65 62 55" fill="none" stroke="#1C1C1E" strokeWidth="3" strokeLinecap="round"/></>,
    proud: <><circle cx="35" cy="38" r="4" fill="#1C1C1E"/><circle cx="65" cy="38" r="4" fill="#1C1C1E"/><path d="M35 52 Q50 64 65 52" fill="none" stroke="#1C1C1E" strokeWidth="3" strokeLinecap="round"/><line x1="28" y1="30" x2="35" y2="34" stroke="#1C1C1E" strokeWidth="2"/><line x1="72" y1="30" x2="65" y2="34" stroke="#1C1C1E" strokeWidth="2"/></>,
    sleeping: <><path d="M30 42 Q35 38 40 42" fill="none" stroke="#1C1C1E" strokeWidth="2.5"/><path d="M60 42 Q65 38 70 42" fill="none" stroke="#1C1C1E" strokeWidth="2.5"/><text x="72" y="28" fontSize="12" fill="#8E8E93" fontWeight="600">z</text><text x="80" y="20" fontSize="9" fill="#8E8E93" fontWeight="600">z</text></>,
    excited: <><circle cx="35" cy="38" r="5" fill="#1C1C1E"/><circle cx="65" cy="38" r="5" fill="#1C1C1E"/><circle cx="37" cy="36" r="1.5" fill="white"/><circle cx="67" cy="36" r="1.5" fill="white"/><ellipse cx="50" cy="58" rx="8" ry="6" fill="#1C1C1E"/></>,
    sad: <><circle cx="35" cy="42" r="3.5" fill="#1C1C1E"/><circle cx="65" cy="42" r="3.5" fill="#1C1C1E"/><path d="M38 58 Q50 52 62 58" fill="none" stroke="#1C1C1E" strokeWidth="2.5" strokeLinecap="round"/></>,
  };

  return (
    <div className={`inline-flex items-center justify-center ${animate ? 'animate-float' : ''} ${className}`} style={{ width: s, height: s }}>
      <svg viewBox="0 0 100 100" width={s} height={s}>
        <defs>
          <linearGradient id="flame-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE66D"/>
            <stop offset="40%" stopColor="#FF6B35"/>
            <stop offset="100%" stopColor="#FF3CAC"/>
          </linearGradient>
        </defs>
        {/* Flame body */}
        <path
          d="M50 5 Q75 20 72 45 Q80 30 78 50 Q82 55 70 75 Q65 85 50 90 Q35 85 30 75 Q18 55 22 50 Q20 30 28 45 Q25 20 50 5Z"
          fill="url(#flame-grad)"
          style={expression === 'sad' ? { transform: 'scale(0.9)', transformOrigin: 'center' } : expression === 'excited' ? { transform: 'scale(1.05)', transformOrigin: 'center' } : {}}
        />
        {/* Face */}
        {eyes[expression]}
      </svg>
    </div>
  );
};

export default UniMascot;
