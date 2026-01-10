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
    // New sections
    installation: any[];
    usage: any[];
    prerequisites: string[];
    contact: string[];
    // Interactive Demo Section
    interactiveDemo: {
        title: string;
        description: string;
        code: string;
        language: string;
        output: string;
    } | null;
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
        // console.warn(`Subsection header not found: ${startHeader}`);
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
function extractKeyValuePairs(content: string): Array<{ name: string, value: string, description: string }> {
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
    }).filter(Boolean) as Array<{ name: string, value: string, description: string }>;
}

/**
 * Extract code blocks with their metadata
 * 
 * @param content - Section content
 * @returns Array of code snippet objects
 */
function extractCodeSnippets(content: string): Array<{ title: string, description: string, language: string, code: string, explanation: string }> {
    // Relaxed pattern to be more forgiving about spaces and structure
    // Looks for ### Title, then ```lang block, then **Explanation**:
    const snippets: Array<{ title: string, description: string, language: string, code: string, explanation: string }> = [];

    const sections = content.split('###');

    for (const section of sections) {
        if (!section.trim()) continue;

        const titleMatch = section.match(/^\s*(.+?)\s*\n/);
        if (!titleMatch) continue;
        const title = titleMatch[1].trim();

        const codeMatch = section.match(/```(\w+)\n([\s\S]*?)```/);
        if (!codeMatch) continue;

        const language = codeMatch[1].trim();
        const code = codeMatch[2].trim();

        // Look for explanation
        let explanation = '';
        const explanationMatch = section.match(/\*\*Explanation\*\*:\s*([\s\S]+?)(?=$)/);
        if (explanationMatch) {
            explanation = explanationMatch[1].trim();
        }

        snippets.push({
            title,
            description: title,
            language,
            code,
            explanation
        });
    }

    return snippets;
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
    techStack.platforms = extractListItems(toolsSection); // Platforms are in the same section, usually mixed

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
 * Extract installation instructions
 * 
 * @param content - Installation section content
 * @returns Array of installation steps
 */
function extractInstallation(content: string): any[] {
    const steps: any[] = [];
    const sections = content.split('###');

    for (const section of sections) {
        if (!section.trim()) continue;

        const titleMatch = section.match(/^\s*(.+?)\s*\n/);
        const title = titleMatch ? titleMatch[1].trim() : 'Step';

        const codeMatch = section.match(/```(\w*)\n([\s\S]*?)```/);
        const code = codeMatch ? codeMatch[2].trim() : '';
        const language = codeMatch ? codeMatch[1].trim() : '';

        // Extract description (text that is not title or code)
        let description = section
            .replace(/^\s*(.+?)\s*\n/, '') // Remove title
            .replace(/```(\w*)\n([\s\S]*?)```/, '') // Remove code
            .trim();

        if (code) {
            steps.push({
                title,
                code,
                language,
                description
            });
        } else {
            // If no code block, treat as simple string item if it's a list, otherwise just text
            const listItems = extractListItems(" - " + section.trim());
            if (listItems.length > 0) {
                steps.push(listItems[0]);
            } else {
                steps.push(section.trim());
            }
        }
    }

    // Fallback for simple lists if no subsections
    if (steps.length === 0) {
        return extractListItems(content);
    }

    return steps;
}

/**
 * Extract usage instructions
 * 
 * @param content - Usage section content
 * @returns Array of usage instructions
 */
function extractUsage(content: string): any[] {
    // Reuse similar logic to code snippets/installation but simpler
    const items: any[] = [];
    const sections = content.split('###');

    if (sections.length <= 1) {
        return extractListItems(content);
    }

    for (const section of sections) {
        if (!section.trim()) continue;

        const titleMatch = section.match(/^\s*(.+?)\s*\n/);
        const title = titleMatch ? titleMatch[1].trim() : 'Usage';

        const codeMatch = section.match(/```(\w*)\n([\s\S]*?)```/);
        const code = codeMatch ? codeMatch[2].trim() : '';
        const language = codeMatch ? codeMatch[1].trim() : '';

        const description = section
            .replace(/^\s*(.+?)\s*\n/, '')
            .replace(/```(\w*)\n([\s\S]*?)```/, '')
            .trim();

        items.push({
            title,
            code,
            language,
            description
        });
    }

    return items;
}

/**
 * Extract prerequisites
 * 
 * @param content - Prerequisites section content
 * @returns Array of prerequisites
 */
function extractPrerequisites(content: string): string[] {
    return extractListItems(content);
}

/**
 * Extract contact info
 * 
 * @param content - Contact section content
 * @returns Array of contact strings
 */
function extractContact(content: string): string[] {
    return extractListItems(content);
}

/**
 * Extract interactive demo content
 * 
 * @param content - Interactive demo section content
 * @returns Interactive demo object or null
 */
function extractInteractiveDemo(content: string): ParsedReadme['interactiveDemo'] {
    if (!content.trim()) return null;

    // 1. Extract Title (first ### header)
    const titleMatch = content.match(/^###\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : 'Project Demo';

    // 2. Extract Description (text between title and first code block)
    // Remove title line
    let remaining = content.replace(/^###\s+.+$/m, '');

    // Find start of first code block
    const firstCodeBlockIndex = remaining.indexOf('```');

    let description = '';
    if (firstCodeBlockIndex !== -1) {
        description = remaining.substring(0, firstCodeBlockIndex).trim();
    } else {
        description = remaining.trim();
    }

    // 3. Extract Code (first code block)
    const codeMatch = content.match(/```(\w+)\n([\s\S]*?)```/);
    const language = codeMatch ? codeMatch[1].trim() : 'typescript';
    const code = codeMatch ? codeMatch[2].trim() : '';

    // 4. Extract Output (labeled Output block or second code block)
    // Look for a specific "Output" section or label
    let output = '';

    // Check for explicit "Output:" or similar label followed by code block
    const outputMatch = content.match(/\*\*Output\*\*:\s*\n```[\s\S]*?\n([\s\S]*?)```/);

    if (outputMatch) {
        output = outputMatch[1].trim();
    } else {
        // Fallback: finding the SECOND code block if no explicit label
        // We find all code blocks
        const allCodeBlocks = [...content.matchAll(/```(\w*)\n([\s\S]*?)```/g)];
        if (allCodeBlocks.length >= 2) {
            output = allCodeBlocks[1][2].trim();
        }
    }

    if (!code) return null; // A demo without code is invalid

    return {
        title,
        description,
        code,
        language,
        output
    };
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
    // Look for text that isn't a header and isn't empty, after the title
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

    // Extract Installation
    const installationSection = extractSection(readmeContent, '📥 Installation');
    const installation = extractInstallation(installationSection);

    // Extract Usage
    const usageSection = extractSection(readmeContent, '🚀 Usage'); // Or specific usage header
    const usage = extractUsage(usageSection);

    // Extract Prerequisites
    const prereqSection = extractSection(readmeContent, '📋 Prerequisites');
    const prerequisites = extractPrerequisites(prereqSection);

    // Extract Contact
    const contactSection = extractSection(readmeContent, '📫 Contact');
    const contact = extractContact(contactSection);

    // Extract Interactive Demo
    const demoSection = extractSection(readmeContent, '🎮 Interactive Demo');
    const interactiveDemo = extractInteractiveDemo(demoSection);

    return {
        title,
        description,
        keyFeatures,
        techStack,
        problem,
        architecture,
        performance,
        codeSnippets,
        commentary,
        installation,
        usage,
        prerequisites,
        contact,
        interactiveDemo
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
        highlights: parsedReadme.keyFeatures, // Mapped to highlights
        technicalStack: parsedReadme.techStack, // Mapped to technicalStack
        problemStatement: parsedReadme.problem.statement,
        // Merge problem details if needed

        architecture: parsedReadme.architecture.components.length > 0
            ? parsedReadme.architecture.components
            : parsedReadme.architecture.overview,

        designPatterns: parsedReadme.architecture.patterns,

        performanceStats: parsedReadme.performance.metrics.reduce((acc, metric) => {
            acc[metric.name] = metric.value;
            return acc;
        }, {} as Record<string, string>),

        // Transform code snippets to object map
        codeSnippets: parsedReadme.codeSnippets.reduce((acc, snippet) => {
            acc[snippet.title] = {
                code: snippet.code,
                language: snippet.language,
                description: snippet.explanation || snippet.description
            };
            return acc;
        }, {} as any),

        commentary: parsedReadme.commentary.motivation, // Use motivation as main commentary
        lessonsLearned: parsedReadme.commentary.lessonsLearned,
        futurePlans: parsedReadme.commentary.futurePlans,

        complexity: parsedReadme.commentary.designDecisions.join('\n'), // Put design decisions somewhere

        // Map new sections
        installation: parsedReadme.installation,
        usage: parsedReadme.usage,
        prerequisites: parsedReadme.prerequisites,
        contact: parsedReadme.contact,
        interactiveDemo: parsedReadme.interactiveDemo
    };
}
