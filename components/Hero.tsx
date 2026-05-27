
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
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';

  const isAnyBrutal = isLightBrutal || isDarkBrutal;

  const getImageSrc = () => {
    switch (theme) {
      case 'dark': return '/nobrutaldarkthemeone.jpg';
      case 'brutal': return '/lightbrutal.jpg';
      case 'dark-brutal': return '/darkbrutalism.jpg';
      default: return '/MYIMAGE.jpg';
    }
  };

  const imageSrc = getImageSrc();

  // State for the typing animation
  const [displayText, setDisplayText] = useState('');
  const fullText = "Specializing in AI Architecture, Workflows, and Education.";

  useEffect(() => {
    if (theme === 'light') { // Only for light theme
      let index = 0;
      setDisplayText(''); // Reset text

      const timer = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText(fullText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 30); // Speed of typing - lower is faster

      return () => clearInterval(timer);
    } else {
      setDisplayText(fullText); // Show full text immediately for other themes
    }
  }, [theme]);

  // Function to render the mission statement with typing animation if in light theme
  const renderMissionStatement = () => {
    if (theme === 'light') {
      // For light theme, we'll show a simplified version that highlights key terms as they appear
      const allText = "Specializing in AI Architecture, Workflows, and Education.";

      // Find positions of key terms
      const aiArchIndex = allText.indexOf("AI Architecture");
      const workflowsIndex = allText.indexOf("Workflows");
      const educationIndex = allText.indexOf("Education");

      return (
        <>
          {displayText.substring(0, aiArchIndex)}
          <span className="mx-1 md:mx-2 px-1 font-bold border-b-2 border-indigo-500 text-black whitespace-nowrap">
            {displayText.substring(aiArchIndex, aiArchIndex + "AI Architecture".length)}
          </span>
          {displayText.substring(aiArchIndex + "AI Architecture".length, workflowsIndex)}
          <span className="mx-1 md:mx-2 px-1 font-bold border-b-2 border-indigo-500 text-black whitespace-nowrap">
            {displayText.substring(workflowsIndex, workflowsIndex + 9)}
          </span>
          {displayText.substring(workflowsIndex + 9, educationIndex)}
          <span className="mx-1 md:mx-2 px-1 font-bold border-b-2 border-indigo-500 text-black whitespace-nowrap">
            {displayText.substring(educationIndex, educationIndex + 9)}
          </span>
          {displayText.substring(educationIndex + 9)}
        </>
      );
    } else {
      // For other themes, show the static text with proper styling
      return (
        <>
          Specializing in
          <span className={`mx-1 md:mx-2 px-1 font-bold whitespace-nowrap ${isDark ? 'border-b-2 border-indigo-500 text-white' :
            isLightBrutal ? 'bg-cherry text-white' :
              isDarkBrutal ? 'bg-acid text-black' :
                'border-b-2 border-indigo-500 text-black'
            }`}>AI Architecture</span>,
          <span className={`mx-1 md:mx-2 px-1 font-bold whitespace-nowrap ${isDark ? 'border-b-2 border-indigo-500 text-white' :
            isLightBrutal ? 'bg-cherry text-white' :
              isDarkBrutal ? 'bg-acid text-black' :
                'border-b-2 border-indigo-500 text-black'
            }`}>Workflows</span>,
          and
          <span className={`mx-1 md:mx-2 px-1 font-bold whitespace-nowrap ${isDark ? 'border-b-2 border-indigo-500 text-white' :
            isLightBrutal ? 'bg-cherry text-white' :
              isDarkBrutal ? 'bg-acid text-black' :
                'border-b-2 border-indigo-500 text-black'
            }`}>Education</span>.
        </>
      );
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-12 overflow-hidden z-0">
      {/* Background Gradients for Standard Themes */}
      {!isAnyBrutal && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={`absolute top-[10%] right-[0%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-10 ${isDark ? 'bg-indigo-900' : 'bg-slate-200'}`} />
          <div className={`absolute bottom-[10%] left-[0%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-10 ${isDark ? 'bg-purple-900' : 'bg-blue-100'}`} />
        </div>
      )}

      <div className="container mx-auto max-w-[1600px] z-10 relative">
        <div className={`mx-auto ${isAnyBrutal ? 'max-w-none text-left' : 'max-w-7xl text-center md:text-left'}`}>

          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12`}>
            <div className="flex-1">
              {/* Header Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex items-center gap-4 mb-8 ${isAnyBrutal ? 'justify-start' : 'justify-center md:justify-start'}`}
              >
                {!isAnyBrutal && <div className={`h-[2px] w-12 ${isDark ? 'bg-indigo-500' : 'bg-black'}`} />}
                <span className={`text-sm font-mono font-bold tracking-widest uppercase ${isDark ? 'text-neutral-400' :
                  isLightBrutal ? 'text-black' :
                    isDarkBrutal ? 'text-acid' :
                      'text-neutral-600'
                  }`}>
                  {isDarkBrutal ? 'EST_2025' : 'Executive Portfolio'}
                </span>
              </motion.div>

              {/* Massive Name */}
              <h1 className={`font-display font-bold tracking-tighter mb-4 ${isDark || isDarkBrutal ? 'text-white' : 'text-neutral-900'
                } ${isAnyBrutal ? 'text-[5rem] md:text-[9rem] lg:text-[11rem] leading-[0.8] uppercase' : 'text-6xl md:text-9xl lg:text-[10rem] leading-[0.85]'}`}>
                {words.map((word, i) => (
                  <span key={i} className={`inline-block mr-4 md:mr-8 ${isAnyBrutal ? 'mr-4 md:mr-12' : ''}`}>
                    <motion.span
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: isAnyBrutal ? 0.4 : 1,
                        delay: i * 0.15,
                        ease: isAnyBrutal ? "backOut" : [0.16, 1, 0.3, 1]
                      }}
                      className="block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            {/* The Image - Positioned Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`w-full md:w-[400px] lg:w-[500px] relative shrink-0 ${isAnyBrutal ? 'md:w-[300px] lg:w-[350px]' : ''}`}
            >
              {isAnyBrutal ? (
                <div className={`aspect-[4/5] w-full relative overflow-hidden ${isLightBrutal ? 'border-4 border-black shadow-[16px_16px_0px_#ff3333]' :
                  isDarkBrutal ? 'border-4 border-white shadow-[16px_16px_0px_#ccff00]' :
                    'rounded-2xl shadow-2xl'
                  }`}>
                  <img
                    src={imageSrc}
                    alt="Govinda Chauhan"
                    className={`w-full h-full object-cover transition-all duration-700 ${isAnyBrutal ? 'contrast-125 brightness-110' :
                      ''
                      }`}
                  />
                </div>
              ) : (
                <NeuralPortrait theme={theme} imageSrc={imageSrc} />
              )}
            </motion.div>
          </div>

          {/* Divider Line for Brutal */}
          {isAnyBrutal && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`w-full h-[4px] mb-12 origin-left ${isLightBrutal ? 'bg-black' : 'bg-white'}`}
            />
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className={`${isAnyBrutal ? 'max-w-3xl' : 'max-w-3xl mx-auto md:mx-0'}`}
            >
              <p className={`text-lg md:text-2xl font-light leading-relaxed ${isDark ? 'text-neutral-300' :
                isLightBrutal ? 'text-black font-medium' :
                  isDarkBrutal ? 'text-white font-medium' :
                    'text-neutral-600'
                }`}>
                {renderMissionStatement()}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className={`${isAnyBrutal ? 'block' : 'hidden md:block'}`}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  // For brutal themes, the user wants this to show the contact message instead of scrolling/downloading
                  if (isAnyBrutal) {
                    e.preventDefault();
                    const event = new CustomEvent('trigger-chat', {
                      detail: { message: `Well, contact Govinda on his email: ${RESUME.header.email}` }
                    });
                    window.dispatchEvent(event);
                  }
                }}
                className={`flex items-center justify-center w-24 h-24 md:w-32 md:h-32 transition-transform hover:scale-105 ${isLightBrutal
                  ? 'bg-cherry text-white shadow-brutal'
                  : isDarkBrutal
                    ? 'bg-acid text-black shadow-brutal-white'
                    : `rounded-full border ${isDark ? 'border-white text-white' : 'border-black text-black'}`
                  }`}>
                <ArrowDown size={isAnyBrutal ? 40 : 32} className={`${!isAnyBrutal && 'animate-bounce'}`} />
              </a>
            </motion.div>
          </div>

          {/* Standard Button (Non-Brutal) */}
          {!isAnyBrutal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 flex justify-center md:justify-start"
            >
              <a
                href="#projects"
                className={`px-10 py-5 text-sm font-bold uppercase tracking-widest border transition-all ${isDark
                  ? 'border-white text-white hover:bg-white hover:text-black'
                  : 'border-black text-black hover:bg-black hover:text-white'
                  }`}
              >
                View Selected Works
              </a>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
