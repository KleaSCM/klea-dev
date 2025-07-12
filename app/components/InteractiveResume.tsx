"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Calendar, 
  MapPin, 
  Building, 
  Award,
  Code,
  Database,
  Cpu,
  Globe,
  Brain,
  Zap,
  Star
} from "lucide-react";

// Experience data
interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  type: 'work' | 'education' | 'project';
  icon: any;
}

const experiences: Experience[] = [
  {
    id: 'senior-engineer',
    title: 'Senior Full-Stack Software Engineer',
    company: 'Freelance & Contract',
    location: 'Remote',
    period: '2022 - Present',
    description: 'Leading development of advanced AI systems, physics engines, and scalable web applications. Specializing in Go, C++, Python, and modern web technologies.',
    technologies: ['Go', 'C++', 'Python', 'TypeScript', 'React', 'Next.js', 'Docker', 'AWS'],
    achievements: [
      'Developed 21+ advanced projects across AI/ML, Physics, Systems, and Web domains',
      'Built high-performance physics engines with real-time collision detection',
      'Created sophisticated AI cognitive architectures with neural network integration',
      'Implemented distributed systems with microservices architecture'
    ],
    type: 'work',
    icon: Code
  },
  {
    id: 'ai-research',
    title: 'AI Systems Research & Development',
    company: 'Independent Research',
    location: 'Remote',
    period: '2021 - Present',
    description: 'Conducting cutting-edge research in cognitive architecture, ethical AI systems, and advanced machine learning applications.',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'NLP', 'Neural Networks'],
    achievements: [
      'Developed LenoraAI - Advanced Ethics State Machine with multi-framework analysis',
      'Created Ilanya - Sophisticated cognitive architecture with desire/trait engines',
      'Built Shandris - Mathematical framework for cognitive architecture',
      'Implemented research-grade memory systems and emotional intelligence modeling'
    ],
    type: 'project',
    icon: Brain
  },
  {
    id: 'physics-engines',
    title: 'Physics Engine Development',
    company: 'Independent Development',
    location: 'Remote',
    period: '2020 - Present',
    description: 'Designing and implementing high-performance physics engines for real-time simulation and game development.',
    technologies: ['C++', 'Rust', 'OpenGL', 'Mathematics', 'Collision Detection', 'Rigid Body Dynamics'],
    achievements: [
      'Built PhysicsEngineC - High-performance C++ physics engine with modular architecture',
      'Implemented AAB_OBBBP - Advanced collision detection system with spatial optimization',
      'Created comprehensive collision detection algorithms (AABB, OBB, Sphere)',
      'Developed real-time simulation with broad-phase optimization'
    ],
    type: 'project',
    icon: Cpu
  },
  {
    id: 'web-development',
    title: 'Full-Stack Web Development',
    company: 'Freelance Projects',
    location: 'Remote',
    period: '2021 - Present',
    description: 'Building modern, scalable web applications with focus on user experience and performance optimization.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Go', 'PostgreSQL', 'Docker', 'AWS'],
    achievements: [
      'Developed GeoGO - Geographic data processing platform with interactive visualizations',
      'Built Volatria - Distributed systems platform with microservices architecture',
      'Created ArtScape - Digital art marketplace with secure payment processing',
      'Implemented responsive designs with modern UI/UX principles'
    ],
    type: 'work',
    icon: Globe
  },
  {
    id: 'systems-programming',
    title: 'Systems Programming & Infrastructure',
    company: 'Independent Development',
    location: 'Remote',
    period: '2020 - Present',
    description: 'Developing high-performance system tools, daemons, and infrastructure components with focus on reliability and efficiency.',
    technologies: ['Rust', 'Go', 'C++', 'System Programming', 'Daemon Development', 'Network Security'],
    achievements: [
      'Built Kdemon - Robust system daemon framework for high-performance services',
      'Developed SmartCurl - Intelligent HTTP client with advanced web scraping',
      'Created VulnSCAN - Comprehensive security vulnerability scanner',
      'Implemented ColorCoded - Advanced color analysis tool with Rust'
    ],
    type: 'project',
    icon: Database
  }
];

// Timeline item component
const TimelineItem = ({ experience, index }: { experience: Experience; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = experience.icon;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col lg:flex-row gap-4 lg:gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline line */}
      <div className="relative flex flex-col items-center">
        <div className="w-0.5 h-full bg-gradient-to-b from-indigo-500 to-pink-500"></div>
        <div className="absolute top-0 w-4 h-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full border-4 border-white dark:border-slate-800"></div>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5, scale: 1.02 }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex-shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-1 break-words">
              {experience.title}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2">
              <div className="flex items-center gap-1">
                <Building className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-words">{experience.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-words">{experience.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-words">{experience.period}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm sm:text-base break-words">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {experience.technologies.map((tech) => (
              <span key={tech} className="skill-badge text-xs px-2 py-1 break-words">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: (index * 0.1) + (idx * 0.1) }}
              >
                <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                <span className="break-words">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Interactive Resume Component
const InteractiveResume = () => {
  return (
    <section className="section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-responsive font-bold mb-6 gradient-text">
            Professional Experience
          </h2>
          <p className="text-responsive text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A comprehensive timeline of my professional journey, showcasing expertise across 
            AI systems, physics engines, web development, and systems programming.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-pink-500"></div>
          
          {/* Timeline items */}
          <div className="space-y-8 lg:space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>

        {/* Skills summary */}
        <motion.div
          className="mt-20 p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-6 text-center">
            Core Competencies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI/ML Systems', count: 8, icon: Brain },
              { title: 'Physics Engines', count: 5, icon: Cpu },
              { title: 'Web Applications', count: 6, icon: Globe },
              { title: 'Systems Programming', count: 4, icon: Database }
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                className="text-center p-4 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <skill.icon className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {skill.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {skill.count} projects
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveResume; 