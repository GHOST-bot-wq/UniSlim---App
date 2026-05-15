import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', gradient = false, onClick, style }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 ${gradient ? 'text-white' : 'bg-[var(--surface)]'} ${onClick ? 'cursor-pointer active:scale-[0.99] transition-transform' : ''} ${className}`}
      style={{
        boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        ...(gradient ? { background: 'linear-gradient(135deg, #FF6B35 0%, #FF3CAC 100%)' } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
