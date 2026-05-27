
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
    if (!scrolled) return 'bg-transparent border-transparent py-6';
    if (isDark) return 'bg-neutral-950/70 border border-neutral-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4 backdrop-blur-xl';
    return 'bg-white/70 border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-4 backdrop-blur-xl';
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-between w-full max-w-[1400px] px-8 rounded-full transition-all duration-500 ${getNavBg()}`}
        >
          <div className="flex items-center gap-2">
            <div className="relative group overflow-hidden">
              <Signature theme={theme} key={`${theme}-${scrolled ? 'scrolled' : 'top'}`} />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-mono font-bold uppercase tracking-widest transition-colors relative group py-2 ${
                  isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className={`absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                  isDark ? 'bg-indigo-400' : 'bg-indigo-600'
                }`} />
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-9 h-9 transition-all rounded-full border ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-white' 
                  : 'bg-white border-neutral-200 hover:bg-neutral-50 text-black'
              }`}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800 text-white' 
                  : 'bg-white border-neutral-200 text-black'
              }`}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button 
              onClick={() => setMenuOpen(true)} 
              className={`p-1 rounded-full ${isDark ? 'text-white' : 'text-black'}`}
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
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
