<script lang="ts">
    import {
        Target,
        Database,
        Palette,
        Bug,
        Lock,
        Zap,
        Play,
        Star,
        Trophy,
        TrendingUp,
    } from "lucide-svelte";
    import { push } from "svelte-spa-router";
    import { onMount } from "svelte";
    import { Motion, AnimatePresence } from "svelte-motion";

    interface Game {
        id: string;
        title: string;
        description: string;
        difficulty: "Easy" | "Medium" | "Hard";
        category: "Coding" | "Hacking" | "CSS" | "Logic";
        icon: any;
        isAvailable: boolean;
        comingSoon?: boolean;
        maxPoints: number;
    }

    interface PlayerStats {
        totalScore: number;
        gamesPlayed: number;
        gameScores: Record<string, number>;
        lastPlayed: string;
    }

    const games: Game[] = [
        {
            id: "button-stopper",
            title: "Button Stopper",
            description:
                "Write JavaScript code to stop a moving button. Use event listeners and DOM manipulation to catch it!",
            difficulty: "Easy",
            category: "Coding",
            icon: Target,
            isAvailable: true,
            maxPoints: 100,
        },
        {
            id: "sql-injection",
            title: "SQL Injection Challenge",
            description:
                "Practice safe SQL injection techniques on a fake database. Learn about input validation and sanitization.",
            difficulty: "Medium",
            category: "Hacking",
            icon: Database,
            isAvailable: true,
            maxPoints: 200,
        },
        {
            id: "css-artist",
            title: "CSS Artist",
            description:
                "Create beautiful designs using only CSS. Style elements to match the target design.",
            difficulty: "Easy",
            category: "CSS",
            icon: Palette,
            isAvailable: true,
            maxPoints: 150,
        },
        {
            id: "code-debugger",
            title: "Code Debugger",
            description:
                "Find and fix bugs in JavaScript code. Debug logical errors and syntax issues.",
            difficulty: "Medium",
            category: "Coding",
            icon: Bug,
            isAvailable: true,
            maxPoints: 300,
        },
        {
            id: "password-cracker",
            title: "Password Cracker",
            description:
                "Use brute force and dictionary attacks on a simulated password system.",
            difficulty: "Hard",
            category: "Hacking",
            icon: Lock,
            isAvailable: true,
            maxPoints: 300,
        },
        {
            id: "algorithm-race",
            title: "Algorithm Race",
            description:
                "Optimize algorithms to solve problems faster than your opponent.",
            difficulty: "Hard",
            category: "Logic",
            icon: Zap,
            isAvailable: false,
            comingSoon: true,
            maxPoints: 400,
        },
    ];

    let selectedCategory = "All";
    let selectedDifficulty = "All";
    let showStats = false;
    let playerStats: PlayerStats = {
        totalScore: 0,
        gamesPlayed: 0,
        gameScores: {},
        lastPlayed: "",
    };
    let mounted = false;

    const categories = ["All", "Coding", "Hacking", "CSS", "Logic"];
    const difficulties = ["All", "Easy", "Medium", "Hard"];

    onMount(() => {
        mounted = true;
        const savedStats = localStorage.getItem("klea-games-stats");
        if (savedStats) {
            try {
                playerStats = JSON.parse(savedStats);
            } catch (error) {
                console.error("Error loading stats:", error);
            }
        }
    });

    $: if (mounted) {
        try {
            localStorage.setItem(
                "klea-games-stats",
                JSON.stringify(playerStats),
            );
        } catch (error) {
            console.error("Error saving stats:", error);
        }
    }

    $: filteredGames = games.filter((game) => {
        const categoryMatch =
            selectedCategory === "All" || game.category === selectedCategory;
        const difficultyMatch =
            selectedDifficulty === "All" ||
            game.difficulty === selectedDifficulty;
        return categoryMatch && difficultyMatch;
    });

    $: totalPossibleScore = games.reduce(
        (sum, game) => sum + game.maxPoints,
        0,
    );

    function getDifficultyColor(difficulty: string): string {
        switch (difficulty) {
            case "Easy":
                return "text-green-500 bg-green-100 dark:bg-green-900/20";
            case "Medium":
                return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
            case "Hard":
                return "text-red-500 bg-red-100 dark:bg-red-900/20";
            default:
                return "text-slate-500 bg-slate-100 dark:bg-slate-900/20";
        }
    }

    function getCategoryColor(category: string): string {
        switch (category) {
            case "Coding":
                return "text-blue-500 bg-blue-100 dark:bg-blue-900/20";
            case "Hacking":
                return "text-purple-500 bg-purple-100 dark:bg-purple-900/20";
            case "CSS":
                return "text-pink-500 bg-pink-100 dark:bg-pink-900/20";
            case "Logic":
                return "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/20";
            default:
                return "text-slate-500 bg-slate-100 dark:bg-slate-900/20";
        }
    }

    function getScoreColor(score: number, maxScore: number): string {
        const percentage = score / maxScore;
        if (percentage >= 0.9) return "text-green-500";
        if (percentage >= 0.7) return "text-yellow-500";
        if (percentage >= 0.5) return "text-orange-500";
        return "text-slate-500";
    }

    function handlePlayGame(gameId: string) {
        playerStats = {
            ...playerStats,
            lastPlayed: new Date().toISOString(),
            gamesPlayed: playerStats.gamesPlayed + 1,
        };

        push(`/games/${gameId}`);
    }
</script>

{#if mounted}
    <section
        id="games"
        class="section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24"
    >
        <div class="container-custom">
            <Motion
                let:motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div use:motion class="text-center mb-16">
                    <h2 class="heading-responsive font-bold mb-6 gradient-text">
                        Interactive Games
                    </h2>
                    <p
                        class="text-responsive text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8"
                    >
                        Challenge yourself with coding puzzles, hacking
                        simulations, and creative CSS challenges. Learn while
                        having fun! 🎮✨
                    </p>

                    <div class="flex justify-center gap-8 mb-12">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-indigo-500">
                                6
                            </div>
                            <div
                                class="text-sm text-slate-600 dark:text-slate-400"
                            >
                                Total Games
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-pink-500">
                                5
                            </div>
                            <div
                                class="text-sm text-slate-600 dark:text-slate-400"
                            >
                                Available Now
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-purple-500">
                                4
                            </div>
                            <div
                                class="text-sm text-slate-600 dark:text-slate-400"
                            >
                                Categories
                            </div>
                        </div>
                    </div>

                    <Motion
                        let:motion
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <button
                            use:motion
                            onclick={() => (showStats = !showStats)}
                            class="btn-primary inline-flex items-center gap-2"
                        >
                            <Trophy class="w-5 h-5" />
                            {showStats ? "Hide" : "Show"} My Progress
                        </button>
                    </Motion>
                </div>
            </Motion>

            <AnimatePresence>
                {#if showStats}
                    <Motion
                        let:motion
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div
                            use:motion
                            class="mb-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                        >
                            <div class="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3
                                        class="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"
                                    >
                                        <TrendingUp class="w-5 h-5" />
                                        Your Progress
                                    </h3>

                                    <div class="grid grid-cols-2 gap-4 mb-6">
                                        <div
                                            class="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg"
                                        >
                                            <div
                                                class="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
                                            >
                                                {playerStats.totalScore}
                                            </div>
                                            <div
                                                class="text-sm text-slate-600 dark:text-slate-400"
                                            >
                                                Total Score
                                            </div>
                                        </div>
                                        <div
                                            class="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg"
                                        >
                                            <div
                                                class="text-2xl font-bold text-green-600 dark:text-green-400"
                                            >
                                                {playerStats.gamesPlayed}
                                            </div>
                                            <div
                                                class="text-sm text-slate-600 dark:text-slate-400"
                                            >
                                                Games Played
                                            </div>
                                        </div>
                                        <div
                                            class="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg"
                                        >
                                            <div
                                                class="text-2xl font-bold text-yellow-600 dark:text-yellow-400"
                                            >
                                                {Object.keys(
                                                    playerStats.gameScores,
                                                ).length}
                                            </div>
                                            <div
                                                class="text-sm text-slate-600 dark:text-slate-400"
                                            >
                                                Games Completed
                                            </div>
                                        </div>
                                        <div
                                            class="p-4 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-lg"
                                        >
                                            <div
                                                class="text-2xl font-bold text-pink-600 dark:text-pink-400"
                                            >
                                                {Math.round(
                                                    (playerStats.totalScore /
                                                        totalPossibleScore) *
                                                        100,
                                                )}%
                                            </div>
                                            <div
                                                class="text-sm text-slate-600 dark:text-slate-400"
                                            >
                                                Completion
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mb-4">
                                        <div
                                            class="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2"
                                        >
                                            <span>Overall Progress</span>
                                            <span
                                                >{playerStats.totalScore} / {totalPossibleScore}</span
                                            >
                                        </div>
                                        <div
                                            class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3"
                                        >
                                            <Motion
                                                let:motion
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${Math.min((playerStats.totalScore / totalPossibleScore) * 100, 100)}%`,
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    delay: 0.5,
                                                }}
                                            >
                                                <div
                                                    use:motion
                                                    class="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                                                ></div>
                                            </Motion>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3
                                        class="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"
                                    >
                                        <Trophy class="w-5 h-5" />
                                        Game Scores
                                    </h3>

                                    <div
                                        class="space-y-3 max-h-64 overflow-y-auto"
                                    >
                                        {#each games.filter((game) => playerStats.gameScores[game.id]) as game, index}
                                            <Motion
                                                let:motion
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.1,
                                                }}
                                            >
                                                <div
                                                    use:motion
                                                    class="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"
                                                >
                                                    <div
                                                        class="flex items-center justify-between"
                                                    >
                                                        <span
                                                            class="font-medium text-slate-800 dark:text-slate-200"
                                                        >
                                                            {game.title}
                                                        </span>
                                                        <span
                                                            class="text-sm text-slate-600 dark:text-slate-400"
                                                        >
                                                            {playerStats
                                                                .gameScores[
                                                                game.id
                                                            ]} / {game.maxPoints}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Motion>
                                        {/each}
                                        {#if Object.keys(playerStats.gameScores).length === 0}
                                            <p
                                                class="text-sm text-slate-500 dark:text-slate-400 text-center py-4"
                                            >
                                                No games completed yet. Start
                                                playing to see your scores!
                                            </p>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Motion>
                {/if}
            </AnimatePresence>

            <Motion
                let:motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div
                    use:motion
                    class="flex flex-wrap gap-4 justify-center mb-12"
                >
                    <div class="flex items-center gap-2">
                        <span
                            class="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >Category:</span
                        >
                        <select
                            bind:value={selectedCategory}
                            class="px-3 py-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            {#each categories as category}
                                <option value={category}>{category}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="flex items-center gap-2">
                        <span
                            class="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >Difficulty:</span
                        >
                        <select
                            bind:value={selectedDifficulty}
                            class="px-3 py-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            {#each difficulties as difficulty}
                                <option value={difficulty}>{difficulty}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </Motion>

            <Motion
                let:motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <div
                    use:motion
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                >
                    {#each filteredGames as game, index}
                        <Motion
                            let:motion
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2 + index * 0.1,
                            }}
                        >
                            <Motion
                                let:motion
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div
                                    use:motion
                                    class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div class="p-6">
                                        <div
                                            class="flex items-start justify-between mb-4"
                                        >
                                            <div
                                                class="flex items-center gap-3"
                                            >
                                                <div
                                                    class="p-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg"
                                                >
                                                    <svelte:component
                                                        this={game.icon}
                                                        class="w-6 h-6 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <h3
                                                        class="text-xl font-semibold text-slate-800 dark:text-slate-200"
                                                    >
                                                        {game.title}
                                                    </h3>
                                                    <div
                                                        class="flex gap-2 mt-2"
                                                    >
                                                        <span
                                                            class="px-2 py-1 rounded-full text-xs font-medium {getDifficultyColor(
                                                                game.difficulty,
                                                            )}"
                                                        >
                                                            {game.difficulty}
                                                        </span>
                                                        <span
                                                            class="px-2 py-1 rounded-full text-xs font-medium {getCategoryColor(
                                                                game.category,
                                                            )}"
                                                        >
                                                            {game.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {#if game.comingSoon}
                                                <span
                                                    class="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded"
                                                >
                                                    Coming Soon
                                                </span>
                                            {/if}
                                        </div>

                                        {#if playerStats.gameScores[game.id] !== undefined}
                                            <div
                                                class="mb-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg"
                                            >
                                                <div
                                                    class="flex items-center justify-between"
                                                >
                                                    <span
                                                        class="text-sm text-slate-600 dark:text-slate-400"
                                                        >Your Score:</span
                                                    >
                                                    <span
                                                        class="font-bold {getScoreColor(
                                                            playerStats
                                                                .gameScores[
                                                                game.id
                                                            ],
                                                            game.maxPoints,
                                                        )}"
                                                    >
                                                        {playerStats.gameScores[
                                                            game.id
                                                        ]} / {game.maxPoints}
                                                    </span>
                                                </div>
                                                <div
                                                    class="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mt-2"
                                                >
                                                    <div
                                                        class="h-2 rounded-full transition-all duration-300 {playerStats
                                                            .gameScores[
                                                            game.id
                                                        ] /
                                                            game.maxPoints >=
                                                        0.9
                                                            ? 'bg-green-500'
                                                            : playerStats
                                                                    .gameScores[
                                                                    game.id
                                                                ] /
                                                                    game.maxPoints >=
                                                                0.7
                                                              ? 'bg-yellow-500'
                                                              : playerStats
                                                                      .gameScores[
                                                                      game.id
                                                                  ] /
                                                                      game.maxPoints >=
                                                                  0.5
                                                                ? 'bg-orange-500'
                                                                : 'bg-slate-400'}"
                                                        style="width: {Math.min(
                                                            (playerStats
                                                                .gameScores[
                                                                game.id
                                                            ] /
                                                                game.maxPoints) *
                                                                100,
                                                            100,
                                                        )}%"
                                                    ></div>
                                                </div>
                                            </div>
                                        {/if}

                                        <p
                                            class="text-slate-600 dark:text-slate-400 mb-6 text-sm"
                                        >
                                            {game.description}
                                        </p>

                                        <button
                                            onclick={() =>
                                                handlePlayGame(game.id)}
                                            disabled={!game.isAvailable}
                                            class="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 {game.isAvailable
                                                ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transform hover:-translate-y-1'
                                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'}"
                                        >
                                            {#if game.isAvailable}
                                                <span
                                                    class="flex items-center justify-center gap-2"
                                                >
                                                    <Play class="w-4 h-4" />
                                                    {playerStats.gameScores[
                                                        game.id
                                                    ] !== undefined
                                                        ? "Play Again"
                                                        : "Play Now"}
                                                </span>
                                            {:else}
                                                <span
                                                    class="flex items-center justify-center gap-2"
                                                >
                                                    <Star class="w-4 h-4" />
                                                    Coming Soon
                                                </span>
                                            {/if}
                                        </button>
                                    </div>
                                </div>
                            </Motion>
                        </Motion>
                    {/each}
                </div>
            </Motion>

            <Motion
                let:motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <div use:motion class="text-center">
                    <h3
                        class="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4"
                    >
                        Ready to Play?
                    </h3>
                    <p
                        class="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto"
                    >
                        Choose a game above and start your coding adventure!
                        Each game is designed to teach real programming concepts
                        in a fun, interactive way.
                    </p>
                    <button
                        onclick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })}
                        class="btn-primary inline-flex items-center gap-2"
                    >
                        <Trophy class="w-5 h-5" />
                        View All Games
                    </button>
                </div>
            </Motion>
        </div>
    </section>
{/if}
