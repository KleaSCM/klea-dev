"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Code, 
  Zap,
  Shield,
  AlertTriangle,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from "lucide-react";

/**
 * SQL Injection Challenge Game Component
 * 
 * An educational game where players practice SQL injection techniques on a simulated database.
 * Players learn about security vulnerabilities, input validation, and proper sanitization.
 * 
 * Game Mechanics:
 * - Simulated database with fake user data
 * - Players write SQL queries to extract information
 * - Different difficulty levels with various injection techniques
 * - Educational feedback on security implications
 * 
 * Learning Objectives:
 * - Understanding SQL injection vulnerabilities
 * - Learning proper input validation
 * - Practicing secure coding practices
 * - Recognizing common attack patterns
 */

// Fake database for the game
const fakeDatabase = {
  users: [
    { id: 1, username: "admin", email: "admin@company.com", role: "administrator", password: "hashed_password_123" },
    { id: 2, username: "john_doe", email: "john@company.com", role: "user", password: "hashed_password_456" },
    { id: 3, username: "jane_smith", email: "jane@company.com", role: "manager", password: "hashed_password_789" },
    { id: 4, username: "bob_wilson", email: "bob@company.com", role: "user", password: "hashed_password_abc" },
    { id: 5, username: "alice_jones", email: "alice@company.com", role: "user", password: "hashed_password_def" }
  ],
  products: [
    { id: 1, name: "Laptop", price: 999.99, category: "electronics" },
    { id: 2, name: "Phone", price: 599.99, category: "electronics" },
    { id: 3, name: "Book", price: 19.99, category: "books" },
    { id: 4, name: "Chair", price: 149.99, category: "furniture" },
    { id: 5, name: "Table", price: 299.99, category: "furniture" }
  ]
};

// Challenge levels
const challenges = [
  {
    id: 1,
    title: "Basic Injection",
    description: "Extract all user data using a simple SQL injection",
    hint: "Try using ' OR '1'='1 in the username field",
    query: "SELECT * FROM users WHERE username = ?",
    difficulty: "Easy",
    points: 100
  },
  {
    id: 2,
    title: "Union Attack",
    description: "Use UNION to extract data from another table",
    hint: "Try using UNION SELECT to get product information",
    query: "SELECT username, email FROM users WHERE username = ?",
    difficulty: "Medium",
    points: 200
  },
  {
    id: 3,
    title: "Blind Injection",
    description: "Extract admin password using boolean-based injection",
    hint: "Use AND and OR conditions to guess the password",
    query: "SELECT * FROM users WHERE username = ? AND password = ?",
    difficulty: "Hard",
    points: 300
  }
];

const SQLInjection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [queryResult, setQueryResult] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [securityLevel, setSecurityLevel] = useState("low"); // low, medium, high
  const [showDatabase, setShowDatabase] = useState(false);

  const challenge = challenges[currentChallenge];

  // Simulate SQL query execution
  const executeQuery = (input: string) => {
    setAttempts(prev => prev + 1);
    
    try {
      // Simulate different security levels
      let sanitizedInput = input;
      
      if (securityLevel === "medium") {
        // Basic sanitization - remove common SQL keywords
        sanitizedInput = input.replace(/['";]/g, "");
      } else if (securityLevel === "high") {
        // Advanced sanitization - parameterized queries
        sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "");
      }

      // Simulate the vulnerable query
      let result = "";
      
      if (challenge.id === 1) {
        // Basic injection challenge
        if (input.includes("' OR '1'='1") || input.includes("' OR 1=1")) {
          result = "SUCCESS: All users extracted!\n" + JSON.stringify(fakeDatabase.users, null, 2);
          setIsSuccess(true);
          setScore(prev => prev + challenge.points);
        } else {
          result = "Query executed but no sensitive data extracted. Try a different approach!";
        }
      } else if (challenge.id === 2) {
        // Union attack challenge
        if (input.includes("UNION SELECT") || input.includes("union select")) {
          result = "SUCCESS: Union attack successful!\n" + JSON.stringify(fakeDatabase.products, null, 2);
          setIsSuccess(true);
          setScore(prev => prev + challenge.points);
        } else {
          result = "Query executed but union attack failed. Try using UNION SELECT!";
        }
      } else if (challenge.id === 3) {
        // Blind injection challenge
        if (input.includes("admin") && input.includes("' OR '1'='1")) {
          result = "SUCCESS: Admin password extracted!\nPassword: admin123";
          setIsSuccess(true);
          setScore(prev => prev + challenge.points);
        } else {
          result = "Query executed but blind injection failed. Try targeting admin user!";
        }
      }

      setQueryResult(result);
    } catch (error) {
      setQueryResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setCurrentChallenge(0);
    setScore(0);
    setAttempts(0);
    setQueryResult("");
    setIsSuccess(false);
    setShowHint(false);
    setShowSolution(false);
    setUserInput("");
  };

  // Next challenge
  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setIsSuccess(false);
      setQueryResult("");
      setShowHint(false);
      setShowSolution(false);
      setUserInput("");
    } else {
      // Game completed
      setIsPlaying(false);
    }
  };

  // Reset current challenge
  const resetChallenge = () => {
    setIsSuccess(false);
    setQueryResult("");
    setShowHint(false);
    setShowSolution(false);
    setUserInput("");
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
            <Database className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold gradient-text">SQL Injection Challenge</h1>
          </motion.div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Practice SQL injection techniques on a simulated database. Learn about security vulnerabilities and prevention! 🔒
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
                Ready to Hack?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                This is a safe, educational environment to learn about SQL injection attacks. 
                Practice different techniques and understand how to prevent them.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">3</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Challenges</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">600</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Points</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">3</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Difficulty Levels</div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Challenge
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

              {/* Query Display */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Vulnerable Query:</h4>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  {challenge.query}
                </div>
              </div>

              {/* Input Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Your SQL Injection:
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter your injection payload..."
                  className="w-full p-3 bg-slate-900 text-green-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Execute Button */}
              <button
                onClick={() => executeQuery(userInput)}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Execute Query
              </button>

              {/* Hint */}
              <div className="mt-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm text-purple-500 hover:text-purple-600 transition-colors"
                >
                  {showHint ? "Hide" : "Show"} Hint
                </button>
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
                    >
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        💡 {challenge.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Results Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Results</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDatabase(!showDatabase)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                    title="Toggle Database View"
                  >
                    {showDatabase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Database Schema */}
              <AnimatePresence>
                {showDatabase && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg"
                  >
                    <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Database Schema:</h4>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <div><strong>users</strong> table: id, username, email, role, password</div>
                      <div><strong>products</strong> table: id, name, price, category</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Query Result */}
              {queryResult && (
                <div className={`p-4 rounded-lg border ${
                  isSuccess
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200'
                    : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isSuccess ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Code className="w-4 h-4 text-slate-500" />
                    )}
                    <span className="font-medium">Query Result:</span>
                  </div>
                  <pre className="text-sm whitespace-pre-wrap font-mono">{queryResult}</pre>
                </div>
              )}

              {/* Success Message */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-800 dark:text-green-200">
                        Challenge Completed!
                      </span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                      Great job! You successfully exploited the SQL injection vulnerability.
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

              {/* Security Warning */}
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-red-800 dark:text-red-200">Security Warning</span>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  This is a simulated environment for educational purposes. 
                  Never attempt SQL injection on real systems without permission!
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
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🎯 Objective</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Use SQL injection techniques to extract sensitive data from the simulated database.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">💻 Techniques</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Practice UNION attacks, boolean-based injection, and other common SQL injection methods.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🏆 Scoring</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Earn points for each successful injection. Higher difficulty = more points!
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🔒 Learning</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Understand how to prevent these attacks in your own applications.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SQLInjection; 