"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Star,
  BookOpen,
  FileText,
  ExternalLink,
  Download,
  Code,
  Database,
  Cpu,
  Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ResearchCard from "../components/ResearchCard";
import { getNotebooks, getReports, getFeaturedResearch } from "../data/research";

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

// Hero Section for Research Page
const ResearchHero = () => {
  return (
    <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Animated background elements */}
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
          {/* Back to home button */}
          <motion.div 
            className="mb-8"
            variants={fadeInUp}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            className="heading-responsive font-bold mb-6"
            variants={fadeInUp}
          >
            <span className="gradient-text">Research & Interactive Work</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-responsive text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Explore my interactive notebooks, research papers, and technical reports. 
            From AI system design to cognitive architecture, discover the cutting-edge work 
            that pushes the boundaries of artificial intelligence and software engineering.
          </motion.p>

          {/* Research categories */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={fadeInUp}
          >
            {[
              { icon: Star, label: "Featured Work", count: getFeaturedResearch().length },
              { icon: BookOpen, label: "Notebooks", count: getNotebooks().length },
              { icon: FileText, label: "Reports", count: getReports().length }
            ].map((category, index) => (
              <motion.div
                key={category.label}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <category.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {category.label}
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Featured Research Section
const FeaturedResearchSection = () => {
  const featuredResearch = getFeaturedResearch();

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
            <Star className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              🌟 Featured Research
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-slate-600 dark:text-slate-400 mb-12 max-w-3xl"
            variants={fadeInUp}
          >
            My most impactful and innovative research work, showcasing cutting-edge AI systems, 
            cognitive architectures, and breakthrough discoveries in artificial intelligence.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredResearch.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ResearchCard entry={entry} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Notebooks Section
const NotebooksSection = () => {
  const notebooks = getNotebooks();

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
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              📓 Interactive Notebooks & Live Demos
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-slate-600 dark:text-slate-400 mb-12 max-w-3xl"
            variants={fadeInUp}
          >
            Explore interactive Jupyter notebooks, real-time simulations, AI prototypes, and analysis demos. 
            These live, experimental works showcase cutting-edge AI research and development in action.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notebooks.map((notebook, index) => (
              <motion.div
                key={notebook.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ResearchCard entry={notebook} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Reports Section
const ReportsSection = () => {
  const reports = getReports();

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
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              📄 Research & Technical Reports
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-slate-600 dark:text-slate-400 mb-12 max-w-3xl"
            variants={fadeInUp}
          >
            Formal research papers, technical documentation, and architecture write-ups. 
            Access peer-reviewed work with proper citations, DOI links, and comprehensive analysis.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ResearchCard entry={report} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Research Stats Section
const ResearchStats = () => {
  const notebooks = getNotebooks();
  const reports = getReports();
  const featuredResearch = getFeaturedResearch();

  const stats = [
    { label: "Total Publications", value: notebooks.length + reports.length + featuredResearch.length },
    { label: "Interactive Notebooks", value: notebooks.length },
    { label: "Research Reports", value: reports.length },
    { label: "Featured Work", value: featuredResearch.length }
  ];

  return (
    <section className="section bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container-custom">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-2xl font-bold text-center mb-12 text-slate-800 dark:text-slate-200"
            variants={fadeInUp}
          >
            Research Overview
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Research Page Component
export default function ResearchPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ResearchHero />
      <FeaturedResearchSection />
      <NotebooksSection />
      <ReportsSection />
      <ResearchStats />
      <Footer />
    </main>
  );
} 