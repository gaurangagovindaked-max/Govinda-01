import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

/** Distinct close — not a generic footer blob. */
export const GitHubClose: React.FC = () => {
  return (
    <section className="mx-auto max-w-2xl px-5 pb-24 pt-8 md:px-6">
      <motion.a
        href="https://github.com/GC-WORK11"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
        className="group flex items-center gap-5 rounded-2xl bg-[#0d1117] px-6 py-6 text-white no-underline shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
          <Github size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">Source</p>
          <p className="mt-0.5 text-lg font-medium tracking-tight">github.com/GC-WORK11</p>
          <p className="mt-1 text-sm text-white/55">
            Public systems, research code, and product repos.
          </p>
        </div>
        <span className="hidden text-sm text-white/40 transition group-hover:text-white/80 sm:inline">
          Open →
        </span>
      </motion.a>
    </section>
  );
};
