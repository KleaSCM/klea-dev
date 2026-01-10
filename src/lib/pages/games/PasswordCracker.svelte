<script lang="ts">
    import { link } from "svelte-spa-router";
    import Navigation from "../../components/Navigation.svelte";
    import Footer from "../../components/Footer.svelte";
    import { Motion, AnimatePresence } from "svelte-motion";
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
        Code as CodeIcon,
        Settings,
        FileText,
        Plus,
        Trash2,
    } from "lucide-svelte";
    import { onMount, tick } from "svelte";

    // Password challenges with different complexity levels
    const passwordChallenges = [
        {
            id: 1,
            title: "Simple PIN",
            description:
                "Crack a 4-digit PIN. Write a brute force script to try all combinations.",
            password: "1234",
            difficulty: "Easy",
            points: 100,
            hint: "Try using nested loops to generate all 4-digit combinations",
            securityLesson:
                "Simple numeric passwords are easily cracked by brute force attacks",
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
}`,
        },
        {
            id: 2,
            title: "Word Password",
            description:
                "Crack a dictionary-based password. Create a custom word list and attack script.",
            password: "password",
            difficulty: "Medium",
            points: 200,
            hint: "Create a list of common words and try them systematically",
            securityLesson:
                "Dictionary attacks can quickly crack common word passwords",
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
}`,
        },
        {
            id: 3,
            title: "Complex Password",
            description:
                "Crack a mixed-character password. Write an advanced attack with custom character sets.",
            password: "P@ssw0rd!",
            difficulty: "Hard",
            points: 300,
            hint: "Use character substitution and common patterns",
            securityLesson:
                "Complex passwords with mixed characters are much harder to crack",
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
}`,
        },
    ];

    // Character sets for brute force attacks
    const characterSets = {
        numbers: "0123456789",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
        alphanumeric:
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    };

    let isPlaying = false;
    let currentChallenge = 0;
    let playerScript = "";
    let customDictionary: string[] = [];
    let newWord = "";
    let bruteForceConfig = {
        charset: "numbers",
        minLength: 1,
        maxLength: 4,
        startFrom: "",
    };
    let isExecuting = false;
    let executionResult = "";
    let isSuccess = false;
    let score = 0;
    let showHint = false;
    let showSecurityLesson = false;
    let attackStats = {
        attempts: 0,
        speed: 0,
        startTime: 0,
    };
    let foundPassword = "";

    $: challenge = passwordChallenges[currentChallenge];

    // Helper function to update state when challenge changes
    function initChallenge() {
        playerScript = challenge.template;
        executionResult = "";
        isSuccess = false;
        showHint = false;
        showSecurityLesson = false;
        attackStats = { attempts: 0, speed: 0, startTime: 0 };
        foundPassword = "";
        customDictionary = [];
    }

    const executeScript = async () => {
        isExecuting = true;
        executionResult = "";
        attackStats = { attempts: 0, speed: 0, startTime: Date.now() };
        foundPassword = "";

        // Wait a tick to ensure UI updates before heavy processing (if any)
        await tick();

        try {
            // Create sandboxed environment
            const sandbox = {
                console: {
                    log: (...args: any[]) => {
                        executionResult += args.join(" ") + "\n";
                    },
                },
                targetPassword: challenge.password,
                checkPassword: (attempt: string) => {
                    attackStats.attempts += 1;
                    const elapsed = (Date.now() - attackStats.startTime) / 1000;
                    if (elapsed > 0) {
                        attackStats.speed = Math.round(
                            attackStats.attempts / elapsed,
                        );
                    }
                    // Trigger reactivity for stats occasionally or at end?
                    // In Svelte, deeply nested object updates might need assignment or specific care.
                    // We'll just reassign attackStats to trigger updates.
                    attackStats = attackStats;

                    return attempt === challenge.password;
                },
                // Character sets for brute force
                characterSets,
                // Custom dictionary
                customDictionary,
                // Brute force configuration
                bruteForceConfig,
            };

            // Execute the script
            const scriptFunction = new Function(
                "console",
                "targetPassword",
                "checkPassword",
                "characterSets",
                "customDictionary",
                "bruteForceConfig",
                playerScript,
            );

            const result = scriptFunction(
                sandbox.console,
                sandbox.targetPassword,
                sandbox.checkPassword,
                sandbox.characterSets,
                sandbox.customDictionary,
                sandbox.bruteForceConfig,
            );

            if (result) {
                isSuccess = true;
                foundPassword = result;
                score += challenge.points;
                executionResult += `\n🎉 Password found: ${result}`;
            } else {
                executionResult += `\n❌ Password not found. Try a different approach!`;
            }
        } catch (error: any) {
            executionResult = `Error: ${error.message || "Unknown error"}\n\n💡 Tip: Check your JavaScript syntax and make sure all variables are defined.`;
        }

        isExecuting = false;
    };

    const addWordToDictionary = () => {
        if (newWord.trim() && !customDictionary.includes(newWord.trim())) {
            customDictionary = [...customDictionary, newWord.trim()];
            newWord = "";
        }
    };

    const removeWordFromDictionary = (word: string) => {
        customDictionary = customDictionary.filter((w) => w !== word);
    };

    const startGame = () => {
        isPlaying = true;
        currentChallenge = 0;
        score = 0;
        initChallenge();
    };

    const nextChallenge = () => {
        if (currentChallenge < passwordChallenges.length - 1) {
            currentChallenge += 1;
            initChallenge();
        } else {
            isPlaying = false;
        }
    };

    const resetChallenge = () => {
        initChallenge();
    };
</script>

<Navigation />

<div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20 p-4 pt-24"
>
    <div class="max-w-7xl mx-auto">
        <!-- Header -->
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
                    <Lock class="w-8 h-8 text-red-500" />
                    <h1 class="text-4xl font-bold gradient-text">
                        Password Cracker
                    </h1>
                </div>
            </Motion>
            <p
                class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
                Write your own attack scripts! Learn cybersecurity by creating
                brute force and dictionary attacks. 🔐
            </p>
        </div>

        {#if !isPlaying}
            <!-- Start Screen -->
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
                            Ready to Code Attacks?
                        </h2>
                        <p class="text-slate-600 dark:text-slate-400 mb-6">
                            Write your own JavaScript attack scripts! Create
                            brute force algorithms, build custom dictionaries,
                            and learn real cybersecurity techniques.
                        </p>

                        <div class="grid md:grid-cols-3 gap-4 mb-8">
                            <div
                                class="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-red-500">
                                    3
                                </div>
                                <div
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Challenges
                                </div>
                            </div>
                            <div
                                class="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-orange-500">
                                    600
                                </div>
                                <div
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Total Points
                                </div>
                            </div>
                            <div
                                class="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-yellow-500">
                                    ∞
                                </div>
                                <div
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Custom Scripts
                                </div>
                            </div>
                        </div>

                        <button
                            on:click={startGame}
                            class="btn-primary inline-flex items-center gap-2"
                        >
                            <Play class="w-4 h-4" />
                            Start Coding
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
            <!-- Game Interface -->
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Script Editor -->
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

                        <!-- Challenge Info -->
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
                                    class={`px-3 py-1 rounded-full text-xs font-medium ${
                                        challenge.difficulty === "Easy"
                                            ? "text-green-500 bg-green-100 dark:bg-green-900/20"
                                            : challenge.difficulty === "Medium"
                                              ? "text-yellow-500 bg-yellow-100 dark:bg-yellow-100/20"
                                              : "text-red-500 bg-red-100 dark:bg-red-900/20"
                                    }`}
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

                        <!-- Script Editor -->
                        <div class="mb-6">
                            <label
                                for="attack-script"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Your Attack Script:
                            </label>
                            <textarea
                                id="attack-script"
                                bind:value={playerScript}
                                placeholder="Write your JavaScript attack script here..."
                                class="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                            ></textarea>
                        </div>

                        <!-- Execute Button -->
                        <button
                            on:click={executeScript}
                            disabled={isExecuting}
                            class="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Zap class="w-4 h-4" />
                            {isExecuting ? "Executing..." : "Execute Script"}
                        </button>

                        <!-- Hint -->
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

                <!-- Tools and Results -->
                <Motion
                    let:motion
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div use:motion class="space-y-6">
                        <!-- Custom Dictionary -->
                        <div
                            class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                        >
                            <h3
                                class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"
                            >
                                <Database class="w-5 h-5" />
                                Custom Dictionary
                            </h3>

                            <div class="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    bind:value={newWord}
                                    placeholder="Add word to dictionary..."
                                    class="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    on:keypress={(e) =>
                                        e.key === "Enter" &&
                                        addWordToDictionary()}
                                />
                                <button
                                    on:click={addWordToDictionary}
                                    class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <Plus class="w-4 h-4" />
                                </button>
                            </div>

                            {#if customDictionary.length > 0}
                                <div class="space-y-2">
                                    <p
                                        class="text-sm text-slate-600 dark:text-slate-400"
                                    >
                                        Words: {customDictionary.length}
                                    </p>
                                    <div
                                        class="max-h-32 overflow-y-auto space-y-1"
                                    >
                                        {#each customDictionary as word, index}
                                            <div
                                                class="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700 rounded"
                                            >
                                                <span class="text-sm font-mono"
                                                    >{word}</span
                                                >
                                                <button
                                                    on:click={() =>
                                                        removeWordFromDictionary(
                                                            word,
                                                        )}
                                                    class="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 class="w-3 h-3" />
                                                </button>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>

                        <!-- Brute Force Configuration -->
                        <div
                            class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                        >
                            <h3
                                class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"
                            >
                                <Settings class="w-5 h-5" />
                                Brute Force Config
                            </h3>

                            <div class="space-y-3">
                                <div>
                                    <label
                                        for="charset"
                                        class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                                    >
                                        Character Set:
                                    </label>
                                    <select
                                        id="charset"
                                        bind:value={bruteForceConfig.charset}
                                        class="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="numbers"
                                            >Numbers (0-9)</option
                                        >
                                        <option value="lowercase"
                                            >Lowercase (a-z)</option
                                        >
                                        <option value="uppercase"
                                            >Uppercase (A-Z)</option
                                        >
                                        <option value="alphanumeric"
                                            >Alphanumeric (0-9, a-z, A-Z)</option
                                        >
                                        <option value="symbols"
                                            >Symbols (!@#$%^&*)</option
                                        >
                                    </select>
                                </div>

                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label
                                            for="min-length"
                                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                                        >
                                            Min Length:
                                        </label>
                                        <input
                                            id="min-length"
                                            type="number"
                                            bind:value={
                                                bruteForceConfig.minLength
                                            }
                                            class="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            min="1"
                                            max="8"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="max-length"
                                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                                        >
                                            Max Length:
                                        </label>
                                        <input
                                            id="max-length"
                                            type="number"
                                            bind:value={
                                                bruteForceConfig.maxLength
                                            }
                                            class="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            min="1"
                                            max="8"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Execution Results -->
                        <div
                            class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                        >
                            <h3
                                class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"
                            >
                                <CodeIcon class="w-5 h-5" />
                                Execution Results
                            </h3>

                            <!-- Attack Stats -->
                            {#if attackStats.attempts > 0}
                                <div class="grid grid-cols-2 gap-4 mb-4">
                                    <div
                                        class="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"
                                    >
                                        <div
                                            class="text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            Attempts
                                        </div>
                                        <div
                                            class="text-xl font-bold text-slate-800 dark:text-slate-200"
                                        >
                                            {attackStats.attempts.toLocaleString()}
                                        </div>
                                    </div>
                                    <div
                                        class="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"
                                    >
                                        <div
                                            class="text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            Speed
                                        </div>
                                        <div
                                            class="text-xl font-bold text-slate-800 dark:text-slate-200"
                                        >
                                            {attackStats.speed.toLocaleString()}/s
                                        </div>
                                    </div>
                                </div>
                            {/if}

                            <!-- Console Output -->
                            {#if executionResult}
                                <div
                                    class="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg"
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

                            <!-- Success Message -->
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
                                                <Unlock
                                                    class="w-5 h-5 text-green-500"
                                                />
                                                <span
                                                    class="font-semibold text-green-800 dark:text-green-200"
                                                >
                                                    Password Cracked!
                                                </span>
                                            </div>
                                            <p
                                                class="text-sm text-green-700 dark:text-green-300 mb-3"
                                            >
                                                Great job! Your script
                                                successfully found the password: <strong
                                                    >{foundPassword}</strong
                                                >
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

                            <!-- Security Lesson -->
                            <div class="mt-4">
                                <button
                                    on:click={() =>
                                        (showSecurityLesson =
                                            !showSecurityLesson)}
                                    class="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                                >
                                    {showSecurityLesson ? "Hide" : "Show"} Security
                                    Lesson
                                </button>
                                <AnimatePresence>
                                    {#if showSecurityLesson}
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
                                                class="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
                                            >
                                                <p
                                                    class="text-sm text-blue-700 dark:text-blue-300"
                                                >
                                                    🔒 {challenge.securityLesson}
                                                </p>
                                            </div>
                                        </Motion>
                                    {/if}
                                </AnimatePresence>
                            </div>
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

        <!-- Game Instructions -->
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
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Write JavaScript scripts to crack passwords using
                            different attack methods.
                        </p>
                    </div>
                    <div>
                        <h4
                            class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                        >
                            💻 Scripting
                        </h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Create custom attack scripts, build dictionaries,
                            and configure brute force parameters.
                        </p>
                    </div>
                    <div>
                        <h4
                            class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                        >
                            🏆 Scoring
                        </h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Earn points for successfully cracking passwords.
                            Higher difficulty = more points!
                        </p>
                    </div>
                    <div>
                        <h4
                            class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                        >
                            🛡️ Learning
                        </h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Understand password security and learn real
                            cybersecurity techniques.
                        </p>
                    </div>
                </div>
            </div>
        </Motion>
    </div>
</div>

<Footer />
