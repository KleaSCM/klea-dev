"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { 
  ExternalLink, 
  Github, 
  Star,
  Zap,
  Brain,
  Atom,
  Network,
  TestTube,
  Globe
} from "lucide-react";
import { type Project } from "../data/projects";
import { type GitHubProject } from "../services/github";
import TouchGestures from "./TouchGestures";
import { showTooltip, hideTooltip, updateTooltipPosition } from "./GlobalTooltip";

// Union type for both Project and GitHubProject
type ProjectCardProps = Project | GitHubProject;

// Category icons mapping
const categoryIcons = {
  'AI/ML': Brain,
  'Physics': Atom,
  'Systems': Network,
  'Web': Globe,
  'Research': TestTube
};

// Code snippets for different project types
const getCodeSnippets = (project: ProjectCardProps) => {
  const snippets = {
    'lenora-ai': {
      language: 'python',
      code: `# Advanced Ethics State Machine
class EthicsEngine:
    def __init__(self):
        self.frameworks = {
            'utilitarianism': UtilitarianFramework(),
            'deontology': DeontologicalFramework(),
            'virtue': VirtueEthicsFramework()
        }
    
    def analyze_scenario(self, scenario: str) -> EthicsResult:
        results = {}
        for name, framework in self.frameworks.items():
            results[name] = framework.evaluate(scenario)
        
        return self.weighted_decision(results)`
    },
    'physics-engine-c': {
      language: 'cpp',
      code: `// High-Performance Physics Engine
class PhysicsEngine {
private:
    std::vector<RigidBody> bodies;
    CollisionDetector detector;
    
public:
    void update(float deltaTime) {
        // Apply forces and update velocities
        for (auto& body : bodies) {
            body.applyForce(gravity);
            body.update(deltaTime);
        }
        
        // Detect and resolve collisions
        auto collisions = detector.detect(bodies);
        for (auto& collision : collisions) {
            resolveCollision(collision);
        }
    }
};`
    },
    'ilanya-ai': {
      language: 'python',
      code: `# Advanced Cognitive Architecture
class DesireEngine:
    def __init__(self):
        self.desires = []
        self.attention_mechanism = AttentionModule()
    
    def process_desire(self, input_data):
        # Transform input through embedding layer
        embedded = self.embedding_layer(input_data)
        
        # Apply attention mechanism
        attended = self.attention_mechanism(embedded)
        
        # Generate desire vector
        desire_vector = self.desire_generator(attended)
        
        return self.normalize_desire(desire_vector)`
    },
    'geogo': {
      language: 'go',
      code: `// Geographic Data Processing
type GeoProcessor struct {
    db     *sql.DB
    cache  *redis.Client
}

func (gp *GeoProcessor) ProcessDataset(dataset Dataset) error {
    // Validate geographic data
    if err := gp.validateCoordinates(dataset); err != nil {
        return err
    }
    
    // Process and geocode
    processed := gp.geocode(dataset)
    
    // Store in database
    return gp.store(processed)
}`
    },
    'volatria': {
      language: 'go',
      code: `// Distributed Systems Platform
type Microservice struct {
    name    string
    port    int
    handler http.Handler
}

func (ms *Microservice) Start() error {
    // Initialize service discovery
    if err := ms.register(); err != nil {
        return err
    }
    
    // Start health checks
    go ms.healthCheck()
    
    // Start HTTP server
    return http.ListenAndServe(fmt.Sprintf(":%d", ms.port), ms.handler)
}`
    }
  };
  
  return snippets[project.id as keyof typeof snippets] || {
    language: 'typescript',
    code: `// ${project.title}
// Advanced implementation showcasing expertise
export class ${project.title.replace(/[^a-zA-Z]/g, '')} {
    constructor() {
        this.initialize();
    }
    
    private initialize(): void {
        // Sophisticated initialization logic
        console.log('Initializing ${project.title}');
    }
}`
  };
};

// Interactive Project Card Component
const InteractiveProjectCard = ({ project }: { project: ProjectCardProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const CategoryIcon = categoryIcons[project.category as keyof typeof categoryIcons];

  // Default images for different project types
  const getDefaultImage = (project: ProjectCardProps) => {
    const projectId = project.id.toLowerCase();
    
    // Check if we have a specific image for this project
    if (project.image) {
      return project.image;
    }
    
    // Default images based on project name or category
    const defaultImages = {
      'volatria': '/screenshots/volatria-distributed-city.jpg',
      'geogo': '/screenshots/geogo-mountain-data.jpg',
      'vulnscan': '/screenshots/vulnscan-neon-security.jpg',
      'physicsengine': '/screenshots/physics-engine-liquid.jpg',
      'kdemon': '/screenshots/kdemon-cyber-daemon.jpg',
      'lenora-ai': '/screenshots/lenora-ai-ethics-machine.png',
      'ilanya-ai': '/screenshots/ilanya-cognitive-robot.png'
    };
    
    return defaultImages[projectId as keyof typeof defaultImages] || null;
  };

  const projectImage = getDefaultImage(project);

  const handleClick = () => {
    window.location.href = `/projects/${project.id}`;
  };

  return (
    <motion.div
      className="project-card group relative overflow-hidden cursor-pointer"
      onHoverStart={() => {
        setIsHovered(true);
        showTooltip(project as Project, 0, 0);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        hideTooltip();
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      {/* Main card content */}
      <div className="p-6">
        {/* Header with category and featured badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CategoryIcon className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {project.category}
            </span>
          </div>
          {project.featured && (
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          )}
        </div>

        {/* Project image/icon with touch gestures */}
        <TouchGestures enablePinchZoom={true}>
          <div 
            className="w-full h-32 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative"
            style={{
              backgroundImage: projectImage ? `url(${projectImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {projectImage ? (
              // Image overlay with gradient
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            ) : (
              // Fallback icon
              <CategoryIcon className="w-12 h-12 text-indigo-500 opacity-60" />
            )}
                
            {/* Category badge on image */}
            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-lg p-1">
              <CategoryIcon className="w-4 h-4 text-white" />
            </div>
          </div>
        </TouchGestures>

        {/* Project title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        
        {/* Project description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 rounded border border-slate-200 dark:border-slate-700">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* GitHub stats for GitHubProject */}
        {'stars' in project && (
          <div className="flex items-center gap-4 mb-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>{project.forks}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>{project.language}</span>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          
          {project.live && (
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveProjectCard; 