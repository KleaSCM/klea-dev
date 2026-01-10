// Simplified projects data for Svelte (converted from TypeScript)
export const projects = [
    {
        id: 'lenora-ai',
        title: 'LenoraAI - Advanced Ethics State Machine',
        description: 'Sophisticated AI system combining mathematical ethical reasoning with LLM integration to solve complex ethical dilemmas.',
        technologies: ['Python', 'OpenAI API', 'OpenHermes', 'Ollama', 'Mathematical Modeling'],
        github: 'https://github.com/KleaSCM/lenora-ai',
        featured: true,
        category: 'AI/ML',
        highlights: [
            'Multi-framework ethical analysis across 5 major theories',
            'Advanced mathematical modeling with weighted scoring',
            'Agent-based modeling with individual attributes',
            'LLM integration with OpenHermes and API support'
        ]
    },
    {
        id: 'ilanya-ai',
        title: 'Ilanya - Advanced AI Cognitive Architecture',
        description: 'Complex AI system featuring desire engines, trait engines, and emergent behavior modeling with neural network integration.',
        technologies: ['Python', 'Neural Networks', 'Transformers', 'Embeddings', 'Attention Mechanisms'],
        github: 'https://github.com/KleaSCM/ilanya-ai',
        featured: true,
        category: 'AI/ML',
        highlights: [
            'Modular architecture with independent engines',
            'Transformer-based neural network integration',
            'Emergent behavior modeling',
            'Comprehensive testing and logging'
        ]
    },
    {
        id: 'physics-engine-c',
        title: 'PhysicsEngineC - High-Performance C++ Physics Engine',
        description: 'Modular physics engine built from the ground up with real-time simulation, collision detection, and rigid body dynamics.',
        technologies: ['C++17', 'CMake', 'OpenGL', 'WebGL', 'Mathematics'],
        github: 'https://github.com/KleaSCM/physics-engine-c',
        live: 'https://physics-engine-c.vercel.app',
        featured: true,
        category: 'Physics',
        highlights: [
            'Comprehensive collision detection system',
            'Rigid body dynamics with quaternion rotation',
            'Broad phase optimization with spatial hashing',
            'Web-based visualization interface'
        ]
    },
    {
        id: 'volatria',
        title: 'Volatria - Distributed Systems Platform',
        description: 'Modern distributed systems platform with microservices architecture and containerized deployment.',
        technologies: ['Go', 'Docker', 'Microservices', 'React', 'TypeScript'],
        github: 'https://github.com/KleaSCM/volatria',
        featured: true,
        category: 'Systems',
        highlights: [
            'Microservices architecture',
            'Containerized deployment',
            'Scalable backend services',
            'Modern dashboard interface'
        ]
    },
    {
        id: 'geogo',
        title: 'GeoGO - Geographic Data Processing Platform',
        description: 'Full-stack platform for processing and visualizing geographic datasets with advanced data analysis capabilities.',
        technologies: ['Go', 'Next.js', 'TypeScript', 'PostgreSQL', 'Geographic Data'],
        github: 'https://github.com/KleaSCM/GeoGO',
        live: 'https://geogo.vercel.app',
        featured: true,
        category: 'Systems',
        highlights: [
            'Full-stack geographic data processing',
            'Advanced geocoding and data analysis',
            'Interactive data visualization',
            'Scalable backend architecture'
        ]
    },
    {
        id: 'artscape',
        title: 'ArtScape - Digital Art Marketplace Platform',
        description: 'Full-stack digital art marketplace with artist profiles, artwork management, and secure payment processing.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Go', 'PostgreSQL'],
        github: 'https://github.com/KleaSCM/artscape',
        live: 'https://artscape.vercel.app',
        featured: true,
        category: 'Web',
        highlights: [
            'Full-stack digital art marketplace',
            'Artist profile management',
            'Secure payment processing',
            'Modern responsive design'
        ]
    }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
