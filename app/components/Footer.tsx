"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { getPlatformMeta, PlatformType } from "../data/platforms";

/**
 * Footer Component
 * 
 * A modern footer with social links, platform integration, and smooth animations.
 * Features:
 * - Social media and research platform links using centralized configuration
 * - Smooth hover animations
 * - Responsive design
 * - Glass morphism effects
 * 
 * @component
 * @returns {JSX.Element} Footer component
 */
const Footer = () => {
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
    <footer className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-t border-slate-200/50 dark:border-slate-700/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Y</span>
                </div>
                <span className="font-bold text-xl gradient-text">Klea Dev</span>
              </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md">
              AI Systems Engineer & Full-Stack Developer passionate about creating intelligent, 
              scalable solutions that bridge the gap between cutting-edge research and practical applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "About", href: "#about" },
                { name: "Projects", href: "/projects" },
                { name: "Research", href: "#research" },
                { name: "Contact", href: "#contact" },
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
              
          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Connect & Research</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => {
                const platformMeta = getPlatformMeta(social.platform);
                const Icon = getSocialLinkIcon(social.platform);
                
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-primary transition-all duration-200 relative group`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    title={social.label}
                  >
                    {Icon ? (
                      <Icon className="w-5 h-5" />
                    ) : (
                      <span className="text-lg">{platformMeta.icon}</span>
                    )}
                    {/* Custom tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {social.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
              </div>
                  </motion.a>
                );
              })}
              </div>
          </div>
          </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200/50 dark:border-slate-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © 2024 Klea Dev. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-slate-500 dark:text-slate-500 text-sm">
              Built with ❤️ using Next.js & TypeScript
              </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 