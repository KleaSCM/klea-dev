"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Play, RotateCcw, CheckCircle, XCircle, Code, Zap } from "lucide-react";

/**
 * Button Stopper Game Component
 * 
 * A JavaScript coding challenge where players write code to stop a moving button.
 * Players must use event listeners and DOM manipulation to catch the elusive button.
 * 
 * Game Mechanics:
 * - Button moves randomly around the screen
 * - Player writes JavaScript code to stop it
 * - Code is executed in a sandboxed environment
 * - Success is measured by stopping the button within time limit
 * 
 * Learning Objectives:
 * - DOM manipulation and event handling
 * - JavaScript event listeners
 * - Element selection and positioning
 * - Real-time code execution
 */
const ButtonStopper = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [playerCode, setPlayerCode] = useState(`// Write your code here to stop the moving button!

`);
  const [codeResult, setCodeResult] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 50 });
  const [buttonSpeed, setButtonSpeed] = useState({ x: 4, y: 3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Game area dimensions
  const gameAreaWidth = 600;
  const gameAreaHeight = 400;
  const buttonSize = 60;

  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setGameStarted(true);
    setTimeLeft(30);
    setScore(0);
    setCodeResult("");
    setIsSuccess(false);
    setShowHint(false);
    setButtonPosition({ x: 50, y: 50 });
    setButtonSpeed({ x: 4, y: 3 });
    
    // Start button movement
    // moveButton(); // This is now handled by useEffect
    
    // Start timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    intervalRef.current = timer;
  };

  // Move the button around the screen with smooth physics
  const moveButtonPhysics = (prevPos: { x: number; y: number }, prevSpeed: { x: number; y: number }) => {
    let newX = prevPos.x + prevSpeed.x;
    let newY = prevPos.y + prevSpeed.y;
    let newSpeedX = prevSpeed.x;
    let newSpeedY = prevSpeed.y;

    // Calculate distance to mouse
    const distanceToMouse = Math.sqrt(
      Math.pow(newX - mousePosition.x, 2) + Math.pow(newY - mousePosition.y, 2)
    );

    // If mouse is very close, teleport away!
    if (distanceToMouse < 60 && Math.random() < 0.25) {
      // Teleport to a random location
      newX = Math.random() * (gameAreaWidth - buttonSize);
      newY = Math.random() * (gameAreaHeight - buttonSize);
      // Give a burst of speed in a random direction
      const angle = Math.random() * Math.PI * 2;
      newSpeedX = Math.cos(angle) * 12;
      newSpeedY = Math.sin(angle) * 12;
    } else if (distanceToMouse < 180) {
      // If mouse is close, escape much more aggressively
      const angleToMouse = Math.atan2(mousePosition.y - newY, mousePosition.x - newX);
      const escapeAngle = angleToMouse + Math.PI; // Opposite direction
      // High escape speed
      const escapeSpeedX = Math.cos(escapeAngle) * 16 + (Math.random() - 0.5) * 6;
      const escapeSpeedY = Math.sin(escapeAngle) * 16 + (Math.random() - 0.5) * 6;
      // Burst away
      newSpeedX += (escapeSpeedX - newSpeedX) * 0.5;
      newSpeedY += (escapeSpeedY - newSpeedY) * 0.5;
    } else {
      // Add slight random drift for natural movement
      if (Math.random() < 0.02) {
        newSpeedX += (Math.random() - 0.5) * 1;
        newSpeedY += (Math.random() - 0.5) * 1;
      }
    }

    // Smooth wall bouncing with energy conservation
    if (newX <= 0) {
      newX = 0;
      newSpeedX = Math.abs(newSpeedX) * 0.95;
    } else if (newX >= gameAreaWidth - buttonSize) {
      newX = gameAreaWidth - buttonSize;
      newSpeedX = -Math.abs(newSpeedX) * 0.95;
    }
    if (newY <= 0) {
      newY = 0;
      newSpeedY = Math.abs(newSpeedY) * 0.95;
    } else if (newY >= gameAreaHeight - buttonSize) {
      newY = gameAreaHeight - buttonSize;
      newSpeedY = -Math.abs(newSpeedY) * 0.95;
    }

    // Apply slight friction
    newSpeedX *= 0.998;
    newSpeedY *= 0.998;

    // Limit maximum speed
    newSpeedX = Math.max(-18, Math.min(18, newSpeedX));
    newSpeedY = Math.max(-18, Math.min(18, newSpeedY));

    // Ensure minimum speed
    const currentSpeed = Math.sqrt(newSpeedX * newSpeedX + newSpeedY * newSpeedY);
    if (currentSpeed < 2) {
      const angle = Math.random() * Math.PI * 2;
      newSpeedX = Math.cos(angle) * 3;
      newSpeedY = Math.sin(angle) * 3;
    }

    return {
      pos: { x: newX, y: newY },
      speed: { x: newSpeedX, y: newSpeedY }
    };
  };

  // Movement loop using requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) return;
    let frame: number;
    function animate() {
      setButtonPosition(prevPos => {
        setButtonSpeed(prevSpeed => {
          const { pos, speed } = moveButtonPhysics(prevPos, prevSpeed);
          // Update position and speed
          // We need to return the new speed for setButtonSpeed
          setButtonPosition(pos);
          return speed;
        });
        // Return prevPos because setButtonPosition is updated inside setButtonSpeed
        return prevPos;
      });
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying, mousePosition]);

  // Execute player code
  const executeCode = () => {
    if (!isPlaying) return;

    try {
      // Create a sandboxed environment
      const sandbox = {
        document: document,
        console: console,
        setTimeout: setTimeout,
        setInterval: setInterval,
        clearTimeout: clearTimeout,
        clearInterval: clearInterval,
        Math: Math,
        Date: Date,
        Array: Array,
        Object: Object,
        String: String,
        Number: Number,
        Boolean: Boolean,
        parseInt: parseInt,
        parseFloat: parseFloat,
        isNaN: isNaN,
        isFinite: isFinite,
        escape: escape,
        unescape: unescape,
        encodeURI: encodeURI,
        encodeURIComponent: encodeURIComponent,
        decodeURI: decodeURI,
        decodeURIComponent: decodeURIComponent
      };

      // Execute the code
      const codeFunction = new Function('document', 'console', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'Math', 'Date', 'Array', 'Object', 'String', 'Number', 'Boolean', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'escape', 'unescape', 'encodeURI', 'encodeURIComponent', 'decodeURI', 'decodeURIComponent', playerCode);
      
      codeFunction(
        sandbox.document, sandbox.console, sandbox.setTimeout, sandbox.setInterval, 
        sandbox.clearTimeout, sandbox.clearInterval, sandbox.Math, sandbox.Date, 
        sandbox.Array, sandbox.Object, sandbox.String, sandbox.Number, sandbox.Boolean,
        sandbox.parseInt, sandbox.parseFloat, sandbox.isNaN, sandbox.isFinite,
        sandbox.escape, sandbox.unescape, sandbox.encodeURI, sandbox.encodeURIComponent,
        sandbox.decodeURI, sandbox.decodeURIComponent
      );

      // Check if button was stopped
      const button = document.querySelector('.moving-button') as HTMLElement;
      if (button) {
        const computedStyle = window.getComputedStyle(button);
        const isStopped = 
          computedStyle.display === 'none' || 
          computedStyle.visibility === 'hidden' ||
          computedStyle.opacity === '0' ||
          button.style.display === 'none' ||
          button.style.visibility === 'hidden' ||
          button.style.opacity === '0';

        if (isStopped) {
          handleSuccess();
        } else {
          setCodeResult("Code executed! But the button is still moving... Try a different approach!");
        }
      } else {
        setCodeResult("Code executed! But the button element wasn't found...");
      }
    } catch (error) {
      setCodeResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Handle successful button stop
  const handleSuccess = () => {
    setIsSuccess(true);
    setScore(timeLeft * 10); // More points for faster completion
    setCodeResult("🎉 Success! You stopped the button! Great job!");
    endGame();
  };

  // End the game
  const endGame = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Reset the game
  const resetGame = () => {
    endGame();
    setGameStarted(false);
    setTimeLeft(30);
    setScore(0);
    setCodeResult("");
    setIsSuccess(false);
    setShowHint(false);
    setButtonPosition({ x: 50, y: 50 });
    setButtonSpeed({ x: 4, y: 3 });
    setPlayerCode(`// Write your code here to stop the moving button!

`);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Target className="w-8 h-8 text-indigo-500" />
            <h1 className="text-4xl font-bold gradient-text">Button Stopper</h1>
          </motion.div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Write JavaScript code to stop the mischievous button! It zips around and avoids your mouse - you'll need clever code to catch it! 😈
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Game Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Game Area</h2>
              <div className="flex items-center gap-4">
                {!gameStarted ? (
                  <button
                    onClick={startGame}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Game
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Time: {timeLeft}s
                    </span>
                    <button
                      onClick={resetGame}
                      className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
                      title="Reset Game"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Game Stats */}
            {gameStarted && (
              <div className="flex items-center gap-6 mb-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-500">{score}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{timeLeft}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Time Left</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {isSuccess ? "✅" : "🎯"}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Status</div>
                </div>
              </div>
            )}

            {/* Game Canvas */}
            <div
              ref={gameAreaRef}
              className="relative bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-slate-200 dark:border-slate-600 overflow-hidden cursor-crosshair"
              style={{ width: gameAreaWidth, height: gameAreaHeight }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                });
              }}
            >
              {/* Moving Button */}
              <motion.button
                ref={buttonRef}
                className="moving-button absolute bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                style={{
                  width: buttonSize,
                  height: buttonSize,
                  left: buttonPosition.x,
                  top: buttonPosition.y,
                  transform: `translate3d(0, 0, 0)`, // Force hardware acceleration
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="flex items-center justify-center h-full">
                  <span className="text-2xl">😈</span>
                </div>
                <span className="text-xs block mt-1 font-bold">Catch Me!</span>
                
                {/* Motion trail effect */}
                {isPlaying && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-lg opacity-20 blur-sm"
                    style={{
                      transform: `translate(${buttonSpeed.x * 2}px, ${buttonSpeed.y * 2}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  />
                )}
              </motion.button>

              {/* Game Instructions */}
              {!gameStarted && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
                  <div className="text-center text-white p-6">
                    <Target className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Ready to Play?</h3>
                    <p className="text-sm opacity-90">
                      Click "Start Game" to begin! Write code to stop the moving button.
                    </p>
                  </div>
                </div>
              )}

              {/* Success Overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center bg-green-500/90 backdrop-blur-sm rounded-lg"
                  >
                    <div className="text-center text-white p-6">
                      <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Success!</h3>
                      <p className="text-lg mb-4">You stopped the button!</p>
                      <div className="text-3xl font-bold mb-4">Score: {score}</div>
                      <button
                        onClick={resetGame}
                        className="btn-primary bg-white text-green-600 hover:bg-green-50"
                      >
                        Play Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Code Editor</h2>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                {showHint ? "Hide" : "Show"} Hint
              </button>
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
                >
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Hint</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Try using <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">document.querySelector('.moving-button')</code> to find the button, 
                    then modify its <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">style.display</code> or <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">style.visibility</code> to hide it!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Code Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your JavaScript Code:
              </label>
              <textarea
                value={playerCode}
                onChange={(e) => setPlayerCode(e.target.value)}
                className="w-full h-48 p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                placeholder="// Write your code here..."
                disabled={!isPlaying}
              />
            </div>

            {/* Execute Button */}
            <button
              onClick={executeCode}
              disabled={!isPlaying}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transform hover:-translate-y-1'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4" />
              Execute Code
            </button>

            {/* Code Result */}
            {codeResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg border ${
                  isSuccess
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200'
                    : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isSuccess ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Code className="w-4 h-4 text-slate-500" />
                  )}
                  <span className="font-medium">Result:</span>
                </div>
                <p className="text-sm">{codeResult}</p>
              </motion.div>
            )}
          </motion.div>
        </div>

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
                Write JavaScript code to stop the moving button. You have 30 seconds to figure it out!
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">💻 Your Tools</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Use DOM manipulation, event listeners, and JavaScript to interact with the button element.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🏆 Scoring</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Score = Time remaining × 10. Faster completion = higher score!
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">🔧 Tips</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                The button has the class 'moving-button'. Try hiding it or making it invisible!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ButtonStopper; 