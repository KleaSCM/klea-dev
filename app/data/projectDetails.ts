/**
 * Project Details Data
 * 
 * Hybrid approach: Uses GitHub data + template system for additional details
 * Much cleaner with separate template files!
 */

export interface ProjectDetails {
  id: string;
  
  // Auto-populated from GitHub
  title?: string;
  description?: string;
  readme?: string;
  
  // Easy sections to fill in
  keyFeatures?: string[];
  techStack?: {
    languages?: string[];
    frameworks?: string[];
    databases?: string[];
    tools?: string[];
    platforms?: string[];
  };
  
  problem?: {
    statement?: string;
    challenges?: string[];
    goals?: string[];
  };
  
  architecture?: {
    overview?: string;
    components?: string[];
    patterns?: string[];
  };
  
  performance?: {
    metrics?: Array<{
      name: string;
      value: string;
      description: string;
    }>;
    benchmarks?: Array<{
      test: string;
      result: string;
      unit: string;
    }>;
  };
  
  codeSnippets?: Array<{
    title: string;
    description: string;
    language: string;
    code: string;
    explanation: string;
  }>;
  
  commentary?: {
    motivation?: string;
    designDecisions?: string[];
    lessonsLearned?: string[];
    futurePlans?: string[];
  };
}

// Import template loader
import { getProjectTemplate } from './templateLoader';

/**
 * Get project details by ID
 * 
 * Now uses the template system - much cleaner!
 */
export function getProjectDetails(id: string): ProjectDetails | null {
  return getProjectTemplate(id);
}

/**
 * Get all project details
 */
export function getAllProjectDetails(): ProjectDetails[] {
  // This would need to be updated to work with the template system
  // For now, return empty array - can be enhanced later
  return [];
} 