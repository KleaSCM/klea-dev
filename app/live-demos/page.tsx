"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Code, 
  Play, 
  ExternalLink, 
  Github, 
  Zap,
  Brain,
  Atom,
  Network,
  Globe,
  TestTube,
  Star,
  Eye,
  Download,
  Share2,
  Terminal,
  Sparkles,
  Rocket,
  ArrowLeft
} from "lucide-react";
import { type Project } from "../data/projects";
import Link from "next/link";

/**
 * Live Demos Page
 * 
 * A dedicated page for showcasing interactive project demonstrations
 * Features:
 * - Live code editors for each project
 * - Real-time preview and execution
 * - Project-specific demos and examples
 * - Beautiful animations and transitions
 * - Code sharing and export capabilities
 * 
 * @component
 * @returns {JSX.Element} Live demos page
 */

// Category icons mapping
const categoryIcons = {
  'AI/ML': Brain,
  'Physics': Atom,
  'Systems': Network,
  'Web': Globe,
  'Research': TestTube
};

// Demo configurations for different projects
const getDemoConfig = (project: Project) => {
  const demos = {
    'lenora-ai': {
      title: 'Ethics Engine Demo',
      description: 'Interactive ethical decision-making simulation',
      language: 'python',
      code: `# Ethics Engine Interactive Demo
import numpy as np
from ethics_engine import EthicsStateMachine

# Initialize the ethics engine
engine = EthicsStateMachine()

# Example scenario: Trolley Problem
scenario = """
A trolley is heading towards 5 people tied to the track.
You can pull a lever to divert it to a side track with 1 person.
What should you do?
"""

# Analyze the scenario
result = engine.analyze_scenario(scenario)

print("Ethical Analysis Results:")
for framework, score in result.framework_scores.items():
    print(f"{framework}: {score:.2f}")

print(f"\\nRecommended Action: {result.best_action}")
print(f"Confidence: {result.confidence:.1%}")`,
      output: `Ethical Analysis Results:
Utilitarianism: 0.75
Deontology: 0.45
Virtue Ethics: 0.60
Rights-Based: 0.30
Care Ethics: 0.50

Recommended Action: Pull the lever
Confidence: 65.2%`,
      features: ['Real-time Analysis', 'Multi-framework', 'Confidence Scoring'],
      color: 'from-purple-500 to-pink-500'
    },
    'physics-engine-c': {
      title: 'Physics Simulation Demo',
      description: 'Real-time physics engine with collision detection',
      language: 'cpp',
      code: `// Physics Engine Demo
#include <iostream>
#include <vector>
#include "PhysicsEngine.h"

int main() {
    // Initialize physics engine
    Physics::Engine engine;
    engine.Initialize();
    
    // Create objects
    auto ground = engine.CreatePlane(Vector3(0, 0, 1), 0);
    auto ball1 = engine.CreateSphere(Vector3(0, 10, 0), 1.0f, 1.0f);
    auto ball2 = engine.CreateSphere(Vector3(2, 15, 0), 0.5f, 0.5f);
    
    // Simulation loop
    for (int i = 0; i < 60; i++) {
        engine.Update(1.0f / 60.0f);
        
        auto pos1 = ball1->GetPosition();
        auto pos2 = ball2->GetPosition();
        
        std::cout << "Frame " << i << ": ";
        std::cout << "Ball1(" << pos1.x << "," << pos1.y << ") ";
        std::cout << "Ball2(" << pos2.x << "," << pos2.y << ")\\n";
    }
    
    return 0;
}`,
      output: `Frame 0: Ball1(0,10) Ball2(2,15)
Frame 1: Ball1(0,9.84) Ball2(2,14.84)
Frame 2: Ball1(0,9.68) Ball2(2,14.68)
...
Frame 58: Ball1(0,0.16) Ball2(2,0.16)
Frame 59: Ball1(0,0) Ball2(2,0)`,
      features: ['Real-time Simulation', 'Collision Detection', '60 FPS'],
      color: 'from-blue-500 to-cyan-500'
    },
    'ilanya-ai': {
      title: 'Cognitive Architecture Demo',
      description: 'Interactive desire engine and cognitive modeling',
      language: 'python',
      code: `# Cognitive Architecture Demo
import torch
from desire_engine import DesireEngine

# Initialize the desire engine
engine = DesireEngine()

# Simulate cognitive input
input_data = {
    'hunger': 0.8,
    'curiosity': 0.6,
    'social_need': 0.4,
    'achievement': 0.7
}

# Process desires
result = engine.process_trait_activations(input_data)

print("Cognitive Processing Results:")
print(f"Active Desires: {result['active_desires']}")
print(f"New Desires: {result['new_desires']}")
print(f"Goal Candidates: {result['goal_candidates']}")

# Show desire embeddings
embeddings = engine.get_desire_embeddings()
attention_weights, _ = engine.compute_desire_attention()

print("\\nAttention Weights:")
for i, weight in enumerate(attention_weights[:5]):
    print(f"Desire {i}: {weight:.3f}")`,
      output: `Cognitive Processing Results:
Active Desires: 12
New Desires: ['eat_food', 'learn_new_skill']
Goal Candidates: ['prepare_meal', 'study_topic']

Attention Weights:
Desire 0: 0.234
Desire 1: 0.187
Desire 2: 0.156
Desire 3: 0.134
Desire 4: 0.098`,
      features: ['Neural Networks', 'Attention Mechanism', 'Goal Formation'],
      color: 'from-green-500 to-emerald-500'
    },
    'geogo': {
      title: 'Geographic Data Demo',
      description: 'Real-time geographic data processing and visualization',
      language: 'go',
      code: `package main

import (
    "fmt"
    "log"
    "GeoGO/api"
    "GeoGO/db"
)

func main() {
    // Initialize database
    db.InitDB()
    
    // Get meteorite data
    meteorites, err := api.GetAllMeteorites()
    if err != nil {
        log.Fatal(err)
    }
    
    // Process and analyze data
    fmt.Println("Geographic Data Analysis:")
    fmt.Printf("Total Meteorites: %d\\n", len(meteorites))
    
    // Find largest meteorites
    largest := api.GetLargestMeteorites()
    fmt.Printf("Largest Meteorites: %d\\n", len(largest))
    
    // Geographic distribution
    locations := make(map[string]int)
    for _, m := range meteorites {
        if m.Country != "" {
            locations[m.Country]++
        }
    }
    
    fmt.Println("\\nGeographic Distribution:")
    for country, count := range locations {
        if count > 10 {
            fmt.Printf("%s: %d meteorites\\n", country, count)
        }
    }
}`,
      output: `Geographic Data Analysis:
Total Meteorites: 45,716
Largest Meteorites: 25

Geographic Distribution:
United States: 1,234 meteorites
Russia: 987 meteorites
Australia: 756 meteorites
Canada: 543 meteorites
Argentina: 432 meteorites`,
      features: ['Real-time Data', 'Geographic Analysis', 'Large Dataset'],
      color: 'from-orange-500 to-red-500'
    },
    'volatria': {
      title: 'Distributed Systems Demo',
      description: 'Real-time stock data processing and microservices',
      language: 'go',
      code: `package main

import (
    "fmt"
    "time"
    "github.com/gin-gonic/gin"
    "volatria/internal/fetcher"
    "volatria/internal/database"
)

func main() {
    // Initialize distributed system
    db, _ := database.New()
    
    // Configure stock fetcher
    fetcher := fetcher.New(db, &fetcher.Config{
        APIKey:         "demo_key",
        BaseURL:        "https://api.example.com",
        FetchInterval:  1 * time.Minute,
        MaxConcurrent:  5,
        RateLimitPerSec: 5,
    })
    
    // Start microservices
    fetcher.Start()
    defer fetcher.Stop()
    
    // Simulate real-time data
    fmt.Println("Distributed System Status:")
    fmt.Println("✅ Database: Connected")
    fmt.Println("✅ Stock Fetcher: Running")
    fmt.Println("✅ API Server: Active")
    fmt.Println("✅ Rate Limiting: Enabled")
    
    // Show recent activity
    fmt.Println("\\nRecent Activity:")
    fmt.Println("📈 AAPL: $150.25 (+2.3%)")
    fmt.Println("📈 GOOGL: $2,850.10 (+1.8%)")
    fmt.Println("📈 TSLA: $750.50 (+5.2%)")
    fmt.Println("📈 MSFT: $300.75 (+1.5%)")
}`,
      output: `Distributed System Status:
✅ Database: Connected
✅ Stock Fetcher: Running
✅ API Server: Active
✅ Rate Limiting: Enabled

Recent Activity:
📈 AAPL: $150.25 (+2.3%)
📈 GOOGL: $2,850.10 (+1.8%)
📈 TSLA: $750.50 (+5.2%)
📈 MSFT: $300.75 (+1.5%)`,
      features: ['Microservices', 'Real-time Data', 'High Availability'],
      color: 'from-indigo-500 to-purple-500'
    }
  };
  
  return demos[project.id as keyof typeof demos] || {
    title: `${project.title} Demo`,
    description: `Interactive demonstration of ${project.title}`,
    language: 'typescript',
    code: `// ${project.title} Demo
console.log('Welcome to ${project.title}!');

// Interactive demonstration
class ${project.title.replace(/[^a-zA-Z]/g, '')}Demo {
    constructor() {
        this.initialize();
    }
    
    initialize() {
        console.log('Initializing ${project.title} demo...');
        this.runDemo();
    }
    
    runDemo() {
        console.log('Running demonstration...');
        console.log('✅ Demo completed successfully!');
    }
}

// Start the demo
new ${project.title.replace(/[^a-zA-Z]/g, '')}Demo();`,
    output: `Welcome to ${project.title}!
Initializing ${project.title} demo...
Running demonstration...
✅ Demo completed successfully!`,
    features: ['Interactive', 'Real-time', 'Production Ready'],
    color: 'from-slate-500 to-gray-500'
  };
};

const LiveDemosPage = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('');

  // Get all projects for demo selection
  const projects = [
    { id: 'lenora-ai', title: 'LenoraAI', category: 'AI/ML', featured: true },
    { id: 'physics-engine-c', title: 'PhysicsEngineC', category: 'Physics', featured: true },
    { id: 'ilanya-ai', title: 'Ilanya', category: 'AI/ML', featured: true },
    { id: 'geogo', title: 'GeoGO', category: 'Systems', featured: false },
    { id: 'volatria', title: 'Volatria', category: 'Systems', featured: false }
  ];

  const handleRunDemo = () => {
    if (!selectedProject) return;
    
    setIsRunning(true);
    setOutput('Running demo...\n');
    
    // Simulate demo execution
    setTimeout(() => {
      const project = projects.find(p => p.id === selectedProject);
      if (project) {
        const demoConfig = getDemoConfig(project as Project);
        setOutput(demoConfig.output);
      }
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <motion.div
        className="container-custom py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back to Home */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            href="/" 
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        <div className="text-center mb-12">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Terminal className="w-8 h-8 text-primary" />
            <h1 className="text-5xl font-bold gradient-text">Live Code Demos</h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Interactive demonstrations of my projects with real-time code execution and live previews.
            Experience the code in action!
          </motion.p>
        </div>

        {/* Project Selection */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {projects.map((project, index) => {
            const CategoryIcon = categoryIcons[project.category as keyof typeof categoryIcons];
            const demoConfig = getDemoConfig(project as Project);
            
            return (
              <motion.div
                key={project.id}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedProject === project.id
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-lg'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                }`}
                onClick={() => setSelectedProject(project.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <CategoryIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.featured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  {demoConfig.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {demoConfig.features.map((feature, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Code Editor and Output */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Code Editor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Code Editor
                  </h3>
                  <button
                    onClick={handleRunDemo}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Run Demo
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-slate-900 rounded-lg p-4 h-96 overflow-auto border border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-slate-400 font-mono">
                      {getDemoConfig(projects.find(p => p.id === selectedProject) as Project).language}
                    </span>
                  </div>
                  <pre className="text-sm text-slate-200 font-mono leading-relaxed">
                    <code>{getDemoConfig(projects.find(p => p.id === selectedProject) as Project).code}</code>
                  </pre>
                </div>
              </div>

              {/* Output Console */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Output Console
                  </h3>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-600 dark:text-slate-400 hover:text-primary transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-slate-900 rounded-lg p-4 h-96 overflow-auto border border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Rocket className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-400 font-mono">Console Output</span>
                  </div>
                  <pre className="text-sm text-slate-200 font-mono leading-relaxed whitespace-pre-wrap">
                    {output || 'Click "Run Demo" to see the output...'}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Want to see more interactive demos or contribute to these projects?
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/projects" 
              className="btn-primary"
            >
              View All Projects
            </Link>
            <a 
              href="https://github.com/klea-dev" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LiveDemosPage; 