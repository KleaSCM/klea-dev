<script lang="ts">
    import { link } from "svelte-spa-router";
    import Navigation from "../../components/Navigation.svelte";
    import Footer from "../../components/Footer.svelte";
    import { Motion, AnimatePresence } from "svelte-motion";
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
        Wrench,
    } from "lucide-svelte";
    import { onMount, tick } from "svelte";

    // Challenges Data
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
            bugs: [
                "Variable scope error - 'result' not accessible outside function",
            ],
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
            bugs: ["Missing initial value in reduce method"],
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
            bugs: [
                "Not awaiting async function result",
                "Missing return in catch block",
            ],
        },
    ];

    let isPlaying = false;
    let currentChallenge = 0;
    let playerCode = "";
    let isSuccess = false;
    let showHint = false;
    let score = 0;
    let attempts = 0;
    let showSolution = false;
    let executionResult = "";
    let foundBugs: string[] = [];

    $: challenge = challenges[currentChallenge];

    // Initialize player code when challenge starts
    $: if (isPlaying && currentChallenge >= 0) {
        // Only set if playerCode is empty or we changed challenge so we don't overwrite if user is typing
        // But logic in React was: useEffect hooks on [currentChallenge, isPlaying] to setPlayerCode(challenge.buggyCode)
        // We can replicate that behavior but ensure we don't loop.
    }

    // React's approach: useEffect(() => { if (isPlaying) setPlayerCode(...) }, [currentChallenge, isPlaying])
    // Svelte equivalent function called when starting/changing levels.
    function initChallenge() {
        playerCode = challenge.buggyCode;
        isSuccess = false;
        showHint = false;
        showSolution = false;
        executionResult = "";
        foundBugs = [];
    }

    const checkForBugs = () => {
        const bugs: string[] = [];
        const codeLower = playerCode.toLowerCase();

        if (
            codeLower.includes('console.log("result: " + result)') &&
            !codeLower.includes("var result") &&
            !codeLower.includes("let result") &&
            !codeLower.includes("const result")
        ) {
            bugs.push(
                "Variable scope error - 'result' not accessible outside function",
            );
        }

        if (
            codeLower.includes(".reduce(") &&
            !codeLower.includes(", 0") &&
            !codeLower.includes(",0")
        ) {
            bugs.push("Missing initial value in reduce method");
        }

        if (
            codeLower.includes("async function") &&
            codeLower.includes("fetchuserdata(123)") &&
            !codeLower.includes("await") &&
            !codeLower.includes(".then(")
        ) {
            bugs.push("Not awaiting async function result");
        }

        foundBugs = bugs;

        if (bugs.length === 0) {
            isSuccess = true;
            score += challenge.points;
            executionResult += "\n🎉 All bugs fixed! Great debugging work!";
        } else {
            executionResult += `\n🐛 Found ${bugs.length} bug(s): ${bugs.join(", ")}`;
        }
    };

    const executeCode = () => {
        attempts += 1;
        executionResult = ""; // Clear previous results

        try {
            const sandbox = {
                console: {
                    log: (...args: any[]) => {
                        executionResult += args.join(" ") + "\n";
                    },
                },
                fetch: () =>
                    Promise.resolve({
                        json: () => Promise.resolve({ name: "Test User" }),
                    }),
                setTimeout: setTimeout,
                setInterval: setInterval,
                clearTimeout: clearTimeout,
                clearInterval: clearInterval,
            };

            const codeFunction = new Function(
                "console",
                "fetch",
                "setTimeout",
                "setInterval",
                "clearTimeout",
                "clearInterval",
                playerCode,
            );
            codeFunction(
                sandbox.console,
                sandbox.fetch,
                sandbox.setTimeout,
                sandbox.setInterval,
                sandbox.clearTimeout,
                sandbox.clearInterval,
            );

            checkForBugs();
        } catch (error: any) {
            executionResult = `Error: ${error.message || "Unknown error"}`;
        }
    };

    const startGame = () => {
        isPlaying = true;
        currentChallenge = 0;
        score = 0;
        attempts = 0;
        initChallenge();
    };

    const nextChallenge = () => {
        if (currentChallenge < challenges.length - 1) {
            currentChallenge += 1;
            initChallenge();
        } else {
            isPlaying = false;
        }
    };

    const resetChallenge = () => {
        initChallenge();
    };

    const getDifficultyColor = (difficulty: string) => {
        if (difficulty === "Easy")
            return "text-green-500 bg-green-100 dark:bg-green-900/20";
        if (difficulty === "Medium")
            return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
        return "text-red-500 bg-red-100 dark:bg-red-900/20";
    };
</script>

<Navigation />

<div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 pt-24"
>
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
            <Motion
                let:motion
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div
                    use:motion
                    class="flex items-center justify-center gap-3 mb-4"
                >
                    <Bug class="w-8 h-8 text-orange-500" />
                    <h1 class="text-4xl font-bold gradient-text">
                        Code Debugger
                    </h1>
                </div>
            </Motion>
            <p
                class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
                Find and fix bugs in JavaScript code! Learn debugging techniques
                and improve your code quality! 🔧
            </p>
        </div>

        {#if !isPlaying}
            <Motion
                let:motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div use:motion class="text-center">
                    <div
                        class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-2xl mx-auto"
                    >
                        <h2
                            class="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4"
                        >
                            Ready to Debug?
                        </h2>
                        <p class="text-slate-600 dark:text-slate-400 mb-6">
                            Sharpen your debugging skills! Find bugs, fix
                            errors, and learn best practices for writing clean,
                            reliable JavaScript code.
                        </p>

                        <div class="grid md:grid-cols-3 gap-4 mb-8">
                            <div
                                class="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-orange-500">
                                    3
                                </div>
                                <div
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Challenges
                                </div>
                            </div>
                            <div
                                class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-green-500">
                                    600
                                </div>
                                <div
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Total Points
                                </div>
                            </div>
                            <div
                                class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-blue-500">
                                    ∞
                                </div>
                                <div
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Bugs to Find
                                </div>
                            </div>
                        </div>

                        <button
                            on:click={startGame}
                            class="btn-primary inline-flex items-center gap-2"
                        >
                            <Play class="w-4 h-4" />
                            Start Debugging
                        </button>
                    </div>
                </div>
            </Motion>

            <div class="mt-8 text-center">
                <a
                    href="/#games"
                    use:link
                    class="text-indigo-500 hover:underline">← Back to Games</a
                >
            </div>
        {:else}
            <div class="grid lg:grid-cols-2 gap-8">
                <Motion
                    let:motion
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div
                        use:motion
                        class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                    >
                        <div class="flex items-center justify-between mb-4">
                            <h2
                                class="text-2xl font-semibold text-slate-800 dark:text-slate-200"
                            >
                                Challenge {currentChallenge + 1}
                            </h2>
                            <div class="flex items-center gap-2">
                                <span
                                    class="text-sm font-medium text-slate-600 dark:text-slate-400"
                                >
                                    Score: {score}
                                </span>
                                <button
                                    on:click={resetChallenge}
                                    class="p-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
                                    title="Reset Challenge"
                                >
                                    <RotateCcw class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div class="mb-6">
                            <h3
                                class="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2"
                            >
                                {challenge.title}
                            </h3>
                            <p class="text-slate-600 dark:text-slate-400 mb-4">
                                {challenge.description}
                            </p>
                            <div class="flex items-center gap-4">
                                <span
                                    class={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}
                                >
                                    {challenge.difficulty}
                                </span>
                                <span
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Points: {challenge.points}
                                </span>
                            </div>
                        </div>

                        <div class="mb-6">
                            <label
                                for="code-input"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Fix the Bugs:
                            </label>
                            <textarea
                                id="code-input"
                                bind:value={playerCode}
                                placeholder="Write your fixed code here..."
                                class="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            ></textarea>
                        </div>

                        <div class="flex gap-3">
                            <button
                                on:click={executeCode}
                                class="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
                            >
                                <Zap class="w-4 h-4" />
                                Execute Code
                            </button>
                            <button
                                on:click={() => (showSolution = !showSolution)}
                                class="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
                            >
                                <Eye class="w-4 h-4" />
                                {showSolution ? "Hide" : "Show"} Solution
                            </button>
                        </div>

                        <div class="mt-4">
                            <button
                                on:click={() => (showHint = !showHint)}
                                class="text-sm text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                {showHint ? "Hide" : "Show"} Hint
                            </button>
                            <AnimatePresence>
                                {#if showHint}
                                    <Motion
                                        let:motion
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                            opacity: 1,
                                            height: "auto",
                                        }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <div
                                            use:motion
                                            class="mt-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700"
                                        >
                                            <p
                                                class="text-sm text-orange-700 dark:text-orange-300"
                                            >
                                                💡 {challenge.hint}
                                            </p>
                                        </div>
                                    </Motion>
                                {/if}
                            </AnimatePresence>
                        </div>
                    </div>
                </Motion>

                <Motion
                    let:motion
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div
                        use:motion
                        class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                    >
                        <div class="flex items-center justify-between mb-4">
                            <h2
                                class="text-2xl font-semibold text-slate-800 dark:text-slate-200"
                            >
                                Results
                            </h2>
                            <div class="flex items-center gap-2">
                                <Search class="w-4 h-4 text-slate-500" />
                            </div>
                        </div>

                        {#if executionResult}
                            <div
                                class="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg"
                            >
                                <h4
                                    class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                                >
                                    Console Output:
                                </h4>
                                <pre
                                    class="text-sm text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap">{executionResult}</pre>
                            </div>
                        {/if}

                        {#if foundBugs.length > 0}
                            <div
                                class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700"
                            >
                                <div class="flex items-center gap-2 mb-2">
                                    <AlertTriangle
                                        class="w-4 h-4 text-red-500"
                                    />
                                    <span
                                        class="font-medium text-red-800 dark:text-red-200"
                                        >Bugs Found:</span
                                    >
                                </div>
                                <ul
                                    class="text-sm text-red-700 dark:text-red-300 space-y-1"
                                >
                                    {#each foundBugs as bug}
                                        <li>• {bug}</li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}

                        <AnimatePresence>
                            {#if showSolution}
                                <Motion
                                    let:motion
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div
                                        use:motion
                                        class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
                                    >
                                        <h4
                                            class="font-medium text-blue-800 dark:text-blue-200 mb-2"
                                        >
                                            Solution:
                                        </h4>
                                        <pre
                                            class="text-sm text-blue-700 dark:text-blue-300 font-mono whitespace-pre-wrap">{challenge.fixedCode}</pre>
                                    </div>
                                </Motion>
                            {/if}
                        </AnimatePresence>

                        <AnimatePresence>
                            {#if isSuccess}
                                <Motion
                                    let:motion
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <div
                                        use:motion
                                        class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700"
                                    >
                                        <div
                                            class="flex items-center gap-2 mb-2"
                                        >
                                            <CheckCircle
                                                class="w-5 h-5 text-green-500"
                                            />
                                            <span
                                                class="font-semibold text-green-800 dark:text-green-200"
                                            >
                                                Challenge Completed!
                                            </span>
                                        </div>
                                        <p
                                            class="text-sm text-green-700 dark:text-green-300 mb-3"
                                        >
                                            Excellent debugging! All bugs have
                                            been fixed.
                                        </p>
                                        <button
                                            on:click={nextChallenge}
                                            class="btn-primary text-sm"
                                        >
                                            Next Challenge
                                        </button>
                                    </div>
                                </Motion>
                            {/if}
                        </AnimatePresence>

                        <div
                            class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700"
                        >
                            <div class="flex items-center gap-2 mb-2">
                                <Wrench class="w-4 h-4 text-yellow-500" />
                                <span
                                    class="font-medium text-yellow-800 dark:text-yellow-200"
                                    >Debugging Tips</span
                                >
                            </div>
                            <p
                                class="text-sm text-yellow-700 dark:text-yellow-300"
                            >
                                Look for common issues like variable scope,
                                missing parameters, async/await usage, and
                                syntax errors!
                            </p>
                        </div>
                    </div>
                </Motion>
            </div>

            <div class="mt-8 text-center">
                <a
                    href="/#games"
                    use:link
                    class="text-indigo-500 hover:underline">← Back to Games</a
                >
            </div>
        {/if}

        {#if isPlaying}
            <Motion
                let:motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div
                    use:motion
                    class="mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                >
                    <h3
                        class="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4"
                    >
                        How to Play
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4
                                class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                            >
                                🎯 Objective
                            </h4>
                            <p
                                class="text-sm text-slate-600 dark:text-slate-400"
                            >
                                Find and fix bugs in JavaScript code to make it
                                work correctly.
                            </p>
                        </div>
                        <div>
                            <h4
                                class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                            >
                                💻 Techniques
                            </h4>
                            <p
                                class="text-sm text-slate-600 dark:text-slate-400"
                            >
                                Practice debugging, error handling, and code
                                quality improvement.
                            </p>
                        </div>
                        <div>
                            <h4
                                class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                            >
                                🏆 Scoring
                            </h4>
                            <p
                                class="text-sm text-slate-600 dark:text-slate-400"
                            >
                                Earn points for finding and fixing bugs. Higher
                                difficulty = more points!
                            </p>
                        </div>
                        <div>
                            <h4
                                class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                            >
                                🔧 Skills
                            </h4>
                            <p
                                class="text-sm text-slate-600 dark:text-slate-400"
                            >
                                Learn debugging techniques, error analysis, and
                                code improvement.
                            </p>
                        </div>
                    </div>
                </div>
            </Motion>
        {/if}
    </div>
</div>

<Footer />
