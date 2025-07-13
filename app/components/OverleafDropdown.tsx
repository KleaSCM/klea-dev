"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";

/**
 * Overleaf Dropdown Component
 * 
 * A dropdown component that displays research papers from Overleaf
 * with smooth animations and hover effects.
 * 
 * @component
 * @returns {JSX.Element} Overleaf dropdown component
 */

interface Paper {
  title: string;
  url: string;
  description: string;
  date: string;
}

const papers: Paper[] = [
  {
    title: "Mathematical Framework for Recursive Trait Evolution",
    url: "https://www.overleaf.com/read/jwskqxsdhqjh#6c4fc8",
    description: "Comprehensive mathematical framework for trait evolution in cognitive systems",
    date: "2024"
  },
  {
    title: "Recursive Goal Selection and Arbitration",
    url: "https://www.overleaf.com/read/hchpxwqrvwwy#5f62a2",
    description: "Advanced framework for goal selection and decision arbitration",
    date: "2024"
  },
  {
    title: "Cognitive Architecture State Management",
    url: "https://www.overleaf.com/read/sjrkmytshxkf#174058",
    description: "State management systems for cognitive architectures",
    date: "2024"
  },
  {
    title: "Neural Network Integration in AI Systems",
    url: "https://www.overleaf.com/read/bnhbmpfwfmds#455120",
    description: "Integration patterns for neural networks in cognitive systems",
    date: "2024"
  }
];

const OverleafDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Overleaf Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-primary transition-all duration-200"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-lg">📝</span>
        <span className="text-sm font-medium">Papers</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-2xl z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Research Papers</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">{papers.length} papers</span>
              </div>
              
              <div className="space-y-2">
                {papers.map((paper, index) => (
                  <motion.a
                    key={paper.url}
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <FileText className="w-4 h-4 text-primary" />
                          <h4 className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                            {paper.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                          {paper.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {paper.date}
                          </span>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OverleafDropdown; 