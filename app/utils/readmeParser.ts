/**
 * README Parser
 * 
 * Parses GitHub README files using standardized template format
 * Extracts structured data to auto-populate project pages
 * 
 * Theory: Markdown parsing with regex patterns to extract sections
 * Code: Modular parser with specific extractors for each section
 * Results: Structured data ready for project page components
 * Conclusion: Automated project page generation from README files
 */

export interface ParsedReadme {
  title: string;
  description: string;
  keyFeatures: string[];
  techStack: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    platforms: string[];
  };
  problem: {
    statement: string;
    challenges: string[];
    goals: string[];
  };
  architecture: {
    overview: string;
    components: string[];
    patterns: string[];
  };
  performance: {
    metrics: Array<{
      name: string;
      value: string;
      description: string;
    }>;
    benchmarks: Array<{
      test: string;
      result: string;
      unit: string;
    }>;
  };
  codeSnippets: Array<{
    title: string;
    description: string;
    language: string;
    code: string;
    explanation: string;
  }>;
  commentary: {
    motivation: string;
    designDecisions: string[];
    lessonsLearned: string[];
    futurePlans: string[];
  };
}

/**
 * Extract text between two markdown headers
 * 
 * @param content - Full README content
 * @param startHeader - Starting header to search for
 * @param endHeader - Optional ending header (if not provided, goes to next header)
 * @returns Extracted text content
 */
function extractSection(content: string, startHeader: string, endHeader?: string): string {
  // Create regex pattern for the start header - escape special regex characters
  const escapedHeader = startHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const startPattern = new RegExp(`^##\\s*${escapedHeader}\\s*$`, 'mi');
  const startMatch = content.match(startPattern);
  
  if (!startMatch) {
    console.warn(`Section header not found: ${startHeader}`);
    return '';
  }
  
  // Find the start of the content (after the header line)
  const headerLineEnd = content.indexOf('\n', startMatch.index!);
  if (headerLineEnd === -1) {
    return '';
  }
  
  // Skip any empty lines after the header
  let startIndex = headerLineEnd + 1;
  while (startIndex < content.length && content[startIndex] === '\n') {
    startIndex++;
  }
  
  // Find the end of the section
  let endIndex = content.length;
  if (endHeader) {
    const escapedEndHeader = endHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const endPattern = new RegExp(`^##\\s*${escapedEndHeader}\\s*$`, 'mi');
    const endMatch = content.substring(startIndex).match(endPattern);
    if (endMatch) {
      endIndex = startIndex + endMatch.index!;
    }
  } else {
    // Find next header of same or higher level
    const allHeaders = content.match(/^##\s+(.+)$/gm);
    if (allHeaders) {
      for (const header of allHeaders) {
        const headerIndex = content.indexOf(header);
        if (headerIndex > startIndex) {
          endIndex = headerIndex;
          break;
        }
      }
    }
  }
  
  return content.substring(startIndex, endIndex).trim();
}

/**
 * Extract a subsection from markdown content (### headers)
 * 
 * @param content - Section content
 * @param startHeader - Subsection header to start extraction from
 * @param endHeader - Optional subsection header to end extraction at
 * @returns Subsection content
 */
function extractSubsection(content: string, startHeader: string, endHeader?: string): string {
  // Create regex pattern for the start header - escape special regex characters
  const escapedHeader = startHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const startPattern = new RegExp(`^###\\s*${escapedHeader}\\s*$`, 'mi');
  const startMatch = content.match(startPattern);
  
  if (!startMatch) {
    console.warn(`Subsection header not found: ${startHeader}`);
    return '';
  }
  
  // Find the start of the content (after the header line)
  const headerLineEnd = content.indexOf('\n', startMatch.index!);
  if (headerLineEnd === -1) {
    return '';
  }
  
  // Skip any empty lines after the header
  let startIndex = headerLineEnd + 1;
  while (startIndex < content.length && content[startIndex] === '\n') {
    startIndex++;
  }
  
  // Find the end of the subsection
  let endIndex = content.length;
  if (endHeader) {
    const escapedEndHeader = endHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const endPattern = new RegExp(`^###\\s*${escapedEndHeader}\\s*$`, 'mi');
    const endMatch = content.substring(startIndex).match(endPattern);
    if (endMatch) {
      endIndex = startIndex + endMatch.index!;
    }
  } else {
    // Find next header of same or higher level (### or ##)
    const allHeaders = content.match(/^#{2,3}\s+(.+)$/gm);
    if (allHeaders) {
      for (const header of allHeaders) {
        const headerIndex = content.indexOf(header);
        if (headerIndex > startIndex) {
          endIndex = headerIndex;
          break;
        }
      }
    }
  }
  
  return content.substring(startIndex, endIndex).trim();
}

/**
 * Extract list items from markdown content
 * 
 * @param content - Section content
 * @returns Array of list items
 */
function extractListItems(content: string): string[] {
  const listPattern = /^[-*+]\s+(.+)$/gm;
  const matches = content.match(listPattern);
  
  if (!matches) return [];
  
  return matches.map(match => {
    // Remove the bullet point and clean up
    return match.replace(/^[-*+]\s+/, '').trim();
  }).filter(item => item.length > 0);
}

/**
 * Extract key-value pairs from markdown content
 * 
 * @param content - Section content
 * @returns Array of key-value objects
 */
function extractKeyValuePairs(content: string): Array<{name: string, value: string, description: string}> {
  const kvPattern = /^\*\*(.+?)\*\*:\s*(.+?)(?:\s*-\s*(.+))?$/gm;
  const matches = content.match(kvPattern);
  
  if (!matches) return [];
  
  return matches.map(match => {
    const parts = match.match(/^\*\*(.+?)\*\*:\s*(.+?)(?:\s*-\s*(.+))?$/);
    if (!parts) return null;
    
    return {
      name: parts[1].trim(),
      value: parts[2].trim(),
      description: parts[3] ? parts[3].trim() : ''
    };
  }).filter(Boolean) as Array<{name: string, value: string, description: string}>;
}

/**
 * Extract code blocks with their metadata
 * 
 * @param content - Section content
 * @returns Array of code snippet objects
 */
function extractCodeSnippets(content: string): Array<{title: string, description: string, language: string, code: string, explanation: string}> {
  const codeBlockPattern = /###\s*(.+?)\s*\n```(\w+)\n([\s\S]*?)```\s*\*\*Explanation\*\*:\s*(.+?)(?=\n###|\n##|$)/gi;
  const matches = content.match(codeBlockPattern);
  
  if (!matches) return [];
  
  return matches.map(match => {
    const parts = match.match(/###\s*(.+?)\s*\n```(\w+)\n([\s\S]*?)```\s*\*\*Explanation\*\*:\s*(.+?)(?=\n###|\n##|$)/i);
    if (!parts) return null;
    
    return {
      title: parts[1].trim(),
      description: parts[1].trim(), // Using title as description for now
      language: parts[2].trim(),
      code: parts[3].trim(),
      explanation: parts[4].trim()
    };
  }).filter(Boolean) as Array<{title: string, description: string, language: string, code: string, explanation: string}>;
}

/**
 * Extract tech stack categories
 * 
 * @param content - Technology stack section content
 * @returns Structured tech stack object
 */
function extractTechStack(content: string): ParsedReadme['techStack'] {
  const techStack: ParsedReadme['techStack'] = {
    languages: [],
    frameworks: [],
    databases: [],
    tools: [],
    platforms: []
  };
  
  // Extract languages
  const languagesSection = extractSubsection(content, 'Languages');
  techStack.languages = extractListItems(languagesSection);
  
  // Extract frameworks
  const frameworksSection = extractSubsection(content, 'Frameworks & Libraries');
  techStack.frameworks = extractListItems(frameworksSection);
  
  // Extract databases
  const databasesSection = extractSubsection(content, 'Databases & Storage');
  techStack.databases = extractListItems(databasesSection);
  
  // Extract tools
  const toolsSection = extractSubsection(content, 'Tools & Platforms');
  techStack.tools = extractListItems(toolsSection);
  techStack.platforms = extractListItems(toolsSection); // Platforms are in the same section
  
  return techStack;
}

/**
 * Extract problem statement and related information
 * 
 * @param content - Problem statement section content
 * @returns Structured problem object
 */
function extractProblem(content: string): ParsedReadme['problem'] {
  const problem: ParsedReadme['problem'] = {
    statement: '',
    challenges: [],
    goals: []
  };
  
  // Extract main statement (text before subsections)
  const lines = content.split('\n');
  const statementLines: string[] = [];
  
  for (const line of lines) {
    if (line.startsWith('###')) break; // Stop at first subsection
    if (line.trim()) {
      statementLines.push(line.trim());
    }
  }
  
  problem.statement = statementLines.join(' ');
  
  // Extract challenges
  const challengesSection = extractSubsection(content, 'Challenges Faced');
  problem.challenges = extractListItems(challengesSection);
  
  // Extract goals
  const goalsSection = extractSubsection(content, 'Project Goals');
  problem.goals = extractListItems(goalsSection);
  
  return problem;
}

/**
 * Extract architecture information
 * 
 * @param content - Architecture section content
 * @returns Structured architecture object
 */
function extractArchitecture(content: string): ParsedReadme['architecture'] {
  const architecture: ParsedReadme['architecture'] = {
    overview: '',
    components: [],
    patterns: []
  };
  
  // Extract overview
  const overviewSection = extractSubsection(content, 'System Overview');
  architecture.overview = overviewSection.trim();
  
  // Extract components
  const componentsSection = extractSubsection(content, 'Core Components');
  architecture.components = extractListItems(componentsSection);
  
  // Extract patterns
  const patternsSection = extractSubsection(content, 'Design Patterns');
  architecture.patterns = extractListItems(patternsSection);
  
  return architecture;
}

/**
 * Extract performance metrics and benchmarks
 * 
 * @param content - Performance metrics section content
 * @returns Structured performance object
 */
function extractPerformance(content: string): ParsedReadme['performance'] {
  const performance: ParsedReadme['performance'] = {
    metrics: [],
    benchmarks: []
  };
  
  // Extract key metrics
  const metricsSection = extractSubsection(content, 'Key Metrics');
  performance.metrics = extractKeyValuePairs(metricsSection);
  
  // Extract benchmarks
  const benchmarksSection = extractSubsection(content, 'Benchmarks');
  const benchmarkItems = extractListItems(benchmarksSection);
  
  performance.benchmarks = benchmarkItems.map(item => {
    const parts = item.split(':');
    if (parts.length >= 2) {
      return {
        test: parts[0].trim(),
        result: parts[1].trim(),
        unit: parts[2]?.trim() || ''
      };
    }
    return {
      test: item,
      result: '',
      unit: ''
    };
  });
  
  return performance;
}

/**
 * Extract commentary sections
 * 
 * @param content - Commentary section content
 * @returns Structured commentary object
 */
function extractCommentary(content: string): ParsedReadme['commentary'] {
  const commentary: ParsedReadme['commentary'] = {
    motivation: '',
    designDecisions: [],
    lessonsLearned: [],
    futurePlans: []
  };
  
  // Extract motivation
  const motivationSection = extractSubsection(content, 'Motivation');
  commentary.motivation = motivationSection.trim();
  
  // Extract design decisions
  const decisionsSection = extractSubsection(content, 'Design Decisions');
  commentary.designDecisions = extractListItems(decisionsSection);
  
  // Extract lessons learned
  const lessonsSection = extractSubsection(content, 'Lessons Learned');
  commentary.lessonsLearned = extractListItems(lessonsSection);
  
  // Extract future plans
  const plansSection = extractSubsection(content, 'Future Plans');
  commentary.futurePlans = extractListItems(plansSection);
  
  return commentary;
}

/**
 * Parse a GitHub README file into structured data
 * 
 * @param readmeContent - Raw README markdown content
 * @returns Parsed README data structure
 */
export function parseReadme(readmeContent: string): ParsedReadme {
  // Extract title and description
  const titleMatch = readmeContent.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled Project';
  
  // Extract description (first paragraph after title)
  const descriptionMatch = readmeContent.match(/^#\s+.+?\n\n(.+?)(?=\n\n|\n##)/s);
  const description = descriptionMatch ? descriptionMatch[1].trim() : '';
  
  // Extract key features
  const featuresSection = extractSection(readmeContent, '🚀 Key Features');
  const keyFeatures = extractListItems(featuresSection);
  
  // Extract tech stack
  const techStackSection = extractSection(readmeContent, '🛠️ Technology Stack');
  const techStack = extractTechStack(techStackSection);
  
  // Extract problem statement
  const problemSection = extractSection(readmeContent, '🎯 Problem Statement');
  const problem = extractProblem(problemSection);
  
  // Extract architecture
  const architectureSection = extractSection(readmeContent, '🏗️ Architecture');
  const architecture = extractArchitecture(architectureSection);
  
  // Extract performance metrics
  const performanceSection = extractSection(readmeContent, '📊 Performance Metrics');
  const performance = extractPerformance(performanceSection);
  
  // Extract code snippets
  const codeSection = extractSection(readmeContent, '💻 Code Snippets');
  const codeSnippets = extractCodeSnippets(codeSection);
  
  // Extract commentary
  const commentarySection = extractSection(readmeContent, '💭 Commentary');
  const commentary = extractCommentary(commentarySection);
  
  return {
    title,
    description,
    keyFeatures,
    techStack,
    problem,
    architecture,
    performance,
    codeSnippets,
    commentary
  };
}

/**
 * Convert parsed README data to ProjectDetails format
 * 
 * @param parsedReadme - Parsed README data
 * @param projectId - Project ID
 * @returns ProjectDetails object
 */
export function convertToProjectDetails(parsedReadme: ParsedReadme, projectId: string): any {
  return {
    id: projectId,
    title: parsedReadme.title,
    description: parsedReadme.description,
    keyFeatures: parsedReadme.keyFeatures,
    techStack: parsedReadme.techStack,
    problem: parsedReadme.problem,
    architecture: parsedReadme.architecture,
    performance: parsedReadme.performance,
    codeSnippets: parsedReadme.codeSnippets,
    commentary: parsedReadme.commentary
  };
} 