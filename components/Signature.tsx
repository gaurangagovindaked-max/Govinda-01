
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Theme } from '../types';

interface SignatureProps {
  theme: Theme;
}

export const Signature: React.FC<SignatureProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';

  // Ink Color logic
  const strokeColor = isDark || isDarkBrutal ? '#ffffff' : '#000000';

  // Animation variants
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.9, type: "tween", ease: "easeInOut", duration: 2.5 }, // Slow, deliberate speed
        opacity: { delay: i * 0.9, duration: 0.01 }
      }
    })
  };

  return (
    <div className="relative w-64 h-20 flex items-center justify-center pointer-events-none select-none">
      <svg
        viewBox="0 0 450 150"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 
          Legible Cursive Paths for "Govinda Chauhan" 
          Hand-tuned for distinct letter shapes.
        */}

        {/* 'Govinda' */}
        <motion.path
          // G: Big loop up, down through center, loop back
          // o: small loop
          // v: dip
          // i: spike
          // n: hump
          // d: tall loop
          // a: loop
          d="M 40 80 C 20 80 10 50 40 40 C 70 30 70 60 50 70 C 45 72 65 72 75 65 C 80 60 70 60 85 60 C 95 60 100 70 110 55 L 115 70 L 125 55 L 125 70 L 135 60 C 140 50 150 50 155 70 L 160 30 L 160 70 C 165 60 175 60 175 70 C 170 60 190 60 190 70"
          stroke={strokeColor}
          strokeWidth="2.5"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={0}
        />

        {/* 'Chauhan' */}
        <motion.path
          // C: Big curve
          // h: tall loop
          // a: loop
          // u: dip
          // h: tall loop
          // a: loop
          // n: hump
          d="M 220 40 C 200 40 200 70 220 70 C 230 70 230 40 230 40 L 230 70 C 235 60 245 60 245 70 C 240 60 255 60 255 70 L 265 60 L 265 70 L 270 30 L 270 70 C 275 60 285 60 285 70 C 280 60 300 60 300 70 C 305 60 315 60 315 70"
          stroke={strokeColor}
          strokeWidth="2.5"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={1} // Starts after first name
        />

        {/* Dot for 'i' */}
        <motion.path
            d="M 125 40 L 125 43"
            stroke={strokeColor}
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
            variants={draw}
            initial="hidden"
            animate="visible"
            custom={2}
        />

        {/* Underline Swoosh - Fast and confident */}
        <motion.path
          d="M 30 100 Q 180 120 350 90"
          stroke={strokeColor}
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={2.2}
        />
      </svg>
    </div>
  );
};
