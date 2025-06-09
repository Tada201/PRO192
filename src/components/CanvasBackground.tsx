// CanvasBackground.tsx
import { useEffect, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'circle' | 'triangle' | 'square';
}

const PARTICLE_COUNT = 80;
const SHAPES: Array<'circle' | 'triangle' | 'square'> = ['circle', 'triangle', 'square'];

function getThemeColors(theme: string) {
  if (theme === 'dark') {
    return {
      particleColors: ['#3A86FF', '#00C4CC', '#D3D3D3', '#bb86fc'],
      connectionColor: 'rgba(58,134,255,0.15)',
      bgClear: 'rgba(15,23,42,0.04)',
      geoColor: 'rgba(58,134,255,0.08)',
      hexColor: 'rgba(187,134,252,0.08)'
    };
  } else {
    return {
      particleColors: ['#6366F1', '#10B981', '#1F2937', '#FF6961'],
      connectionColor: 'rgba(99,102,241,0.13)',
      bgClear: 'rgba(250,250,250,0.04)',
      geoColor: 'rgba(99,102,241,0.07)',
      hexColor: 'rgba(255,105,97,0.07)'
    };
  }
}

const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const { settings } = useSettings();

  useEffect(() => {
    if (!settings.backgroundAnimation) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let running = true;
    const colors = getThemeColors(settings.theme);

    function resizeCanvas() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle initialization
    function initParticles() {
      const arr: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          size: 2.5 + Math.random() * 2.5,
          opacity: 0.5 + Math.random() * 0.4,
          color: colors.particleColors[Math.floor(Math.random() * colors.particleColors.length)],
          type: SHAPES[Math.floor(Math.random() * SHAPES.length)]
        });
      }
      particlesRef.current = arr;
    }
    initParticles();

    // Mouse interaction
    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isMoving = true;
      setTimeout(() => (mouseRef.current.isMoving = false), 100);
    }
    window.addEventListener('mousemove', handleMouseMove);

    // Draw geometric shapes
    function drawFloatingShapes() {
      if (!ctx) return;
      // Large drifting circles
      for (let i = 0; i < 3; i++) {
        const t = Date.now() * 0.0001 + i * 2;
        const x = width * (0.2 + 0.3 * i) + Math.sin(t) * 60;
        const y = height * (0.2 + 0.2 * i) + Math.cos(t) * 60;
        ctx.save();
        ctx.globalAlpha = 0.04;
        ctx.beginPath();
        ctx.arc(x, y, 90 + 30 * Math.sin(t), 0, 2 * Math.PI);
        ctx.fillStyle = colors.geoColor;
        ctx.fill();
        ctx.restore();
      }
      // Rotating hexagons
      for (let i = 0; i < 2; i++) {
        const t = Date.now() * 0.00013 + i * 3;
        const x = width * (0.7 - 0.2 * i) + Math.cos(t) * 80;
        const y = height * (0.7 - 0.2 * i) + Math.sin(t) * 80;
        ctx.save();
        ctx.globalAlpha = 0.035;
        ctx.translate(x, y);
        ctx.rotate(t);
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j;
          ctx.lineTo(Math.cos(angle) * 60, Math.sin(angle) * 60);
        }
        ctx.closePath();
        ctx.strokeStyle = colors.hexColor;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawParticle(p: Particle) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      switch (p.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x - p.size, p.y + p.size);
          ctx.lineTo(p.x + p.size, p.y + p.size);
          ctx.closePath();
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
          break;
      }
      ctx.restore();
    }

    function updateParticles() {
      for (const p of particlesRef.current) {
        // Opacity pulse
        p.opacity = 0.5 + 0.3 * Math.sin(Date.now() * 0.001 + p.x * 0.01);
        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;
        // Wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        // Mouse repulsion
        if (mouseRef.current.isMoving) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150 * 0.6;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
      }
    }

    function drawConnections() {
      if (!ctx) return;
      const arr = particlesRef.current;
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const a = arr[i], b = arr[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 120) * 0.25;
            ctx.strokeStyle = colors.connectionColor;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    function animate() {
      if (!running || !settings.backgroundAnimation) return;
      if (!ctx) return;
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.bgClear;
      ctx.fillRect(0, 0, width, height);
      drawFloatingShapes();
      updateParticles();
      drawConnections();
      for (const p of particlesRef.current) drawParticle(p);
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      running = false;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [settings.backgroundAnimation, settings.theme]);

  if (!settings.backgroundAnimation) return null;
  return (
    <canvas
      ref={canvasRef}
      id="background-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background 0.3s',
      }}
      aria-hidden="true"
    />
  );
};

export default CanvasBackground;
