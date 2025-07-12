"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { getPlatformMeta, PlatformType } from "../data/platforms";
import ThemeToggle from "./ThemeToggle";
import TouchGestures from "./TouchGestures";

/**
 * Navigation Component
 * 
 * A modern, responsive navigation bar with smooth animations and glass morphism effects.
 * Features:
 * - Sticky header with background blur
 * - Mobile-responsive hamburger menu with custom animated hamburger icon
 * - Smooth scroll navigation
 * - Social media links including research platforms using centralized configuration
 * - Animated logo and menu items
 * 
 * @component
 * @returns {JSX.Element} Navigation component
 */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation - either scroll to section or navigate to page
  const handleNavigation = (href: string) => {
    if (href.startsWith('/')) {
      // Navigate to page using Next.js router
      router.push(href);
      setIsOpen(false);
    } else {
      // Smooth scroll to section
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      } else {
        // If we're not on the homepage, navigate to homepage first
        if (pathname !== '/') {
          router.push('/');
          // Wait a bit then scroll to section
          setTimeout(() => {
            const element = document.getElementById(href);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        } else {
          // If we're on homepage but element not found, scroll to top
          window.scrollTo({ top: 0, behavior: "smooth" });
          setIsOpen(false);
        }
      }
    }
  };

  // Add this helper for delayed close
  const closeMenu = () => {
    setIsOpen(false);
  };



  // Navigation items with their respective sections
  const navItems = [
    { name: "About", href: "about" },
    { name: "Projects", href: "projects" },
    { name: "Demos", href: "/live-demos" },
    { name: "Research", href: "research" },
    { name: "Contact", href: "contact" },
  ];

  // Social media and research platform links using centralized configuration
  const socialLinks = [
    { platform: 'GitHub' as PlatformType, href: "https://github.com/klea-dev", label: "GitHub" },
    { platform: 'LinkedIn' as PlatformType, href: "https://linkedin.com/in/klea-dev", label: "LinkedIn" },
    { platform: 'Email' as PlatformType, href: "mailto:kleaSCM@gmail.com", label: "Email" },
    { platform: 'Kaggle' as PlatformType, href: "https://kaggle.com/klea-dev", label: "Kaggle" },
    { platform: 'Zenodo' as PlatformType, href: "https://zenodo.org/search?q=creator:%22Klea%20Dev%22", label: "Zenodo" },
    { platform: 'OSF' as PlatformType, href: "https://osf.io/search/?q=klea-dev", label: "OSF" },
    { platform: 'Jupyter' as PlatformType, href: "https://jupyter.org/", label: "Jupyter" },
  ];

  // Get platform metadata for social links
  const getSocialLinkIcon = (platform: PlatformType) => {
    if (platform === 'LinkedIn') return Linkedin;
    if (platform === 'Email') return Mail;
    if (platform === 'GitHub') return Github;
    return null; // For platforms without Lucide icons, we'll use the emoji from platform config
  };

  // Custom animated hamburger menu component
  const AnimatedHamburger = () => (
    <motion.button
      className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
      onClick={() => setIsOpen(!isOpen)}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Animated hamburger lines */}
      <motion.span
        className="absolute w-6 h-0.5 bg-slate-600 dark:bg-slate-400 rounded-full origin-center"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -6,
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1] // Custom easing for smoother animation
        }}
      />
      <motion.span
        className="absolute w-6 h-0.5 bg-slate-600 dark:bg-slate-400 rounded-full"
        animate={{
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0 : 1,
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.4, 0, 0.2, 1]
        }}
      />
      <motion.span
        className="absolute w-6 h-0.5 bg-slate-600 dark:bg-slate-400 rounded-full origin-center"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 6,
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1]
        }}
      />
      
      {/* Subtle hover effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.button
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                if (pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  router.push('/');
                }
                setIsOpen(false);
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="font-bold text-xl gradient-text">Klea Dev</span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  className={`nav-link font-medium ${
                    (item.href === "/" && pathname === "/") ||
                    (item.href === "/projects" && pathname === "/projects") ||
                    (item.href === "/live-demos" && pathname === "/live-demos")
                      ? "text-primary"
                      : ""
                  }`}
                  onClick={() => handleNavigation(item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Social Links & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <ThemeToggle />
              </motion.div>

              {/* Social Media Links */}
              <div className="flex items-center space-x-3">
                {socialLinks.map((social, index) => {
                  const platformMeta = getPlatformMeta(social.platform);
                  const Icon = getSocialLinkIcon(social.platform);
                  
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors duration-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      title={social.label}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5" />
                      ) : (
                        <span className="text-lg">{platformMeta.icon}</span>
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.button
                className="btn-primary text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation("contact")}
              >
                Get In Touch
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <AnimatedHamburger />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <TouchGestures
            onSwipeDown={closeMenu}
            onSwipeLeft={closeMenu}
            onSwipeRight={closeMenu}
          >
            <motion.div
              className="mobile-menu md:hidden"
              data-open={isOpen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ 
                // Ensure overlay blocks all pointer events when open
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 40
              }}
            >
              {/* Backdrop with enhanced blur */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: 'auto' }}
              />

              {/* Menu Content with smooth animations */}
              <motion.div
                className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-2xl mobile-safe"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.4, 0, 0.2, 1]
                }}
                onClick={e => e.stopPropagation()} // Prevent backdrop click from closing menu when clicking inside
              >
              <div className="container-custom py-8">
                {/* Navigation Items with enhanced styling */}
                <div className="space-y-2 mb-8">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      className="mobile-nav-item group hover:text-indigo-500 focus:text-indigo-500 transition-colors duration-200"
                      onClick={() => {
                        handleNavigation(item.href);
                        setTimeout(closeMenu, 200); // Delay close for exit animation
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      whileHover={{ x: 5, scale: 1.03 }}
                      whileFocus={{ x: 5, scale: 1.03 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="flex items-center">
                        <motion.span
                          className="w-2 h-2 bg-primary rounded-full mr-4"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1.2, opacity: 1 }}
                          whileFocus={{ scale: 1.2, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                        {item.name}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Theme Toggle for Mobile */}
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.2,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <ThemeToggle />
                </motion.div>

                {/* Social Links with enhanced styling */}
                <div className="flex items-center justify-center space-x-8 mb-8">
                  {socialLinks.map((social, index) => {
                    const platformMeta = getPlatformMeta(social.platform);
                    const Icon = getSocialLinkIcon(social.platform);
                    
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-full transition-all duration-200 group"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: index * 0.1 + 0.3,
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          y: -5,
                          rotate: 5
                        }}
                        whileTap={{ scale: 0.95 }}
                        title={social.label}
                      >
                        {Icon ? (
                          <Icon className="w-6 h-6" />
                        ) : (
                          <span className="text-xl">{platformMeta.icon}</span>
                        )}
                        
                        {/* Hover glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1.5 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.a>
                    );
                  })}
                </div>

                {/* Mobile CTA with enhanced styling */}
                <motion.button
                  className="btn-primary w-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl"
                  onClick={() => handleNavigation("contact")}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.6,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get In Touch ✨
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </TouchGestures>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 