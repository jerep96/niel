'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import SlideNav from '@/components/SlideNav';
import Timeline from '@/components/Timeline';

const StarField = dynamic(() => import('@/components/StarField'), { ssr: false });

// ── Visual components — scaled up for full-screen slides ─────────────────────

function VisualIntro() {
  return (
    <div className="text-center space-y-4 w-full">
      <div className="font-display text-[clamp(5rem,14vw,9rem)] leading-none text-gradient-cyan glow-cyan">NDT</div>
      <div className="font-mono text-sm text-space/50 tracking-widest">1958 – presente · Nueva York</div>
      <div className="flex justify-center gap-3 flex-wrap mt-3">
        {['Astrofísico', 'Divulgador', 'Escritor', 'Comunicador'].map((tag) => (
          <span key={tag} className="badge-cyan font-mono text-xs px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="font-mono text-sm text-space/40 mt-4 italic max-w-md mx-auto leading-relaxed">
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
    <div className="w-full space-y-5">
      <div className="flex items-center justify-center gap-3 text-center">
        <div className="badge-cyan rounded-xl px-5 py-3 font-mono text-sm leading-tight">
          Emisor<br /><span className="text-space/60 text-xs">Tyson</span>
        </div>
        <div className="text-cyan/50 font-display text-4xl flex-shrink-0">→</div>
        <div className="badge-gold rounded-xl px-5 py-3 font-mono text-sm leading-tight">
          Mensaje<br /><span className="text-space/60 text-xs">Ciencia</span>
        </div>
        <div className="text-gold/50 font-display text-4xl flex-shrink-0">→</div>
        <div className="badge-pink rounded-xl px-5 py-3 font-mono text-sm leading-tight">
          Receptor<br /><span className="text-space/60 text-xs">Audiencia</span>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        {items.map((it) => (
          <div key={it.label} className="text-center glass rounded-xl px-5 py-3 border border-white/5 min-w-[100px]">
            <div className="text-3xl mb-1">{it.icon}</div>
            <div className="font-mono text-xs text-cyan/80 leading-tight">{it.label}</div>
            <div className="font-mono text-[10px] text-space/40 mt-0.5">{it.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualVideo() {
  return (
    <div className="w-full text-center space-y-4">
      <div className="relative mx-auto rounded-xl overflow-hidden border border-pink/30 bg-black/40" style={{ maxWidth: '380px' }}>
        <div className="aspect-video flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink/15 to-transparent" />
          <div className="text-center z-10">
            <div className="text-6xl mb-2 opacity-80">▶</div>
            <div className="font-mono text-sm text-pink/90 font-bold">YouTube · 0:09–0:45</div>
            <div className="font-mono text-xs text-space/50 mt-1">Entrevista / Conferencia</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 flex-wrap font-mono text-xs">
        {['Marca personal', 'Conocimiento', 'Institución', 'Pasión'].map((t) => (
          <span key={t} className="badge-pink px-3 py-1 rounded-full">{t}</span>
        ))}
      </div>
    </div>
  );
}

function VisualWaveform() {
  const bars = [0.3, 0.6, 1, 0.7, 0.4, 0.9, 1, 0.5, 0.8, 1, 0.6, 0.4, 0.7, 1, 0.5, 0.8, 0.3, 0.6, 1, 0.7, 0.4, 0.8, 0.5, 1, 0.6];
  const moments = [
    { pos: '20%', label: 'Pausa',   color: '#4fc3f7' },
    { pos: '48%', label: 'Énfasis', color: '#ffd54f' },
    { pos: '78%', label: 'Clímax',  color: '#e91e8c' },
  ];
  return (
    <div className="w-full space-y-4">
      <div className="font-mono text-xs text-space/40 text-center tracking-widest">FORMA DE ONDA · DISCURSO</div>
      <div className="relative flex items-center justify-center gap-[4px] px-4" style={{ height: 'clamp(80px, 14vh, 140px)' }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="wave-bar rounded-full"
            style={{
              height: `${h * 100}%`,
              width: '8px',
              background: `rgba(255, 213, 79, ${0.35 + h * 0.6})`,
              '--duration': `${0.8 + (i % 5) * 0.15}s`,
              '--delay': `${i * 0.04}s`,
            } as React.CSSProperties}
          />
        ))}
        {moments.map((m) => (
          <div key={m.label} className="absolute top-0 bottom-0 flex flex-col items-center" style={{ left: m.pos }}>
            <div className="w-px h-full opacity-50" style={{ background: m.color }} />
            <span className="font-mono text-[10px] mt-1 whitespace-nowrap" style={{ color: m.color }}>{m.label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {['Velocidad', 'Pausas', 'Modulación', 'Fórmula 7-7'].map((t) => (
          <span key={t} className="badge-gold font-mono text-xs px-3 py-1 rounded-full">{t}</span>
        ))}
      </div>
    </div>
  );
}

function VisualBodyLanguage() {
  const indicators = [
    { icon: '🤲', label: 'Gestos amplios',    color: 'cyan' },
    { icon: '🧍', label: 'Postura erguida',   color: 'gold' },
    { icon: '👁️', label: 'Contacto visual',   color: 'pink' },
    { icon: '😊', label: 'Expresión abierta', color: 'cyan' },
    { icon: '💪', label: 'Confianza',         color: 'gold' },
    { icon: '🌟', label: 'Presencia escénica', color: 'pink' },
  ];
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="font-mono text-xs text-space/40 text-center tracking-widest mb-4">
        INDICADORES NO VERBALES
      </div>
      <div className="grid grid-cols-3 gap-3">
        {indicators.map((ind) => (
          <div key={ind.label} className={`badge-${ind.color} rounded-xl p-3 text-center`}>
            <div className="text-3xl mb-1">{ind.icon}</div>
            <div className="font-mono text-xs leading-tight">{ind.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualBooks() {
  const words = ['Claridad', 'Pasión', 'Impacto'];
  const books = [
    'Death by Black Hole',
    'Astrophysics for People in a Hurry',
    'Starry Night',
    'Space Chronicles',
  ];
  return (
    <div className="w-full space-y-5">
      <div className="flex justify-center gap-6 flex-wrap">
        {words.map((w, i) => (
          <div
            key={w}
            className={`font-display text-[clamp(1.8rem,4vw,2.8rem)] ${
              i === 0 ? 'text-gradient-cyan' : i === 1 ? 'text-gradient-gold' : 'text-gradient-pink'
            }`}
          >
            {w}
          </div>
        ))}
      </div>
      <hr className="hr-accent max-w-xs mx-auto" />
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {books.map((b) => (
          <div key={b} className="glass border border-white/5 rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">📖</div>
            <div className="font-mono text-[10px] text-space/60 leading-tight">{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Coming-soon placeholder visual ───────────────────────────────────────────

function VisualComingSoon({ accent = 'cyan' }: { accent?: 'cyan' | 'gold' }) {
  const accentColor = accent === 'cyan' ? '#4fc3f7' : '#ffd54f';
  return (
    <div className="w-full max-w-lg mx-auto flex items-center justify-center py-4">
      <div
        className="coming-soon-border w-full rounded-2xl flex flex-col items-center justify-center gap-3 py-10 px-8"
        style={{ color: accentColor }}
      >
        <div className="font-display text-5xl leading-none">✦</div>
        <span className="font-mono text-xs tracking-widest uppercase">
          Contenido en desarrollo
        </span>
      </div>
    </div>
  );
}

// ── Viñeta slide ──────────────────────────────────────────────────────────────

type Accent = 'cyan' | 'gold' | 'pink';

interface ViñetaSlideProps {
  id: string;
  number: string;
  accent: Accent;
  module: string;
  title: string;
  description: string;
  visualLabel: string;
  visual: React.ReactNode;
  extra: string;
}

function NoteCol({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="font-mono text-[9px] tracking-widest text-cyan/50 uppercase block mb-1">{label}</span>
      <p className="text-space/70 text-xs leading-relaxed line-clamp-3">{text}</p>
    </div>
  );
}

function ViñetaSlide({ id, number, accent, module, title, description, visualLabel, visual, extra }: ViñetaSlideProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const accentHex   = accent === 'cyan' ? '#4fc3f7'  : accent === 'gold' ? '#ffd54f'  : '#e91e8c';
  const titleClass  = `text-gradient-${accent}`;
  const glowClass   = `glow-${accent}`;
  const badgeClass  = `badge-${accent}`;
  const borderClass = accent === 'cyan' ? 'border-cyan/20' : accent === 'gold' ? 'border-gold/20' : 'border-pink/20';

  return (
    <section
      id={id}
      ref={sectionRef}
      className="slide z-10 flex flex-col"
    >
      {/* Radial accent glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 44%, ${accentHex}09 0%, transparent 68%)`,
        }}
      />

      {/* Badge — top center */}
      <div className="absolute top-9 inset-x-0 z-10 flex justify-center pointer-events-none">
        <span className={`${badgeClass} font-mono text-[11px] px-4 py-1.5 rounded-full tracking-widest uppercase`}>
          Viñeta {number} · {module}
        </span>
      </div>

      {/* Main content — fills space between badge and notes */}
      <div
        className={`flex-1 flex flex-col items-center justify-center gap-5 px-6 pt-20 pb-2 max-w-5xl mx-auto w-full transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
        }`}
      >
        {/* Large title */}
        <h2
          className={`font-display ${titleClass} ${glowClass} leading-none text-center`}
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
        >
          {title.toUpperCase()}
        </h2>

        {/* Thin accent line */}
        <div className="w-32 h-px" style={{ background: `linear-gradient(to right, transparent, ${accentHex}, transparent)` }} />

        {/* Visual area */}
        <div
          className="w-full flex items-center justify-center"
          style={{ maxHeight: 'clamp(200px, 38vh, 340px)' }}
        >
          {visual}
        </div>
      </div>

      {/* Speaker notes — bottom, subtle, reveal on hover */}
      <div className={`flex-none border-t ${borderClass} group`}>
        <div className="opacity-35 group-hover:opacity-85 transition-opacity duration-500 px-8 py-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            <NoteCol label="Descripción"    text={description}  />
            <NoteCol label="Recurso Visual" text={visualLabel}  />
            <NoteCol label="Extra"          text={extra}        />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Viñeta data ───────────────────────────────────────────────────────────────

const VIÑETAS: ViñetaSlideProps[] = [
  {
    id: 'vineta-01',
    number: '01',
    accent: 'cyan',
    module: 'Introducción',
    title: 'Presentación',
    description: 'Presentación del objetivo: analizar el estilo comunicacional de Neil deGrasse Tyson aplicando los módulos 1–6. ¿Quién es y por qué es un referente de la comunicación científica?',
    visualLabel: 'Foto icónica de Tyson con título de la presentación y datos biográficos clave',
    visual: <VisualIntro />,
    extra: 'Fondo con estética espacial, tipografía simple y directa.',
  },
  {
    id: 'vineta-02',
    number: '02',
    accent: 'cyan',
    module: 'Módulos 1 y 2',
    title: 'Comunicación',
    description: 'Tyson como emisor experto: cómo adapta su mensaje científico para distintos receptores (público general, académico, niños). Análisis del canal, código y contexto.',
    visualLabel: 'Diagrama Emisor → Mensaje → Receptor con ejemplos por canal (TV, podcast, conferencia)',
    visual: <VisualDiagram />,
    extra: 'Íconos de los 6 factores comunicacionales. Diagrama con ejemplos reales de cada canal.',
  },
  {
    id: 'vineta-03',
    number: '03',
    accent: 'pink',
    module: 'Módulo 3',
    title: 'Institucional',
    description: 'Tyson como comunicador institucional: construye su marca personal y la del conocimiento científico. Pasión por comunicar como identidad.',
    visualLabel: 'Fragmento de entrevista o conferencia en YouTube — sección 0:09 a 0:45',
    visual: <VisualVideo />,
    extra: 'Video fragmento 0:09–0:45. Relacionar con 4 pasos de comunicación externa efectiva.',
  },
  {
    id: 'vineta-04',
    number: '04',
    accent: 'gold',
    module: 'Módulo 4',
    title: 'Verbal',
    description: 'Uso magistral de pausas dramáticas, variación de velocidad según emoción del mensaje, voz grave y modulación como herramientas de persuasión.',
    visualLabel: 'Gráfico de onda de voz estilizado con momentos clave: pausa, énfasis, clímax',
    visual: <VisualWaveform />,
    extra: 'Relacionar con infografía "El discurso": velocidad, pausas, fórmula 7-7.',
  },
  {
    id: 'vineta-05',
    number: '05',
    accent: 'pink',
    module: 'Módulo 5',
    title: 'No Verbal',
    description: 'Tyson usa el cuerpo como extensión del discurso: gestos amplios y naturales para ilustrar conceptos astronómicos, postura erguida y abierta, mirada que conecta con la audiencia.',
    visualLabel: 'Foto de Tyson gesticulando en conferencia con íconos de indicadores no verbales superpuestos',
    visual: <VisualBodyLanguage />,
    extra: 'Relacionar con Crawley: coherencia verbal-no verbal, comportamientos que transmiten seguridad.',
  },
  {
    id: 'vineta-06',
    number: '06',
    accent: 'gold',
    module: 'Módulo 6 + Cierre',
    title: 'Síntesis',
    description: 'Tyson como escritor y divulgador: libros, artículos, redes. Comunicación escrita con el mismo hilo conductor que la oral. Síntesis de los 6 módulos.',
    visualLabel: 'Palabras clave: Claridad — Pasión — Impacto. Portadas de libros de divulgación.',
    visual: <VisualBooks />,
    extra: 'Transición hacia módulos siguientes del proyecto grupal. Palabras clave: Claridad — Pasión — Impacto.',
  },
  {
    id: 'vineta-07',
    number: '07',
    accent: 'cyan',
    module: 'Módulo 7',
    title: 'Herramientas para presentar',
    description: 'Análisis de las herramientas visuales y estructurales que utiliza Tyson en sus presentaciones: PowerPoint, Prezi, infografías, uso del color, tipografía y recursos de apoyo visual.',
    visualLabel: 'A definir — recursos visuales del módulo',
    visual: <VisualComingSoon accent="cyan" />,
    extra: 'Relacionar con bibliografía: Nguyen et al. (2017) Presentaciones Memorables',
  },
  {
    id: 'vineta-08',
    number: '08',
    accent: 'gold',
    module: 'Módulo 8',
    title: 'Storytelling',
    description: 'Cómo Tyson construye relatos memorables: uso de la pasión, la razón y la estructura narrativa para hacer que conceptos científicos complejos sean accesibles e impactantes.',
    visualLabel: 'A definir — fragmento de conferencia o entrevista',
    visual: <VisualComingSoon accent="gold" />,
    extra: 'Relacionar con bibliografía: Gallo (2017) Hable como en TED, pp. 57–77. Ethos, Pathos, Logos.',
  },
];

// ── Hero slide ────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef<HTMLElement>(null);

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
      id="cover"
      ref={ref}
      className="slide z-10 flex flex-col items-center justify-center text-center px-4 py-16"
    >
      {/* Top label */}
      <div className="fade-up delay-100">
        <span className="font-mono text-xs tracking-widest text-cyan/60 uppercase border border-cyan/20 px-4 py-1.5 rounded-full">
          Análisis Comunicacional · Módulos 1–6
        </span>
      </div>

      {/* Main title */}
      <div className="mt-8 fade-up delay-200">
        <div className="font-display text-[clamp(4rem,14vw,10rem)] leading-none text-space/90 glow-cyan">NEIL</div>
        <div className="font-display text-[clamp(4rem,14vw,10rem)] leading-none text-gradient-cyan">deGRASSE</div>
        <div className="font-display text-[clamp(4rem,14vw,10rem)] leading-none text-gradient-gold glow-gold">TYSON</div>
      </div>

      {/* Divider */}
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
          <span className="font-mono text-sm text-space/70 ml-2">Lautaro Pintos · Juan Francisco Oliva · Christelle Olivia Jadoul · Juan Martin Traina · Jeremias Palacios</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 fade-up delay-700">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-cyan/50 uppercase">Scroll</span>
          <div className="bounce-arrow text-cyan/60">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Orbit rings */}
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

// ── Timeline slide ────────────────────────────────────────────────────────────

function TimelineSlide() {
  return (
    <section id="timeline" className="slide z-10 flex items-center justify-center overflow-y-auto">
      <Timeline />
    </section>
  );
}

// ── Footer slide ──────────────────────────────────────────────────────────────

function FooterSlide() {
  return (
    <section id="slide-footer" className="slide z-10 flex flex-col items-center justify-center text-center px-4">
      {/* Decorative ring */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/5"
          style={{ width: '600px', height: '600px' }}
        />
      </div>

      <hr className="hr-accent w-24 mb-10" />

      <div className="font-display text-[clamp(2rem,5vw,3.5rem)] text-gradient-cyan leading-tight mb-6">
        FIN DE LA PRESENTACIÓN
      </div>

      <p className="font-mono text-sm text-space/50 tracking-widest uppercase mb-1">
        Seminario de Comunicación Técnica y Profesional
      </p>
      <p className="font-mono text-sm text-gold/60 tracking-widest uppercase">
        Universidad de Palermo · 2026
      </p>

      <div className="mt-10 glass border border-white/10 rounded-xl px-6 py-3 inline-block">
        <span className="font-mono text-xs text-space/40 uppercase tracking-widest">Integrantes:</span>
        <span className="font-mono text-sm text-space/70 ml-2">Lautaro Pintos · Juan Francisco Oliva · Christelle Olivia Jadoul · Juan Martin Traina · Jeremias Palacios</span>
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main className="relative">
      <StarField />
      <SlideNav />
      <Hero />
      {VIÑETAS.map((v) => (
        <ViñetaSlide key={v.id} {...v} />
      ))}
      <TimelineSlide />
      <FooterSlide />
    </main>
  );
}
