import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://klea-dev.com'
  const currentDate = new Date()
  
  // Define all projects for dynamic sitemap generation
  const projects = [
    'Ilanya',
    'ArtScape', 
    'GeoGO',
    'PhysicsEngineC',
    'LenoraAI',
    'Astarte',
    'Cognitive',
    'ColorCoded',
    'Gremlincli',
    'Kdemon',
    'Nyxaria',
    'PhysicsEngiMathUtils',
    'PhysicsEngineConst',
    'RigidBody_Physics',
    'ShandrisCogniArcht',
    'Smartcurl',
    'Volatria',
    'VulnSCAN',
    'Wallgremlin'
  ]
  
  // Core pages with high priority
  const corePages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
  
  // Anchor sections for better SEO
  const anchorSections = [
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]
  
  // Generate project pages dynamically
  const projectPages = projects.map(project => ({
    url: `${baseUrl}/projects/${project}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  return [...corePages, ...anchorSections, ...projectPages]
} 