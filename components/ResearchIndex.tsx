import React from 'react';

/**
 * ResearchIndex — the whole research section: 4 headline rows, each with a
 * one-line dek and a read-more link to that work's home. No sidebar, no
 * essays on this page; the depth lives one click away.
 */
const WORKS: { title: string; dek: string; href: string }[] = [
  {
    title: 'Ent — pooled inference',
    dek: 'Untrusted laptops, one temporary encrypted computer.',
    href: 'https://ent-01.vercel.app',
  },
  {
    title: 'Working-Set Routing',
    dek: 'Keeping the experts that matter on a memory-starved GPU.',
    href: 'https://active-parameter-runtime.govindach-iitp.chatgpt.site/',
  },
  {
    title: 'The evidence room',
    dek: 'Every bar of the study, raw — nothing smoothed.',
    href: 'https://active-parameter-runtime.govindach-iitp.chatgpt.site/',
  },
  {
    title: 'AETHER',
    dek: 'From ordinary video to simulation-ready models.',
    href: 'https://github.com/GC-WORK11/aether/blob/main/ARCHITECTURE.md',
  },
];

export const ResearchIndex: React.FC = () => {
  return (
    <section
      id="research"
      aria-label="Research"
      className="relative border-y border-stone-200/70 bg-[#FAF8F5]"
    >
      <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-5 sm:py-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          Research
        </p>
        <div className="mt-2">
          {WORKS.map((w) => (
            <div
              key={w.title}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-stone-200/70 py-4"
            >
              <div className="min-w-0">
                <h3 className="font-display text-[17px] font-medium tracking-tight text-stone-900 sm:text-lg">
                  {w.title}
                </h3>
                <p className="mt-0.5 text-[13px] text-stone-500">{w.dek}</p>
              </div>
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[13px] font-medium text-[#0969da] no-underline hover:underline"
              >
                Read more ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
