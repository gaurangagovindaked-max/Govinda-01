import React from 'react';
import { motion } from 'framer-motion';

/** Honest multi-chart panel from dual-T4 BREED / CONCORD measured runs. */
export const ResearchCharts: React.FC = () => {
  // From seals: k search quality ratios; VRAM father/child; pure TPS x
  const qualityByK = [
    { k: 'k=8', q: 0.79 },
    { k: 'k=4', q: 0.81 },
    { k: 'k=2', q: 0.79 },
    { k: 'k=1', q: 0.76 },
  ];
  const vram = [
    { label: 'Father', gb: 12.53, fill: '#78716c' },
    { label: 'Child 28e', gb: 5.80, fill: '#1c1917' },
  ];
  const tpsX = [
    { label: 'Pure decode ×', v: 1.08 },
    { label: 'Suite ×', v: 1.08 },
    { label: 'Target ×', v: 3.0 },
  ];

  const maxQ = 1;
  const maxGb = 14;
  const maxT = 3.2;

  return (
    <div className="my-10 space-y-8">
      <motion.figure
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-stone-200/60"
      >
        <figcaption className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
          Fig. 1 — Child quality ratio vs parent (hard suite, by active top-k)
        </figcaption>
        <svg viewBox="0 0 440 160" className="h-auto w-full max-w-xl" role="img">
          {/* grid */}
          {[0.25, 0.5, 0.75, 1].map((g) => (
            <line
              key={g}
              x1={48}
              x2={420}
              y1={20 + (1 - g) * 110}
              y2={20 + (1 - g) * 110}
              stroke="#e7e5e4"
              strokeWidth={1}
            />
          ))}
          {/* bars */}
          {qualityByK.map((d, i) => {
            const bw = 56;
            const gap = 28;
            const x = 64 + i * (bw + gap);
            const h = (d.q / maxQ) * 110;
            const y = 130 - h;
            return (
              <g key={d.k}>
                <motion.rect
                  x={x}
                  width={bw}
                  rx={4}
                  fill="#1c1917"
                  initial={{ height: 0, y: 130 }}
                  whileInView={{ height: h, y }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                />
                <text x={x + bw / 2} y={146} textAnchor="middle" fill="#78716c" fontSize={11}>
                  {d.k}
                </text>
                <text
                  x={x + bw / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fill="#44403c"
                  fontSize={11}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {d.q.toFixed(2)}
                </text>
              </g>
            );
          })}
          <text x={8} y={24} fill="#a8a29e" fontSize={10}>
            1.0
          </text>
          <text x={8} y={130} fill="#a8a29e" fontSize={10}>
            0
          </text>
        </svg>
        <p className="mt-3 text-xs leading-relaxed text-stone-500">
          Best child quality stayed near ~0.8× father on the loop-penalized suite—not 0.98.
          Numbers from dual-T4 OLMoE hard-keep seals.
        </p>
      </motion.figure>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-stone-200/60"
        >
          <figcaption className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
            Fig. 2 — Peak VRAM (GB)
          </figcaption>
          <svg viewBox="0 0 280 140" className="h-auto w-full" role="img">
            {vram.map((d, i) => {
              const bw = 72;
              const x = 40 + i * 110;
              const h = (d.gb / maxGb) * 100;
              const y = 110 - h;
              return (
                <g key={d.label}>
                  <motion.rect
                    x={x}
                    width={bw}
                    rx={4}
                    fill={d.fill}
                    initial={{ height: 0, y: 110 }}
                    whileInView={{ height: h, y }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.12 * i }}
                  />
                  <text x={x + bw / 2} y={126} textAnchor="middle" fill="#78716c" fontSize={11}>
                    {d.label}
                  </text>
                  <text
                    x={x + bw / 2}
                    y={y - 6}
                    textAnchor="middle"
                    fill="#44403c"
                    fontSize={12}
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {d.gb.toFixed(1)}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-xs text-stone-500">
            Child ~46% of father memory (12.5 → 5.8 GB). Real VRAM win.
          </p>
        </motion.figure>

        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-stone-200/60"
        >
          <figcaption className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
            Fig. 3 — Throughput × vs target
          </figcaption>
          <svg viewBox="0 0 280 140" className="h-auto w-full" role="img">
            {tpsX.map((d, i) => {
              const y = 28 + i * 36;
              const w = (d.v / maxT) * 200;
              return (
                <g key={d.label}>
                  <text x={0} y={y + 12} fill="#78716c" fontSize={10}>
                    {d.label}
                  </text>
                  <rect x={72} y={y} width={200} height={16} rx={3} fill="#f5f5f4" />
                  <motion.rect
                    x={72}
                    y={y}
                    height={16}
                    rx={3}
                    fill={d.label.includes('Target') ? '#a8a29e' : '#1c1917'}
                    initial={{ width: 0 }}
                    whileInView={{ width: w }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 * i }}
                  />
                  <text
                    x={76 + w}
                    y={y + 12}
                    fill="#44403c"
                    fontSize={11}
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {d.v.toFixed(2)}×
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-xs text-stone-500">
            Expert cut barely moves HF decode (~1.08×). 3× needs a faster runtime stack.
          </p>
        </motion.figure>
      </div>
    </div>
  );
};
