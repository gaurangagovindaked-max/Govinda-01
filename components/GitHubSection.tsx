import React from 'react';
import type { Project } from '../types';
import { techIconSrc } from '../lib/techIcons';

/**
 * GitHub index — cleaner on mobile: stacked title/category, bigger taps, less clutter.
 */
export const GitHubSection: React.FC<{ repos: Project[] }> = ({ repos }) => {
  return (
    <section
      id="github"
      className="w-full max-w-[100vw] overflow-x-hidden border-t border-stone-200/70 bg-[#FAF8F5] px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-2xl">
        <header className="border-b border-stone-300/70 pb-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400">
            GitHub
          </p>
          <h2 className="mt-2 text-[1.4rem] font-medium tracking-tight text-stone-900 sm:text-[1.65rem]">
            Repositories
          </h2>
          <p className="mt-2 text-[13px] text-stone-500 sm:text-sm">
            <a
              href="https://github.com/GC-WORK11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0969da] no-underline hover:underline"
            >
              @GC-WORK11
            </a>
          </p>
        </header>

        <ul className="m-0 mt-6 list-none space-y-0 p-0 sm:mt-8">
          {repos.map((r) => (
            <li key={r.title} className="border-b border-stone-200/80 last:border-b-0">
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-5 no-underline sm:py-6"
              >
                {/* Stack on mobile so title and category never bend side-by-side */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-[15px] font-medium text-stone-900 group-hover:text-stone-600 sm:text-base">
                    {r.title}
                  </h3>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-stone-400 sm:text-[11px]">
                    {r.category}
                  </p>
                </div>
                <p className="mt-2.5 text-[13px] leading-[1.7] text-stone-600 sm:mt-2 sm:text-sm sm:leading-relaxed">
                  {r.description}
                </p>
                {r.tags?.length > 0 && (
                  <p className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-stone-500 sm:mt-2">
                    {r.tags.slice(0, 5).map((t) => {
                      const src = techIconSrc(t);
                      return (
                        <span key={t} className="inline-flex items-center gap-1">
                          {src && (
                            <img
                              src={src}
                              alt=""
                              className="h-3 w-3 object-contain opacity-80"
                            />
                          )}
                          {t}
                        </span>
                      );
                    })}
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
