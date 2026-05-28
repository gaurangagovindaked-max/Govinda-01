import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const isGitHub = project.link?.includes('github.com');
  const isVercel = project.link?.includes('vercel.app');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[150] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-zinc-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-zinc-50">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-zinc-900">{project.title}</h2>
              <span className="text-xs font-medium border border-zinc-200 bg-white px-2 py-0.5 rounded-full text-zinc-500 uppercase tracking-wider">
                {project.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  {isGitHub ? <Github size={16} /> : <ExternalLink size={16} />}
                  View {isGitHub ? 'Repo' : 'Live'}
                </a>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-zinc-100/50 p-6 flex flex-col items-center justify-center min-h-[50vh]">
            {isVercel && project.link ? (
              <div className="w-full h-[60vh] bg-white rounded-xl shadow-inner border border-zinc-200 overflow-hidden relative">
                {/* Fallback spinner underneath iframe */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400 -z-10">
                  <span className="animate-pulse">Loading preview...</span>
                </div>
                <iframe
                  src={project.link}
                  title={project.title}
                  className="w-full h-full border-0 bg-transparent"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center max-w-lg w-full">
                {isGitHub ? (
                  <div className="w-full flex flex-col items-center p-8 bg-zinc-900 text-white rounded-2xl mb-8 shadow-xl">
                    <Github size={48} className="mb-4" />
                    <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                    <p className="text-zinc-400 mb-6 text-sm">{project.description}</p>
                    <div className="flex gap-2 mb-8 flex-wrap justify-center">
                      {project.tags.map(t => (
                        <span key={t} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-300 font-mono">{t}</span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-900 bg-white rounded-xl hover:bg-zinc-200 transition-colors w-full justify-center"
                      >
                        <Github size={18} />
                        Open Repository in GitHub
                      </a>
                    )}
                  </div>
                ) : (
                  <>
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full rounded-xl shadow-sm border border-zinc-200 mb-6"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    )}
                    <h3 className="text-2xl font-bold text-zinc-900 mb-2">{project.title}</h3>
                    <p className="text-zinc-600 mb-8">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0969da] rounded-xl hover:bg-[#085ac0] shadow-sm transition-colors"
                      >
                        <ExternalLink size={18} />
                        Open Project in New Tab
                      </a>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
