"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Bug, 
  Palette, 
  Database, 
  Zap, 
  Star,
  Play,
  Trophy,
  Target,
  Lock,
  Unlock
} from "lucide-react";

// Game types
interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Coding' | 'Hacking' | 'CSS' | 'Logic';
  icon: any;
  isAvailable: boolean;
  comingSoon?: boolean;
}

const games: Game[] = [
  {
    id: 'button-stopper',
    title: 'Button Stopper',
    description: 'Write JavaScript code to stop a moving button. Use event listeners and DOM manipulation to catch it!',
    difficulty: 'Easy',
    category: 'Coding',
    icon: Target,
    isAvailable: true
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection Challenge',
    description: 'Practice safe SQL injection techniques on a fake database. Learn about input validation and sanitization.',
    difficulty: 'Medium',
    category: 'Hacking',
    icon: Database,
    isAvailable: true
  },
  {
    id: 'css-artist',
    title: 'CSS Artist',
    description: 'Create beautiful designs using only CSS. Style elements to match the target design.',
    difficulty: 'Easy',
    category: 'CSS',
    icon: Palette,
    isAvailable: true
  },
  {
    id: 'code-debugger',
    title: 'Code Debugger',
    description: 'Find and fix bugs in JavaScript code. Debug logical errors and syntax issues.',
    difficulty: 'Medium',
    category: 'Coding',
    icon: Bug,
    isAvailable: true
  },
  {
    id: 'password-cracker',
    title: 'Password Cracker',
    description: 'Use brute force and dictionary attacks on a simulated password system.',
    difficulty: 'Hard',
    category: 'Hacking',
    icon: Lock,
    isAvailable: false,
    comingSoon: true
  },
  {
    id: 'algorithm-race',
    title: 'Algorithm Race',
    description: 'Optimize algorithms to solve problems faster than your opponent.',
    difficulty: 'Hard',
    category: 'Logic',
    icon: Zap,
    isAvailable: false,
    comingSoon: true
  }
];

// Game Card Component
const GameCard = ({ game, onPlay }: { game: Game; onPlay: (gameId: string) => void }) => {
  const Icon = game.icon;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Hard': return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      default: return 'text-slate-500 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Coding': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'Hacking': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
      case 'CSS': return 'text-pink-500 bg-pink-100 dark:bg-pink-900/20';
      case 'Logic': return 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/20';
      default: return 'text-slate-500 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  return (
    <motion.div
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                {game.title}
              </h3>
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(game.category)}`}>
                  {game.category}
                </span>
              </div>
            </div>
          </div>
          {game.comingSoon && (
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
              Coming Soon
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
          {game.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => onPlay(game.id)}
          disabled={!game.isAvailable}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            game.isAvailable
              ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transform hover:-translate-y-1'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
          }`}
        >
          {game.isAvailable ? (
            <span className="flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Play Now
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              Coming Soon
            </span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

// Games Component
const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = ['All', 'Coding', 'Hacking', 'CSS', 'Logic'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredGames = games.filter(game => {
    const categoryMatch = selectedCategory === 'All' || game.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || game.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const handlePlayGame = (gameId: string) => {
    console.log('Playing game:', gameId);
    
    // Launch the specific game
    switch (gameId) {
      case 'button-stopper':
        window.location.href = '/games/button-stopper';
        break;
      case 'sql-injection':
        window.location.href = '/games/sql-injection';
        break;
      case 'css-artist':
        window.location.href = '/games/css-artist';
        break;
      case 'code-debugger':
        window.location.href = '/games/code-debugger';
        break;
      default:
        alert(`Launching ${gameId}... Coming soon!`);
    }
  };

  return (
    <section id="games" className="section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-responsive font-bold mb-6 gradient-text">
            Interactive Games
          </h2>
          <p className="text-responsive text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Challenge yourself with coding puzzles, hacking simulations, and creative CSS challenges. 
            Learn while having fun! 🎮✨
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-500">6</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Games</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500">4</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">3</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Categories</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <GameCard game={game} onPlay={handlePlayGame} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Ready to Play?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Choose a game above and start your coding adventure! Each game is designed to teach 
            real programming concepts in a fun, interactive way.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            View All Games
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Games; 