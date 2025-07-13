"use client";

import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  Cpu, 
  Globe, 
  Github, 
  ExternalLink,
  ArrowRight,
  Star,
  Zap,
  Brain,
  Atom,
  Network,
  TestTube,
  Layers
} from "lucide-react";
import { useEffect, useState } from "react";
import { type GitHubProject } from "../services/github";
import InteractiveProjectCard from "../components/InteractiveProjectCard";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Category icons mapping
const categoryIcons = {
  'AI/ML': Brain,
  'Physics': Atom,
  'Systems': Network,
  'Web': Globe,
  'Research': TestTube
};

// Complexity badges
const complexityColors = {
  'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Intermediate': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Advanced': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Expert': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

// Use the interactive project card component
const ProjectCard = ({ project }: { project: GitHubProject }) => {
  return <InteractiveProjectCard project={project} />;
};

// Projects Page Component
export default function ProjectsPage() {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        console.log('Fetching projects from GitHub...');
        
        // Fetch all projects from GitHub
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('GitHub projects fetched:', data);
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Group projects by category
  const aiProjects = projects.filter(p => p.category === 'AI/ML');
  const physicsProjects = projects.filter(p => p.category === 'Physics');
  const systemsProjects = projects.filter(p => p.category === 'Systems');
  const researchProjects = projects.filter(p => p.category === 'Research');
  const webProjects = projects.filter(p => p.category === 'Web');

  // Group projects by category for display

  if (loading) {
    return (
      <main className="min-h-screen pt-20">
        <div className="container-custom">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading projects from GitHub...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen pt-20">
        <div className="container-custom">
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <Code className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-xl font-bold mb-2">Error Loading Projects</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container-custom">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1 
              className="heading-responsive font-bold mb-6 gradient-text"
              variants={fadeInUp}
            >
              My Projects
            </motion.h1>
            
            <motion.p 
              className="text-responsive text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              A collection of advanced AI systems, physics engines, and research projects 
              showcasing expertise in cutting-edge technologies and complex problem-solving.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              variants={fadeInUp}
            >
              {aiProjects.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                  <Brain className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium">{aiProjects.length} AI/ML Projects</span>
                </div>
              )}
              {physicsProjects.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                  <Atom className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-medium">{physicsProjects.length} Physics Projects</span>
                </div>
              )}
              {systemsProjects.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                  <Network className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{systemsProjects.length} Systems Projects</span>
                </div>
              )}
              {researchProjects.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                  <TestTube className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">{researchProjects.length} Research Projects</span>
                </div>
              )}
              {webProjects.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                  <Globe className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{webProjects.length} Web Projects</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI/ML Projects */}
      {aiProjects.length > 0 && (
      <section className="section bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center gap-3 mb-12" variants={fadeInUp}>
              <Brain className="w-8 h-8 text-indigo-500" />
              <h2 className="heading-responsive font-bold gradient-text">
                AI & Machine Learning
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Physics Projects */}
      {physicsProjects.length > 0 && (
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center gap-3 mb-12" variants={fadeInUp}>
              <Atom className="w-8 h-8 text-pink-500" />
              <h2 className="heading-responsive font-bold gradient-text">
                Physics & Simulation
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {physicsProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Systems Projects */}
      {systemsProjects.length > 0 && (
      <section className="section bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center gap-3 mb-12" variants={fadeInUp}>
              <Network className="w-8 h-8 text-yellow-500" />
              <h2 className="heading-responsive font-bold gradient-text">
                Systems & Architecture
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {systemsProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Research Projects */}
      {researchProjects.length > 0 && (
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center gap-3 mb-12" variants={fadeInUp}>
              <TestTube className="w-8 h-8 text-purple-500" />
              <h2 className="heading-responsive font-bold gradient-text">
                Research & Development
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Web Projects */}
      {webProjects.length > 0 && (
      <section className="section bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center gap-3 mb-12" variants={fadeInUp}>
              <Globe className="w-8 h-8 text-green-500" />
              <h2 className="heading-responsive font-bold gradient-text">
                  Web & Frontend
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* No Projects Found */}
      {projects.length === 0 && !loading && !error && (
        <section className="section">
        <div className="container-custom">
            <div className="text-center py-20">
              <div className="text-slate-400 mb-4">
                <Github className="w-12 h-12 mx-auto" />
              </div>
              <h2 className="text-xl font-bold mb-2">No Projects Found</h2>
              <p className="text-slate-600 dark:text-slate-400">
                No projects were found in your GitHub repositories.
              </p>
            </div>
        </div>
      </section>
      )}
    </main>
  );
} 