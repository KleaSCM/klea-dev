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
  Wrench,
  CheckCircle,
  BarChart3,
  Code2,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { type GitHubProject } from "../../services/github";
import { type ProjectDetails } from "../../data/projectDetails";

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
const HeroSection = ({ project, projectDetails }: { project: GitHubProject; projectDetails: ProjectDetails | null }) => {
  const CategoryIcon = categoryIcons[project.category] || Globe;
  
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
            {project.description || project.longDescription}
          </motion.p>

          {/* Key Features */}
          {projectDetails?.keyFeatures && (
            <motion.div className="mb-8" variants={fadeInUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {projectDetails.keyFeatures.map((feature, index) => {
                  // Clean up markdown formatting
                  const cleanFeature = feature
                    .replace(/\*\*(.*?)\*\*:/, '$1:') // Remove bold formatting from title
                    .replace(/\*\*(.*?)\*\*/g, '$1'); // Remove other bold formatting
                  
                  return (
                    <div 
                      key={index}
                      className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg p-4 text-left"
                    >
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {cleanFeature}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

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
const TechSummary = ({ projectDetails }: { projectDetails: ProjectDetails | null }) => {
  if (!projectDetails) return null;

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
            <Wrench className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Technology Stack
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Languages */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectDetails.techStack?.languages?.map((lang, index) => {
                  const cleanLang = lang.replace(/\*\*(.*?)\*\*/g, '$1');
                  return (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {cleanLang}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* Frameworks */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Frameworks</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectDetails.techStack?.frameworks?.map((framework, index) => {
                  const cleanFramework = framework.replace(/\*\*(.*?)\*\*/g, '$1');
                  return (
                    <span key={index} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                      {cleanFramework}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* Databases */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Databases</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectDetails.techStack?.databases?.map((db, index) => {
                  const cleanDb = db.replace(/\*\*(.*?)\*\*/g, '$1');
                  return (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm">
                      {cleanDb}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectDetails.techStack?.tools?.map((tool, index) => {
                  const cleanTool = tool.replace(/\*\*(.*?)\*\*/g, '$1');
                  return (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full text-sm">
                      {cleanTool}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* Platforms */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Platforms</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectDetails.techStack?.platforms?.map((platform, index) => {
                  const cleanPlatform = platform.replace(/\*\*(.*?)\*\*/g, '$1');
                  return (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm">
                      {cleanPlatform}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Problem Statement Component
const ProblemStatement = ({ projectDetails }: { projectDetails: ProjectDetails | null }) => {
  if (!projectDetails?.problem) return null;

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
            <Target className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Problem Statement
            </h2>
          </motion.div>

          <motion.div className="max-w-4xl mx-auto" variants={fadeInUp}>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
                The Challenge
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {projectDetails.problem.statement}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Challenges */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-semibold">Challenges</h3>
                </div>
                <ul className="space-y-2">
                  {projectDetails.problem.challenges?.map((challenge, index) => {
                    const cleanChallenge = challenge.replace(/\*\*(.*?)\*\*:/, '$1:').replace(/\*\*(.*?)\*\*/g, '$1');
                    return (
                      <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        {cleanChallenge}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>

              {/* Goals */}
              <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold">Goals</h3>
                </div>
                <ul className="space-y-2">
                  {projectDetails.problem.goals?.map((goal, index) => {
                    const cleanGoal = goal.replace(/\*\*(.*?)\*\*:/, '$1:').replace(/\*\*(.*?)\*\*/g, '$1');
                    return (
                      <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        {cleanGoal}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Architecture Component
const ArchitectureGraph = ({ projectDetails }: { projectDetails: ProjectDetails | null }) => {
  if (!projectDetails?.architecture) return null;

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
            <Network className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Architecture
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
                System Overview
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {projectDetails.architecture.overview}
              </p>

              {/* Components */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">Components</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {projectDetails.architecture.components?.map((component, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{component}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patterns */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">Design Patterns</h4>
                <div className="flex flex-wrap gap-2">
                  {projectDetails.architecture.patterns?.map((pattern, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Performance Stats Component
const PerformanceStats = ({ project, projectDetails }: { project: GitHubProject; projectDetails: ProjectDetails | null }) => {
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
            <BarChart3 className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Performance & Statistics
            </h2>
          </motion.div>

          {/* Project Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-2xl font-bold text-primary mb-2">{project.complexity}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Complexity Level
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-2xl font-bold text-primary mb-2">{project.category}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Category
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-2xl font-bold text-primary mb-2">{project.technologies.length}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Technologies
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-2xl font-bold text-primary mb-2">{project.featured ? 'Featured' : 'Standard'}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Project Type
              </div>
            </motion.div>
          </div>

          {/* Custom Performance Metrics */}
          {projectDetails?.performance?.metrics && (
            <motion.div variants={fadeInUp} className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Performance Metrics</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projectDetails.performance.metrics.map((metric, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{metric.value}</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {metric.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {metric.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Benchmarks */}
          {projectDetails?.performance?.benchmarks && (
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-6 text-center">Benchmarks</h3>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="grid md:grid-cols-3 gap-6">
                  {projectDetails.performance.benchmarks.map((benchmark, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
                        {benchmark.test}
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {benchmark.result}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {benchmark.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Code Snippets Component
const CodeSnippets = ({ projectDetails }: { projectDetails: ProjectDetails | null }) => {
  if (!projectDetails?.codeSnippets) return null;

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
            <Code2 className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Core Code Snippets
            </h2>
          </motion.div>

          <div className="space-y-8">
            {projectDetails.codeSnippets.map((snippet, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    {snippet.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {snippet.description}
                  </p>
                </div>

                <div className="bg-slate-900 rounded-lg p-4 mb-4 overflow-x-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-mono">
                      {snippet.language}
                    </span>
                    <Code className="w-4 h-4 text-slate-400" />
                  </div>
                  <pre className="text-sm text-slate-200 font-mono leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">Explanation</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {snippet.explanation}
                  </p>
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
const Commentary = ({ projectDetails }: { projectDetails: ProjectDetails | null }) => {
  if (!projectDetails?.commentary) return null;

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
            <MessageSquare className="w-8 h-8 text-primary" />
            <h2 className="heading-responsive font-bold gradient-text">
              Developer Commentary
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Motivation */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
                Why I Built This
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {projectDetails.commentary.motivation}
              </p>
            </motion.div>

            {/* Design Decisions */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
                Key Design Decisions
              </h3>
              <ul className="space-y-2">
                {projectDetails.commentary.designDecisions?.map((decision, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {decision}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Lessons Learned */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
                Lessons Learned
              </h3>
              <ul className="space-y-2">
                {projectDetails.commentary.lessonsLearned?.map((lesson, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    {lesson}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Future Plans */}
            {projectDetails.commentary.futurePlans && (
              <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
                  Future Plans
                </h3>
                <ul className="space-y-2">
                  {projectDetails.commentary.futurePlans?.map((plan, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      {plan}
                  </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Project Page Component
export default function ProjectPageClient({ 
  project, 
  projectDetails 
}: { 
  project: GitHubProject; 
  projectDetails: ProjectDetails | null;
}) {
  return (
    <main className="min-h-screen">
      <HeroSection project={project} projectDetails={projectDetails} />
      <TechSummary projectDetails={projectDetails} />
      <ProblemStatement projectDetails={projectDetails} />
      <ArchitectureGraph projectDetails={projectDetails} />
      <PerformanceStats project={project} projectDetails={projectDetails} />
      <CodeSnippets projectDetails={projectDetails} />
      <Commentary projectDetails={projectDetails} />
    </main>
  );
} 