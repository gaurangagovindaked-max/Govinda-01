import React from 'react';
import { RESUME } from '../constants';

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-12 mb-12">
      <img 
        src="/assets/Gemini_Generated_Image_.png" 
        alt={RESUME.header.name}
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-sm border border-zinc-200"
      />
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
          {RESUME.header.name}
        </h1>
        <p className="mt-2 text-base md:text-lg text-zinc-700">
          {RESUME.vision.tagline}
        </p>
        <div className="mt-4 flex gap-3 text-sm">
          <a href="https://github.com/GC-WORK11" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            GitHub
          </a>
          <span className="text-zinc-400">•</span>
          <a href="#" className="text-blue-600 hover:underline">
            Twitter
          </a>
          <span className="text-zinc-400">•</span>
          <a href={`mailto:${RESUME.header.email}`} className="text-blue-600 hover:underline">
            Email
          </a>
        </div>
      </div>
    </div>
  );
};
