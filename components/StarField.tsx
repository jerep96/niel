'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  parallaxFactor: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  active: boolean;
  life: number;
  maxLife: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastShootRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      starsRef.current = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.5 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinklePhase: Math.random() * Math.PI * 2,
        parallaxFactor: 0.005 + Math.random() * 0.025,
      }));
    };

    const spawnShootingStar = () => {
      const angle = (Math.random() * Math.PI) / 6 + Math.PI / 12;
      const speed = 8 + Math.random() * 10;
      shootingStarsRef.current.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 80 + Math.random() * 120,
        opacity: 1,
        active: true,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    };

    const draw = (timestamp: number) => {
      timeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const mx = (mouseRef.current.x - cx) / cx;
      const my = (mouseRef.current.y - cy) / cy;

      // Draw stars
      starsRef.current.forEach((star) => {
        const t = timestamp * 0.001;
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;

        const px = star.x + mx * star.parallaxFactor * canvas.width * 0.5;
        const py = star.y + my * star.parallaxFactor * canvas.height * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.fill();

        // Glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(79, 195, 247, ${alpha * 0.15})`;
          ctx.fill();
        }
      });

      // Spawn shooting stars every ~4–7 seconds
      if (timestamp - lastShootRef.current > 4000 + Math.random() * 3000) {
        spawnShootingStar();
        lastShootRef.current = timestamp;
      }

      // Draw shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((ss) => ss.active);
      shootingStarsRef.current.forEach((ss) => {
        ss.life += 1;
        const progress = ss.life / ss.maxLife;
        ss.opacity = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;

        const tailX = ss.x - ss.vx * (ss.length / 15);
        const tailY = ss.y - ss.vy * (ss.length / 15);

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, `rgba(255,255,255,0)`);
        gradient.addColorStop(0.7, `rgba(79, 195, 247, ${ss.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255,255,255,${ss.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ss.x += ss.vx;
        ss.y += ss.vy;

        if (ss.life >= ss.maxLife || ss.x > canvas.width || ss.y > canvas.height) {
          ss.active = false;
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} id="star-canvas" aria-hidden="true" />;
}
