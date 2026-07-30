import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '../types';
import { isLiveProductUrl } from '../lib/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Borderless mini window — loads the live webapp in-place.
 * Soft paper frame, no thick borders, calm aesthetic.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[150] flex items-end justify-center bg-stone-900/25 p-0 backdrop-blur-[2px] sm:items-center sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[min(92dvh,820px)] w-full max-w-[960px] flex-col overflow-hidden rounded-t-2xl bg-[#FAF8F5] shadow-[0_24px_80px_-32px_rgba(28,25,23,0.35)] ring-0 sm:h-[min(88vh,820px)] sm:rounded-xl"
            style={{ border: 'none' }}
          >
            {/* Thin title bar — no heavy chrome */}
            <div className="flex flex-shrink-0 items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-stone-800">{project.title}</p>
                <p className="truncate text-[11px] text-stone-400">
                  {project.category}
                  {isLiveProductUrl(project.link) ? ' · live' : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-200/60 hover:text-stone-800"
                aria-label="Close"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            {/* App surface — borderless iframe */}
            <div className="min-h-0 flex-1 bg-white">
              {isLiveProductUrl(project.link) && project.link ? (
                <iframe
                  src={project.link}
                  title={project.title}
                  className="h-full w-full border-0 bg-white outline-none"
                  style={{ border: 'none' }}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  allow="clipboard-read; clipboard-write"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <p className="max-w-md text-sm leading-relaxed text-stone-600">
                    {project.description}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-[#0969da] no-underline hover:underline"
                    >
                      Open link
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
