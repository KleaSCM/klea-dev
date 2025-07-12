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

// Portfolio knowledge base
const portfolioKnowledge = {
  projects: {
    'lenora-ai': {
      name: 'LenoraAI',
      description: 'An advanced AI ethics engine with multi-framework analysis capabilities. Features real-time ethical decision-making, confidence scoring, and comprehensive moral reasoning.',
      tech: ['Python', 'AI/ML', 'Ethics Engine', 'Multi-framework Analysis'],
      features: ['Real-time Analysis', 'Multi-framework', 'Confidence Scoring', 'Ethical Decision Making']
    },
    'physics-engine-c': {
      name: 'PhysicsEngineC',
      description: 'A high-performance C++ physics engine with real-time collision detection, 60 FPS simulation, and advanced physics calculations.',
      tech: ['C++', 'Physics', 'Collision Detection', 'Real-time Simulation'],
      features: ['Real-time Simulation', 'Collision Detection', '60 FPS', 'Advanced Physics']
    },
    'ilanya-ai': {
      name: 'Ilanya',
      description: 'A sophisticated cognitive architecture featuring desire engines, neural networks, and emergent AI behaviors with attention mechanisms.',
      tech: ['Python', 'Neural Networks', 'Cognitive Architecture', 'Attention Mechanism'],
      features: ['Neural Networks', 'Attention Mechanism', 'Goal Formation', 'Cognitive Modeling']
    },
    'geogo': {
      name: 'GeoGO',
      description: 'A geographic data processing system with real-time analysis, large dataset handling, and comprehensive geographic visualization.',
      tech: ['Go', 'Geographic Data', 'Real-time Processing', 'Large Datasets'],
      features: ['Real-time Data', 'Geographic Analysis', 'Large Dataset', 'Data Visualization']
    },
    'volatria': {
      name: 'Volatria',
      description: 'A distributed systems platform with microservices architecture, real-time stock data processing, and scalable infrastructure.',
      tech: ['Go', 'Microservices', 'Distributed Systems', 'Real-time Data'],
      features: ['Microservices', 'Real-time Processing', 'Scalable Architecture', 'Stock Data']
    }
  },
  research: {
    topics: ['AI Systems Engineering', 'Cognitive Architecture', 'Desire Engines', 'Trait Models', 'Recursive Agents', 'Neural Networks'],
    areas: ['Machine Learning', 'Systems Programming', 'Cognitive Science', 'Artificial Intelligence', 'Software Engineering']
  },
  skills: {
    languages: ['Go', 'C++', 'Python', 'TypeScript', 'Rust'],
    technologies: ['Next.js', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Git'],
    domains: ['AI/ML', 'Cognitive Systems', 'Fullstack Development', 'Systems Programming', 'Web Development']
  }
};

// Helper function to get Sylvanas-style response
const getSylvanasResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Project-specific responses
  if (lowerQuery.includes('lenora') || lowerQuery.includes('lenoraai')) {
    return `Ah, LenoraAI - a creation worthy of the Dark Lady's approval. ${portfolioKnowledge.projects['lenora-ai'].description} It wields the power of ethical decision-making with confidence that would make even the Lich King pause.`;
  }
  
  if (lowerQuery.includes('physics') || lowerQuery.includes('engine')) {
    return `The PhysicsEngineC - a testament to raw computational power. ${portfolioKnowledge.projects['physics-engine-c'].description} Real-time collision detection at 60 FPS - efficiency that would serve any army well.`;
  }
  
  if (lowerQuery.includes('ilanya')) {
    return `Ilanya - a cognitive architecture that mirrors the complexity of the mind itself. ${portfolioKnowledge.projects['ilanya-ai'].description} Neural networks and attention mechanisms - this is the future of AI, mortal.`;
  }
  
  if (lowerQuery.includes('geogo') || lowerQuery.includes('geo')) {
    return `GeoGO - a system that commands the very earth itself. ${portfolioKnowledge.projects['geogo'].description} Geographic data processing on a scale that would make cartographers weep with joy.`;
  }
  
  if (lowerQuery.includes('volatria')) {
    return `Volatria - distributed systems that span the digital realm like my armies once spanned Azeroth. ${portfolioKnowledge.projects['volatria'].description} Microservices architecture worthy of a queen's domain.`;
  }
  
  // General topic responses
  if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
    return sylvanasResponses.projects[Math.floor(Math.random() * sylvanasResponses.projects.length)];
  }
  
  if (lowerQuery.includes('research') || lowerQuery.includes('paper') || lowerQuery.includes('academic')) {
    return sylvanasResponses.research[Math.floor(Math.random() * sylvanasResponses.research.length)];
  }
  
  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech')) {
    return sylvanasResponses.skills[Math.floor(Math.random() * sylvanasResponses.skills.length)];
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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: sylvanasResponses.greeting[Math.floor(Math.random() * sylvanasResponses.greeting.length)],
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Sylvanas thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const sylvanasResponse = getSylvanasResponse(inputValue);
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
    "Tell me about the projects",
    "What research has been done?",
    "What are Klea Dev's skills?",
    "How can I contact Klea Dev?",
    "Show me the live demos"
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