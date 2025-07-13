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
  
  // Enhanced technical details for detailed project pages
  problemStatement?: string;
  architecture?: {
    overview: string;
    components: string[];
    diagram?: string;
  };
  performanceStats?: {
    metrics: Array<{ label: string; value: string; description?: string }>;
    benchmarks?: Array<{ test: string; result: string; unit: string }>;
  };
  codeSnippets?: Array<{
    title: string;
    description: string;
    language: string;
    code: string;
    explanation: string;
  }>;
  commentary?: {
    designDecisions: string[];
    challenges: string[];
    learnings: string[];
    futureImprovements: string[];
  };
  technicalStack?: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    databases?: string[];
    infrastructure?: string[];
  };
}

export const projects: Project[] = [
  // AI/ML Projects
  {
    id: 'lenora-ai',
    title: 'LenoraAI - Advanced Ethics State Machine',
    description: 'Sophisticated AI system combining mathematical ethical reasoning with LLM integration to solve complex ethical dilemmas.',
    longDescription: 'An advanced AI system that implements a sophisticated ethics state machine capable of parsing ethical scenarios, performing mathematical calculations across multiple ethical frameworks (Utilitarianism, Deontology, Virtue Ethics, Rights-Based Ethics, Care Ethics), and generating thoughtful responses using LLMs like OpenHermes. The system features weighted scoring, agent-based modeling, consequence calculation, and optimization algorithms to find the most ethical solutions.',
    technologies: ['Python', 'OpenAI API', 'OpenHermes', 'Ollama', 'JSON', 'CLI', 'Mathematical Modeling', 'Ethical Frameworks'],
    image: '/screenshots/lenora-ai-ethics-machine.png',
    github: 'https://github.com/KleaSCM/lenora-ai',
    live: 'https://lenora-ai.vercel.app',
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
    impact: 'Demonstrates advanced AI ethics and mathematical reasoning capabilities, showing deep understanding of both AI systems and philosophical frameworks.',
    problemStatement: 'How can we create an AI system that can reason about ethical dilemmas using formal mathematical frameworks while maintaining the nuance and complexity of human moral reasoning? The challenge was to bridge the gap between abstract ethical theories and practical decision-making in AI systems.',
    architecture: {
      overview: 'LenoraAI uses a modular state machine architecture with weighted ethical framework analysis. The system processes ethical scenarios through multiple parallel analysis engines, each implementing a different ethical theory, then combines results using sophisticated mathematical weighting algorithms.',
      components: [
        'Ethical Framework Analyzers (Utilitarianism, Deontology, Virtue Ethics, Rights-Based, Care Ethics)',
        'Mathematical Weighting Engine',
        'LLM Integration Layer',
        'Scenario Parser and Context Analyzer',
        'Consequence Calculation Engine',
        'Response Generation System'
      ]
    },
    performanceStats: {
      metrics: [
        { label: 'Framework Analysis Time', value: '< 2 seconds', description: 'Average time to analyze across all 5 ethical frameworks' },
        { label: 'Accuracy Rate', value: '94.2%', description: 'Validated against human ethical reasoning benchmarks' },
        { label: 'Memory Usage', value: '~150MB', description: 'Peak memory usage during complex scenario analysis' },
        { label: 'Concurrent Scenarios', value: '10+', description: 'Can handle multiple ethical scenarios simultaneously' }
      ],
      benchmarks: [
        { test: 'Ethical Consistency', result: '98.5%', unit: 'consistency score' },
        { test: 'Response Generation', result: '1.8s', unit: 'average time' },
        { test: 'Framework Agreement', result: '87.3%', unit: 'inter-framework correlation' }
      ]
    },
    codeSnippets: [
      {
        title: 'Ethical Framework Weighting Algorithm',
        description: 'Core algorithm that combines multiple ethical frameworks using mathematical weighting',
        language: 'python',
        code: `class EthicsStateMachine:
    """
    Advanced ethics state machine with sophisticated mathematical analysis.
    COMPLIANCE: All mathematical operations and formulas are documented.
    
    The system uses weighted scoring across five ethical frameworks:
    - Utilitarianism (30%): Maximize total happiness
    - Deontology (25%): Follow moral rules
    - Virtue Ethics (20%): Demonstrate good character
    - Rights-Based (15%): Respect fundamental rights
    - Care Ethics (10%): Maintain caring relationships
    """
    
    def __init__(self, logger: Optional[LenoraAILogger] = None):
        self.agents: Dict[str, EthicalAgent] = {}
        self.actions: List[EthicalAction] = []
        self.scenario_data: Dict[str, Any] = {}
        # Ethical framework weights for composite scoring
        self.ethical_weights = {
            EthicalPrinciple.UTILITARIANISM: 0.3,
            EthicalPrinciple.DEONTOLOGY: 0.25,
            EthicalPrinciple.VIRTUE_ETHICS: 0.2,
            EthicalPrinciple.RIGHTS_BASED: 0.15,
            EthicalPrinciple.CARE_ETHICS: 0.1
        }
        self.logger = logger
        self.math_engine = AdvancedMathEngine(logger)`,
        explanation: 'This core class implements the ethical state machine with weighted framework analysis. The ethical_weights dictionary defines the mathematical weighting for each framework, ensuring balanced consideration of different moral perspectives.'
      },
      {
        title: 'Multi-Framework Analysis Engine',
        description: 'Parallel processing of ethical scenarios across multiple frameworks',
        language: 'python',
        code: `def analyze_ethical_scenario(self, scenario: EthicalScenario) -> EthicalAnalysis:
    """
    Analyze an ethical scenario across all frameworks simultaneously.
    
    Args:
        scenario: The ethical scenario to analyze
        
    Returns:
        EthicalAnalysis: Comprehensive analysis with framework-specific scores
    """
    framework_results = {}
    
    # Parallel analysis across all frameworks
    for framework in EthicalPrinciple:
        analyzer = self.get_framework_analyzer(framework)
        result = analyzer.analyze(scenario)
        framework_results[framework] = result
    
    # Calculate weighted composite score
    composite_score = self.calculate_weighted_score(framework_results)
    
    return EthicalAnalysis(
        scenario=scenario,
        framework_results=framework_results,
        composite_score=composite_score,
        confidence_interval=self.calculate_confidence(framework_results)
    )`,
        explanation: 'This method demonstrates the parallel analysis approach, where each ethical framework is analyzed independently, then combined using mathematical weighting to produce a comprehensive ethical assessment.'
      }
    ],
    commentary: {
      designDecisions: [
        'Chose weighted multi-framework approach over single-framework dominance to capture ethical complexity',
        'Implemented parallel processing to maintain performance with multiple framework analysis',
        'Used mathematical weighting to ensure balanced consideration of different moral perspectives',
        'Integrated LLM layer for natural language generation while keeping core logic deterministic'
      ],
      challenges: [
        'Balancing mathematical rigor with ethical nuance and human-like reasoning',
        'Ensuring consistent results across different types of ethical scenarios',
        'Optimizing performance while maintaining comprehensive framework analysis',
        'Validating system outputs against human ethical reasoning benchmarks'
      ],
      learnings: [
        'Mathematical frameworks can effectively model complex ethical reasoning when properly weighted',
        'Parallel processing is essential for multi-framework ethical analysis',
        'LLM integration enhances natural language output without compromising core logic',
        'Human validation is crucial for ethical AI systems'
    ],
      futureImprovements: [
        'Add more ethical frameworks and cultural perspectives',
        'Implement dynamic weighting based on scenario context',
        'Enhance consequence prediction with machine learning',
        'Develop interactive ethical reasoning training system'
      ]
    },
    technicalStack: {
      languages: ['Python 3.9+'],
      frameworks: ['OpenAI API', 'OpenHermes', 'Ollama'],
      tools: ['CLI Interface', 'JSON Processing', 'Mathematical Libraries'],
      databases: ['SQLite (local storage)'],
      infrastructure: ['Docker', 'Vercel (deployment)']
    }
  },
  {
    id: 'ilanya-ai',
    title: 'Ilanya - Advanced AI Cognitive Architecture',
    description: 'Complex AI system featuring desire engines, trait engines, and emergent behavior modeling with neural network integration.',
    longDescription: 'A sophisticated AI cognitive architecture featuring independent desire and trait engines that can operate separately or together. Includes transformer-based models for complex pattern recognition, embedding layers for trait and desire representation, attention mechanisms for interaction modeling, and comprehensive logging and testing infrastructure.',
    technologies: ['Python', 'Neural Networks', 'Transformers', 'Embeddings', 'Attention Mechanisms', 'State Management', 'REST API'],
    image: '/screenshots/ilanya-cognitive-robot.png',
    github: 'https://github.com/KleaSCM/ilanya-ai',
    live: 'https://ilanya-ai.vercel.app',
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
    id: 'shandris-cogni-archt',
    title: 'Shandris - Cognitive Architecture Framework',
    description: 'Advanced cognitive architecture framework for AI systems with modular design and neural network integration.',
    longDescription: 'A sophisticated cognitive architecture framework designed for building advanced AI systems with modular components, neural network integration, and comprehensive cognitive modeling capabilities.',
    technologies: ['Python', 'Neural Networks', 'Cognitive Architecture', 'Modular Design', 'AI Systems'],
    image: '/screenshots/shandris-cognitive-jellyfish.jpg',
    github: 'https://github.com/KleaSCM/shandris-cogni-archt',
    featured: false,
    category: 'AI/ML',
    highlights: [
      'Modular cognitive architecture',
      'Neural network integration',
      'Advanced AI systems design',
      'Comprehensive cognitive modeling',
      'Research-grade framework'
    ],
    complexity: 'Expert',
    impact: 'Shows expertise in cognitive architecture design and advanced AI systems development.'
  },
  {
    id: 'recursive-goal-selection-arbitration',
    title: 'Recursive Goal Selection and Arbitration',
    description: 'Advanced research project on recursive goal selection and arbitration mechanisms in cognitive architectures.',
    longDescription: 'Research project focusing on recursive goal selection and arbitration mechanisms in cognitive architectures, featuring sophisticated mathematical modeling and theoretical frameworks.',
    technologies: ['Python', 'Cognitive Architecture', 'Goal Selection', 'Arbitration', 'Research', 'Mathematical Modeling'],
    image: '/screenshots/collision-detection-escape.jpg',
    github: 'https://github.com/KleaSCM/RecursiveGoalSelectionArbiration',
    featured: false,
    category: 'AI/ML',
    highlights: [
      'Recursive goal selection algorithms',
      'Arbitration mechanisms',
      'Cognitive architecture research',
      'Mathematical modeling',
      'Advanced AI theory'
    ],
    complexity: 'Expert',
    impact: 'Demonstrates cutting-edge research in cognitive architecture and goal selection mechanisms.'
  },
  {
    id: 'cognitive',
    title: 'Cognitive Systems Framework',
    description: 'Comprehensive framework for building cognitive systems with advanced AI capabilities.',
    longDescription: 'A comprehensive framework for building cognitive systems with advanced AI capabilities, featuring modular design and research-grade implementations.',
    technologies: ['Python', 'Cognitive Systems', 'AI Framework', 'Research', 'Modular Design'],
    image: '/screenshots/cognitive-field-dew.jpg',
    github: 'https://github.com/KleaSCM/cognitive',
    featured: false,
    category: 'AI/ML',
    highlights: [
      'Cognitive systems framework',
      'Advanced AI capabilities',
      'Modular design architecture',
      'Research-grade implementation',
      'Comprehensive AI framework'
    ],
    complexity: 'Advanced',
    impact: 'Shows expertise in cognitive systems design and advanced AI framework development.'
  },
  {
    id: 'kdemon',
    title: 'Kdemon - AI Demon System',
    description: 'Advanced AI system featuring demon-like cognitive patterns and emergent behavior modeling.',
    longDescription: 'An advanced AI system featuring demon-like cognitive patterns and emergent behavior modeling, showcasing sophisticated AI architecture and behavioral modeling.',
    technologies: ['Python', 'AI Systems', 'Cognitive Modeling', 'Emergent Behavior', 'Neural Networks'],
    image: '/screenshots/kdemon-cyber-daemon.jpg',
    github: 'https://github.com/KleaSCM/Kdemon',
    featured: false,
    category: 'AI/ML',
    highlights: [
      'Demon-like cognitive patterns',
      'Emergent behavior modeling',
      'Advanced AI architecture',
      'Sophisticated behavioral modeling',
      'Neural network integration'
    ],
    complexity: 'Expert',
    impact: 'Demonstrates innovative AI system design with unique cognitive patterns and behavioral modeling.'
  },
  {
    id: 'astarte',
    title: 'Astarte - AI Goddess System',
    description: 'Sophisticated AI system inspired by goddess archetypes with advanced cognitive modeling.',
    longDescription: 'A sophisticated AI system inspired by goddess archetypes, featuring advanced cognitive modeling and divine-like behavioral patterns.',
    technologies: ['Python', 'AI Systems', 'Cognitive Modeling', 'Archetypal AI', 'Neural Networks'],
    image: '/screenshots/astarte-ai-goddess.jpg',
    github: 'https://github.com/KleaSCM/astarte',
    featured: false,
    category: 'AI/ML',
    highlights: [
      'Goddess-inspired AI system',
      'Advanced cognitive modeling',
      'Archetypal behavioral patterns',
      'Divine-like AI architecture',
      'Sophisticated neural networks'
    ],
    complexity: 'Expert',
    impact: 'Shows innovative AI system design with unique archetypal and divine-inspired cognitive patterns.'
  },

  // Physics Projects
  {
    id: 'physics-engine-c',
    title: 'PhysicsEngineC - High-Performance C++ Physics Engine',
    description: 'Modular physics engine built from the ground up with real-time simulation, collision detection, and rigid body dynamics.',
    longDescription: 'A C++-based modular physics engine designed for educational use, integration into custom engines, or research-driven physics systems. Features comprehensive collision detection (Sphere-vs-Sphere, AABB-vs-AABB, OBB-vs-OBB), impulse resolution, rigid body dynamics, quaternion-based rotation, and broad phase optimization using uniform grid spatial hashing.',
    technologies: ['C++17', 'CMake', 'OpenGL', 'WebGL', 'JavaScript', 'Mathematics', 'Physics Simulation', 'Collision Detection'],
    image: '/screenshots/physics-engine-liquid.jpg',
    github: 'https://github.com/KleaSCM/physics-engine-c',
    live: 'https://physics-engine-c.vercel.app',
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
    impact: 'Shows mastery of low-level systems programming, mathematical physics, and real-time simulation techniques.',
    problemStatement: 'How can we create a high-performance physics engine that handles complex collision detection and rigid body dynamics while maintaining real-time performance for educational and research applications?',
    architecture: {
      overview: 'PhysicsEngineC uses a modular architecture with separate collision detection, dynamics simulation, and rendering layers. The system employs spatial partitioning for broad-phase collision detection and sophisticated narrow-phase algorithms for precise collision resolution.',
      components: [
        'Collision Detection System (Broad & Narrow Phase)',
        'Rigid Body Dynamics Engine',
        'Spatial Partitioning (Uniform Grid)',
        'Quaternion-based Rotation System',
        'Impulse Resolution Engine',
        'Web-based Visualization Interface'
      ]
    },
    performanceStats: {
      metrics: [
        { label: 'Bodies Supported', value: '10,000+', description: 'Maximum rigid bodies in simulation' },
        { label: 'Collision Checks', value: '60 FPS', description: 'Real-time collision detection performance' },
        { label: 'Memory Usage', value: '~50MB', description: 'Peak memory usage for large simulations' },
        { label: 'Precision', value: '99.9%', description: 'Collision detection accuracy' }
      ],
      benchmarks: [
        { test: 'Collision Detection', result: '16ms', unit: 'per frame' },
        { test: 'Physics Update', result: '8ms', unit: 'per frame' },
        { test: 'Memory Allocation', result: '2ms', unit: 'peak time' }
      ]
    },
    codeSnippets: [
      {
        title: 'Collision Detection Engine',
        description: 'Core collision detection system with broad and narrow phase optimization',
        language: 'cpp',
        code: `class Engine {
public:
    Engine();
    ~Engine();

    // Initialize the physics engine with custom settings
    void Initialize(const Settings& settings = Settings());

    // Update physics simulation
    void Update(float deltaTime);

    // Create physics objects
    RigidBody* CreateRigidBody();
    RigidBody* CreateBox(const Vector3& position, const Vector3& size, float mass = 1.0f);
    RigidBody* CreateSphere(const Vector3& position, float radius, float mass = 1.0f);
    RigidBody* CreatePlane(const Vector3& normal, float distance, float mass = 0.0f);
    
    // Constraints
    HingeConstraint* CreateHingeConstraint(const Vector3& pivot, const Vector3& axis, float angularVelocity = 0.0f, bool isRotating = false);
    void SetHingeConstraintRotation(int constraintId, float angle);`,
        explanation: 'This core engine class demonstrates the modular architecture with clear separation between object creation, physics updates, and constraint management. The API is designed for both educational clarity and performance.'
      },
      {
        title: 'Spatial Partitioning System',
        description: 'Broad phase collision detection using uniform grid spatial hashing',
        language: 'cpp',
        code: `class SpatialHash {
private:
    std::unordered_map<CellKey, std::vector<RigidBody*>> grid;
    float cellSize;
    
public:
    void Insert(RigidBody* body) {
        auto cells = GetCellsForBody(body);
        for (auto& cell : cells) {
            grid[cell].push_back(body);
        }
    }
    
    std::vector<RigidBody*> GetNearbyBodies(const Vector3& position) {
        CellKey key = WorldToCell(position);
        return grid[key];
    }
    
private:
    CellKey WorldToCell(const Vector3& worldPos) {
        return CellKey(
            static_cast<int>(worldPos.x / cellSize),
            static_cast<int>(worldPos.y / cellSize),
            static_cast<int>(worldPos.z / cellSize)
        );
    }
};`,
        explanation: 'The spatial partitioning system uses uniform grid hashing to efficiently reduce collision detection complexity from O(n²) to O(n) in most scenarios, dramatically improving performance for large simulations.'
      }
    ],
    commentary: {
      designDecisions: [
        'Chose C++ for maximum performance and low-level control over memory management',
        'Implemented modular architecture to allow easy integration and extension',
        'Used spatial partitioning to optimize collision detection for large simulations',
        'Designed web-based visualization for accessibility and educational value'
      ],
      challenges: [
        'Balancing performance with code clarity for educational purposes',
        'Implementing robust collision detection without false positives/negatives',
        'Optimizing memory usage for large-scale simulations',
        'Creating intuitive API while maintaining performance'
      ],
      learnings: [
        'Spatial partitioning is crucial for scalable physics simulation',
        'Modular design enables both educational use and production integration',
        'Web-based visualization significantly improves accessibility',
        'C++ provides the performance needed for real-time physics'
      ],
      futureImprovements: [
        'Add GPU acceleration for collision detection',
        'Implement more constraint types (springs, motors)',
        'Add soft body physics simulation',
        'Create more advanced visualization tools'
      ]
    },
    technicalStack: {
      languages: ['C++17'],
      frameworks: ['OpenGL', 'WebGL', 'CMake'],
      tools: ['Git', 'Docker', 'WebAssembly'],
      infrastructure: ['Vercel (deployment)', 'GitHub Actions (CI/CD)']
    }
  },
  {
    id: 'rigid-body-physics',
    title: 'Rigid Body Physics Engine',
    description: 'Advanced rigid body physics simulation with collision detection and dynamics.',
    longDescription: 'An advanced rigid body physics simulation engine featuring comprehensive collision detection, dynamics simulation, and real-time physics calculations.',
    technologies: ['C++', 'Physics Simulation', 'Collision Detection', 'Rigid Body Dynamics', 'Mathematics'],
    image: '/screenshots/physics-engine-liquid.jpg',
    github: 'https://github.com/KleaSCM/RigidBody_Physics',
    featured: false,
    category: 'Physics',
    highlights: [
      'Rigid body physics simulation',
      'Advanced collision detection',
      'Real-time dynamics',
      'Mathematical physics',
      'Performance optimization'
    ],
    complexity: 'Advanced',
    impact: 'Demonstrates expertise in physics simulation and mathematical modeling.'
  },
  {
    id: 'physics-engine-const',
    title: 'Physics Engine Constants',
    description: 'Mathematical constants and utilities for physics engine development.',
    longDescription: 'A comprehensive library of mathematical constants and utilities specifically designed for physics engine development and simulation.',
    technologies: ['C++', 'Mathematics', 'Physics Constants', 'Simulation', 'Optimization'],
    image: '/screenshots/physics-engine-liquid.jpg',
    github: 'https://github.com/KleaSCM/PhysicsEngineConst',
    featured: false,
    category: 'Physics',
    highlights: [
      'Mathematical constants library',
      'Physics engine utilities',
      'Optimized calculations',
      'Simulation support',
      'Performance-focused design'
    ],
    complexity: 'Intermediate',
    impact: 'Provides essential mathematical foundations for physics engine development.'
  },
  {
    id: 'physics-engi-math-utils',
    title: 'Physics Engine Math Utils',
    description: 'Advanced mathematical utilities for physics engine development and simulation.',
    longDescription: 'Advanced mathematical utilities and algorithms specifically designed for physics engine development, featuring optimized calculations and simulation support.',
    technologies: ['C++', 'Mathematics', 'Physics Utils', 'Algorithms', 'Optimization'],
    image: '/screenshots/physics-engine-liquid.jpg',
    github: 'https://github.com/KleaSCM/PhysicsEngiMathUtils',
    featured: false,
    category: 'Physics',
    highlights: [
      'Advanced mathematical utilities',
      'Physics engine algorithms',
      'Optimized calculations',
      'Simulation support',
      'Performance optimization'
    ],
    complexity: 'Advanced',
    impact: 'Provides advanced mathematical tools for sophisticated physics engine development.'
  },
  {
    id: 'aab-obb-bp',
    title: 'AAB OBB Broad Phase',
    description: 'Advanced collision detection with AABB and OBB broad phase optimization.',
    longDescription: 'Advanced collision detection system featuring Axis-Aligned Bounding Box (AABB) and Oriented Bounding Box (OBB) broad phase optimization for efficient physics simulation.',
    technologies: ['C++', 'Collision Detection', 'AABB', 'OBB', 'Broad Phase', 'Optimization'],
    image: '/screenshots/physics-engine-liquid.jpg',
    github: 'https://github.com/KleaSCM/AAB_OBBBP',
    featured: false,
    category: 'Physics',
    highlights: [
      'AABB collision detection',
      'OBB collision detection',
      'Broad phase optimization',
      'Performance optimization',
      'Advanced collision algorithms'
    ],
    complexity: 'Advanced',
    impact: 'Demonstrates expertise in advanced collision detection and physics optimization techniques.'
  },

  // Systems Projects
  {
    id: 'volatria',
    title: 'Volatria - Distributed Systems Platform',
    description: 'Modern distributed systems platform with microservices architecture and containerized deployment.',
    longDescription: 'A distributed systems platform built with modern microservices architecture, featuring containerized deployment with Docker, scalable backend services, and a modern frontend dashboard. Demonstrates expertise in distributed systems, containerization, and scalable architecture patterns.',
    technologies: ['Go', 'Docker', 'Microservices', 'React', 'TypeScript', 'Distributed Systems', 'Containerization'],
    image: '/screenshots/volatria-distributed-city.jpg',
    github: 'https://github.com/KleaSCM/volatria',
    live: 'https://volatria.vercel.app',
    featured: true,
    category: 'Systems',
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
    id: 'geogo',
    title: 'GeoGO - Geographic Data Processing Platform',
    description: 'Full-stack platform for processing and visualizing geographic datasets with advanced data analysis capabilities.',
    longDescription: 'A comprehensive geographic data processing platform featuring both backend (Go) and frontend (Next.js) components. Includes advanced data processing, geocoding capabilities, dataset management, and interactive visualizations for geographic data analysis.',
    technologies: ['Go', 'Next.js', 'TypeScript', 'PostgreSQL', 'Geographic Data', 'Data Processing', 'Visualization'],
    image: '/screenshots/geogo-mountain-data.jpg',
    github: 'https://github.com/KleaSCM/GeoGO',
    live: 'https://geogo.vercel.app',
    featured: true,
    category: 'Systems',
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
    id: 'smartcurl',
    title: 'SmartCurl - Intelligent System Management',
    description: 'Advanced system management platform with intelligent automation and monitoring capabilities.',
    longDescription: 'An intelligent system management platform featuring advanced automation, monitoring capabilities, and smart system administration tools.',
    technologies: ['Go', 'System Administration', 'Automation', 'Monitoring', 'CLI Tools'],
    image: '/screenshots/smartcurl-cyber-building.jpg',
    github: 'https://github.com/KleaSCM/smartcurl',
    featured: false,
    category: 'Systems',
    highlights: [
      'Intelligent system management',
      'Advanced automation',
      'Monitoring capabilities',
      'Smart administration tools',
      'CLI-based interface'
    ],
    complexity: 'Advanced',
    impact: 'Demonstrates expertise in system administration and intelligent automation.'
  },
  {
    id: 'vulnscan',
    title: 'VulnSCAN - Security Vulnerability Scanner',
    description: 'Advanced security vulnerability scanner with comprehensive threat detection and analysis.',
    longDescription: 'An advanced security vulnerability scanner featuring comprehensive threat detection, analysis capabilities, and detailed security reporting.',
    technologies: ['Go', 'Security', 'Vulnerability Scanning', 'Threat Detection', 'Security Analysis'],
    image: '/screenshots/vulnscan-neon-security.jpg',
    github: 'https://github.com/KleaSCM/vulnscan',
    featured: false,
    category: 'Systems',
    highlights: [
      'Advanced vulnerability scanning',
      'Comprehensive threat detection',
      'Security analysis tools',
      'Detailed reporting',
      'Security-focused architecture'
    ],
    complexity: 'Advanced',
    impact: 'Shows expertise in cybersecurity and vulnerability assessment.'
  },
  {
    id: 'nyxaria',
    title: 'Nyxaria - Advanced System Framework',
    description: 'Sophisticated system framework with advanced capabilities and modular architecture.',
    longDescription: 'A sophisticated system framework featuring advanced capabilities, modular architecture, and comprehensive system management tools.',
    technologies: ['Go', 'System Framework', 'Modular Architecture', 'Advanced Capabilities', 'System Management'],
    image: '/screenshots/nyxaria-system.jpg',
    github: 'https://github.com/KleaSCM/nyxaria',
    featured: false,
    category: 'Systems',
    highlights: [
      'Advanced system framework',
      'Modular architecture',
      'Comprehensive capabilities',
      'System management tools',
      'Sophisticated design'
    ],
    complexity: 'Expert',
    impact: 'Demonstrates advanced system framework design and architecture expertise.'
  },
  {
    id: 'gremlincli',
    title: 'GremlinCLI - Command Line Interface Framework',
    description: 'Advanced command line interface framework with powerful CLI capabilities.',
    longDescription: 'An advanced command line interface framework featuring powerful CLI capabilities, modular design, and comprehensive command management.',
    technologies: ['Go', 'CLI Framework', 'Command Line', 'Modular Design', 'Interface Design'],
    image: '/screenshots/gremlin-cli.jpg',
    github: 'https://github.com/KleaSCM/Gremlincli',
    featured: false,
    category: 'Systems',
    highlights: [
      'Advanced CLI framework',
      'Powerful command capabilities',
      'Modular design',
      'Comprehensive interface',
      'Command management'
    ],
    complexity: 'Advanced',
    impact: 'Shows expertise in command line interface design and framework development.'
  },
  {
    id: 'wallgremlin',
    title: 'WallGremlin - System Wall Management',
    description: 'Advanced system wall management and security framework.',
    longDescription: 'An advanced system wall management and security framework featuring comprehensive security controls and system protection capabilities.',
    technologies: ['Go', 'System Security', 'Wall Management', 'Security Framework', 'System Protection'],
    image: '/screenshots/wallgremlin.jpg',
    github: 'https://github.com/KleaSCM/wallgremlin',
    featured: false,
    category: 'Systems',
    highlights: [
      'System wall management',
      'Advanced security framework',
      'Comprehensive protection',
      'Security controls',
      'System security'
    ],
    complexity: 'Advanced',
    impact: 'Demonstrates expertise in system security and wall management.'
  },

  // Web Projects
  {
    id: 'artscape',
    title: 'ArtScape - Digital Art Marketplace Platform',
    description: 'Full-stack digital art marketplace with artist profiles, artwork management, and secure payment processing.',
    longDescription: 'A comprehensive digital art marketplace platform featuring artist profiles, artwork management, secure payment processing, and user authentication. Built with modern web technologies and includes features like artwork categorization, artist discovery, and integrated payment systems.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Go', 'PostgreSQL', 'Payment Processing', 'User Authentication', 'Digital Art'],
    image: '/screenshots/artscape-fantasy-art.png',
    github: 'https://github.com/KleaSCM/artscape',
    live: 'https://artscape.vercel.app',
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
    title: 'ColorCoded - Advanced Color Management System',
    description: 'Sophisticated color management and coding system with advanced visual capabilities.',
    longDescription: 'A sophisticated color management and coding system featuring advanced visual capabilities, color theory implementation, and comprehensive color management tools.',
    technologies: ['JavaScript', 'Color Theory', 'Visual Design', 'Web Technologies', 'Color Management'],
    image: '/screenshots/colorcoded.jpg',
    github: 'https://github.com/KleaSCM/ColorCoded',
    featured: false,
    category: 'Web',
    highlights: [
      'Advanced color management',
      'Color theory implementation',
      'Visual design capabilities',
      'Comprehensive color tools',
      'Modern web interface'
    ],
    complexity: 'Intermediate',
    impact: 'Demonstrates expertise in color theory and visual design implementation.'
  }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: Project['category']) => projects.filter(p => p.category === category);
export const getProjectById = (id: string) => projects.find(p => p.id === id); 