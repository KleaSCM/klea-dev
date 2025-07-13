"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  Unlock, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Zap,
  Eye,
  EyeOff,
  AlertTriangle,
  Search,
  Shield,
  Key,
  Clock,
  Target,
  Hash,
  Cpu,
  Database,
  Code,
  Settings,
  FileText,
  Plus,
  Trash2
} from "lucide-react";

/**
 * Password Cracker Game Component
 * 
 * An interactive cybersecurity challenge where players write their own attack scripts.
 * Players learn about password security by creating brute force and dictionary attacks.
 * 
 * Game Mechanics:
 * - Write custom attack scripts in JavaScript
 * - Create and manage custom password dictionaries
 * - Configure brute force parameters (character sets, length, start point)
 * - Real-time script execution and debugging
 * - Educational feedback on attack effectiveness
 * 
 * Learning Objectives:
 * - JavaScript programming for security testing
 * - Password attack methodologies
 * - Script optimization and efficiency
 * - Cybersecurity awareness and ethical hacking
 */

// Password challenges with different complexity levels
const passwordChallenges = [
  {
    id: 1,
    title: "Simple PIN",
    description: "Crack a 4-digit PIN. Write a brute force script to try all combinations.",
    password: "1234",
    difficulty: "Easy",
    points: 100,
    hint: "Try using nested loops to generate all 4-digit combinations",
    securityLesson: "Simple numeric passwords are easily cracked by brute force attacks",
    template: `// Brute Force Script Template
function bruteForceAttack() {
  // TODO: Write your brute force logic here
  // Try all combinations from 0000 to 9999
  
  for (let i = 0; i <= 9999; i++) {
    const attempt = i.toString().padStart(4, '0');
    
    // Check if this is the correct password
    if (checkPassword(attempt)) {
      return attempt;
    }
  }
  
  return null;
}

// Helper function to check password
function checkPassword(attempt) {
  return attempt === targetPassword;
}

// Start the attack
const result = bruteForceAttack();
if (result) {
  console.log("Password found:", result);
} else {
  console.log("Password not found");
}`
  },
  {
    id: 2,
    title: "Word Password",
    description: "Crack a dictionary-based password. Create a custom word list and attack script.",
    password: "password",
    difficulty: "Medium",
    points: 200,
    hint: "Create a list of common words and try them systematically",
    securityLesson: "Dictionary attacks can quickly crack common word passwords",
    template: `// Dictionary Attack Script Template
function dictionaryAttack() {
  // TODO: Create your custom word list
  const wordList = [
    "password", "123456", "admin", "user", "test",
    // Add more words here...
  ];
  
  for (const word of wordList) {
    if (checkPassword(word)) {
      return word;
    }
  }
  
  return null;
}

// Helper function to check password
function checkPassword(attempt) {
  return attempt === targetPassword;
}

// Start the attack
const result = dictionaryAttack();
if (result) {
  console.log("Password found:", result);
} else {
  console.log("Password not found");
}`
  },
  {
    id: 3,
    title: "Complex Password",
    description: "Crack a mixed-character password. Write an advanced attack with custom character sets.",
    password: "P@ssw0rd!",
    difficulty: "Hard",
    points: 300,
    hint: "Use character substitution and common patterns",
    securityLesson: "Complex passwords with mixed characters are much harder to crack",
    template: `// Advanced Attack Script Template
function advancedAttack() {
  // TODO: Write your advanced attack logic
  // Try common substitutions: @ for a, 0 for o, ! for i, etc.
  
  const substitutions = {
    'a': '@', 'o': '0', 'i': '!', 's': '$', 'e': '3'
  };
  
  const baseWords = ["password", "admin", "user", "test"];
  
  for (const word of baseWords) {
    // Try original word
    if (checkPassword(word)) return word;
    
    // Try with substitutions
    let modified = word;
    for (const [original, sub] of Object.entries(substitutions)) {
      modified = modified.replace(new RegExp(original, 'g'), sub);
    }
    if (checkPassword(modified)) return modified;
    
    // Try with capitalization
    if (checkPassword(word.charAt(0).toUpperCase() + word.slice(1))) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
  
  return null;
}

// Helper function to check password
function checkPassword(attempt) {
  return attempt === targetPassword;
}

// Start the attack
const result = advancedAttack();
if (result) {
  console.log("Password found:", result);
} else {
  console.log("Password not found");
}`
  }
];

// Character sets for brute force attacks
const characterSets = {
  numbers: "0123456789",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  alphanumeric: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

const PasswordCracker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [playerScript, setPlayerScript] = useState("");
  const [customDictionary, setCustomDictionary] = useState<string[]>([]);
  const [newWord, setNewWord] = useState("");
  const [bruteForceConfig, setBruteForceConfig] = useState({
    charset: "numbers",
    minLength: 1,
    maxLength: 4,
    startFrom: ""
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSecurityLesson, setShowSecurityLesson] = useState(false);
  const [attackStats, setAttackStats] = useState({
    attempts: 0,
    speed: 0,
    startTime: 0
  });
  const [foundPassword, setFoundPassword] = useState("");

  const challenge = passwordChallenges[currentChallenge];

  // Initialize player script with template
  useEffect(() => {
    if (isPlaying) {
      setPlayerScript(challenge.template);
      setExecutionResult("");
      setIsSuccess(false);
      setShowHint(false);
      setShowSecurityLesson(false);
      setAttackStats({ attempts: 0, speed: 0, startTime: 0 });
      setFoundPassword("");
      setCustomDictionary([]);
    }
  }, [currentChallenge, isPlaying]);

  // Execute player's attack script
  const executeScript = useCallback(async () => {
    setIsExecuting(true);
    setExecutionResult("");
    setAttackStats({ attempts: 0, speed: 0, startTime: Date.now() });
    setFoundPassword("");

    try {
      // Create sandboxed environment
      const sandbox = {
        console: {
          log: (...args: any[]) => {
            setExecutionResult(prev => prev + args.join(' ') + '\n');
          }
        },
        targetPassword: challenge.password,
        checkPassword: (attempt: string) => {
          setAttackStats(prev => ({
            ...prev,
            attempts: prev.attempts + 1,
            speed: Math.round((prev.attempts + 1) / ((Date.now() - prev.startTime) / 1000))
          }));
          return attempt === challenge.password;
        },
        // Character sets for brute force
        characterSets,
        // Custom dictionary
        customDictionary,
        // Brute force configuration
        bruteForceConfig
      };

      // Execute the script
      const scriptFunction = new Function(
        'console', 'targetPassword', 'checkPassword', 'characterSets', 'customDictionary', 'bruteForceConfig',
        playerScript
      );
      
      const result = scriptFunction(
        sandbox.console, 
        sandbox.targetPassword, 
        sandbox.checkPassword, 
        sandbox.characterSets, 
        sandbox.customDictionary, 
        sandbox.bruteForceConfig
      );

      if (result) {
        setIsSuccess(true);
        setFoundPassword(result);
        setScore(prev => prev + challenge.points);
        setExecutionResult(prev => prev + `\n🎉 Password found: ${result}`);
      } else {
        setExecutionResult(prev => prev + `\n❌ Password not found. Try a different approach!`);
      }

    } catch (error) {
      setExecutionResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}\n\n💡 Tip: Check your JavaScript syntax and make sure all variables are defined.`);
    }

    setIsExecuting(false);
  }, [playerScript, challenge, customDictionary, bruteForceConfig]);

  // Add word to custom dictionary
  const addWordToDictionary = () => {
    if (newWord.trim() && !customDictionary.includes(newWord.trim())) {
      setCustomDictionary(prev => [...prev, newWord.trim()]);
      setNewWord("");
    }
  };

  // Remove word from custom dictionary
  const removeWordFromDictionary = (word: string) => {
    setCustomDictionary(prev => prev.filter(w => w !== word));
  };

  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setCurrentChallenge(0);
    setScore(0);
  };

  // Next challenge
  const nextChallenge = () => {
    if (currentChallenge < passwordChallenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setIsSuccess(false);
      setShowHint(false);
      setShowSecurityLesson(false);
      setExecutionResult("");
      setFoundPassword("");
      setCustomDictionary([]);
    } else {
      setIsPlaying(false);
    }
  };

  // Reset current challenge
  const resetChallenge = () => {
    setIsSuccess(false);
    setShowHint(false);
    setShowSecurityLesson(false);
    setExecutionResult("");
    setFoundPassword("");
    setCustomDictionary([]);
    setPlayerScript(challenge.template);
    setAttackStats({ attempts: 0, speed: 0, startTime: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20 p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Lock className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold gradient-text">Password Cracker</h1>
          </motion.div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Write your own attack scripts! Learn cybersecurity by creating brute force and dictionary attacks. 🔐
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
                Ready to Code Attacks?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Write your own JavaScript attack scripts! Create brute force algorithms, 
                build custom dictionaries, and learn real cybersecurity techniques.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-500">3</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Challenges</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-500">600</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Points</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-500">∞</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Custom Scripts</div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Coding
              </button>
            </div>
          </motion.div>
        ) : (
          // Game Interface
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Script Editor */}
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
                    challenge.difficulty === 'Medium' ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-100/20' :
                    'text-red-500 bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Points: {challenge.points}
                  </span>
                </div>
              </div>

              {/* Script Editor */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Your Attack Script:
                </label>
                <textarea
                  value={playerScript}
                  onChange={(e) => setPlayerScript(e.target.value)}
                  placeholder="Write your JavaScript attack script here..."
                  className="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Execute Button */}
              <button
                onClick={executeScript}
                disabled={isExecuting}
                className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                {isExecuting ? "Executing..." : "Execute Script"}
              </button>

              {/* Hint */}
              <div className="mt-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
                >
                  {showHint ? "Hide" : "Show"} Hint
                </button>
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700"
                    >
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        💡 {challenge.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Tools and Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Custom Dictionary */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Custom Dictionary
                </h3>
                
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="Add word to dictionary..."
                    className="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addWordToDictionary()}
                  />
                  <button
                    onClick={addWordToDictionary}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {customDictionary.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Words: {customDictionary.length}
                    </p>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {customDictionary.map((word, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700 rounded">
                          <span className="text-sm font-mono">{word}</span>
                          <button
                            onClick={() => removeWordFromDictionary(word)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Brute Force Configuration */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Brute Force Config
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Character Set:
                    </label>
                    <select
                      value={bruteForceConfig.charset}
                      onChange={(e) => setBruteForceConfig(prev => ({ ...prev, charset: e.target.value }))}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="numbers">Numbers (0-9)</option>
                      <option value="lowercase">Lowercase (a-z)</option>
                      <option value="uppercase">Uppercase (A-Z)</option>
                      <option value="alphanumeric">Alphanumeric (0-9, a-z, A-Z)</option>
                      <option value="symbols">Symbols (!@#$%^&*)</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Min Length:
                      </label>
                      <input
                        type="number"
                        value={bruteForceConfig.minLength}
                        onChange={(e) => setBruteForceConfig(prev => ({ ...prev, minLength: parseInt(e.target.value) }))}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        min="1"
                        max="8"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Max Length:
                      </label>
                      <input
                        type="number"
                        value={bruteForceConfig.maxLength}
                        onChange={(e) => setBruteForceConfig(prev => ({ ...prev, maxLength: parseInt(e.target.value) }))}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        min="1"
                        max="8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Execution Results */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Execution Results
                </h3>

                {/* Attack Stats */}
                {attackStats.attempts > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Attempts</div>
                      <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{attackStats.attempts.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Speed</div>
                      <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{attackStats.speed.toLocaleString()}/s</div>
                    </div>
                  </div>
                )}

                {/* Console Output */}
                {executionResult && (
                  <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Console Output:</h4>
                    <pre className="text-sm text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap">{executionResult}</pre>
                  </div>
                )}

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
                        <Unlock className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-800 dark:text-green-200">
                          Password Cracked!
                        </span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                        Great job! Your script successfully found the password: <strong>{foundPassword}</strong>
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

                {/* Security Lesson */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowSecurityLesson(!showSecurityLesson)}
                    className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {showSecurityLesson ? "Hide" : "Show"} Security Lesson
                  </button>
                  <AnimatePresence>
                    {showSecurityLesson && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
                      >
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          🔒 {challenge.securityLesson}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🎯 Objective</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Write JavaScript scripts to crack passwords using different attack methods.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">💻 Scripting</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Create custom attack scripts, build dictionaries, and configure brute force parameters.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🏆 Scoring</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Earn points for successfully cracking passwords. Higher difficulty = more points!
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🛡️ Learning</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Understand password security and learn real cybersecurity techniques.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PasswordCracker; 