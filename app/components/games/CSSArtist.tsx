"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Code, 
  Zap,
  Eye,
  EyeOff,
  Sparkles,
  Target,
  Brush
} from "lucide-react";

/**
 * CSS Artist Game Component
 * 
 * A creative coding challenge where players write CSS to match target designs.
 * Players learn CSS properties, layout techniques, and responsive design.
 * 
 * Game Mechanics:
 * - Target design shown to player
 * - Player writes CSS to recreate the design
 * - Real-time preview of their CSS
 * - Scoring based on accuracy and creativity
 * 
 * Learning Objectives:
 * - CSS properties and values
 * - Layout techniques (Flexbox, Grid)
 * - Responsive design principles
 * - Creative problem-solving
 */

// CSS Challenges
const challenges = [
  {
    id: 1,
    title: "Colorful Button",
    description: "Create a beautiful gradient button with hover effects",
    targetHTML: `<button class="target-button">Click Me!</button>`,
    targetCSS: `background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
color: white;
border: none;
padding: 12px 24px;
border-radius: 8px;
font-weight: bold;
cursor: pointer;
transition: all 0.3s ease;
box-shadow: 0 4px 15px rgba(0,0,0,0.2);`,
    hint: "Try using linear-gradient for the background and transition for hover effects",
    difficulty: "Easy",
    points: 100
  },
  {
    id: 2,
    title: "Card Layout",
    description: "Create a responsive card with shadow and rounded corners",
    targetHTML: `<div class="target-card">
  <h3>Card Title</h3>
  <p>This is a beautiful card with shadow and rounded corners.</p>
</div>`,
    targetCSS: `background: white;
border-radius: 12px;
padding: 20px;
box-shadow: 0 8px 25px rgba(0,0,0,0.1);
border: 1px solid #e1e5e9;
transition: transform 0.3s ease;`,
    hint: "Use box-shadow for depth and border-radius for rounded corners",
    difficulty: "Medium",
    points: 200
  },
  {
    id: 3,
    title: "Flexbox Gallery",
    description: "Create a responsive image gallery using Flexbox",
    targetHTML: `<div class="target-gallery">
  <div class="gallery-item">1</div>
  <div class="gallery-item">2</div>
  <div class="gallery-item">3</div>
</div>`,
    targetCSS: `display: flex;
gap: 16px;
flex-wrap: wrap;
justify-content: center;`,
    hint: "Use display: flex and gap for spacing between items",
    difficulty: "Hard",
    points: 300
  }
];

const CSSArtist = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [playerCSS, setPlayerCSS] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showTarget, setShowTarget] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  const challenge = challenges[currentChallenge];

  // Check if CSS matches target
  const checkCSS = () => {
    setAttempts(prev => prev + 1);
    
    // Simple similarity check (in a real game, you'd use more sophisticated comparison)
    const playerCSSLower = playerCSS.toLowerCase();
    const targetCSSLower = challenge.targetCSS.toLowerCase();
    
    // Check for key properties
    const keyProperties = ['background', 'border-radius', 'padding', 'box-shadow', 'display', 'flex'];
    let matchScore = 0;
    
    keyProperties.forEach(prop => {
      if (playerCSSLower.includes(prop) && targetCSSLower.includes(prop)) {
        matchScore += 1;
      }
    });
    
    const similarity = matchScore / keyProperties.length;
    
    if (similarity >= 0.6) {
      setIsSuccess(true);
      setScore(prev => prev + challenge.points);
      return "🎉 Excellent! Your CSS closely matches the target design!";
    } else if (similarity >= 0.3) {
      return "Good effort! Try to match more of the key properties.";
    } else {
      return "Keep trying! Look at the target design and hint for guidance.";
    }
  };

  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setCurrentChallenge(0);
    setScore(0);
    setAttempts(0);
    setIsSuccess(false);
    setShowHint(false);
    setPlayerCSS("");
  };

  // Next challenge
  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setIsSuccess(false);
      setShowHint(false);
      setPlayerCSS("");
    } else {
      // Game completed
      setIsPlaying(false);
    }
  };

  // Reset current challenge
  const resetChallenge = () => {
    setIsSuccess(false);
    setShowHint(false);
    setPlayerCSS("");
  };

  // Create preview HTML with player's CSS
  const getPreviewHTML = () => {
    return `
      <style>
        .preview-element {
          ${playerCSS}
        }
      </style>
      ${challenge.targetHTML.replace('target-', 'preview-')}
    `;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Palette className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl font-bold gradient-text">CSS Artist</h1>
          </motion.div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Create beautiful designs using only CSS! Match the target designs and unleash your creativity! 🎨
          </p>
        </div>

        {!isPlaying ? (
          // Start Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                Ready to Create?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Express your creativity through CSS! Learn layout techniques, animations, and responsive design 
                while creating beautiful visual elements.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-pink-500">3</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Challenges</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">600</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Points</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">∞</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Creativity</div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Creating
              </button>
            </div>
          </motion.div>
        ) : (
          // Game Interface
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Challenge Area */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                  Challenge {currentChallenge + 1}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Score: {score}
                  </span>
                  <button
                    onClick={resetChallenge}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
                    title="Reset Challenge"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Challenge Info */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {challenge.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {challenge.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    challenge.difficulty === 'Easy' ? 'text-green-500 bg-green-100 dark:bg-green-900/20' :
                    challenge.difficulty === 'Medium' ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20' :
                    'text-red-500 bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Points: {challenge.points}
                  </span>
                </div>
              </div>

              {/* Target HTML */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">HTML Structure:</h4>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  {challenge.targetHTML}
                </div>
              </div>

              {/* CSS Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Your CSS:
                </label>
                <textarea
                  value={playerCSS}
                  onChange={(e) => setPlayerCSS(e.target.value)}
                  placeholder="Write your CSS here..."
                  className="w-full h-32 p-4 bg-slate-900 text-blue-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {previewMode ? "Hide" : "Show"} Preview
                </button>
                <button
                  onClick={checkCSS}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Check CSS
                </button>
              </div>

              {/* Hint */}
              <div className="mt-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm text-pink-500 hover:text-pink-600 transition-colors"
                >
                  {showHint ? "Hide" : "Show"} Hint
                </button>
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-700"
                    >
                      <p className="text-sm text-pink-700 dark:text-pink-300">
                        💡 {challenge.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Preview Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Preview</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTarget(!showTarget)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                    title="Toggle Target View"
                  >
                    <Target className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Target Design */}
              <AnimatePresence>
                {showTarget && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg"
                  >
                    <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Target Design:</h4>
                    <div 
                      className="border-2 border-dashed border-slate-300 dark:border-slate-600 p-4 rounded-lg"
                      dangerouslySetInnerHTML={{
                        __html: `
                          <style>
                            .target-button, .target-card, .target-gallery {
                              ${challenge.targetCSS}
                            }
                            .gallery-item {
                              width: 60px;
                              height: 60px;
                              background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                              color: white;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              border-radius: 8px;
                              font-weight: bold;
                            }
                          </style>
                          ${challenge.targetHTML}
                        `
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Player Preview */}
              <AnimatePresence>
                {previewMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg"
                  >
                    <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Your Design:</h4>
                    <div 
                      className="border-2 border-dashed border-pink-300 dark:border-pink-600 p-4 rounded-lg"
                      dangerouslySetInnerHTML={{
                        __html: `
                          <style>
                            .preview-button, .preview-card, .preview-gallery {
                              ${playerCSS}
                            }
                            .gallery-item {
                              width: 60px;
                              height: 60px;
                              background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                              color: white;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              border-radius: 8px;
                              font-weight: bold;
                            }
                          </style>
                          ${challenge.targetHTML.replace('target-', 'preview-')}
                        `
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Message */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-800 dark:text-green-200">
                        Challenge Completed!
                      </span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                      Beautiful work! Your CSS design matches the target perfectly.
                    </p>
                    <button
                      onClick={nextChallenge}
                      className="btn-primary text-sm"
                    >
                      Next Challenge
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CSS Tips */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-2 mb-2">
                  <Brush className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">CSS Tips</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Use properties like background, border-radius, padding, box-shadow, and display to create beautiful designs!
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Game Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            How to Play
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🎨 Objective</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Write CSS code to recreate the target designs and unleash your creativity.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">💻 Techniques</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Practice CSS properties, layouts, animations, and responsive design principles.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🏆 Scoring</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Earn points for accurate designs and creative solutions. Higher difficulty = more points!
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">✨ Creativity</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Experiment with different CSS properties and create unique visual effects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CSSArtist; 