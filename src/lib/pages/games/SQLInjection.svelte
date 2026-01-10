<script lang="ts">
    import { link } from "svelte-spa-router";
    import Navigation from "../../components/Navigation.svelte";
    import Footer from "../../components/Footer.svelte";
    import { Motion, AnimatePresence } from "svelte-motion";
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
        EyeOff,
    } from "lucide-svelte";
    import { onMount } from "svelte";

    const fakeDatabase = {
        users: [
            {
                id: 1,
                username: "admin",
                email: "admin@company.com",
                role: "administrator",
                password: "hashed_password_123",
            },
            {
                id: 2,
                username: "john_doe",
                email: "john@company.com",
                role: "user",
                password: "hashed_password_456",
            },
            {
                id: 3,
                username: "jane_smith",
                email: "jane@company.com",
                role: "manager",
                password: "hashed_password_789",
            },
            {
                id: 4,
                username: "bob_wilson",
                email: "bob@company.com",
                role: "user",
                password: "hashed_password_abc",
            },
            {
                id: 5,
                username: "alice_jones",
                email: "alice@company.com",
                role: "user",
                password: "hashed_password_def",
            },
        ],
        products: [
            { id: 1, name: "Laptop", price: 999.99, category: "electronics" },
            { id: 2, name: "Phone", price: 599.99, category: "electronics" },
            { id: 3, name: "Book", price: 19.99, category: "books" },
            { id: 4, name: "Chair", price: 149.99, category: "furniture" },
            { id: 5, name: "Table", price: 299.99, category: "furniture" },
        ],
    };

    const challenges = [
        {
            id: 1,
            title: "Basic Injection",
            description: "Extract all user data using a simple SQL injection",
            hint: "Try using ' OR '1'='1 in the username field",
            query: "SELECT * FROM users WHERE username = ?",
            difficulty: "Easy",
            points: 100,
        },
        {
            id: 2,
            title: "Union Attack",
            description: "Use UNION to extract data from another table",
            hint: "Try using UNION SELECT to get product information",
            query: "SELECT username, email FROM users WHERE username = ?",
            difficulty: "Medium",
            points: 200,
        },
        {
            id: 3,
            title: "Blind Injection",
            description: "Extract admin password using boolean-based injection",
            hint: "Use AND and OR conditions to guess the password",
            query: "SELECT * FROM users WHERE username = ? AND password = ?",
            difficulty: "Hard",
            points: 300,
        },
    ];

    let isPlaying = false;
    let currentChallenge = 0;
    let userInput = "";
    let queryResult = "";
    let isSuccess = false;
    let showHint = false;
    let score = 0;
    let attempts = 0;
    let showSolution = false;
    let securityLevel = "low"; // low, medium, high
    let showDatabase = false;

    $: challenge = challenges[currentChallenge];

    // Simulate SQL query execution
    const executeQuery = () => {
        attempts += 1;

        try {
            // Simulate different security levels
            let sanitizedInput = userInput;

            if (securityLevel === "medium") {
                // Basic sanitization - remove common SQL keywords
                sanitizedInput = userInput.replace(/['";]/g, "");
            } else if (securityLevel === "high") {
                // Advanced sanitization - parameterized queries
                sanitizedInput = userInput.replace(/[^a-zA-Z0-9]/g, "");
            }

            // Simulate the vulnerable query
            let result = "";

            if (challenge.id === 1) {
                // Basic injection challenge
                if (
                    userInput.includes("' OR '1'='1") ||
                    userInput.includes("' OR 1=1")
                ) {
                    result =
                        "SUCCESS: All users extracted!\n" +
                        JSON.stringify(fakeDatabase.users, null, 2);
                    isSuccess = true;
                    score += challenge.points;
                } else {
                    result =
                        "Query executed but no sensitive data extracted. Try a different approach!";
                }
            } else if (challenge.id === 2) {
                // Union attack challenge
                if (
                    userInput.includes("UNION SELECT") ||
                    userInput.includes("union select")
                ) {
                    result =
                        "SUCCESS: Union attack successful!\n" +
                        JSON.stringify(fakeDatabase.products, null, 2);
                    isSuccess = true;
                    score += challenge.points;
                } else {
                    result =
                        "Query executed but union attack failed. Try using UNION SELECT!";
                }
            } else if (challenge.id === 3) {
                // Blind injection challenge
                if (
                    userInput.includes("admin") &&
                    userInput.includes("' OR '1'='1")
                ) {
                    result =
                        "SUCCESS: Admin password extracted!\nPassword: admin123";
                    isSuccess = true;
                    score += challenge.points;
                } else {
                    result =
                        "Query executed but blind injection failed. Try targeting admin user!";
                }
            }

            queryResult = result;
        } catch (error: any) {
            queryResult = `Error: ${error.message || "Unknown error"}`;
        }
    };

    // Start the game
    const startGame = () => {
        isPlaying = true;
        currentChallenge = 0;
        score = 0;
        attempts = 0;
        queryResult = "";
        isSuccess = false;
        showHint = false;
        showSolution = false;
        userInput = "";
        securityLevel = "low";
        showDatabase = false;
    };

    // Next challenge
    const nextChallenge = () => {
        if (currentChallenge < challenges.length - 1) {
            currentChallenge += 1;
            isSuccess = false;
            queryResult = "";
            showHint = false;
            showSolution = false;
            userInput = "";
        } else {
            // Game completed
            isPlaying = false;
        }
    };

    // Reset current challenge
    const resetChallenge = () => {
        isSuccess = false;
        queryResult = "";
        showHint = false;
        showSolution = false;
        userInput = "";
    };
</script>

<Navigation />

<div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 pt-24"
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
                    <Database class="w-8 h-8 text-purple-500" />
                    <h1 class="text-4xl font-bold gradient-text">
                        SQL Injection Challenge
                    </h1>
                </div>
            </Motion>
            <p
                class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
                Practice SQL injection techniques on a simulated database. Learn
                about security vulnerabilities and prevention! 🔒
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
                            Ready to Hack?
                        </h2>
                        <p class="text-slate-600 dark:text-slate-400 mb-6">
                            This is a safe, educational environment to learn
                            about SQL injection attacks. Practice different
                            techniques and understand how to prevent them.
                        </p>

                        <div class="grid md:grid-cols-3 gap-4 mb-8">
                            <div
                                class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-blue-500">
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
                                class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-purple-500">
                                    3
                                </div>
                                <div
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Difficulty Levels
                                </div>
                            </div>
                        </div>

                        <button
                            on:click={startGame}
                            class="btn-primary inline-flex items-center gap-2"
                        >
                            <Play class="w-4 h-4" />
                            Start Challenge
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
                <!-- Challenge Area -->
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
                                              ? "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20"
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

                        <!-- Query Display -->
                        <div class="mb-6">
                            <h4
                                class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                            >
                                Vulnerable Query:
                            </h4>
                            <div
                                class="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm"
                            >
                                {challenge.query}
                            </div>
                        </div>

                        <!-- Input Area -->
                        <div class="mb-6">
                            <label
                                for="sql-input"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Your SQL Injection:
                            </label>
                            <input
                                id="sql-input"
                                type="text"
                                bind:value={userInput}
                                placeholder="Enter your injection payload..."
                                class="w-full p-3 bg-slate-900 text-green-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <!-- Execute Button -->
                        <button
                            on:click={executeQuery}
                            class="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
                        >
                            <Zap class="w-4 h-4" />
                            Execute Query
                        </button>

                        <!-- Hint -->
                        <div class="mt-4">
                            <button
                                on:click={() => (showHint = !showHint)}
                                class="text-sm text-purple-500 hover:text-purple-600 transition-colors"
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
                                            class="mt-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
                                        >
                                            <p
                                                class="text-sm text-purple-700 dark:text-purple-300"
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

                <!-- Results Area -->
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
                                <button
                                    on:click={() =>
                                        (showDatabase = !showDatabase)}
                                    class="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                                    title="Toggle Database View"
                                >
                                    {#if showDatabase}
                                        <EyeOff class="w-4 h-4" />
                                    {:else}
                                        <Eye class="w-4 h-4" />
                                    {/if}
                                </button>
                            </div>
                        </div>

                        <!-- Database Schema -->
                        <AnimatePresence>
                            {#if showDatabase}
                                <Motion
                                    let:motion
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div
                                        use:motion
                                        class="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg"
                                    >
                                        <h4
                                            class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                                        >
                                            Database Schema:
                                        </h4>
                                        <div
                                            class="text-sm text-slate-600 dark:text-slate-400 space-y-2"
                                        >
                                            <div>
                                                <strong>users</strong> table: id,
                                                username, email, role, password
                                            </div>
                                            <div>
                                                <strong>products</strong>
                                                table: id, name, price, category
                                            </div>
                                        </div>
                                    </div>
                                </Motion>
                            {/if}
                        </AnimatePresence>

                        <!-- Query Result -->
                        {#if queryResult}
                            <div
                                class={`p-4 rounded-lg border ${
                                    isSuccess
                                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200"
                                        : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                                }`}
                            >
                                <div class="flex items-center gap-2 mb-2">
                                    {#if isSuccess}
                                        <CheckCircle
                                            class="w-4 h-4 text-green-500"
                                        />
                                    {:else}
                                        <Code class="w-4 h-4 text-slate-500" />
                                    {/if}
                                    <span class="font-medium"
                                        >Query Result:</span
                                    >
                                </div>
                                <pre
                                    class="text-sm whitespace-pre-wrap font-mono">{queryResult}</pre>
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
                                        class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700"
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
                                            Great job! You successfully
                                            exploited the SQL injection
                                            vulnerability.
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

                        <!-- Security Warning -->
                        <div
                            class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700"
                        >
                            <div class="flex items-center gap-2 mb-2">
                                <AlertTriangle class="w-4 h-4 text-red-500" />
                                <span
                                    class="font-medium text-red-800 dark:text-red-200"
                                    >Security Warning</span
                                >
                            </div>
                            <p class="text-sm text-red-700 dark:text-red-300">
                                This is a simulated environment for educational
                                purposes. Never attempt SQL injection on real
                                systems without permission!
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
                            Use SQL injection techniques to extract sensitive
                            data from the simulated database.
                        </p>
                    </div>
                    <div>
                        <h4
                            class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                        >
                            💻 Techniques
                        </h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Practice UNION attacks, boolean-based injection, and
                            other common SQL injection methods.
                        </p>
                    </div>
                    <div>
                        <h4
                            class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                        >
                            🏆 Scoring
                        </h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Earn points for each successful injection. Higher
                            difficulty = more points!
                        </p>
                    </div>
                    <div>
                        <h4
                            class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                        >
                            🔒 Learning
                        </h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Understand how to prevent these attacks in your own
                            applications.
                        </p>
                    </div>
                </div>
            </div>
        </Motion>
    </div>
</div>

<Footer />
