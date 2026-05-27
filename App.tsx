import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { RESUME } from './constants';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { Trajectory } from './components/Trajectory';
import { TechStack } from './components/TechStack';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <div className="container mx-auto max-w-4xl px-4 py-8">
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

        {/* Real SVG Technology Showcase Section */}
        <section className="mt-16">
          <TechStack />
        </section>

        {/* Engineered Reality (Projects) */}
        <section id="projects" className="mt-16">
          <h2 className="text-2xl font-bold mb-6 lowercase tracking-tight">projects</h2>
          <div className="flex flex-col gap-8">
            {RESUME.projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
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
