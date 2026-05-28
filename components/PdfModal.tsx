import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

interface PdfModalProps {
  url: string | null;
  onClose: () => void;
  title?: string;
}

export const PdfModal: React.FC<PdfModalProps> = ({ url, onClose, title = "Document Viewer" }) => {
  useEffect(() => {
    if (url) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [url]);

  return (
    <AnimatePresence>
      {url && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-5xl h-[85vh] md:h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h3 className="text-lg font-semibold text-zinc-900 truncate pr-4">
                {title}
              </h3>
              <div className="flex items-center gap-2">
                <a 
                  href={url} 
                  download 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-500 hover:text-[#0969da] hover:bg-blue-50 rounded-full transition-colors"
                  title="Download PDF"
                >
                  <Download size={20} />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-grow bg-zinc-100 p-2 md:p-4">
              <iframe 
                src={url} 
                className="w-full h-full rounded-xl border border-zinc-200 bg-white"
                title={title}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
