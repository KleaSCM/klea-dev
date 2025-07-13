"use client";

import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  Cpu, 
  Globe, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight,
  ChevronDown,
  Star,
  Zap,
  Shield,
  Layers
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SkillBars from "./components/SkillBars";
import InteractiveResume from "./components/InteractiveResume";
import ContactForm from "./components/ContactForm";
import ResearchCard from "./components/ResearchCard";
import LoadingOverlay from "./components/LoadingOverlay";
import InteractiveProjectCard from "./components/InteractiveProjectCard";
import { getNotebooks, getReports, getFeaturedResearch } from "./data/research";
import { useEffect, useState } from "react";
import { type GitHubProject } from "./services/github";

// Animation variants for smooth, professional animations
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

// Hero Section Component
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Main heading with gradient text */}
          <motion.h1 
            className="heading-responsive font-bold mb-6"
            variants={fadeInUp}
          >
            <span className="gradient-text">Klea Dev</span>
            <br />
            <span className="text-slate-800 dark:text-slate-200">
              AI Systems Engineer & Fullstack Developer
            </span>
          </motion.h1>

          {/* Subtitle with typewriter effect */}
          <motion.p 
            className="text-responsive text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
I build autonomous agents with recursive state, trait-driven desire, and internal memory.
My AI systems are engineered in Python and C++,
grounded in mathematical structure and biological modeling. For fullstack platforms, 
simulation engines, and systems programming, I work across Go, TypeScript, Python,
and C++ always focused on architecture, clarity, and evolution.

          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={fadeInUp}
          >
            <button 
              className="btn-primary flex items-center justify-center gap-2 mobile-touch"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              className="btn-secondary flex items-center justify-center gap-2 mobile-touch"
              onClick={() => window.open('/resume.txt', '_blank')}
            >
              Download Resume
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Tech stack badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-8"
            variants={fadeInUp}
          >
            {["Go", "C++", "Python", "TypeScript", "AI/ML", "Cognitive Systems", "Next.js", "PostgreSQL"].map((tech, index) => (
              <motion.span
                key={tech}
                className="skill-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="w-6 h-6 text-slate-400 hover:text-primary transition-colors" />
          </motion.div>
        </motion.div>
        </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="section">
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
            About Me
          </motion.h2>

                      <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About text */}
            <motion.div variants={fadeInUp}>
              <h3 className="subheading-responsive font-semibold mb-6 text-slate-800 dark:text-slate-200">
                AI Systems Engineer & Fullstack Software Developer
              </h3>
              <div className="space-y-4 text-responsive text-slate-600 dark:text-slate-400">
                <p>
                  I work primarily with <strong className="text-primary">Go</strong>, <strong className="text-primary">C++</strong>, <strong className="text-primary">Python</strong>, and <strong className="text-primary">TypeScript</strong> to build advanced systems from cognitive AI agents to fullstack infrastructure and simulation engines.
                </p>
                <p>
                  My expertise spans <strong className="text-primary">native AI engines, goal and trait-desire models, neural networks, recursive state systems, and internal memory architectures</strong>. I also build <strong className="text-primary">production-grade backend systems, fullstack web apps, and real-time simulation pipelines</strong>.
                </p>
                <p>
                  I specialize in:
                </p>
                <p className="ml-4 space-y-2">
                  <strong className="text-primary">Cognitive modeling and agent design</strong> (Python, C++)<br />
                  <strong className="text-primary">Fullstack deployment</strong> (Next.js, Tailwind, TypeScript, Go)<br />
                  <strong className="text-primary">Simulation and systems engineering</strong> (C++, Python, Go)
                </p>
                
                {/* Tech Stack Highlights */}
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">My Tech Stack Philosophy</h4>
<div className="space-y-2 text-sm">
  <div><strong>Go</strong> – My primary language for backend systems, APIs, CLI tools, and fullstack infrastructure</div>
  <div><strong>C++</strong> – Used for AI architecture, simulation engines, desktop tooling, and systems-level performance</div>
  <div><strong>Python</strong> – Core AI modeling, scripting, and rapid prototyping for neural and cognitive systems</div>
  <div><strong>TypeScript</strong> – Frontend and fullstack apps using Next.js, Vite, and Tailwind</div>
  <div><strong>PostgreSQL, Redis, Docker, Git</strong> – Used across most projects for state, storage, and deployment</div>
  <div><strong>SCSS, HTML, Tailwind CSS</strong> – Interface styling where necessary — clean, responsive, semantic</div>
</div>

                </div>
              </div>
            </motion.div>

            {/* Animated Skill Bars */}
            <motion.div variants={fadeInUp}>
              <SkillBars />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Featured Projects Section
const ProjectsSection = () => {
  const [featuredProjects, setFeaturedProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        console.log('Homepage: Fetching featured projects from GitHub...');
        
        const response = await fetch('/api/featured');
        if (!response.ok) {
          throw new Error(`Failed to fetch featured projects: ${response.status}`);
        }
        
        const featured = await response.json();
        console.log('Homepage: Featured projects fetched:', featured.length);
        setFeaturedProjects(featured);
      } catch (err) {
        console.error('Homepage: Error fetching featured projects:', err);
        setFeaturedProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <section id="projects" className="section bg-slate-50/50 dark:bg-slate-900/50">
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
            Featured Projects
          </motion.h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Loading projects from GitHub...</p>
            </div>
          ) : (
          <div className="mobile-grid">
              {featuredProjects.map((project: GitHubProject, index: number) => (
              <motion.div
                  key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="mobile-touch"
              >
                <InteractiveProjectCard project={project} />
              </motion.div>
            ))}
          </div>
          )}

          {!loading && featuredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">No featured projects found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Research Preview Section Component
const ResearchPreviewSection = () => {
  // Get exactly 1 notebook and 5 reports
  const notebooks = getNotebooks().slice(0, 1);
  const reports = getReports().slice(0, 5);
  const researchEntries = [...notebooks, ...reports];

  return (
    <section id="research" className="section bg-slate-50/50 dark:bg-slate-900/50">
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
            Research & Interactive Work
          </motion.h2>

          <motion.p 
            className="text-responsive text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto text-center"
            variants={fadeInUp}
          >
            Explore my interactive notebooks, research papers, and technical reports. 
            From AI system design to cognitive architecture, discover cutting-edge work in artificial intelligence.
          </motion.p>

          {/* Featured Research Preview */}
          <motion.div variants={fadeInUp} className="mb-12">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-8 text-center">
              🌟 Featured Work
            </h3>
            <div className="mobile-grid">
              {researchEntries.map((entry) => (
                <ResearchCard key={entry.id} entry={entry} />
              ))}
            </div>
          </motion.div>

          {/* View All Research Button */}
          <motion.div 
            className="text-center"
            variants={fadeInUp}
          >
            <Link 
              href="/research"
              className="btn-primary inline-flex items-center gap-2"
            >
              View All Research
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="section">
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
            Let's Build Something Amazing Together
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div variants={fadeInUp}>
              <h3 className="subheading-responsive font-semibold mb-6 text-slate-800 dark:text-slate-200">
                Ready to Start Your Next Project?
              </h3>
              <p className="text-responsive text-slate-600 dark:text-slate-400 mb-8">
                I'm always excited to work on challenging projects and collaborate with amazing teams. 
                Whether you need a full-stack application, AI system, or performance-critical software, 
                I'm here to help bring your vision to life.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-slate-600 dark:text-slate-400">kleascm@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-primary" />
                  <span className="text-slate-600 dark:text-slate-400">github.com/KleaSCM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span className="text-slate-600 dark:text-slate-400">linkedin.com/in/klea-dev</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Page Component
export default function Home() {
  return (
    <>
      <LoadingOverlay />
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <InteractiveResume />
      <ProjectsSection />
      <ResearchPreviewSection />
      <ContactSection />
      <Footer />
    </main>
    </>
  );
}
