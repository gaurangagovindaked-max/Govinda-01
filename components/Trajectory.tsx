import React from 'react';
import { motion } from 'framer-motion';

interface TrajectoryProps {
  education: {
    institute: string;
    degree: string;
    batch: string;
    details: string;
  };
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
    points: string[];
  }[];
}

export const Trajectory: React.FC<TrajectoryProps> = ({ education, experience }) => {
  return (
    <div className="flex flex-col gap-12">
      {/* Education Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 md:gap-8 items-start"
      >
        <div className="md:w-32 flex-shrink-0">
          <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
            {education.batch}
          </span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {education.institute}
          </h3>
          <p className="text-base text-zinc-700 dark:text-zinc-300 mb-2">
            {education.degree}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {education.details}
          </p>
        </div>
      </motion.div>

      {/* Experience Blocks */}
      {experience.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 md:gap-8 items-start"
        >
          <div className="md:w-32 flex-shrink-0">
            <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
              {exp.duration}
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {exp.role} <span className="font-normal text-zinc-500 dark:text-zinc-400">@ {exp.company}</span>
            </h3>
            <p className="text-base text-zinc-700 dark:text-zinc-300 mt-2 mb-4">
              {exp.description}
            </p>
            <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              {exp.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
