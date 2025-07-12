"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { getPlatformMeta, PlatformType } from "../data/platforms";

/**
 * Navigation Component
 * 
 * A modern, responsive navigation bar with smooth animations and glass morphism effects.
 * Features:
 * - Sticky header with background blur
 * - Mobile-responsive hamburger menu
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

  // Navigation items with their respective sections
  const navItems = [
    { name: "Home", href: pathname === "/" ? "home" : "/" },
    { name: "About", href: "about" },
    { name: "Projects", href: "/projects" },
    { name: "Research", href: "/research" },
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
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="font-bold text-xl gradient-text">Klea Dev</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  className={`nav-link font-medium ${
                    (item.href === "/" && pathname === "/") ||
                    (item.href === "/projects" && pathname === "/projects")
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
            <motion.button
              className="md:hidden p-2 text-slate-600 dark:text-slate-400"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container-custom py-6">
                {/* Navigation Items */}
                <div className="space-y-4 mb-8">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      className="block w-full text-left py-3 px-4 text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors duration-200"
                      onClick={() => handleNavigation(item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center space-x-6 mb-6">
                  {socialLinks.map((social, index) => {
                    const platformMeta = getPlatformMeta(social.platform);
                    const Icon = getSocialLinkIcon(social.platform);
                    
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors duration-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        title={social.label}
                      >
                        {Icon ? (
                          <Icon className="w-6 h-6" />
                        ) : (
                          <span className="text-xl">{platformMeta.icon}</span>
                        )}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Mobile CTA */}
                <motion.button
                  className="btn-primary w-full"
                  onClick={() => handleNavigation("contact")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Get In Touch
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