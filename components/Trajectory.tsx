import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { PdfModal } from './PdfModal';

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
    attachment?: string;
    attachmentLabel?: string;
  }[];
}

export const Trajectory: React.FC<TrajectoryProps> = ({ education, experience }) => {
  const [selectedPdf, setSelectedPdf] = useState<{url: string, label: string} | null>(null);

  return (
    <div className="flex flex-col gap-12">
      <PdfModal 
        url={selectedPdf?.url || null} 
        title={selectedPdf?.label} 
        onClose={() => setSelectedPdf(null)} 
      />
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
          <h3 className="text-xl font-bold text-zinc-900">
            {education.institute}
          </h3>
          <p className="text-base text-zinc-700 mb-2">
            {education.degree}
          </p>
          <p className="text-sm text-zinc-600">
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
            <h3 className="text-xl font-bold text-zinc-900">
              {exp.role} <span className="font-normal text-zinc-500">@ {exp.company}</span>
            </h3>
            <p className="text-base text-zinc-700 mt-2 mb-4">
              {exp.description}
            </p>
            <ul className="list-disc list-inside text-sm text-zinc-600 space-y-1">
              {exp.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
            {exp.attachment && (
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => setSelectedPdf({ url: exp.attachment!, label: exp.attachmentLabel || "Document" })}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#0969da] hover:underline transition-all"
                >
                  <FileText size={16} />
                  {exp.attachmentLabel || "View Attachment"}
                </button>
                
                <span className="text-zinc-300">|</span>
                
                <a 
                  href={exp.attachment} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  download
                  className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                  title="Download File"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
