
import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { RESUME } from './constants';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { Trajectory } from './components/Trajectory';
import { TechStack } from './components/TechStack';
import { Theme } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>('dark'); // Set default to dark for premium impact
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Reset classes
    document.documentElement.classList.remove('dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const isDark = theme === 'dark';

  if (isLoading) {
    return <LoadingScreen theme={theme} onComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-[#111] text-zinc-200' : 'bg-white text-zinc-900'} font-sans`}>
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Hero theme={theme} />

        <section className="mt-12">
          <p className="text-base text-zinc-600 dark:text-zinc-400">
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
          <TechStack theme={theme} />
        </section>

        {/* Engineered Reality (Projects) */}
        <section id="projects" className="mt-16">
          <h2 className="text-2xl font-bold mb-6 lowercase tracking-tight">projects</h2>
          <div className="flex flex-col gap-8">
            {RESUME.projects.map((project, index) => (
              <ProjectCard key={index} {...project} theme={theme} />
            ))}
          </div>
        </section>


        {/* Research */}
        <section id="research" className="mt-16">
          <h2 className="text-2xl font-bold mb-6 lowercase tracking-tight">research / papers</h2>
          <div className="flex flex-col gap-6">
            {RESUME.research.map((item, idx) => (
              <div key={idx} className="flex flex-col mb-2">
                <a href={item.link} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                <span className="text-sm text-zinc-500">{item.subtitle}</span>
                <ul className="list-disc list-inside mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {item.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="mt-24 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm flex flex-col md:flex-row justify-between text-zinc-500">
          <div>
            <a href={`mailto:${RESUME.header.email}`} className="hover:text-zinc-800 dark:hover:text-zinc-200">
              {RESUME.header.email}
            </a>
            <span className="mx-2">•</span>
            <span>{RESUME.header.location}</span>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="https://github.com/GC-WORK11" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800 dark:hover:text-zinc-200">GitHub</a>
            <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200">Twitter</a>
            <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200">LinkedIn</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
