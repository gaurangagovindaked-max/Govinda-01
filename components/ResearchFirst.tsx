import React from 'react';
import { motion } from 'framer-motion';
import { PipelineDiagram } from './PipelineDiagram';
import { ResearchCharts } from './ResearchCharts';
import { RESUME } from '../constants';

/**
 * Research section — papers after Ent.
 *
 * The shared sticky sidebar lives in EntSection and tracks BOTH the Ent
 * anchors and the research anchors below (research-overview … aether), so
 * this component renders the content column only, matching the layout the
 * sidebar reserves (max-w-5xl, same paddings).
 */
export const ResearchFirst: React.FC = () => {
  const aether = RESUME.editorialNotes.find((n) => n.id === 'aether-pipeline');

  return (
    <section
      id="research"
      className="relative border-y border-stone-200/70 bg-[#FAF8F5]"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="min-w-0 w-full flex-1 px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-16 lg:pr-12 md:pl-[11.5rem] lg:pl-[12.5rem]">
          {/* spacer keeps the column aligned with the Ent column when the
              sidebar is hidden on mobile — the padding mirrors the sidebar
              width on md+ only */}

          <motion.header
            id="research-overview"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-10 scroll-mt-20 border-b border-stone-300/70 pb-8 sm:mb-14 sm:scroll-mt-24 sm:pb-10"
          >
            <p className="font-mono text-[11px] text-stone-400">02</p>
            <h2 className="mt-3 font-display text-[1.75rem] font-medium tracking-tight text-stone-900 sm:text-3xl md:text-4xl">
              Playing around compute
            </h2>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-stone-600 sm:mt-4 sm:text-[15px]">
              Paper notes from free dual-T4 labs and architecture I can still explain.
            </p>
          </motion.header>

          <motion.article
            id="research-moe"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.45 }}
            className="mb-10 scroll-mt-20 border-b border-stone-200/80 pb-10 sm:mb-14 sm:scroll-mt-24 sm:pb-14"
          >
            {/* Resume title line: name left · meta right */}
            <div className="flex flex-col gap-y-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
              <h3 className="font-display text-lg font-medium tracking-tight text-stone-900 sm:text-xl md:text-2xl">
                Working-Set Routing for Memory-Constrained MoE Inference
              </h3>
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-stone-400 sm:shrink-0 sm:text-[11px]">
                Working paper · 2× Tesla T4 · 2026
              </p>
            </div>

            <div className="mt-6 space-y-4 text-[14px] leading-[1.8] text-stone-700 sm:mt-8 sm:space-y-5 sm:text-[15px] sm:leading-[1.85]">
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

          <div id="research-charts" className="mb-14 scroll-mt-24 border-b border-stone-200/80 pb-14">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-medium text-stone-900">Figures</h3>
              <p className="text-[11px] uppercase tracking-[0.1em] text-stone-400">
                Measured · dual-T4
              </p>
            </div>
            <ResearchCharts />
          </div>

          {aether && (
            <motion.article
              id="research-aether"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.45 }}
              className="scroll-mt-24"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-medium tracking-tight text-stone-900 md:text-2xl">
                  AETHER
                </h3>
                <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.1em] text-stone-400">
                  Physics-from-video · architecture
                </p>
              </div>
              <p className="mt-2 text-sm text-stone-500">{aether.dek}</p>
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
      </div>
    </section>
  );
};
