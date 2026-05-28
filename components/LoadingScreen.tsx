import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Signature } from './Signature';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timerComplete = false;
    let assetsLoaded = false;
    let dismissed = false;

    const checkComplete = () => {
      if (timerComplete && assetsLoaded && !dismissed) {
        dismissed = true;
        setIsComplete(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }
    };

    // 1. Min timeout of 1400ms for signature animation
    const minTimer = setTimeout(() => {
      timerComplete = true;
      checkComplete();
    }, 1400);

    // 2. Safety max timeout of 3000ms to guarantee it never gets stuck
    const safetyTimer = setTimeout(() => {
      assetsLoaded = true;
      timerComplete = true;
      checkComplete();
    }, 3000);

    // 3. Preload the heavy 1.5MB card profile image
    const img = new Image();
    img.src = '/assets/Gemini_Generated_Image_.png';
    img.onload = () => {
      assetsLoaded = true;
      checkComplete();
    };
    img.onerror = () => {
      assetsLoaded = true; // Complete anyway if loading fails
      checkComplete();
    };

    return () => {
      clearTimeout(minTimer);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <div className="scale-150">
            <Signature theme="light" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
