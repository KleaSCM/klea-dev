"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Loading Overlay Component
 * 
 * A client-side loading overlay that appears during initial page load
 * and smoothly fades out once the page is ready. Uses proper React
 * state management to avoid hydration errors.
 * 
 * @component
 * @returns {JSX.Element} Loading overlay component
 */
const LoadingOverlay = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the loading overlay after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before hiding to ensure smooth transition
      setTimeout(() => setIsVisible(false), 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-900"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 font-medium"
            >
              Loading amazing things...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay; 