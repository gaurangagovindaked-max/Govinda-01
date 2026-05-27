
import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { RESUME } from './constants';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { SkillTicker } from './components/SkillTicker';
import { ProjectCard } from './components/ProjectCard';
import { ResearchCard } from './components/ResearchCard';
import { Trajectory } from './components/Trajectory';
import { Reveal } from './components/Reveal';
import { ChatBot } from './components/ChatBot';
import { MissionStatement } from './components/MissionStatement';
import { Vision } from './components/Vision';
import { Theme } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'brutal';
      if (prev === 'brutal') return 'dark-brutal';
      return 'light';
    });
  };

  useEffect(() => {
    // Reset classes
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('brutal-mode');
    document.body.classList.remove('dark-brutal-mode');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'brutal') {
      document.body.classList.add('brutal-mode');
    } else if (theme === 'dark-brutal') {
      document.body.classList.add('dark-brutal-mode');
    }
  }, [theme]);

  // Loading state is now handled by the LoadingScreen component's animation cycle
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const isDark = theme === 'dark';
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';
  const isAnyBrutal = isLightBrutal || isDarkBrutal;

  if (isLoading) {
    return <LoadingScreen theme={theme} onComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a] text-white' :
      isLightBrutal ? 'bg-white text-black' :
        isDarkBrutal ? 'bg-black text-white' :
          'bg-white text-neutral-900'
      }`}>
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <Hero theme={theme} />

      <SkillTicker skills={RESUME.skills} theme={theme} />

      {/* Mission Statement */}
      <MissionStatement theme={theme} summary={RESUME.summary} />

      {/* Engineered Reality (Projects) */}
      <Section id="projects" theme={theme} className="py-32">
        <div className="container mx-auto max-w-[1600px]">
          <div className={`flex flex-col md:flex-row items-start md:items-end justify-between mb-24 pb-8 gap-8 ${isLightBrutal ? 'border-b-4 border-black' :
            isDarkBrutal ? 'border-b-4 border-white' :
              'border-b border-neutral-200 dark:border-neutral-800'
            }`}>
            <div>
              <span className={`block text-xs font-mono uppercase tracking-widest mb-4 ${isDark ? 'text-indigo-400' :
                isLightBrutal ? 'bg-cherry text-white px-2 py-1 inline-block font-bold' :
                  isDarkBrutal ? 'bg-acid text-black px-2 py-1 inline-block font-bold' :
                    'text-indigo-600'
                }`}>
                Selected Works
              </span>
              <h2 className={`font-display text-5xl md:text-7xl font-bold tracking-tighter ${isDark || isDarkBrutal ? 'text-white' : 'text-neutral-900'
                }`}>
                {isAnyBrutal ? 'PUBLIC_PROOF' : 'Shipped Proof.'}
              </h2>
            </div>
            <a href="https://github.com/GC-WORK11" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-indigo-500 transition-colors ${isDark ? 'text-white' :
              isLightBrutal ? 'text-black hover:bg-black hover:text-white px-6 py-3 border-4 border-black shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all' :
                isDarkBrutal ? 'text-white hover:bg-white hover:text-black px-6 py-3 border-4 border-white shadow-brutal-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all' :
                  'text-black'
              }`}>
              {!isAnyBrutal && <div className={`w-12 h-[1px] ${isDark ? 'bg-white' : 'bg-black'}`} />}
              GitHub Archive
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RESUME.projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                theme={theme}
                index={index}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Trajectory (Experience & Education) */}
      <section id="experience" className={`py-32 px-6 ${isDark ? 'bg-[#050505]' :
        isLightBrutal ? 'bg-white brutal-grid border-y-4 border-black' :
          isDarkBrutal ? 'bg-black dark-brutal-grid border-y-4 border-white' :
            'bg-white'
        }`}>
        <div className="container mx-auto max-w-[1600px]">
          <div className="mb-24">
            <h2 className={`font-display text-6xl md:text-8xl font-bold tracking-tighter mb-6 ${isDark || isDarkBrutal ? 'text-white' : isLightBrutal ? 'text-black' : 'text-neutral-900'
              }`}>
              {isAnyBrutal ? 'BUILD_HISTORY' : 'Builder Arc.'}
            </h2>
            <p className={`text-lg md:text-xl max-w-xl ${isDark ? 'text-neutral-500' :
              isLightBrutal ? 'text-black font-mono border-l-4 border-cherry pl-4' :
                isDarkBrutal ? 'text-white font-mono border-l-4 border-acid pl-4' :
                  'text-neutral-500'
              }`}>
              Not a conventional resume. A compact map of education, teaching, research obsession, and shipped founder-grade systems.
            </p>
          </div>

          <Trajectory
            theme={theme}
            education={RESUME.education}
            experience={RESUME.experience}
          />
        </div>
      </section>

      {/* Research */}
      <section id="research" className={`py-32 px-6 ${isDark ? 'bg-neutral-900' :
        isLightBrutal ? 'bg-white' :
          isDarkBrutal ? 'bg-black' :
            'bg-neutral-50'
        }`}>
        <div className="container mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <h2 className={`font-display text-5xl md:text-6xl font-bold tracking-tighter ${isDark || isDarkBrutal ? 'text-white' : 'text-neutral-900'
              }`}>
              Papers, PRDs & Systems Thinking
            </h2>
            <span className={`text-sm font-mono uppercase tracking-widest ${isDark ? 'text-neutral-500' :
              isLightBrutal ? 'text-white bg-black px-2 py-1 font-bold' :
                isDarkBrutal ? 'text-black bg-acid px-2 py-1 font-bold' :
                  'text-neutral-500'
              }`}>
              Research notes, architecture docs, and technical theses
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESUME.research.map((item, idx) => (
              <ResearchCard
                key={idx}
                {...item}
                theme={theme}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision / Future */}
      <Vision theme={theme} />

      {/* Footer */}
      <footer id="contact" className={`py-24 px-6 ${isDark ? 'bg-[#050505] border-t border-neutral-900' :
        isLightBrutal ? 'bg-black text-white border-t-8 border-cherry' :
          isDarkBrutal ? 'bg-black text-white border-t-8 border-acid' :
            'bg-white border-t border-neutral-100'
        }`}>
        <div className="container mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h2 className={`font-display text-5xl font-bold tracking-tight mb-8 ${isDark || isAnyBrutal ? 'text-white' : 'text-neutral-900'
                }`}>
                Start a Conversation.
              </h2>
              <a href={`mailto:${RESUME.header.email}`} className={`text-2xl md:text-4xl font-light hover:text-indigo-500 transition-colors underline decoration-1 underline-offset-8 ${isDark ? 'text-neutral-300' :
                isLightBrutal ? 'text-cherry decoration-white font-mono hover:bg-white hover:text-black hover:decoration-transparent p-2 transition-all' :
                  isDarkBrutal ? 'text-acid decoration-white font-mono hover:bg-white hover:text-black hover:decoration-transparent p-2 transition-all' :
                    'text-neutral-700'
                }`}>
                {RESUME.header.email}
              </a>
              <p className={`mt-8 text-lg ${isDark ? 'text-neutral-500' : isAnyBrutal ? 'text-neutral-400 font-mono' : 'text-neutral-500'
                }`}>
                {RESUME.header.location}
              </p>
            </div>

            <div className="flex flex-col justify-between items-start md:items-end">
              <div className="flex flex-wrap gap-8 md:gap-12 mb-12">
                {['LinkedIn', 'Twitter', 'GitHub'].map((social) => {
                  const getLink = (name: string) => {
                    switch (name) {
                      case 'LinkedIn': return import.meta.env.VITE_LINKEDIN_URL;
                      case 'Twitter': return import.meta.env.VITE_TWITTER_URL;
                      case 'GitHub': return import.meta.env.VITE_GITHUB_URL;
                      default: return '';
                    }
                  };

                  const link = getLink(social);

                  return (
                    <a
                      key={social}
                      href={link || '#'}
                      onClick={(e) => {
                        if (!link) {
                          e.preventDefault();
                          const event = new CustomEvent('trigger-chat', {
                            detail: { message: `Well, contact Govinda on his email: ${RESUME.header.email}` }
                          });
                          window.dispatchEvent(event);
                        }
                      }}
                      target={link ? "_blank" : "_self"}
                      rel={link ? "noopener noreferrer" : ""}
                      className={`text-base font-bold uppercase tracking-widest hover:text-indigo-500 transition-colors ${isDark ? 'text-white' : isLightBrutal ? 'text-white hover:text-cherry' : isDarkBrutal ? 'text-white hover:text-acid' : 'text-black'
                        }`}
                    >
                      {social}
                    </a>
                  );
                })}
              </div>
              <p className={`text-xs text-neutral-500 uppercase tracking-widest`}>
                © 2025 Govinda Chauhan. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ChatBot theme={theme} />
    </div>
  );
}

export default App;
