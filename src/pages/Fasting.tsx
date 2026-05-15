import React, { useState, useEffect, useCallback } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import UniMascot from '../components/brand/UniMascot';
import { useAudio } from '../hooks/useAudio';

type Protocol = '16:8' | '18:6' | '20:4' | 'OMAD';
const protocols: { id: Protocol; label: string; hours: number }[] = [
  { id: '16:8', label: '16:8', hours: 16 },
  { id: '18:6', label: '18:6', hours: 18 },
  { id: '20:4', label: '20:4', hours: 20 },
  { id: 'OMAD', label: 'OMAD', hours: 23 },
];

const Fasting: React.FC = () => {
  const [isFasting, setIsFasting] = useState(false);
  const [protocol, setProtocol] = useState<Protocol>('16:8');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const { play } = useAudio();

  const prot = protocols.find(p => p.id === protocol)!;
  const totalSec = prot.hours * 3600;
  const progress = Math.min((elapsed / totalSec) * 100, 100);
  const remaining = Math.max(totalSec - elapsed, 0);

  useEffect(() => {
    if (!isFasting) return;
    const t = setInterval(() => {
      if (startTime) setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [isFasting, startTime]);

  const startFast = useCallback(() => {
    setIsFasting(true);
    setStartTime(new Date());
    setElapsed(0);
    play('fasting_start');
  }, [play]);

  const endFast = useCallback(() => {
    setIsFasting(false);
    setStartTime(null);
    play('fasting_end');
  }, [play]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const stages = [
    { h: 0, emoji: '🌙', label: 'Início' },
    { h: 4, emoji: '⚡', label: 'Cetose leve' },
    { h: 8, emoji: '🔥', label: 'Queima de gordura' },
    { h: 12, emoji: '🧬', label: 'Autofagia' },
    { h: 16, emoji: '✅', label: 'Meta atingida' },
  ];
  const currentStage = stages.filter(s => (elapsed / 3600) >= s.h).length - 1;

  const circumference = 2 * Math.PI * 110;

  return (
    <div className="min-h-screen pb-24" style={{ background: 'radial-gradient(circle at 50% 30%, #1a0533, #0D0D1A)' }}>
      <div className="pt-14 px-5 text-center">
        <h1 className="text-xl font-bold text-white">Jejum Intermitente</h1>
      </div>

      <div className="flex flex-col items-center px-5 mt-8">
        {/* Timer circle */}
        <div className="relative w-[250px] h-[250px]">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 250 250">
            <circle cx="125" cy="125" r="110" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle cx="125" cy="125" r="110" fill="none" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 1s ease', stroke: 'url(#fgrad)' }} />
            <defs><linearGradient id="fgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2EC4B6" /><stop offset="100%" stopColor="#6366F1" /></linearGradient></defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`px-3 py-1 rounded-full text-xs font-bold mb-2 ${isFasting ? 'bg-[#2EC4B6]/20 text-[#2EC4B6]' : 'bg-white/10 text-white/60'}`}>
              {isFasting ? 'JEJUANDO' : 'PARADO'}
            </span>
            <span className="font-mono text-4xl font-bold text-white">{fmt(isFasting ? elapsed : 0)}</span>
            <span className="text-sm text-white/50 mt-1">{isFasting ? `Faltam ${fmt(remaining)}` : 'Pronto para começar?'}</span>
            {isFasting && <UniMascot expression="sleeping" size="sm" className="mt-2" />}
          </div>
        </div>

        {/* Stages */}
        <div className="flex gap-3 mt-6 overflow-x-auto no-scrollbar w-full justify-center">
          {stages.map((s, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 ${i <= currentStage && isFasting ? 'opacity-100' : 'opacity-30'}`}>
              <span className="text-2xl">{s.emoji}</span>
              <span className="text-[10px] text-white/70">{s.h}h</span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="w-full mt-8 space-y-3">
          {!isFasting ? (
            <>
              <div className="flex gap-2 justify-center">
                {protocols.map(p => (
                  <button key={p.id} onClick={() => setProtocol(p.id)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${protocol === p.id ? 'text-white' : 'bg-white/10 text-white/60'}`}
                    style={protocol === p.id ? { background: 'linear-gradient(135deg, #2EC4B6, #6366F1)' } : {}}>
                    {p.label}
                  </button>
                ))}
              </div>
              <Button variant="cool" fullWidth size="lg" onClick={startFast}>▶ Iniciar Jejum</Button>
            </>
          ) : (
            <>
              <Button variant="danger" fullWidth size="lg" onClick={endFast}>⏹ Encerrar Jejum</Button>
              <p className="text-center text-[#2EC4B6] text-sm">Você está no caminho certo! 💪</p>
            </>
          )}
        </div>

        {/* History placeholder */}
        <Card className="mt-6 w-full !bg-white/5">
          <h3 className="text-white font-bold text-sm mb-2">Histórico</h3>
          <div className="text-center py-4"><UniMascot expression="happy" size="sm" className="mx-auto mb-2" /><p className="text-xs text-white/40">Jejuns concluídos aparecerão aqui</p></div>
        </Card>
      </div>
    </div>
  );
};

export default Fasting;
