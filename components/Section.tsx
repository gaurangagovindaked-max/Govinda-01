
import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  theme?: Theme;
}

export const Section: React.FC<SectionProps> = ({ id, children, className = "", theme }) => {
  return (
    <section id={id} className={`py-24 px-6 md:px-12 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  );
};
