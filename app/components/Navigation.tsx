"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { getPlatformMeta, PlatformType } from "../data/platforms";
import ThemeToggle from "./ThemeToggle";
import TouchGestures from "./TouchGestures";
import OverleafDropdown from "./OverleafDropdown";

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
    console.log('Navigation clicked:', href); // Debug log
    
    if (href.startsWith('/')) {
      // Navigate to page using Next.js router
      console.log('Navigating to page:', href);
      router.push(href);
      setIsOpen(false);
    } else {
      // Smooth scroll to section
      console.log('Scrolling to section:', href);
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

  // Manage body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);



  // Navigation items with their respective sections
  const navItems = [
    { name: "About", href: "about" },
    { name: "Projects", href: "/projects" },
    { name: "Demos", href: "/live-demos" },
    { name: "Games", href: "/games" },
    { name: "Research", href: "/research" },
    { name: "Contact", href: "contact" },
  ];

  // Social media and research platform links using centralized configuration
  const socialLinks = [
    { platform: 'GitHub' as PlatformType, href: "https://github.com/KleaSCM", label: "GitHub" },
    { platform: 'LinkedIn' as PlatformType, href: "https://linkedin.com/in/klea-dev", label: "LinkedIn" },
    { platform: 'Email' as PlatformType, href: "mailto:kleascm@gmail.com", label: "Email" },
    { platform: 'Kaggle' as PlatformType, href: "https://www.kaggle.com/kleascm", label: "Kaggle" },
    { platform: 'OSF' as PlatformType, href: "https://osf.io/8e2tb", label: "OSF" },
    { platform: 'ORCID' as PlatformType, href: "https://orcid.org/0009-0009-8748-1946", label: "ORCID" },
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
      className="md:hidden relative w-12 h-12 flex flex-col justify-center items-center group bg-white/10 dark:bg-slate-800/10 rounded-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm"
      onClick={() => setIsOpen(!isOpen)}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      style={{ minHeight: '48px', minWidth: '48px' }}
    >
      {/* Animated hamburger lines */}
      <motion.span
        className="absolute w-7 h-0.5 bg-slate-600 dark:bg-slate-400 rounded-full origin-center"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -7,
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1] // Custom easing for smoother animation
        }}
      />
      <motion.span
        className="absolute w-7 h-0.5 bg-slate-600 dark:bg-slate-400 rounded-full"
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
        className="absolute w-7 h-0.5 bg-slate-600 dark:bg-slate-400 rounded-full origin-center"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 7,
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1]
        }}
      />
      
      {/* Enhanced touch feedback */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-primary/20 opacity-0 group-hover:opacity-100 group-active:opacity-100"
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
                
                {/* Overleaf Papers Dropdown */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <OverleafDropdown />
                </motion.div>
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
              zIndex: 9999,
              pointerEvents: 'auto'
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
                style={{ 
                  pointerEvents: 'auto',
                  zIndex: 1
                }}
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
                style={{ 
                  zIndex: 2,
                  pointerEvents: 'auto'
                }}
              >
              <div className="container-custom py-8">
                {/* Navigation Items with enhanced styling */}
                <div className="space-y-3 mb-8">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      className="w-full text-left px-6 py-4 text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200 group"
                      onClick={() => {
                        handleNavigation(item.href);
                        setTimeout(closeMenu, 300); // Longer delay for better UX
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileFocus={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ minHeight: '56px' }}
                    >
                      <span className="flex items-center">
                        <motion.span
                          className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1.2, opacity: 1 }}
                          whileFocus={{ scale: 1.2, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                        <span className="font-semibold">{item.name}</span>
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
                <div className="flex items-center justify-center space-x-6 mb-8">
                  {socialLinks.map((social, index) => {
                    const platformMeta = getPlatformMeta(social.platform);
                    const Icon = getSocialLinkIcon(social.platform);
                    
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-5 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-full transition-all duration-200 group relative"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: index * 0.1 + 0.3,
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          y: -3
                        }}
                        whileTap={{ scale: 0.95 }}
                        title={social.label}
                        style={{ minWidth: '56px', minHeight: '56px' }}
                      >
                        {Icon ? (
                          <Icon className="w-7 h-7" />
                        ) : (
                          <span className="text-2xl">{platformMeta.icon}</span>
                        )}
                        
                        {/* Enhanced touch feedback */}
                        <motion.div
                          className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.a>
                    );
                  })}
                  
                  {/* Overleaf Papers Dropdown for Mobile */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: 0.9,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <OverleafDropdown />
                  </motion.div>
                </div>

                {/* Mobile CTA with enhanced styling */}
                <motion.button
                  className="btn-primary w-full py-5 text-lg font-semibold shadow-lg hover:shadow-xl"
                  onClick={() => {
                    handleNavigation("contact");
                    setTimeout(closeMenu, 300);
                  }}
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
                  style={{ minHeight: '60px' }}
                >
                  Get In Touch ✨
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 