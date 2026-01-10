// Research data for Svelte (simplified from TypeScript)
export const researchData = [
    {
        id: 'mathematical-framework-recursive-trait-evolution',
        title: 'Mathematical Framework for Recursive Trait Evolution in Cognitive Systems',
        description: 'Advanced mathematical framework for understanding recursive trait evolution in cognitive architectures',
        type: 'report',
        category: 'Cognitive Systems',
        tags: ['#research', '#mathematical-framework', '#trait-evolution', '#cognitive-systems'],
        url: 'https://osf.io/8e2tb',
        platform: 'OSF',
        date: '2024-01-25',
        featured: true,
        image: '/screenshots/shandris-cognitive-jellyfish.jpg'
    },
    {
        id: 'mathematical-formalization-reframing-kernel',
        title: 'Mathematical Formalization of Reframing Kernel in Synthetic',
        description: 'Sophisticated mathematical formalization of reframing kernel mechanisms in synthetic cognitive systems',
        type: 'report',
        category: 'Cognitive Systems',
        tags: ['#research', '#mathematical-formalization', '#reframing-kernel'],
        url: 'https://osf.io/8e2tb',
        platform: 'OSF',
        date: '2024-01-30',
        featured: true,
        image: '/screenshots/cognitive-field-dew.jpg'
    },
    {
        id: 'recursive-goal-selection-arbitration',
        title: 'Recursive Goal Selection and Arbitration in Cognitive Architectures',
        description: 'Advanced research on recursive goal selection and arbitration mechanisms',
        type: 'report',
        category: 'Cognitive Systems',
        tags: ['#research', '#goal-selection', '#arbitration', '#cognitive-architecture'],
        url: 'https://osf.io/8e2tb',
        platform: 'OSF',
        date: '202-02-01',
        featured: true,
        image: '/screenshots/collision-detection-escape.jpg'
    },
    {
        id: 'system-integration-demo',
        title: 'System Integration Demo - Desire & Trait Engine Integration',
        description: 'Interactive Jupyter notebook demonstrating the integration of Desire Engine and Trait Engine systems',
        type: 'notebook',
        category: 'AI Systems',
        tags: ['#AI', '#cognitive-architecture', '#desire-engine', '#trait-engine'],
        url: 'https://www.kaggle.com/kleascm/system-integration-demo',
        platform: 'Kaggle',
        date: '2024-01-18',
        featured: true,
        image: '/screenshots/ilanya-cognitive-robot.png'
    }
];

export const getFeaturedResearch = () => researchData.filter(r => r.featured);
