export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image?: string;
  github?: string;
  live?: string;
  featured: boolean;
  category: 'AI/ML' | 'Physics' | 'Systems' | 'Web' | 'Research';
  highlights: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  impact: string;
}

export const projects: Project[] = [
  {
    id: 'lenora-ai',
    title: 'LenoraAI - Advanced Ethics State Machine',
    description: 'Sophisticated AI system combining mathematical ethical reasoning with LLM integration to solve complex ethical dilemmas.',
    longDescription: 'An advanced AI system that implements a sophisticated ethics state machine capable of parsing ethical scenarios, performing mathematical calculations across multiple ethical frameworks (Utilitarianism, Deontology, Virtue Ethics, Rights-Based Ethics, Care Ethics), and generating thoughtful responses using LLMs like OpenHermes. The system features weighted scoring, agent-based modeling, consequence calculation, and optimization algorithms to find the most ethical solutions.',
    technologies: ['Python', 'OpenAI API', 'OpenHermes', 'Ollama', 'JSON', 'CLI', 'Mathematical Modeling', 'Ethical Frameworks'],
    image: '/screenshots/lenora-ai-ethics-machine.png',
    featured: true,
    category: 'AI/ML',
    highlights: [
      'Multi-framework ethical analysis across 5 major theories',
      'Advanced mathematical modeling with weighted scoring',
      'Agent-based modeling with individual attributes',
      'LLM integration with OpenHermes and API support',
      'Interactive CLI with comprehensive reporting'
    ],
    complexity: 'Expert',
    impact: 'Demonstrates advanced AI ethics and mathematical reasoning capabilities, showing deep understanding of both AI systems and philosophical frameworks.'
  },
  {
    id: 'physics-engine-c',
    title: 'PhysicsEngineC - High-Performance C++ Physics Engine',
    description: 'Modular physics engine built from the ground up with real-time simulation, collision detection, and rigid body dynamics.',
    longDescription: 'A C++-based modular physics engine designed for educational use, integration into custom engines, or research-driven physics systems. Features comprehensive collision detection (Sphere-vs-Sphere, AABB-vs-AABB, OBB-vs-OBB), impulse resolution, rigid body dynamics, quaternion-based rotation, and broad phase optimization using uniform grid spatial hashing.',
    technologies: ['C++17', 'CMake', 'OpenGL', 'WebGL', 'JavaScript', 'Mathematics', 'Physics Simulation', 'Collision Detection'],
    image: '/screenshots/physics-engine-liquid.jpg',
    featured: true,
    category: 'Physics',
    highlights: [
      'Comprehensive collision detection system',
      'Rigid body dynamics with quaternion rotation',
      'Broad phase optimization with spatial hashing',
      'Modular architecture for extensibility',
      'Web-based visualization interface'
    ],
    complexity: 'Expert',
    impact: 'Shows mastery of low-level systems programming, mathematical physics, and real-time simulation techniques.'
  },
  {
    id: 'ilanya-ai',
    title: 'Ilanya - Advanced AI Cognitive Architecture',
    description: 'Complex AI system featuring desire engines, trait engines, and emergent behavior modeling with neural network integration.',
    longDescription: 'A sophisticated AI cognitive architecture featuring independent desire and trait engines that can operate separately or together. Includes transformer-based models for complex pattern recognition, embedding layers for trait and desire representation, attention mechanisms for interaction modeling, and comprehensive logging and testing infrastructure.',
    technologies: ['Python', 'Neural Networks', 'Transformers', 'Embeddings', 'Attention Mechanisms', 'State Management', 'REST API'],
    image: '/screenshots/ilanya-cognitive-robot.png',
    featured: true,
    category: 'AI/ML',
    highlights: [
      'Modular architecture with independent engines',
      'Transformer-based neural network integration',
      'Emergent behavior modeling',
      'Comprehensive testing and logging',
      'RESTful API for external integration'
    ],
    complexity: 'Expert',
    impact: 'Demonstrates deep understanding of AI architecture, neural networks, and cognitive modeling at an advanced research level.'
  },
  {
    id: 'geogo',
    title: 'GeoGO - Geographic Data Processing Platform',
    description: 'Full-stack platform for processing and visualizing geographic datasets with advanced data analysis capabilities.',
    longDescription: 'A comprehensive geographic data processing platform featuring both backend (Go) and frontend (Next.js) components. Includes advanced data processing, geocoding capabilities, dataset management, and interactive visualizations for geographic data analysis.',
    technologies: ['Go', 'Next.js', 'TypeScript', 'PostgreSQL', 'Geographic Data', 'Data Processing', 'Visualization'],
    image: '/screenshots/geogo-mountain-data.jpg',
    featured: true,
    category: 'Web',
    highlights: [
      'Full-stack geographic data processing',
      'Advanced geocoding and data analysis',
      'Interactive data visualization',
      'Scalable backend architecture',
      'Modern frontend with Next.js'
    ],
    complexity: 'Advanced',
    impact: 'Shows full-stack development skills with focus on data processing and geographic information systems.'
  },
  {
    id: 'volatria',
    title: 'Volatria - Distributed Systems Platform',
    description: 'Modern distributed systems platform with microservices architecture and containerized deployment.',
    longDescription: 'A distributed systems platform built with modern microservices architecture, featuring containerized deployment with Docker, scalable backend services, and a modern frontend dashboard. Demonstrates expertise in distributed systems, containerization, and scalable architecture patterns.',
    technologies: ['Go', 'Docker', 'Microservices', 'React', 'TypeScript', 'Distributed Systems', 'Containerization'],
    image: '/screenshots/volatria-distributed-city.jpg',
    featured: true,
    category: 'Web',
    highlights: [
      'Microservices architecture',
      'Containerized deployment',
      'Scalable backend services',
      'Modern dashboard interface',
      'Distributed systems design'
    ],
    complexity: 'Advanced',
    impact: 'Demonstrates expertise in modern distributed systems and microservices architecture.'
  },
  {
    id: 'shandris-cogni',
    title: 'Shandris Cognitive Architecture - Mathematical Framework',
    description: 'Formal mathematical framework for advanced cognitive architecture with sophisticated trait evolution and emotional intelligence modeling.',
    longDescription: 'A comprehensive mathematical framework for cognitive architecture that combines vector space theory, dynamical systems, information theory, and control theory. Features sophisticated trait evolution models, emotional intelligence neural networks, memory system Markov processes, and advanced mathematical formalisms for understanding cognitive processes. Includes formal theorems, proofs, and mathematical rigor for research-grade AI development.',
    technologies: ['Rust', 'Mathematical Modeling', 'Vector Space Theory', 'Dynamical Systems', 'Information Theory', 'Control Theory', 'Research'],
    image: '/screenshots/shandris-cognitive-jellyfish.jpg',
    featured: true,
    category: 'Research',
    highlights: [
      'Formal mathematical framework with theorems and proofs',
      'Sophisticated trait evolution modeling',
      'Emotional intelligence neural networks',
      'Memory system Markov processes',
      'Research-grade mathematical rigor'
    ],
    complexity: 'Expert',
    impact: 'Demonstrates cutting-edge research capabilities in mathematical cognitive science and formal AI theory development.'
  },
  {
    id: 'cognitive-arch',
    title: 'Cognitive Architecture Framework - Advanced Memory System',
    description: 'Research-grade cognitive architecture with sophisticated memory management, emotional processing, and trait evolution systems.',
    longDescription: 'An advanced cognitive architecture framework featuring sophisticated memory management systems, emotional state processing, and trait evolution modeling. Includes comprehensive memory clustering, emotional resonance processing, self-reflection capabilities, and advanced pattern recognition. The system implements complex memory indexing, trait baseline management, and emotional intelligence modeling with research-grade mathematical foundations.',
    technologies: ['C++', 'Python', 'Cognitive Modeling', 'Memory Systems', 'Emotional Intelligence', 'Trait Evolution', 'Research'],
    image: '/screenshots/cognitive-field-dew.jpg',
    featured: true,
    category: 'Research',
    highlights: [
      'Advanced memory clustering and indexing',
      'Emotional resonance processing',
      'Trait evolution with baseline management',
      'Self-reflection and pattern recognition',
      'Research-grade cognitive modeling'
    ],
    complexity: 'Expert',
    impact: 'Shows deep research capabilities in cognitive science, memory systems, and emotional intelligence modeling at an academic level.'
  },
  {
    id: 'aabb-obb-collision',
    title: 'AAB_OBBBP - Advanced Collision Detection System',
    description: 'High-performance collision detection system implementing AABB and OBB algorithms for real-time physics simulation.',
    longDescription: 'A sophisticated collision detection system implementing both Axis-Aligned Bounding Box (AABB) and Oriented Bounding Box (OBB) algorithms. Features broad-phase optimization, narrow-phase collision detection, and efficient spatial partitioning for real-time physics simulation and game engine integration.',
    technologies: ['Rust', 'Mathematics', 'Collision Detection', 'AABB', 'OBB', 'Spatial Partitioning', 'Performance Optimization'],
    image: '/screenshots/collision-detection-escape.jpg',
    featured: true,
    category: 'Physics',
    highlights: [
      'Dual AABB and OBB collision detection',
      'Broad-phase spatial optimization',
      'High-performance Rust implementation',
      'Real-time collision response',
      'Efficient spatial partitioning algorithms'
    ],
    complexity: 'Advanced',
    impact: 'Demonstrates deep understanding of computational geometry and high-performance collision detection algorithms.'
  },
  {
    id: 'artscape',
    title: 'ArtScape - Digital Art Marketplace Platform',
    description: 'Full-stack digital art marketplace with artist profiles, artwork management, and secure payment processing.',
    longDescription: 'A comprehensive digital art marketplace platform featuring artist profiles, artwork management, secure payment processing, and user authentication. Built with modern web technologies and includes features like artwork categorization, artist discovery, and integrated payment systems.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Go', 'PostgreSQL', 'Payment Processing', 'User Authentication', 'Digital Art'],
    image: '/screenshots/artscape-fantasy-art.png',
    featured: true,
    category: 'Web',
    highlights: [
      'Full-stack digital art marketplace',
      'Artist profile management',
      'Secure payment processing',
      'User authentication system',
      'Modern responsive design'
    ],
    complexity: 'Advanced',
    impact: 'Shows expertise in full-stack web development with focus on e-commerce and user experience design.'
  },
  {
    id: 'colorcoded',
    title: 'ColorCoded - Advanced Color Analysis Tool',
    description: 'Rust-based color analysis and processing tool with advanced algorithms for color manipulation and analysis.',
    longDescription: 'A sophisticated color analysis tool built in Rust featuring advanced color processing algorithms, color space conversions, palette generation, and color harmony analysis. Includes command-line interface and library components for integration into other applications.',
    technologies: ['Rust', 'Color Theory', 'Image Processing', 'CLI', 'Color Spaces', 'Palette Generation', 'Color Harmony'],
    image: '/screenshots/headphones-paint-color-splash.jpg',
    featured: true,
    category: 'Systems',
    highlights: [
      'Advanced color processing algorithms',
      'Color space conversions',
      'Palette generation and analysis',
      'Color harmony calculations',
      'High-performance Rust implementation'
    ],
    complexity: 'Advanced',
    impact: 'Demonstrates expertise in color theory, image processing, and high-performance Rust development.'
  },
  {
    id: 'kdemon',
    title: 'Kdemon - System Daemon Framework',
    description: 'Rust-based system daemon framework for building reliable, high-performance background services.',
    longDescription: 'A robust system daemon framework built in Rust designed for creating reliable, high-performance background services. Features process management, signal handling, logging, configuration management, and system integration capabilities for building production-ready daemons.',
    technologies: ['Rust', 'System Programming', 'Daemon Development', 'Process Management', 'Signal Handling', 'Logging', 'Configuration'],
    image: '/screenshots/kdemon-cyber-daemon.jpg',
    featured: true,
    category: 'Systems',
    highlights: [
      'Robust daemon framework',
      'Process management and monitoring',
      'Signal handling and system integration',
      'Comprehensive logging system',
      'Configuration management'
    ],
    complexity: 'Advanced',
    impact: 'Shows deep understanding of system programming, daemon development, and low-level system integration.'
  },
  {
    id: 'smartcurl',
    title: 'SmartCurl - Intelligent HTTP Client',
    description: 'Go-based intelligent HTTP client with advanced features for web scraping and API interaction.',
    longDescription: 'An intelligent HTTP client built in Go featuring advanced web scraping capabilities, API interaction, request/response processing, and intelligent retry mechanisms. Includes support for various HTTP methods, custom headers, and response analysis.',
    technologies: ['Go', 'HTTP Client', 'Web Scraping', 'API Integration', 'Request Processing', 'Response Analysis', 'Retry Logic'],
    image: '/screenshots/smartcurl-cyber-building.jpg',
    featured: true,
    category: 'Systems',
    highlights: [
      'Intelligent HTTP client implementation',
      'Advanced web scraping capabilities',
      'API integration and interaction',
      'Request/response processing',
      'Retry mechanisms and error handling'
    ],
    complexity: 'Intermediate',
    impact: 'Demonstrates expertise in HTTP protocols, web scraping, and Go-based system development.'
  },
  {
    id: 'vulnscan',
    title: 'VulnSCAN - Security Vulnerability Scanner',
    description: 'Comprehensive security vulnerability scanner for network and application security assessment.',
    longDescription: 'A comprehensive security vulnerability scanner designed for network and application security assessment. Features port scanning, service detection, vulnerability assessment, and detailed reporting capabilities for security professionals and penetration testers.',
    technologies: ['Go', 'Network Security', 'Vulnerability Assessment', 'Port Scanning', 'Service Detection', 'Security Reporting', 'Penetration Testing'],
    image: '/screenshots/vulnscan-neon-security.jpg',
    featured: true,
    category: 'Systems',
    highlights: [
      'Comprehensive vulnerability scanning',
      'Network port and service detection',
      'Security assessment capabilities',
      'Detailed reporting system',
      'Professional security tools'
    ],
    complexity: 'Advanced',
    impact: 'Shows expertise in cybersecurity, network security, and security tool development.'
  },
  {
    id: 'wallgremlin',
    title: 'WallGremlin - Dynamic Wallpaper Manager',
    description: 'Rust-based dynamic wallpaper manager with advanced customization and automation features.',
    longDescription: 'A sophisticated dynamic wallpaper manager built in Rust featuring advanced customization options, automation capabilities, and system integration. Includes wallpaper rotation, custom themes, scheduling, and seamless desktop environment integration.',
    technologies: ['Rust', 'Desktop Integration', 'Wallpaper Management', 'Automation', 'System APIs', 'Customization', 'Scheduling'],
    featured: true,
    category: 'Systems',
    highlights: [
      'Dynamic wallpaper management',
      'Advanced customization options',
      'Automation and scheduling',
      'System integration',
      'Desktop environment support'
    ],
    complexity: 'Intermediate',
    impact: 'Demonstrates expertise in desktop application development and system integration.'
  },
  {
    id: 'rigid-body-physics',
    title: 'RigidBody Physics - Advanced Physics Simulation',
    description: 'High-performance rigid body physics simulation with advanced collision detection and dynamics.',
    longDescription: 'A sophisticated rigid body physics simulation system featuring advanced collision detection, dynamics calculations, and real-time physics simulation. Implements complex physics algorithms for realistic object interaction and movement.',
    technologies: ['Rust', 'Physics Simulation', 'Rigid Body Dynamics', 'Collision Detection', 'Mathematics', 'Performance Optimization'],
    featured: true,
    category: 'Physics',
    highlights: [
      'Advanced rigid body dynamics',
      'High-performance physics simulation',
      'Complex collision detection',
      'Real-time physics calculations',
      'Optimized Rust implementation'
    ],
    complexity: 'Expert',
    impact: 'Demonstrates deep understanding of physics simulation and high-performance computational physics.'
  },
  {
    id: 'physics-engine-constraints',
    title: 'PhysicsEngine Constraints - Advanced Constraint System',
    description: 'Sophisticated constraint system for physics engines with advanced mathematical modeling.',
    longDescription: 'A comprehensive constraint system for physics engines featuring advanced mathematical modeling, joint constraints, and complex physical interactions. Implements sophisticated algorithms for realistic physics behavior and constraint resolution.',
    technologies: ['Rust', 'Physics Constraints', 'Mathematical Modeling', 'Joint Systems', 'Constraint Resolution', 'Advanced Mathematics'],
    featured: true,
    category: 'Physics',
    highlights: [
      'Advanced constraint modeling',
      'Joint system implementation',
      'Complex constraint resolution',
      'Mathematical rigor',
      'Physics engine integration'
    ],
    complexity: 'Expert',
    impact: 'Shows mastery of advanced physics constraint systems and mathematical modeling.'
  },
  {
    id: 'physics-math-utils',
    title: 'Physics Math Utils - Mathematical Physics Library',
    description: 'Comprehensive mathematical utilities library for physics engine development and calculations.',
    longDescription: 'A comprehensive mathematical utilities library designed specifically for physics engine development. Features advanced mathematical functions, vector operations, matrix calculations, and specialized physics math utilities for high-performance physics simulations.',
    technologies: ['Rust', 'Mathematics', 'Vector Operations', 'Matrix Calculations', 'Physics Math', 'Mathematical Libraries'],
    featured: true,
    category: 'Physics',
    highlights: [
      'Comprehensive math utilities',
      'Vector and matrix operations',
      'Physics-specific calculations',
      'High-performance math library',
      'Specialized physics functions'
    ],
    complexity: 'Advanced',
    impact: 'Demonstrates expertise in mathematical physics and computational mathematics.'
  },
  {
    id: 'gremlincli',
    title: 'GremlinCLI - Advanced Command Line Interface',
    description: 'Sophisticated command-line interface framework with advanced features and automation capabilities.',
    longDescription: 'A sophisticated command-line interface framework built in Rust featuring advanced CLI capabilities, automation, scripting, and system integration. Includes interactive commands, automation features, and extensible architecture for building powerful CLI applications.',
    technologies: ['Rust', 'CLI Framework', 'Command Line', 'Automation', 'Scripting', 'System Integration', 'Interactive Commands'],
    featured: true,
    category: 'Systems',
    highlights: [
      'Advanced CLI framework',
      'Interactive command system',
      'Automation capabilities',
      'Extensible architecture',
      'System integration features'
    ],
    complexity: 'Advanced',
    impact: 'Shows expertise in command-line interface development and system automation.'
  },
  {
    id: 'astarte',
    title: 'Astarte - AI Web Application Platform',
    description: 'AI-powered web application platform with modern frontend and advanced AI backend architecture.',
    longDescription: 'An AI-powered web application platform featuring TypeScript frontend with Vite, comprehensive AI backend services, and modern development tooling. Includes AI integration, responsive design, API integration, and scalable AI architecture patterns.',
    technologies: ['TypeScript', 'Vite', 'React', 'Node.js', 'AI Integration', 'Modern Web Stack', 'API Integration', 'Responsive Design'],
    featured: true,
    category: 'AI/ML',
    highlights: [
      'AI-powered web application platform',
      'TypeScript frontend with Vite',
      'Comprehensive AI backend services',
      'AI integration and processing',
      'Modern development tooling'
    ],
    complexity: 'Advanced',
    impact: 'Demonstrates expertise in AI-powered web development and full-stack AI application architecture.'
  },
  {
    id: 'shandris-cogni-arch',
    title: 'Shandris Cognitive Architecture - Advanced AI Framework',
    description: 'Sophisticated AI cognitive architecture framework with advanced neural modeling and AGI research capabilities.',
    longDescription: 'An advanced AI cognitive architecture framework featuring sophisticated neural modeling, research-grade cognitive systems, and advanced AI capabilities. Implements complex cognitive processes, neural networks, and research-level AI development.',
    technologies: ['Rust', 'Cognitive Architecture', 'Neural Modeling', 'AI Research', 'Cognitive Systems', 'Advanced AI', 'AGI'],
    featured: true,
    category: 'AI/ML',
    highlights: [
      'Advanced AI cognitive architecture',
      'Sophisticated neural modeling',
      'Research-grade AI systems',
      'Complex cognitive processes',
      'Advanced AI capabilities'
    ],
    complexity: 'Expert',
    impact: 'Demonstrates cutting-edge research in cognitive architecture and advanced AI systems.'
  },
  {
    id: 'cognitive-memory-system',
    title: 'Cognitive Memory System - Advanced AI Memory Architecture',
    description: 'Sophisticated AI memory system with advanced cognitive modeling and neural network integration.',
    longDescription: 'A comprehensive AI cognitive memory system featuring advanced memory architecture, neural network integration, and sophisticated cognitive modeling. Includes complex memory processes, persona systems, and advanced AI cognitive capabilities.',
    technologies: ['C++', 'Cognitive Modeling', 'Memory Systems', 'Neural Networks', 'Persona Systems', 'Advanced Cognition', 'AI'],
    featured: true,
    category: 'AI/ML',
    highlights: [
      'Advanced AI memory architecture',
      'Sophisticated cognitive modeling',
      'Neural network integration',
      'Persona system implementation',
      'Complex AI cognitive processes'
    ],
    complexity: 'Expert',
    impact: 'Shows deep research capabilities in AI cognitive science and advanced memory systems.'
  }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: Project['category']) => projects.filter(p => p.category === category);
export const getProjectById = (id: string) => projects.find(p => p.id === id); 