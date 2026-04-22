'use client';

import { useEffect, useRef } from 'react';

interface StoryCardProps {
  number: string;
  badge: 'cyan' | 'gold' | 'pink';
  module: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  extra: string;
  delay?: number;
}

export default function StoryCard({
  number,
  badge,
  module,
  title,
  description,
  visual,
  extra,
  delay = 0,
}: StoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const badgeClass = `badge-${badge}`;
  const borderAccent =
    badge === 'cyan'
      ? 'hover:border-cyan/50'
      : badge === 'gold'
      ? 'hover:border-gold/50'
      : 'hover:border-pink/50';

  return (
    <div
      ref={ref}
      className={`fade-up story-card glass rounded-2xl overflow-hidden ${borderAccent}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Card header */}
      <div className="p-5 pb-0 flex items-start justify-between gap-3">
        <div>
          <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>
            {module}
          </span>
          <h3
            className={`font-display text-4xl mt-2 leading-none ${
              badge === 'cyan'
                ? 'text-gradient-cyan'
                : badge === 'gold'
                ? 'text-gradient-gold'
                : 'text-gradient-pink'
            }`}
          >
            {title}
          </h3>
        </div>
        <div
          className={`font-display text-6xl leading-none opacity-20 ${
            badge === 'cyan' ? 'text-cyan' : badge === 'gold' ? 'text-gold' : 'text-pink'
          }`}
        >
          {number}
        </div>
      </div>

      {/* Visual area */}
      <div className="mx-5 mt-4 rounded-xl card-visual min-h-[140px] flex items-center justify-center p-4">
        {visual}
      </div>

      {/* Info rows */}
      <div className="p-5 space-y-3">
        <Row label="Descripción" text={description} />
        <hr className="hr-accent" />
        <Row label="Extra" text={extra} />
      </div>
    </div>
  );
}

function Row({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="font-mono text-[10px] tracking-widest text-cyan/60 uppercase">{label}</span>
      <p className="text-space/80 text-sm leading-relaxed mt-0.5">{text}</p>
    </div>
  );
}
