import React from 'react';
import type { EditorialFigure } from '../types';

/** Quiet SVG bars — editorial figures from measured numbers only. */
export const MetricBars: React.FC<{ figure: EditorialFigure }> = ({ figure }) => {
  const max = figure.maxValue ?? Math.max(...figure.bars.map((b) => b.value), 1);
  const w = 420;
  const rowH = 36;
  const h = figure.bars.length * rowH + 8;
  const labelW = 148;
  const barMax = w - labelW - 56;

  return (
    <figure className="my-6 overflow-hidden rounded-sm border border-stone-200/90 bg-white/60 p-4">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full max-w-lg text-stone-800"
        role="img"
        aria-label={figure.caption}
      >
        {figure.bars.map((b, i) => {
          const y = i * rowH + 8;
          const bw = Math.max(2, (b.value / max) * barMax);
          return (
            <g key={b.label}>
              <text x={0} y={y + 14} className="fill-stone-600" style={{ fontSize: 11 }}>
                {b.label}
              </text>
              <rect
                x={labelW}
                y={y}
                width={barMax}
                height={18}
                rx={2}
                className="fill-stone-100"
              />
              <rect
                x={labelW}
                y={y}
                width={bw}
                height={18}
                rx={2}
                fill="#1839A7"
                opacity={0.85}
              />
              <text
                x={labelW + bw + 6}
                y={y + 13}
                className="fill-stone-700"
                style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
              >
                {b.value.toFixed(2)}
                {b.note ? `  ${b.note}` : ''}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 max-w-prose text-xs leading-relaxed text-stone-500">
        {figure.caption}
      </figcaption>
    </figure>
  );
};
