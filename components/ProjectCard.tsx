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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col border border-zinc-200 bg-white p-5 rounded-xl cursor-pointer"
        >
            <div className="flex items-center gap-2 mb-3">
                <Book size={16} className="text-zinc-500" />
                <h3 className="text-base font-semibold text-[#0969da] hover:underline flex items-center gap-1.5">
                    {title}
                </h3>
                <span className="ml-auto text-xs font-medium border border-zinc-200 px-2 py-0.5 rounded-full text-zinc-500">
                    Public
                </span>
            </div>
            
            <p className="text-sm text-zinc-600 mb-6 flex-grow">
                {description}
            </p>

            <div className="flex items-center gap-4 text-xs text-zinc-600 mt-auto">
                <div className="flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full ${langColor}`} />
                    <span>{category}</span>
                </div>
            </div>
        </motion.div>
    );
};
