import React, { useMemo, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { motion } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { RESUME } from './constants';
import { Hero } from './components/Hero';
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

      {/* overflow-visible so the lanyard card is not clipped / no touch scrollbar */}
      <div className="container mx-auto max-w-3xl overflow-visible px-4 pt-8 md:px-6">
        <Hero />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 mx-auto mb-8 max-w-lg text-center text-[15px] font-semibold leading-relaxed text-stone-800"
        >
          {RESUME.worksLead}
        </motion.p>
      </div>

      <ResearchFirst />
      <ProductShowcase products={products} onExpand={setSelectedProject} />
      <GitHubSection repos={githubRepos} />
      <PapersEnd papers={RESUME.research} />

      <footer className="bg-[#F5F2EC] px-4 py-8 text-center text-[13px] text-stone-500 sm:px-5 sm:py-10 sm:text-sm">
        <a
          href={`mailto:${RESUME.header.email}`}
          className="break-all text-stone-600 no-underline hover:text-stone-900"
        >
          {RESUME.header.email}
        </a>
        <span className="mx-2 text-stone-300">·</span>
        <span>{RESUME.header.location}</span>
      </footer>
    </div>
  );
}

export default App;
