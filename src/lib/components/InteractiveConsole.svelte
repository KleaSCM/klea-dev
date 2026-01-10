<script lang="ts">
    import {
        Code,
        Play,
        Terminal,
        Rocket,
        Eye,
        Download,
        Share2,
        RotateCcw,
    } from "lucide-svelte";
    import { fade, slide } from "svelte/transition";

    export let projectId: string;
    export let projectTitle: string;

    let isRunning = false;
    let currentOutput = "";
    let showConsole = true;

    export let code: string = "";
    export let language: string = "typescript";
    export let output: string = "";
    export let description: string = "";

    // Fallback if no code provided
    $: displayCode =
        code ||
        `// ${projectTitle} Demo
console.log('Welcome to ${projectTitle}!');

// Interactive demonstration
class ${projectTitle.replace(/[^a-zA-Z]/g, "")}Demo {
    constructor() {
        this.initialize();
    }
    
    initialize() {
        console.log('Initializing ${projectTitle} demo...');
        this.runDemo();
    }
    
    runDemo() {
        console.log('Running demonstration...');
        console.log('✅ Demo completed successfully!');
    }
}

// Start the demo
new ${projectTitle.replace(/[^a-zA-Z]/g, "")}Demo();`;

    $: displayOutput =
        output ||
        `Welcome to ${projectTitle}!
Initializing ${projectTitle} demo...
Running demonstration...
✅ Demo completed successfully!`;

    $: displayLanguage = language || "typescript";

    function handleRun() {
        isRunning = true;
        currentOutput = "Running demo...\n";

        setTimeout(() => {
            currentOutput = displayOutput; // displayed output is derived from prop output
            isRunning = false;
        }, 2000);
    }

    function handleClear() {
        currentOutput = "";
    }
</script>

<div class="space-y-6">
    <div class="flex items-center gap-3 mb-6">
        <Terminal class="w-8 h-8 text-primary" />
        <h2 class="text-3xl font-bold gradient-text">Interactive Demo</h2>
    </div>

    {#if description}
        <p class="text-slate-600 dark:text-slate-400 -mt-4 mb-6">
            {description}
        </p>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Code Editor -->
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3
                    class="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200"
                >
                    <Code class="w-5 h-5 text-primary" />
                    Code Editor
                </h3>
                <button
                    on:click={handleRun}
                    disabled={isRunning}
                    class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300 transform active:scale-95"
                >
                    {#if isRunning}
                        <div
                            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                        ></div>
                        Running...
                    {:else}
                        <Play class="w-4 h-4" />
                        Run Demo
                    {/if}
                </button>
            </div>

            <div
                class="bg-gray-900 rounded-xl p-4 h-96 overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
            >
                <div
                    class="flex items-center gap-2 mb-3 pb-3 border-b border-gray-800"
                >
                    <div class="flex gap-1.5">
                        <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div
                            class="w-3 h-3 rounded-full bg-yellow-500/80"
                        ></div>
                        <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div
                        class="ml-4 flex items-center gap-2 text-xs text-slate-400 font-mono bg-gray-800 px-2 py-1 rounded"
                    >
                        <Code class="w-3 h-3" />
                        {displayLanguage}
                    </div>
                </div>
                <div class="overflow-auto flex-1 custom-scrollbar">
                    <pre
                        class="text-sm text-slate-200 font-mono leading-relaxed p-2"><code
                            >{displayCode}</code
                        ></pre>
                </div>
            </div>
        </div>

        <!-- Output Console -->
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3
                    class="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200"
                >
                    <Eye class="w-5 h-5 text-primary" />
                    Output Console
                </h3>
                <div class="flex gap-2">
                    <button
                        class="p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                        title="Clear Console"
                        on:click={handleClear}
                    >
                        <RotateCcw class="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div
                class="bg-black rounded-xl p-4 h-96 overflow-hidden border border-slate-800 shadow-2xl flex flex-col relative"
            >
                <div
                    class="flex items-center gap-2 mb-3 pb-3 border-b border-gray-800"
                >
                    <Rocket class="w-4 h-4 text-blue-400" />
                    <span class="text-sm text-slate-400 font-mono"
                        >Console Output</span
                    >
                </div>

                <div
                    class="overflow-auto flex-1 custom-scrollbar bg-black/50 p-2 font-mono text-sm leading-relaxed"
                >
                    {#if currentOutput}
                        <div in:fade class="text-green-400 whitespace-pre-wrap">
                            {currentOutput}
                        </div>
                    {:else}
                        <div
                            class="text-slate-600 italic flex items-center justify-center h-full"
                        >
                            Click "Run Demo" to see output...
                        </div>
                    {/if}
                </div>

                {#if isRunning}
                    <div
                        class="absolute bottom-4 right-4 text-xs text-slate-500 font-mono animate-pulse"
                    >
                        Processing...
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }
</style>
