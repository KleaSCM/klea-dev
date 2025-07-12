"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Code, 
  ExternalLink, 
  Github, 
  Play, 
  Eye, 
  FileCode,
  Star,
  Zap,
  Brain,
  Atom,
  Network,
  TestTube,
  Globe
} from "lucide-react";
import { type Project } from "../data/projects";

// Category icons mapping
const categoryIcons = {
  'AI/ML': Brain,
  'Physics': Atom,
  'Systems': Network,
  'Web': Globe,
  'Research': TestTube
};

// Code snippets for different project types
const getCodeSnippets = (project: Project) => {
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
const InteractiveProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  
  const CategoryIcon = categoryIcons[project.category];
  const codeSnippet = getCodeSnippets(project);

  return (
    <motion.div
      className="project-card group relative overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
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

        {/* Project image/icon */}
        <div className="aspect-video bg-gradient-to-br from-indigo-500/20 via-pink-500/20 to-yellow-500/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
          {project.image ? (
            <div className="w-full h-full relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Overlay with category icon */}
              <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                <CategoryIcon className="w-4 h-4 text-white" />
              </div>
            </div>
          ) : (
            <>
              <CategoryIcon className="w-12 h-12 text-indigo-500 z-10" />
              
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-pink-500/10"
                animate={{
                  background: isHovered 
                    ? "linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))"
                    : "linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))"
                }}
                transition={{ duration: 0.3 }}
              />
            </>
          )}
        </div>

        {/* Project title and description */}
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
          {project.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technology badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="skill-badge text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="skill-badge text-xs">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <FileCode className="w-4 h-4" />
            Code
          </button>
          
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
          >
            <Play className="w-4 h-4" />
            Demo
          </button>
        </div>

        {/* External links */}
        <div className="flex gap-2">
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.live && (
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Code snippet overlay */}
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">Code Snippet</h4>
              <button
                onClick={() => setShowCode(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-slate-300">
                <code>{codeSnippet.code}</code>
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo overlay */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">Live Demo</h4>
              <button
                onClick={() => setShowDemo(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 h-64 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <Play className="w-12 h-12 mx-auto mb-4" />
                <p>Interactive demo coming soon!</p>
                <p className="text-sm mt-2">This will show a live preview of the project</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover overlay with quick actions */}
      <AnimatePresence>
        {isHovered && !showCode && !showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6"
          >
            <div className="flex gap-2">
              <button
                onClick={() => setShowCode(true)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowDemo(true)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveProjectCard; 