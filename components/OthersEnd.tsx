import React, { useState } from 'react';
import { RESUME } from '../constants';

/**
 * OthersEnd — the page end. Education stays visible; experience and
 * publications tuck behind an "and others" fold. Closes with one
 * human line, then the page is done.
 */
export const OthersEnd: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { experience, education, publications } = RESUME;
  return (
    <section
      id="others"
      className="w-full max-w-[100vw] overflow-x-hidden border-t border-stone-200/60 bg-[#F5F2EC] px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-20"
    >
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          Others
        </p>
        <h2 className="mt-2 font-display text-xl font-medium tracking-tight text-stone-900 sm:text-2xl">
          Education
        </h2>

        <div className="mt-6 border-t border-stone-200/80 pt-4 sm:mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-sm font-medium text-stone-900">
              {education.institute}
            </h3>
            <p className="shrink-0 font-mono text-[11px] text-stone-400">
              {education.batch}
            </p>
          </div>
          <p className="mt-1 text-[13px] text-stone-600">{education.degree}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-stone-500">
            {education.details}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-5 text-[13px] font-medium text-[#0969da] hover:underline"
        >
          {open ? 'show less ↑' : 'and others →'}
        </button>

        {open && (
          <div>
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-stone-400">
                Experience
              </p>
              {experience.map((e) => (
                <div
                  key={e.role}
                  className="mt-4 border-t border-stone-200/80 pt-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-sm font-medium text-stone-900">
                      {e.role} · {e.company}
                    </h3>
                    <p className="shrink-0 font-mono text-[11px] text-stone-400">
                      {e.duration}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600 sm:text-sm">
                    {e.description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {e.points.map((pt) => (
                      <li
                        key={pt}
                        className="text-[13px] leading-relaxed text-stone-600"
                      >
                        — {pt}
                      </li>
                    ))}
                  </ul>
                  {e.attachment && (
                    <a
                      href={e.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-[13px] text-[#0969da] no-underline hover:underline"
                    >
                      {e.attachmentLabel ?? 'Attachment'}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-stone-400">
                Publications
              </p>
              {publications.map((p) => (
                <div
                  key={p.title}
                  className="mt-4 border-t border-stone-200/80 pt-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-stone-900 no-underline hover:underline"
                    >
                      {p.title}
                    </a>
                    <p className="shrink-0 font-mono text-[11px] text-stone-400">
                      {p.year}
                    </p>
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-stone-400">
                    {p.venue}
                  </p>
                  {p.summary && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600 sm:text-sm">
                      {p.summary}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mx-auto mt-12 max-w-md text-center text-[13px] italic leading-relaxed text-stone-500 sm:text-sm">
          At seventeen I started wandering India — fifteen cities, mountain
          trails, and long conversations with monks. I&rsquo;m just a guy who
          likes wisdom and tech.
        </p>
      </div>
    </section>
  );
};
