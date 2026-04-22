'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import StoryCard from '@/components/StoryCard';
import Timeline from '@/components/Timeline';

const StarField = dynamic(() => import('@/components/StarField'), { ssr: false });

// ── Visual components for cards ──────────────────────────────────────────────

function VisualIntro() {
  return (
    <div className="text-center space-y-3 w-full">
      <div className="font-display text-6xl text-gradient-cyan glow-cyan">NDT</div>
      <div className="font-mono text-xs text-space/50 tracking-widest">1958 – presente</div>
      <div className="flex justify-center gap-3 flex-wrap mt-2">
        {['Astrofísico', 'Divulgador', 'Escritor', 'Comunicador'].map((tag) => (
          <span key={tag} className="badge-cyan font-mono text-xs px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="font-mono text-[11px] text-space/40 mt-3 italic">
        &ldquo;El universo no está obligado a tener sentido para ti.&rdquo;
      </div>
    </div>
  );
}

function VisualDiagram() {
  const items = [
    { icon: '📡', label: 'TV / StarTalk', sub: 'Público general' },
    { icon: '🎙️', label: 'Podcast', sub: 'Amplia audiencia' },
    { icon: '🎓', label: 'Conferencia', sub: 'Academia' },
  ];
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-2 text-center">
        <div className="badge-cyan rounded-lg p-2 font-mono text-xs leading-tight flex-1">
          Emisor<br /><span className="text-space/60">Tyson</span>
        </div>
        <div className="text-cyan/40 font-display text-2xl flex-shrink-0">→</div>
        <div className="badge-gold rounded-lg p-2 font-mono text-xs leading-tight flex-1">
          Mensaje<br /><span className="text-space/60">Ciencia</span>
        </div>
        <div className="text-gold/40 font-display text-2xl flex-shrink-0">→</div>
        <div className="badge-pink rounded-lg p-2 font-mono text-xs leading-tight flex-1">
          Receptor<br /><span className="text-space/60">Audiencia</span>
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-2">
        {items.map((it) => (
          <div key={it.label} className="flex-1 text-center glass rounded-lg p-2 border border-white/5">
            <div className="text-xl">{it.icon}</div>
            <div className="font-mono text-[10px] text-cyan/80 leading-tight">{it.label}</div>
            <div className="font-mono text-[10px] text-space/40">{it.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualVideo() {
  return (
    <div className="w-full text-center space-y-3">
      <div className="relative mx-auto w-full max-w-xs rounded-lg overflow-hidden border border-pink/20 bg-black/30">
        <div className="aspect-video flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink/10 to-transparent" />
          <div className="text-center z-10">
            <div className="text-4xl mb-2">▶</div>
            <div className="font-mono text-xs text-pink/80">YouTube · 0:09–0:45</div>
            <div className="font-mono text-[10px] text-space/40 mt-1">Entrevista / Conferencia</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 font-mono text-[10px] text-space/50">
        {['Marca personal', 'Conocimiento', 'Institución', 'Pasión'].map((t) => (
          <span key={t} className="badge-pink px-2 py-0.5 rounded-full">{t}</span>
        ))}
      </div>
    </div>
  );
}

function VisualWaveform() {
  const bars = [0.3, 0.6, 1, 0.7, 0.4, 0.9, 1, 0.5, 0.8, 1, 0.6, 0.4, 0.7, 1, 0.5, 0.8, 0.3, 0.6, 1, 0.7, 0.4, 0.8, 0.5, 1, 0.6];
  const moments = [
    { pos: '20%', label: 'Pausa', color: '#4fc3f7' },
    { pos: '48%', label: 'Énfasis', color: '#ffd54f' },
    { pos: '78%', label: 'Clímax', color: '#e91e8c' },
  ];
  return (
    <div className="w-full space-y-3">
      <div className="font-mono text-[10px] text-space/40 text-center tracking-widest">FORMA DE ONDA · DISCURSO</div>
      <div className="relative h-16 flex items-center justify-center gap-[3px] px-4">
        {bars.map((h, i) => (
          <div
            key={i}
            className="wave-bar rounded-full"
            style={{
              height: `${h * 100}%`,
              width: '6px',
              background: `rgba(79, 195, 247, ${0.4 + h * 0.5})`,
              '--duration': `${0.8 + Math.random() * 0.8}s`,
              '--delay': `${i * 0.04}s`,
            } as React.CSSProperties}
          />
        ))}
        {/* Moment markers */}
        {moments.map((m) => (
          <div
            key={m.label}
            className="absolute top-0 flex flex-col items-center"
            style={{ left: m.pos }}
          >
            <div className="w-px h-full opacity-60" style={{ background: m.color }} />
            <span className="font-mono text-[9px] mt-1" style={{ color: m.color }}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {['Velocidad', 'Pausas', 'Modulación'].map((t) => (
          <span key={t} className="badge-cyan font-mono text-[10px] px-2 py-0.5 rounded-full">{t}</span>
        ))}
      </div>
    </div>
  );
}

function VisualBodyLanguage() {
  const indicators = [
    { icon: '🤲', label: 'Gestos amplios', color: 'cyan' },
    { icon: '🧍', label: 'Postura erguida', color: 'gold' },
    { icon: '👁️', label: 'Contacto visual', color: 'pink' },
    { icon: '😊', label: 'Expresión abierta', color: 'cyan' },
    { icon: '💪', label: 'Confianza', color: 'gold' },
    { icon: '🌟', label: 'Presencia escénica', color: 'pink' },
  ];
  return (
    <div className="w-full">
      <div className="font-mono text-[10px] text-space/40 text-center tracking-widest mb-3">
        INDICADORES NO VERBALES
      </div>
      <div className="grid grid-cols-3 gap-2">
        {indicators.map((ind) => (
          <div
            key={ind.label}
            className={`badge-${ind.color} rounded-lg p-2 text-center`}
          >
            <div className="text-xl">{ind.icon}</div>
            <div className="font-mono text-[9px] leading-tight mt-1">{ind.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualBooks() {
  const words = ['Claridad', 'Pasión', 'Impacto'];
  const books = ['Death by Black Hole', 'Astrophysics for People in a Hurry', 'Starry Night', 'Space Chronicles'];
  return (
    <div className="w-full space-y-3">
      <div className="flex justify-center gap-4">
        {words.map((w, i) => (
          <div
            key={w}
            className={`font-display text-2xl ${i === 0 ? 'text-gradient-cyan' : i === 1 ? 'text-gradient-gold' : 'text-gradient-pink'}`}
          >
            {w}
          </div>
        ))}
      </div>
      <hr className="hr-accent" />
      <div className="grid grid-cols-2 gap-2">
        {books.map((b) => (
          <div key={b} className="glass border border-white/5 rounded-lg p-2 text-center">
            <div className="text-xl mb-1">📖</div>
            <div className="font-mono text-[9px] text-space/60 leading-tight">{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Cards data ────────────────────────────────────────────────────────────────

const cards = [
  {
    number: '01',
    badge: 'cyan' as const,
    module: 'Introducción',
    title: 'Presentación',
    description:
      'Presentación del objetivo: analizar el estilo comunicacional de Neil deGrasse Tyson aplicando los módulos 1–6. ¿Quién es y por qué es un referente de la comunicación científica?',
    visual: <VisualIntro />,
    extra: 'Fondo con estética espacial, tipografía simple y directa. Foto icónica de Tyson + título de la presentación.',
  },
  {
    number: '02',
    badge: 'gold' as const,
    module: 'Módulos 1 y 2',
    title: 'Comunicación',
    description:
      'Tyson como emisor experto: cómo adapta su mensaje científico para distintos receptores (público general, académico, niños). Análisis del canal, código y contexto.',
    visual: <VisualDiagram />,
    extra: 'Íconos de los 6 factores comunicacionales. Diagrama Emisor → Mensaje → Receptor con ejemplos reales.',
  },
  {
    number: '03',
    badge: 'pink' as const,
    module: 'Módulo 3',
    title: 'Institucional',
    description:
      'Tyson como comunicador institucional: construye su marca personal y la del conocimiento científico. Pasión por comunicar como identidad.',
    visual: <VisualVideo />,
    extra: 'Video fragmento 0:09–0:45. Relacionar con 4 pasos de comunicación externa efectiva.',
  },
  {
    number: '04',
    badge: 'cyan' as const,
    module: 'Módulo 4',
    title: 'Verbal',
    description:
      'Uso magistral de pausas dramáticas, variación de velocidad según emoción del mensaje, voz grave y modulación como herramientas de persuasión.',
    visual: <VisualWaveform />,
    extra: 'Relacionar con infografía "El discurso": velocidad, pausas, fórmula 7-7. Gráfico de onda de voz estilizado.',
  },
  {
    number: '05',
    badge: 'gold' as const,
    module: 'Módulo 5',
    title: 'No Verbal',
    description:
      'Tyson usa el cuerpo como extensión del discurso: gestos amplios y naturales para ilustrar conceptos astronómicos, postura erguida y abierta, mirada que conecta con la audiencia.',
    visual: <VisualBodyLanguage />,
    extra: 'Relacionar con Crawley: coherencia verbal-no verbal, comportamientos que transmiten seguridad.',
  },
  {
    number: '06',
    badge: 'pink' as const,
    module: 'Módulo 6 + Cierre',
    title: 'Síntesis',
    description:
      'Tyson como escritor y divulgador: libros, artículos, redes. Comunicación escrita con el mismo hilo conductor que la oral. Síntesis de los 6 módulos.',
    visual: <VisualBooks />,
    extra: 'Transición hacia módulos siguientes del proyecto grupal. Portadas de libros. Palabras clave: Claridad — Pasión — Impacto.',
  },
];

// ── Hero scroll indicator ─────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono text-[10px] tracking-widest text-cyan/50 uppercase">Scroll</span>
      <div className="bounce-arrow text-cyan/60">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ── Hero section ──────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.querySelectorAll('.fade-up').forEach((node) => node.classList.add('visible'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-16"
    >
      {/* Top label */}
      <div className="fade-up delay-100">
        <span className="font-mono text-xs tracking-widest text-cyan/60 uppercase border border-cyan/20 px-4 py-1.5 rounded-full">
          Análisis Comunicacional · Módulos 1–6
        </span>
      </div>

      {/* Main title */}
      <div className="mt-8 space-y-0 fade-up delay-200">
        <div className="font-display text-[clamp(4rem,14vw,10rem)] leading-none text-space/90 glow-cyan">
          NEIL
        </div>
        <div className="font-display text-[clamp(4rem,14vw,10rem)] leading-none text-gradient-cyan">
          deGRASSE
        </div>
        <div className="font-display text-[clamp(4rem,14vw,10rem)] leading-none text-gradient-gold glow-gold">
          TYSON
        </div>
      </div>

      {/* Accent line */}
      <div className="fade-up delay-300 w-full max-w-md mt-8">
        <hr className="hr-accent" />
      </div>

      {/* Course info */}
      <div className="mt-6 space-y-2 fade-up delay-400">
        <p className="font-mono text-sm text-space/70 tracking-wide">
          Seminario de Comunicación Técnica y Profesional
        </p>
        <p className="font-mono text-sm text-gold/80 tracking-widest uppercase">
          Universidad de Palermo · 2026
        </p>
      </div>

      {/* Group members */}
      <div className="mt-6 fade-up delay-500">
        <div className="glass border border-white/10 rounded-xl px-6 py-3 inline-block">
          <span className="font-mono text-xs text-space/40 uppercase tracking-widest">Integrantes:</span>
          <span className="font-mono text-sm text-space/70 ml-2">[nombres aquí]</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 fade-up delay-700">
        <ScrollIndicator />
      </div>

      {/* Decorative orbit rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/5"
          style={{ width: 'clamp(300px,60vw,700px)', height: 'clamp(300px,60vw,700px)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/5"
          style={{ width: 'clamp(400px,80vw,900px)', height: 'clamp(400px,80vw,900px)' }}
        />
      </div>
    </section>
  );
}

// ── Storyboard section ────────────────────────────────────────────────────────

function StoryboardSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-up').forEach((n) => n.classList.add('visible'));
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative z-10 py-24 px-4">
      {/* Section header */}
      <div ref={headerRef} className="text-center mb-16 max-w-2xl mx-auto">
        <div className="fade-up">
          <span className="font-mono text-xs tracking-widest text-cyan/60 uppercase">
            Storyboard
          </span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl text-gradient-cyan mt-2 fade-up delay-100">
          Las Viñetas
        </h2>
        <p className="text-space/50 font-mono text-sm mt-4 fade-up delay-200">
          Seis módulos de análisis comunicacional aplicados a Neil deGrasse Tyson
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <StoryCard
            key={card.number}
            number={card.number}
            badge={card.badge}
            module={card.module}
            title={card.title}
            description={card.description}
            visual={card.visual}
            extra={card.extra}
            delay={i * 80}
          />
        ))}
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative z-10 py-12 text-center border-t border-white/5">
      <hr className="hr-accent mb-8 max-w-xs mx-auto" />
      <p className="font-mono text-xs text-space/30 tracking-widest uppercase">
        Seminario de Comunicación Técnica y Profesional
      </p>
      <p className="font-mono text-xs text-space/20 tracking-widest uppercase mt-1">
        Universidad de Palermo · 2026
      </p>
    </footer>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <StarField />
      <div className="relative z-10">
        <Hero />
        <StoryboardSection />
        <Timeline />
        <Footer />
      </div>
    </main>
  );
}
