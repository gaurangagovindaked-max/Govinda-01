import React, { useState, Suspense, lazy } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { RESUME } from './constants';
import { ProjectCard } from './components/ProjectCard';
import { Trajectory } from './components/Trajectory';
import { TechStack } from './components/TechStack';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types';

const LanyardBadge = lazy(() => import('./components/LanyardBadge'));

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
        {/* 3D Interactive ID Badge (Hanging Free) */}
        <section className="mb-12 -mt-8">
          <Suspense fallback={null}>
            <LanyardBadge />
          </Suspense>
        </section>

        {/* Minimal Intro */}
        <section className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">{RESUME.header.name}</h1>
          <p className="text-zinc-600 mb-4">{RESUME.vision.tagline}</p>
          <div className="flex justify-center gap-4 text-sm">
            <a href="https://github.com/GC-WORK11" target="_blank" rel="noopener noreferrer" className="text-[#0969da] hover:underline">GitHub</a>
            <span className="text-zinc-300">|</span>
            <a href="https://in.linkedin.com/in/govinda-flow" target="_blank" rel="noopener noreferrer" className="text-[#0969da] hover:underline">LinkedIn</a>
            <span className="text-zinc-300">|</span>
            <a href={`mailto:${RESUME.header.email}`} className="text-[#0969da] hover:underline">Email</a>
          </div>
        </section>

        <section className="mb-16">
          <p className="text-base text-zinc-700 leading-relaxed">
            {RESUME.summary}
          </p>
        </section>

        {/* Journey / Timeline Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Experience & Education</h2>
          <Trajectory education={RESUME.education} experience={RESUME.experience} />
        </section>

        {/* Published Work / Book */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Published Work</h2>
          <div className="mb-4">
            <a 
              href="/Applied-AI-Students.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-base font-semibold text-[#0969da] hover:underline inline-flex items-center gap-1"
            >
              Applied AI for Students (PDF)
            </a>
            <p className="text-sm text-zinc-700 mt-1">
              A comprehensive guide to understanding and leveraging AI in an educational and project-building context. Designed to help students go from zero to building agentic pipelines.
            </p>
          </div>
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
              <ProjectCard 
                key={index} 
                {...project} 
                index={index} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </section>

        {/* Engineered Reality (Projects) */}
        <section id="projects" className="mb-16">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Research Engineering</h2>
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
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Research / Papers</h2>
          <div className="flex flex-col gap-6">
            {RESUME.research.map((item, idx) => (
              <div key={idx} className="flex flex-col mb-2">
                <a href={item.link} className="font-semibold text-[#0969da] hover:underline" target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                <span className="text-sm text-zinc-500">{item.subtitle}</span>
                <ul className="list-disc list-inside mt-2 text-sm text-zinc-700">
                  {item.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
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
