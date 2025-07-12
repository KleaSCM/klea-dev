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
import { projects, getFeaturedProjects, getProjectsByCategory, type Project } from "../data/projects";
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
const ProjectCard = ({ project }: { project: Project }) => {
  return <InteractiveProjectCard project={project} />;
};

// Projects Page Component
export default function ProjectsPage() {
  const aiProjects = getProjectsByCategory('AI/ML');
  const physicsProjects = getProjectsByCategory('Physics');
  const systemsProjects = getProjectsByCategory('Systems');
  const researchProjects = getProjectsByCategory('Research');
  const webProjects = getProjectsByCategory('Web');

  // Debug: Log the actual counts
  console.log('AI/ML Projects:', aiProjects.length);
  console.log('Physics Projects:', physicsProjects.length);
  console.log('Systems Projects:', systemsProjects.length);
  console.log('Research Projects:', researchProjects.length);
  console.log('Web Projects:', webProjects.length);

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

      {/* Physics Projects */}
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

      {/* Systems Projects */}
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

      {/* Research Projects */}
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

      {/* Web Projects */}
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
                Web Development
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

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 
              className="heading-responsive font-bold mb-6 gradient-text"
              variants={fadeInUp}
            >
              Ready to Build Something Amazing?
            </motion.h2>
            
            <motion.p 
              className="text-responsive text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              I'm always excited to work on challenging projects and collaborate with amazing teams. 
              Whether you need AI systems, physics engines, or complex architectures, I'm here to help.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <a 
                href="/#contact" 
                className="btn-primary inline-flex items-center gap-2"
              >
                Let's Collaborate
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 