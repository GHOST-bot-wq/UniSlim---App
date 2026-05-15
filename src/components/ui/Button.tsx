import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gradient' | 'white' | 'ghost' | 'danger' | 'cool';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children, variant = 'gradient', size = 'md', fullWidth = false, icon, className = '', ...props
}) => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.97]';
  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-full',
  };
  const variants: Record<string, string> = {
    gradient: 'text-white shadow-lg hover:shadow-xl',
    white: 'bg-white text-gray-900 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-[var(--text-2)] hover:bg-black/5',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    cool: 'text-white shadow-lg',
  };
  const gradientBg = variant === 'gradient'
    ? { background: 'linear-gradient(135deg, #FF6B35 0%, #FF3CAC 100%)' }
    : variant === 'cool'
    ? { background: 'linear-gradient(135deg, #2EC4B6 0%, #6366F1 100%)' }
    : {};

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{ ...gradientBg, ...(props.disabled ? { opacity: 0.5 } : {}) }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
