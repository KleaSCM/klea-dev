"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bug, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Code, 
  Zap,
  Eye,
  EyeOff,
  AlertTriangle,
  Search,
  Wrench
} from "lucide-react";

/**
 * Code Debugger Game Component
 * 
 * A debugging challenge where players find and fix bugs in JavaScript code.
 * Players learn debugging techniques, error handling, and code quality.
 * 
 * Game Mechanics:
 * - Buggy code presented to player
 * - Player identifies and fixes issues
 * - Real-time code execution and testing
 * - Scoring based on bug detection and fixes
 * 
 * Learning Objectives:
 * - JavaScript debugging techniques
 * - Common programming errors
 * - Code quality and best practices
 * - Problem-solving skills
 */

// Debugging Challenges
const challenges = [
  {
    id: 1,
    title: "Variable Scope Bug",
    description: "Fix the variable scope issue in this function",
    buggyCode: `function calculateSum(a, b) {
  var result = a + b;
  console.log("The sum is: " + result);
  return result;
}

var total = calculateSum(5, 3);
console.log("Total: " + total);
console.log("Result: " + result); // This line has a bug!`,
    fixedCode: `function calculateSum(a, b) {
  var result = a + b;
  console.log("The sum is: " + result);
  return result;
}

var total = calculateSum(5, 3);
console.log("Total: " + total);
// console.log("Result: " + result); // Fixed: result is not in scope`,
    hint: "The variable 'result' is only available inside the function scope",
    difficulty: "Easy",
    points: 100,
    bugs: ["Variable scope error - 'result' not accessible outside function"]
  },
  {
    id: 2,
    title: "Array Method Bug",
    description: "Fix the array method usage in this code",
    buggyCode: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
  return num * 2;
});
console.log("Doubled numbers: " + doubled);

const filtered = numbers.filter(function(num) {
  return num > 2;
});
console.log("Filtered numbers: " + filtered);

const sum = numbers.reduce(function(acc, num) {
  return acc + num;
}); // Missing initial value
console.log("Sum: " + sum);`,
    fixedCode: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
  return num * 2;
});
console.log("Doubled numbers: " + doubled);

const filtered = numbers.filter(function(num) {
  return num > 2;
});
console.log("Filtered numbers: " + filtered);

const sum = numbers.reduce(function(acc, num) {
  return acc + num;
}, 0); // Fixed: Added initial value
console.log("Sum: " + sum);`,
    hint: "Check if all array methods have the correct parameters",
    difficulty: "Medium",
    points: 200,
    bugs: ["Missing initial value in reduce method"]
  },
  {
    id: 3,
    title: "Async Function Bug",
    description: "Fix the asynchronous function and error handling",
    buggyCode: `async function fetchUserData(userId) {
  try {
    const response = await fetch('/api/users/' + userId);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.log("Error fetching user data: " + error);
  }
}

const user = fetchUserData(123);
console.log("User data: " + user); // This will show [object Promise]`,
    fixedCode: `async function fetchUserData(userId) {
  try {
    const response = await fetch('/api/users/' + userId);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.log("Error fetching user data: " + error);
    return null;
  }
}

// Fixed: Need to await the async function
fetchUserData(123).then(user => {
  console.log("User data: " + user);
});`,
    hint: "Remember that async functions return promises and need to be awaited",
    difficulty: "Hard",
    points: 300,
    bugs: ["Not awaiting async function result", "Missing return in catch block"]
  }
];

const CodeDebugger = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [playerCode, setPlayerCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [executionResult, setExecutionResult] = useState("");
  const [foundBugs, setFoundBugs] = useState<string[]>([]);

  const challenge = challenges[currentChallenge];

  // Initialize player code with buggy code
  useEffect(() => {
    if (isPlaying) {
      setPlayerCode(challenge.buggyCode);
    }
  }, [currentChallenge, isPlaying]);

  // Execute code and check for bugs
  const executeCode = () => {
    setAttempts(prev => prev + 1);
    
    try {
      // Create a sandboxed environment
      const sandbox = {
        console: {
          log: (...args: any[]) => {
            setExecutionResult(prev => prev + args.join(' ') + '\n');
          }
        },
        fetch: () => Promise.resolve({ json: () => Promise.resolve({ name: 'Test User' }) }),
        setTimeout: setTimeout,
        setInterval: setInterval,
        clearTimeout: clearTimeout,
        clearInterval: clearInterval
      };

      // Execute the code
      const codeFunction = new Function('console', 'fetch', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', playerCode);
      codeFunction(sandbox.console, sandbox.fetch, sandbox.setTimeout, sandbox.setInterval, sandbox.clearTimeout, sandbox.clearInterval);

      // Check for common bugs
      checkForBugs();
    } catch (error) {
      setExecutionResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Check for common bugs in the code
  const checkForBugs = () => {
    const bugs: string[] = [];
    const codeLower = playerCode.toLowerCase();

    // Check for common bug patterns
    if (codeLower.includes('console.log("result: " + result)') && !codeLower.includes('var result') && !codeLower.includes('let result') && !codeLower.includes('const result')) {
      bugs.push("Variable scope error - 'result' not accessible outside function");
    }

    if (codeLower.includes('.reduce(') && !codeLower.includes(', 0') && !codeLower.includes(',0')) {
      bugs.push("Missing initial value in reduce method");
    }

    if (codeLower.includes('async function') && codeLower.includes('fetchuserdata(123)') && !codeLower.includes('await') && !codeLower.includes('.then(')) {
      bugs.push("Not awaiting async function result");
    }

    setFoundBugs(bugs);
    
    // Check if all bugs are fixed
    if (bugs.length === 0) {
      setIsSuccess(true);
      setScore(prev => prev + challenge.points);
      setExecutionResult(prev => prev + "\n🎉 All bugs fixed! Great debugging work!");
    } else {
      setExecutionResult(prev => prev + `\n🐛 Found ${bugs.length} bug(s): ${bugs.join(', ')}`);
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
    setShowSolution(false);
    setExecutionResult("");
    setFoundBugs([]);
  };

  // Next challenge
  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setIsSuccess(false);
      setShowHint(false);
      setShowSolution(false);
      setExecutionResult("");
      setFoundBugs([]);
    } else {
      // Game completed
      setIsPlaying(false);
    }
  };

  // Reset current challenge
  const resetChallenge = () => {
    setIsSuccess(false);
    setShowHint(false);
    setShowSolution(false);
    setExecutionResult("");
    setFoundBugs([]);
    setPlayerCode(challenge.buggyCode);
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
            <Bug className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold gradient-text">Code Debugger</h1>
          </motion.div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find and fix bugs in JavaScript code! Learn debugging techniques and improve your code quality! 🔧
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
                Ready to Debug?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Sharpen your debugging skills! Find bugs, fix errors, and learn best practices 
                for writing clean, reliable JavaScript code.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-500">3</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Challenges</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">600</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Points</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">∞</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Bugs to Find</div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Debugging
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

              {/* Code Editor */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Fix the Bugs:
                </label>
                <textarea
                  value={playerCode}
                  onChange={(e) => setPlayerCode(e.target.value)}
                  placeholder="Write your fixed code here..."
                  className="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={executeCode}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Execute Code
                </button>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {showSolution ? "Hide" : "Show"} Solution
                </button>
              </div>

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

            {/* Results Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Results</h2>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-500" />
                </div>
              </div>

              {/* Execution Result */}
              {executionResult && (
                <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Console Output:</h4>
                  <pre className="text-sm text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap">{executionResult}</pre>
                </div>
              )}

              {/* Found Bugs */}
              {foundBugs.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-red-800 dark:text-red-200">Bugs Found:</span>
                  </div>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    {foundBugs.map((bug, index) => (
                      <li key={index}>• {bug}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solution */}
              <AnimatePresence>
                {showSolution && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
                  >
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Solution:</h4>
                    <pre className="text-sm text-blue-700 dark:text-blue-300 font-mono whitespace-pre-wrap">{challenge.fixedCode}</pre>
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
                      Excellent debugging! All bugs have been fixed.
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

              {/* Debugging Tips */}
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">Debugging Tips</span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Look for common issues like variable scope, missing parameters, async/await usage, and syntax errors!
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
                Find and fix bugs in JavaScript code to make it work correctly.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">💻 Techniques</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Practice debugging, error handling, and code quality improvement.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🏆 Scoring</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Earn points for finding and fixing bugs. Higher difficulty = more points!
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🔧 Skills</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Learn debugging techniques, error analysis, and code improvement.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeDebugger; 