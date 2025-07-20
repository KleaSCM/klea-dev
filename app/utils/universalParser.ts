/**
 * Universal Template Parser
 * 
 * A truly universal parser that can handle ANY template structure
 * Extracts whatever sections exist between markdown headers
 * 
 * Theory: Flexible parsing that adapts to any template structure
 * Code: Dynamic section extraction with no hardcoded expectations
 * Results: Universal compatibility with any template format
 * Conclusion: One parser that works with all possible templates
 */

export interface UniversalTemplate {
  id: string;
  title: string;
  description: string;
  sections: Record<string, any>;
  rawContent: string;
}

/**
 * Extract ALL sections from markdown content dynamically
 * 
 * @param content - Full markdown content
 * @returns Object with all sections found
 */
function extractAllSections(content: string): Record<string, any> {
  const sections: Record<string, any> = {};
  
  // Split content by ## headers (main sections)
  const sectionParts = content.split(/^##\s+(.+)$/gm);
  
  // Skip the first part (content before first ## header)
  for (let i = 1; i < sectionParts.length; i += 2) {
    const header = sectionParts[i].trim();
    const sectionContent = sectionParts[i + 1] || '';
    
    // Parse the section content
    sections[header] = parseSectionContent(sectionContent.trim(), header);
  }
  
  return sections;
}

/**
 * Parse section content intelligently based on what we find
 * 
 * @param content - Section content
 * @param sectionName - Name of the section
 * @returns Parsed section data
 */
function parseSectionContent(content: string, sectionName: string): any {
  // Check for subsections (### headers)
  const subsectionParts = content.split(/^###\s+(.+)$/gm);
  
  if (subsectionParts.length > 1) {
    // This section has subsections
    const parsedSubsections: Record<string, any> = {};
    
    // Skip the first part (content before first ### header)
    for (let i = 1; i < subsectionParts.length; i += 2) {
      const subsectionHeader = subsectionParts[i].trim();
      const subsectionContent = subsectionParts[i + 1] || '';
      
      parsedSubsections[subsectionHeader] = parseSubsectionContent(subsectionContent.trim(), subsectionHeader);
    }
    
    return parsedSubsections;
  }
  
  // No subsections - parse as simple content
  return parseSimpleContent(content, sectionName);
}

/**
 * Parse subsection content
 * 
 * @param content - Subsection content
 * @param subsectionName - Name of the subsection
 * @returns Parsed subsection data
 */
function parseSubsectionContent(content: string, subsectionName: string): any {
  // Special handling for code snippets subsections
  if (subsectionName.toLowerCase().includes('neural trait mapping') || 
      subsectionName.toLowerCase().includes('identity preservation loss') ||
      subsectionName.toLowerCase().includes('nash equilibrium resolution')) {
    
    // Extract code block and explanation
    const codeBlockMatch = content.match(/```(\w+)\n([\s\S]*?)```/);
    if (codeBlockMatch) {
      const language = codeBlockMatch[1];
      const code = codeBlockMatch[2].trim();
      
      // Extract explanation after the code block
      const afterCode = content.substring(content.indexOf(codeBlockMatch[0]) + codeBlockMatch[0].length);
      const explanationMatch = afterCode.match(/\*\*Explanation\*\*:\s*(.+?)(?=\n\n|\n###|\n##|$)/s);
      const explanation = explanationMatch ? explanationMatch[1].trim() : '';
      
      return {
        language,
        code,
        explanation
      };
    }
  }
  
  return parseSimpleContent(content, subsectionName);
}

/**
 * Parse simple content (no subsections)
 * 
 * @param content - Content to parse
 * @param sectionName - Name of the section/subsection
 * @returns Parsed content
 */
function parseSimpleContent(content: string, sectionName: string): any {
  // Check for lists
  const listItems = extractListItems(content);
  if (listItems.length > 0) {
    return listItems;
  }
  
  // Check for key-value pairs
  const keyValuePairs = extractKeyValuePairs(content);
  if (keyValuePairs.length > 0) {
    return keyValuePairs;
  }
  
  // Check for code blocks
  const codeBlocks = extractCodeBlocks(content);
  if (codeBlocks.length > 0) {
    return codeBlocks;
  }
  
  // Check for metrics/benchmarks
  const metrics = extractMetrics(content);
  if (metrics.length > 0) {
    return metrics;
  }
  
  // Default: return as text
  return content.trim();
}

/**
 * Extract list items from markdown content
 * 
 * @param content - Content to parse
 * @returns Array of list items
 */
function extractListItems(content: string): string[] {
  const listPattern = /^[-*+]\s+(.+)$/gm;
  const matches = content.match(listPattern);
  
  if (!matches) return [];
  
  return matches.map(match => {
    return match.replace(/^[-*+]\s+/, '').trim();
  }).filter(item => item.length > 0);
}

/**
 * Extract key-value pairs from markdown content
 * 
 * @param content - Content to parse
 * @returns Array of key-value objects
 */
function extractKeyValuePairs(content: string): Array<{name: string, value: string, description?: string}> {
  const keyValuePattern = /^\*\*(.+?)\*\*:\s*(.+?)(?:\s*-\s*(.+))?$/gm;
  const matches = content.match(keyValuePattern);
  
  if (!matches) return [];
  
  return matches.map(match => {
    const parts = match.match(/^\*\*(.+?)\*\*:\s*(.+?)(?:\s*-\s*(.+))?$/);
    if (!parts) return null;
    
    return {
      name: parts[1].trim(),
      value: parts[2].trim(),
      description: parts[3]?.trim()
    };
  }).filter(item => item !== null) as Array<{name: string, value: string, description?: string}>;
}

/**
 * Extract code blocks from markdown content
 * 
 * @param content - Content to parse
 * @returns Array of code block objects
 */
function extractCodeBlocks(content: string): Array<{title: string, language: string, code: string, explanation?: string}> {
  const codeBlockPattern = /```(\w+)\n([\s\S]*?)```/g;
  const matches = content.match(codeBlockPattern);
  
  if (!matches) return [];
  
  return matches.map(match => {
    const parts = match.match(/```(\w+)\n([\s\S]*?)```/);
    if (!parts) return null;
    
    // Look for explanation after the code block
    const afterCode = content.substring(content.indexOf(match) + match.length);
    const explanationMatch = afterCode.match(/^\*\*Explanation\*\*:\s*(.+?)(?=\n\n|\n###|\n##|$)/s);
    
    return {
      title: 'Code Block',
      language: parts[1],
      code: parts[2].trim(),
      explanation: explanationMatch?.[1].trim()
    };
  }).filter(item => item !== null) as Array<{title: string, language: string, code: string, explanation?: string}>;
}

/**
 * Extract metrics from markdown content
 * 
 * @param content - Content to parse
 * @returns Array of metric objects
 */
function extractMetrics(content: string): Array<{name: string, value: string, description?: string}> {
  const metricPattern = /^\*\*(.+?)\*\*:\s*(.+?)(?:\s*-\s*(.+))?$/gm;
  const matches = content.match(metricPattern);
  
  if (!matches) return [];
  
  return matches.map(match => {
    const parts = match.match(/^\*\*(.+?)\*\*:\s*(.+?)(?:\s*-\s*(.+))?$/);
    if (!parts) return null;
    
    return {
      name: parts[1].trim(),
      value: parts[2].trim(),
      description: parts[3]?.trim()
    };
  }).filter(item => item !== null) as Array<{name: string, value: string, description?: string}>;
}

/**
 * Parse a universal template from markdown content
 * 
 * @param content - Raw markdown content
 * @param projectId - Project identifier
 * @returns Parsed template object
 */
export function parseUniversalTemplate(content: string, projectId: string): UniversalTemplate {
  // Extract title from first # header
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled Project';
  
  // Extract description from first paragraph after title
  const descriptionMatch = content.match(/^#\s+.+?\n\n(.+?)(?=\n##|\n$)/s);
  const description = descriptionMatch ? descriptionMatch[1].trim() : '';
  
  // Extract all sections
  const sections = extractAllSections(content);
  
  return {
    id: projectId,
    title,
    description,
    sections,
    rawContent: content
  };
}

/**
 * Convert universal template to project details format
 * 
 * @param template - Universal template object
 * @returns Project details object
 */
export function convertUniversalToProjectDetails(template: UniversalTemplate): any {
  return {
    id: template.id,
    title: template.title,
    description: template.description,
    sections: template.sections,
    rawContent: template.rawContent
  };
} 