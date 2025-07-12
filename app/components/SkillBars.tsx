"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * SkillBars Component
 * 
 * A beautiful, animated skill bars component that displays technical expertise levels.
 * Features:
 * - Animated skill bars with gradient fills
 * - Shine effects and smooth transitions
 * - Organized by skill categories
 * - Responsive design with proper spacing
 * - Skill levels based on actual expertise
 * 
 * @component
 * @returns {JSX.Element} SkillBars component
 */

// Skill data with expertise levels (0-100) from AboutMe.txt
interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
  icon?: string;
}

const skills: Skill[] = [
  // 🧱 Backend & Systems
  { name: "Go", level: 95, category: "Backend & Systems", color: "from-blue-500 to-blue-600" },
  { name: "C++", level: 90, category: "Backend & Systems", color: "from-purple-500 to-purple-600" },
  { name: "Python", level: 92, category: "Backend & Systems", color: "from-yellow-500 to-yellow-600" },
  { name: "Rust", level: 77, category: "Backend & Systems", color: "from-orange-500 to-orange-600" },
  { name: "Node.js", level: 81, category: "Backend & Systems", color: "from-green-500 to-green-600" },
  
  // 🌐 Frontend & Web
  { name: "TypeScript", level: 84, category: "Frontend & Web", color: "from-blue-500 to-blue-600" },
  { name: "React", level: 82, category: "Frontend & Web", color: "from-cyan-500 to-cyan-600" },
  { name: "Next.js", level: 89, category: "Frontend & Web", color: "from-gray-500 to-gray-600" },
  { name: "Tailwind CSS", level: 95, category: "Frontend & Web", color: "from-teal-500 to-teal-600" },
  { name: "SCSS", level: 94, category: "Frontend & Web", color: "from-pink-500 to-pink-600" },
  { name: "CSS", level: 94, category: "Frontend & Web", color: "from-indigo-500 to-indigo-600" },
  { name: "HTML", level: 97, category: "Frontend & Web", color: "from-orange-500 to-orange-600" },
  
  // 🧠 AI/ML & Research
  { name: "TensorFlow", level: 80, category: "AI/ML & Research", color: "from-orange-500 to-orange-600" },
  { name: "PyTorch", level: 85, category: "AI/ML & Research", color: "from-red-500 to-red-600" },
  { name: "OpenCV", level: 78, category: "AI/ML & Research", color: "from-green-500 to-green-600" },
  { name: "NLP", level: 83, category: "AI/ML & Research", color: "from-indigo-500 to-indigo-600" },
  
  // ⚙️ DevOps & Tools
  { name: "Docker", level: 78, category: "DevOps & Tools", color: "from-blue-500 to-blue-600" },
  { name: "Kubernetes", level: 70, category: "DevOps & Tools", color: "from-blue-500 to-blue-600" },
  { name: "AWS", level: 75, category: "DevOps & Tools", color: "from-yellow-500 to-yellow-600" },
  { name: "Git", level: 94, category: "DevOps & Tools", color: "from-orange-500 to-orange-600" },
  
  // 🗄 Databases & Infrastructure
  { name: "PostgreSQL", level: 88, category: "Databases & Infrastructure", color: "from-blue-500 to-blue-600" },
  { name: "Redis", level: 85, category: "Databases & Infrastructure", color: "from-red-500 to-red-600" },
  { name: "MySQL", level: 88, category: "Databases & Infrastructure", color: "from-orange-500 to-orange-600" },
  { name: "SQLite", level: 88, category: "Databases & Infrastructure", color: "from-green-500 to-green-600" },
  { name: "MongoDB", level: 70, category: "Databases & Infrastructure", color: "from-green-500 to-green-600" },
];

// Category emojis for visual appeal
const categoryEmojis: { [key: string]: string } = {
  "Backend & Systems": "🧱",
  "Frontend & Web": "🌐",
  "AI/ML & Research": "🧠",
  "DevOps & Tools": "⚙️",
  "Databases & Infrastructure": "🗄"
};

// Skill bar component with animation
const SkillBar = ({ skill }: { skill: Skill }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {skill.name}
        </span>
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
          {skill.level}%
        </span>
      </div>
      
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.2 
          }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      {/* Category badge */}
      <div className="mt-1">
        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
};

// Skill bars grid component
const SkillBars = () => {
  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <motion.div
          key={category}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <span className="text-xl">{categoryEmojis[category]}</span>
            {category}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills
              .filter(skill => skill.category === category)
              .map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillBars; 