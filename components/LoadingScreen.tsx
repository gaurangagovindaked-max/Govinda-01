import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '../types';
import Shuffle from './Shuffle';
import ColorBends from './ColorBends';

interface LoadingScreenProps {
  theme: Theme;
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme, onComplete }) => {
  const [stage, setStage] = useState<number>(0);

  const isDark = theme === 'dark';
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';

  useEffect(() => {
    const sequence = async () => {
      // Stage 0: Initial Quadrants (Hold for 1.2s)
      await new Promise(r => setTimeout(r, 1200));
      setStage(1); // Collapse/Merge

      // Stage 1: Collapse Animation (takes ~0.8s)
      await new Promise(r => setTimeout(r, 800));
      setStage(2); // Fade Out

      // Stage 2: Fade Animation (takes ~0.5s)
      await new Promise(r => setTimeout(r, 500));

      if (onComplete) onComplete();
    };

    sequence();
  }, [onComplete]);

  // Quadrants collapse vertically to the center
  const quadrantVariants = {
    initial: { y: "0%" },
    collapse: (custom: number) => ({
      y: custom < 2 ? "50vh" : "-50vh", // Top moves down, Bottom moves up
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] // Custom bezier for "snappy" feel
      }
    })
  };

  // Determine final background color based on theme
  const getFinalBg = () => {
    switch (theme) {
      case 'dark': return 'bg-[#0a0a0a]';
      case 'brutal': return 'bg-white';
      case 'dark-brutal': return 'bg-black';
      default: return 'bg-white';
    }
  };

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          className={`fixed inset-0 z-[100] overflow-hidden pointer-events-none ${getFinalBg()}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === 2 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ColorBends Background */}
          <div className="absolute inset-0 z-0 opacity-40">
            <ColorBends
              colors={
                isDark ? ["#4f46e5", "#818cf8", "#c7d2fe"] : // Indigo theme
                  isLightBrutal ? ["#000000", "#ffffff", "#ff3333"] : // Brutal B&W + Red
                    isDarkBrutal ? ["#000000", "#ffffff", "#ccff00"] : // Dark Brutal + Acid
                      ["#60a5fa", "#3b82f6", "#93c5fd"] // Default Blue
              }
              speed={0.2}
              noise={0.1}
              transparent={false}
            />
          </div>

          {/* New loading text and progress bar */}
          {stage >= 2 && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto">
              <div className="mb-8">
                <Shuffle
                  text="INITIALIZING SYSTEM"
                  shuffleDirection="right"
                  duration={0.5}
                  shuffleTimes={3}
                  scrambleCharset="!@#$%^&*()_+"
                  className={`text-2xl md:text-4xl font-mono font-bold tracking-widest ${isDark ? 'text-white' :
                    isLightBrutal ? 'text-black' :
                      isDarkBrutal ? 'text-[#ccff00]' : // Assuming 'acid' refers to this color
                        'text-neutral-900'
                    }`}
                />
              </div>

              {/* Progress Bar */}
              <div className={`w-64 h-1 overflow-hidden ${isLightBrutal ? 'bg-neutral-200' :
                isDarkBrutal ? 'bg-neutral-800' :
                  'bg-neutral-200 dark:bg-neutral-800'
                }`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className={`h-full ${isDark ? 'bg-indigo-500' :
                    isLightBrutal ? 'bg-black' :
                      isDarkBrutal ? 'bg-[#ccff00]' : // Assuming 'acid' refers to this color
                        'bg-black'
                    }`}
                  onAnimationComplete={() => {
                    setStage(3); // Mark as complete to trigger exit animation
                    if (onComplete) onComplete();
                  }}
                />
              </div>
            </div>
          )}

          {/* Quadrant 1: Light (Top Left) */}
          <motion.div
            custom={0}
            variants={quadrantVariants}
            initial="initial"
            animate={stage >= 1 ? "collapse" : "initial"}
            className="absolute top-0 left-0 w-1/2 h-1/2 bg-white flex items-center justify-center border-r border-b border-neutral-200 z-20"
          >
            <div className="text-black font-sans font-bold tracking-tighter text-sm md:text-2xl">MINIMAL</div>
          </motion.div>

          {/* Quadrant 2: Dark (Top Right) */}
          <motion.div
            custom={1}
            variants={quadrantVariants}
            initial="initial"
            animate={stage >= 1 ? "collapse" : "initial"}
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#0a0a0a] flex items-center justify-center border-l border-b border-neutral-800 z-20"
          >
            <div className="text-white font-sans font-light tracking-widest text-xs md:text-xl">ELEGANCE</div>
          </motion.div>

          {/* Quadrant 3: Brutal (Bottom Left) */}
          <motion.div
            custom={2}
            variants={quadrantVariants}
            initial="initial"
            animate={stage >= 1 ? "collapse" : "initial"}
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white flex items-center justify-center border-r border-t border-black z-20"
            style={{
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div className="bg-black text-white px-2 py-1 md:px-4 font-bold font-mono transform -rotate-3 shadow-[4px_4px_0px_0px_rgba(255,51,51,1)] text-xs md:text-base">
              RAW_DATA
            </div>
          </motion.div>

          {/* Quadrant 4: Dark Brutal (Bottom Right) */}
          <motion.div
            custom={3}
            variants={quadrantVariants}
            initial="initial"
            animate={stage >= 1 ? "collapse" : "initial"}
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-black flex items-center justify-center border-l border-t border-white z-20"
            style={{
              backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div className="text-[#ccff00] font-mono font-bold tracking-tighter text-sm md:text-2xl border border-[#ccff00] px-2 py-1 md:px-4 md:py-2">
              SYSTEM.OS
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};