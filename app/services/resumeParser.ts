/**
 * Resume PDF Parser Service
 * 
 * This service automatically parses PDF resumes and extracts Professional Experience
 * data to populate the InteractiveResume component dynamically.
 * 
 * Theory: Client-server PDF parsing with intelligent section extraction
 * Code: API-based resume parsing with experience extraction
 * Results: Structured experience data for beautiful UI rendering
 * Conclusion: Fully automated resume integration system
 */

import { Brain, Zap, Globe, Database } from 'lucide-react';

// Experience interface for resume data
interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  type: 'work' | 'education' | 'project';
  icon: any;
}

/**
 * Parse PDF resume and extract Professional Experience
 * 
 * @param pdfPath - Path to the PDF resume file (unused, kept for compatibility)
 * @returns Structured experience data for the UI
 */
export async function parseResumeExperience(pdfPath: string): Promise<Experience[]> {
  try {
    // Call the server-side API to parse the PDF
    const response = await fetch('/api/parse-resume');
    
    if (!response.ok) {
      console.warn('Resume parsing API failed, using fallback data');
      return getFallbackExperience();
    }

    const experiences = await response.json();
    
    // Convert icon strings to Lucide React components
    const experiencesWithIcons = experiences.map((exp: any) => ({
      ...exp,
      icon: getIconComponent(exp.icon)
    }));
    
    if (experiencesWithIcons.length > 0) {
      console.log('Successfully parsed', experiencesWithIcons.length, 'experiences from PDF');
      return experiencesWithIcons;
    } else {
      console.warn('No experiences found in PDF, using fallback data');
      return getFallbackExperience();
    }
    
  } catch (error) {
    console.error('Error parsing resume PDF:', error);
    return getFallbackExperience();
  }
}

/**
 * Convert icon string to Lucide React component
 * 
 * @param iconName - Icon name string
 * @returns Lucide React icon component
 */
function getIconComponent(iconName: string): any {
  switch (iconName) {
    case 'brain':
      return Brain;
    case 'zap':
      return Zap;
    case 'globe':
      return Globe;
    case 'database':
      return Database;
    default:
      return Brain;
  }
}

/**
 * Fallback experience data when PDF parsing is not available
 * 
 * @returns Structured experience data
 */
function getFallbackExperience(): Experience[] {
  return [
    {
      id: 'ai-systems',
      title: 'AI/ML Systems Development',
      company: 'Independent Research & Development',
      location: 'Remote',
      period: '2021 - Present',
      description: 'Developing advanced AI systems with cognitive architectures, neural networks, and mathematical control systems for stable personality modeling.',
      technologies: ['Python', 'PyTorch', 'Transformers', 'Neural Networks', 'Mathematical Modeling', 'CUDA'],
      achievements: [
        'Built Ilanya - Revolutionary AI system with multi-stage cognitive processing pipeline',
        'Implemented neural trait mapping with cross-attention mechanisms',
        'Developed identity preservation systems with differential penalty weights',
        'Created Nash equilibrium resolution for goal competition dynamics'
      ],
      type: 'project',
      icon: Brain
    },
    {
      id: 'physics-engines',
      title: 'Physics Engine Development',
      company: 'Independent Development',
      location: 'Remote',
      period: '2020 - Present',
      description: 'Creating sophisticated physics simulation engines with realistic collision detection, fluid dynamics, and particle systems.',
      technologies: ['C++', 'OpenGL', 'CUDA', 'Physics Simulation', 'Collision Detection', 'Fluid Dynamics'],
      achievements: [
        'Developed advanced collision detection algorithms with escape velocity calculations',
        'Built liquid dynamics simulation with realistic fluid behavior',
        'Created particle systems with gravitational and electromagnetic interactions',
        'Implemented real-time physics rendering with GPU acceleration'
      ],
      type: 'project',
      icon: Zap
    },
    {
      id: 'web-development',
      title: 'Full-Stack Web Development',
      company: 'Independent Development',
      location: 'Remote',
      period: '2019 - Present',
      description: 'Building modern web applications with responsive designs, secure payment processing, and scalable architectures.',
      technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
      achievements: [
        'Developed GeoGO - Geographic data processing platform with interactive visualizations',
        'Built Volatria - Distributed systems platform with microservices architecture',
        'Created ArtScape - Digital art marketplace with secure payment processing',
        'Implemented responsive designs with modern UI/UX principles'
      ],
      type: 'work',
      icon: Globe
    },
    {
      id: 'systems-programming',
      title: 'Systems Programming & Infrastructure',
      company: 'Independent Development',
      location: 'Remote',
      period: '2020 - Present',
      description: 'Developing high-performance system tools, daemons, and infrastructure components with focus on reliability and efficiency.',
      technologies: ['Rust', 'Go', 'C++', 'System Programming', 'Daemon Development', 'Network Security'],
      achievements: [
        'Built Kdemon - Robust system daemon framework for high-performance services',
        'Developed SmartCurl - Intelligent HTTP client with advanced web scraping',
        'Created VulnSCAN - Comprehensive security vulnerability scanner',
        'Implemented ColorCoded - Advanced color analysis tool with Rust'
      ],
      type: 'project',
      icon: Database
    }
  ];
}

// PDF parsing is now handled by the server-side API endpoint 