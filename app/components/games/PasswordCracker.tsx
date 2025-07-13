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
  Database
} from "lucide-react";

/**
 * Password Cracker Game Component
 * 
 * A cybersecurity challenge where players crack passwords using various attack methods.
 * Players learn about password security, brute force attacks, and dictionary attacks.
 * 
 * Game Mechanics:
 * - Multiple password cracking methods (brute force, dictionary, hybrid)
 * - Real-time attack simulation with progress tracking
 * - Password strength analysis and feedback
 * - Educational content about cybersecurity
 * 
 * Learning Objectives:
 * - Password security principles
 * - Common attack vectors
 * - Password strength assessment
 * - Cybersecurity awareness
 */

// Password challenges with different complexity levels
const passwordChallenges = [
  {
    id: 1,
    title: "Simple Password",
    description: "Crack a basic 4-digit PIN using brute force",
    password: "1234",
    difficulty: "Easy",
    points: 100,
    maxAttempts: 10000,
    attackMethods: ["brute_force"],
    hint: "Try starting with common patterns like 1234, 0000, 1111",
    securityLesson: "Simple numeric passwords are easily cracked by brute force attacks"
  },
  {
    id: 2,
    title: "Word Password",
    description: "Crack a dictionary-based password",
    password: "password",
    difficulty: "Medium",
    points: 200,
    maxAttempts: 50000,
    attackMethods: ["dictionary", "brute_force"],
    hint: "Common words like 'password', 'admin', 'user' are often used",
    securityLesson: "Dictionary attacks can quickly crack common word passwords"
  },
  {
    id: 3,
    title: "Complex Password",
    description: "Crack a mixed-character password with special symbols",
    password: "P@ssw0rd!",
    difficulty: "Hard",
    points: 300,
    maxAttempts: 100000,
    attackMethods: ["hybrid", "brute_force"],
    hint: "Look for common substitutions: @ for a, 0 for o, ! for i",
    securityLesson: "Complex passwords with mixed characters are much harder to crack"
  }
];

// Dictionary of common passwords for dictionary attacks
const commonPasswords = [
  "password", "123456", "123456789", "qwerty", "abc123", "password123",
  "admin", "user", "guest", "test", "demo", "welcome", "login", "secret",
  "letmein", "monkey", "dragon", "master", "hello", "freedom", "whatever",
  "qwerty123", "trustno1", "jordan", "hunter", "buster", "thomas", "tigger",
  "robert", "soccer", "batman", "test123", "pass", "admin123", "123123",
  "welcome123", "login123", "abc123", "111111", "1234567", "12345678"
];

// Character sets for brute force attacks
const characterSets = {
  numbers: "0123456789",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

const PasswordCracker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [attackMethod, setAttackMethod] = useState("brute_force");
  const [isAttacking, setIsAttacking] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSecurityLesson, setShowSecurityLesson] = useState(false);
  const [attackProgress, setAttackProgress] = useState(0);
  const [attackSpeed, setAttackSpeed] = useState(0);
  const [foundPasswords, setFoundPasswords] = useState<string[]>([]);

  const challenge = passwordChallenges[currentChallenge];

  // Initialize game state
  useEffect(() => {
    if (isPlaying) {
      setMaxAttempts(challenge.maxAttempts);
      setAttempts(0);
      setIsSuccess(false);
      setShowHint(false);
      setShowSecurityLesson(false);
      setAttackProgress(0);
      setAttackSpeed(0);
      setFoundPasswords([]);
      setCurrentAttempt("");
    }
  }, [currentChallenge, isPlaying]);

  // Generate brute force attempts
  const generateBruteForceAttempts = useCallback((length: number, charset: string) => {
    const attempts: string[] = [];
    const charsetArray = charset.split('');
    
    // Generate combinations up to a reasonable limit
    const maxCombinations = Math.min(1000, Math.pow(charsetArray.length, length));
    
    for (let i = 0; i < maxCombinations; i++) {
      let attempt = "";
      let temp = i;
      
      for (let j = 0; j < length; j++) {
        attempt = charsetArray[temp % charsetArray.length] + attempt;
        temp = Math.floor(temp / charsetArray.length);
      }
      
      attempts.push(attempt);
    }
    
    return attempts;
  }, []);

  // Simulate attack with realistic timing
  const simulateAttack = useCallback(async () => {
    setIsAttacking(true);
    setAttackProgress(0);
    setAttackSpeed(0);
    
    const startTime = Date.now();
    let attemptsMade = 0;
    const targetPassword = challenge.password;
    
    // Attack simulation with different methods
    if (attackMethod === "brute_force") {
      // Brute force attack
      const charset = characterSets.numbers + characterSets.lowercase + characterSets.uppercase;
      const maxLength = Math.min(6, targetPassword.length + 2);
      
      for (let length = 1; length <= maxLength; length++) {
        const combinations = generateBruteForceAttempts(length, charset);
        
        for (const attempt of combinations) {
          attemptsMade++;
          setCurrentAttempt(attempt);
          setAttempts(attemptsMade);
          
          // Update progress
          const progress = (attemptsMade / maxAttempts) * 100;
          setAttackProgress(Math.min(progress, 100));
          
          // Calculate attack speed
          const elapsed = (Date.now() - startTime) / 1000;
          setAttackSpeed(Math.round(attemptsMade / elapsed));
          
          // Check if password found
          if (attempt === targetPassword) {
            setIsSuccess(true);
            setScore(prev => prev + challenge.points);
            setFoundPasswords(prev => [...prev, attempt]);
            break;
          }
          
          // Add realistic delay
          await new Promise(resolve => setTimeout(resolve, 10));
          
          if (attemptsMade >= maxAttempts) break;
        }
        
        if (isSuccess || attemptsMade >= maxAttempts) break;
      }
    } else if (attackMethod === "dictionary") {
      // Dictionary attack
      const dictionary = [...commonPasswords, ...generateBruteForceAttempts(4, characterSets.numbers)];
      
      for (const attempt of dictionary) {
        attemptsMade++;
        setCurrentAttempt(attempt);
        setAttempts(attemptsMade);
        
        // Update progress
        const progress = (attemptsMade / maxAttempts) * 100;
        setAttackProgress(Math.min(progress, 100));
        
        // Calculate attack speed
        const elapsed = (Date.now() - startTime) / 1000;
        setAttackSpeed(Math.round(attemptsMade / elapsed));
        
        // Check if password found
        if (attempt === targetPassword) {
          setIsSuccess(true);
          setScore(prev => prev + challenge.points);
          setFoundPasswords(prev => [...prev, attempt]);
          break;
        }
        
        // Add realistic delay
        await new Promise(resolve => setTimeout(resolve, 20));
        
        if (attemptsMade >= maxAttempts) break;
      }
    } else if (attackMethod === "hybrid") {
      // Hybrid attack - combine dictionary and brute force
      const hybridAttempts = [
        ...commonPasswords,
        ...generateBruteForceAttempts(4, characterSets.numbers),
        ...generateBruteForceAttempts(3, characterSets.lowercase + characterSets.uppercase)
      ];
      
      for (const attempt of hybridAttempts) {
        attemptsMade++;
        setCurrentAttempt(attempt);
        setAttempts(attemptsMade);
        
        // Update progress
        const progress = (attemptsMade / maxAttempts) * 100;
        setAttackProgress(Math.min(progress, 100));
        
        // Calculate attack speed
        const elapsed = (Date.now() - startTime) / 1000;
        setAttackSpeed(Math.round(attemptsMade / elapsed));
        
        // Check if password found
        if (attempt === targetPassword) {
          setIsSuccess(true);
          setScore(prev => prev + challenge.points);
          setFoundPasswords(prev => [...prev, attempt]);
          break;
        }
        
        // Add realistic delay
        await new Promise(resolve => setTimeout(resolve, 15));
        
        if (attemptsMade >= maxAttempts) break;
      }
    }
    
    setIsAttacking(false);
  }, [attackMethod, challenge, maxAttempts, generateBruteForceAttempts, isSuccess]);

  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setCurrentChallenge(0);
    setScore(0);
    setAttackMethod("brute_force");
  };

  // Next challenge
  const nextChallenge = () => {
    if (currentChallenge < passwordChallenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setIsSuccess(false);
      setShowHint(false);
      setShowSecurityLesson(false);
      setAttackProgress(0);
      setAttackSpeed(0);
      setFoundPasswords([]);
      setCurrentAttempt("");
      setAttempts(0);
    } else {
      // Game completed
      setIsPlaying(false);
    }
  };

  // Reset current challenge
  const resetChallenge = () => {
    setIsSuccess(false);
    setShowHint(false);
    setShowSecurityLesson(false);
    setAttackProgress(0);
    setAttackSpeed(0);
    setFoundPasswords([]);
    setCurrentAttempt("");
    setAttempts(0);
    setIsAttacking(false);
  };

  // Get attack method description
  const getAttackMethodDescription = (method: string) => {
    switch (method) {
      case "brute_force":
        return "Systematically tries all possible combinations";
      case "dictionary":
        return "Uses a list of common passwords and words";
      case "hybrid":
        return "Combines dictionary and brute force approaches";
      default:
        return "";
    }
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
            Learn about password security by simulating cyber attacks! Understand how passwords can be compromised. 🔐
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
                Ready to Crack?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Experience different password cracking techniques and learn about cybersecurity! 
                This is for educational purposes only.
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
                  <div className="text-2xl font-bold text-yellow-500">3</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Attack Methods</div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Cracking
              </button>
            </div>
          </motion.div>
        ) : (
          // Game Interface
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Attack Control Panel */}
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

              {/* Attack Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Attack Method:
                </label>
                <select
                  value={attackMethod}
                  onChange={(e) => setAttackMethod(e.target.value)}
                  disabled={isAttacking}
                  className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="brute_force">Brute Force Attack</option>
                  <option value="dictionary">Dictionary Attack</option>
                  <option value="hybrid">Hybrid Attack</option>
                </select>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {getAttackMethodDescription(attackMethod)}
                </p>
              </div>

              {/* Attack Controls */}
              <div className="space-y-4">
                <button
                  onClick={simulateAttack}
                  disabled={isAttacking}
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Zap className="w-4 h-4" />
                  {isAttacking ? "Attacking..." : "Start Attack"}
                </button>

                {/* Hint */}
                <div>
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
              </div>
            </motion.div>

            {/* Attack Monitor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Attack Monitor</h2>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-slate-500" />
                </div>
              </div>

              {/* Attack Progress */}
              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(attackProgress)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${attackProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Attack Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Attempts</div>
                    <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{attempts.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Speed</div>
                    <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{attackSpeed.toLocaleString()}/s</div>
                  </div>
                </div>

                {/* Current Attempt */}
                {currentAttempt && (
                  <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Current Attempt:</div>
                    <div className="font-mono text-lg text-slate-800 dark:text-slate-200">{currentAttempt}</div>
                  </div>
                )}

                {/* Found Passwords */}
                {foundPasswords.length > 0 && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Unlock className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-green-800 dark:text-green-200">Password Found!</span>
                    </div>
                    <div className="font-mono text-lg text-green-700 dark:text-green-300">
                      {foundPasswords[foundPasswords.length - 1]}
                    </div>
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
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-800 dark:text-green-200">
                          Password Cracked!
                        </span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                        Great job! You successfully cracked the password.
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
                <div className="mt-6">
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
                Crack passwords using different attack methods to understand cybersecurity.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🔐 Methods</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Use brute force, dictionary, and hybrid attacks to find passwords.
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
                Understand password security and why strong passwords matter.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PasswordCracker; 