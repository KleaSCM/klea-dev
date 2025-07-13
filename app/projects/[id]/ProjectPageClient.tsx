"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Github,
  ExternalLink,
  Code,
  Cpu,
  Database,
  Globe,
  Brain,
  Atom,
  Network,
  TestTube,
  Star,
  Zap,
  Clock,
  TrendingUp,
  Layers,
  FileText,
  Lightbulb,
  Target,
  AlertTriangle,
  BookOpen,
  Rocket,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { type GitHubProject } from "../../services/github";

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
const categoryIcons: Record<string, any> = {
  'AI/ML': Brain,
  'Physics': Atom,
  'Systems': Network,
  'Web': Globe,
  'Research': TestTube
};

// Complexity colors
const complexityColors = {
  'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Intermediate': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Advanced': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Expert': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

// Hero Section Component
const HeroSection = ({ project }: { project: GitHubProject }) => {
  const CategoryIcon = categoryIcons[project.category] || Globe; // Default to Globe if category not found
  
  return (
    <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Back to projects button */}
          <motion.div 
            className="mb-8"
            variants={fadeInUp}
          >
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Project image */}
          {project.image && (
            <motion.div 
              className="mb-8 aspect-video rounded-lg overflow-hidden max-w-4xl mx-auto"
              variants={fadeInUp}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Project title and category */}
          <motion.div className="flex items-center justify-center gap-3 mb-4" variants={fadeInUp}>
            <CategoryIcon className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full">
                Featured
              </span>
            )}
          </motion.div>

          <motion.h1 
            className="heading-responsive font-bold mb-6 gradient-text"
            variants={fadeInUp}
          >
            {project.title}
          </motion.h1>

          <motion.p 
            className="text-responsive text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            {project.longDescription}
          </motion.p>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={fadeInUp}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </motion.div>

          {/* Complexity badge */}
          <motion.div variants={fadeInUp}>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${complexityColors[project.complexity]}`}>
              {project.complexity} Level
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Tech Summary Component
const TechSummary = ({ project }: { project: GitHubProject }) => {
  // For now, we'll skip technical stack since GitHub doesn't provide this detailed info
  return null;
};

// Problem Statement Component
const ProblemStatement = ({ project }: { project: GitHubProject }) => {
  // GitHub doesn't provide problem statements, so we'll skip this for now
  return null;
};

// Architecture Component
const ArchitectureGraph = ({ project }: { project: GitHubProject }) => {
  // GitHub doesn't provide architecture info, so we'll skip this for now
  return null;
};

// Performance Stats Component
const PerformanceStats = ({ project }: { project: GitHubProject }) => {
  // Show GitHub stats instead
  return (
    <section className="section bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container-custom">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="flex items-center gap-3 mb-8" variants={fadeInUp}>
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              GitHub Stats
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-2xl font-bold text-primary mb-2">{project.stars}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Stars
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-2xl font-bold text-primary mb-2">{project.forks}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Forks
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-2xl font-bold text-primary mb-2">{project.language}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Language
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-2xl font-bold text-primary mb-2">{project.topics.length}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Topics
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Code Snippets Component
const CodeSnippets = ({ project }: { project: GitHubProject }) => {
  // GitHub doesn't provide code snippets, so we'll skip this for now
  return null;
};

// Commentary Component
const Commentary = ({ project }: { project: GitHubProject }) => {
  // GitHub doesn't provide commentary, so we'll skip this for now
  return null;
};

// Main Client Component
export default function ProjectPageClient({ project }: { project: GitHubProject }) {
  return (
    <main className="min-h-screen">
      <HeroSection project={project} />
      <TechSummary project={project} />
      <ProblemStatement project={project} />
      <ArchitectureGraph project={project} />
      <PerformanceStats project={project} />
      <CodeSnippets project={project} />
      <Commentary project={project} />
    </main>
  );
} 