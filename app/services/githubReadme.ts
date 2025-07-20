/**
 * GitHub Template Service
 * 
 * Fetches TEMPLATE.md files from GitHub repositories and parses them
 * to auto-populate project pages with dynamic content
 * 
 * Theory: GitHub API integration with template parsing
 * Code: Modular service with caching and error handling
 * Results: Dynamic project data from GitHub TEMPLATE.md files
 * Conclusion: Automated project page generation from repository templates
 */

import { parseReadme, convertToProjectDetails, type ParsedReadme } from '../utils/readmeParser';

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional: for higher rate limits

/**
 * Fetch TEMPLATE.md content from GitHub repository
 * 
 * @param owner - Repository owner (e.g., 'kleascm')
 * @param repo - Repository name (e.g., 'ilanya')
 * @returns Raw TEMPLATE.md content as string
 */
export async function fetchTemplateContent(owner: string, repo: string): Promise<string> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3.raw',
      'User-Agent': 'klea-portfolio'
    };

    // Add token if available for higher rate limits
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/TEMPLATE.md`,
      { headers }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`TEMPLATE.md not found for ${owner}/${repo}`);
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    // With the raw accept header, GitHub returns the content directly
    const content = await response.text();
    return content;
  } catch (error) {
    console.error(`Error fetching TEMPLATE.md for ${owner}/${repo}:`, error);
    throw error;
  }
}

/**
 * Get project details from GitHub TEMPLATE.md
 * 
 * @param projectId - Project ID (e.g., 'kleascm-ilanya')
 * @returns Parsed project details or null if not found
 */
export async function getProjectDetailsFromTemplate(projectId: string): Promise<any | null> {
  try {
    // Parse project ID to get owner and repo
    const [owner, repo] = projectId.split('-', 2);
    
    if (!owner || !repo) {
      console.warn(`Invalid project ID format: ${projectId}`);
      return null;
    }

    // Fetch TEMPLATE.md content
    const templateContent = await fetchTemplateContent(owner, repo);
    
    // Parse the template
    const parsedTemplate = parseReadme(templateContent);
    
    // Convert to project details format
    const projectDetails = convertToProjectDetails(parsedTemplate, projectId);
    
    return projectDetails;
  } catch (error) {
    console.error(`Error getting project details for ${projectId}:`, error);
    return null;
  }
}

/**
 * Check if a project has a TEMPLATE.md that follows our format
 * 
 * @param projectId - Project ID to check
 * @returns True if TEMPLATE.md exists and follows template format
 */
export async function hasTemplateFile(projectId: string): Promise<boolean> {
  try {
    const details = await getProjectDetailsFromTemplate(projectId);
    return details !== null && details.keyFeatures && details.keyFeatures.length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Get all projects that have template files
 * 
 * @param projectIds - Array of project IDs to check
 * @returns Array of project IDs that have template files
 */
export async function getProjectsWithTemplates(projectIds: string[]): Promise<string[]> {
  const results = await Promise.allSettled(
    projectIds.map(id => hasTemplateFile(id))
  );
  
  return projectIds.filter((_, index) => {
    const result = results[index];
    return result.status === 'fulfilled' && result.value;
  });
}

/**
 * Cache for template content to avoid repeated API calls
 * Using plain object for serialization compatibility
 */
let templateCache: Record<string, { content: any; timestamp: number }> = {};
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get cached project details or fetch from GitHub
 * 
 * @param projectId - Project ID
 * @returns Cached or fresh project details
 */
export async function getCachedProjectDetails(projectId: string): Promise<any | null> {
  const now = Date.now();
  const cached = templateCache[projectId];
  
  // Return cached data if still valid
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.content;
  }
  
  // Fetch fresh data
  const details = await getProjectDetailsFromTemplate(projectId);
  
  if (details) {
    // Cache the result
    templateCache[projectId] = {
      content: details,
      timestamp: now
    };
  }
  
  return details;
}

/**
 * Clear the template cache
 */
export function clearTemplateCache(): void {
  templateCache = {};
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number; entries: string[] } {
  return {
    size: Object.keys(templateCache).length,
    entries: Object.keys(templateCache)
  };
} 