import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#080c14',
        cyan: { DEFAULT: '#4fc3f7', light: '#81d4fa' },
        gold: { DEFAULT: '#ffd54f', light: '#fff176' },
        pink: { DEFAULT: '#e91e8c', light: '#f48fb1' },
        space: '#f0f4ff',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        display: '0.04em',
        widest2: '0.2em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
