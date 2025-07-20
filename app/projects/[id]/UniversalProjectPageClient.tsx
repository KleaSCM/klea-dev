/**
 * Universal Project Page Client
 * 
 * A truly universal renderer that can handle ANY template structure
 * Adapts to whatever sections exist in the template
 * 
 * Theory: Dynamic rendering that adapts to any template structure
 * Code: Universal components that work with any content format
 * Results: One renderer that works with all possible templates
 * Conclusion: Truly universal template system
 */

'use client';

import { motion } from 'framer-motion';
import { 
  Github, ExternalLink, Star, Code, Layers, Database, Wrench, Globe,
  Target, AlertTriangle, CheckCircle, Network, Cpu, BarChart3, 
  FileText, MessageSquare, ArrowRight
} from 'lucide-react';
import { type GitHubProject } from '../../services/github';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Helper function to clean markdown while preserving bold formatting
const cleanMarkdown = (text: any): string => {
  // Ensure text is a string
  if (typeof text !== 'string') {
    return String(text);
  }
  
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **text** to <strong>text</strong>
    .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Convert *text* to <em>text</em>
};

// Helper function to render markdown content
const renderMarkdown = (text: string) => {
  const cleanedText = cleanMarkdown(text);
  return <span dangerouslySetInnerHTML={{ __html: cleanedText }} />;
};

// Get color scheme for different sections
const getSectionColors = (sectionName: string) => {
  const colors = {
    'Languages': {
      bg: 'from-blue-500/20 to-blue-600/10',
      text: 'text-blue-600',
      border: 'border-blue-500/20',
      hover: 'hover:from-blue-500/30 hover:to-blue-600/20'
    },
    'Frameworks & Libraries': {
      bg: 'from-purple-500/20 to-purple-600/10',
      text: 'text-purple-600',
      border: 'border-purple-500/20',
      hover: 'hover:from-purple-500/30 hover:to-purple-600/20'
    },
    'Databases & Storage': {
      bg: 'from-green-500/20 to-green-600/10',
      text: 'text-green-600',
      border: 'border-green-500/20',
      hover: 'hover:from-green-500/30 hover:to-green-600/20'
    },
    'Tools & Platforms': {
      bg: 'from-orange-500/20 to-orange-600/10',
      text: 'text-orange-600',
      border: 'border-orange-500/20',
      hover: 'hover:from-orange-500/30 hover:to-orange-600/20'
    }
  };
  
  return colors[sectionName as keyof typeof colors] || {
    bg: 'from-secondary/20 to-secondary/10',
    text: 'text-secondary',
    border: 'border-secondary/20',
    hover: 'hover:from-secondary/30 hover:to-secondary/20'
  };
};

// Helper function to get icon for subsections
const getSectionIcon = (subsectionName: string) => {
  if (subsectionName.toLowerCase().includes('challenge')) {
    return <AlertTriangle className="w-4 h-4" />;
  }
  if (subsectionName.toLowerCase().includes('goal')) {
    return <Target className="w-4 h-4" />;
  }
  return <Code className="w-4 h-4" />; // Default icon for other subsections
};

// Universal section renderer
const UniversalSection = ({ 
  sectionName, 
  sectionContent, 
  icon: Icon = FileText 
}: { 
  sectionName: string; 
  sectionContent: any; 
  icon?: any;
}) => {
  if (!sectionContent) return null;

  // Clean section name (remove emoji)
  const cleanSectionName = sectionName.replace(/^[^\w\s]*/, '').trim();

  return (
    <section className="section bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container-custom">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="flex items-center gap-3 mb-8" variants={fadeInUp}>
            <Icon className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              {cleanSectionName}
            </h2>
          </motion.div>

          <motion.div className="max-w-6xl mx-auto" variants={fadeInUp}>
            {renderSectionContent(sectionContent, cleanSectionName)}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Render section content based on its type
const renderSectionContent = (content: any, sectionName: string) => {
  // Special handling for challenges and goals - render as bullet points
  if (sectionName.toLowerCase().includes('challenge') || sectionName.toLowerCase().includes('goal')) {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-3">
          {content.map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full mt-2"></span>
              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {renderMarkdown(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }
  }

  // Special handling for core components - render as beautiful modern cards
  if (sectionName.toLowerCase().includes('core components')) {
    if (Array.isArray(content)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => {
            // Extract emoji and title from the item
            const emojiMatch = item.match(/^([🧬💭🎯📝🧪])/);
            const emoji = emojiMatch ? emojiMatch[1] : '⚡';
            const title = item.replace(/^[🧬💭🎯📝🧪]\s*/, '').split(':')[0];
            const description = item.split(':')[1] || '';
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary transition-colors duration-300">
                      <span dangerouslySetInnerHTML={{ __html: cleanMarkdown(title) }} />
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for technology stack - render as beautiful colored badges
  if (sectionName.toLowerCase().includes('technology stack')) {
    if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-6">
          {Object.entries(content).map(([subsectionName, subsectionContent]) => (
            <div key={subsectionName} className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {subsectionName}
              </h4>
              <div className="flex flex-wrap gap-3">
                {Array.isArray(subsectionContent) && subsectionContent.map((item, index) => {
                  const colors = getSectionColors(subsectionName);
                  return (
                    <span 
                      key={index}
                      className={`px-4 py-2 bg-gradient-to-r ${colors.bg} ${colors.text} rounded-full text-sm font-medium border ${colors.border} ${colors.hover} transition-all duration-200 shadow-sm`}
                    >
                      {renderMarkdown(item)}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  // Special handling for core components - render as beautiful modern cards
  if (sectionName.toLowerCase().includes('core components')) {
    if (Array.isArray(content)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => {
            // Extract emoji and title from the item
            const emojiMatch = item.match(/^([🧬💭🎯📝🧪])/);
            const emoji = emojiMatch ? emojiMatch[1] : '⚡';
            const title = item.replace(/^[🧬💭🎯📝🧪]\s*/, '').split(':')[0];
            const description = item.split(':')[1] || '';
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary transition-colors duration-300">
                      {title}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for design patterns - render as beautiful modern cards with dot points
  if (sectionName.toLowerCase().includes('design patterns')) {
    if (Array.isArray(content)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => {
            // Extract title and description from the item
            const title = item.split(':')[0];
            const description = item.split(':')[1] || '';
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-primary transition-colors duration-300">
                      <span dangerouslySetInnerHTML={{ __html: cleanMarkdown(title) }} />
                    </h5>
                    <div className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full mt-2"></span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for key metrics - render as beautiful metric cards
  if (sectionName.toLowerCase().includes('key metrics')) {
    if (Array.isArray(content)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => {
            // Extract metric name, value, and description
            const parts = item.split(':');
            const metricName = parts[0]?.replace(/\*\*/g, '') || '';
            const valueAndDesc = parts.slice(1).join(':').split(' - ');
            const value = valueAndDesc[0] || '';
            const description = valueAndDesc[1] || '';
            
            // Get appropriate icon based on metric name
            const getMetricIcon = (name: string) => {
              const lowerName = name.toLowerCase();
              if (lowerName.includes('speed') || lowerName.includes('processing')) {
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 2v4"/>
                    <path d="M12 18v4"/>
                    <path d="m4.93 4.93 2.83 2.83"/>
                    <path d="m16.24 16.24 2.83 2.83"/>
                    <path d="M2 12h4"/>
                    <path d="M18 12h4"/>
                    <path d="m4.93 19.07 2.83-2.83"/>
                    <path d="m16.24 7.76 2.83-2.83"/>
                  </svg>
                );
              } else if (lowerName.includes('latency') || lowerName.includes('time')) {
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                );
              } else if (lowerName.includes('memory') || lowerName.includes('usage')) {
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <rect width="20" height="14" x="2" y="3" rx="2" ry="2"/>
                    <line x1="8" x2="16" y1="21" y2="21"/>
                    <line x1="12" x2="12" y1="17" y2="21"/>
                  </svg>
                );
              } else if (lowerName.includes('dimension') || lowerName.includes('space')) {
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M3 3h18v18H3z"/>
                    <path d="M3 9h18"/>
                    <path d="M9 21V9"/>
                  </svg>
                );
              } else if (lowerName.includes('layer') || lowerName.includes('neural')) {
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M9 11H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"/>
                    <path d="M15 11h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"/>
                    <path d="M9 21H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h4"/>
                    <path d="M15 21h4a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4"/>
                    <path d="M9 16h6"/>
                  </svg>
                );
              } else if (lowerName.includes('attention') || lowerName.includes('head')) {
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6"/>
                    <path d="M12 17v6"/>
                    <path d="M4.22 4.22l4.24 4.24"/>
                    <path d="M15.54 15.54l4.24 4.24"/>
                    <path d="M1 12h6"/>
                    <path d="M17 12h6"/>
                    <path d="M4.22 19.78l4.24-4.24"/>
                    <path d="M15.54 8.46l4.24-4.24"/>
                  </svg>
                );
              } else {
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M3 3v18h18"/>
                    <path d="M18 17V9"/>
                    <path d="M13 17V5"/>
                    <path d="M8 17v-3"/>
                  </svg>
                );
              }
            };
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    {getMetricIcon(metricName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary transition-colors duration-300">
                      {metricName}
                    </h5>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {value}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for benchmarks - render as beautiful progress bars and gauges
  if (sectionName.toLowerCase().includes('benchmarks')) {
    if (Array.isArray(content)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.map((item, index) => {
            // Extract benchmark name, value, and description
            const parts = item.split(':');
            const benchmarkName = parts[0]?.replace(/\*\*/g, '') || '';
            const valueAndDesc = parts.slice(1).join(':').split(' - ');
            const value = valueAndDesc[0] || '';
            const description = valueAndDesc[1] || '';
            
            // Parse numeric values for progress bars
            const parseValue = (val: string) => {
              const numMatch = val.match(/(\d+(?:\.\d+)?)/);
              const percentMatch = val.match(/(\d+(?:\.\d+)?)%/);
              const timeMatch = val.match(/>(\d+)/);
              
              if (percentMatch) return { value: parseFloat(percentMatch[1]), max: 100, type: 'percent' };
              if (numMatch && val.includes('/')) {
                const [num, denom] = val.split('/').map(n => parseInt(n.match(/\d+/)?.[0] || '0'));
                return { value: num, max: denom, type: 'fraction' };
              }
              if (timeMatch) return { value: parseInt(timeMatch[1]), max: 600, type: 'time' };
              if (numMatch) return { value: parseFloat(numMatch[1]), max: 1, type: 'decimal' };
              return { value: 0, max: 100, type: 'unknown' };
            };
            
            const parsed = parseValue(value);
            const percentage = (parsed.value / parsed.max) * 100;
            
            // Get color based on performance level
            const getColor = (percent: number, type: string) => {
              if (type === 'time') {
                return percent > 50 ? 'from-green-500 to-green-600' : 'from-yellow-500 to-orange-500';
              }
              if (percent >= 90) return 'from-green-500 to-green-600';
              if (percent >= 70) return 'from-blue-500 to-blue-600';
              if (percent >= 50) return 'from-yellow-500 to-orange-500';
              return 'from-red-500 to-red-600';
            };
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300">
                      {benchmarkName}
                    </h5>
                    <div className="text-2xl font-bold text-primary">
                      {value}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Performance</span>
                      <span className="font-bold text-primary animate-pulse">{percentage.toFixed(1)}%</span>
                    </div>
                    
                    {/* Animated progress bar container */}
                    <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                      {/* Main progress bar with gradient animation */}
                      <div 
                        className={`h-full bg-gradient-to-r ${getColor(percentage, parsed.type)} transition-all duration-2000 ease-out relative overflow-hidden`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" 
                             style={{ 
                               animation: 'shimmer 2s infinite',
                               background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                               backgroundSize: '200% 100%'
                             }}
                        />
                        
                        {/* Pulsing glow effect */}
                        <div className={`absolute inset-0 rounded-full blur-sm opacity-50 animate-pulse`}
                             style={{
                               background: `linear-gradient(90deg, ${getColor(percentage, parsed.type).split(' ')[1]}, ${getColor(percentage, parsed.type).split(' ')[2]})`,
                               animation: 'glow 1.5s ease-in-out infinite alternate'
                             }}
                        />
                        
                        {/* Moving particles effect */}
                        <div className="absolute inset-0 overflow-hidden">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 bg-white/40 rounded-full animate-bounce"
                              style={{
                                left: `${20 + i * 30}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: '2s'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Progress bar border glow */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent"
                           style={{
                             boxShadow: `0 0 10px ${getColor(percentage, parsed.type).split(' ')[1].replace('from-', '').replace('-500', '-400')}`,
                             animation: 'borderGlow 2s ease-in-out infinite alternate'
                           }}
                      />
                    </div>
                    
                    {/* Animated performance indicator */}
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full transition-all duration-500 transform hover:scale-125 ${
                            i < Math.floor(percentage / 20) 
                              ? 'bg-gradient-to-r from-primary to-primary/80 shadow-lg animate-pulse' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '1s'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {description}
                  </p>
                  
                  {/* Performance indicator dots */}
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i < Math.floor(percentage / 20) 
                            ? 'bg-gradient-to-r from-primary to-primary/80' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for code snippets - render as beautiful code blocks with syntax highlighting
  if (sectionName.toLowerCase().includes('code snippets')) {
    if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-6">
          {Object.entries(content).map(([snippetName, snippetData], index) => {
            // Handle different snippet data formats
            let codeBlock = '';
            let explanation = '';
            let language = 'python';
            
            if (Array.isArray(snippetData)) {
              // If it's an array, look for objects with code and explanation
              const codeObj = snippetData.find(item => typeof item === 'object' && item !== null) as any;
              if (codeObj) {
                codeBlock = codeObj.code || codeObj.value || '';
                explanation = codeObj.explanation || codeObj.description || '';
                language = codeObj.language || 'python';
              }
            } else if (typeof snippetData === 'object' && snippetData !== null) {
              // If it's a direct object
              const snippetObj = snippetData as any;
              codeBlock = snippetObj.code || snippetObj.value || '';
              explanation = snippetObj.explanation || snippetObj.description || '';
              language = snippetObj.language || 'python';
            } else if (typeof snippetData === 'string') {
              // If it's a string, try to extract code blocks from markdown
              const codeBlockMatch = snippetData.match(/```(\w+)?\n([\s\S]*?)```/);
              if (codeBlockMatch) {
                language = codeBlockMatch[1] || 'python';
                codeBlock = codeBlockMatch[2].trim();
                
                // Extract explanation after the code block
                const afterCode = snippetData.substring(codeBlockMatch.index! + codeBlockMatch[0].length);
                const explanationMatch = afterCode.match(/Explanation:\s*(.*)/s);
                if (explanationMatch) {
                  explanation = explanationMatch[1].trim();
                }
              } else {
                // If no code block found, treat the whole string as code
                codeBlock = snippetData;
              }
            }
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300">
                      {snippetName}
                    </h5>
                  </div>
                  
                  {codeBlock && (
                    <div className="relative">
                      <div className="absolute top-3 right-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {language}
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed border border-gray-700">
                        <code>{codeBlock}</code>
                      </pre>
                    </div>
                  )}
                  
                  {explanation && (
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {explanation}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for design decisions - render as beautiful decision cards with icons
  if (sectionName.toLowerCase().includes('design decisions')) {
    if (Array.isArray(content)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.map((item, index) => {
            const title = item.split(':')[0];
            const description = item.split(':')[1] || '';
            
            // Get appropriate icon based on title
            const getDecisionIcon = (title: string) => {
              if (title.toLowerCase().includes('transformer')) return '🧠';
              if (title.toLowerCase().includes('trait space')) return '📊';
              if (title.toLowerCase().includes('protection')) return '🛡️';
              if (title.toLowerCase().includes('stability')) return '⚖️';
              if (title.toLowerCase().includes('real-time')) return '⚡';
              return '💡';
            };
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-indigo-50/90 to-indigo-100/60 dark:from-indigo-900/90 dark:to-indigo-800/60 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-indigo-400/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {getDecisionIcon(title)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                      {renderMarkdown(title)}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for lessons learned - render as beautiful lesson cards with checkmarks
  if (sectionName.toLowerCase().includes('lessons learned')) {
    if (Array.isArray(content)) {
      return (
        <div className="space-y-4">
          {content.map((item, index) => {
            const title = item.split(':')[0];
            const description = item.split(':')[1] || '';
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-emerald-50/90 to-emerald-100/60 dark:from-emerald-900/90 dark:to-emerald-800/60 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-102 transition-all duration-300 hover:border-emerald-400/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {renderMarkdown(title)}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for future plans - render as beautiful roadmap cards with arrows
  if (sectionName.toLowerCase().includes('future plans')) {
    if (Array.isArray(content)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => {
            const title = item.split(':')[0];
            const description = item.split(':')[1] || '';
            
            // Get appropriate icon based on title
            const getFutureIcon = (title: string) => {
              if (title.toLowerCase().includes('multi-modal')) return '🎨';
              if (title.toLowerCase().includes('social')) return '🤝';
              if (title.toLowerCase().includes('emotional')) return '💝';
              if (title.toLowerCase().includes('memory')) return '🧠';
              if (title.toLowerCase().includes('ethical')) return '⚖️';
              return '🚀';
            };
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-purple-50/90 to-purple-100/60 dark:from-purple-900/90 dark:to-purple-800/60 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-purple-400/30"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {getFutureIcon(title)}
                    </div>
                    <div className="text-purple-500 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                      {renderMarkdown(title)}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for prerequisites - render as beautiful requirement badges
  if (sectionName.toLowerCase().includes('prerequisites')) {
    if (Array.isArray(content)) {
      return (
        <div className="flex flex-wrap gap-3">
          {content.map((item, index) => {
            // Clean up the item text
            const cleanItem = item.replace(/\*\*/g, '').trim();
            
            // Get appropriate color based on item type
            const getPrerequisiteColor = (text: string) => {
              const lowerText = text.toLowerCase();
              if (lowerText.includes('python')) return 'from-blue-500/20 to-blue-600/10 text-blue-600 border-blue-500/20 hover:from-blue-500/30 hover:to-blue-600/20';
              if (lowerText.includes('gpu') || lowerText.includes('cuda')) return 'from-purple-500/20 to-purple-600/10 text-purple-600 border-purple-500/20 hover:from-purple-500/30 hover:to-purple-600/20';
              if (lowerText.includes('ram') || lowerText.includes('memory')) return 'from-green-500/20 to-green-600/10 text-green-600 border-green-500/20 hover:from-green-500/30 hover:to-green-600/20';
              if (lowerText.includes('disk') || lowerText.includes('space')) return 'from-orange-500/20 to-orange-600/10 text-orange-600 border-orange-500/20 hover:from-orange-500/30 hover:to-orange-600/20';
              return 'from-primary/20 to-primary/10 text-primary border-primary/20 hover:from-primary/30 hover:to-primary/20';
            };
            
            return (
              <span 
                key={index}
                className={`px-4 py-2 bg-gradient-to-r ${getPrerequisiteColor(cleanItem)} rounded-full text-sm font-medium border transition-all duration-200 shadow-sm`}
              >
                <span>{cleanItem}</span>
              </span>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for installation - render as beautiful code blocks
  if (sectionName.toLowerCase().includes('installation')) {
    if (Array.isArray(content)) {
      return (
        <div className="space-y-4">
          {content.map((item, index) => {
            // Handle different content types
            if (typeof item === 'object' && item !== null) {
              const codeObj = item as any;
              const code = codeObj.code || codeObj.value || '';
              const language = codeObj.language || 'bash';
              const title = codeObj.title || 'Installation Command';
              
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-green-400/30"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5Z"></path>
                          <path d="M2 17l10 5 10-5"></path>
                          <path d="M2 12l10 5 10-5"></path>
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-600 transition-colors duration-300">
                        {title}
                      </h5>
                    </div>
                    
                    {code && (
                      <div className="relative">
                        <div className="absolute top-3 right-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {language}
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            }
            
            // If it's a string, render as a simple badge
            return (
              <span 
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-600 border-green-500/20 hover:from-green-500/30 hover:to-green-600/20 rounded-full text-sm font-medium border transition-all duration-200 shadow-sm"
              >
                {item}
              </span>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for usage - render as beautiful code blocks
  if (sectionName.toLowerCase().includes('usage')) {
    if (Array.isArray(content)) {
      return (
        <div className="space-y-4">
          {content.map((item, index) => {
            // Handle different content types
            if (typeof item === 'object' && item !== null) {
              const codeObj = item as any;
              const code = codeObj.code || codeObj.value || '';
              const language = codeObj.language || 'bash';
              const title = codeObj.title || 'Usage Command';
              
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-400/30"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors duration-300">
                        {title}
                      </h5>
                    </div>
                    
                    {code && (
                      <div className="relative">
                        <div className="absolute top-3 right-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {language}
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            }
            
            // If it's a string, render as a simple badge
            return (
              <span 
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-600 border-blue-500/20 hover:from-blue-500/30 hover:to-blue-600/20 rounded-full text-sm font-medium border transition-all duration-200 shadow-sm"
              >
                {item}
              </span>
            );
          })}
        </div>
      );
    }
  }

  // Special handling for contact - render as beautiful contact cards with icons and animations
  if (sectionName.toLowerCase().includes('contact')) {
    if (Array.isArray(content)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.map((item, index) => {
            // Parse contact item to extract type and value
            const contactText = item.replace(/\*\*/g, '').trim();
            const parts = contactText.split(':');
            const contactType = parts[0]?.trim() || '';
            const contactValue = parts.slice(1).join(':').trim();
            
            // Get appropriate icon and color based on contact type
            const getContactIcon = (type: string) => {
              const lowerType = type.toLowerCase();
              if (lowerType.includes('author')) return '👩‍💻';
              if (lowerType.includes('email')) return '📧';
              if (lowerType.includes('github')) return '🐙';
              if (lowerType.includes('project')) return '🚀';
              if (lowerType.includes('linkedin')) return '💼';
              if (lowerType.includes('twitter')) return '🐦';
              if (lowerType.includes('website')) return '🌐';
              return '📞';
            };
            
            const getContactColor = (type: string) => {
              const lowerType = type.toLowerCase();
              if (lowerType.includes('author')) return 'from-purple-500/20 to-purple-600/10 text-purple-600 border-purple-500/20 hover:from-purple-500/30 hover:to-purple-600/20';
              if (lowerType.includes('email')) return 'from-blue-500/20 to-blue-600/10 text-blue-600 border-blue-500/20 hover:from-blue-500/30 hover:to-blue-600/20';
              if (lowerType.includes('github')) return 'from-gray-500/20 to-gray-600/10 text-gray-600 border-gray-500/20 hover:from-gray-500/30 hover:to-gray-600/20';
              if (lowerType.includes('project')) return 'from-green-500/20 to-green-600/10 text-green-600 border-green-500/20 hover:from-green-500/30 hover:to-green-600/20';
              if (lowerType.includes('linkedin')) return 'from-blue-600/20 to-blue-700/10 text-blue-700 border-blue-600/20 hover:from-blue-600/30 hover:to-blue-700/20';
              if (lowerType.includes('twitter')) return 'from-sky-500/20 to-sky-600/10 text-sky-600 border-sky-500/20 hover:from-sky-500/30 hover:to-sky-600/20';
              if (lowerType.includes('website')) return 'from-indigo-500/20 to-indigo-600/10 text-indigo-600 border-indigo-500/20 hover:from-indigo-500/30 hover:to-indigo-600/20';
              return 'from-primary/20 to-primary/10 text-primary border-primary/20 hover:from-primary/30 hover:to-primary/20';
            };
            
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {getContactIcon(contactType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary transition-colors duration-300">
                      {contactType}
                    </h5>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {contactValue.includes('http') ? (
                        <a 
                          href={contactValue.replace(/\[([^\]]+)\]\(([^)]+)\)/, '$2')} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors duration-200 underline decoration-dotted"
                        >
                          {contactValue.replace(/\[([^\]]+)\]\(([^)]+)\)/, '$1')}
                        </a>
                      ) : (
                        <span>{contactValue}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Floating particles animation */}
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-primary/20 rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 right-4 w-1 h-1 bg-primary/25 rounded-full animate-bounce"></div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // If it's an array, render as badges (for other sections)
  if (Array.isArray(content)) {
    return (
      <div className="flex flex-wrap gap-3">
        {content.map((item, index) => (
          <span 
            key={index}
            className="px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:from-primary/30 hover:to-primary/20 transition-all duration-200 shadow-sm"
          >
              {renderMarkdown(item)}
          </span>
        ))}
      </div>
    );
  }

  // If it's an object with subsections, render as subsections
  if (typeof content === 'object' && content !== null) {
    return (
      <div className="space-y-6">
        {Object.entries(content).map(([subsectionName, subsectionContent]) => (
          <div key={subsectionName} className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <span className="text-primary">{getSectionIcon(subsectionName)}</span>
              <span>{subsectionName}</span>
            </h4>
            {renderSectionContent(subsectionContent, subsectionName)}
          </div>
        ))}
      </div>
    );
  }

  // Default: render as text
    return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
          {renderMarkdown(content)}
      </div>
    );
};

// Hero Section Component
const HeroSection = ({ project, projectDetails }: { project: GitHubProject; projectDetails: any }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center"
        >
          {/* Project badges */}
          <motion.div className="flex flex-wrap justify-center gap-3 mb-6" variants={fadeInUp}>
            {project.category && (
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                {project.category}
              </span>
            )}
            {project.featured && (
              <span className="px-4 py-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium border border-yellow-300 dark:border-yellow-600 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Featured
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
            variants={fadeInUp}
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            {projectDetails?.description || project.description}
          </motion.p>

          {/* Key Features */}
          {projectDetails?.sections?.['🚀 Key Features'] && (
            <motion.div className="mb-8" variants={fadeInUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {Array.isArray(projectDetails.sections['🚀 Key Features']) && 
                  projectDetails.sections['🚀 Key Features'].map((feature: string, index: number) => (
                    <div 
                      key={index}
                      className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg p-4 text-left"
                    >
                      <p className="text-slate-700 dark:text-slate-300">
                        {renderMarkdown(feature)}
                      </p>
                    </div>
                  ))
                }
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={fadeInUp}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Main component
export default function UniversalProjectPageClient({ 
  project, 
  projectDetails 
}: { 
  project: GitHubProject; 
  projectDetails: any;
}) {
  if (!projectDetails?.sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Project Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The project template could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  // Define section icons
  const sectionIcons: Record<string, any> = {
    '🚀 Key Features': Star,
    '🛠️ Technology Stack': Wrench,
    '🎯 Problem Statement': Target,
    '🏗️ Architecture': Network,
    '📊 Performance Metrics': BarChart3,
    '💻 Code Snippets': Code,
    '💭 Commentary': MessageSquare,
    '🚀 Getting Started': ArrowRight,
    '📝 License': FileText,
    '🤝 Contributing': MessageSquare,
    '📞 Contact': MessageSquare,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection project={project} projectDetails={projectDetails} />

      {/* Dynamic Sections */}
      {Object.entries(projectDetails.sections).map(([sectionName, sectionContent]) => {
        // Skip Key Features as it's already in the hero
        if (sectionName === '🚀 Key Features') return null;
        
        const Icon = sectionIcons[sectionName] || FileText;
        
        return (
          <UniversalSection
            key={sectionName}
            sectionName={sectionName}
            sectionContent={sectionContent}
            icon={Icon}
          />
        );
      })}
    </div>
  );
} 