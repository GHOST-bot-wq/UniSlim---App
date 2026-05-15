import { useState, useEffect, useRef } from 'react';

export function useCountUp(end: number, duration = 1000, start = 0): number {
  const [value, setValue] = useState(start);
  const prevEnd = useRef(start);

  useEffect(() => {
    const from = prevEnd.current;
    prevEnd.current = end;
    if (from === end) { setValue(end); return; }

    const startTime = performance.now();
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (end - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return value;
}
