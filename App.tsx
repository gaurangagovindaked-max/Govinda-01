import React, { useMemo, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { motion } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { RESUME } from './constants';
import { Hero } from './components/Hero';
import { EntSection } from './components/EntSection';
import { ProjectModal } from './components/ProjectModal';
import { ResearchFirst } from './components/ResearchFirst';
import { ProductShowcase } from './components/ProductShowcase';
import { GitHubSection } from './components/GitHubSection';
import { PapersEnd } from './components/PapersEnd';
import { isGitHubUrl, isLiveProductUrl } from './lib/portfolioData';
import { Project } from './types';

/** Fixed product order for showcase */
const PRODUCT_TITLES = [
  'Delegators Client',
  'CEO Hunt',
  'Delegators Workbench',
  'Remote-os',
  'Doorway IDE',
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const products = useMemo(() => {
    const pool = [...RESUME.mvpProjects, ...RESUME.projects].filter((p) =>
      isLiveProductUrl(p.link)
    );
    const byTitle = new Map(pool.map((p) => [p.title, p]));
    const ordered: Project[] = [];
    for (const t of PRODUCT_TITLES) {
      const p = byTitle.get(t);
      if (p) {
        ordered.push(p);
        byTitle.delete(t);
      }
    }
    return ordered;
  }, []);

  const githubRepos = useMemo(() => {
    return RESUME.projects.filter((p) => isGitHubUrl(p.link) && !isLiveProductUrl(p.link));
  }, []);

  return (
    <div className="page-paper min-h-screen font-sans text-stone-800">
      <Analytics />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* overflow-visible: do not clip the lanyard card */}
      <div className="mx-auto w-full max-w-3xl overflow-visible px-3 pt-4 sm:px-4 sm:pt-6 md:px-6 md:pt-8">
        <Hero />
        <motion.blockquote
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-0 mx-auto mb-10 max-w-md border-0 px-2 text-center sm:mb-12 sm:max-w-lg sm:px-4"
        >
          <p className="text-[14px] font-bold leading-[1.65] text-stone-900 sm:text-[15px] sm:leading-relaxed">
            &ldquo;{RESUME.worksLead}&rdquo;
          </p>
        </motion.blockquote>
      </div>

      <EntSection />
      <ResearchFirst />
      <ProductShowcase products={products} onExpand={setSelectedProject} />
      <GitHubSection repos={githubRepos} />
      <PapersEnd papers={RESUME.research} />

      <footer className="flex flex-col items-center gap-1 bg-[#F5F2EC] px-4 py-8 text-center text-[13px] text-stone-500 sm:flex-row sm:justify-center sm:gap-2 sm:px-5 sm:py-10 sm:text-sm">
        <a
          href={`mailto:${RESUME.header.email}`}
          className="break-all text-stone-600 no-underline hover:text-stone-900"
        >
          {RESUME.header.email}
        </a>
        <span className="hidden text-stone-300 sm:inline" aria-hidden>
          ·
        </span>
        <span>{RESUME.header.location}</span>
      </footer>
    </div>
  );
}

export default App;
