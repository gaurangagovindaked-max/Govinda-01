import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';

/**
 * Ent — the flagship system section, merged with the research sidebar.
 *
 * One sticky sidebar now tracks the entire research surface: the Ent story
 * first, then the Working-Set paper and figures, then AETHER. Copy and
 * numbers live in constants.ts (RESUME.ent); this file is presentation.
 */

/* ------------------------------------------------------------------ */
/* Measured series — the August two-laptop WAN trial                   */
/* ------------------------------------------------------------------ */

/** Per-token decode time (ms), tokens 0..25, first pooled WAN run. */
const TOKEN_MS = [
  276.8, 54.3, 51.3, 50.5, 50.0, 49.9, 51.0, 52.7, 54.0, 50.8, 53.9, 57.9,
  60.9, 51.6, 52.1, 57.6, 54.2, 56.7, 55.9, 54.9, 53.0, 55.2, 56.2, 56.3,
  55.4, 54.1,
];
const STEADY_MEAN_MS = 54.0; // mean of tokens 1..25

/** Overlap physics — real network emulation, 3 runs per cell. */
const OVERLAP = [
  { label: 'Same machine', rtt: 'RTT ≈ 0', naive: 28.35, overlapped: 44.22, gain: 1.56 },
  { label: 'Broadband', rtt: 'RTT 61 ms', naive: 10.08, overlapped: 21.46, gain: 2.13 },
  { label: 'Mobile CGNAT', rtt: 'RTT 210 ms', naive: 3.91, overlapped: 7.75, gain: 1.98 },
];

/** Volunteer RAM budget — 7,860 MiB total, 60% donation cap. */
const RAM_BUDGET = { total: 7860, cap: 0.6, used: 612 };

/** Prior-art audit (MinimumStandard §12) — what shipped systems hold. */
const MATRIX_COLS = [
  'Pools volunteers',
  'Sandbox + consent',
  'Per-token quorum',
  'Live re-slice',
  'Wipe by construction',
];
const MATRIX_ROWS: { name: string; note: string; cells: boolean[] }[] = [
  { name: 'Petals (2022)', note: 'trusted enthusiasts, no isolation', cells: [true, false, false, false, false] },
  { name: 'EXO', note: 'local device discovery', cells: [true, false, false, false, false] },
  { name: 'PRIMA.CPP', note: 'research prototype', cells: [true, false, false, false, false] },
  { name: 'llama.cpp RPC', note: 'transport plumbing only', cells: [false, false, false, false, false] },
  { name: 'Ent — this run', note: 'measured, two laptops, open internet', cells: [true, true, true, true, true] },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Figures                                                             */
/* ------------------------------------------------------------------ */

const LayerSplit: React.FC = () => {
  const w = 440;
  const barW = w - 8;
  const hostShare = 0.36;
  return (
    <figure className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-stone-200/60 sm:p-6">
      <figcaption className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
        Fig. 1 — One model, two machines
      </figcaption>
      <svg viewBox={`0 0 ${w} 86`} className="h-auto w-full max-w-xl" role="img" aria-label="Layer split between host and volunteer laptop">
        <rect x={4} y={8} width={barW} height={26} rx={4} fill="#f5f5f4" />
        <motion.rect
          x={4}
          y={8}
          height={26}
          rx={4}
          fill="#78716c"
          initial={{ width: 0 }}
          whileInView={{ width: barW * hostShare }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        />
        <motion.rect
          x={4 + barW * hostShare}
          y={8}
          height={26}
          rx={4}
          fill="#1839A7"
          initial={{ width: 0 }}
          whileInView={{ width: barW * (1 - hostShare) }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        />
        <text x={12} y={25} fill="#fafaf9" fontSize={11} fontWeight={500}>
          Host · 9 layers · 36%
        </text>
        <text x={4 + barW * hostShare + 8} y={25} fill="#fafaf9" fontSize={11} fontWeight={500}>
          Volunteer laptop · 16 layers · 64%
        </text>
        <line
          x1={4 + barW * hostShare + 4}
          y1={44}
          x2={w - 8}
          y2={44}
          stroke="#1839A7"
          strokeWidth={1}
          strokeDasharray="3 3"
          opacity={0.5}
        />
        <text x={4 + barW * hostShare + 4} y={58} fill="#78716c" fontSize={10.5}>
          283.6 MiB of weights streamed over the air
        </text>
        <text x={4} y={78} fill="#a8a29e" fontSize={10}>
          Qwen2.5-0.5B-Instruct · Q4_K_M · 630M params
        </text>
      </svg>
      <p className="mt-3 text-xs leading-relaxed text-stone-500">
        The host never knew what hardware the volunteer had. The laptop measured itself,
        signed the report, and carried almost two-thirds of every token.
      </p>
    </figure>
  );
};

const TokenTimeline: React.FC = () => {
  const w = 440;
  const h = 168;
  const pl = 34;
  const pr = 10;
  const pt = 14;
  const pb = 26;
  const yMax = 285;
  const n = TOKEN_MS.length;
  const x = (i: number) => pl + (i / (n - 1)) * (w - pl - pr);
  const y = (v: number) => pt + (1 - v / yMax) * (h - pt - pb);
  const line = TOKEN_MS.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(n - 1).toFixed(1)},${y(0)} L${x(0).toFixed(1)},${y(0)} Z`;

  return (
    <figure className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-stone-200/60 sm:p-6">
      <figcaption className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
        Fig. 2 — Per-token decode time across the WAN leg
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full max-w-xl" role="img" aria-label="Per-token decode time over the WAN run">
        {[0, 100, 200].map((g) => (
          <g key={g}>
            <line x1={pl} x2={w - pr} y1={y(g)} y2={y(g)} stroke="#e7e5e4" strokeWidth={1} />
            <text x={4} y={y(g) + 3} fill="#a8a29e" fontSize={9}>
              {g}
            </text>
          </g>
        ))}
        <line
          x1={pl}
          x2={w - pr}
          y1={y(STEADY_MEAN_MS)}
          y2={y(STEADY_MEAN_MS)}
          stroke="#1839A7"
          strokeWidth={1}
          strokeDasharray="4 3"
          opacity={0.55}
        />
        <text x={pl + 4} y={y(STEADY_MEAN_MS) - 4} fill="#1839A7" fontSize={9.5} opacity={0.8}>
          steady mean 54 ms
        </text>
        <text x={w - pr - 2} y={pt + 10} textAnchor="end" fill="#a8a29e" fontSize={8.5}>
          cold start
        </text>
        <motion.path
          d={area}
          fill="#1839A7"
          opacity={0.08}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#1c1917"
          strokeWidth={1.6}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        <circle cx={x(0)} cy={y(TOKEN_MS[0])} r={3} fill="#1c1917" />
        <text x={x(0) + 6} y={y(TOKEN_MS[0]) + 3} fill="#44403c" fontSize={9.5} fontFamily="JetBrains Mono, monospace">
          277 ms
        </text>
        <text x={pl} y={h - 8} fill="#a8a29e" fontSize={9}>
          token 0
        </text>
        <text x={w - pr} y={h - 8} textAnchor="end" fill="#a8a29e" fontSize={9}>
          token 25
        </text>
      </svg>
      <p className="mt-3 text-xs leading-relaxed text-stone-500">
        One cold first token, then a flat 50–61 ms band for the rest of the run — about
        18.5 tokens per second with the model split across two home networks. Zero
        degradation, zero re-plans.
      </p>
    </figure>
  );
};

const RamBudget: React.FC = () => {
  const { total, cap, used } = RAM_BUDGET;
  const w = 440;
  const h = 130;
  const y = 18;
  const barH = 64;
  const donatable = Math.round(total * cap);
  const ownerKeep = total - donatable;

  return (
    <figure className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-stone-200/60 sm:p-6">
      <figcaption className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
        Fig. 3 — Who owns the volunteer’s RAM
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full max-w-xl" role="img" aria-label="Volunteer RAM budget: owner keeps most of it">
        <rect x={4} y={y} width={w - 8} height={barH} rx={4} fill="#f5f5f4" />
        <motion.rect
          x={4}
          y={y}
          height={barH}
          rx={4}
          fill="#a8a29e"
          initial={{ width: 0 }}
          whileInView={{ width: ((w - 8) * ownerKeep) / total }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        />
        <motion.rect
          x={4 + ((w - 8) * ownerKeep) / total}
          y={y}
          height={barH}
          rx={4}
          fill="#1839A7"
          initial={{ width: 0 }}
          whileInView={{ width: ((w - 8) * donatable) / total }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        />
        <text x={16} y={y + barH / 2 + 4} fill="#fafaf9" fontSize={11} fontWeight={500}>
          owner keeps {ownerKeep.toLocaleString()} MiB
        </text>
        <text x={w - 12} y={y + barH / 2 + 4} textAnchor="end" fill="#fafaf9" fontSize={11} fontWeight={500}>
          donatable {donatable.toLocaleString()} MiB
        </text>
        {/* actual usage inside the donatable slice */}
        <line
          x1={4 + ((w - 8) * (ownerKeep + used)) / total}
          y1={y - 6}
          x2={4 + ((w - 8) * (ownerKeep + used)) / total}
          y2={y + barH + 6}
          stroke="#1c1917"
          strokeWidth={1.5}
        />
        <text
          x={4 + ((w - 8) * (ownerKeep + used)) / total - 6}
          y={y + barH + 20}
          textAnchor="end"
          fill="#44403c"
          fontSize={10}
        >
          the session used {used} MiB
        </text>
        <text x={4} y={y + barH + 20} fill="#a8a29e" fontSize={10}>
          60% cap by law — never the whole machine
        </text>
      </svg>
      <p className="mt-3 text-xs leading-relaxed text-stone-500">
        The volunteer’s 7,860 MiB, split by the consent cap. The dark marker is what the
        first session actually took — 8% of its donatable slice. The laptop stayed usable
        the whole time.
      </p>
    </figure>
  );
};

const OverlapBars: React.FC = () => {
  const w = 440;
  const groupW = (w - 20) / OVERLAP.length;
  const yMax = 50;
  const baseY = 128;
  const barH = 92;

  return (
    <figure className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-stone-200/60 sm:p-6">
      <figcaption className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
        Fig. 4 — Overlapping transfer with compute, on real network emulation
      </figcaption>
      <svg viewBox={`0 0 ${w} 150`} className="h-auto w-full max-w-xl" role="img" aria-label="Naive versus overlapped throughput at three RTTs">
        {[0, 25, 50].map((g) => (
          <line key={g} x1={8} x2={w - 8} y1={baseY - (g / yMax) * barH} y2={baseY - (g / yMax) * barH} stroke="#e7e5e4" strokeWidth={1} />
        ))}
        {OVERLAP.map((d, gi) => {
          const cx = 10 + gi * groupW + groupW / 2;
          const bw = 30;
          const hN = (d.naive / yMax) * barH;
          const hO = (d.overlapped / yMax) * barH;
          return (
            <g key={d.label}>
              <motion.rect
                x={cx - bw - 4}
                width={bw}
                rx={3}
                fill="#a8a29e"
                initial={{ height: 0, y: baseY }}
                whileInView={{ height: hN, y: baseY - hN }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * gi }}
              />
              <motion.rect
                x={cx + 4}
                width={bw}
                rx={3}
                fill="#1c1917"
                initial={{ height: 0, y: baseY }}
                whileInView={{ height: hO, y: baseY - hO }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * gi + 0.15 }}
              />
              <text x={cx - bw / 2 - 4} y={baseY - hN - 5} textAnchor="middle" fill="#78716c" fontSize={9.5} fontFamily="JetBrains Mono, monospace">
                {d.naive.toFixed(1)}
              </text>
              <text x={cx + bw / 2 + 4} y={baseY - hO - 5} textAnchor="middle" fill="#44403c" fontSize={9.5} fontFamily="JetBrains Mono, monospace">
                {d.overlapped.toFixed(1)}
              </text>
              <text x={cx} y={baseY - barH - 14} textAnchor="middle" fill="#1839A7" fontSize={10} fontWeight={600}>
                {d.gain.toFixed(2) + '\u00d7'}
              </text>
              <text x={cx} y={baseY + 14} textAnchor="middle" fill="#78716c" fontSize={10}>
                {d.label}
              </text>
              <text x={cx} y={baseY + 26} textAnchor="middle" fill="#a8a29e" fontSize={9}>
                {d.rtt}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-3 text-xs leading-relaxed text-stone-500">
        Grey is naive stage-by-stage transfer, dark is overlapped. Sensitivity to
        round-trip time roughly halves (+0.99 → +0.48 ms of decode per ms of RTT), which
        is what keeps a split model alive on real home internet. tok/s on a 0.5B test
        model, three runs per cell.
      </p>
    </figure>
  );
};

const PriorArtMatrix: React.FC = () => {
  return (
    <figure className="my-2 overflow-x-auto">
      <figcaption className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
        Table 1 — What shipped systems actually hold
      </figcaption>
      <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-stone-300/80">
            <th className="py-2.5 pr-3 font-medium text-stone-500">System</th>
            {MATRIX_COLS.map((c) => (
              <th key={c} className="px-2 py-2.5 text-center font-medium text-stone-500">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MATRIX_ROWS.map((r, i) => {
            const mine = i === MATRIX_ROWS.length - 1;
            return (
              <tr
                key={r.name}
                className={`border-b border-stone-200/70 ${mine ? 'bg-stone-900/[0.04]' : ''}`}
              >
                <td className="py-2.5 pr-3">
                  <span className={`block ${mine ? 'font-medium text-stone-900' : 'text-stone-700'}`}>
                    {r.name}
                  </span>
                  <span className="block text-[11px] text-stone-400">{r.note}</span>
                </td>
                {r.cells.map((c, j) => (
                  <td key={j} className="px-2 py-2.5 text-center">
                    {mine ? (
                      <span className="font-mono text-[13px] font-medium text-[#1839A7]">✓</span>
                    ) : c ? (
                      <span className="font-mono text-[13px] text-stone-900">✓</span>
                    ) : (
                      <span className="font-mono text-[13px] text-stone-300">—</span>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-3 text-xs leading-relaxed text-stone-500">
        From my prior-art audit: no shipped system combines more than two of these
        properties. Petals pools machines but is explicit that it cannot run untrusted
        code; llama.cpp RPC is the transport without a trust stack. The gap is the
        product, and the August run is the first measured crossing of it.
      </p>
    </figure>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */


export const EntSection: React.FC = () => {
  const E = RESUME.ent;

  return (
    <div className="px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-16 lg:pr-12">
{/* header */}
          <motion.header
            id="ent-overview"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-10 scroll-mt-20 border-b border-stone-300/70 pb-8 sm:mb-14 sm:scroll-mt-24 sm:pb-10"
          >
            <p className="font-mono text-[11px] text-stone-400">{E.kicker}</p>
            <h2 className="mt-3 font-display text-[1.9rem] font-medium leading-[1.15] tracking-tight text-stone-900 sm:text-4xl md:text-[2.6rem]">
              {E.headline}
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-stone-600 sm:mt-5 sm:text-[15px]">
              {E.subhead}
            </p>
          </motion.header>

          {/* the problem */}
          <motion.article
            id="ent-problem"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.4 }}
            className="mb-12 scroll-mt-24 border-b border-stone-200/80 pb-12"
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400">
              {E.problem.title}
            </h3>
            <div className="mt-4 space-y-4">
              {E.problem.paras.map((p, i) => (
                <p key={i} className="max-w-2xl text-[15px] leading-relaxed text-stone-700">
                  {p}
                </p>
              ))}
            </div>
          </motion.article>

          {/* gold essay + catch + idea */}
          {[
            E.catch,
            E.idea,
          ].map((block) => (
            <motion.article
              key={block.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.5 }}
              className="mb-10 scroll-mt-20 border-b border-stone-200/80 pb-10 sm:mb-14 sm:scroll-mt-24 sm:pb-14"
            >
              <h3 className="font-display text-lg font-medium tracking-tight text-stone-900 md:text-xl">
                {block.title}
              </h3>
              <div className="mt-4 space-y-4 text-[14px] leading-[1.8] text-stone-700 sm:text-[15px] sm:leading-[1.85]">
                {block.paras.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </motion.article>
          ))}

          {/* the gold essay */}
          <motion.article
            id="ent-gold"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5 }}
            className="mb-10 scroll-mt-20 border-b border-stone-200/80 pb-10 sm:mb-14 sm:scroll-mt-24 sm:pb-14"
          >
            <div className="mb-4 flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-stone-300">01</span>
              <h3 className="font-display text-xl font-medium tracking-tight text-stone-900 md:text-2xl">
                {E.gold.title}
              </h3>
            </div>
            <div className="mt-4 space-y-4 text-[15px] leading-[1.85] text-stone-700">
              {E.gold.beats.map((p, j) => (
                <p key={j} className={j === 0 ? 'first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-4xl first-letter:leading-[0.9] first-letter:font-medium first-letter:text-stone-900' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </motion.article>

          {/* the trial */}
          <motion.article
            id="ent-trial"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5 }}
            className="mb-10 scroll-mt-20 pb-10 sm:mb-14 sm:scroll-mt-24 sm:pb-14"
          >
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-medium tracking-tight text-stone-900 md:text-xl">
                {E.trialIntro.title}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.1em] text-stone-400">
                Two laptops · two home networks · open internet
              </p>
            </div>
            <p className="max-w-xl text-[14px] leading-[1.8] text-stone-700 sm:text-[15px]">
              {E.trialIntro.lead}
            </p>

            {/* ceremony */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {E.ceremony.map((c, i) => (
                <motion.div
                  key={c.step}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="rounded-sm border border-stone-300/80 bg-white/70 p-4"
                >
                  <p className="font-mono text-[11px] tracking-tight text-stone-900">
                    {String(i + 1).padStart(2, '0')} {c.step}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-stone-600">{c.line}</p>
                </motion.div>
              ))}
            </div>

            {/* stat strip */}
            <div className="mt-8 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-stone-200/60 sm:p-8">
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 min-[420px]:gap-x-6 sm:grid-cols-3 sm:gap-y-5">
                {E.stats.map((s) => (
                  <div key={s.k}>
                    <p className="font-mono text-xl font-medium text-stone-900 sm:text-2xl">{s.v}</p>
                    <p className="mt-1 text-[11.5px] leading-snug text-stone-500">{s.k}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-4 text-[13.5px] leading-[1.8] text-stone-600">
                {E.trialStory.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          </motion.article>

          {/* figures */}
          <div id="ent-figures" className="mb-14 scroll-mt-24 border-b border-stone-200/80 pb-14">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-medium text-stone-900">Figures</h3>
              <p className="text-[11px] uppercase tracking-[0.1em] text-stone-400">
                Measured · first WAN run
              </p>
            </div>
            <div className="space-y-6">
              <LayerSplit />
              <TokenTimeline />
              <RamBudget />
              <OverlapBars />
            </div>
          </div>

          {/* the finding */}
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5 }}
            className="mb-10 scroll-mt-20 border-b border-stone-200/80 pb-10 sm:mb-14 sm:scroll-mt-24 sm:pb-14"
          >
            <h3 className="font-display text-lg font-medium tracking-tight text-stone-900 md:text-xl">
              {E.finding.title}
            </h3>
            <div className="mt-4 space-y-4 text-[14px] leading-[1.8] text-stone-700 sm:text-[15px] sm:leading-[1.85]">
              {E.finding.paras.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </motion.article>

          {/* trust receipts */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5 }}
            className="mb-10 scroll-mt-20 pb-10 sm:mb-14 sm:scroll-mt-24 sm:pb-14"
          >
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-medium tracking-tight text-stone-900 md:text-xl">
                Trust receipts
              </h3>
              <p className="text-[11px] uppercase tracking-[0.1em] text-stone-400">
                Chaos drills · measured, not promised
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {E.receipts.map((r) => (
                <div key={r.name} className="rounded-sm border border-stone-300/80 bg-white/70 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-tight text-stone-400">
                    {r.name}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-stone-700">{r.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* the claim */}
          <motion.article
            id="ent-claim"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5 }}
            className="mb-10 scroll-mt-20 pb-10 sm:mb-14 sm:scroll-mt-24 sm:pb-14"
          >
            <h3 className="font-display text-lg font-medium tracking-tight text-stone-900 md:text-xl">
              {E.claim.title}
            </h3>
            <div className="mt-4 space-y-4 text-[14px] leading-[1.8] text-stone-700 sm:text-[15px] sm:leading-[1.85]">
              {E.claim.paras.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            <div className="mt-6">
              <PriorArtMatrix />
            </div>
          </motion.article>

          {/* limits */}
          <motion.article
            id="ent-limits"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5 }}
            className="mb-10 scroll-mt-20 border-t border-stone-200/80 pt-8"
          >
            <h3 className="font-display text-lg font-medium tracking-tight text-stone-900 md:text-xl">
              {E.limits.title}
            </h3>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14px] leading-[1.8] text-stone-700 sm:text-[15px]">
              {E.limits.items.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-stone-400">{E.footer}</p>
          </motion.article>
    </div>
  );
};
