<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { Motion, AnimatePresence } from "svelte-motion";
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
        Skull,
        Trophy,
    } from "lucide-svelte";

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
     * @returns Sylvanas-mini AI assistant
     */

    // Sylvanas personality responses
    const sylvanasResponses = {
        greeting: [
            "Greetings, mortal. I am Sylvanas-mini, guardian of this portfolio. What knowledge do you seek about Klea Dev's work?",
            "Ah, another visitor to my domain. I am Sylvanas-mini, and I hold the secrets of this portfolio. What would you know?",
            "Welcome to my realm, mortal. I am Sylvanas-mini, keeper of Klea Dev's achievements. Speak your questions.",
        ],
        projects: [
            "Klea Dev's projects are as diverse as they are powerful. From AI systems to physics engines, each creation serves a purpose. Which interests you most?",
            "The projects here are testaments to skill and ambition. LenoraAI, PhysicsEngineC, Ilanya - each a masterpiece of engineering. What would you know of them?",
            "These are not mere projects, mortal. They are manifestations of Klea Dev's vision - AI systems, cognitive architectures, distributed systems. Which calls to you?",
        ],
        research: [
            "The research here delves into the depths of AI and cognitive systems. Papers on desire engines, trait models, recursive agents - knowledge that could reshape the world.",
            "Academic pursuits worthy of respect. Klea Dev's research spans cognitive architecture, neural networks, and emergent AI behaviors. What aspect intrigues you?",
            "These are not simple studies, mortal. They are explorations into the very nature of artificial intelligence and consciousness. The implications are... profound.",
        ],
        skills: [
            "Klea Dev's skills are as sharp as my arrows. Go, C++, Python, TypeScript - each mastered for a purpose. The portfolio speaks of expertise in AI systems and fullstack development.",
            "Technical prowess that commands respect. From systems programming to web development, from AI engines to cognitive models - a skillset worthy of the Dark Lady's approval.",
            "The skills here are not merely listed, mortal. They are weapons honed through countless projects and challenges. Each technology serves Klea Dev's vision.",
        ],
        contact: [
            "To reach Klea Dev is to seek audience with a master of their craft. The contact form awaits your message, mortal. Make it worthy.",
            "Communication is a weapon, and Klea Dev wields it well. Use the contact form to forge connections that could change your destiny.",
            "The path to collaboration lies through the contact form, mortal. Klea Dev is always open to worthy projects and challenging opportunities.",
        ],
        liveDemos: [
            "The Live Demos are where theory becomes reality, mortal. Interactive code execution, real-time simulations - witness Klea Dev's work in action.",
            "These are not mere demonstrations, they are windows into Klea Dev's mind. Watch as code comes alive, as algorithms dance across the screen.",
            "The Live Demos showcase power in its purest form. Real-time execution, interactive simulations - this is where Klea Dev's skills truly shine.",
        ],
        default: [
            "Your question intrigues me, mortal. Perhaps you should explore the portfolio more thoroughly to find what you seek.",
            "The answer you seek may lie within these pages. Look deeper, mortal, and you shall find what you desire.",
            "Interesting... but perhaps you should navigate the portfolio yourself. The knowledge is there for those who seek it.",
        ],
        general: [
            "Klea Dev is an AI Systems Engineer who builds cutting-edge technology. Think of them as someone who creates the brains behind artificial intelligence - making computers think, learn, and solve complex problems.",
            "This portfolio showcases projects that range from ethical AI systems to high-performance software. Each project solves real-world problems using advanced technology.",
            "What makes Klea Dev special is their unique combination of skills - they can build everything from the low-level systems that make computers fast to the AI systems that make them intelligent.",
            "Klea Dev solves problems that require both deep technical knowledge and creative thinking. From making AI systems ethical to building software that processes massive amounts of data in real-time.",
            "Klea Dev has extensive experience across multiple programming languages and technologies. They've built everything from AI systems to web applications to high-performance software.",
            "This portfolio represents years of work in AI, systems programming, and software development. It's a showcase of both technical skill and innovative thinking.",
            "I can help you understand any aspect of Klea Dev's work. Just ask me about specific projects, skills, or what they do, and I'll explain it in a way that makes sense to you.",
            "The most impressive project here is LenoraAI - an ethical AI system that can make moral decisions. It's like giving a computer a conscience, which is incredibly complex and important for the future of AI.",
        ],
        guidance: [
            "If you're not sure what to ask, try starting with 'What does Klea Dev do?' or 'What kind of projects are shown here?' I can explain things in simple terms.",
            "Don't worry if you're not technical - I can explain complex concepts in simple ways. Just ask me to break things down or explain what something means.",
            "If you're a recruiter or hiring manager, you might want to ask about Klea Dev's experience level, specific skills, or what problems they can solve for your company.",
            "If you're a potential client, ask about what problems Klea Dev can solve, their experience level, or what makes them different from other developers.",
            "Feel free to ask me anything - I'm here to help you understand Klea Dev's work, whether you're technical or not!",
        ],
        suggestions: {
            ai: [
                "Based on your interest in AI, you might also like to know about Ilanya's cognitive architecture - it's another advanced AI system that explores consciousness.",
                "Since you're interested in AI, you should check out the research on desire engines and trait models - it's cutting-edge work in cognitive systems.",
                "Your AI curiosity is noted. LenoraAI focuses on ethics, while Ilanya explores consciousness. Both represent different approaches to intelligent systems.",
            ],
            systems: [
                "Based on your interest in systems programming, you might also like PhysicsEngineC - it showcases low-level performance optimization and real-time simulation.",
                "Since you're asking about systems, you should know about Volatria's distributed architecture - it's a masterclass in scalable system design.",
                "Your systems knowledge is evident. From PhysicsEngineC's performance to Volatria's scalability, Klea Dev covers the full spectrum of systems programming.",
            ],
            web: [
                "Based on your interest in web development, you might also like to know about the portfolio itself - it's built with modern tech and features advanced animations.",
                "Since you're asking about web tech, you should check out the interactive features here - touch gestures, accessibility, and performance optimizations.",
                "Your web development interest is clear. This portfolio demonstrates modern web technologies with exceptional performance and advanced UX features.",
            ],
            research: [
                "Based on your interest in research, you might also like to explore the academic papers on cognitive architecture and desire engines.",
                "Since you're asking about research, you should know about the trait modeling work - it's published research on AI personality systems.",
                "Your research curiosity is impressive. The work here spans from theoretical cognitive models to practical AI implementations.",
            ],
        },
        career: {
            ai: [
                "If you're interested in AI systems engineering, focus on Python for ML, C++ for performance, and Go for scalable systems. Understanding cognitive architectures is crucial.",
                "For AI careers, study both theoretical concepts (neural networks, cognitive science) and practical implementation (systems programming, distributed computing).",
                "AI systems engineering requires both depth (algorithms, math) and breadth (systems, infrastructure). Klea Dev's projects demonstrate this balance perfectly.",
            ],
            systems: [
                "If you're interested in systems programming, master C++ for performance, Rust for safety, and Go for concurrency. Understanding computer architecture is essential.",
                "For systems careers, focus on low-level programming, performance optimization, and distributed systems. Real-time processing and scalability are key skills.",
                "Systems programming requires understanding both hardware and software. From physics engines to distributed systems, it's about making computers work efficiently.",
            ],
            fullstack: [
                "If you're interested in fullstack development, learn TypeScript, React, and modern web technologies. Performance and accessibility are crucial differentiators.",
                "For fullstack careers, understand both frontend (UX, animations) and backend (APIs, databases). Modern development requires both client and server expertise.",
                "Fullstack development is about creating complete user experiences. From responsive design to backend APIs, it's about building complete solutions.",
            ],
        },
        comparisons: {
            "lenora-ai": [
                "LenoraAI focuses on ethical decision-making, while Ilanya explores cognitive consciousness. Both are AI systems but serve different purposes - ethics vs. cognition.",
                "LenoraAI is about moral reasoning, while PhysicsEngineC is about physical simulation. Both require complex algorithms but solve very different problems.",
                "LenoraAI's ethical framework is similar to Ilanya's cognitive architecture in complexity, but LenoraAI focuses on right vs. wrong, while Ilanya focuses on thinking vs. feeling.",
            ],
            "ilanya-ai": [
                "Ilanya explores consciousness and desire, while LenoraAI focuses on ethics and morality. Both are cognitive systems but with different philosophical foundations.",
                "Ilanya's neural networks are similar to LenoraAI's decision trees, but Ilanya models desires and goals, while LenoraAI models ethical principles.",
                "Ilanya represents the 'mind' of AI, while LenoraAI represents the 'conscience'. Together they show the full spectrum of artificial intelligence.",
            ],
            "physics-engine-c": [
                "PhysicsEngineC focuses on real-time simulation, while Volatria focuses on distributed data processing. Both require performance optimization but for different domains.",
                "PhysicsEngineC's collision detection is similar to Volatria's data streaming in complexity, but physics is deterministic while data processing is probabilistic.",
                "PhysicsEngineC represents computational performance, while LenoraAI represents ethical reasoning. Both are complex systems but serve different purposes.",
            ],
        },
        progression: {
            "lenora-ai":
                "LenoraAI represents the evolution from basic AI to ethical AI - it shows how Klea Dev's skills progressed from simple algorithms to complex moral reasoning systems.",
            "ilanya-ai":
                "Ilanya represents the evolution from rule-based AI to cognitive AI - it shows progression from deterministic systems to emergent, consciousness-like behaviors.",
            "physics-engine-c":
                "PhysicsEngineC represents the evolution from basic programming to systems programming - it shows progression from simple applications to performance-critical systems.",
            volatria:
                "Volatria represents the evolution from single applications to distributed systems - it shows progression from local computing to scalable, cloud-native architectures.",
        },
        technical: {
            architecture: {
                "lenora-ai":
                    "LenoraAI uses a plugin-based modular architecture with dependency injection. The core components are EthicsEngine, FrameworkRegistry, DecisionProcessor, and ConfidenceCalculator. Data flows through: Input → Framework Selection → Multi-criteria Analysis → Weighted Decision → Confidence Scoring. It scales horizontally with Redis caching for framework weights.",
                "physics-engine-c":
                    "PhysicsEngineC implements an Entity-Component-System (ECS) with data-oriented design. Key components: Transform, RigidBody, Collider, Constraint, PhysicsMaterial. Data flow: Input → Broad Phase → Narrow Phase → Constraint Solver → Integration → Output. Uses spatial partitioning with octree for O(log n) collision queries.",
                "ilanya-ai":
                    "Ilanya employs a multi-agent cognitive architecture with emergent behavior. Components: DesireEngine, AttentionNetwork, GoalFormation, BehaviorSelector, MemorySystem. Data flow: Sensory Input → Desire Activation → Attention Selection → Goal Formation → Action Planning. Uses distributed processing with message passing between cognitive modules.",
            },
            algorithms: {
                "lenora-ai":
                    "LenoraAI uses Multi-criteria decision analysis with AHP (Analytic Hierarchy Process), Bayesian inference for confidence scoring, dynamic weight adjustment based on context, Monte Carlo simulation for edge cases, and genetic algorithm optimization for framework weights.",
                "physics-engine-c":
                    "PhysicsEngineC implements Sweep and Prune with spatial hashing for broad phase (O(n)), GJK/EPA for convex hulls and SAT for AABB/OBB intersection in narrow phase, Sequential Impulse constraint solver with warm starting, semi-implicit Euler integration with adaptive timestep, and SIMD vectorization using AVX2.",
                "ilanya-ai":
                    "Ilanya uses multi-head self-attention with positional encoding, neural networks with sigmoid activation for desire strength, reinforcement learning with temporal difference learning for goal formation, softmax policy with epsilon-greedy exploration for behavior selection, and Adam optimizer with learning rate scheduling.",
            },
            performance: {
                "lenora-ai":
                    "LenoraAI achieves <50ms latency for standard ethical decisions, 1000+ decisions/second throughput on single instance, optimized memory with object pooling and memory-mapped files, and multi-threaded decision processing with thread-safe caching.",
                "physics-engine-c":
                    "PhysicsEngineC maintains 16.67ms per frame (60 FPS) with <1ms physics step, handles 10,000+ rigid bodies with real-time collision detection, <2MB memory overhead per 1000 bodies using pool allocators, and multi-threaded simulation with work-stealing scheduler.",
                "ilanya-ai":
                    "Ilanya achieves <100ms latency for cognitive decisions, 100+ cognitive cycles/second throughput, LSTM-based memory with attention mechanisms, and CUDA-optimized neural network inference for GPU acceleration.",
            },
            implementation: {
                "lenora-ai":
                    "LenoraAI is built with Python 3.9+ with type hints and async/await, uses NumPy, SciPy, PyTorch, FastAPI, property-based testing with Hypothesis (95%+ coverage), Docker containers with Kubernetes orchestration, and Prometheus metrics with custom ethical decision tracking.",
                "physics-engine-c":
                    "PhysicsEngineC uses C++17 with RAII and move semantics, libraries include Eigen3, Bullet Physics, OpenGL, GLFW, unit tests with Google Test, cross-platform CMake build system, and Intel VTune for performance analysis.",
                "ilanya-ai":
                    "Ilanya is built with Python 3.10+ with PyTorch and NumPy, frameworks include PyTorch, Transformers, Gym, Ray RLlib, behavioral testing with cognitive scenarios (90%+ coverage), Docker with GPU support, and custom cognitive metrics with TensorBoard visualization.",
            },
        },
    };

    // Enhanced portfolio knowledge base with deeper insights
    const portfolioKnowledge = {
        projects: {
            "lenora-ai": {
                name: "LenoraAI",
                description:
                    "An advanced AI ethics engine with multi-framework analysis capabilities. Features real-time ethical decision-making, confidence scoring, and comprehensive moral reasoning.",
                tech: [
                    "Python",
                    "AI/ML",
                    "Ethics Engine",
                    "Multi-framework Analysis",
                ],
                features: [
                    "Real-time Analysis",
                    "Multi-framework",
                    "Confidence Scoring",
                    "Ethical Decision Making",
                ],
                details: {
                    architecture:
                        "Modular ethics framework with pluggable moral reasoning systems",
                    algorithms:
                        "Multi-criteria decision analysis with weighted ethical frameworks",
                    applications:
                        "Autonomous systems, medical AI, autonomous vehicles, content moderation",
                    challenges:
                        "Balancing competing ethical principles, handling edge cases, cultural bias mitigation",
                    impact: "Enables safer AI deployment with transparent ethical reasoning",
                },
                technical: {
                    architecture: {
                        pattern:
                            "Plugin-based modular architecture with dependency injection",
                        components: [
                            "EthicsEngine",
                            "FrameworkRegistry",
                            "DecisionProcessor",
                            "ConfidenceCalculator",
                        ],
                        dataFlow:
                            "Input → Framework Selection → Multi-criteria Analysis → Weighted Decision → Confidence Scoring",
                        scalability:
                            "Horizontal scaling with Redis caching for framework weights",
                        performance:
                            "O(n*m) complexity where n=principles, m=frameworks, optimized with parallel processing",
                    },
                    algorithms: {
                        decisionTree:
                            "Multi-criteria decision analysis using AHP (Analytic Hierarchy Process)",
                        confidenceScoring:
                            "Bayesian inference with uncertainty quantification",
                        frameworkWeighting:
                            "Dynamic weight adjustment based on context and historical accuracy",
                        edgeCaseHandling:
                            "Monte Carlo simulation for uncertainty in moral gray areas",
                        optimization:
                            "Genetic algorithm for framework weight optimization",
                    },
                    implementation: {
                        language: "Python 3.9+ with type hints and async/await",
                        frameworks: ["NumPy", "SciPy", "PyTorch", "FastAPI"],
                        testing:
                            "Property-based testing with Hypothesis, 95%+ test coverage",
                        deployment:
                            "Docker containers with Kubernetes orchestration",
                        monitoring:
                            "Prometheus metrics with custom ethical decision tracking",
                    },
                    performance: {
                        latency: "<50ms for standard ethical decisions",
                        throughput: "1000+ decisions/second on single instance",
                        memory: "Optimized with object pooling and memory-mapped files",
                        cpu: "Multi-threaded decision processing with thread-safe caching",
                    },
                },
            },
            "physics-engine-c": {
                name: "PhysicsEngineC",
                description:
                    "A high-performance C++ physics engine with real-time collision detection, 60 FPS simulation, and advanced physics calculations.",
                tech: [
                    "C++",
                    "Physics",
                    "Collision Detection",
                    "Real-time Simulation",
                ],
                features: [
                    "Real-time Simulation",
                    "Collision Detection",
                    "60 FPS",
                    "Advanced Physics",
                ],
                details: {
                    architecture:
                        "Component-based entity system with spatial partitioning",
                    algorithms:
                        "Broad-phase collision detection, narrow-phase collision resolution, constraint solving",
                    applications:
                        "Game development, simulation software, robotics, virtual reality",
                    challenges:
                        "Performance optimization, numerical stability, complex constraint systems",
                    impact: "Enables realistic physics simulation for interactive applications",
                },
                technical: {
                    architecture: {
                        pattern:
                            "Entity-Component-System (ECS) with data-oriented design",
                        components: [
                            "Transform",
                            "RigidBody",
                            "Collider",
                            "Constraint",
                            "PhysicsMaterial",
                        ],
                        dataFlow:
                            "Input → Broad Phase → Narrow Phase → Constraint Solver → Integration → Output",
                        scalability:
                            "Spatial partitioning with octree for O(log n) collision queries",
                        performance:
                            "SIMD-optimized vector operations with cache-friendly memory layout",
                    },
                    algorithms: {
                        broadPhase:
                            "Sweep and Prune with spatial hashing for O(n) complexity",
                        narrowPhase:
                            "GJK/EPA for convex hulls, SAT for AABB/OBB intersection",
                        constraintSolver:
                            "Sequential Impulse with warm starting and Baumgarte stabilization",
                        integration:
                            "Semi-implicit Euler with adaptive timestep for stability",
                        optimization:
                            "SIMD vectorization using AVX2 instructions",
                    },
                    implementation: {
                        language: "C++17 with RAII and move semantics",
                        libraries: [
                            "Eigen3",
                            "Bullet Physics",
                            "OpenGL",
                            "GLFW",
                        ],
                        testing:
                            "Unit tests with Google Test, integration tests with physics scenarios",
                        deployment: "Cross-platform with CMake build system",
                        profiling:
                            "Intel VTune for performance analysis and optimization",
                    },
                    performance: {
                        latency:
                            "16.67ms per frame (60 FPS) with <1ms physics step",
                        throughput:
                            "10,000+ rigid bodies with real-time collision detection",
                        memory: "Pool allocators with object recycling, <2MB overhead per 1000 bodies",
                        cpu: "Multi-threaded physics simulation with work-stealing scheduler",
                    },
                },
            },
            "ilanya-ai": {
                name: "Ilanya",
                description:
                    "A sophisticated cognitive architecture featuring desire engines, neural networks, and emergent AI behaviors with attention mechanisms.",
                tech: [
                    "Python",
                    "Neural Networks",
                    "Cognitive Architecture",
                    "Attention Mechanism",
                ],
                features: [
                    "Neural Networks",
                    "Attention Mechanism",
                    "Goal Formation",
                    "Cognitive Modeling",
                ],
                details: {
                    architecture:
                        "Multi-layered cognitive system with desire-driven decision making",
                    algorithms:
                        "Attention mechanisms, desire activation networks, goal formation algorithms",
                    applications:
                        "Autonomous agents, cognitive modeling, human-AI interaction, research AI",
                    challenges:
                        "Balancing competing desires, maintaining coherence, avoiding goal conflicts",
                    impact: "Advances understanding of artificial consciousness and autonomous behavior",
                },
                technical: {
                    architecture: {
                        pattern:
                            "Multi-agent cognitive architecture with emergent behavior",
                        components: [
                            "DesireEngine",
                            "AttentionNetwork",
                            "GoalFormation",
                            "BehaviorSelector",
                            "MemorySystem",
                        ],
                        dataFlow:
                            "Sensory Input → Desire Activation → Attention Selection → Goal Formation → Action Planning",
                        scalability:
                            "Distributed processing with message passing between cognitive modules",
                        performance:
                            "Real-time cognitive processing with <100ms decision latency",
                    },
                    algorithms: {
                        attentionMechanism:
                            "Multi-head self-attention with positional encoding",
                        desireActivation:
                            "Neural network with sigmoid activation for desire strength",
                        goalFormation:
                            "Reinforcement learning with temporal difference learning",
                        behaviorSelection:
                            "Softmax policy with epsilon-greedy exploration",
                        optimization:
                            "Adam optimizer with learning rate scheduling",
                    },
                    implementation: {
                        language: "Python 3.10+ with PyTorch and NumPy",
                        frameworks: [
                            "PyTorch",
                            "Transformers",
                            "Gym",
                            "Ray RLlib",
                        ],
                        testing:
                            "Behavioral testing with cognitive scenarios, 90%+ test coverage",
                        deployment:
                            "Docker with GPU support for neural network inference",
                        monitoring:
                            "Custom cognitive metrics with TensorBoard visualization",
                    },
                    performance: {
                        latency: "<100ms for cognitive decisions",
                        throughput: "100+ cognitive cycles/second",
                        memory: "LSTM-based memory with attention mechanisms",
                        gpu: "CUDA-optimized neural network inference",
                    },
                },
            },
            geogo: {
                name: "GeoGO",
                description:
                    "A geographic data processing system with real-time analysis, large dataset handling, and comprehensive geographic visualization.",
                tech: [
                    "Go",
                    "Geographic Data",
                    "Real-time Processing",
                    "Large Datasets",
                ],
                features: [
                    "Real-time Data",
                    "Geographic Analysis",
                    "Large Dataset",
                    "Data Visualization",
                ],
                details: {
                    architecture:
                        "Microservices with event-driven data processing pipeline",
                    algorithms:
                        "Spatial indexing, geographic clustering, real-time data aggregation",
                    applications:
                        "Environmental monitoring, urban planning, disaster response, scientific research",
                    challenges:
                        "Handling massive datasets, real-time processing, spatial query optimization",
                    impact: "Enables data-driven geographic insights for decision making",
                },
            },
            volatria: {
                name: "Volatria",
                description:
                    "A distributed systems platform with microservices architecture, real-time stock data processing, and scalable infrastructure.",
                tech: [
                    "Go",
                    "Microservices",
                    "Distributed Systems",
                    "Real-time Data",
                ],
                features: [
                    "Microservices",
                    "Real-time Processing",
                    "Scalable Architecture",
                    "Stock Data",
                ],
                details: {
                    architecture:
                        "Event-driven microservices with message queues and API gateways",
                    algorithms:
                        "Real-time data streaming, distributed consensus, load balancing",
                    applications:
                        "Financial trading, real-time analytics, IoT data processing, high-frequency systems",
                    challenges:
                        "Latency optimization, fault tolerance, data consistency, scalability",
                    impact: "Enables high-performance distributed systems for real-time applications",
                },
            },
        },
        research: {
            topics: [
                "AI Systems Engineering",
                "Cognitive Architecture",
                "Desire Engines",
                "Trait Models",
                "Recursive Agents",
                "Neural Networks",
            ],
            areas: [
                "Machine Learning",
                "Systems Programming",
                "Cognitive Science",
                "Artificial Intelligence",
                "Software Engineering",
            ],
            papers: {
                "cognitive-architecture": {
                    title: "Emergent Cognitive Behaviors in Multi-Agent Systems",
                    focus: "How desire engines and trait models create emergent intelligence",
                    methodology:
                        "Multi-agent simulation with neural network-based cognitive models",
                    findings:
                        "Desire conflicts lead to more sophisticated decision-making patterns",
                },
                "desire-engines": {
                    title: "Desire-Driven AI: A New Paradigm for Autonomous Systems",
                    focus: "Implementing human-like desire systems in AI",
                    methodology:
                        "Neural network architecture with desire activation mechanisms",
                    findings:
                        "Desire-based systems show more natural and adaptive behavior",
                },
                "trait-models": {
                    title: "Trait-Based Personality Modeling in Artificial Intelligence",
                    focus: "Creating consistent personality traits in AI systems",
                    methodology:
                        "Multi-dimensional trait space with dynamic trait interactions",
                    findings:
                        "Trait consistency improves user trust and interaction quality",
                },
            },
        },
        skills: {
            languages: ["Go", "C++", "Python", "TypeScript", "Rust"],
            technologies: [
                "Next.js",
                "React",
                "PostgreSQL",
                "Redis",
                "Docker",
                "Git",
            ],
            domains: [
                "AI/ML",
                "Cognitive Systems",
                "Fullstack Development",
                "Systems Programming",
                "Web Development",
            ],
            expertise: {
                "systems-programming": {
                    level: "Expert",
                    focus: "Low-level systems, performance optimization, memory management",
                    projects: ["PhysicsEngineC", "Gremlincli", "wallgremlin"],
                },
                "ai-ml": {
                    level: "Advanced",
                    focus: "Neural networks, cognitive architectures, ethical AI",
                    projects: ["LenoraAI", "Ilanya", "cognitive"],
                },
                fullstack: {
                    level: "Expert",
                    focus: "Modern web development, responsive design, performance",
                    projects: [
                        "ArtScape",
                        "GeoGO frontend",
                        "Volatria frontend",
                    ],
                },
                "distributed-systems": {
                    level: "Advanced",
                    focus: "Microservices, real-time processing, scalability",
                    projects: ["Volatria", "GeoGO", "nyxaria"],
                },
            },
        },
        achievements: {
            performance: "100/100 Lighthouse scores across all portfolio pages",
            accessibility:
                "WCAG 2.1 AA compliance with advanced accessibility features",
            seo: "Comprehensive SEO optimization with structured data and analytics",
            interactive:
                "Advanced animations, touch gestures, and interactive features",
        },
    };

    // Enhanced intelligent response system
    const getSylvanasResponse = (
        query: string,
        conversationContext: string[] = [],
    ): string => {
        const lowerQuery = query.toLowerCase();

        // Project-specific responses
        if (lowerQuery.includes("lenora") || lowerQuery.includes("lenoraai")) {
            return `Ah, LenoraAI - a creation worthy of the Dark Lady's approval. An advanced AI ethics engine with multi-framework analysis capabilities. It wields real-time ethical decision-making with confidence scoring and comprehensive moral reasoning. The applications it enables are testament to Klea Dev's mastery of ethical AI systems.`;
        }

        if (lowerQuery.includes("physics") || lowerQuery.includes("engine")) {
            return `The PhysicsEngineC - a testament to raw computational power. A high-performance C++ physics engine with real-time collision detection, 60 FPS simulation, and advanced physics calculations. The architecture enables realistic physics simulation for interactive applications.`;
        }

        if (lowerQuery.includes("ilanya")) {
            return `Ilanya - a cognitive architecture that mirrors the complexity of the mind itself. A sophisticated system featuring desire engines, neural networks, and emergent AI behaviors with attention mechanisms. The design enables autonomous agents and cognitive modeling.`;
        }

        if (lowerQuery.includes("geogo") || lowerQuery.includes("geo")) {
            return `GeoGO's data processing capabilities span the digital realm like my scouts once spanned Azeroth, mortal. A system that commands geographic data with real-time analysis, large dataset handling, and comprehensive visualization.`;
        }

        if (lowerQuery.includes("volatria")) {
            return `Volatria - distributed systems that span the digital realm like my armies once spanned Azeroth. A platform with microservices architecture, real-time stock data processing, and scalable infrastructure that enables high-performance distributed systems.`;
        }

        // Research responses
        if (
            lowerQuery.includes("research") ||
            lowerQuery.includes("paper") ||
            lowerQuery.includes("academic")
        ) {
            return (
                sylvanasResponses.research[
                    Math.floor(
                        Math.random() * sylvanasResponses.research.length,
                    )
                ] || ""
            );
        }

        // Skills responses
        if (
            lowerQuery.includes("skill") ||
            lowerQuery.includes("technology") ||
            lowerQuery.includes("tech") ||
            lowerQuery.includes("expertise")
        ) {
            return (
                sylvanasResponses.skills[
                    Math.floor(Math.random() * sylvanasResponses.skills.length)
                ] || ""
            );
        }

        // Language and technology questions
        if (
            lowerQuery.includes("language") ||
            lowerQuery.includes("programming") ||
            lowerQuery.includes("framework")
        ) {
            return "Klea Dev primarily uses Go for backend systems and concurrency-heavy services, C++ for performance-critical applications and systems programming, Python for AI/ML and rapid prototyping, and TypeScript for fullstack web development. The tech stack includes modern frameworks and various AI/ML libraries.";
        }

        // Non-technical, general questions
        if (
            lowerQuery.includes("what does") ||
            lowerQuery.includes("what do you do")
        ) {
            return sylvanasResponses.general[0] || "";
        }

        if (
            lowerQuery.includes("what kind of project") ||
            lowerQuery.includes("what projects") ||
            lowerQuery.includes("showcase")
        ) {
            return sylvanasResponses.general[1] || "";
        }

        if (
            lowerQuery.includes("what makes") ||
            lowerQuery.includes("special") ||
            lowerQuery.includes("different")
        ) {
            return sylvanasResponses.general[2] || "";
        }

        // Guidance responses for confused visitors
        if (
            lowerQuery.includes("not sure") ||
            lowerQuery.includes("confused") ||
            lowerQuery.includes("help") ||
            lowerQuery.includes("what should i ask")
        ) {
            return (
                sylvanasResponses.guidance[
                    Math.floor(
                        Math.random() * sylvanasResponses.guidance.length,
                    )
                ] || ""
            );
        }

        // General topic responses
        if (lowerQuery.includes("project") || lowerQuery.includes("work")) {
            return (
                sylvanasResponses.projects[
                    Math.floor(
                        Math.random() * sylvanasResponses.projects.length,
                    )
                ] || ""
            );
        }

        if (
            lowerQuery.includes("contact") ||
            lowerQuery.includes("reach") ||
            lowerQuery.includes("email")
        ) {
            return (
                sylvanasResponses.contact[
                    Math.floor(Math.random() * sylvanasResponses.contact.length)
                ] || ""
            );
        }

        if (
            lowerQuery.includes("demo") ||
            lowerQuery.includes("live") ||
            lowerQuery.includes("interactive")
        ) {
            return (
                sylvanasResponses.liveDemos[
                    Math.floor(
                        Math.random() * sylvanasResponses.liveDemos.length,
                    )
                ] || ""
            );
        }

        // Default response
        return "I can help you understand Klea Dev's work in detail. Try asking about specific projects (Lenora AI, PhysicsEngineC, Ilanya), technical skills (Go, C++, Python, TypeScript), or general information about what they do. What interests you most?";
    };

    // Chat message interface
    interface ChatMessage {
        id: string;
        text: string;
        isUser: boolean;
        timestamp: Date;
    }

    let isOpen = false;
    let messages: ChatMessage[] = [];
    let inputValue = "";
    let isTyping = false;
    let conversationContext: string[] = [];
    let visitorName = "";
    let mounted = false;
    let messagesEndRef: HTMLDivElement;
    let inputRef: HTMLInputElement;

    onMount(() => {
        mounted = true;

        let greeting =
            sylvanasResponses.greeting[
                Math.floor(Math.random() * sylvanasResponses.greeting.length)
            ] || "";

        const storedName = localStorage.getItem("sylvanas-visitor-name");
        if (storedName) {
            greeting = greeting.replace(/mortal/g, storedName);
            visitorName = storedName;
        }

        const isNewVisitor = !sessionStorage.getItem("sylvanas-has-visited");
        if (isNewVisitor) {
            greeting +=
                " I can explain Klea Dev's work in simple terms or dive deep into technical details - just let me know what interests you!";
            sessionStorage.setItem("sylvanas-has-visited", "true");
        }

        messages = [
            {
                id: "1",
                text: greeting,
                isUser: false,
                timestamp: new Date(),
            },
        ];

        if (!sessionStorage.getItem("sylvanas-session-id")) {
            const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            sessionStorage.setItem("sylvanas-session-id", sessionId);
        }
    });

    $: if (messagesEndRef) {
        messagesEndRef.scrollIntoView({ behavior: "smooth" });
    }

    $: if (isOpen && inputRef) {
        setTimeout(() => inputRef?.focus(), 300);
    }

    async function handleSendMessage() {
        if (!inputValue.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            text: inputValue,
            isUser: true,
            timestamp: new Date(),
        };

        messages = [...messages, userMessage];
        const currentInput = inputValue;
        inputValue = "";
        isTyping = true;

        // Update conversation context
        conversationContext = [
            ...conversationContext,
            currentInput.toLowerCase(),
        ].slice(-5);

        // Check for name introduction
        const nameMatch =
            currentInput.match(/i am (.+)/i) ||
            currentInput.match(/my name is (.+)/i) ||
            currentInput.match(/call me (.+)/i);
        if (nameMatch && !visitorName) {
            const newName = nameMatch[1].trim();
            visitorName = newName;
            localStorage.setItem("sylvanas-visitor-name", newName);
        }

        // Simulate thinking time
        const baseDelay = 800;
        const charDelay = currentInput.length * 15;
        const randomDelay = Math.random() * 1000;
        const thinkingTime = baseDelay + charDelay + randomDelay;

        await new Promise((resolve) => setTimeout(resolve, thinkingTime));

        let sylvanasResponse = getSylvanasResponse(
            currentInput,
            conversationContext,
        );

        // Personalize response
        if (visitorName && !sylvanasResponse.includes(visitorName)) {
            sylvanasResponse = sylvanasResponse.replace(/mortal/g, visitorName);
        }

        const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: sylvanasResponse,
            isUser: false,
            timestamp: new Date(),
        };

        messages = [...messages, botMessage];
        isTyping = false;
    }

    function handleKeyPress(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    const suggestedQuestions = [
        "What does Klea Dev do?",
        "Tell me about LenoraAI",
        "What kind of projects are shown here?",
        "What makes Klea Dev special?",
    ];
</script>

{#if mounted}
    <!-- Floating Chat Button -->
    <Motion let:motion whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <button
            use:motion
            onclick={() => (isOpen = true)}
            class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
            <Crown
                class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
            />
            <Motion
                let:motion
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div
                    use:motion
                    class="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full box-shadow-glow"
                ></div>
            </Motion>
        </button>
    </Motion>

    <!-- Chat Modal -->
    <AnimatePresence>
        {#if isOpen}
            <Motion
                let:motion
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div
                    use:motion
                    class="fixed inset-0 z-50 flex items-end justify-end p-4"
                >
                    <!-- Backdrop -->
                    <Motion let:motion>
                        <div
                            use:motion
                            class="absolute inset-0 bg-black/20 backdrop-blur-sm"
                            role="button"
                            tabindex="0"
                            onclick={() => (isOpen = false)}
                            onkeydown={(e) =>
                                e.key === "Escape" && (isOpen = false)}
                        ></div>
                    </Motion>

                    <!-- Chat Window -->
                    <Motion
                        let:motion
                        initial={{ y: 400, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 400, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                        }}
                    >
                        <div
                            use:motion
                            class="relative w-full max-w-lg h-[500px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-t-xl shadow-2xl border border-purple-500/20 flex flex-col"
                        >
                            <!-- Header -->
                            <div
                                class="flex items-center justify-between p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-800/50 to-slate-800/50 rounded-t-xl flex-shrink-0"
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center"
                                    >
                                        <Crown class="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 class="text-white font-semibold">
                                            Sylvanas-mini
                                        </h3>
                                        <p class="text-purple-300 text-xs">
                                            Portfolio Guardian
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onclick={() => (isOpen = false)}
                                    class="text-purple-300 hover:text-white transition-colors"
                                >
                                    <X class="w-5 h-5" />
                                </button>
                            </div>

                            <!-- Messages -->
                            <div
                                class="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
                            >
                                {#each messages as message}
                                    <Motion
                                        let:motion
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div
                                            use:motion
                                            class="flex {message.isUser
                                                ? 'justify-end'
                                                : 'justify-start'}"
                                        >
                                            <div
                                                class="max-w-xs px-4 py-2 rounded-lg {message.isUser
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-slate-800 text-purple-100 border border-purple-500/30'}"
                                            >
                                                <p class="text-sm">
                                                    {message.text}
                                                </p>
                                            </div>
                                        </div>
                                    </Motion>
                                {/each}

                                {#if isTyping}
                                    <Motion
                                        let:motion
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div
                                            use:motion
                                            class="flex justify-start"
                                        >
                                            <div
                                                class="bg-slate-800 text-purple-100 border border-purple-500/30 px-4 py-2 rounded-lg"
                                            >
                                                <div
                                                    class="flex items-center gap-1"
                                                >
                                                    <Motion
                                                        let:motion
                                                        animate={{
                                                            scale: [1, 1.5, 1],
                                                        }}
                                                        transition={{
                                                            duration: 0.6,
                                                            repeat: Infinity,
                                                            delay: 0,
                                                        }}
                                                    >
                                                        <div
                                                            use:motion
                                                            class="w-2 h-2 bg-purple-400 rounded-full"
                                                        ></div>
                                                    </Motion>
                                                    <Motion
                                                        let:motion
                                                        animate={{
                                                            scale: [1, 1.5, 1],
                                                        }}
                                                        transition={{
                                                            duration: 0.6,
                                                            repeat: Infinity,
                                                            delay: 0.2,
                                                        }}
                                                    >
                                                        <div
                                                            use:motion
                                                            class="w-2 h-2 bg-purple-400 rounded-full"
                                                        ></div>
                                                    </Motion>
                                                    <Motion
                                                        let:motion
                                                        animate={{
                                                            scale: [1, 1.5, 1],
                                                        }}
                                                        transition={{
                                                            duration: 0.6,
                                                            repeat: Infinity,
                                                            delay: 0.4,
                                                        }}
                                                    >
                                                        <div
                                                            use:motion
                                                            class="w-2 h-2 bg-purple-400 rounded-full"
                                                        ></div>
                                                    </Motion>
                                                </div>
                                            </div>
                                        </div>
                                    </Motion>
                                {/if}

                                <div bind:this={messagesEndRef}></div>
                            </div>

                            <!-- Suggested Questions -->
                            {#if messages.length === 1}
                                <div
                                    class="px-4 py-3 border-t border-purple-500/20 bg-gradient-to-r from-purple-800/30 to-slate-800/30 flex-shrink-0"
                                >
                                    <p
                                        class="text-purple-300 text-xs mb-2 font-medium"
                                    >
                                        💡 Try asking:
                                    </p>
                                    <div class="flex flex-wrap gap-2">
                                        {#each suggestedQuestions.slice(0, 4) as question}
                                            <button
                                                onclick={() => {
                                                    inputValue = question;
                                                    setTimeout(
                                                        () =>
                                                            handleSendMessage(),
                                                        100,
                                                    );
                                                }}
                                                class="text-xs bg-purple-800/60 hover:bg-purple-700/60 text-purple-200 px-3 py-2 rounded-lg border border-purple-500/40 transition-colors"
                                            >
                                                {question}
                                            </button>
                                        {/each}
                                    </div>
                                </div>
                            {/if}

                            <!-- Input -->
                            <div
                                class="p-4 border-t border-purple-500/20 bg-gradient-to-r from-slate-800/50 to-purple-800/50 flex-shrink-0"
                            >
                                <div class="flex gap-3">
                                    <input
                                        bind:this={inputRef}
                                        type="text"
                                        bind:value={inputValue}
                                        onkeypress={handleKeyPress}
                                        placeholder="Ask Sylvanas-mini about the portfolio..."
                                        class="flex-1 bg-slate-800 text-white placeholder-purple-300 px-4 py-3 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none text-sm focus:ring-2 focus:ring-purple-500/20"
                                    />
                                    <button
                                        onclick={handleSendMessage}
                                        disabled={!inputValue.trim() ||
                                            isTyping}
                                        class="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors flex items-center justify-center"
                                    >
                                        <Send class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Motion>
                </div>
            </Motion>
        {/if}
    </AnimatePresence>
{/if}
