import React, { useEffect, useState } from 'react';
import { useCountUp } from '../../hooks/useCountUp';

interface CalorieRingProps {
  consumed: number;
  goal: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  size?: number;
}

const CalorieRing: React.FC<CalorieRingProps> = ({
  consumed, goal, protein, carbs, fat, proteinGoal, carbsGoal, fatGoal, size = 160,
}) => {
  const [mounted, setMounted] = useState(false);
  const displayCal = useCountUp(consumed, 1200);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) - 12;
  const circumference = 2 * Math.PI * r;

  const total = proteinGoal + carbsGoal + fatGoal;
  const protPct = proteinGoal / total;
  const carbPct = carbsGoal / total;
  const fatPct = fatGoal / total;

  const protConsumed = Math.min(protein / proteinGoal, 1);
  const carbConsumed = Math.min(carbs / carbsGoal, 1);
  const fatConsumed = Math.min(fat / fatGoal, 1);

  const protLen = circumference * protPct * protConsumed;
  const carbLen = circumference * carbPct * carbConsumed;
  const fatLen = circumference * fatPct * fatConsumed;

  const protOffset = 0;
  const carbOffset = circumference * protPct;
  const fatOffset = circumference * (protPct + carbPct);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E5E5EA" strokeWidth="10" />

        {/* Protein segment (orange) */}
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke="#FF6B35" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${mounted ? protLen : 0} ${circumference}`}
          strokeDashoffset={-protOffset}
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />

        {/* Carbs segment (green) */}
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke="#34C759" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${mounted ? carbLen : 0} ${circumference}`}
          strokeDashoffset={-carbOffset}
          style={{ transition: 'stroke-dasharray 1s ease 0.2s' }}
        />

        {/* Fat segment (blue) */}
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke="#007AFF" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${mounted ? fatLen : 0} ${circumference}`}
          strokeDashoffset={-fatOffset}
          style={{ transition: 'stroke-dasharray 1s ease 0.4s' }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-3xl font-bold text-[var(--text-1)]">{displayCal}</span>
        <span className="text-[11px] text-[var(--text-3)]">kcal consumidas</span>
        <span className="text-[11px] text-[var(--text-3)]">Objetivo: {goal} kcal</span>
      </div>
    </div>
  );
};

export default CalorieRing;
