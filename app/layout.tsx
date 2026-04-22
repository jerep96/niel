import type { Metadata } from 'next';
import { Bebas_Neue, Space_Mono, Inter } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Neil deGrasse Tyson · Análisis Comunicacional',
  description:
    'Storyboard para Seminario de Comunicación Técnica y Profesional — Universidad de Palermo 2026. Análisis del estilo comunicacional de Neil deGrasse Tyson.',
  openGraph: {
    title: 'Neil deGrasse Tyson · Análisis Comunicacional',
    description: 'Seminario de Comunicación Técnica y Profesional · Universidad de Palermo · 2026',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${spaceMono.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
