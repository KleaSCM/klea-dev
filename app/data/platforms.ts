/**
 * Platform Configuration
 * 
 * Centralized configuration for all platforms used in the application.
 * This eliminates magic strings and provides a single source of truth
 * for platform metadata including colors, icons, and URLs.
 * 
 * @module platforms
 */

export type PlatformType = 'Kaggle' | 'GitHub' | 'nbviewer' | 'OSF' | 'Overleaf' | 'ORCID' | 'LinkedIn' | 'Email';

export interface PlatformMeta {
  color: string;
  icon: string;
  label: string;
  baseUrl?: string;
  description: string;
}

/**
 * Platform metadata configuration
 * 
 * Centralized object containing all platform-specific styling and metadata.
 * This eliminates magic strings throughout the application and provides
 * a single source of truth for platform configuration.
 */
export const PlatformMeta: Record<PlatformType, PlatformMeta> = {
  Kaggle: {
    color: 'from-blue-500 to-blue-600',
    icon: '📊',
    label: 'Kaggle',
    baseUrl: 'https://kaggle.com',
    description: 'Data science and machine learning platform'
  },
  GitHub: {
    color: 'from-gray-500 to-gray-600',
    icon: '🐙',
    label: 'GitHub',
    baseUrl: 'https://github.com',
    description: 'Code repository and version control platform'
  },
  nbviewer: {
    color: 'from-orange-500 to-orange-600',
    icon: '📓',
    label: 'nbviewer',
    baseUrl: 'https://nbviewer.org',
    description: 'Jupyter notebook viewer'
  },
  OSF: {
    color: 'from-green-500 to-green-600',
    icon: '🔬',
    label: 'OSF',
    baseUrl: 'https://osf.io',
    description: 'Open Science Framework for research collaboration'
  },
  Overleaf: {
    color: 'from-green-500 to-green-600',
    icon: '📝',
    label: 'Overleaf',
    baseUrl: 'https://overleaf.com',
    description: 'LaTeX document collaboration platform'
  },
  ORCID: {
    color: 'from-green-600 to-green-700',
    icon: '🆔',
    label: 'ORCID',
    baseUrl: 'https://orcid.org',
    description: 'Open Researcher and Contributor ID'
  },
  LinkedIn: {
    color: 'from-blue-600 to-blue-700',
    icon: '💼',
    label: 'LinkedIn',
    baseUrl: 'https://linkedin.com',
    description: 'Professional networking platform'
  },
  Email: {
    color: 'from-red-500 to-red-600',
    icon: '📧',
    label: 'Email',
    description: 'Email communication'
  }
};

/**
 * Helper function to get platform metadata
 * 
 * @param platform - The platform type
 * @returns Platform metadata object
 */
export const getPlatformMeta = (platform: PlatformType): PlatformMeta => {
  return PlatformMeta[platform];
};

/**
 * Helper function to get platform color
 * 
 * @param platform - The platform type
 * @returns Platform color gradient classes
 */
export const getPlatformColor = (platform: PlatformType): string => {
  return PlatformMeta[platform].color;
};

/**
 * Helper function to get platform icon
 * 
 * @param platform - The platform type
 * @returns Platform icon emoji
 */
export const getPlatformIcon = (platform: PlatformType): string => {
  return PlatformMeta[platform].icon;
};

/**
 * Helper function to get platform label
 * 
 * @param platform - The platform type
 * @returns Platform display label
 */
export const getPlatformLabel = (platform: PlatformType): string => {
  return PlatformMeta[platform].label;
};

/**
 * Helper function to get platform description
 * 
 * @param platform - The platform type
 * @returns Platform description
 */
export const getPlatformDescription = (platform: PlatformType): string => {
  return PlatformMeta[platform].description;
};

/**
 * Get all available platforms
 * 
 * @returns Array of platform types
 */
export const getAllPlatforms = (): PlatformType[] => {
  return Object.keys(PlatformMeta) as PlatformType[];
};

/**
 * Validate if a platform exists
 * 
 * @param platform - The platform to validate
 * @returns True if platform exists, false otherwise
 */
export const isValidPlatform = (platform: string): platform is PlatformType => {
  return platform in PlatformMeta;
}; 