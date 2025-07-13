"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Unlock,
  TrendingUp
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
  maxPoints: number;
}

// Player stats interface
interface PlayerStats {
  totalScore: number;
  gamesPlayed: number;
  gameScores: { [key: string]: number };
  lastPlayed: string;
}

const games: Game[] = [
  {
    id: 'button-stopper',
    title: 'Button Stopper',
    description: 'Write JavaScript code to stop a moving button. Use event listeners and DOM manipulation to catch it!',
    difficulty: 'Easy',
    category: 'Coding',
    icon: Target,
    isAvailable: true,
    maxPoints: 100
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection Challenge',
    description: 'Practice safe SQL injection techniques on a fake database. Learn about input validation and sanitization.',
    difficulty: 'Medium',
    category: 'Hacking',
    icon: Database,
    isAvailable: true,
    maxPoints: 200
  },
  {
    id: 'css-artist',
    title: 'CSS Artist',
    description: 'Create beautiful designs using only CSS. Style elements to match the target design.',
    difficulty: 'Easy',
    category: 'CSS',
    icon: Palette,
    isAvailable: true,
    maxPoints: 150
  },
  {
    id: 'code-debugger',
    title: 'Code Debugger',
    description: 'Find and fix bugs in JavaScript code. Debug logical errors and syntax issues.',
    difficulty: 'Medium',
    category: 'Coding',
    icon: Bug,
    isAvailable: true,
    maxPoints: 300
  },
  {
    id: 'password-cracker',
    title: 'Password Cracker',
    description: 'Use brute force and dictionary attacks on a simulated password system.',
    difficulty: 'Hard',
    category: 'Hacking',
    icon: Lock,
    isAvailable: true,
    maxPoints: 300
  },
  {
    id: 'algorithm-race',
    title: 'Algorithm Race',
    description: 'Optimize algorithms to solve problems faster than your opponent.',
    difficulty: 'Hard',
    category: 'Logic',
    icon: Zap,
    isAvailable: false,
    comingSoon: true,
    maxPoints: 400
  }
];

// Game Card Component
const GameCard = ({ game, onPlay, playerScore }: { game: Game; onPlay: (gameId: string) => void; playerScore?: number }) => {
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

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = score / maxScore;
    if (percentage >= 0.9) return 'text-green-500';
    if (percentage >= 0.7) return 'text-yellow-500';
    if (percentage >= 0.5) return 'text-orange-500';
    return 'text-slate-500';
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

        {/* Score Display */}
        {playerScore !== undefined && (
          <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Your Score:</span>
              <span className={`font-bold ${getScoreColor(playerScore, game.maxPoints)}`}>
                {playerScore} / {game.maxPoints}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  playerScore / game.maxPoints >= 0.9 ? 'bg-green-500' :
                  playerScore / game.maxPoints >= 0.7 ? 'bg-yellow-500' :
                  playerScore / game.maxPoints >= 0.5 ? 'bg-orange-500' : 'bg-slate-400'
                }`}
                style={{ width: `${Math.min((playerScore / game.maxPoints) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

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
              {playerScore !== undefined ? 'Play Again' : 'Play Now'}
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
  const [showStats, setShowStats] = useState(false);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    totalScore: 0,
    gamesPlayed: 0,
    gameScores: {},
    lastPlayed: ''
  });

  // Load player stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('klea-games-stats');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        setPlayerStats(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
  }, []);

  // Save player stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('klea-games-stats', JSON.stringify(playerStats));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  }, [playerStats]);

  const categories = ['All', 'Coding', 'Hacking', 'CSS', 'Logic'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredGames = games.filter(game => {
    const categoryMatch = selectedCategory === 'All' || game.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || game.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const handlePlayGame = (gameId: string) => {
    console.log('Playing game:', gameId);
    
    // Update last played
    setPlayerStats(prev => ({
      ...prev,
      lastPlayed: new Date().toISOString(),
      gamesPlayed: prev.gamesPlayed + 1
    }));
    
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
      case 'password-cracker':
        window.location.href = '/games/password-cracker';
        break;
      default:
        alert(`Launching ${gameId}... Coming soon!`);
    }
  };

  const totalPossibleScore = games.reduce((sum, game) => sum + game.maxPoints, 0);

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
              <div className="text-3xl font-bold text-pink-500">5</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">3</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Categories</div>
            </div>
          </div>

          {/* Player Stats Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <button
              onClick={() => setShowStats(!showStats)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              {showStats ? 'Hide' : 'Show'} My Progress
            </button>
          </motion.div>
        </motion.div>

        {/* Player Stats Panel */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Stats Overview */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Your Progress
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {playerStats.totalScore}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Total Score</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {playerStats.gamesPlayed}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Games Played</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {Object.keys(playerStats.gameScores).length}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Games Completed</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                        {Math.round((playerStats.totalScore / totalPossibleScore) * 100)}%
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Completion</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <span>Overall Progress</span>
                      <span>{playerStats.totalScore} / {totalPossibleScore}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((playerStats.totalScore / totalPossibleScore) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Game Scores */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Game Scores
                  </h3>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {games.filter(game => playerStats.gameScores[game.id]).map((game, index) => (
                      <motion.div
                        key={game.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {game.title}
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {playerStats.gameScores[game.id]} / {game.maxPoints}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                    {Object.keys(playerStats.gameScores).length === 0 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                        No games completed yet. Start playing to see your scores!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
              <GameCard 
                game={game} 
                onPlay={handlePlayGame} 
                playerScore={playerStats.gameScores[game.id]}
              />
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