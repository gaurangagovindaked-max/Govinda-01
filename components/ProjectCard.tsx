import React from 'react';
import { motion } from 'framer-motion';
import { Book, Star, GitFork } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps extends Project {
    index: number;
    onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, description, metric, onClick, index }) => {
    // A simple mock for repo languages colors based on tags or category
    const langColor = category.includes("Rust") ? "bg-[#dea584]" : category.includes("React") ? "bg-[#61dafb]" : category.includes("Python") ? "bg-[#3572A5]" : "bg-blue-500";

    return (
        <motion.div
            onClick={onClick}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="flex flex-col cursor-pointer group mb-2"
        >
            <div className="flex items-baseline gap-2">
                <h3 className="text-base font-semibold text-[#0969da] group-hover:underline flex items-center gap-1.5">
                    {title}
                </h3>
                <span className="text-xs text-zinc-500 font-mono tracking-tight">{category}</span>
            </div>
            
            <p className="text-sm text-zinc-700 mt-1">
                {description}
            </p>
        </motion.div>
    );
};
