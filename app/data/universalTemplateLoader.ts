/**
 * Universal Template Loader
 * 
 * Dynamically loads and parses ANY template structure
 * Works with any TEMPLATE.md file regardless of content
 * 
 * Theory: Universal template loading that adapts to any structure
 * Code: Dynamic parsing and loading of any template format
 * Results: One loader that works with all possible templates
 * Conclusion: Truly universal template system
 */

import { parseUniversalTemplate, convertUniversalToProjectDetails, type UniversalTemplate } from '../utils/universalParser';

/**
 * Load template from GitHub repository
 * 
 * @param projectId - The project ID (e.g., 'kleascm-ilanya')
 * @returns Universal template or null if not found
 */
export async function loadUniversalTemplate(projectId: string): Promise<UniversalTemplate | null> {
  try {
    // Extract the actual GitHub repo name from the project ID
    const repoName = projectId.replace('kleascm-', '');
    
    // Fetch TEMPLATE.md from GitHub
    const response = await fetch(`https://raw.githubusercontent.com/KleaSCM/${repoName}/main/TEMPLATE.md`);
    
    if (!response.ok) {
      console.warn(`TEMPLATE.md not found for project: ${projectId}`);
      return null;
    }
    
    const content = await response.text();
    
    // Parse with universal parser
    const template = parseUniversalTemplate(content, projectId);
    
    return template;
  } catch (error) {
    console.error(`Error loading template for ${projectId}:`, error);
    return null;
  }
}

/**
 * Load template and convert to project details
 * 
 * @param projectId - The project ID
 * @returns Project details or null if not found
 */
export async function loadProjectDetails(projectId: string): Promise<any | null> {
  const template = await loadUniversalTemplate(projectId);
  
  if (!template) {
    return null;
  }
  
  return convertUniversalToProjectDetails(template);
}

/**
 * Check if a project has a TEMPLATE.md file
 * 
 * @param projectId - The project ID to check
 * @returns True if TEMPLATE.md exists, false otherwise
 */
export async function hasTemplateFile(projectId: string): Promise<boolean> {
  try {
    const repoName = projectId.replace('kleascm-', '');
    const response = await fetch(`https://raw.githubusercontent.com/KleaSCM/${repoName}/main/TEMPLATE.md`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Get all available template sections for a project
 * 
 * @param projectId - The project ID
 * @returns Array of section names or empty array if not found
 */
export async function getTemplateSections(projectId: string): Promise<string[]> {
  const template = await loadUniversalTemplate(projectId);
  
  if (!template) {
    return [];
  }
  
  return Object.keys(template.sections);
}

/**
 * Get specific section from template
 * 
 * @param projectId - The project ID
 * @param sectionName - The section name to get
 * @returns Section content or null if not found
 */
export async function getTemplateSection(projectId: string, sectionName: string): Promise<any | null> {
  const template = await loadUniversalTemplate(projectId);
  
  if (!template || !template.sections[sectionName]) {
    return null;
  }
  
  return template.sections[sectionName];
}

/**
 * Validate template structure
 * 
 * @param projectId - The project ID
 * @returns Validation result with any issues found
 */
export async function validateTemplate(projectId: string): Promise<{
  isValid: boolean;
  issues: string[];
  sections: string[];
}> {
  const template = await loadUniversalTemplate(projectId);
  
  if (!template) {
    return {
      isValid: false,
      issues: ['TEMPLATE.md file not found'],
      sections: []
    };
  }
  
  const issues: string[] = [];
  const sections = Object.keys(template.sections);
  
  // Basic validation
  if (!template.title) {
    issues.push('Missing project title');
  }
  
  if (!template.description) {
    issues.push('Missing project description');
  }
  
  if (sections.length === 0) {
    issues.push('No sections found in template');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    sections
  };
} 