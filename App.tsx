import React, { useState, Suspense, lazy } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { RESUME } from './constants';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { Trajectory } from './components/Trajectory';
import { TechStack } from './components/TechStack';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types';

import LanyardBadge from './components/LanyardBadge';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <div className="container mx-auto max-w-3xl px-4 py-8 overflow-x-hidden text-zinc-800">
        <Hero />


        <section className="mt-12 mb-16">
          <p className="text-base text-zinc-700 leading-relaxed">
            {RESUME.summary}
          </p>
        </section>

        {/* Journey / Timeline Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Experience & Education</h2>
          <Trajectory education={RESUME.education} experience={RESUME.experience} />
        </section>

        {/* Real SVG Technology Showcase Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Skills & Tools</h2>
          <TechStack />
        </section>

        {/* From Idea to MVP to Pitch */}
        <section id="mvp-projects" className="mb-16">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Idea to MVP</h2>
          <div className="flex flex-col gap-4">
            {RESUME.mvpProjects.map((project, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedProject(project as any)}
                className="group cursor-pointer"
              >
                <div className="flex flex-col mb-2">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-base font-semibold text-[#0969da] group-hover:underline">
                        {project.title}
                    </h3>
                    <span className="text-xs text-zinc-500 font-mono tracking-tight">{project.category}</span>
                  </div>
                  <p className="text-sm text-zinc-700 mt-1">
                      {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engineered Reality (Projects) */}
        <section id="projects" className="mb-16">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Agentic Architecture & Tooling</h2>
          <div className="flex flex-col gap-4">
            {RESUME.projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                {...project} 
                index={index} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </section>

        {/* Research */}
        <section id="research" className="mb-16">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Technical Artifacts</h2>
          <div className="flex flex-col gap-6">
            {RESUME.research.map((item, idx) => (
              <div key={idx} className="relative pl-4 border-l-2 border-zinc-200 hover:border-[#0969da] transition-colors group">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#0969da] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs text-zinc-500 font-mono mb-2">
                    {item.subtitle}
                  </div>
                  <ul className="text-sm text-zinc-600 space-y-1">
                    {item.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start">
                        <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-zinc-400 block flex-shrink-0" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="mt-24 pt-8 border-t border-zinc-200 text-sm flex flex-col md:flex-row justify-between text-zinc-500">
          <div>
            <a href={`mailto:${RESUME.header.email}`} className="hover:text-zinc-800">
              {RESUME.header.email}
            </a>
            <span className="mx-2">•</span>
            <span>{RESUME.header.location}</span>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="https://github.com/GC-WORK11" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800">GitHub</a>
            <a href="https://in.linkedin.com/in/govinda-flow" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800">LinkedIn</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
