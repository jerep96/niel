'use client';

import { useEffect, useState } from 'react';

const NAV_SLIDES = [
  { id: 'cover',      label: 'Cover',      color: '#f0f4ff', pending: false },
  { id: 'vineta-01',  label: 'Viñeta 01',  color: '#4fc3f7', pending: false },
  { id: 'vineta-02',  label: 'Viñeta 02',  color: '#4fc3f7', pending: false },
  { id: 'vineta-03',  label: 'Viñeta 03',  color: '#e91e8c', pending: false },
  { id: 'vineta-04',  label: 'Viñeta 04',  color: '#ffd54f', pending: false },
  { id: 'vineta-05',  label: 'Viñeta 05',  color: '#e91e8c', pending: false },
  { id: 'vineta-06',  label: 'Viñeta 06',  color: '#ffd54f', pending: false },
  { id: 'vineta-07',  label: 'Viñeta 07',  color: '#4fc3f7', pending: true  },
  { id: 'vineta-08',  label: 'Viñeta 08',  color: '#ffd54f', pending: true  },
];

function dotStyle(
  slide: (typeof NAV_SLIDES)[number],
  isActive: boolean
): React.CSSProperties {
  if (slide.pending) {
    return isActive
      ? {
          width: 8,
          height: 20,
          borderRadius: 4,
          border: `2px dashed ${slide.color}`,
          backgroundColor: `${slide.color}18`,
          boxShadow: `0 0 8px ${slide.color}80`,
        }
      : {
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '2px dashed rgba(240,244,255,0.28)',
          backgroundColor: 'transparent',
        };
  }
  return isActive
    ? {
        width: 8,
        height: 20,
        borderRadius: 4,
        backgroundColor: slide.color,
        boxShadow: `0 0 10px ${slide.color}cc`,
      }
    : {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'rgba(240,244,255,0.2)',
      };
}

export default function SlideNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SLIDES.forEach((slide, i) => {
      const el = document.getElementById(slide.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-center"
      aria-label="Navegación de diapositivas"
    >
      {NAV_SLIDES.map((slide, i) => (
        <button
          key={slide.id}
          onClick={() => scrollTo(slide.id)}
          title={slide.pending ? `${slide.label} — próximamente` : slide.label}
          aria-label={`Ir a ${slide.label}`}
          className="transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          style={dotStyle(slide, active === i)}
        />
      ))}
    </nav>
  );
}
