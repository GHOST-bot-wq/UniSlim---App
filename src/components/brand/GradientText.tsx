import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = '', gradient }) => (
  <span
    className={className}
    style={{
      background: gradient || 'linear-gradient(135deg, #FF6B35 0%, #FF3CAC 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}
  >
    {children}
  </span>
);

export default GradientText;
