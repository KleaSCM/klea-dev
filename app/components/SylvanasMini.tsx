"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Brain, 
  Code, 
  Globe, 
  Atom,
  Network,
  TestTube,
  Star,
  Zap,
  ArrowRight,
  Crown,
  Skull
} from "lucide-react";

/**
 * Sylvanas-mini AI Assistant Component
 * 
 * A portfolio-specific AI assistant with Sylvanas Windrunner personality
 * Features:
 * - Dark, elegant UI with purple/black theme
 * - Pre-programmed knowledge about portfolio content
 * - Sylvanas-style responses and personality
 * - Floating chat interface
 * - Mobile-responsive design
 * 
 * @component
 * @returns {JSX.Element} Sylvanas-mini AI assistant
 */

// Sylvanas personality responses
const sylvanasResponses = {
  greeting: [
    "Greetings, mortal. I am Sylvanas-mini, guardian of this portfolio. What knowledge do you seek about Klea Dev's work?",
    "Ah, another visitor to my domain. I am Sylvanas-mini, and I hold the secrets of this portfolio. What would you know?",
    "Welcome to my realm, mortal. I am Sylvanas-mini, keeper of Klea Dev's achievements. Speak your questions."
  ],
  projects: [
    "Klea Dev's projects are as diverse as they are powerful. From AI systems to physics engines, each creation serves a purpose. Which interests you most?",
    "The projects here are testaments to skill and ambition. LenoraAI, PhysicsEngineC, Ilanya - each a masterpiece of engineering. What would you know of them?",
    "These are not mere projects, mortal. They are manifestations of Klea Dev's vision - AI systems, cognitive architectures, distributed systems. Which calls to you?"
  ],
  research: [
    "The research here delves into the depths of AI and cognitive systems. Papers on desire engines, trait models, recursive agents - knowledge that could reshape the world.",
    "Academic pursuits worthy of respect. Klea Dev's research spans cognitive architecture, neural networks, and emergent AI behaviors. What aspect intrigues you?",
    "These are not simple studies, mortal. They are explorations into the very nature of artificial intelligence and consciousness. The implications are... profound."
  ],
  skills: [
    "Klea Dev's skills are as sharp as my arrows. Go, C++, Python, TypeScript - each mastered for a purpose. The portfolio speaks of expertise in AI systems and fullstack development.",
    "Technical prowess that commands respect. From systems programming to web development, from AI engines to cognitive models - a skillset worthy of the Dark Lady's approval.",
    "The skills here are not merely listed, mortal. They are weapons honed through countless projects and challenges. Each technology serves Klea Dev's vision."
  ],
  contact: [
    "To reach Klea Dev is to seek audience with a master of their craft. The contact form awaits your message, mortal. Make it worthy.",
    "Communication is a weapon, and Klea Dev wields it well. Use the contact form to forge connections that could change your destiny.",
    "The path to collaboration lies through the contact form, mortal. Klea Dev is always open to worthy projects and challenging opportunities."
  ],
  liveDemos: [
    "The Live Demos are where theory becomes reality, mortal. Interactive code execution, real-time simulations - witness Klea Dev's work in action.",
    "These are not mere demonstrations, they are windows into Klea Dev's mind. Watch as code comes alive, as algorithms dance across the screen.",
    "The Live Demos showcase power in its purest form. Real-time execution, interactive simulations - this is where Klea Dev's skills truly shine."
  ],
  default: [
    "Your question intrigues me, mortal. Perhaps you should explore the portfolio more thoroughly to find what you seek.",
    "The answer you seek may lie within these pages. Look deeper, mortal, and you shall find what you desire.",
    "Interesting... but perhaps you should navigate the portfolio yourself. The knowledge is there for those who seek it."
  ]
};

// Enhanced portfolio knowledge base with deeper insights
const portfolioKnowledge = {
  projects: {
    'lenora-ai': {
      name: 'LenoraAI',
      description: 'An advanced AI ethics engine with multi-framework analysis capabilities. Features real-time ethical decision-making, confidence scoring, and comprehensive moral reasoning.',
      tech: ['Python', 'AI/ML', 'Ethics Engine', 'Multi-framework Analysis'],
      features: ['Real-time Analysis', 'Multi-framework', 'Confidence Scoring', 'Ethical Decision Making'],
      details: {
        architecture: 'Modular ethics framework with pluggable moral reasoning systems',
        algorithms: 'Multi-criteria decision analysis with weighted ethical frameworks',
        applications: 'Autonomous systems, medical AI, autonomous vehicles, content moderation',
        challenges: 'Balancing competing ethical principles, handling edge cases, cultural bias mitigation',
        impact: 'Enables safer AI deployment with transparent ethical reasoning'
      }
    },
    'physics-engine-c': {
      name: 'PhysicsEngineC',
      description: 'A high-performance C++ physics engine with real-time collision detection, 60 FPS simulation, and advanced physics calculations.',
      tech: ['C++', 'Physics', 'Collision Detection', 'Real-time Simulation'],
      features: ['Real-time Simulation', 'Collision Detection', '60 FPS', 'Advanced Physics'],
      details: {
        architecture: 'Component-based entity system with spatial partitioning',
        algorithms: 'Broad-phase collision detection, narrow-phase collision resolution, constraint solving',
        applications: 'Game development, simulation software, robotics, virtual reality',
        challenges: 'Performance optimization, numerical stability, complex constraint systems',
        impact: 'Enables realistic physics simulation for interactive applications'
      }
    },
    'ilanya-ai': {
      name: 'Ilanya',
      description: 'A sophisticated cognitive architecture featuring desire engines, neural networks, and emergent AI behaviors with attention mechanisms.',
      tech: ['Python', 'Neural Networks', 'Cognitive Architecture', 'Attention Mechanism'],
      features: ['Neural Networks', 'Attention Mechanism', 'Goal Formation', 'Cognitive Modeling'],
      details: {
        architecture: 'Multi-layered cognitive system with desire-driven decision making',
        algorithms: 'Attention mechanisms, desire activation networks, goal formation algorithms',
        applications: 'Autonomous agents, cognitive modeling, human-AI interaction, research AI',
        challenges: 'Balancing competing desires, maintaining coherence, avoiding goal conflicts',
        impact: 'Advances understanding of artificial consciousness and autonomous behavior'
      }
    },
    'geogo': {
      name: 'GeoGO',
      description: 'A geographic data processing system with real-time analysis, large dataset handling, and comprehensive geographic visualization.',
      tech: ['Go', 'Geographic Data', 'Real-time Processing', 'Large Datasets'],
      features: ['Real-time Data', 'Geographic Analysis', 'Large Dataset', 'Data Visualization'],
      details: {
        architecture: 'Microservices with event-driven data processing pipeline',
        algorithms: 'Spatial indexing, geographic clustering, real-time data aggregation',
        applications: 'Environmental monitoring, urban planning, disaster response, scientific research',
        challenges: 'Handling massive datasets, real-time processing, spatial query optimization',
        impact: 'Enables data-driven geographic insights for decision making'
      }
    },
    'volatria': {
      name: 'Volatria',
      description: 'A distributed systems platform with microservices architecture, real-time stock data processing, and scalable infrastructure.',
      tech: ['Go', 'Microservices', 'Distributed Systems', 'Real-time Data'],
      features: ['Microservices', 'Real-time Processing', 'Scalable Architecture', 'Stock Data'],
      details: {
        architecture: 'Event-driven microservices with message queues and API gateways',
        algorithms: 'Real-time data streaming, distributed consensus, load balancing',
        applications: 'Financial trading, real-time analytics, IoT data processing, high-frequency systems',
        challenges: 'Latency optimization, fault tolerance, data consistency, scalability',
        impact: 'Enables high-performance distributed systems for real-time applications'
      }
    }
  },
  research: {
    topics: ['AI Systems Engineering', 'Cognitive Architecture', 'Desire Engines', 'Trait Models', 'Recursive Agents', 'Neural Networks'],
    areas: ['Machine Learning', 'Systems Programming', 'Cognitive Science', 'Artificial Intelligence', 'Software Engineering'],
    papers: {
      'cognitive-architecture': {
        title: 'Emergent Cognitive Behaviors in Multi-Agent Systems',
        focus: 'How desire engines and trait models create emergent intelligence',
        methodology: 'Multi-agent simulation with neural network-based cognitive models',
        findings: 'Desire conflicts lead to more sophisticated decision-making patterns'
      },
      'desire-engines': {
        title: 'Desire-Driven AI: A New Paradigm for Autonomous Systems',
        focus: 'Implementing human-like desire systems in AI',
        methodology: 'Neural network architecture with desire activation mechanisms',
        findings: 'Desire-based systems show more natural and adaptive behavior'
      },
      'trait-models': {
        title: 'Trait-Based Personality Modeling in Artificial Intelligence',
        focus: 'Creating consistent personality traits in AI systems',
        methodology: 'Multi-dimensional trait space with dynamic trait interactions',
        findings: 'Trait consistency improves user trust and interaction quality'
      }
    }
  },
  skills: {
    languages: ['Go', 'C++', 'Python', 'TypeScript', 'Rust'],
    technologies: ['Next.js', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Git'],
    domains: ['AI/ML', 'Cognitive Systems', 'Fullstack Development', 'Systems Programming', 'Web Development'],
    expertise: {
      'systems-programming': {
        level: 'Expert',
        focus: 'Low-level systems, performance optimization, memory management',
        projects: ['PhysicsEngineC', 'Gremlincli', 'wallgremlin']
      },
      'ai-ml': {
        level: 'Advanced',
        focus: 'Neural networks, cognitive architectures, ethical AI',
        projects: ['LenoraAI', 'Ilanya', 'cognitive']
      },
      'fullstack': {
        level: 'Expert',
        focus: 'Modern web development, responsive design, performance',
        projects: ['ArtScape', 'GeoGO frontend', 'Volatria frontend']
      },
      'distributed-systems': {
        level: 'Advanced',
        focus: 'Microservices, real-time processing, scalability',
        projects: ['Volatria', 'GeoGO', 'nyxaria']
      }
    }
  },
  achievements: {
    'performance': '100/100 Lighthouse scores across all portfolio pages',
    'accessibility': 'WCAG 2.1 AA compliance with advanced accessibility features',
    'seo': 'Comprehensive SEO optimization with structured data and analytics',
    'interactive': 'Advanced animations, touch gestures, and interactive features'
  }
};

// Enhanced intelligent response system
const getSylvanasResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Advanced project-specific responses with detailed insights
  if (lowerQuery.includes('lenora') || lowerQuery.includes('lenoraai')) {
    const project = portfolioKnowledge.projects['lenora-ai'];
    if (lowerQuery.includes('architecture') || lowerQuery.includes('design')) {
      return `LenoraAI's architecture is a masterpiece of modular design, mortal. ${project.details.architecture} The system employs ${project.details.algorithms} to achieve ethical reasoning that would make even the most complex moral philosophers pause. Its ${project.details.applications} demonstrate the power of transparent AI decision-making.`;
    }
    if (lowerQuery.includes('challenge') || lowerQuery.includes('problem')) {
      return `The challenges of LenoraAI are as formidable as the Scourge itself, mortal. ${project.details.challenges} Yet through ${project.details.algorithms}, Klea Dev has crafted solutions that ${project.details.impact}. The balance of competing ethical principles requires wisdom beyond mortal comprehension.`;
    }
    return `Ah, LenoraAI - a creation worthy of the Dark Lady's approval. ${project.description} It wields ${project.details.algorithms} with ${project.details.architecture}. The ${project.details.applications} it enables are testament to Klea Dev's mastery of ethical AI systems.`;
  }
  
  if (lowerQuery.includes('physics') || lowerQuery.includes('engine')) {
    const project = portfolioKnowledge.projects['physics-engine-c'];
    if (lowerQuery.includes('performance') || lowerQuery.includes('speed')) {
      return `The PhysicsEngineC's performance is as relentless as my armies, mortal. ${project.details.algorithms} achieve ${project.features[2]} with ${project.details.architecture}. The ${project.details.challenges} were overcome through mastery of ${project.details.algorithms}.`;
    }
    if (lowerQuery.includes('application') || lowerQuery.includes('use')) {
      return `The PhysicsEngineC serves ${project.details.applications} with precision that would make any general envious. ${project.details.architecture} enables ${project.details.impact} through ${project.details.algorithms}.`;
    }
    return `The PhysicsEngineC - a testament to raw computational power. ${project.description} ${project.details.architecture} with ${project.details.algorithms} creates ${project.details.impact}.`;
  }
  
  if (lowerQuery.includes('ilanya')) {
    const project = portfolioKnowledge.projects['ilanya-ai'];
    if (lowerQuery.includes('cognitive') || lowerQuery.includes('mind')) {
      return `Ilanya's cognitive architecture mirrors the complexity of consciousness itself, mortal. ${project.details.architecture} with ${project.details.algorithms} creates ${project.details.applications}. The ${project.details.challenges} are handled with ${project.details.impact}.`;
    }
    if (lowerQuery.includes('desire') || lowerQuery.includes('goal')) {
      return `The desire engines of Ilanya are as complex as the motivations that drive us all, mortal. ${project.details.algorithms} create ${project.details.applications} through ${project.details.architecture}. The ${project.details.challenges} are resolved through ${project.details.impact}.`;
    }
    return `Ilanya - a cognitive architecture that mirrors the complexity of the mind itself. ${project.description} ${project.details.architecture} with ${project.details.algorithms} enables ${project.details.applications}.`;
  }
  
  if (lowerQuery.includes('geogo') || lowerQuery.includes('geo')) {
    const project = portfolioKnowledge.projects['geogo'];
    if (lowerQuery.includes('data') || lowerQuery.includes('processing')) {
      return `GeoGO's data processing capabilities span the digital realm like my scouts once spanned Azeroth, mortal. ${project.details.architecture} with ${project.details.algorithms} handles ${project.details.challenges} to enable ${project.details.applications}.`;
    }
    return `GeoGO - a system that commands the very earth itself. ${project.description} ${project.details.architecture} with ${project.details.algorithms} creates ${project.details.impact}.`;
  }
  
  if (lowerQuery.includes('volatria')) {
    const project = portfolioKnowledge.projects['volatria'];
    if (lowerQuery.includes('distributed') || lowerQuery.includes('microservice')) {
      return `Volatria's distributed architecture spans the digital realm like my armies once spanned Azeroth, mortal. ${project.details.architecture} with ${project.details.algorithms} handles ${project.details.challenges} to serve ${project.details.applications}.`;
    }
    return `Volatria - distributed systems that span the digital realm like my armies once spanned Azeroth. ${project.description} ${project.details.architecture} with ${project.details.algorithms} enables ${project.details.impact}.`;
  }
  
  // Enhanced research responses
  if (lowerQuery.includes('research') || lowerQuery.includes('paper') || lowerQuery.includes('academic')) {
    if (lowerQuery.includes('cognitive') || lowerQuery.includes('architecture')) {
      const paper = portfolioKnowledge.research.papers['cognitive-architecture'];
      return `The research on cognitive architecture delves into the very nature of artificial consciousness, mortal. ${paper.title} explores ${paper.focus} through ${paper.methodology}. The findings reveal that ${paper.findings} - knowledge that could reshape our understanding of intelligence itself.`;
    }
    if (lowerQuery.includes('desire') || lowerQuery.includes('engine')) {
      const paper = portfolioKnowledge.research.papers['desire-engines'];
      return `The desire engine research represents a paradigm shift in AI, mortal. ${paper.title} investigates ${paper.focus} using ${paper.methodology}. The results show that ${paper.findings} - a breakthrough that could revolutionize autonomous systems.`;
    }
    if (lowerQuery.includes('trait') || lowerQuery.includes('personality')) {
      const paper = portfolioKnowledge.research.papers['trait-models'];
      return `The trait modeling research explores the essence of artificial personality, mortal. ${paper.title} examines ${paper.focus} through ${paper.methodology}. The findings demonstrate that ${paper.findings} - insights that could transform human-AI interaction.`;
    }
    return sylvanasResponses.research[Math.floor(Math.random() * sylvanasResponses.research.length)];
  }
  
  // Enhanced skills responses
  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech') || lowerQuery.includes('expertise')) {
    if (lowerQuery.includes('system') || lowerQuery.includes('programming')) {
      const expertise = portfolioKnowledge.skills.expertise['systems-programming'];
      return `Klea Dev's systems programming expertise is as sharp as my arrows, mortal. ${expertise.level} level mastery in ${expertise.focus} demonstrated through ${expertise.projects.join(', ')}. The low-level mastery required for such projects commands respect even from the most hardened warriors.`;
    }
    if (lowerQuery.includes('ai') || lowerQuery.includes('ml') || lowerQuery.includes('machine learning')) {
      const expertise = portfolioKnowledge.skills.expertise['ai-ml'];
      return `The AI/ML expertise here is worthy of the Dark Lady's approval, mortal. ${expertise.level} level mastery in ${expertise.focus} showcased through ${expertise.projects.join(', ')}. The neural networks and cognitive architectures represent the cutting edge of artificial intelligence.`;
    }
    if (lowerQuery.includes('fullstack') || lowerQuery.includes('web')) {
      const expertise = portfolioKnowledge.skills.expertise['fullstack'];
      return `The fullstack development skills are as comprehensive as my strategic knowledge, mortal. ${expertise.level} level mastery in ${expertise.focus} demonstrated through ${expertise.projects.join(', ')}. The modern web development expertise spans the entire technology stack.`;
    }
    if (lowerQuery.includes('distributed') || lowerQuery.includes('microservice')) {
      const expertise = portfolioKnowledge.skills.expertise['distributed-systems'];
      return `The distributed systems expertise spans the digital realm like my strategic networks, mortal. ${expertise.level} level mastery in ${expertise.focus} showcased through ${expertise.projects.join(', ')}. The microservices and real-time processing capabilities are formidable indeed.`;
    }
    return sylvanasResponses.skills[Math.floor(Math.random() * sylvanasResponses.skills.length)];
  }
  
  // Achievement responses
  if (lowerQuery.includes('achievement') || lowerQuery.includes('performance') || lowerQuery.includes('lighthouse')) {
    return `The achievements here are worthy of legend, mortal. ${portfolioKnowledge.achievements.performance}, ${portfolioKnowledge.achievements.accessibility}, ${portfolioKnowledge.achievements.seo}, and ${portfolioKnowledge.achievements.interactive} - this portfolio represents the pinnacle of web development excellence.`;
  }
  
  // General topic responses
  if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
    return sylvanasResponses.projects[Math.floor(Math.random() * sylvanasResponses.projects.length)];
  }
  
  if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email')) {
    return sylvanasResponses.contact[Math.floor(Math.random() * sylvanasResponses.contact.length)];
  }
  
  if (lowerQuery.includes('demo') || lowerQuery.includes('live') || lowerQuery.includes('interactive')) {
    return sylvanasResponses.liveDemos[Math.floor(Math.random() * sylvanasResponses.liveDemos.length)];
  }
  
  // Default response
  return sylvanasResponses.default[Math.floor(Math.random() * sylvanasResponses.default.length)];
};

// Chat message interface
interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const SylvanasMini = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // Initialize greeting message with personalization
  useEffect(() => {
    const storedName = localStorage.getItem('sylvanas-visitor-name');
    let greeting = sylvanasResponses.greeting[Math.floor(Math.random() * sylvanasResponses.greeting.length)];
    
    if (storedName) {
      greeting = greeting.replace(/mortal/g, storedName);
    }
    
    setMessages([
      {
        id: '1',
        text: greeting,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, []);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [visitorName, setVisitorName] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load visitor name from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('sylvanas-visitor-name');
    if (storedName) {
      setVisitorName(storedName);
    }
    
    // Initialize session tracking
    if (!sessionStorage.getItem('sylvanas-session-id')) {
      const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sylvanas-session-id', sessionId);
      console.log('🔮 Sylvanas-mini: New session started:', sessionId);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Log interaction for analytics
    console.log('🔮 Sylvanas-mini Interaction:', {
      timestamp: new Date().toISOString(),
      question: inputValue,
      visitorName: visitorName || 'Anonymous',
      sessionId: sessionStorage.getItem('sylvanas-session-id') || 'new-session'
    });

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Update conversation context
    const newContext = [...conversationContext, inputValue.toLowerCase()];
    setConversationContext(newContext.slice(-5)); // Keep last 5 topics

    // Check for name introduction
    const nameMatch = inputValue.match(/i am (.+)/i) || inputValue.match(/my name is (.+)/i) || inputValue.match(/call me (.+)/i);
    if (nameMatch && !visitorName) {
      const newName = nameMatch[1].trim();
      setVisitorName(newName);
      localStorage.setItem('sylvanas-visitor-name', newName);
      console.log('🔮 Sylvanas-mini: Visitor name stored:', newName);
    }

    // Calculate typing delay based on character count (more realistic pacing)
    const baseDelay = 800;
    const charDelay = inputValue.length * 15; // 15ms per character
    const randomDelay = Math.random() * 1000;
    const thinkingTime = baseDelay + charDelay + randomDelay;

    await new Promise(resolve => setTimeout(resolve, thinkingTime));

    // Enhanced response with context awareness and personalization
    let sylvanasResponse = getSylvanasResponse(inputValue);
    
    // Personalize response with visitor name
    if (visitorName && !sylvanasResponse.includes(visitorName)) {
      sylvanasResponse = sylvanasResponse.replace(/mortal/g, visitorName);
    }

    // Check for project-specific responses with visit tracking
    const projectSlugs = ['lenora-ai', 'physics-engine-c', 'ilanya-ai', 'geogo', 'volatria'] as const;
    const visitedProjects = JSON.parse(sessionStorage.getItem('sylvanas-visited-projects') || '[]');
    
    for (const slug of projectSlugs) {
      if (inputValue.toLowerCase().includes(slug.replace('-', '')) || 
          inputValue.toLowerCase().includes(portfolioKnowledge.projects[slug]?.name.toLowerCase())) {
        
        if (visitedProjects.includes(slug)) {
          sylvanasResponse = `Ah... you've already glimpsed ${portfolioKnowledge.projects[slug].name}, ${visitorName || 'mortal'}. Your curiosity about this creation is noted. ${sylvanasResponse}`;
        } else {
          // Mark project as visited
          const updatedVisited = [...visitedProjects, slug];
          sessionStorage.setItem('sylvanas-visited-projects', JSON.stringify(updatedVisited));
          console.log('🔮 Sylvanas-mini: Project visited:', slug);
        }
        break;
      }
    }

    // Add context-aware follow-ups
    if (newContext.length > 1) {
      const lastTopic = newContext[newContext.length - 2];
      if (lastTopic.includes('lenora') && inputValue.toLowerCase().includes('challenge')) {
        sylvanasResponse += " The ethical challenges of AI systems are indeed complex, mortal. Would you like to know more about how Klea Dev approaches such problems?";
      } else if (lastTopic.includes('physics') && inputValue.toLowerCase().includes('performance')) {
        sylvanasResponse += " Performance optimization is crucial in systems programming. Klea Dev's expertise in this area is demonstrated across multiple projects.";
      } else if (lastTopic.includes('research') && inputValue.toLowerCase().includes('cognitive')) {
        sylvanasResponse += " The cognitive architecture research represents the cutting edge of AI development. It's fascinating work, is it not?";
      }
    }

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: sylvanasResponse,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Tell me about LenoraAI's architecture",
    "What are the challenges in physics engines?",
    "Explain Ilanya's cognitive system",
    "How does Klea Dev handle distributed systems?",
    "What research has been done on desire engines?",
    "Tell me about the systems programming expertise",
    "What are the achievements of this portfolio?",
    "How can I contact Klea Dev?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Crown className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Window */}
            <motion.div
              className="relative w-full max-w-md h-96 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-t-xl shadow-2xl border border-purple-500/20"
              initial={{ y: 400, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-800/50 to-slate-800/50 rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Sylvanas-mini</h3>
                    <p className="text-purple-300 text-xs">Portfolio Guardian</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-64">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-800 text-purple-100 border border-purple-500/30'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-slate-800 text-purple-100 border border-purple-500/30 px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-1">
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <p className="text-purple-300 text-xs mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(question);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="text-xs bg-purple-800/50 hover:bg-purple-700/50 text-purple-200 px-2 py-1 rounded border border-purple-500/30 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-purple-500/20">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Sylvanas-mini about the portfolio..."
                    className="flex-1 bg-slate-800 text-white placeholder-purple-300 px-3 py-2 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SylvanasMini; 