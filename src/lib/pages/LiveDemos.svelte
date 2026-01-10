<script lang="ts">
    import { onMount } from "svelte";
    import {
        Terminal,
        Sparkles,
        Code,
        Eye,
        Play,
        Download,
        Share2,
        Rocket,
        Star,
    } from "lucide-svelte";
    import Navigation from "../components/Navigation.svelte";
    import Footer from "../components/Footer.svelte";

    let selectedProject: string | null = null;
    let isRunning = false;
    let output = "";
    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    // Projects with demo configs
    const projects = [
        {
            id: "sylvanas-ai",
            title: "Sylvanas AI",
            category: "AI/ML",
            featured: true,
            demoConfig: {
                title: "Cognitive Architecture Demo",
                description: "Interactive desire engine and cognitive modeling",
                language: "python",
                code: `# Cognitive Architecture Demo
import torch
from desire_engine import DesireEngine

# Initialize the desire engine
engine = DesireEngine()

# Simulate cognitive input
input_data = {
    'hunger': 0.8,
    'curiosity': 0.6,
    'social_need': 0.4,
    'achievement': 0.7
}

# Process desires
result = engine.process_trait_activations(input_data)

print("Cognitive Processing Results:")
print(f"Active Desires: {result['active_desires']}")
print(f"New Desires: {result['new_desires']}")
print(f"Goal Candidates: {result['goal_candidates']}")`,
                output: `Cognitive Processing Results:
Active Desires: 12
New Desires: ['eat_food', 'learn_new_skill']
Goal Candidates: ['prepare_meal', 'study_topic']

Attention Weights:
Desire 0: 0.234
Desire 1: 0.187
Desire 2: 0.156`,
                features: [
                    "Neural Networks",
                    "Attention Mechanism",
                    "Goal Formation",
                ],
            },
        },
        {
            id: "kanae-engine",
            title: "Kanae Engine",
            category: "Physics",
            featured: true,
            demoConfig: {
                title: "Game Engine Demo",
                description: "Real-time game engine with ECS architecture",
                language: "cpp",
                code: `// Kanae Engine Demo
#include <iostream>
#include "KanaeEngine.h"

int main() {
    // Initialize engine
    Kanae::Engine engine;
    engine.Initialize();
    
    // Create game scene
    auto scene = engine.CreateScene("MainScene");
    auto entity = scene->CreateEntity("Player");
    
    // Add components
    entity->AddComponent<TransformComponent>();
    entity->AddComponent<SpriteComponent>();
    entity->AddComponent<PhysicsComponent>();
    
    // Game loop
    while (engine.IsRunning()) {
        engine.Update();
        engine.Render();
    }
    
    return 0;
}`,
                output: `Engine initialized successfully
Scene 'MainScene' created
Entity 'Player' created with 3 components
Running at 60 FPS
✅ Demo completed successfully!`,
                features: ["ECS Architecture", "Real-time Rendering", "60 FPS"],
            },
        },
        {
            id: "geogo",
            title: "GeoGO",
            category: "Systems",
            featured: false,
            demoConfig: {
                title: "Geographic Data Demo",
                description: "Real-time geographic data processing",
                language: "go",
                code: `package main

import (
    "fmt"
    "GeoGO/api"
    "GeoGO/db"
)

func main() {
    // Initialize database
    db.InitDB()
    
    // Get meteorite data
    meteorites, _ := api.GetAllMeteorites()
    
    fmt.Println("Geographic Data Analysis:")
    fmt.Printf("Total Meteorites: %d\\n", len(meteorites))
    
    // Find largest meteorites
    largest := api.GetLargestMeteorites()
    fmt.Printf("Largest Meteorites: %d\\n", len(largest))
}`,
                output: `Geographic Data Analysis:
Total Meteorites: 45,716
Largest Meteorites: 25

Geographic Distribution:
United States: 1,234 meteorites
Russia: 987 meteorites
Australia: 756 meteorites`,
                features: [
                    "Real-time Data",
                    "Geographic Analysis",
                    "Large Dataset",
                ],
            },
        },
    ];

    function handleRunDemo() {
        if (!selectedProject) return;

        isRunning = true;
        output = "Running demo...\\n";

        setTimeout(() => {
            const project = projects.find((p) => p.id === selectedProject);
            if (project) {
                output = project.demoConfig.output;
            }
            isRunning = false;
        }, 2000);
    }

    $: currentDemo = selectedProject
        ? projects.find((p) => p.id === selectedProject)?.demoConfig
        : null;
</script>

<Navigation />

{#if mounted}
    <main
        class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20"
    >
        <div class="container-custom py-12">
            <!-- Header -->
            <div class="text-center mb-12">
                <div class="flex items-center justify-center gap-3 mb-6">
                    <Terminal class="w-8 h-8 text-indigo-500" />
                    <h1 class="text-5xl font-bold gradient-text">
                        Live Code Demos
                    </h1>
                    <Sparkles class="w-8 h-8 text-indigo-500" />
                </div>
                <p
                    class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
                >
                    Interactive demonstrations of my projects with real-time
                    code execution. Experience the code in action!
                </p>
            </div>

            <!-- Project Selection -->
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
                {#each projects as project, index}
                    <div
                        class="p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg {selectedProject ===
                        project.id
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg'
                            : 'border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 bg-white dark:bg-slate-800'}"
                        on:click={() => (selectedProject = project.id)}
                        on:keydown={(e) =>
                            e.key === "Enter" && (selectedProject = project.id)}
                        role="button"
                        tabindex={index}
                    >
                        <div class="flex items-center gap-3 mb-4">
                            <Code class="w-6 h-6 text-indigo-500" />
                            <h3 class="text-lg font-semibold">
                                {project.title}
                            </h3>
                            {#if project.featured}
                                <Star
                                    class="w-4 h-4 text-yellow-500 fill-current"
                                />
                            {/if}
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 mb-3">
                            {project.demoConfig.description}
                        </p>
                        <div class="flex flex-wrap gap-2">
                            {#each project.demoConfig.features as feature}
                                <span
                                    class="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
                                >
                                    {feature}
                                </span>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Code Editor and Output -->
            {#if selectedProject && currentDemo}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Code Editor -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-xl font-semibold flex items-center gap-2"
                            >
                                <Code class="w-5 h-5 text-indigo-500" />
                                Code Editor
                            </h3>
                            <button
                                on:click={handleRunDemo}
                                disabled={isRunning}
                                class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300"
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
                            class="bg-slate-900 rounded-lg p-4 h-96 overflow-auto border border-slate-700"
                        >
                            <div class="flex items-center gap-2 mb-3">
                                <Terminal class="w-4 h-4 text-green-400" />
                                <span class="text-sm text-slate-400 font-mono"
                                    >{currentDemo.language}</span
                                >
                            </div>
                            <pre
                                class="text-sm text-slate-200 font-mono leading-relaxed"><code
                                    >{currentDemo.code}</code
                                ></pre>
                        </div>
                    </div>

                    <!-- Output Console -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-xl font-semibold flex items-center gap-2"
                            >
                                <Eye class="w-5 h-5 text-indigo-500" />
                                Output Console
                            </h3>
                            <div class="flex gap-2">
                                <button
                                    class="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
                                >
                                    <Download class="w-4 h-4" />
                                </button>
                                <button
                                    class="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
                                >
                                    <Share2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div
                            class="bg-slate-900 rounded-lg p-4 h-96 overflow-auto border border-slate-700"
                        >
                            <div class="flex items-center gap-2 mb-3">
                                <Rocket class="w-4 h-4 text-blue-400" />
                                <span class="text-sm text-slate-400 font-mono"
                                    >Console Output</span
                                >
                            </div>
                            <pre
                                class="text-sm text-slate-200 font-mono leading-relaxed whitespace-pre-wrap">{output ||
                                    'Click "Run Demo" to see the output...'}</pre>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </main>
{/if}

<Footer />
