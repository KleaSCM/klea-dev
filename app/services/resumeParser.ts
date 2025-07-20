/**
 * Resume PDF Parser Service
 * 
 * This service automatically parses PDF resumes and extracts Professional Experience
 * data to populate the InteractiveResume component dynamically.
 * 
 * Theory: PDF text extraction with intelligent section parsing
 * Code: Automated resume parsing with experience extraction
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
 * @param pdfPath - Path to the PDF resume file
 * @returns Structured experience data for the UI
 */
export async function parseResumeExperience(pdfPath: string): Promise<Experience[]> {
  try {
    // Check if the resume file exists
    const response = await fetch(pdfPath);
    if (!response.ok) {
      console.warn('Resume PDF not found, using fallback data');
      return getFallbackExperience();
    }

    // Get the PDF buffer
    const pdfBuffer = await response.arrayBuffer();
    
    // Extract text from PDF
    const text = await extractTextFromPDF(pdfBuffer);
    
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

/**
 * Extract text content from PDF file
 * 
 * @param pdfBuffer - PDF file buffer
 * @returns Extracted text content
 */
async function extractTextFromPDF(pdfBuffer: ArrayBuffer): Promise<string> {
  try {
    // Import pdf-parse dynamically to avoid SSR issues
    const pdfParse = await import('pdf-parse');
    const data = await pdfParse.default(Buffer.from(pdfBuffer));
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return '';
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
 * @returns Lucide React icon component
 */
function getIconForJob(title: string): any {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('ai') || lowerTitle.includes('ml') || lowerTitle.includes('neural') || lowerTitle.includes('cognitive')) {
    return Brain;
  } else if (lowerTitle.includes('physics') || lowerTitle.includes('simulation') || lowerTitle.includes('engine')) {
    return Zap;
  } else if (lowerTitle.includes('web') || lowerTitle.includes('frontend') || lowerTitle.includes('fullstack')) {
    return Globe;
  } else if (lowerTitle.includes('system') || lowerTitle.includes('backend') || lowerTitle.includes('infrastructure')) {
    return Database;
  } else {
    return Brain; // Default to brain icon
  }
} 