
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { Theme } from '../types';
import { ArrowDown } from 'lucide-react';
import { NeuralPortrait } from './NeuralPortrait';

interface HeroProps {
  theme: Theme;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const words = RESUME.header.name.split(' ');
  const isDark = theme === 'dark';

  const getImageSrc = () => {
    return isDark ? '/nobrutaldarkthemeone.jpg' : '/MYIMAGE.jpg';
  };

  const imageSrc = getImageSrc();

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center px-6 md:px-12 pt-36 pb-12 overflow-hidden z-0">
      {/* Premium Ambient Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[10%] right-[5%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-25 transition-colors duration-1000 ${isDark ? 'bg-indigo-950/40' : 'bg-indigo-100/50'}`} />
        <div className={`absolute bottom-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full blur-[120px] opacity-25 transition-colors duration-1000 ${isDark ? 'bg-violet-950/40' : 'bg-purple-100/40'}`} />
      </div>

      <div className="container mx-auto max-w-[1600px] z-10 relative">
        <div className="mx-auto text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 mb-16">
            <div className="flex-1">
              {/* Premium Sub-Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-4 mb-8"
              >
                <div className={`h-[1px] w-12 ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'}`} />
                <span className={`text-xs font-mono font-bold tracking-[0.3em] uppercase ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  Specialized AI Architecture
                </span>
              </motion.div>

              {/* Massive Premium Name Typography */}
              <h1 className={`font-display font-extrabold tracking-tighter mb-8 ${isDark ? 'text-white' : 'text-zinc-900'} text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.9]`}>
                {words.map((word, i) => (
                  <span key={i} className="inline-block mr-4 sm:mr-6">
                    <motion.span
                      initial={{ opacity: 0, y: 80 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-2xl mb-12"
              >
                <p className={`text-lg sm:text-2xl font-light leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {RESUME.vision.tagline}
                </p>
              </motion.div>

              {/* Shipped Proof CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#projects"
                  className={`px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 border ${
                    isDark 
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500 hover:text-white shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]'
                      : 'border-indigo-600 bg-indigo-600/5 text-indigo-700 hover:bg-indigo-600 hover:text-white shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                  }`}
                >
                  Explore Shipped Proof
                </a>
                <a
                  href="#contact"
                  className={`px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 border ${
                    isDark
                      ? 'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  Start a Conversation
                </a>
              </motion.div>
            </div>

            {/* Glowing Interactive Neural Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-full lg:w-[480px] xl:w-[560px] shrink-0"
            >
              <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent">
                <NeuralPortrait theme={theme} imageSrc={imageSrc} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
