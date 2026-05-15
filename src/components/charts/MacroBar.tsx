import React from 'react';

interface MacroBarProps {
  label: string;
  current: number;
  goal: number;
  color: string;
  unit?: string;
}

const MacroBar: React.FC<MacroBarProps> = ({ label, current, goal, color, unit = 'g' }) => {
  const pct = Math.min((current / goal) * 100, 100);
  return (
    <div className="flex-1">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-xs font-semibold text-[var(--text-2)]">{label}</span>
        <span className="text-xs text-[var(--text-3)]">{current}/{goal}{unit}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
};

export default MacroBar;
