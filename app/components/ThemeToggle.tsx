"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

/**
 * Theme Toggle Component
 * 
 * A beautiful animated theme toggle with system preference detection.
 * Features:
 * - Smooth animations between light/dark modes
 * - System preference detection and fallback
 * - Persistent theme storage
 * - Hover effects and micro-interactions
 * 
 * @component
 * @returns {JSX.Element} Theme toggle component
 */
const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Get stored theme preference
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      // Default to system preference
      setTheme('system');
      applyTheme('system');
    }
  }, []);

  // Apply theme to document
  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  };

  // Handle theme change
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
    );
  }

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  return (
    <motion.div
      className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {themes.map(({ value, icon: Icon, label }) => (
      <motion.button
          key={value}
          onClick={() => handleThemeChange(value)}
          className={`relative p-2 rounded-full transition-all duration-200 ${
            theme === value
              ? 'bg-white dark:bg-slate-700 text-primary shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary'
          }`}
          whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
          title={`Switch to ${label} mode`}
            >
          <Icon className="w-4 h-4" />
          
          {/* Active indicator */}
          {theme === value && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              layoutId="activeTheme"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          
          {/* Hover glow effect */}
            <motion.div
            className="absolute inset-0 rounded-full bg-primary/10 opacity-0"
            whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
          />
      </motion.button>
      ))}

      {/* Theme indicator tooltip */}
        <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none"
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        >
        {themes.find(t => t.value === theme)?.label} Mode
        </motion.div>
    </motion.div>
  );
};

export default ThemeToggle; 