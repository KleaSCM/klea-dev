/**
 * GitHub Service
 * 
 * Fetches project data directly from GitHub API
 * - Gets pinned repositories for featured projects
 * - Fetches repository details and descriptions
 * - Maps GitHub data to our project structure
 */

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  archived: boolean;
  disabled: boolean;
  private: boolean;
}

export interface GitHubProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  github: string;
  live?: string;
  category: string;
  technologies: string[];
  featured: boolean;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  image?: string;
  // Additional fields we'll populate from GitHub
  stars: number;
  forks: number;
  lastUpdated: string;
  language: string;
  topics: string[];
}

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'KleaSCM'; // Your GitHub username

// Specific list of projects for the projects page with manual categories
const PROJECTS_CONFIG = [
  { name: 'Gremlincli', category: 'Systems' },
  { name: 'Kasmeer', category: 'AI/ML' },
  { name: 'Steria', category: 'Systems' },
  { name: 'Ilanya', category: 'AI/ML' },
  { name: 'IlanyaDesireEngine', category: 'AI/ML' },
  { name: 'GeoGO', category: 'Web' },
  { name: 'Leara', category: 'AI/ML' },
  { name: 'Volatria', category: 'Web' },
  { name: 'QD', category: 'AI/ML' },
  { name: 'astarte', category: 'Systems' },
  { name: 'velumlinaura', category: 'AI/ML' },
  { name: 'cognitive', category: 'AI/ML' },
  { name: 'RigidBody_Physics', category: 'Physics' },
  { name: 'PhysicsEngineConst', category: 'Physics' },
  { name: 'PhysicsEngiMathUtils', category: 'Physics' },
  { name: 'AAB_OBBBP', category: 'Physics' },
  { name: 'wallgremlin', category: 'Systems' },
  { name: 'ColorCoded', category: 'Systems' },
  { name: 'vulnSCAN', category: 'Systems' },
  { name: 'smartcurl', category: 'Systems' },
  { name: 'qft-sim', category: 'Physics' }
];

// Extract just the names for the API calls
const PROJECTS_PAGE_REPOS = PROJECTS_CONFIG.map(p => p.name);

// Cache for API responses
let pinnedReposCache: GitHubRepo[] | null = null;
let reposCache: Map<string, GitHubRepo> = new Map();
let projectsCache: GitHubProject[] | null = null;
let featuredProjectsCache: GitHubProject[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Project image mappings using actual screenshots
const PROJECT_IMAGES: Record<string, string> = {
  'Gremlincli': '/screenshots/3d-tech.jpg',
  'Kasmeer': '/screenshots/lenora-ai-ethics-machine.png', 
  'Steria': '/screenshots/smartcurl-cyber-building.jpg',
  'Ilanya': '/screenshots/ilanya-cognitive-robot.png',
  'IlanyaDesireEngine': '/screenshots/cognitive-field-dew.jpg',
  'GeoGO': '/screenshots/geogo-mountain-data.jpg',
  'Leara': '/screenshots/consciousness-mystical-night.jpg',
  'Volatria': '/screenshots/volatria-distributed-city.jpg',
  'QD': '/screenshots/mathematical-framework-blackhole.png',
  'astarte': '/screenshots/abstract-liquid-dynamics.jpg',
  'velumlinaura': '/screenshots/artistic-galaxy-lion.jpg',
  'cognitive': '/screenshots/shandris-cognitive-jellyfish.jpg',
  'RigidBody_Physics': '/screenshots/physics-engine-liquid.jpg',
  'PhysicsEngineConst': '/screenshots/collision-detection-escape.jpg',
  'PhysicsEngiMathUtils': '/screenshots/abstract-liquid-dynamics.jpg',
  'AAB_OBBBP': '/screenshots/collision-detection-escape.jpg',
  'wallgremlin': '/screenshots/kdemon-cyber-daemon.jpg',
  'ColorCoded': '/screenshots/landscape-abstract-neon.jpg',
  'vulnSCAN': '/screenshots/vulnscan-neon-security.jpg',
  'smartcurl': '/screenshots/smartcurl-cyber-building.jpg',
  'qft-sim': '/screenshots/space-black-hole.jpg'
};

// Default images for different categories using actual screenshots
const CATEGORY_DEFAULT_IMAGES = {
  'AI/ML': '/screenshots/lenora-ai-ethics-machine.png',
  'Systems': '/screenshots/smartcurl-cyber-building.jpg',
  'Physics': '/screenshots/physics-engine-liquid.jpg',
  'Web': '/screenshots/volatria-distributed-city.jpg'
};

/**
 * Clear all caches (useful for development or when you update projects)
 */
export function clearCache() {
  pinnedReposCache = null;
  reposCache.clear();
  projectsCache = null;
  featuredProjectsCache = null;
  cacheTimestamp = 0;
  console.log('GitHub cache cleared');
}

/**
 * Check if cache is still valid
 */
function isCacheValid(): boolean {
  return cacheTimestamp > 0 && (Date.now() - cacheTimestamp) < CACHE_DURATION;
}

/**
 * Fetch pinned repositories from GitHub
 * Uses GraphQL API to get pinned repos
 */
export async function getPinnedRepositories(): Promise<GitHubRepo[]> {
  if (pinnedReposCache && isCacheValid()) {
    return pinnedReposCache;
  }

  // Check if we have a GitHub token
  if (!process.env.GITHUB_TOKEN) {
    console.error('No GitHub token found in environment variables');
    return [];
  }

  console.log('Fetching pinned repositories for user:', GITHUB_USERNAME);
  console.log('Using GitHub token:', process.env.GITHUB_TOKEN ? 'Token present' : 'No token');

  try {
    // GraphQL query to get pinned repositories
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                homepageUrl
                primaryLanguage {
                  name
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                stargazerCount
                forkCount
                updatedAt
                createdAt
                isArchived
                isDisabled
                isPrivate
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('GitHub API response:', data);
    
    const pinnedRepos = data.data.user.pinnedItems.nodes;
    console.log('Pinned repos found:', pinnedRepos.length);

    // If no pinned repos, fall back to public repos
    if (!pinnedRepos || pinnedRepos.length === 0) {
      console.log('No pinned repos found, fetching public repos...');
      return await getPublicRepositories();
    }

    // Transform to our format
    const repos: GitHubRepo[] = pinnedRepos.map((repo: any) => ({
      id: parseInt(repo.id),
      name: repo.name,
      full_name: `${GITHUB_USERNAME}/${repo.name}`,
      description: repo.description || '',
      html_url: repo.url,
      homepage: repo.homepageUrl,
      language: repo.primaryLanguage?.name || '',
      topics: repo.repositoryTopics.nodes.map((node: any) => node.topic.name),
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      updated_at: repo.updatedAt,
      created_at: repo.createdAt,
      archived: repo.isArchived,
      disabled: repo.isDisabled,
      private: repo.isPrivate,
    }));

    pinnedReposCache = repos;
    cacheTimestamp = Date.now(); // Update cache timestamp
    return repos;
  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    return [];
  }
}

/**
 * Fetch public repositories from GitHub
 * Fallback when no pinned repos are found
 */
export async function getPublicRepositories(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Transform to our format
    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || '',
      html_url: repo.html_url,
      homepage: repo.homepage || '',
      language: repo.language || '',
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
      created_at: repo.created_at,
      archived: repo.archived,
      disabled: repo.disabled,
      private: repo.private,
    }));
  } catch (error) {
    console.error('Error fetching public repositories:', error);
    return [];
  }
}

/**
 * Fetch repository details by name
 */
export async function getRepository(name: string): Promise<GitHubRepo | null> {
  if (reposCache.has(name)) {
    return reposCache.get(name)!;
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${name}`, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (!response.ok) {
      return null;
    }

    const repo: GitHubRepo = await response.json();
    reposCache.set(name, repo);
    return repo;
  } catch (error) {
    console.error(`Error fetching repository ${name}:`, error);
    return null;
  }
}

/**
 * Map GitHub repository to our project format
 * Uses full repository name as unique ID to prevent duplicates
 */
export function mapGitHubRepoToProject(repo: GitHubRepo): GitHubProject {
  // Determine category based on topics and language
  const category = determineCategory(repo.topics || [], repo.language || '');
  
  // Determine complexity based on stars, forks, and topics, with manual override
  const complexity = determineComplexity(repo.stargazers_count, repo.forks_count, repo.topics || [], repo.name);
  
  // Use full repository name as unique ID to prevent duplicates
  const id = repo.full_name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // Create long description from GitHub description
  const longDescription = repo.description || 'A software project showcasing technical expertise and innovation.';
  
  // Get the appropriate image for this project
  const projectImage = PROJECT_IMAGES[repo.name] || CATEGORY_DEFAULT_IMAGES[category as keyof typeof CATEGORY_DEFAULT_IMAGES] || '/screenshots/default.jpg';
  
  return {
    id,
    title: repo.name,
    description: repo.description || 'A software project showcasing technical expertise.',
    longDescription,
    github: repo.html_url,
    live: repo.homepage || undefined,
    category,
    technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
    featured: true, // Pinned repos are featured
    complexity,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    lastUpdated: repo.updated_at,
    language: repo.language || '',
    topics: repo.topics || [],
    image: projectImage,
  };
}

/**
 * Map GitHub repository to our project format, allowing manual category override
 */
export function mapGitHubRepoToProjectWithCategory(repo: GitHubRepo, category: string): GitHubProject {
  // Use full repository name as unique ID to prevent duplicates
  const id = repo.full_name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // Create long description from GitHub description
  const longDescription = repo.description || 'A software project showcasing technical expertise and innovation.';
  
  // Get the appropriate image for this project
  const projectImage = PROJECT_IMAGES[repo.name] || CATEGORY_DEFAULT_IMAGES[category as keyof typeof CATEGORY_DEFAULT_IMAGES] || '/screenshots/default.jpg';
  
  return {
    id,
    title: repo.name,
    description: repo.description || 'A software project showcasing technical expertise.',
    longDescription,
    github: repo.html_url,
    live: repo.homepage || undefined,
    category,
    technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
    featured: true, // Pinned repos are featured
    complexity: determineComplexity(repo.stargazers_count, repo.forks_count, repo.topics || [], repo.name),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    lastUpdated: repo.updated_at,
    language: repo.language || '',
    topics: repo.topics || [],
    image: projectImage,
  };
}

/**
 * Determine project category based on topics and language
 */
function determineCategory(topics: string[], language: string): string {
  const topicString = topics.join(' ').toLowerCase();
  const langString = (language || '').toLowerCase();
  
  // AI/ML projects
  if (topicString.includes('ai') || topicString.includes('ml') || topicString.includes('machine-learning') || 
      topicString.includes('neural') || topicString.includes('deep') || topicString.includes('cognitive') ||
      topicString.includes('ethics') || topicString.includes('llm')) {
    return 'AI/ML';
  }
  
  // Physics/Simulation projects
  if (topicString.includes('physics') || topicString.includes('simulation') || 
      topicString.includes('game') || topicString.includes('engine') || topicString.includes('collision') ||
      topicString.includes('3d') || topicString.includes('rendering')) {
    return 'Physics';
  }
  
  // Web/Frontend projects
  if (topicString.includes('web') || topicString.includes('frontend') || topicString.includes('react') ||
      topicString.includes('next') || topicString.includes('typescript') || topicString.includes('javascript') ||
      topicString.includes('html') || topicString.includes('css') || langString.includes('typescript') ||
      langString.includes('javascript')) {
    return 'Web';
  }
  
  // Systems/Backend projects
  if (topicString.includes('system') || topicString.includes('distributed') || 
      topicString.includes('microservice') || topicString.includes('api') || topicString.includes('backend') ||
      topicString.includes('server') || topicString.includes('database') || topicString.includes('cli') ||
      langString.includes('go') || langString.includes('rust') || topicString.includes('geospatial') ||
      topicString.includes('security') || topicString.includes('vulnerability')) {
    return 'Systems';
  }
  
  // Research projects (fallback)
  return 'Research';
}

/**
 * Manual complexity mapping for specific projects
 * This overrides the automatic scoring for projects we know are more complex
 */
const MANUAL_COMPLEXITY_MAP: Record<string, 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'> = {
  'vulnSCAN': 'Expert',
  'Gremlincli': 'Advanced',
  'Kasmeer': 'Expert',
  'Steria': 'Advanced',
  'Ilanya': 'Expert',
  'IlanyaDesireEngine': 'Expert',
  'GeoGO': 'Advanced',
  'Leara': 'Expert',
  'Volatria': 'Advanced',
  'QD': 'Expert',
  'astarte': 'Advanced',
  'velumlinaura': 'Expert',
  'cognitive': 'Expert',
  'RigidBody_Physics': 'Expert',
  'PhysicsEngineConst': 'Expert',
  'PhysicsEngiMathUtils': 'Expert',
  'AAB_OBBBP': 'Expert',
  'wallgremlin': 'Advanced',
  'ColorCoded': 'Intermediate',
  'smartcurl': 'Advanced',
  'qft-sim': 'Expert'
};

/**
 * Determine project complexity based on metrics
 */
function determineComplexity(stars: number, forks: number, topics: string[], repoName?: string): 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' {
  // Check manual complexity mapping first
  if (repoName && MANUAL_COMPLEXITY_MAP[repoName]) {
    return MANUAL_COMPLEXITY_MAP[repoName];
  }
  
  // Fallback to automatic scoring
  const score = stars + (forks * 2) + (topics.length * 5);
  
  if (score >= 100) return 'Expert';
  if (score >= 50) return 'Advanced';
  if (score >= 20) return 'Intermediate';
  return 'Beginner';
}

/**
 * Get all featured projects from pinned repositories
 */
export async function getFeaturedProjects(): Promise<GitHubProject[]> {
  if (featuredProjectsCache && isCacheValid()) {
    console.log('📦 Using cached featured projects');
    return featuredProjectsCache;
  }
  
  console.log('🔄 Fetching fresh featured projects from GitHub...');
  const pinnedRepos = await getPinnedRepositories();
  const projects = pinnedRepos.map(mapGitHubRepoToProject);
  featuredProjectsCache = projects;
  cacheTimestamp = Date.now(); // Update cache timestamp
  console.log(`✅ Cached ${projects.length} featured projects`);
  return projects;
}

/**
 * Get a specific project by ID
 */
export async function getProjectById(id: string): Promise<GitHubProject | null> {
  const pinnedRepos = await getPinnedRepositories();
  const project = pinnedRepos.find(repo => 
    repo.full_name.toLowerCase().replace(/[^a-z0-9]/g, '-') === id
  );
  
  return project ? mapGitHubRepoToProject(project) : null;
}

/**
 * Get projects for the projects page from the specific list
 */
export async function getProjectsPageProjects(): Promise<GitHubProject[]> {
  if (projectsCache && isCacheValid()) {
    console.log('📦 Using cached projects page data');
    return projectsCache;
  }
  
  console.log('🔄 Fetching fresh projects from specific list:', PROJECTS_PAGE_REPOS);
  
  const projects: GitHubProject[] = [];
  const seenIds = new Set<string>(); // Track seen IDs to prevent duplicates
  
  for (const repoName of PROJECTS_PAGE_REPOS) {
    const repo = await getRepository(repoName);
    if (repo) {
      // Find the manual category for this project
      const projectConfig = PROJECTS_CONFIG.find(p => p.name === repoName);
      const manualCategory = projectConfig?.category || 'Systems'; // Default to Systems
      
      const project = mapGitHubRepoToProjectWithCategory(repo, manualCategory);
      
      // Only add if we haven't seen this ID before
      if (!seenIds.has(project.id)) {
        projects.push(project);
        seenIds.add(project.id);
      } else {
        console.log(`Skipping duplicate project: ${repoName} (ID: ${project.id})`);
      }
    } else {
      console.log(`Repository not found: ${repoName}`);
    }
  }
  
  projectsCache = projects; // Cache the result
  cacheTimestamp = Date.now(); // Update cache timestamp
  console.log(`✅ Cached ${projects.length} unique projects`);
  return projects;
}

/**
 * Get additional projects from a configurable list
 */
export async function getAdditionalProjects(): Promise<GitHubProject[]> {
  // You can configure this list in an environment variable or config file
  const additionalRepos = [
    'volatria',
    'geogo',
    'physics-engine-c',
    // Add more repo names here
  ];
  
  const projects: GitHubProject[] = [];
  
  for (const repoName of additionalRepos) {
    const repo = await getRepository(repoName);
    if (repo) {
      projects.push(mapGitHubRepoToProject(repo));
    }
  }
  
  return projects;
}

/**
 * Get all projects (featured + additional)
 */
export async function getAllProjects(): Promise<GitHubProject[]> {
  if (projectsCache && isCacheValid()) {
    return projectsCache;
  }
  const [featured, additional] = await Promise.all([
    getFeaturedProjects(),
    getAdditionalProjects(),
  ]);
  
  const allProjects = [...featured, ...additional];
  projectsCache = allProjects; // Cache the result
  cacheTimestamp = Date.now(); // Update cache timestamp
  return allProjects;
} 

/**
 * Fetch README content from GitHub repository
 */
export async function getRepositoryReadme(name: string): Promise<string | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${name}/readme`, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    // Decode base64 content
    if (data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return content;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching README for ${name}:`, error);
    return null;
  }
} 