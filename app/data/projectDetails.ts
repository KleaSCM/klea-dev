/**
 * Project Details Data
 * 
 * Hybrid approach: Uses GitHub data + template system + README parsing
 * Now supports dynamic README parsing for auto-populated project pages!
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

// Import template loader and README service
import { getProjectTemplate } from './templateLoader';
import { getCachedProjectDetails } from '../services/githubReadme';

/**
 * Get project details by ID
 * 
 * Priority order:
 * 1. Static template (if exists)
 * 2. GitHub README parsing (if follows template format)
 * 3. Fallback to basic GitHub data
 */
export async function getProjectDetails(id: string): Promise<ProjectDetails | null> {
  try {
    // First, try static template
    const staticTemplate = getProjectTemplate(id);
    if (staticTemplate) {
      return staticTemplate;
    }
    
    // Then, try GitHub README parsing
    try {
      const readmeDetails = await getCachedProjectDetails(id);
      if (readmeDetails && readmeDetails.keyFeatures && readmeDetails.keyFeatures.length > 0) {
        return readmeDetails;
      }
    } catch (error) {
      console.warn(`Failed to parse README for ${id}:`, error);
    }
    
    // Fallback to null (will use basic GitHub data)
    return null;
  } catch (error) {
    console.error(`Error in getProjectDetails for ${id}:`, error);
    return null;
  }
}

/**
 * Get all project details
 * Note: This is now async due to README parsing
 */
export async function getAllProjectDetails(): Promise<ProjectDetails[]> {
  // This would need to be updated to work with the async template system
  // For now, return empty array - can be enhanced later
  return [];
}

/**
 * Check if a project has detailed information
 * 
 * @param id - Project ID
 * @returns True if project has detailed info (template or README)
 */
export async function hasDetailedInfo(id: string): Promise<boolean> {
  const details = await getProjectDetails(id);
  return details !== null;
} 