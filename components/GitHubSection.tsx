import React from 'react';
import type { Project } from '../types';
import { techIconSrc } from '../lib/techIcons';

/**
 * Spare GitHub index — same quiet register as research.
 * No dark theme, no “code that lives”, no timeline gimmicks.
 */
export const GitHubSection: React.FC<{ repos: Project[] }> = ({ repos }) => {
  return (
    <section
      id="github"
      className="w-full max-w-[100vw] overflow-x-hidden border-t border-stone-200/70 bg-[#FAF8F5] px-3 py-12 sm:px-5 sm:py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400">
          GitHub
        </p>
        <h2 className="mt-2 text-[1.45rem] font-medium tracking-tight text-stone-900 sm:text-[1.65rem]">
          Repositories
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          <a
            href="https://github.com/GC-WORK11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-600 no-underline hover:text-stone-900"
          >
            GC-WORK11
          </a>
        </p>

        <div className="mt-12 space-y-10">
          {repos.map((r) => (
            <article key={r.title}>
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block no-underline"
              >
                <h3 className="text-[15px] font-medium text-stone-900 group-hover:text-stone-600">
                  {r.title}
                  <span className="ml-2 text-[11px] font-normal tracking-wide text-stone-400">
                    {r.category}
                  </span>
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{r.description}</p>
                <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-stone-500">
                  {r.tags.slice(0, 5).map((t) => {
                    const src = techIconSrc(t);
                    return (
                      <span key={t} className="inline-flex items-center gap-1">
                        {src && (
                          <img src={src} alt="" className="h-3 w-3 object-contain opacity-80" />
                        )}
                        {t}
                      </span>
                    );
                  })}
                </p>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
