
import React, { useEffect, useState } from 'react';
import { Moon, Sun, Square, Terminal, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '../types';
import { Signature } from './Signature';
import { RESUME } from '../constants';

interface NavigationProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme === 'dark';
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';
  const isAnyBrutal = isLightBrutal || isDarkBrutal;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Vision', href: '#vision' },
    { name: 'Contact', href: '#contact' },
  ];

  const getNavBg = () => {
    if (!scrolled) return 'bg-transparent';
    if (isDark) return 'bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-800';
    if (isLightBrutal) return 'bg-white border-b-4 border-black';
    if (isDarkBrutal) return 'bg-black border-b-4 border-white';
    return 'bg-white/80 backdrop-blur-lg border-b border-neutral-100';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2 md:px-12 transition-all duration-300 ${getNavBg()}`}
      >
        <div className="flex items-center gap-2">
          {/* Animated Signature - Key forces reload on theme change or scroll state change */}
          <div className="relative group overflow-hidden">
            <Signature theme={theme} key={`${theme}-${scrolled ? 'scrolled' : 'top'}`} />
            {/* Highlight Underline for Brutal - Visual Accent Only */}
            {isAnyBrutal && (
              <span className={`absolute bottom-2 left-10 right-10 h-[2px] -z-10 opacity-30 ${isLightBrutal ? 'bg-cherry' : 'bg-acid'}`}></span>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-bold uppercase tracking-widest transition-colors relative group ${isDark ? 'text-neutral-400 hover:text-white' :
                isLightBrutal ? 'text-black hover:text-white' :
                  isDarkBrutal ? 'text-white hover:text-black' :
                    'text-neutral-600 hover:text-black'
                }`}
            >
              <span className="relative z-10">{link.name}</span>
              {/* Brutal Hover Block */}
              {isAnyBrutal && (
                <span className={`absolute inset-0 -z-0 scale-x-0 group-hover:scale-x-110 group-hover:scale-y-125 transition-transform origin-center ${isLightBrutal ? 'bg-black' : 'bg-acid'
                  }`} />
              )}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-10 h-10 transition-all ${isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-white rounded-full' :
              isLightBrutal ? 'bg-cherry text-white border-2 border-black shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]' :
                isDarkBrutal ? 'bg-acid text-black border-2 border-white shadow-brutal-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]' :
                  'bg-neutral-100 hover:bg-neutral-200 text-black rounded-full'
              }`}
          >
            {isDark ? <Sun size={18} /> :
              isLightBrutal ? <Moon size={18} /> :
                isDarkBrutal ? <Terminal size={18} /> :
                  <Square size={18} fill="currentColor" />}
          </button>

          {/* Reference "Resume" Button Style */}
          {isAnyBrutal && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const event = new CustomEvent('trigger-chat', {
                  detail: { message: `Well, contact Govinda on his email: ${RESUME.header.email}` }
                });
                window.dispatchEvent(event);
              }}
              className={`hidden lg:block px-6 py-2 text-sm font-bold uppercase border-2 transition-all ${isLightBrutal
                ? 'border-black text-black hover:bg-black hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-black'
                }`}>
              Resume
            </a>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDark ? 'bg-neutral-800 text-white' :
              isLightBrutal ? 'bg-white border-2 border-black shadow-brutal text-black rounded-none' :
                isDarkBrutal ? 'bg-black border-2 border-white shadow-brutal-white text-white rounded-none' :
                  'bg-neutral-100 text-black'
              }`}
          >
            {isDark ? <Sun size={18} /> :
              isLightBrutal ? <Moon size={18} /> :
                isDarkBrutal ? <Terminal size={18} /> :
                  <Square size={18} />}
          </button>
          <button onClick={() => setMenuOpen(true)} className={isDark || isDarkBrutal ? 'text-white' : 'text-black'}>
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 md:hidden ${isDark ? 'bg-neutral-950 text-white' :
              isLightBrutal ? 'bg-white text-black border-l-4 border-black' :
                isDarkBrutal ? 'bg-black text-white border-l-4 border-white' :
                  'bg-white text-black'
              }`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-2"
            >
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-display text-4xl font-bold uppercase tracking-tighter ${isLightBrutal ? 'hover:bg-cherry hover:text-white px-2' :
                  isDarkBrutal ? 'hover:bg-acid hover:text-black px-2' :
                    'hover:opacity-50'
                  }`}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Signature */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center">
              <div className="relative group overflow-hidden scale-125">
                <Signature theme={theme} key={`mobile-${theme}`} />
                {isAnyBrutal && (
                  <span className={`absolute bottom-2 left-10 right-10 h-[2px] -z-10 opacity-30 ${isLightBrutal ? 'bg-cherry' : 'bg-acid'}`}></span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
