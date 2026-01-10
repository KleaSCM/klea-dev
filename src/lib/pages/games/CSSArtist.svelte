<script lang="ts">
    import { link } from "svelte-spa-router";
    import Navigation from "../../components/Navigation.svelte";
    import Footer from "../../components/Footer.svelte";
    import { Motion, AnimatePresence } from "svelte-motion";
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
        Brush,
    } from "lucide-svelte";
    import { onMount } from "svelte";

    // CSS Challenges
    const challenges = [
        {
            id: 1,
            title: "Colorful Button",
            description:
                "Create a beautiful gradient button with hover effects",
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
            points: 100,
        },
        {
            id: 2,
            title: "Card Layout",
            description:
                "Create a responsive card with shadow and rounded corners",
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
            points: 200,
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
            points: 300,
        },
    ];

    let isPlaying = false;
    let currentChallenge = 0;
    let playerCSS = "";
    let isSuccess = false;
    let showHint = false;
    let score = 0;
    let attempts = 0;
    let showTarget = true;
    let previewMode = false;

    $: challenge = challenges[currentChallenge];

    // Check if CSS matches target
    const checkCSS = () => {
        attempts += 1;

        // Simple similarity check (in a real game, you'd use more sophisticated comparison)
        const playerCSSLower = playerCSS.toLowerCase();
        const targetCSSLower = challenge.targetCSS.toLowerCase();

        // Check for key properties
        const keyProperties = [
            "background",
            "border-radius",
            "padding",
            "box-shadow",
            "display",
            "flex",
        ];
        let matchScore = 0;

        keyProperties.forEach((prop) => {
            if (
                playerCSSLower.includes(prop) &&
                targetCSSLower.includes(prop)
            ) {
                matchScore += 1;
            }
        });

        const similarity = matchScore / keyProperties.length;

        if (similarity >= 0.6) {
            isSuccess = true;
            score += challenge.points;
            // Optionally update game stats in persistent storage here
        }
    };

    // Start the game
    const startGame = () => {
        isPlaying = true;
        currentChallenge = 0;
        score = 0;
        attempts = 0;
        isSuccess = false;
        showHint = false;
        playerCSS = "";
    };

    // Next challenge
    const nextChallenge = () => {
        if (currentChallenge < challenges.length - 1) {
            currentChallenge += 1;
            isSuccess = false;
            showHint = false;
            playerCSS = "";
        } else {
            // Game completed
            isPlaying = false;
            // Handle game completion (e.g., save score)
        }
    };

    // Reset current challenge
    const resetChallenge = () => {
        isSuccess = false;
        showHint = false;
        playerCSS = "";
    };

    // Helper to get difficulty color
    const getDifficultyColor = (difficulty: string) => {
        if (difficulty === "Easy")
            return "text-green-500 bg-green-100 dark:bg-green-900/20";
        if (difficulty === "Medium")
            return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
        return "text-red-500 bg-red-100 dark:bg-red-900/20";
    };

    $: targetPreviewHTML = `
      <${"style"}>
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
      </${"style"}>
      ${challenge.targetHTML}
    `;

    $: playerPreviewHTML = `
      <${"style"}>
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
      </${"style"}>
      ${challenge.targetHTML.replace("target-", "preview-")}
    `;
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
                    <Palette class="w-8 h-8 text-pink-500" />
                    <h1 class="text-4xl font-bold gradient-text">CSS Artist</h1>
                </div>
            </Motion>
            <p
                class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
                Create beautiful designs using only CSS! Match the target
                designs and unleash your creativity! 🎨
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
                            Ready to Create?
                        </h2>
                        <p class="text-slate-600 dark:text-slate-400 mb-6">
                            Express your creativity through CSS! Learn layout
                            techniques, animations, and responsive design while
                            creating beautiful visual elements.
                        </p>

                        <div class="grid md:grid-cols-3 gap-4 mb-8">
                            <div
                                class="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-pink-500">
                                    3
                                </div>
                                <div
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Challenges
                                </div>
                            </div>
                            <div
                                class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                            >
                                <div class="text-2xl font-bold text-blue-500">
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
                                    ∞
                                </div>
                                <div
                                    class="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Creativity
                                </div>
                            </div>
                        </div>

                        <button
                            on:click={startGame}
                            class="btn-primary inline-flex items-center gap-2"
                        >
                            <Play class="w-4 h-4" />
                            Start Creating
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

                        <!-- Target HTML -->
                        <div class="mb-6">
                            <h4
                                class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                            >
                                HTML Structure:
                            </h4>
                            <div
                                class="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre"
                            >
                                {challenge.targetHTML}
                            </div>
                        </div>

                        <!-- CSS Input -->
                        <div class="mb-6">
                            <label
                                for="css-input"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Your CSS:
                            </label>
                            <textarea
                                id="css-input"
                                bind:value={playerCSS}
                                placeholder="Write your CSS here..."
                                class="w-full h-32 p-4 bg-slate-900 text-blue-400 font-mono text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                            ></textarea>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-3">
                            <button
                                on:click={() => (previewMode = !previewMode)}
                                class="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
                            >
                                <Eye class="w-4 h-4" />
                                {previewMode ? "Hide" : "Show"} Preview
                            </button>
                            <button
                                on:click={checkCSS}
                                class="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-orange-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
                            >
                                <Zap class="w-4 h-4" />
                                Check CSS
                            </button>
                        </div>

                        <!-- Hint -->
                        <div class="mt-4">
                            <button
                                on:click={() => (showHint = !showHint)}
                                class="text-sm text-pink-500 hover:text-pink-600 transition-colors"
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
                                            class="mt-2 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-700"
                                        >
                                            <p
                                                class="text-sm text-pink-700 dark:text-pink-300"
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

                <!-- Preview Area -->
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
                                Preview
                            </h2>
                            <div class="flex items-center gap-2">
                                <button
                                    on:click={() => (showTarget = !showTarget)}
                                    class="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                                    title="Toggle Target View"
                                >
                                    <Target class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <!-- Target Design -->
                        <AnimatePresence>
                            {#if showTarget}
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
                                            Target Design:
                                        </h4>
                                        <div
                                            class="border-2 border-dashed border-slate-300 dark:border-slate-600 p-4 rounded-lg"
                                        >
                                            {@html targetPreviewHTML}
                                        </div>
                                    </div>
                                </Motion>
                            {/if}
                        </AnimatePresence>

                        <!-- Player Preview -->
                        <AnimatePresence>
                            {#if previewMode}
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
                                            Your Design:
                                        </h4>
                                        <div
                                            class="border-2 border-dashed border-pink-300 dark:border-pink-600 p-4 rounded-lg"
                                        >
                                            {@html playerPreviewHTML}
                                        </div>
                                    </div>
                                </Motion>
                            {/if}
                        </AnimatePresence>

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
                                            Beautiful work! Your CSS design
                                            matches the target perfectly.
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

                        <!-- CSS Tips -->
                        <div
                            class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
                        >
                            <div class="flex items-center gap-2 mb-2">
                                <Brush class="w-4 h-4 text-blue-500" />
                                <span
                                    class="font-medium text-blue-800 dark:text-blue-200"
                                    >CSS Tips</span
                                >
                            </div>
                            <p class="text-sm text-blue-700 dark:text-blue-300">
                                Use properties like background, border-radius,
                                padding, box-shadow, and display to create
                                beautiful designs!
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

        <!-- Game Instructions - Only visible when playing -->
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
                                🎨 Objective
                            </h4>
                            <p
                                class="text-sm text-slate-600 dark:text-slate-400"
                            >
                                Write CSS code to recreate the target designs
                                and unleash your creativity.
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
                                Practice CSS properties, layouts, animations,
                                and responsive design principles.
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
                                Earn points for accurate designs and creative
                                solutions. Higher difficulty = more points!
                            </p>
                        </div>
                        <div>
                            <h4
                                class="font-medium text-slate-800 dark:text-slate-200 mb-2"
                            >
                                ✨ Creativity
                            </h4>
                            <p
                                class="text-sm text-slate-600 dark:text-slate-400"
                            >
                                Experiment with different CSS properties and
                                create unique visual effects.
                            </p>
                        </div>
                    </div>
                </div>
            </Motion>
        {/if}
    </div>
</div>

<Footer />
