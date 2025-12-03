import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '../types';

interface LoadingScreenProps {
  theme: Theme;
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const isDark = theme === 'dark';
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';

  useEffect(() => {
    // Simple progress simulation
    const duration = 2000; // 2 seconds total loading
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsComplete(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500); // Short delay before unmounting
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Determine colors and fonts based on theme
  const getThemeStyles = () => {
    if (isDark) {
      return {
        bg: 'bg-[#0a0a0a]',
        text: 'text-white',
        bar: 'bg-indigo-500',
        barBg: 'bg-neutral-900',
        font: 'font-sans'
      };
    }
    if (isLightBrutal) {
      return {
        bg: 'bg-white',
        text: 'text-black',
        bar: 'bg-black',
        barBg: 'bg-neutral-200',
        font: 'font-mono'
      };
    }
    if (isDarkBrutal) {
      return {
        bg: 'bg-black',
        text: 'text-[#ccff00]',
        bar: 'bg-[#ccff00]',
        barBg: 'bg-neutral-900',
        font: 'font-mono'
      };
    }
    // Light / Default
    return {
      bg: 'bg-white',
      text: 'text-neutral-900',
      bar: 'bg-black',
      barBg: 'bg-neutral-100',
      font: 'font-sans'
    };
  };

  const styles = getThemeStyles();

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${styles.bg}`}
        >
          <div className="relative w-64 flex flex-col items-center gap-4">
            {/* Percentage Text */}
            <motion.div
              className={`text-6xl font-bold tracking-tighter tabular-nums ${styles.text} ${styles.font}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {progress}%
            </motion.div>

            {/* Simple Progress Bar */}
            <div className={`w-full h-1 overflow-hidden ${styles.barBg}`}>
              <motion.div
                className={`h-full ${styles.bar}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Optional Status Text */}
            <motion.div
              className={`text-xs uppercase tracking-widest opacity-50 ${styles.text} ${styles.font}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.2 }}
            >
              {(isLightBrutal || isDarkBrutal) ? 'INITIALIZING_SYSTEM' : 'Loading Assets'}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
