import React from 'react';
import { motion } from 'framer-motion';
import { Project, Theme } from '../types';

interface ProjectCardProps extends Project {
    theme: Theme;
    index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, description, link, index }) => {
    const CardShell = link ? motion.a : motion.div;

    return (
        <CardShell
            href={link}
            target={link ? "_blank" : undefined}
            rel={link ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            className="flex flex-col border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {title}
                </h3>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">
                    {category}
                </span>
            </div>
            
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {description}
            </p>
        </CardShell>
    );
};
