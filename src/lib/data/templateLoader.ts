/**
 * Template Loader
 * 
 * Dynamically loads project templates from the templates directory
 * Much cleaner than having everything in one file!
 */

import { type ProjectDetails } from './projectDetails';
import { vulnscanTemplate } from './templates/vulnscan';
import { exampleTemplate } from './templates/example';

// Template registry - maps project IDs to their templates
const templateRegistry: Record<string, ProjectDetails> = {
  'kleascm-vulnscan': vulnscanTemplate,
  // Add more templates here as you create them
  // 'kleascm-your-project': yourProjectTemplate,
};

/**
 * Get project template by ID
 * 
 * @param projectId - The project ID (e.g., 'kleascm-vulnscan')
 * @returns ProjectDetails template or null if not found
 */
export function getProjectTemplate(projectId: string): ProjectDetails | null {
  return templateRegistry[projectId] || null;
}

/**
 * Get all available template IDs
 * 
 * @returns Array of project IDs that have templates
 */
export function getAvailableTemplateIds(): string[] {
  return Object.keys(templateRegistry);
}

/**
 * Check if a project has a template
 * 
 * @param projectId - The project ID to check
 * @returns True if template exists, false otherwise
 */
export function hasTemplate(projectId: string): boolean {
  return projectId in templateRegistry;
}

/**
 * Get example template for reference
 * 
 * @returns The example template structure
 */
export function getExampleTemplate(): ProjectDetails {
  return exampleTemplate;
}

/**
 * How to add a new template:
 * 
 * 1. Create a new file in app/data/templates/yourproject.ts
 * 2. Export your template: export const yourProjectTemplate = { ... }
 * 3. Import it here: import { yourProjectTemplate } from './templates/yourproject'
 * 4. Add to templateRegistry: 'kleascm-yourproject': yourProjectTemplate
 * 
 * Example:
 * 
 * // In app/data/templates/myproject.ts
 * export const myProjectTemplate = {
 *   id: 'kleascm-myproject',
 *   keyFeatures: ['Feature 1', 'Feature 2'],
 *   // ... rest of your template
 * };
 * 
 * // Then add to templateRegistry above:
 * 'kleascm-myproject': myProjectTemplate,
 */ 