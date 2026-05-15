import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'orange' | 'green' | 'blue' | 'purple' | 'gray' | 'red' | 'teal';
  size?: 'sm' | 'md';
  className?: string;
}

const colors: Record<string, string> = {
  orange: 'bg-[#FF6B35]/10 text-[#FF6B35]',
  green: 'bg-[#34C759]/10 text-[#34C759]',
  blue: 'bg-[#007AFF]/10 text-[#007AFF]',
  purple: 'bg-[#AF52DE]/10 text-[#AF52DE]',
  gray: 'bg-gray-100 text-gray-600',
  red: 'bg-red-500/10 text-red-500',
  teal: 'bg-[#2EC4B6]/10 text-[#2EC4B6]',
};

const Badge: React.FC<BadgeProps> = ({ children, color = 'orange', size = 'sm', className = '' }) => (
  <span className={`inline-flex items-center font-semibold rounded-full ${colors[color]} ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'} ${className}`}>
    {children}
  </span>
);

export default Badge;
