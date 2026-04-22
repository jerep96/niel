'use client';

import { useEffect, useRef } from 'react';

const steps = [
  { label: 'Apertura',                viñeta: 'Viñeta 1', desc: 'Presentación y objetivos del análisis',                       color: 'cyan' as const },
  { label: 'Desarrollo Marco Teórico', viñeta: 'Viñeta 2', desc: 'Comunicación humana y proceso · Módulos 1 y 2',               color: 'gold' as const },
  { label: 'Evidencia Audiovisual',    viñeta: 'Viñeta 3', desc: 'Tyson como comunicador institucional · Módulo 3',             color: 'pink' as const },
  { label: 'Análisis Verbal',          viñeta: 'Viñeta 4', desc: 'Comunicación verbal y paraverbal · Módulo 4',                 color: 'cyan' as const },
  { label: 'Análisis No Verbal',       viñeta: 'Viñeta 5', desc: 'Lenguaje corporal y comunicación no verbal · Módulo 5',       color: 'gold' as const },
  { label: 'Cierre',                   viñeta: 'Viñeta 6', desc: 'Comunicación escrita · Síntesis · Módulo 6',                  color: 'pink' as const },
];

export default function Timeline() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-mono text-xs tracking-widest text-cyan/60 uppercase">Flujo de presentación</span>
        <h2 className="font-display text-4xl md:text-5xl text-gradient-cyan mt-1">Arco Narrativo</h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px timeline-line" aria-hidden="true" />
        <div className="space-y-3">
          {steps.map((step, i) => {
            const dotColor   = step.color === 'cyan' ? 'bg-cyan'      : step.color === 'gold' ? 'bg-gold'      : 'bg-pink';
            const textColor  = step.color === 'cyan' ? 'text-gradient-cyan'  : step.color === 'gold' ? 'text-gradient-gold'  : 'text-gradient-pink';
            const borderColor = step.color === 'cyan' ? 'border-cyan/20' : step.color === 'gold' ? 'border-gold/20' : 'border-pink/20';
            return (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="fade-up flex gap-6 items-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative flex-shrink-0 w-12 flex justify-center">
                  <div className={`w-3 h-3 rounded-full ${dotColor} pulse-dot relative z-10`} style={{ animationDelay: `${i * 0.3}s` }} />
                </div>
                <div className={`glass rounded-xl p-3 flex-1 border ${borderColor}`}>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className={`font-display text-xl ${textColor}`}>{step.label}</h3>
                    <span className="font-mono text-xs text-space/40">{step.viñeta}</span>
                  </div>
                  <p className="text-space/60 text-xs mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
