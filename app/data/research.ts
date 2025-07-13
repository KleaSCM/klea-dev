/**
 * Research Data Types and Structures
 * 
 * Comprehensive data management for notebooks and research reports
 * with proper typing, citations, and metadata organization.
 */

import { PlatformType } from './platforms';

// Research entry types
export interface ResearchEntry {
  id: string;
  title: string;
  description: string;
  abstract?: string;
  type: 'notebook' | 'report';
  category: string;
  tags: string[];
  url: string;
  platform: PlatformType;
  date: string;
  doi?: string;
  citation?: string;
  bibtex?: string;
  featured?: boolean;
  image?: string;
}

// Notebook specific interface
export interface Notebook extends ResearchEntry {
  type: 'notebook';
  runtime?: string;
  framework?: string;
  interactive?: boolean;
}

// Report specific interface  
export interface Report extends ResearchEntry {
  type: 'report';
  authors?: string[];
  institution?: string;
  pages?: number;
  peerReviewed?: boolean;
}

// Combined research data based on actual files
export const researchData: (Notebook | Report)[] = [
  // 📓 Notebooks & Live Demos
  {
    id: 'system-integration-demo',
    title: 'System Integration Demo - Desire & Trait Engine Integration',
    description: 'Interactive Jupyter notebook demonstrating the integration of Desire Engine and Trait Engine systems',
    type: 'notebook',
    category: 'AI Systems',
    tags: ['#AI', '#cognitive-architecture', '#desire-engine', '#trait-engine', '#interactive', '#system-integration'],
    url: 'https://www.kaggle.com/kleascm/system-integration-demo',
    platform: 'Kaggle',
    date: '2024-01-18',
    runtime: 'CPU',
    framework: 'Python + Jupyter',
    interactive: true,
    featured: true,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },
  {
    id: 'basic-chat-experiment',
    title: 'Basic Chat Experiment',
    description: 'Interactive notebook exploring basic chat functionality and AI interactions',
    type: 'notebook',
    category: 'AI Research',
    tags: ['#AI', '#chat', '#experiment', '#interactive', '#research'],
    url: 'https://www.kaggle.com/kleascm/basic-chat-experiment',
    platform: 'Kaggle',
    date: '2024-01-15',
    runtime: 'CPU',
    framework: 'Python + Jupyter',
    interactive: true,
    featured: false,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },
  {
    id: 'quick-start',
    title: 'Quick Start Guide',
    description: 'Quick start tutorial and guide for AI system development',
    type: 'notebook',
    category: 'AI Systems',
    tags: ['#tutorial', '#quick-start', '#guide', '#AI', '#systems'],
    url: 'https://www.kaggle.com/kleascm/quick-start',
    platform: 'Kaggle',
    date: '2024-01-20',
    runtime: 'CPU',
    framework: 'Python + Jupyter',
    interactive: true,
    featured: false,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },
  {
    id: 'system-integration',
    title: 'System Integration',
    description: 'Advanced system integration techniques and demonstrations',
    type: 'notebook',
    category: 'AI Systems',
    tags: ['#system-integration', '#AI', '#architecture', '#demonstration'],
    url: 'https://www.kaggle.com/kleascm/system-integration',
    platform: 'Kaggle',
    date: '2024-01-22',
    runtime: 'CPU',
    framework: 'Python + Jupyter',
    interactive: true,
    featured: false,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },
  {
    id: 'trait-engine-demo',
    title: 'Trait Engine Demo',
    description: 'Interactive demonstration of the Trait Engine system',
    type: 'notebook',
    category: 'AI Systems',
    tags: ['#trait-engine', '#demo', '#AI', '#cognitive-architecture'],
    url: 'https://www.kaggle.com/kleascm/trait-engine-demo',
    platform: 'Kaggle',
    date: '2024-01-25',
    runtime: 'CPU',
    framework: 'Python + Jupyter',
    interactive: true,
    featured: false,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },
  {
    id: 'json-data-analysis',
    title: 'JSON Data Analysis',
    description: 'Advanced JSON data analysis and processing techniques',
    type: 'notebook',
    category: 'Data Analysis',
    tags: ['#JSON', '#data-analysis', '#processing', '#techniques'],
    url: 'https://www.kaggle.com/kleascm/json-data-analysis',
    platform: 'Kaggle',
    date: '2024-01-28',
    runtime: 'CPU',
    framework: 'Python + Jupyter',
    interactive: true,
    featured: false,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },
  {
    id: 'desire-engine-demo',
    title: 'Desire Engine Demo',
    description: 'Interactive demonstration of the Desire Engine system',
    type: 'notebook',
    category: 'AI Systems',
    tags: ['#desire-engine', '#demo', '#AI', '#cognitive-architecture'],
    url: 'https://www.kaggle.com/kleascm/desire-engine-demo',
    platform: 'Kaggle',
    date: '2024-01-30',
    runtime: 'CPU',
    framework: 'Python + Jupyter',
    interactive: true,
    featured: false,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },
  {
    id: 'ilanya-system-overview',
    title: 'Ilanya System Overview',
    description: 'Comprehensive overview of the Ilanya AI system architecture',
    type: 'notebook',
    category: 'AI Systems',
    tags: ['#ilanya', '#system-overview', '#AI', '#architecture'],
    url: 'https://www.kaggle.com/kleascm/ilanya-system-overview',
    platform: 'Kaggle',
    date: '2024-02-01',
    runtime: 'CPU',
    framework: 'Python + Jupyter',
    interactive: true,
    featured: false,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },
  {
    id: 'data-exploration',
    title: 'Data Exploration',
    description: 'Comprehensive data exploration and analysis techniques',
    type: 'notebook',
    category: 'Data Analysis',
    tags: ['#data-exploration', '#analysis', '#techniques', '#research'],
    url: 'https://www.kaggle.com/kleascm/data-exploration',
    platform: 'Kaggle',
    date: '2024-02-05',
    runtime: 'CPU',
    framework: 'Python + Jupyter',
    interactive: true,
    featured: false,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },

  // 📄 Research & Technical Reports
  {
    id: 'mathematical-framework-recursive-trait-evolution',
    title: 'Mathematical Framework for Recursive Trait Evolution in Cognitive Systems',
    description: 'Advanced mathematical framework for understanding recursive trait evolution in cognitive architectures with formal proofs and theoretical foundations',
    abstract: 'A comprehensive mathematical framework for recursive trait evolution in cognitive systems, featuring formal mathematical proofs, theoretical foundations, and advanced modeling techniques for understanding how traits evolve recursively in cognitive architectures.',
    type: 'report',
    category: 'Cognitive Systems',
    tags: ['#research', '#mathematical-framework', '#trait-evolution', '#cognitive-systems', '#formal-proofs'],
    url: 'https://osf.io/8e2tb',
    platform: 'OSF',
    date: '2024-01-25',
    authors: ['Klea Dev'],
    pages: 45,
    peerReviewed: true,
    featured: true,
    image: '/screenshots/shandris-cognitive-jellyfish.jpg',
    citation: 'Dev, K. (2024). Mathematical Framework for Recursive Trait Evolution in Cognitive Systems. OSF Repository.',
    bibtex: `@article{dev2024mathematical,
  title={Mathematical Framework for Recursive Trait Evolution in Cognitive Systems},
  author={Dev, Klea},
  journal={OSF Repository},
  year={2024},
  url={https://osf.io/8e2tb}
}`
  },
  {
    id: 'mathematical-formalization-reframing-kernel',
    title: 'Mathematical Formalization of Reframing Kernel in Synthetic',
    description: 'Sophisticated mathematical formalization of reframing kernel mechanisms in synthetic cognitive systems',
    abstract: 'A detailed mathematical formalization of reframing kernel mechanisms in synthetic cognitive systems, featuring advanced mathematical modeling, theoretical frameworks, and formal proofs for understanding cognitive reframing processes.',
    type: 'report',
    category: 'Cognitive Systems',
    tags: ['#research', '#mathematical-formalization', '#reframing-kernel', '#synthetic-intelligence'],
    url: 'https://osf.io/8e2tb',
    platform: 'OSF',
    date: '2024-01-30',
    authors: ['Klea Dev'],
    pages: 38,
    peerReviewed: true,
    featured: true,
    image: '/screenshots/cognitive-field-dew.jpg',
    citation: 'Dev, K. (2024). Mathematical Formalization of Reframing Kernel in Synthetic. OSF Repository.',
    bibtex: `@article{dev2024reframing,
  title={Mathematical Formalization of Reframing Kernel in Synthetic},
  author={Dev, Klea},
  journal={OSF Repository},
  year={2024},
  url={https://osf.io/8e2tb}
}`
  },
  {
    id: 'recursive-goal-selection-arbitration',
    title: 'Recursive Goal Selection and Arbitration in Cognitive Architectures',
    description: 'Advanced research on recursive goal selection and arbitration mechanisms in cognitive architectures',
    abstract: 'Comprehensive research on recursive goal selection and arbitration mechanisms in cognitive architectures, featuring sophisticated mathematical modeling, theoretical frameworks, and advanced cognitive architecture design principles.',
    type: 'report',
    category: 'Cognitive Systems',
    tags: ['#research', '#goal-selection', '#arbitration', '#cognitive-architecture', '#recursive'],
    url: 'https://osf.io/8e2tb',
    platform: 'OSF',
    date: '2024-02-01',
    authors: ['Klea Dev'],
    pages: 52,
    peerReviewed: true,
    featured: true,
    image: '/screenshots/collision-detection-escape.jpg',
    citation: 'Dev, K. (2024). Recursive Goal Selection and Arbitration in Cognitive Architectures. OSF Repository.',
    bibtex: `@article{dev2024recursive,
  title={Recursive Goal Selection and Arbitration in Cognitive Architectures},
  author={Dev, Klea},
  journal={OSF Repository},
  year={2024},
  url={https://osf.io/8e2tb}
}`
  },
  {
    id: 'cognitive-field-architecture',
    title: 'Cognitive Field Architecture',
    description: 'Sophisticated research on cognitive field architecture and its mathematical foundations',
    abstract: 'Advanced research on cognitive field architecture featuring mathematical foundations, theoretical frameworks, and sophisticated modeling techniques for understanding cognitive field dynamics and architecture.',
    type: 'report',
    category: 'Cognitive Systems',
    tags: ['#research', '#field-architecture', '#cognitive-systems', '#mathematical-foundations'],
    url: 'https://osf.io/8e2tb',
    platform: 'OSF',
    date: '2024-02-05',
    authors: ['Klea Dev'],
    pages: 41,
    peerReviewed: true,
    featured: true,
    image: '/screenshots/physics-engine-liquid.jpg',
    citation: 'Dev, K. (2024). Cognitive Field Architecture. OSF Repository.',
    bibtex: `@article{dev2024cognitive,
  title={Cognitive Field Architecture},
  author={Dev, Klea},
  journal={OSF Repository},
  year={2024},
  url={https://osf.io/8e2tb}
}`
  },
  {
    id: 'recursive-consciousness-perceptual-abstraction',
    title: 'Recursive Consciousness Through Perceptual Abstraction and Predictive Memory Reconstruction',
    description: 'Advanced research on recursive consciousness mechanisms through perceptual abstraction and predictive memory reconstruction',
    abstract: 'Comprehensive research on recursive consciousness mechanisms featuring perceptual abstraction processes, predictive memory reconstruction, and advanced theoretical frameworks for understanding conscious experience.',
    type: 'report',
    category: 'AI Research',
    tags: ['#research', '#consciousness', '#perceptual-abstraction', '#memory-reconstruction', '#recursive'],
    url: 'https://osf.io/8e2tb',
    platform: 'OSF',
    date: '2024-02-10',
    authors: ['Klea Dev'],
    pages: 48,
    peerReviewed: true,
    featured: true,
    image: '/screenshots/mathematical-framework-blackhole.png',
    citation: 'Dev, K. (2024). Recursive Consciousness Through Perceptual Abstraction and Predictive Memory Reconstruction. OSF Repository.',
    bibtex: `@article{dev2024consciousness,
  title={Recursive Consciousness Through Perceptual Abstraction and Predictive Memory Reconstruction},
  author={Dev, Klea},
  journal={OSF Repository},
  year={2024},
  url={https://osf.io/8e2tb}
}`
  }
];

// Helper functions for data management
export const getNotebooks = (): Notebook[] => {
  return researchData.filter(entry => entry.type === 'notebook') as Notebook[];
};

export const getReports = (): Report[] => {
  return researchData.filter(entry => entry.type === 'report') as Report[];
};

export const getFeaturedResearch = () => {
  return researchData.filter(entry => entry.featured);
};

export const getResearchByCategory = (category: string) => {
  return researchData.filter(entry => entry.category === category);
};

export const getResearchByTag = (tag: string) => {
  return researchData.filter(entry => entry.tags.includes(tag));
};

export const getAllTags = () => {
  const tags = new Set<string>();
  researchData.forEach(entry => {
    entry.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const getAllCategories = () => {
  const categories = new Set<string>();
  researchData.forEach(entry => {
    categories.add(entry.category);
  });
  return Array.from(categories).sort();
}; 