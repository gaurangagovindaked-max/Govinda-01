import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { RESUME } from './constants';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { Trajectory } from './components/Trajectory';
import { TechStack } from './components/TechStack';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types';

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

      <div className="container mx-auto max-w-4xl px-4 py-8 overflow-x-hidden">
        <Hero />

        <section className="mt-12">
          <p className="text-base text-zinc-600">
            {RESUME.summary}
          </p>
        </section>

        {/* Journey / Timeline Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 lowercase tracking-tight">journey</h2>
          <Trajectory education={RESUME.education} experience={RESUME.experience} />
        </section>

        {/* Published Work / Book */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 lowercase tracking-tight">published work</h2>
          <div className="flex flex-col border border-zinc-200 bg-zinc-50 p-6 rounded-xl hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Applied AI for Students</h3>
            <p className="text-sm text-zinc-600 mb-6">
              A comprehensive guide to understanding and leveraging AI in an educational and project-building context. Designed to help students go from zero to building agentic pipelines.
            </p>
            <a 
              href="/Applied-AI-Students.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-fit flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0969da] rounded-lg hover:bg-[#085ac0] shadow-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Book (PDF)
            </a>
          </div>
        </section>

        {/* Real SVG Technology Showcase Section */}
        <section className="mt-16">
          <TechStack />
        </section>

        {/* From Idea to MVP to Pitch */}
        <section id="mvp-projects" className="mt-16">
          <h2 className="text-2xl font-bold mb-6 lowercase tracking-tight">from idea to mvp to pitch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        <section id="projects" className="mt-16">
          <h2 className="text-2xl font-bold mb-6 lowercase tracking-tight">research engineering</h2>
          <div className="flex flex-col gap-8">
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
        <section id="research" className="mt-16">
          <h2 className="text-2xl font-bold mb-6 lowercase tracking-tight">research / papers</h2>
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
