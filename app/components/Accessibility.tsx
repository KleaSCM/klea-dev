"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Accessibility Component
 * 
 * Provides comprehensive accessibility features:
 * - Screen reader optimization
 * - Keyboard navigation
 * - Focus management
 * - ARIA labels and roles
 * - Skip to content links
 * - High contrast mode support
 * 
 * @component
 * @returns {JSX.Element} Accessibility wrapper
 */
interface AccessibilityProps {
  children: React.ReactNode;
  skipToContent?: boolean;
  highContrast?: boolean;
  reducedMotion?: boolean;
  className?: string;
}

const Accessibility = ({ 
  children, 
  skipToContent = true,
  highContrast = false,
  reducedMotion = false,
  className = ""
}: AccessibilityProps) => {
  const [isHighContrast, setIsHighContrast] = useState(highContrast);
  const [isReducedMotion, setIsReducedMotion] = useState(reducedMotion);
  const [focusVisible, setFocusVisible] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Detect user's motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect user's contrast preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = () => setIsHighContrast(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Focus management
  useEffect(() => {
    const handleFocusIn = () => setFocusVisible(true);
    const handleFocusOut = () => setFocusVisible(false);

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Skip to content functionality
  const handleSkipToContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation helpers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Escape key to close modals/menus
    if (e.key === 'Escape') {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && activeElement.blur) {
        activeElement.blur();
      }
    }

    // Enter/Space for button activation
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
        e.preventDefault();
        target.click();
      }
    }
  };

  return (
    <div 
      className={`accessibility-wrapper ${className}`}
      onKeyDown={handleKeyDown}
      style={{
        '--high-contrast': isHighContrast ? '1' : '0',
        '--reduced-motion': isReducedMotion ? '1' : '0',
      } as React.CSSProperties}
    >
            {/* Skip to content link - positioned off-screen by default */}
      {skipToContent && (
        <a
          href="#main-content"
          className="skip-to-content"
          onClick={handleSkipToContent}
        >
          Skip to content
        </a>
      )}

      {/* Main content with accessibility attributes */}
      <main
        ref={mainContentRef}
        id="main-content"
        tabIndex={-1}
        role="main"
        aria-label="Main content"
        className={`main-content ${isHighContrast ? 'high-contrast' : ''} ${isReducedMotion ? 'reduced-motion' : ''}`}
      >
        {children}
      </main>

      {/* Accessibility announcement region */}
      <div
        id="announcements"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      />

      {/* Focus indicator styles */}
      <style jsx>{`
        .accessibility-wrapper {
          --focus-ring: ${isHighContrast ? '3px solid #ffff00' : '2px solid var(--primary)'};
          --focus-ring-offset: ${isHighContrast ? '2px' : '1px'};
        }

        .main-content:focus {
          outline: var(--focus-ring);
          outline-offset: var(--focus-ring-offset);
        }

        .high-contrast {
          --text-color: #ffffff;
          --background-color: #000000;
          --border-color: #ffffff;
          --link-color: #ffff00;
        }

        .reduced-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        .skip-to-content {
          position: absolute;
          top: -40px;
          left: 6px;
          background: var(--primary);
          color: white;
          padding: 8px 16px;
          text-decoration: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          z-index: 10000;
          transition: top 0.3s ease;
        }

        .skip-to-content:focus {
          top: 6px;
          outline: var(--focus-ring);
          outline-offset: var(--focus-ring-offset);
        }

        /* Screen reader only class */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  );
};

export default Accessibility; 