
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
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#030303] text-zinc-100' : 'bg-[#fcfcfd] text-zinc-900'}`}>
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <Hero theme={theme} />

      <SkillTicker skills={RESUME.skills} theme={theme} />

      {/* Journey Timeline Section */}
      <section className="py-24 px-6 relative overflow-hidden z-10 border-b border-zinc-200/40 dark:border-zinc-800/40">
        <div className="container mx-auto max-w-[1600px]">
          <div className="max-w-3xl mb-16 text-left">
            <span className={`block text-xs font-mono uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
              Narrative Progression
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter mb-6 leading-none">
              The Journey Arc.
            </h2>
            <p className="text-lg opacity-60 leading-relaxed font-sans">
              Built after working on more than 100 complex projects and engineering systems in multiple programming languages. A linear transition from client interfaces to autonomous system orchestration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Mobile Systems",
                sub: "Flutter & React Native",
                desc: "Engineering highly responsive client decks, local caching layers, and high-fidelity native layouts built for fluid user interaction."
              },
              {
                step: "02",
                title: "AI Bots & Integrations",
                sub: "Slack Bots & Python Orchestrators",
                desc: "Transitioning to automated business flows, multi-agent literature synthesizers (CHIMERA), and custom workspace Slack automation."
              },
              {
                step: "03",
                title: "Agentic Harness",
                sub: "Terminal Cockpits & Guardrails",
                desc: "Crafting pre-execution terminal risk gates (Kairo), local-first cockpit platforms (Doorway), and automated video evals (VideoUnit)."
              }
            ].map((journey, idx) => (
              <div 
                key={idx}
                className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <span className={`block text-xs font-mono font-bold uppercase tracking-widest opacity-40 mb-4`}>
                    PHASE {journey.step}
                  </span>
                  <h3 className="text-2xl font-display font-extrabold mb-1 tracking-tight">
                    {journey.title}
                  </h3>
                  <div className={`text-xs font-mono mb-6 opacity-75 font-semibold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {journey.sub}
                  </div>
                </div>
                <p className="text-sm opacity-60 leading-relaxed font-sans">
                  {journey.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real SVG Technology Showcase Section */}
      <TechStack theme={theme} />

      {/* Mission Statement */}
      <MissionStatement theme={theme} summary={RESUME.summary} />

      {/* Engineered Reality (Projects) */}
      <Section id="projects" theme={theme} className="py-32">
        <div className="container mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 pb-8 gap-8 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <span className={`block text-xs font-mono uppercase tracking-widest mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                Selected Works
              </span>
              <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter">
                Shipped Proof.
              </h2>
            </div>
            <a 
              href="https://github.com/GC-WORK11" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 group hover:opacity-80`}
            >
              <div className={`w-12 h-[1px] transition-all duration-300 group-hover:w-16 ${isDark ? 'bg-zinc-100' : 'bg-zinc-900'}`} />
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
      <section id="experience" className="py-32 px-6">
        <div className="container mx-auto max-w-[1600px]">
          <div className="mb-24">
            <h2 className="font-display text-6xl md:text-8xl font-extrabold tracking-tighter mb-6">
              Builder Arc.
            </h2>
            <p className="text-lg md:text-xl max-w-xl opacity-60 leading-relaxed font-sans">
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
      <section id="research" className={`py-32 px-6 ${isDark ? 'bg-[#050505]' : 'bg-zinc-50'}`}>
        <div className="container mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <h2 className="font-display text-5xl md:text-6xl font-extrabold tracking-tighter">
              Papers, PRDs & Systems Thinking
            </h2>
            <span className="text-sm font-mono uppercase tracking-widest opacity-60">
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
      <footer id="contact" className={`py-24 px-6 border-t ${isDark ? 'bg-black border-zinc-900' : 'bg-zinc-100 border-zinc-200'}`}>
        <div className="container mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h2 className="font-display text-5xl font-extrabold tracking-tight mb-8">
                Start a Conversation.
              </h2>
              <a href={`mailto:${RESUME.header.email}`} className={`text-2xl md:text-4xl font-light hover:text-indigo-500 transition-colors underline decoration-1 underline-offset-8 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {RESUME.header.email}
              </a>
              <p className="mt-8 text-lg opacity-60">
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
                      className={`text-base font-bold uppercase tracking-widest hover:text-indigo-500 transition-colors ${isDark ? 'text-white' : 'text-black'}`}
                    >
                      {social}
                    </a>
                  );
                })}
              </div>
              <p className="text-xs opacity-50 uppercase tracking-widest">
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
