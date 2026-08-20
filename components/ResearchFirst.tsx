import React from 'react';
import { motion } from 'framer-motion';
import { PipelineDiagram } from './PipelineDiagram';
import { ResearchCharts } from './ResearchCharts';
import { RESUME } from '../constants';

/**
 * Papers column — inside the shared ResearchSurface rail (which provides the
 * sticky sidebar and scroll tracking for the whole research surface).
 *
 * Three works, three distinct identities — not one uniform paper strip:
 *   · Working-Set Routing  — the measured lab study (numbers first)
 *   · The evidence room    — the raw T4 figures for that study
 *   · AETHER               — the blue-sky architecture essay (ideas first)
 * No numbering; each gets its own header voice, meta line, and cadence.
 */
export const ResearchFirst: React.FC = () => {
  const aether = RESUME.editorialNotes.find((n) => n.id === 'aether-pipeline');

  return (
    <div className="px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-16 lg:pr-12">
      {/* ── Paper I — Working-Set Routing: the measured study ─────────── */}
      <motion.article
        id="research-wsr"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.45 }}
        className="scroll-mt-24"
      >
        <div className="flex flex-col gap-y-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
          <h3 className="font-display text-lg font-medium tracking-tight text-stone-900 sm:text-xl md:text-2xl">
            Working-Set Routing
          </h3>
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-stone-400 sm:shrink-0 sm:text-[11px]">
            Lab study · 2× Tesla T4 · 2026
          </p>
        </div>
        <p className="mt-2 text-[13.5px] italic leading-relaxed text-stone-500">
          Can a memory-constrained GPU keep the experts that matter — and quietly
          put the rest in cold storage?
        </p>

        <div className="mt-6 space-y-4 text-[14px] leading-[1.8] text-stone-700 sm:text-[15px] sm:leading-[1.85]">
          <p>
            I tested expert retention, 64-to-32 fusion, router recovery, and exact
            paging on a measured 6.78B-parameter OLMoE parent. My strongest static run
            reduced allocated VRAM by 53.7%, reached 1.08× suite throughput, and
            retained 80.7% of an exploratory within-run quality score.
          </p>
          <p>
            I learned that removing weights is not the same as preserving their
            computation: static removal damaged behavior, while exact paging kept the
            output exact but became transfer-bound. This now guides my
            confidence-aware ActiveSet runtime design.
          </p>
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
          <a
            href="https://active-parameter-runtime.govindach-iitp.chatgpt.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-stone-900 px-3.5 py-1.5 text-[13px] font-medium text-[#FAF8F5] no-underline transition hover:bg-stone-700"
          >
            Site
          </a>
          <a
            href="https://active-parameter-runtime.govindach-iitp.chatgpt.site/working-set-routing-paper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-stone-900 px-3.5 py-1.5 text-[13px] font-medium text-[#FAF8F5] no-underline transition hover:bg-stone-700"
          >
            PDF
          </a>
        </p>

        <PipelineDiagram
          steps={['Suite', 'Retain', 'Fuse', 'Recover', 'Seal']}
          caption="Protocol on dual-T4."
        />
      </motion.article>

      {/* ── Evidence room — the T4 figures ─────────────────────────────── */}
      <div
        id="research-figures"
        className="mt-14 scroll-mt-24 border-t border-stone-200/80 pt-12"
      >
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-medium tracking-tight text-stone-900 md:text-2xl">
            The evidence room
          </h3>
          <p className="text-[11px] uppercase tracking-[0.1em] text-stone-400">
            Measured · dual-T4
          </p>
        </div>
        <p className="mb-6 max-w-xl text-[14px] leading-[1.8] text-stone-600 sm:text-[15px]">
          Every bar in the study above, in the raw: VRAM, quality, and throughput
          across the runs — nothing smoothed, nothing selected after the fact.
        </p>
        <ResearchCharts />
      </div>

      {/* ── Paper II — AETHER: the blue-sky architecture essay ─────────── */}
      {aether && (
        <motion.article
          id="research-aether"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.45 }}
          className="mt-14 scroll-mt-24 border-t border-stone-200/80 pt-12"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-xl font-medium tracking-tight text-stone-900 md:text-2xl">
              AETHER
            </h3>
            <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.1em] text-stone-400">
              Architecture essay · physics from video
            </p>
          </div>
          <p className="mt-2 text-[13.5px] italic leading-relaxed text-stone-500">
            {aether.dek}
          </p>
          <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-stone-700">
            <p>
              I explored how ordinary video could become a simulation-ready model
              through object tracking, kinematic discovery, constraint inference, and
              marker-free physics extraction.
            </p>
            {aether.body.map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </div>
          {aether.pipeline && (
            <PipelineDiagram steps={aether.pipeline} caption="AETHER steps." />
          )}
          {aether.link && (
            <a
              href={aether.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-[13px] text-[#0969da] no-underline hover:underline"
            >
              Architecture notes
            </a>
          )}
        </motion.article>
      )}
    </div>
  );
};
