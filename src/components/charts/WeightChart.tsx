import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import type { WeightLog } from '../../types';

interface WeightChartProps {
  data: WeightLog[];
  height?: number;
  showAxes?: boolean;
}

const WeightChart: React.FC<WeightChartProps> = ({ data, height = 80, showAxes = false }) => {
  const chartData = data.map((d) => ({ date: d.data, peso: d.peso }));

  if (chartData.length < 2) {
    return <div className="flex items-center justify-center text-[var(--text-3)] text-sm" style={{ height }}>Adicione mais registros</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <defs>
          <linearGradient id="weightLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#AF52DE" />
            <stop offset="100%" stopColor="#2EC4B6" />
          </linearGradient>
        </defs>
        {showAxes || null}
        <Tooltip
          contentStyle={{ background: 'var(--surface)', border: 'none', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 12 }}
          formatter={(value: number) => [`${value} kg`, 'Peso']}
          labelFormatter={(l) => l}
        />
        <Line type="monotone" dataKey="peso" stroke="url(#weightLine)" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: '#AF52DE' }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightChart;
