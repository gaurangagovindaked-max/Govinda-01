import React, { useEffect, useRef } from 'react';
import { RIBBON_FIELD } from '../constants';

/**
 * Ribbon Field (21st.dev) — canvas stripe field with soft edges + mild wave.
 * Used only on work-strip cards / strip backdrop, not full-page wallpaper.
 */
export const RibbonField: React.FC<{
  className?: string;
  animated?: boolean;
}> = ({ className = '', animated = false }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = [...RIBBON_FIELD.colors];
    const angle = (RIBBON_FIELD.angle * Math.PI) / 180;
    const softness = RIBBON_FIELD.softness / 100;
    const wave = RIBBON_FIELD.wave / 100;
    let raf = 0;
    let clock = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || 320;
      const h = parent?.clientHeight || 200;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(w, h);
    };

    const paint = (w: number, h: number) => {
      ctx.fillStyle = RIBBON_FIELD.backdrop;
      ctx.fillRect(0, 0, w, h);

      const diag = Math.hypot(w, h) * 1.2;
      const count = 6;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Positions roughly from palette stops
      const stops = [0.4, 0.47, 0.5, 0.63, 0.81, 1.0];
      for (let i = 0; i < count; i++) {
        const t0 = i === 0 ? 0 : stops[i - 1] ?? i / count;
        const t1 = stops[i] ?? (i + 1) / count;
        const mid = (t0 + t1) / 2;
        const band = Math.max(8, (t1 - t0) * diag * 0.9);
        const color = colors[i % colors.length];

        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate(angle);

        // Wave: cross-axis sine offset
        const samples = 48;
        ctx.beginPath();
        for (let s = 0; s <= samples; s++) {
          const u = (s / samples - 0.5) * diag;
          const cross = s / samples;
          const bend = (wave * 0.35) * Math.sin(cross * 2.4 * Math.PI * 2 + clock) * h * 0.15;
          const x = u;
          const y = (mid - 0.5) * diag + bend - band / 2;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        for (let s = samples; s >= 0; s--) {
          const u = (s / samples - 0.5) * diag;
          const cross = s / samples;
          const bend = (wave * 0.35) * Math.sin(cross * 2.4 * Math.PI * 2 + clock) * h * 0.15;
          const x = u;
          const y = (mid - 0.5) * diag + bend + band / 2;
          ctx.lineTo(x, y);
        }
        ctx.closePath();

        const g = ctx.createLinearGradient(0, -band, 0, band);
        const a = Math.max(0.35, 1 - softness * 0.5);
        g.addColorStop(0, hexAlpha(color, 0));
        g.addColorStop(softness * 0.4, hexAlpha(color, a));
        g.addColorStop(0.5, hexAlpha(color, 1));
        g.addColorStop(1 - softness * 0.4, hexAlpha(color, a));
        g.addColorStop(1, hexAlpha(color, 0));
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.92;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Mild vignette
      const vg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, diag * 0.55);
      vg.addColorStop(0.52, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.32)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      // Grain
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4 * 3) {
        const n = (Math.random() - 0.5) * 28;
        d[i] = clamp(d[i] + n);
        d[i + 1] = clamp(d[i + 1] + n);
        d[i + 2] = clamp(d[i + 2] + n);
      }
      ctx.putImageData(img, 0, 0);

      // Silence unused lint
      void cos;
      void sin;
    };

    resize();
    window.addEventListener('resize', resize);

    if (animated) {
      const tick = () => {
        clock += 0.02;
        const parent = canvas.parentElement;
        paint(parent?.clientWidth || 320, parent?.clientHeight || 200);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [animated]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
};

/** CSS fallback for static cards (exact only when wave≈0; still uses palette). */
export const ribbonFieldCss: React.CSSProperties = {
  backgroundColor: '#1D62D7',
  backgroundImage: [
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
    'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.32) 100%)',
    'linear-gradient(135deg, #1D62D7 0.91%, #1D62D7 42.59%, #C3CFEA 43.89%, #C3CFEA 48.11%, #3CC1F6 48.89%, #3CC1F6 56.11%, #1839A7 58.19%, #1839A7 79.81%, #1E788A 81.5%, #1E788A 100%)',
  ].join(', '),
  backgroundSize: '120px 120px, auto, auto',
  backgroundBlendMode: 'overlay, normal, normal',
};

function hexAlpha(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function clamp(n: number) {
  return Math.max(0, Math.min(255, n | 0));
}
