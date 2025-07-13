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
import { type Project } from "../../data/projects";

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

// Complexity colors
const complexityColors = {
  'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Intermediate': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Advanced': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Expert': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

// Hero Section Component
const HeroSection = ({ project }: { project: Project }) => {
  const CategoryIcon = categoryIcons[project.category];
  
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
const TechSummary = ({ project }: { project: Project }) => {
  if (!project.technicalStack) return null;

  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="heading-responsive font-bold text-center mb-16 gradient-text"
            variants={fadeInUp}
          >
            Technical Stack
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.technicalStack.languages && (
              <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Languages</h3>
                </div>
                <div className="space-y-2">
                  {project.technicalStack.languages.map((lang) => (
                    <span key={lang} className="block text-sm text-slate-600 dark:text-slate-400">
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {project.technicalStack.frameworks && (
              <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Frameworks</h3>
                </div>
                <div className="space-y-2">
                  {project.technicalStack.frameworks.map((framework) => (
                    <span key={framework} className="block text-sm text-slate-600 dark:text-slate-400">
                      {framework}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {project.technicalStack.tools && (
              <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Tools</h3>
                </div>
                <div className="space-y-2">
                  {project.technicalStack.tools.map((tool) => (
                    <span key={tool} className="block text-sm text-slate-600 dark:text-slate-400">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {project.technicalStack.databases && (
              <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Databases</h3>
                </div>
                <div className="space-y-2">
                  {project.technicalStack.databases.map((db) => (
                    <span key={db} className="block text-sm text-slate-600 dark:text-slate-400">
                      {db}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Problem Statement Component
const ProblemStatement = ({ project }: { project: Project }) => {
  if (!project.problemStatement) return null;

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
            <Target className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Problem Statement
            </h2>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700"
            variants={fadeInUp}
          >
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Architecture Component
const ArchitectureGraph = ({ project }: { project: Project }) => {
  if (!project.architecture) return null;

  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="flex items-center gap-3 mb-8" variants={fadeInUp}>
            <Layers className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Architecture Overview
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
                System Design
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {project.architecture.overview}
              </p>
              
              <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
                Key Components
              </h4>
              <ul className="space-y-2">
                {project.architecture.components.map((component, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-400">{component}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {project.architecture.diagram && (
              <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <img 
                  src={project.architecture.diagram} 
                  alt="Architecture Diagram"
                  className="w-full h-auto"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Performance Stats Component
const PerformanceStats = ({ project }: { project: Project }) => {
  if (!project.performanceStats) return null;

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
              Performance Metrics
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {project.performanceStats.metrics.map((metric, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
              >
                <div className="text-2xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {metric.label}
                </div>
                {metric.description && (
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {metric.description}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {project.performanceStats.benchmarks && (
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-6 text-center text-slate-800 dark:text-slate-200">
                Benchmark Results
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {project.performanceStats.benchmarks.map((benchmark, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
                  >
                    <div className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {benchmark.test}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {benchmark.result}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {benchmark.unit}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Code Snippets Component
const CodeSnippets = ({ project }: { project: Project }) => {
  if (!project.codeSnippets) return null;

  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="flex items-center gap-3 mb-8" variants={fadeInUp}>
            <Code className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Core Code Snippets
            </h2>
          </motion.div>

          <div className="space-y-8">
            {project.codeSnippets.map((snippet, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    {snippet.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {snippet.description}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="bg-slate-900 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400 font-mono">
                        {snippet.language}
                      </span>
                      <Code className="w-4 h-4 text-slate-400" />
                    </div>
                    <pre className="text-sm text-slate-200 font-mono leading-relaxed overflow-x-auto">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      Explanation
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {snippet.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Commentary Component
const Commentary = ({ project }: { project: Project }) => {
  if (!project.commentary) return null;

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
            <Lightbulb className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Development Commentary
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Design Decisions
              </h3>
              <ul className="space-y-2">
                {project.commentary.designDecisions.map((decision, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-400">{decision}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Challenges Faced
              </h3>
              <ul className="space-y-2">
                {project.commentary.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-400">{challenge}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Key Learnings
              </h3>
              <ul className="space-y-2">
                {project.commentary.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-400">{learning}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Future Improvements
              </h3>
              <ul className="space-y-2">
                {project.commentary.futureImprovements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-600 dark:text-slate-400">{improvement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Client Component
export default function ProjectPageClient({ project }: { project: Project }) {
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