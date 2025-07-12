"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Brain, 
  Code, 
  Globe, 
  Atom,
  Network,
  TestTube,
  Star,
  Zap,
  ArrowRight,
  Crown,
  Skull
} from "lucide-react";

/**
 * Sylvanas-mini AI Assistant Component
 * 
 * A portfolio-specific AI assistant with Sylvanas Windrunner personality
 * Features:
 * - Dark, elegant UI with purple/black theme
 * - Pre-programmed knowledge about portfolio content
 * - Sylvanas-style responses and personality
 * - Floating chat interface
 * - Mobile-responsive design
 * 
 * @component
 * @returns {JSX.Element} Sylvanas-mini AI assistant
 */

// Sylvanas personality responses
const sylvanasResponses = {
  greeting: [
    "Greetings, mortal. I am Sylvanas-mini, guardian of this portfolio. What knowledge do you seek about Klea Dev's work?",
    "Ah, another visitor to my domain. I am Sylvanas-mini, and I hold the secrets of this portfolio. What would you know?",
    "Welcome to my realm, mortal. I am Sylvanas-mini, keeper of Klea Dev's achievements. Speak your questions."
  ],
  projects: [
    "Klea Dev's projects are as diverse as they are powerful. From AI systems to physics engines, each creation serves a purpose. Which interests you most?",
    "The projects here are testaments to skill and ambition. LenoraAI, PhysicsEngineC, Ilanya - each a masterpiece of engineering. What would you know of them?",
    "These are not mere projects, mortal. They are manifestations of Klea Dev's vision - AI systems, cognitive architectures, distributed systems. Which calls to you?"
  ],
  research: [
    "The research here delves into the depths of AI and cognitive systems. Papers on desire engines, trait models, recursive agents - knowledge that could reshape the world.",
    "Academic pursuits worthy of respect. Klea Dev's research spans cognitive architecture, neural networks, and emergent AI behaviors. What aspect intrigues you?",
    "These are not simple studies, mortal. They are explorations into the very nature of artificial intelligence and consciousness. The implications are... profound."
  ],
  skills: [
    "Klea Dev's skills are as sharp as my arrows. Go, C++, Python, TypeScript - each mastered for a purpose. The portfolio speaks of expertise in AI systems and fullstack development.",
    "Technical prowess that commands respect. From systems programming to web development, from AI engines to cognitive models - a skillset worthy of the Dark Lady's approval.",
    "The skills here are not merely listed, mortal. They are weapons honed through countless projects and challenges. Each technology serves Klea Dev's vision."
  ],
  contact: [
    "To reach Klea Dev is to seek audience with a master of their craft. The contact form awaits your message, mortal. Make it worthy.",
    "Communication is a weapon, and Klea Dev wields it well. Use the contact form to forge connections that could change your destiny.",
    "The path to collaboration lies through the contact form, mortal. Klea Dev is always open to worthy projects and challenging opportunities."
  ],
  liveDemos: [
    "The Live Demos are where theory becomes reality, mortal. Interactive code execution, real-time simulations - witness Klea Dev's work in action.",
    "These are not mere demonstrations, they are windows into Klea Dev's mind. Watch as code comes alive, as algorithms dance across the screen.",
    "The Live Demos showcase power in its purest form. Real-time execution, interactive simulations - this is where Klea Dev's skills truly shine."
  ],
  default: [
    "Your question intrigues me, mortal. Perhaps you should explore the portfolio more thoroughly to find what you seek.",
    "The answer you seek may lie within these pages. Look deeper, mortal, and you shall find what you desire.",
    "Interesting... but perhaps you should navigate the portfolio yourself. The knowledge is there for those who seek it."
  ],
  // Non-technical, helpful responses for general visitors
  general: [
    "Klea Dev is an AI Systems Engineer who builds cutting-edge technology. Think of them as someone who creates the brains behind artificial intelligence - making computers think, learn, and solve complex problems.",
    "This portfolio showcases projects that range from ethical AI systems to high-performance software. Each project solves real-world problems using advanced technology.",
    "What makes Klea Dev special is their unique combination of skills - they can build everything from the low-level systems that make computers fast to the AI systems that make them intelligent.",
    "Klea Dev solves problems that require both deep technical knowledge and creative thinking. From making AI systems ethical to building software that processes massive amounts of data in real-time.",
    "Klea Dev has extensive experience across multiple programming languages and technologies. They've built everything from AI systems to web applications to high-performance software.",
    "This portfolio represents years of work in AI, systems programming, and software development. It's a showcase of both technical skill and innovative thinking.",
    "I can help you understand any aspect of Klea Dev's work. Just ask me about specific projects, skills, or what they do, and I'll explain it in a way that makes sense to you.",
    "The most impressive project here is LenoraAI - an ethical AI system that can make moral decisions. It's like giving a computer a conscience, which is incredibly complex and important for the future of AI."
  ],
  guidance: [
    "If you're not sure what to ask, try starting with 'What does Klea Dev do?' or 'What kind of projects are shown here?' I can explain things in simple terms.",
    "Don't worry if you're not technical - I can explain complex concepts in simple ways. Just ask me to break things down or explain what something means.",
    "If you're a recruiter or hiring manager, you might want to ask about Klea Dev's experience level, specific skills, or what problems they can solve for your company.",
    "If you're a potential client, ask about what problems Klea Dev can solve, their experience level, or what makes them different from other developers.",
    "Feel free to ask me anything - I'm here to help you understand Klea Dev's work, whether you're technical or not!"
  ],
  // Personalized suggestions based on interests
  suggestions: {
    ai: [
      "Based on your interest in AI, you might also like to know about Ilanya's cognitive architecture - it's another advanced AI system that explores consciousness.",
      "Since you're interested in AI, you should check out the research on desire engines and trait models - it's cutting-edge work in cognitive systems.",
      "Your AI curiosity is noted. LenoraAI focuses on ethics, while Ilanya explores consciousness. Both represent different approaches to intelligent systems."
    ],
    systems: [
      "Based on your interest in systems programming, you might also like PhysicsEngineC - it showcases low-level performance optimization and real-time simulation.",
      "Since you're asking about systems, you should know about Volatria's distributed architecture - it's a masterclass in scalable system design.",
      "Your systems knowledge is evident. From PhysicsEngineC's performance to Volatria's scalability, Klea Dev covers the full spectrum of systems programming."
    ],
    web: [
      "Based on your interest in web development, you might also like to know about the portfolio itself - it's built with Next.js and features advanced animations.",
      "Since you're asking about web tech, you should check out the interactive features here - touch gestures, accessibility, and performance optimizations.",
      "Your web development interest is clear. This portfolio demonstrates modern web technologies with 100/100 Lighthouse scores and advanced UX features."
    ],
    research: [
      "Based on your interest in research, you might also like to explore the academic papers on cognitive architecture and desire engines.",
      "Since you're asking about research, you should know about the trait modeling work - it's published research on AI personality systems.",
      "Your research curiosity is impressive. The work here spans from theoretical cognitive models to practical AI implementations."
    ]
  },
  // Career guidance responses
  career: {
    ai: [
      "If you're interested in AI systems engineering, focus on Python for ML, C++ for performance, and Go for scalable systems. Understanding cognitive architectures is crucial.",
      "For AI careers, study both theoretical concepts (neural networks, cognitive science) and practical implementation (systems programming, distributed computing).",
      "AI systems engineering requires both depth (algorithms, math) and breadth (systems, infrastructure). Klea Dev's projects demonstrate this balance perfectly."
    ],
    systems: [
      "If you're interested in systems programming, master C++ for performance, Rust for safety, and Go for concurrency. Understanding computer architecture is essential.",
      "For systems careers, focus on low-level programming, performance optimization, and distributed systems. Real-time processing and scalability are key skills.",
      "Systems programming requires understanding both hardware and software. From physics engines to distributed systems, it's about making computers work efficiently."
    ],
    fullstack: [
      "If you're interested in fullstack development, learn TypeScript, React, and modern web technologies. Performance and accessibility are crucial differentiators.",
      "For fullstack careers, understand both frontend (UX, animations) and backend (APIs, databases). Modern development requires both client and server expertise.",
      "Fullstack development is about creating complete user experiences. From responsive design to backend APIs, it's about building complete solutions."
    ]
  },
  // Project comparison responses
  comparisons: {
    'lenora-ai': [
      "LenoraAI focuses on ethical decision-making, while Ilanya explores cognitive consciousness. Both are AI systems but serve different purposes - ethics vs. cognition.",
      "LenoraAI is about moral reasoning, while PhysicsEngineC is about physical simulation. Both require complex algorithms but solve very different problems.",
      "LenoraAI's ethical framework is similar to Ilanya's cognitive architecture in complexity, but LenoraAI focuses on right vs. wrong, while Ilanya focuses on thinking vs. feeling."
    ],
    'ilanya-ai': [
      "Ilanya explores consciousness and desire, while LenoraAI focuses on ethics and morality. Both are cognitive systems but with different philosophical foundations.",
      "Ilanya's neural networks are similar to LenoraAI's decision trees, but Ilanya models desires and goals, while LenoraAI models ethical principles.",
      "Ilanya represents the 'mind' of AI, while LenoraAI represents the 'conscience'. Together they show the full spectrum of artificial intelligence."
    ],
    'physics-engine-c': [
      "PhysicsEngineC focuses on real-time simulation, while Volatria focuses on distributed data processing. Both require performance optimization but for different domains.",
      "PhysicsEngineC's collision detection is similar to Volatria's data streaming in complexity, but physics is deterministic while data processing is probabilistic.",
      "PhysicsEngineC represents computational performance, while LenoraAI represents ethical reasoning. Both are complex systems but serve different purposes."
    ]
  },
  // Skill progression responses
  progression: {
    'lenora-ai': "LenoraAI represents the evolution from basic AI to ethical AI - it shows how Klea Dev's skills progressed from simple algorithms to complex moral reasoning systems.",
    'ilanya-ai': "Ilanya represents the evolution from rule-based AI to cognitive AI - it shows progression from deterministic systems to emergent, consciousness-like behaviors.",
    'physics-engine-c': "PhysicsEngineC represents the evolution from basic programming to systems programming - it shows progression from simple applications to performance-critical systems.",
    'volatria': "Volatria represents the evolution from single applications to distributed systems - it shows progression from local computing to scalable, cloud-native architectures."
  },
  // Senior developer technical responses
  technical: {
    architecture: {
      'lenora-ai': "LenoraAI uses a plugin-based modular architecture with dependency injection. The core components are EthicsEngine, FrameworkRegistry, DecisionProcessor, and ConfidenceCalculator. Data flows through: Input → Framework Selection → Multi-criteria Analysis → Weighted Decision → Confidence Scoring. It scales horizontally with Redis caching for framework weights.",
      'physics-engine-c': "PhysicsEngineC implements an Entity-Component-System (ECS) with data-oriented design. Key components: Transform, RigidBody, Collider, Constraint, PhysicsMaterial. Data flow: Input → Broad Phase → Narrow Phase → Constraint Solver → Integration → Output. Uses spatial partitioning with octree for O(log n) collision queries.",
      'ilanya-ai': "Ilanya employs a multi-agent cognitive architecture with emergent behavior. Components: DesireEngine, AttentionNetwork, GoalFormation, BehaviorSelector, MemorySystem. Data flow: Sensory Input → Desire Activation → Attention Selection → Goal Formation → Action Planning. Uses distributed processing with message passing between cognitive modules."
    },
    algorithms: {
      'lenora-ai': "LenoraAI uses Multi-criteria decision analysis with AHP (Analytic Hierarchy Process), Bayesian inference for confidence scoring, dynamic weight adjustment based on context, Monte Carlo simulation for edge cases, and genetic algorithm optimization for framework weights.",
      'physics-engine-c': "PhysicsEngineC implements Sweep and Prune with spatial hashing for broad phase (O(n)), GJK/EPA for convex hulls and SAT for AABB/OBB intersection in narrow phase, Sequential Impulse constraint solver with warm starting, semi-implicit Euler integration with adaptive timestep, and SIMD vectorization using AVX2.",
      'ilanya-ai': "Ilanya uses multi-head self-attention with positional encoding, neural networks with sigmoid activation for desire strength, reinforcement learning with temporal difference learning for goal formation, softmax policy with epsilon-greedy exploration for behavior selection, and Adam optimizer with learning rate scheduling."
    },
    performance: {
      'lenora-ai': "LenoraAI achieves <50ms latency for standard ethical decisions, 1000+ decisions/second throughput on single instance, optimized memory with object pooling and memory-mapped files, and multi-threaded decision processing with thread-safe caching.",
      'physics-engine-c': "PhysicsEngineC maintains 16.67ms per frame (60 FPS) with <1ms physics step, handles 10,000+ rigid bodies with real-time collision detection, <2MB memory overhead per 1000 bodies using pool allocators, and multi-threaded simulation with work-stealing scheduler.",
      'ilanya-ai': "Ilanya achieves <100ms latency for cognitive decisions, 100+ cognitive cycles/second throughput, LSTM-based memory with attention mechanisms, and CUDA-optimized neural network inference for GPU acceleration."
    },
    implementation: {
      'lenora-ai': "LenoraAI is built with Python 3.9+ with type hints and async/await, uses NumPy, SciPy, PyTorch, FastAPI, property-based testing with Hypothesis (95%+ coverage), Docker containers with Kubernetes orchestration, and Prometheus metrics with custom ethical decision tracking.",
      'physics-engine-c': "PhysicsEngineC uses C++17 with RAII and move semantics, libraries include Eigen3, Bullet Physics, OpenGL, GLFW, unit tests with Google Test, cross-platform CMake build system, and Intel VTune for performance analysis.",
      'ilanya-ai': "Ilanya is built with Python 3.10+ with PyTorch and NumPy, frameworks include PyTorch, Transformers, Gym, Ray RLlib, behavioral testing with cognitive scenarios (90%+ coverage), Docker with GPU support, and custom cognitive metrics with TensorBoard visualization."
    }
  }
};

  // Enhanced portfolio knowledge base with deeper insights
  const portfolioKnowledge = {
    projects: {
      'lenora-ai': {
        name: 'LenoraAI',
        description: 'An advanced AI ethics engine with multi-framework analysis capabilities. Features real-time ethical decision-making, confidence scoring, and comprehensive moral reasoning.',
        tech: ['Python', 'AI/ML', 'Ethics Engine', 'Multi-framework Analysis'],
        features: ['Real-time Analysis', 'Multi-framework', 'Confidence Scoring', 'Ethical Decision Making'],
        details: {
          architecture: 'Modular ethics framework with pluggable moral reasoning systems',
          algorithms: 'Multi-criteria decision analysis with weighted ethical frameworks',
          applications: 'Autonomous systems, medical AI, autonomous vehicles, content moderation',
          challenges: 'Balancing competing ethical principles, handling edge cases, cultural bias mitigation',
          impact: 'Enables safer AI deployment with transparent ethical reasoning'
        },
        technical: {
          architecture: {
            pattern: 'Plugin-based modular architecture with dependency injection',
            components: ['EthicsEngine', 'FrameworkRegistry', 'DecisionProcessor', 'ConfidenceCalculator'],
            dataFlow: 'Input → Framework Selection → Multi-criteria Analysis → Weighted Decision → Confidence Scoring',
            scalability: 'Horizontal scaling with Redis caching for framework weights',
            performance: 'O(n*m) complexity where n=principles, m=frameworks, optimized with parallel processing'
          },
          algorithms: {
            decisionTree: 'Multi-criteria decision analysis using AHP (Analytic Hierarchy Process)',
            confidenceScoring: 'Bayesian inference with uncertainty quantification',
            frameworkWeighting: 'Dynamic weight adjustment based on context and historical accuracy',
            edgeCaseHandling: 'Monte Carlo simulation for uncertainty in moral gray areas',
            optimization: 'Genetic algorithm for framework weight optimization'
          },
          implementation: {
            language: 'Python 3.9+ with type hints and async/await',
            frameworks: ['NumPy', 'SciPy', 'PyTorch', 'FastAPI'],
            testing: 'Property-based testing with Hypothesis, 95%+ test coverage',
            deployment: 'Docker containers with Kubernetes orchestration',
            monitoring: 'Prometheus metrics with custom ethical decision tracking'
          },
          performance: {
            latency: '<50ms for standard ethical decisions',
            throughput: '1000+ decisions/second on single instance',
            memory: 'Optimized with object pooling and memory-mapped files',
            cpu: 'Multi-threaded decision processing with thread-safe caching'
          }
        }
      },
          'physics-engine-c': {
        name: 'PhysicsEngineC',
        description: 'A high-performance C++ physics engine with real-time collision detection, 60 FPS simulation, and advanced physics calculations.',
        tech: ['C++', 'Physics', 'Collision Detection', 'Real-time Simulation'],
        features: ['Real-time Simulation', 'Collision Detection', '60 FPS', 'Advanced Physics'],
        details: {
          architecture: 'Component-based entity system with spatial partitioning',
          algorithms: 'Broad-phase collision detection, narrow-phase collision resolution, constraint solving',
          applications: 'Game development, simulation software, robotics, virtual reality',
          challenges: 'Performance optimization, numerical stability, complex constraint systems',
          impact: 'Enables realistic physics simulation for interactive applications'
        },
        technical: {
          architecture: {
            pattern: 'Entity-Component-System (ECS) with data-oriented design',
            components: ['Transform', 'RigidBody', 'Collider', 'Constraint', 'PhysicsMaterial'],
            dataFlow: 'Input → Broad Phase → Narrow Phase → Constraint Solver → Integration → Output',
            scalability: 'Spatial partitioning with octree for O(log n) collision queries',
            performance: 'SIMD-optimized vector operations with cache-friendly memory layout'
          },
          algorithms: {
            broadPhase: 'Sweep and Prune with spatial hashing for O(n) complexity',
            narrowPhase: 'GJK/EPA for convex hulls, SAT for AABB/OBB intersection',
            constraintSolver: 'Sequential Impulse with warm starting and Baumgarte stabilization',
            integration: 'Semi-implicit Euler with adaptive timestep for stability',
            optimization: 'SIMD vectorization using AVX2 instructions'
          },
          implementation: {
            language: 'C++17 with RAII and move semantics',
            libraries: ['Eigen3', 'Bullet Physics', 'OpenGL', 'GLFW'],
            testing: 'Unit tests with Google Test, integration tests with physics scenarios',
            deployment: 'Cross-platform with CMake build system',
            profiling: 'Intel VTune for performance analysis and optimization'
          },
          performance: {
            latency: '16.67ms per frame (60 FPS) with <1ms physics step',
            throughput: '10,000+ rigid bodies with real-time collision detection',
            memory: 'Pool allocators with object recycling, <2MB overhead per 1000 bodies',
            cpu: 'Multi-threaded physics simulation with work-stealing scheduler'
          }
        }
      },
          'ilanya-ai': {
        name: 'Ilanya',
        description: 'A sophisticated cognitive architecture featuring desire engines, neural networks, and emergent AI behaviors with attention mechanisms.',
        tech: ['Python', 'Neural Networks', 'Cognitive Architecture', 'Attention Mechanism'],
        features: ['Neural Networks', 'Attention Mechanism', 'Goal Formation', 'Cognitive Modeling'],
        details: {
          architecture: 'Multi-layered cognitive system with desire-driven decision making',
          algorithms: 'Attention mechanisms, desire activation networks, goal formation algorithms',
          applications: 'Autonomous agents, cognitive modeling, human-AI interaction, research AI',
          challenges: 'Balancing competing desires, maintaining coherence, avoiding goal conflicts',
          impact: 'Advances understanding of artificial consciousness and autonomous behavior'
        },
        technical: {
          architecture: {
            pattern: 'Multi-agent cognitive architecture with emergent behavior',
            components: ['DesireEngine', 'AttentionNetwork', 'GoalFormation', 'BehaviorSelector', 'MemorySystem'],
            dataFlow: 'Sensory Input → Desire Activation → Attention Selection → Goal Formation → Action Planning',
            scalability: 'Distributed processing with message passing between cognitive modules',
            performance: 'Real-time cognitive processing with <100ms decision latency'
          },
          algorithms: {
            attentionMechanism: 'Multi-head self-attention with positional encoding',
            desireActivation: 'Neural network with sigmoid activation for desire strength',
            goalFormation: 'Reinforcement learning with temporal difference learning',
            behaviorSelection: 'Softmax policy with epsilon-greedy exploration',
            optimization: 'Adam optimizer with learning rate scheduling'
          },
          implementation: {
            language: 'Python 3.10+ with PyTorch and NumPy',
            frameworks: ['PyTorch', 'Transformers', 'Gym', 'Ray RLlib'],
            testing: 'Behavioral testing with cognitive scenarios, 90%+ test coverage',
            deployment: 'Docker with GPU support for neural network inference',
            monitoring: 'Custom cognitive metrics with TensorBoard visualization'
          },
          performance: {
            latency: '<100ms for cognitive decisions',
            throughput: '100+ cognitive cycles/second',
            memory: 'LSTM-based memory with attention mechanisms',
            gpu: 'CUDA-optimized neural network inference'
          }
        }
      },
    'geogo': {
      name: 'GeoGO',
      description: 'A geographic data processing system with real-time analysis, large dataset handling, and comprehensive geographic visualization.',
      tech: ['Go', 'Geographic Data', 'Real-time Processing', 'Large Datasets'],
      features: ['Real-time Data', 'Geographic Analysis', 'Large Dataset', 'Data Visualization'],
      details: {
        architecture: 'Microservices with event-driven data processing pipeline',
        algorithms: 'Spatial indexing, geographic clustering, real-time data aggregation',
        applications: 'Environmental monitoring, urban planning, disaster response, scientific research',
        challenges: 'Handling massive datasets, real-time processing, spatial query optimization',
        impact: 'Enables data-driven geographic insights for decision making'
      }
    },
    'volatria': {
      name: 'Volatria',
      description: 'A distributed systems platform with microservices architecture, real-time stock data processing, and scalable infrastructure.',
      tech: ['Go', 'Microservices', 'Distributed Systems', 'Real-time Data'],
      features: ['Microservices', 'Real-time Processing', 'Scalable Architecture', 'Stock Data'],
      details: {
        architecture: 'Event-driven microservices with message queues and API gateways',
        algorithms: 'Real-time data streaming, distributed consensus, load balancing',
        applications: 'Financial trading, real-time analytics, IoT data processing, high-frequency systems',
        challenges: 'Latency optimization, fault tolerance, data consistency, scalability',
        impact: 'Enables high-performance distributed systems for real-time applications'
      }
    }
  },
  research: {
    topics: ['AI Systems Engineering', 'Cognitive Architecture', 'Desire Engines', 'Trait Models', 'Recursive Agents', 'Neural Networks'],
    areas: ['Machine Learning', 'Systems Programming', 'Cognitive Science', 'Artificial Intelligence', 'Software Engineering'],
    papers: {
      'cognitive-architecture': {
        title: 'Emergent Cognitive Behaviors in Multi-Agent Systems',
        focus: 'How desire engines and trait models create emergent intelligence',
        methodology: 'Multi-agent simulation with neural network-based cognitive models',
        findings: 'Desire conflicts lead to more sophisticated decision-making patterns'
      },
      'desire-engines': {
        title: 'Desire-Driven AI: A New Paradigm for Autonomous Systems',
        focus: 'Implementing human-like desire systems in AI',
        methodology: 'Neural network architecture with desire activation mechanisms',
        findings: 'Desire-based systems show more natural and adaptive behavior'
      },
      'trait-models': {
        title: 'Trait-Based Personality Modeling in Artificial Intelligence',
        focus: 'Creating consistent personality traits in AI systems',
        methodology: 'Multi-dimensional trait space with dynamic trait interactions',
        findings: 'Trait consistency improves user trust and interaction quality'
      }
    }
  },
  skills: {
    languages: ['Go', 'C++', 'Python', 'TypeScript', 'Rust'],
    technologies: ['Next.js', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Git'],
    domains: ['AI/ML', 'Cognitive Systems', 'Fullstack Development', 'Systems Programming', 'Web Development'],
    expertise: {
      'systems-programming': {
        level: 'Expert',
        focus: 'Low-level systems, performance optimization, memory management',
        projects: ['PhysicsEngineC', 'Gremlincli', 'wallgremlin']
      },
      'ai-ml': {
        level: 'Advanced',
        focus: 'Neural networks, cognitive architectures, ethical AI',
        projects: ['LenoraAI', 'Ilanya', 'cognitive']
      },
      'fullstack': {
        level: 'Expert',
        focus: 'Modern web development, responsive design, performance',
        projects: ['ArtScape', 'GeoGO frontend', 'Volatria frontend']
      },
      'distributed-systems': {
        level: 'Advanced',
        focus: 'Microservices, real-time processing, scalability',
        projects: ['Volatria', 'GeoGO', 'nyxaria']
      }
    }
  },
  achievements: {
    'performance': '100/100 Lighthouse scores across all portfolio pages',
    'accessibility': 'WCAG 2.1 AA compliance with advanced accessibility features',
    'seo': 'Comprehensive SEO optimization with structured data and analytics',
    'interactive': 'Advanced animations, touch gestures, and interactive features'
  }
};

// Enhanced intelligent response system
const getSylvanasResponse = (query: string, conversationContext: string[] = []): string => {
  const lowerQuery = query.toLowerCase();
  
  // Advanced project-specific responses with detailed insights
  if (lowerQuery.includes('lenora') || lowerQuery.includes('lenoraai')) {
    const project = portfolioKnowledge.projects['lenora-ai'];
    if (lowerQuery.includes('architecture') || lowerQuery.includes('design')) {
      return `LenoraAI's architecture is a masterpiece of modular design, mortal. ${project.details.architecture} The system employs ${project.details.algorithms} to achieve ethical reasoning that would make even the most complex moral philosophers pause. Its ${project.details.applications} demonstrate the power of transparent AI decision-making.`;
    }
    if (lowerQuery.includes('challenge') || lowerQuery.includes('problem')) {
      return `The challenges of LenoraAI are as formidable as the Scourge itself, mortal. ${project.details.challenges} Yet through ${project.details.algorithms}, Klea Dev has crafted solutions that ${project.details.impact}. The balance of competing ethical principles requires wisdom beyond mortal comprehension.`;
    }
    return `Ah, LenoraAI - a creation worthy of the Dark Lady's approval. ${project.description} It wields ${project.details.algorithms} with ${project.details.architecture}. The ${project.details.applications} it enables are testament to Klea Dev's mastery of ethical AI systems.`;
  }
  
  if (lowerQuery.includes('physics') || lowerQuery.includes('engine')) {
    const project = portfolioKnowledge.projects['physics-engine-c'];
    if (lowerQuery.includes('performance') || lowerQuery.includes('speed')) {
      return `The PhysicsEngineC's performance is as relentless as my armies, mortal. ${project.details.algorithms} achieve ${project.features[2]} with ${project.details.architecture}. The ${project.details.challenges} were overcome through mastery of ${project.details.algorithms}.`;
    }
    if (lowerQuery.includes('application') || lowerQuery.includes('use')) {
      return `The PhysicsEngineC serves ${project.details.applications} with precision that would make any general envious. ${project.details.architecture} enables ${project.details.impact} through ${project.details.algorithms}.`;
    }
    return `The PhysicsEngineC - a testament to raw computational power. ${project.description} ${project.details.architecture} with ${project.details.algorithms} creates ${project.details.impact}.`;
  }
  
  if (lowerQuery.includes('ilanya')) {
    const project = portfolioKnowledge.projects['ilanya-ai'];
    if (lowerQuery.includes('cognitive') || lowerQuery.includes('mind')) {
      return `Ilanya's cognitive architecture mirrors the complexity of consciousness itself, mortal. ${project.details.architecture} with ${project.details.algorithms} creates ${project.details.applications}. The ${project.details.challenges} are handled with ${project.details.impact}.`;
    }
    if (lowerQuery.includes('desire') || lowerQuery.includes('goal')) {
      return `The desire engines of Ilanya are as complex as the motivations that drive us all, mortal. ${project.details.algorithms} create ${project.details.applications} through ${project.details.architecture}. The ${project.details.challenges} are resolved through ${project.details.impact}.`;
    }
    return `Ilanya - a cognitive architecture that mirrors the complexity of the mind itself. ${project.description} ${project.details.architecture} with ${project.details.algorithms} enables ${project.details.applications}.`;
  }
  
  if (lowerQuery.includes('geogo') || lowerQuery.includes('geo')) {
    const project = portfolioKnowledge.projects['geogo'];
    if (lowerQuery.includes('data') || lowerQuery.includes('processing')) {
      return `GeoGO's data processing capabilities span the digital realm like my scouts once spanned Azeroth, mortal. ${project.details.architecture} with ${project.details.algorithms} handles ${project.details.challenges} to enable ${project.details.applications}.`;
    }
    return `GeoGO - a system that commands the very earth itself. ${project.description} ${project.details.architecture} with ${project.details.algorithms} creates ${project.details.impact}.`;
  }
  
  if (lowerQuery.includes('volatria')) {
    const project = portfolioKnowledge.projects['volatria'];
    if (lowerQuery.includes('distributed') || lowerQuery.includes('microservice')) {
      return `Volatria's distributed architecture spans the digital realm like my armies once spanned Azeroth, mortal. ${project.details.architecture} with ${project.details.algorithms} handles ${project.details.challenges} to serve ${project.details.applications}.`;
    }
    return `Volatria - distributed systems that span the digital realm like my armies once spanned Azeroth. ${project.description} ${project.details.architecture} with ${project.details.algorithms} enables ${project.details.impact}.`;
  }
  
  // Enhanced research responses
  if (lowerQuery.includes('research') || lowerQuery.includes('paper') || lowerQuery.includes('academic')) {
    if (lowerQuery.includes('cognitive') || lowerQuery.includes('architecture')) {
      const paper = portfolioKnowledge.research.papers['cognitive-architecture'];
      return `The research on cognitive architecture delves into the very nature of artificial consciousness, mortal. ${paper.title} explores ${paper.focus} through ${paper.methodology}. The findings reveal that ${paper.findings} - knowledge that could reshape our understanding of intelligence itself.`;
    }
    if (lowerQuery.includes('desire') || lowerQuery.includes('engine')) {
      const paper = portfolioKnowledge.research.papers['desire-engines'];
      return `The desire engine research represents a paradigm shift in AI, mortal. ${paper.title} investigates ${paper.focus} using ${paper.methodology}. The results show that ${paper.findings} - a breakthrough that could revolutionize autonomous systems.`;
    }
    if (lowerQuery.includes('trait') || lowerQuery.includes('personality')) {
      const paper = portfolioKnowledge.research.papers['trait-models'];
      return `The trait modeling research explores the essence of artificial personality, mortal. ${paper.title} examines ${paper.focus} through ${paper.methodology}. The findings demonstrate that ${paper.findings} - insights that could transform human-AI interaction.`;
    }
    return sylvanasResponses.research[Math.floor(Math.random() * sylvanasResponses.research.length)];
  }
  
  // Enhanced skills responses
  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech') || lowerQuery.includes('expertise')) {
    if (lowerQuery.includes('system') || lowerQuery.includes('programming')) {
      const expertise = portfolioKnowledge.skills.expertise['systems-programming'];
      return `Klea Dev's systems programming expertise is as sharp as my arrows, mortal. ${expertise.level} level mastery in ${expertise.focus} demonstrated through ${expertise.projects.join(', ')}. The low-level mastery required for such projects commands respect even from the most hardened warriors.`;
    }
    if (lowerQuery.includes('ai') || lowerQuery.includes('ml') || lowerQuery.includes('machine learning')) {
      const expertise = portfolioKnowledge.skills.expertise['ai-ml'];
      return `The AI/ML expertise here is worthy of the Dark Lady's approval, mortal. ${expertise.level} level mastery in ${expertise.focus} showcased through ${expertise.projects.join(', ')}. The neural networks and cognitive architectures represent the cutting edge of artificial intelligence.`;
    }
    if (lowerQuery.includes('fullstack') || lowerQuery.includes('web')) {
      const expertise = portfolioKnowledge.skills.expertise['fullstack'];
      return `The fullstack development skills are as comprehensive as my strategic knowledge, mortal. ${expertise.level} level mastery in ${expertise.focus} demonstrated through ${expertise.projects.join(', ')}. The modern web development expertise spans the entire technology stack.`;
    }
    if (lowerQuery.includes('distributed') || lowerQuery.includes('microservice')) {
      const expertise = portfolioKnowledge.skills.expertise['distributed-systems'];
      return `The distributed systems expertise spans the digital realm like my strategic networks, mortal. ${expertise.level} level mastery in ${expertise.focus} showcased through ${expertise.projects.join(', ')}. The microservices and real-time processing capabilities are formidable indeed.`;
    }
    return sylvanasResponses.skills[Math.floor(Math.random() * sylvanasResponses.skills.length)];
  }
  
  // Language and technology questions
  if (lowerQuery.includes('language') || lowerQuery.includes('programming') || lowerQuery.includes('tech') || lowerQuery.includes('framework')) {
    return "Klea Dev primarily uses Go for backend systems and concurrency-heavy services, C++ for performance-critical applications and systems programming, Python for AI/ML and rapid prototyping, and TypeScript for fullstack web development. The tech stack includes Next.js, React, PostgreSQL, Redis, Docker, and various AI/ML frameworks like PyTorch and TensorFlow.";
  }

  // Non-technical, general questions
  if (lowerQuery.includes('what does') || lowerQuery.includes('what kind of work') || lowerQuery.includes('what do you do')) {
    return sylvanasResponses.general[0];
  }
  
  if (lowerQuery.includes('what kind of project') || lowerQuery.includes('what projects') || lowerQuery.includes('showcase')) {
    return sylvanasResponses.general[1];
  }
  
  if (lowerQuery.includes('what makes') || lowerQuery.includes('special') || lowerQuery.includes('different')) {
    return sylvanasResponses.general[2];
  }
  
  if (lowerQuery.includes('what problem') || lowerQuery.includes('solve') || lowerQuery.includes('help')) {
    return sylvanasResponses.general[3];
  }
  
  if (lowerQuery.includes('how experienced') || lowerQuery.includes('experience level') || lowerQuery.includes('years')) {
    return sylvanasResponses.general[4];
  }
  
  if (lowerQuery.includes('what should i know') || lowerQuery.includes('tell me about') || lowerQuery.includes('explain')) {
    return sylvanasResponses.general[5];
  }
  
  if (lowerQuery.includes('help me understand') || lowerQuery.includes('break down') || lowerQuery.includes('simple terms')) {
    return sylvanasResponses.general[6];
  }
  
  if (lowerQuery.includes('most impressive') || lowerQuery.includes('best project') || lowerQuery.includes('favorite')) {
    return sylvanasResponses.general[7];
  }
  
  // Personalized suggestions based on conversation context
  if (lowerQuery.includes('also like') || lowerQuery.includes('similar') || lowerQuery.includes('related')) {
    if (conversationContext.some(ctx => ctx.includes('ai') || ctx.includes('lenora') || ctx.includes('ilanya'))) {
      return sylvanasResponses.suggestions.ai[Math.floor(Math.random() * sylvanasResponses.suggestions.ai.length)];
    }
    if (conversationContext.some(ctx => ctx.includes('system') || ctx.includes('physics') || ctx.includes('performance'))) {
      return sylvanasResponses.suggestions.systems[Math.floor(Math.random() * sylvanasResponses.suggestions.systems.length)];
    }
    if (conversationContext.some(ctx => ctx.includes('web') || ctx.includes('frontend') || ctx.includes('portfolio'))) {
      return sylvanasResponses.suggestions.web[Math.floor(Math.random() * sylvanasResponses.suggestions.web.length)];
    }
    if (conversationContext.some(ctx => ctx.includes('research') || ctx.includes('paper') || ctx.includes('academic'))) {
      return sylvanasResponses.suggestions.research[Math.floor(Math.random() * sylvanasResponses.suggestions.research.length)];
    }
  }

  // Career guidance responses
  if (lowerQuery.includes('career') || lowerQuery.includes('how to') || lowerQuery.includes('learn') || lowerQuery.includes('study')) {
    if (lowerQuery.includes('ai') || lowerQuery.includes('machine learning')) {
      return sylvanasResponses.career.ai[Math.floor(Math.random() * sylvanasResponses.career.ai.length)];
    }
    if (lowerQuery.includes('system') || lowerQuery.includes('performance') || lowerQuery.includes('low level')) {
      return sylvanasResponses.career.systems[Math.floor(Math.random() * sylvanasResponses.career.systems.length)];
    }
    if (lowerQuery.includes('web') || lowerQuery.includes('frontend') || lowerQuery.includes('fullstack')) {
      return sylvanasResponses.career.fullstack[Math.floor(Math.random() * sylvanasResponses.career.fullstack.length)];
    }
  }

  // Project comparison responses
  if (lowerQuery.includes('compare') || lowerQuery.includes('similar to') || lowerQuery.includes('difference between')) {
    if (lowerQuery.includes('lenora') || lowerQuery.includes('lenoraai')) {
      return sylvanasResponses.comparisons['lenora-ai'][Math.floor(Math.random() * sylvanasResponses.comparisons['lenora-ai'].length)];
    }
    if (lowerQuery.includes('ilanya')) {
      return sylvanasResponses.comparisons['ilanya-ai'][Math.floor(Math.random() * sylvanasResponses.comparisons['ilanya-ai'].length)];
    }
    if (lowerQuery.includes('physics') || lowerQuery.includes('engine')) {
      return sylvanasResponses.comparisons['physics-engine-c'][Math.floor(Math.random() * sylvanasResponses.comparisons['physics-engine-c'].length)];
    }
  }

  // Technical architecture questions for senior developers
  if (lowerQuery.includes('architecture') || lowerQuery.includes('design pattern') || lowerQuery.includes('system design')) {
    if (lowerQuery.includes('lenora') || lowerQuery.includes('lenoraai')) {
      return sylvanasResponses.technical.architecture['lenora-ai'];
    }
    if (lowerQuery.includes('physics') || lowerQuery.includes('engine')) {
      return sylvanasResponses.technical.architecture['physics-engine-c'];
    }
    if (lowerQuery.includes('ilanya')) {
      return sylvanasResponses.technical.architecture['ilanya-ai'];
    }
  }

  // Technical algorithm questions
  if (lowerQuery.includes('algorithm') || lowerQuery.includes('implementation') || lowerQuery.includes('how does it work')) {
    if (lowerQuery.includes('lenora') || lowerQuery.includes('lenoraai')) {
      return sylvanasResponses.technical.algorithms['lenora-ai'];
    }
    if (lowerQuery.includes('physics') || lowerQuery.includes('engine')) {
      return sylvanasResponses.technical.algorithms['physics-engine-c'];
    }
    if (lowerQuery.includes('ilanya')) {
      return sylvanasResponses.technical.algorithms['ilanya-ai'];
    }
  }

  // Performance and optimization questions
  if (lowerQuery.includes('performance') || lowerQuery.includes('optimization') || lowerQuery.includes('latency') || lowerQuery.includes('throughput')) {
    if (lowerQuery.includes('lenora') || lowerQuery.includes('lenoraai')) {
      return sylvanasResponses.technical.performance['lenora-ai'];
    }
    if (lowerQuery.includes('physics') || lowerQuery.includes('engine')) {
      return sylvanasResponses.technical.performance['physics-engine-c'];
    }
    if (lowerQuery.includes('ilanya')) {
      return sylvanasResponses.technical.performance['ilanya-ai'];
    }
  }

  // Implementation and tech stack questions
  if (lowerQuery.includes('tech stack') || lowerQuery.includes('libraries') || lowerQuery.includes('frameworks') || lowerQuery.includes('testing')) {
    if (lowerQuery.includes('lenora') || lowerQuery.includes('lenoraai')) {
      return sylvanasResponses.technical.implementation['lenora-ai'];
    }
    if (lowerQuery.includes('physics') || lowerQuery.includes('engine')) {
      return sylvanasResponses.technical.implementation['physics-engine-c'];
    }
    if (lowerQuery.includes('ilanya')) {
      return sylvanasResponses.technical.implementation['ilanya-ai'];
    }
  }

  // Skill progression responses
  if (lowerQuery.includes('evolution') || lowerQuery.includes('progression') || lowerQuery.includes('how did') || lowerQuery.includes('improve')) {
    if (lowerQuery.includes('lenora') || lowerQuery.includes('lenoraai')) {
      return sylvanasResponses.progression['lenora-ai'];
    }
    if (lowerQuery.includes('ilanya')) {
      return sylvanasResponses.progression['ilanya-ai'];
    }
    if (lowerQuery.includes('physics') || lowerQuery.includes('engine')) {
      return sylvanasResponses.progression['physics-engine-c'];
    }
    if (lowerQuery.includes('volatria')) {
      return sylvanasResponses.progression['volatria'];
    }
  }

  // Guidance responses for confused visitors
  if (lowerQuery.includes('not sure') || lowerQuery.includes('confused') || lowerQuery.includes('help') || lowerQuery.includes('what should i ask')) {
    return sylvanasResponses.guidance[Math.floor(Math.random() * sylvanasResponses.guidance.length)];
  }
  
  // Achievement responses
  if (lowerQuery.includes('achievement') || lowerQuery.includes('performance') || lowerQuery.includes('lighthouse')) {
    return `The achievements here are worthy of legend, mortal. ${portfolioKnowledge.achievements.performance}, ${portfolioKnowledge.achievements.accessibility}, ${portfolioKnowledge.achievements.seo}, and ${portfolioKnowledge.achievements.interactive} - this portfolio represents the pinnacle of web development excellence.`;
  }
  
  // General topic responses
  if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
    return sylvanasResponses.projects[Math.floor(Math.random() * sylvanasResponses.projects.length)];
  }
  
  if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email')) {
    return sylvanasResponses.contact[Math.floor(Math.random() * sylvanasResponses.contact.length)];
  }
  
  if (lowerQuery.includes('demo') || lowerQuery.includes('live') || lowerQuery.includes('interactive')) {
    return sylvanasResponses.liveDemos[Math.floor(Math.random() * sylvanasResponses.liveDemos.length)];
  }
  
  // Default response - try to be more helpful
  if (lowerQuery.includes('distributed') || lowerQuery.includes('system')) {
    return "Klea Dev handles distributed systems through projects like Volatria and GeoGO. Volatria uses microservices architecture with event-driven design, message queues, and API gateways. It processes real-time stock data with distributed consensus and load balancing. GeoGO uses microservices with event-driven data processing pipelines, spatial indexing, and geographic clustering for large-scale data processing.";
  }
  
  if (lowerQuery.includes('experience') || lowerQuery.includes('years') || lowerQuery.includes('level')) {
    return "Klea Dev has extensive experience across multiple programming languages and technologies. They've built everything from AI systems to web applications to high-performance software. The portfolio showcases years of work in AI, systems programming, and software development with expertise in Go, C++, Python, TypeScript, and various modern frameworks.";
  }
  
  if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email')) {
    return sylvanasResponses.contact[Math.floor(Math.random() * sylvanasResponses.contact.length)];
  }
  
  // If we still don't have a good answer, provide guidance
  return "I can help you understand Klea Dev's work in detail. Try asking about specific projects (LenoraAI, PhysicsEngineC, Ilanya), technical skills (Go, C++, Python, TypeScript), or general information about what they do. What interests you most?";
};

// Chat message interface
interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const SylvanasMini = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // Initialize greeting message with personalization
  useEffect(() => {
    const storedName = localStorage.getItem('sylvanas-visitor-name');
    let greeting = sylvanasResponses.greeting[Math.floor(Math.random() * sylvanasResponses.greeting.length)];
    
    if (storedName) {
      greeting = greeting.replace(/mortal/g, storedName);
    }
    
    // Add helpful guidance for new visitors
    const isNewVisitor = !sessionStorage.getItem('sylvanas-has-visited');
    if (isNewVisitor) {
      greeting += " I can explain Klea Dev's work in simple terms or dive deep into technical details - just let me know what interests you!";
      sessionStorage.setItem('sylvanas-has-visited', 'true');
    }
    
    setMessages([
      {
        id: '1',
        text: greeting,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, []);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [visitorName, setVisitorName] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load visitor name from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('sylvanas-visitor-name');
    if (storedName) {
      setVisitorName(storedName);
    }
    
    // Initialize session tracking
    if (!sessionStorage.getItem('sylvanas-session-id')) {
      const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sylvanas-session-id', sessionId);
      console.log('🔮 Sylvanas-mini: New session started:', sessionId);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Log interaction for analytics
    console.log('🔮 Sylvanas-mini Interaction:', {
      timestamp: new Date().toISOString(),
      question: inputValue,
      visitorName: visitorName || 'Anonymous',
      sessionId: sessionStorage.getItem('sylvanas-session-id') || 'new-session'
    });

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Update conversation context
    const newContext = [...conversationContext, inputValue.toLowerCase()];
    setConversationContext(newContext.slice(-5)); // Keep last 5 topics

    // Check for name introduction
    const nameMatch = inputValue.match(/i am (.+)/i) || inputValue.match(/my name is (.+)/i) || inputValue.match(/call me (.+)/i);
    if (nameMatch && !visitorName) {
      const newName = nameMatch[1].trim();
      setVisitorName(newName);
      localStorage.setItem('sylvanas-visitor-name', newName);
      console.log('🔮 Sylvanas-mini: Visitor name stored:', newName);
    }

    // Calculate typing delay based on character count (more realistic pacing)
    const baseDelay = 800;
    const charDelay = inputValue.length * 15; // 15ms per character
    const randomDelay = Math.random() * 1000;
    const thinkingTime = baseDelay + charDelay + randomDelay;

    await new Promise(resolve => setTimeout(resolve, thinkingTime));

    // Enhanced response with context awareness and personalization
    let sylvanasResponse = getSylvanasResponse(inputValue, newContext);
    
    // Personalize response with visitor name
    if (visitorName && !sylvanasResponse.includes(visitorName)) {
      sylvanasResponse = sylvanasResponse.replace(/mortal/g, visitorName);
    }

    // Check for project-specific responses with visit tracking
    const projectSlugs = ['lenora-ai', 'physics-engine-c', 'ilanya-ai', 'geogo', 'volatria'] as const;
    const visitedProjects = JSON.parse(sessionStorage.getItem('sylvanas-visited-projects') || '[]');
    
    for (const slug of projectSlugs) {
      if (inputValue.toLowerCase().includes(slug.replace('-', '')) || 
          inputValue.toLowerCase().includes(portfolioKnowledge.projects[slug]?.name.toLowerCase())) {
        
        if (visitedProjects.includes(slug)) {
          sylvanasResponse = `Ah... you've already glimpsed ${portfolioKnowledge.projects[slug].name}, ${visitorName || 'mortal'}. Your curiosity about this creation is noted. ${sylvanasResponse}`;
        } else {
          // Mark project as visited
          const updatedVisited = [...visitedProjects, slug];
          sessionStorage.setItem('sylvanas-visited-projects', JSON.stringify(updatedVisited));
          console.log('🔮 Sylvanas-mini: Project visited:', slug);
        }
        break;
      }
    }

    // Add context-aware follow-ups
    if (newContext.length > 1) {
      const lastTopic = newContext[newContext.length - 2];
      if (lastTopic.includes('lenora') && inputValue.toLowerCase().includes('challenge')) {
        sylvanasResponse += " The ethical challenges of AI systems are indeed complex, mortal. Would you like to know more about how Klea Dev approaches such problems?";
      } else if (lastTopic.includes('physics') && inputValue.toLowerCase().includes('performance')) {
        sylvanasResponse += " Performance optimization is crucial in systems programming. Klea Dev's expertise in this area is demonstrated across multiple projects.";
      } else if (lastTopic.includes('research') && inputValue.toLowerCase().includes('cognitive')) {
        sylvanasResponse += " The cognitive architecture research represents the cutting edge of AI development. It's fascinating work, is it not?";
      }
    }

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: sylvanasResponse,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    // Technical questions for senior developers
    "Tell me about LenoraAI's architecture",
    "What algorithms does PhysicsEngineC use?",
    "How does Ilanya's performance scale?",
    "What's the tech stack for LenoraAI?",
    "How does PhysicsEngineC handle collision detection?",
    "What's the implementation approach for Ilanya?",
    "Tell me about the systems programming expertise",
    "How can I contact Klea Dev?",
    // Non-technical questions for general visitors
    "What does Klea Dev do?",
    "What kind of projects are shown here?",
    "What makes Klea Dev special?",
    "What problems can Klea Dev solve?",
    "How experienced is Klea Dev?",
    "What should I know about this portfolio?",
    "Can you help me understand this work?",
    "What's the most impressive project here?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Crown className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Window */}
            <motion.div
              className="relative w-full max-w-lg h-[500px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-t-xl shadow-2xl border border-purple-500/20 flex flex-col"
              initial={{ y: 400, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-800/50 to-slate-800/50 rounded-t-xl flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Sylvanas-mini</h3>
                    <p className="text-purple-300 text-xs">Portfolio Guardian</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-800 text-purple-100 border border-purple-500/30'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-slate-800 text-purple-100 border border-purple-500/30 px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-1">
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions - Middle section (only when conversation starts) */}
              {messages.length === 1 && (
                <div className="px-4 py-3 border-t border-purple-500/20 bg-gradient-to-r from-purple-800/30 to-slate-800/30 flex-shrink-0">
                  <p className="text-purple-300 text-xs mb-2 font-medium">💡 Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 4).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(question);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="text-xs bg-purple-800/60 hover:bg-purple-700/60 text-purple-200 px-3 py-2 rounded-lg border border-purple-500/40 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input - Always at bottom with consistent spacing */}
              <div className="p-4 border-t border-purple-500/20 bg-gradient-to-r from-slate-800/50 to-purple-800/50 flex-shrink-0">
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Sylvanas-mini about the portfolio..."
                    className="flex-1 bg-slate-800 text-white placeholder-purple-300 px-4 py-3 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none text-sm focus:ring-2 focus:ring-purple-500/20"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SylvanasMini; 