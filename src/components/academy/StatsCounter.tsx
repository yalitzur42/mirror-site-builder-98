import { useEffect, useRef, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface StatsCounterProps {
  stats: StatItem[];
}

const StatsCounter = ({ stats }: StatsCounterProps) => {
  const [animated, setAnimated] = useState(false);
  const [display, setDisplay] = useState(stats.map(() => 0));
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          const start = performance.now();
          const duration = 1400;

          const tick = (now: number) => {
            const p = clamp((now - start) / duration, 0, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(stats.map((s) => Math.floor(s.value * eased)));
            if (p < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [stats, animated]);

  return (
    <div ref={wrapRef}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 md:p-6">
            <div className="text-4xl md:text-5xl font-black mb-2">
              {animated ? `${display[index]}${stat.suffix}` : "0"}
            </div>
            <p className="opacity-70 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;
