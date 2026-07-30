import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types';
import { isGitHubUrl, isLiveProductUrl } from '../lib/portfolioData';
import '../styles/ribbonField.css';

/**
 * Full-bleed Ribbon Field band + horizontal live project frames.
 * Iframes load real product URLs (animations run). GitHub-only → repo panel.
 */
export const LiveProjectStrip: React.FC<{
  projects: Project[];
  onExpand?: (p: Project) => void;
}> = ({ projects, onExpand }) => {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-strip-card]');
    const w = card ? card.offsetWidth + 24 : 360;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>('[data-strip-card]');
      const w = card ? card.offsetWidth + 24 : 360;
      setActive(Math.round(el.scrollLeft / w));
    };
    // Convert vertical wheel into horizontal strip motion when hovering the band
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <section id="live-work" className="relative w-full" aria-label="Live projects">
      {/* Exact Ribbon Field background */}
      <div className="ribbon-field-gradient absolute inset-0" aria-hidden />

      <div className="relative z-10 py-16 md:py-24">
        <div className="mx-auto mb-10 flex max-w-6xl items-end justify-between px-5 md:px-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
              Work
            </p>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
              Live surfaces
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
              Real product URLs, loaded here. Scroll or use the arrows.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="rounded-full bg-white/15 px-3.5 py-1.5 text-sm text-white backdrop-blur-md transition hover:bg-white/25"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="rounded-full bg-white/15 px-3.5 py-1.5 text-sm text-white backdrop-blur-md transition hover:bg-white/25"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 scroll-smooth md:px-8"
          style={{ scrollbarWidth: 'none' }}
        >
          {projects.map((project, i) => (
            <StripFrame
              key={project.title + (project.link || i)}
              project={project}
              index={i}
              onExpand={onExpand}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StripFrame: React.FC<{
  project: Project;
  index: number;
  onExpand?: (p: Project) => void;
}> = ({ project, index, onExpand }) => {
  const live = isLiveProductUrl(project.link);
  const gh = isGitHubUrl(project.link);
  const [inView, setInView] = useState(index < 2);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { rootMargin: '120px', threshold: 0.05 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <motion.article
      ref={ref}
      data-strip-card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
      className="group flex w-[min(94vw,480px)] flex-shrink-0 snap-center flex-col"
    >
      {/* Borderless live stage — no thick chrome */}
      <div
        className="relative h-[min(62vh,480px)] w-full overflow-hidden rounded-2xl bg-white/95 shadow-[0_28px_90px_-30px_rgba(0,0,0,0.55)] ring-0"
        onClick={() => onExpand?.(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onExpand?.(project);
        }}
      >
        {live && project.link && inView ? (
          <iframe
            src={project.link}
            title={project.title}
            className="absolute inset-0 h-full w-full border-0 bg-white"
            loading={index < 2 ? 'eager' : 'lazy'}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : gh ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#0d1117] px-8 text-center text-white">
            <Github size={36} className="opacity-80" />
            <p className="text-lg font-medium">{project.title}</p>
            <p className="text-sm text-white/55 line-clamp-3">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-stone-900 no-underline"
              onClick={(e) => e.stopPropagation()}
            >
              Open repository
            </a>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center bg-stone-100 text-sm text-stone-500">
            Preview unavailable
          </div>
        )}

        {/* Soft hover affordance — no heavy border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-medium tracking-tight text-white">{project.title}</h3>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-white/55">
              {project.category}
            </p>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white no-underline backdrop-blur transition hover:bg-white/25"
              aria-label={`Open ${project.title}`}
            >
              {gh ? <Github size={14} /> : <ExternalLink size={14} />}
            </a>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/80 line-clamp-2">
          {project.description}
        </p>
        {/* Tech on the project — not a global skill wall */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/12 px-2.5 py-0.5 text-[11px] text-white/85 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
