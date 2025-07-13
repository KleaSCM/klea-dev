"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText, Play, Download, Copy, Check, Github } from "lucide-react";
import { useState } from "react";
import { ResearchEntry, Notebook, Report } from "../data/research";
import { getPlatformMeta, PlatformType } from "../data/platforms";

/**
 * Research Card Component
 * 
 * A beautiful, interactive card component for displaying research notebooks and reports.
 * Features:
 * - Platform-specific styling and icons using centralized configuration
 * - Citation and BibTeX support
 * - Interactive tags and categories
 * - Download and copy functionality
 * - Smooth animations and hover effects
 * - Hover buttons for GitHub and platform links
 * 
 * @component
 * @param {ResearchEntry} entry - The research entry to display
 * @returns {JSX.Element} Research card component
 */

interface ResearchCardProps {
  entry: ResearchEntry;
  className?: string;
}

const ResearchCard = ({ entry, className = "" }: ResearchCardProps) => {
  const [copied, setCopied] = useState(false);
  const [showBibtex, setShowBibtex] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get platform metadata from centralized configuration
  const platformMeta = getPlatformMeta(entry.platform);

  // Copy citation to clipboard
  const copyCitation = async () => {
    if (entry.citation) {
      await navigator.clipboard.writeText(entry.citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Copy BibTeX to clipboard
  const copyBibtex = async () => {
    if (entry.bibtex) {
      await navigator.clipboard.writeText(entry.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isNotebook = entry.type === 'notebook';
  const notebook = entry as Notebook;
  const report = entry as Report;

  return (
    <motion.div
      className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Header with platform icon and type */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${platformMeta.color} rounded-lg flex items-center justify-center text-white text-lg`}>
            {platformMeta.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {isNotebook ? '📓 Notebook' : '📄 Report'}
              </span>
              {entry.featured && (
                <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {platformMeta.label} • {new Date(entry.date).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Research image */}
      {entry.image && (
        <div className="mb-4 aspect-video rounded-lg overflow-hidden">
          <img 
            src={entry.image} 
            alt={entry.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title and description */}
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
        {entry.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        {entry.description}
      </p>

      {/* Abstract for reports */}
      {entry.abstract && (
        <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            {entry.abstract}
          </p>
        </div>
      )}

      {/* Notebook-specific details */}
      {isNotebook && notebook.runtime && (
        <div className="flex items-center space-x-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
          <span>🖥️ {notebook.runtime}</span>
          {notebook.framework && <span>⚙️ {notebook.framework}</span>}
          {notebook.interactive && <span>🎮 Interactive</span>}
        </div>
      )}

      {/* Report-specific details */}
      {!isNotebook && (
        <div className="flex items-center space-x-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
          {report.pages && <span>📄 {report.pages} pages</span>}
          {report.peerReviewed && <span>✅ Peer Reviewed</span>}
          {report.authors && <span>👥 {report.authors.join(', ')}</span>}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {entry.tags.map((tag, index) => (
          <motion.span
            key={tag}
            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Hover overlay with action buttons */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6"
          >
            <div className="flex gap-2">
              {/* GitHub button for all entries */}
              <a
                href="https://github.com/KleaSCM/research-notes"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              
              {/* Platform-specific button - Kaggle for notebooks, OSF for reports */}
              {isNotebook ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  aria-label="View on Kaggle"
                >
                  <span className="text-lg">📊</span>
                </a>
              ) : (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  aria-label="View on OSF"
                >
                  <span className="text-lg">🔬</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* View button */}
          <motion.a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isNotebook ? <Play className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
            <span>{isNotebook ? 'View Demo' : 'Read Paper'}</span>
          </motion.a>

          {/* DOI link for reports */}
          {entry.doi && (
            <motion.a
              href={`https://doi.org/${entry.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>DOI</span>
            </motion.a>
          )}
        </div>

        {/* Citation buttons for reports */}
        {!isNotebook && (entry.citation || entry.bibtex) && (
          <div className="flex items-center space-x-2">
            {entry.citation && (
              <motion.button
                onClick={copyCitation}
                className="flex items-center space-x-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>Cite</span>
              </motion.button>
            )}
            
            {entry.bibtex && (
              <motion.button
                onClick={() => setShowBibtex(!showBibtex)}
                className="flex items-center space-x-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>BibTeX</span>
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* BibTeX display */}
      {showBibtex && entry.bibtex && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs overflow-x-auto"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-400">BibTeX</span>
            <motion.button
              onClick={copyBibtex}
              className="text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </motion.button>
          </div>
          <pre className="whitespace-pre-wrap">{entry.bibtex}</pre>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResearchCard; 