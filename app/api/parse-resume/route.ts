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
import pdfParse from 'pdf-parse';

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
    // Read the PDF file
    const pdfBuffer = fs.readFileSync(pdfPath);
    
    // Extract text from PDF
    const data = await pdfParse(pdfBuffer);
    const text = data.text;
    
    console.log('PDF text extracted:', text.substring(0, 500) + '...');
    
    // Parse the Professional Experience section
    const experiences = parseExperienceSection(text);
    
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
    const experienceRegex = /(?:Professional Experience|Work Experience|Employment History|Experience)(?:\s*\n|\s*:)([\s\S]*?)(?=\n\s*(?:Education|Skills|Projects|References|$))/i;
    const match = text.match(experienceRegex);
    
    if (!match) {
      console.warn('No Professional Experience section found in PDF');
      return getFallbackExperience();
    }
    
    const experienceSection = match[1];
    console.log('Found experience section:', experienceSection.substring(0, 300) + '...');
    
    // Parse individual job entries
    const jobEntries = parseJobEntries(experienceSection);
    
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
 * Parse individual job entries from experience section
 * 
 * @param experienceSection - Text containing job entries
 * @returns Array of parsed job experiences
 */
function parseJobEntries(experienceSection: string): Experience[] {
  const experiences: Experience[] = [];
  
  // Split by potential job separators (dates, company names, etc.)
  const lines = experienceSection.split('\n').filter(line => line.trim());
  
  let currentJob: Partial<Experience> = {};
  let currentDescription = '';
  let currentTechnologies: string[] = [];
  let currentAchievements: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for job title patterns
    if (line.match(/^(Senior|Lead|Full|Software|AI|ML|Systems|Engineer|Developer|Architect|Scientist)/i)) {
      // Save previous job if exists
      if (currentJob.title) {
        experiences.push(createExperienceFromJob(currentJob, currentDescription, currentTechnologies, currentAchievements));
      }
      
      // Start new job
      currentJob = { title: line };
      currentDescription = '';
      currentTechnologies = [];
      currentAchievements = [];
      
      // Look for company name in next few lines
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        const nextLine = lines[j].trim();
        if (nextLine.match(/^(Remote|Freelance|Contract|Independent|Research)/i) || 
            nextLine.includes('@') || 
            nextLine.includes('Inc') || 
            nextLine.includes('LLC') ||
            nextLine.includes('Ltd')) {
          currentJob.company = nextLine;
          break;
        }
      }
      
      // Look for date range
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        const nextLine = lines[j].trim();
        if (nextLine.match(/\d{4}\s*[-–]\s*(Present|\d{4})/)) {
          currentJob.period = nextLine;
          break;
        }
      }
      
    } else if (line.match(/^(Python|JavaScript|TypeScript|React|Node|Go|C\+\+|Rust|AWS|Docker|Kubernetes|PostgreSQL|MongoDB|Redis|Git|Linux|Docker|Kubernetes|TensorFlow|PyTorch|OpenCV|NLP|Machine Learning|AI|ML|Neural Networks|Computer Vision|Data Science|DevOps|CI\/CD|Agile|Scrum)/i)) {
      // Technology keywords
      currentTechnologies.push(line);
    } else if (line.match(/^[•\-\*]\s*(.+)/)) {
      // Achievement bullet points
      const achievement = line.replace(/^[•\-\*]\s*/, '');
      currentAchievements.push(achievement);
    } else if (line.length > 20 && !line.match(/^\d/)) {
      // Description text
      currentDescription += line + ' ';
    }
  }
  
  // Add the last job
  if (currentJob.title) {
    experiences.push(createExperienceFromJob(currentJob, currentDescription, currentTechnologies, currentAchievements));
  }
  
  return experiences;
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