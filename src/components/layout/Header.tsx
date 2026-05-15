import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
  height?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, height = '140px', className = '' }) => (
  <div
    className={`relative w-full px-5 pt-12 pb-5 ${className}`}
    style={{ background: 'linear-gradient(160deg, #FF8C42 0%, #FF6B9D 50%, #C77DFF 100%)', minHeight: height }}
  >
    {children}
  </div>
);

export default Header;
