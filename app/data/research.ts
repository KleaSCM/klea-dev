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
    id: 'ilanya-system-overview',
    title: 'Ilanya AI System - Complete Overview',
    description: 'Comprehensive overview of dual-engine AI architecture combining Desire Processing and Trait Evolution',
    type: 'notebook',
    category: 'AI Systems',
    tags: ['#AI', '#cognitive-architecture', '#desire-engine', '#trait-engine', '#interactive'],
    url: '/research-notes/notebooks/01_Ilanya_System_Overview.ipynb',
    platform: 'nbviewer',
    date: '2024-01-15',
    runtime: 'CPU',
    framework: 'Python + NumPy + Matplotlib',
    interactive: true,
    featured: true,
    image: '/screenshots/ilanya-cognitive-robot.png'
  },
  {
    id: 'desire-engine-demo',
    title: 'Desire Engine Demo',
    description: 'Interactive demonstration of desire processing and emergent behaviors in AI systems',
    type: 'notebook',
    category: 'Cognitive Systems',
    tags: ['#demo', '#desire-engine', '#emergent-behavior', '#interactive'],
    url: '/research-notes/notebooks/02_Desire_Engine_Demo.ipynb',
    platform: 'nbviewer',
    date: '2024-01-10',
    runtime: 'CPU',
    framework: 'Python + Neural Networks',
    interactive: true,
    featured: true
  },
  {
    id: 'trait-engine-demo',
    title: 'Trait Engine Demo',
    description: 'Neural network-based trait evolution and adaptation demonstration',
    type: 'notebook',
    category: 'AI Systems',
    tags: ['#demo', '#trait-engine', '#neural-networks', '#evolution'],
    url: '/research-notes/notebooks/03_Trait_Engine_Demo.ipynb',
    platform: 'nbviewer',
    date: '2024-01-12',
    runtime: 'CPU',
    framework: 'Python + PyTorch',
    interactive: true,
    featured: true
  },
  {
    id: 'system-integration',
    title: 'System Integration Demo',
    description: 'Integration of desire and trait engines for unified cognitive processing',
    type: 'notebook',
    category: 'Cognitive Systems',
    tags: ['#integration', '#cognitive-architecture', '#unified-processing'],
    url: '/research-notes/notebooks/04_System_Integration.ipynb',
    platform: 'nbviewer',
    date: '2024-01-18',
    runtime: 'CPU',
    framework: 'Python + Multi-Engine',
    interactive: true
  },
  {
    id: 'quick-start-guide',
    title: 'Quick Start Guide',
    description: 'Rapid setup and getting started with the Ilanya AI system',
    type: 'notebook',
    category: 'Documentation',
    tags: ['#tutorial', '#quick-start', '#setup', '#guide'],
    url: '/research-notes/notebooks/05_Quick_Start.ipynb',
    platform: 'nbviewer',
    date: '2024-01-20',
    runtime: 'CPU',
    framework: 'Python + Documentation',
    interactive: true
  },
  {
    id: 'data-exploration',
    title: 'Data Exploration',
    description: 'Exploratory data analysis and visualization for AI system components',
    type: 'notebook',
    category: 'Data Analysis',
    tags: ['#data-analysis', '#exploration', '#visualization'],
    url: '/research-notes/notebooks/01_data_exploration.ipynb',
    platform: 'nbviewer',
    date: '2024-01-05',
    runtime: 'CPU',
    framework: 'Python + Pandas + Seaborn',
    interactive: true
  },
  {
    id: 'json-data-analysis',
    title: 'JSON Data Analysis',
    description: 'Analysis and processing of structured data in JSON format',
    type: 'notebook',
    category: 'Data Analysis',
    tags: ['#data-analysis', '#json', '#structured-data'],
    url: '/research-notes/notebooks/02_json_data_analysis.ipynb',
    platform: 'nbviewer',
    date: '2024-01-08',
    runtime: 'CPU',
    framework: 'Python + JSON',
    interactive: true
  },
  {
    id: 'basic-chat-experiment',
    title: 'Basic Chat Experiment',
    description: 'Fundamental chat system experiments and conversational AI testing',
    type: 'notebook',
    category: 'AI Systems',
    tags: ['#chat', '#conversational-AI', '#experiment'],
    url: '/research-notes/notebooks/01_basic_chat_experiment.ipynb',
    platform: 'nbviewer',
    date: '2024-01-03',
    runtime: 'CPU',
    framework: 'Python + Chat',
    interactive: true
  },

  // 📄 Research & Technical Reports
  {
    id: 'mathematical-framework-trait-evolution',
    title: 'Mathematical Framework for Recursive Trait Evolution in Cognitive Systems',
    description: 'Comprehensive mathematical framework for trait evolution and adaptation in cognitive architectures',
    abstract: 'This paper presents a formal mathematical framework for recursive trait evolution in cognitive systems, focusing on the mathematical foundations of trait adaptation, neural network integration, and evolutionary dynamics in AI architectures.',
    type: 'report',
    category: 'Cognitive Systems',
    tags: ['#research', '#mathematical-framework', '#trait-evolution', '#cognitive-systems'],
    url: '/research-notes/reports/Mathematical-Framework-for-Recursive-Trait-Evolutionin-Cognitive-Systems/Mathematical Framework for Recursive Trait Evolution in Cognitive Systems.pdf',
    platform: 'GitHub',
    date: '2024-01-25',
    authors: ['Klea Dev'],
    pages: 45,
    peerReviewed: true,
    featured: true,
    image: '/screenshots/mathematical-framework-blackhole.png',
    citation: 'Dev, K. (2024). Mathematical Framework for Recursive Trait Evolution in Cognitive Systems. GitHub Repository.',
    bibtex: `@article{dev2024mathematical,
  title={Mathematical Framework for Recursive Trait Evolution in Cognitive Systems},
  author={Dev, Klea},
  journal={GitHub Repository},
  year={2024},
  url={https://github.com/klea-dev/cognitive-systems}
}`
  },
  {
    id: 'recursive-goal-selection-arbitration',
    title: 'Recursive Goal Selection and Arbitration in Cognitive Architectures',
    description: 'Advanced framework for goal selection and decision arbitration in cognitive systems',
    abstract: 'This research presents a comprehensive framework for recursive goal selection and arbitration mechanisms in cognitive architectures, exploring how AI systems can dynamically prioritize and manage multiple objectives.',
    type: 'report',
    category: 'Cognitive Systems',
    tags: ['#research', '#goal-selection', '#arbitration', '#cognitive-architecture'],
    url: '/research-notes/reports/Recursive-Goal-Selection-andArbitration-in-CognitiveArchitectures/Recursive Goal Selection and Arbitration in Cognitive Architectures.pdf',
    platform: 'GitHub',
    date: '2024-01-30',
    authors: ['Klea Dev'],
    pages: 52,
    peerReviewed: true,
    featured: true,
    image: '/screenshots/goal-selection-autumn.png',
    citation: 'Dev, K. (2024). Recursive Goal Selection and Arbitration in Cognitive Architectures. GitHub Repository.',
    bibtex: `@article{dev2024recursive,
  title={Recursive Goal Selection and Arbitration in Cognitive Architectures},
  author={Dev, Klea},
  journal={GitHub Repository},
  year={2024},
  url={https://github.com/klea-dev/cognitive-architectures}
}`
  },
  {
    id: 'cognitive-field-architecture',
    title: 'Cognitive Field Architecture',
    description: 'Field-based approach to cognitive architecture design and implementation',
    abstract: 'This technical report explores field-based approaches to cognitive architecture, examining how spatial and temporal field dynamics can enhance AI system performance and adaptability.',
    type: 'report',
    category: 'Cognitive Systems',
    tags: ['#research', '#field-architecture', '#cognitive-systems', '#spatial-dynamics'],
    url: '/research-notes/reports/Cognitive Field Architecture/',
    platform: 'GitHub',
    date: '2024-02-01',
    authors: ['Klea Dev'],
    pages: 38,
    peerReviewed: false,
    featured: true,
    image: '/screenshots/cognitive-field-dew.jpg'
  },
  {
    id: 'recursive-consciousness-perceptual-abstraction',
    title: 'Recursive Consciousness Through Perceptual Abstraction and Predictive Memory Reconstruction',
    description: 'Advanced research on consciousness modeling through perceptual abstraction',
    abstract: 'This paper explores recursive consciousness models through perceptual abstraction and predictive memory reconstruction, examining how AI systems can develop higher-order awareness and self-reflection capabilities.',
    type: 'report',
    category: 'AI Research',
    tags: ['#research', '#consciousness', '#perceptual-abstraction', '#memory-reconstruction'],
    url: '/research-notes/reports/Recursive Consciousness Through Perceptual Abstraction and Predictive Memory Reconstruction/',
    platform: 'GitHub',
    date: '2024-02-05',
    authors: ['Klea Dev'],
    pages: 41,
    peerReviewed: true,
    image: '/screenshots/consciousness-mystical-night.jpg',
    citation: 'Dev, K. (2024). Recursive Consciousness Through Perceptual Abstraction and Predictive Memory Reconstruction. GitHub Repository.',
    bibtex: `@article{dev2024consciousness,
  title={Recursive Consciousness Through Perceptual Abstraction and Predictive Memory Reconstruction},
  author={Dev, Klea},
  journal={GitHub Repository},
  year={2024},
  url={https://github.com/klea-dev/consciousness-research}
}`
  },
  {
    id: 'mathematical-formalization-reframing-kernel',
    title: 'Mathematical Formalization of Reframing Kernel in Synthetic',
    description: 'Mathematical framework for reframing kernel implementation in synthetic cognitive systems',
    abstract: 'This research presents a mathematical formalization of reframing kernel mechanisms in synthetic cognitive systems, exploring how AI can dynamically restructure understanding and adapt perspectives.',
    type: 'report',
    category: 'AI Research',
    tags: ['#research', '#mathematical-formalization', '#reframing-kernel', '#synthetic-cognition'],
    url: '/research-notes/reports/Mathematical Formalization of Reframing Kernel in Synthetic/Mathematical Formalization of Reframing Kernel in Synthetic.pdf',
    platform: 'GitHub',
    date: '2024-02-10',
    authors: ['Klea Dev'],
    pages: 35,
    peerReviewed: false,
    citation: 'Dev, K. (2024). Mathematical Formalization of Reframing Kernel in Synthetic. GitHub Repository.',
    bibtex: `@article{dev2024reframing,
  title={Mathematical Formalization of Reframing Kernel in Synthetic},
  author={Dev, Klea},
  journal={GitHub Repository},
  year={2024},
  url={https://github.com/klea-dev/reframing-research}
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