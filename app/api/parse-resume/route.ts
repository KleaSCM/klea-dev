/**
 * Resume PDF Parser API
 * 
 * Server-side endpoint to parse PDF resumes and extract Professional Experience
 * 
 * Theory: Server-side PDF text extraction with intelligent section parsing
 * Code: API endpoint for PDF parsing with experience extraction
 * Results: Structured experience data for beautiful UI rendering
 * Conclusion: Proper separation of client and server concerns
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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
  icon: string;
}

/**
 * Parse PDF resume and extract Professional Experience
 * 
 * @param pdfPath - Path to the PDF resume file
 * @returns Structured experience data for the UI
 */
async function parseResumeExperience(pdfPath: string): Promise<Experience[]> {
  try {
    // Use pdftotext command to extract text
    const { stdout } = await execAsync(`pdftotext "${pdfPath}" -`);
    const fullText = stdout;
    
    console.log('PDF text extracted:', fullText.substring(0, 500) + '...');
    
    // Parse the Professional Experience section
    const experiences = parseExperienceSection(fullText);
    
    if (experiences.length > 0) {
      console.log('Successfully parsed', experiences.length, 'experiences from PDF');
      return experiences;
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
 * Parse Professional Experience section from extracted text
 * 
 * @param text - Extracted text from PDF
 * @returns Structured experience data
 */
function parseExperienceSection(text: string): Experience[] {
  try {
    console.log('Parsing PDF text:', text.substring(0, 500) + '...');
    
    // Look for Professional Experience section
    const experienceRegex = /Professional Experience\s*\n([\s\S]*?)(?=\n\s*(?:Education|Projects|$))/i;
    const match = text.match(experienceRegex);
    
    if (!match) {
      console.warn('No Professional Experience section found in PDF');
      return getFallbackExperience();
    }
    
    const experienceSection = match[1];
    console.log('Found experience section:', experienceSection.substring(0, 300) + '...');
    
    // Parse individual job entries based on Yuriko's actual resume format
    const jobEntries = parseYurikoJobEntries(experienceSection);
    
    if (jobEntries.length > 0) {
      return jobEntries;
    } else {
      console.warn('No job entries found, using fallback data');
      return getFallbackExperience();
    }
    
  } catch (error) {
    console.error('Error parsing experience section:', error);
    return getFallbackExperience();
  }
}

/**
 * Parse individual job entries from Yuriko's actual resume format
 * 
 * @param experienceSection - Text containing job entries
 * @returns Array of parsed job experiences
 */
function parseYurikoJobEntries(experienceSection: string): Experience[] {
  const experiences: Experience[] = [];
  
  // Split the text into job sections based on Yuriko's format
  const jobSections = experienceSection.split(/(?=SOFTWARE ENGINEER|BACKEND|SOFTWARE & AUTOMATION)/);
  
  for (const section of jobSections) {
    if (!section.trim()) continue;
    
    const lines = section.split('\n').filter(line => line.trim());
    if (lines.length < 2) continue;
    
    // Extract job title and company from first line
    const firstLine = lines[0];
    const titleMatch = firstLine.match(/^([^(]+?)\s*\(([^)]+)\)/);
    
    if (!titleMatch) continue;
    
    const title = titleMatch[1].trim();
    const period = titleMatch[2].trim();
    
    // Extract company from second line
    const company = lines[1]?.trim() || 'Independent Development';
    
         // Extract achievements (bullet points)
     const achievements: string[] = [];
     const technologies: string[] = [];
     let description = '';
     
     for (let i = 2; i < lines.length; i++) {
       const line = lines[i].trim();
       
       if (line.startsWith('●') || line.startsWith('•')) {
         const achievement = line.replace(/^[●•]\s*/, '').trim();
         if (achievement) {
           achievements.push(achievement);
         }
       } else if (line.length > 20 && !line.match(/^\d/) && !line.match(/^[A-Z\s&]+$/)) {
         description += line + ' ';
       }
     }
     
     // If no achievements found, try to extract from description
     if (achievements.length === 0 && description) {
       const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 20);
       achievements.push(...sentences.slice(0, 3).map(s => s.trim()));
     }
    
    // Create experience object
    const experience: Experience = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title: title,
      company: company,
      location: 'Remote',
      period: period,
      description: description.trim() || `Professional experience as ${title} at ${company}`,
      technologies: technologies.length > 0 ? technologies : extractTechnologiesFromTitle(title),
      achievements: achievements.length > 0 ? achievements : extractAchievementsFromDescription(description, title),
      type: 'work',
      icon: getIconForJob(title)
    };
    
    experiences.push(experience);
  }
  
  return experiences;
}

/**
 * Extract technologies from job title
 * 
 * @param title - Job title
 * @returns Array of technologies
 */
function extractTechnologiesFromTitle(title: string): string[] {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('software engineer') || lowerTitle.includes('compliance')) {
    return ['Go', 'PostgreSQL', 'React', 'Next.js', 'AWS', 'Azure', 'AI'];
  } else if (lowerTitle.includes('backend') || lowerTitle.includes('systems')) {
    return ['Go', 'Rust', 'PostgreSQL', 'WebSockets', 'Python', 'Bash'];
  } else if (lowerTitle.includes('automation') || lowerTitle.includes('freelance')) {
    return ['Electron', 'Go', 'TypeScript', 'React', 'Database Design'];
  } else {
    return ['TypeScript', 'Go', 'React', 'Node.js', 'PostgreSQL'];
  }
}

/**
 * Extract achievements from description
 * 
 * @param description - Job description
 * @param title - Job title
 * @returns Array of achievements
 */
function extractAchievementsFromDescription(description: string, title: string): string[] {
  if (!description) {
    return [
      'Developed high-performance applications with modern technologies',
      'Implemented scalable architectures and best practices',
      'Collaborated with cross-functional teams to deliver quality solutions'
    ];
  }
  
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const achievements = sentences.slice(0, 3).map(s => s.trim());
  
  if (achievements.length > 0) {
    return achievements;
  }
  
  // Fallback achievements based on job title
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('software engineer') || lowerTitle.includes('compliance')) {
    return [
      'Developed automated compliance auditing systems using Go and PostgreSQL',
      'Built internal dashboards with React, Next.js, and RESTful APIs',
      'Implemented CI/CD pipelines in AWS and Azure for improved deployment'
    ];
  } else if (lowerTitle.includes('backend') || lowerTitle.includes('systems')) {
    return [
      'Built backend microservices in Go and Rust for large-scale data processing',
      'Designed real-time analytics systems using WebSockets and PostgreSQL',
      'Developed command-line automation tools in Python and Bash'
    ];
  } else if (lowerTitle.includes('automation') || lowerTitle.includes('freelance')) {
    return [
      'Created modern Electron-based applications with AI-powered capabilities',
      'Developed Go-based background processes for desktop application management',
      'Built lightweight database engines optimized for high-speed data retrieval'
    ];
  } else {
    return [
      'Developed high-performance applications with modern technologies',
      'Implemented scalable architectures and best practices',
      'Collaborated with cross-functional teams to deliver quality solutions'
    ];
  }
}

/**
 * Create Experience object from parsed job data
 * 
 * @param job - Partial job data
 * @param description - Job description
 * @param technologies - Technologies used
 * @param achievements - Key achievements
 * @returns Complete Experience object
 */
function createExperienceFromJob(
  job: Partial<Experience>, 
  description: string, 
  technologies: string[], 
  achievements: string[]
): Experience {
  return {
    id: job.title?.toLowerCase().replace(/\s+/g, '-') || 'job-' + Date.now(),
    title: job.title || 'Software Engineer',
    company: job.company || 'Independent Development',
    location: job.location || 'Remote',
    period: job.period || '2020 - Present',
    description: description.trim() || 'Developing advanced software solutions with focus on performance and scalability.',
    technologies: technologies.length > 0 ? technologies : ['Python', 'TypeScript', 'React', 'Node.js'],
    achievements: achievements.length > 0 ? achievements : [
      'Developed high-performance applications with modern technologies',
      'Implemented scalable architectures and best practices',
      'Collaborated with cross-functional teams to deliver quality solutions'
    ],
    type: 'work',
    icon: getIconForJob(job.title || '')
  };
}

/**
 * Get appropriate icon for job title
 * 
 * @param title - Job title
 * @returns Icon string
 */
function getIconForJob(title: string): string {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('ai') || lowerTitle.includes('ml') || lowerTitle.includes('neural') || lowerTitle.includes('cognitive')) {
    return 'brain';
  } else if (lowerTitle.includes('physics') || lowerTitle.includes('simulation') || lowerTitle.includes('engine')) {
    return 'zap';
  } else if (lowerTitle.includes('web') || lowerTitle.includes('frontend') || lowerTitle.includes('fullstack')) {
    return 'globe';
  } else if (lowerTitle.includes('system') || lowerTitle.includes('backend') || lowerTitle.includes('infrastructure')) {
    return 'database';
  } else {
    return 'brain'; // Default to brain icon
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
      icon: 'brain'
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
      icon: 'zap'
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
      icon: 'globe'
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
      icon: 'database'
    }
  ];
}

/**
 * API route handler
 */
export async function GET(request: NextRequest) {
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'resume', 'Resume ay.pdf');
    
    // Check if PDF exists
    if (!fs.existsSync(pdfPath)) {
      console.warn('Resume PDF not found, using fallback data');
      return NextResponse.json(getFallbackExperience());
    }
    
    // Parse the PDF
    const experiences = await parseResumeExperience(pdfPath);
    
    return NextResponse.json(experiences);
    
  } catch (error) {
    console.error('Error in resume parsing API:', error);
    return NextResponse.json(getFallbackExperience());
  }
} 