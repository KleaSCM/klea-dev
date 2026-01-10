<script lang="ts">
    import { onMount } from "svelte";
    import { Motion } from "svelte-motion";

    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    interface Skill {
        name: string;
        level: number;
        category: string;
        color: string;
    }

    const skills: Skill[] = [
        // Backend & Systems
        {
            name: "Go",
            level: 95,
            category: "Backend & Systems",
            color: "from-blue-500 to-blue-600",
        },
        {
            name: "C++",
            level: 90,
            category: "Backend & Systems",
            color: "from-purple-500 to-purple-600",
        },
        {
            name: "Python",
            level: 92,
            category: "Backend & Systems",
            color: "from-yellow-500 to-yellow-600",
        },
        {
            name: "Rust",
            level: 77,
            category: "Backend & Systems",
            color: "from-orange-500 to-orange-600",
        },
        {
            name: "Node.js",
            level: 81,
            category: "Backend & Systems",
            color: "from-green-500 to-green-600",
        },

        // Frontend & Web
        {
            name: "TypeScript",
            level: 84,
            category: "Frontend & Web",
            color: "from-blue-500 to-blue-600",
        },
        {
            name: "React",
            level: 82,
            category: "Frontend & Web",
            color: "from-cyan-500 to-cyan-600",
        },
        {
            name: "Svelte",
            level: 88,
            category: "Frontend & Web",
            color: "from-red-500 to-red-600",
        },
        {
            name: "Tailwind CSS",
            level: 95,
            category: "Frontend & Web",
            color: "from-teal-500 to-teal-600",
        },
        {
            name: "CSS",
            level: 94,
            category: "Frontend & Web",
            color: "from-indigo-500 to-indigo-600",
        },

        // AI/ML & Research
        {
            name: "TensorFlow",
            level: 80,
            category: "AI/ML & Research",
            color: "from-orange-500 to-orange-600",
        },
        {
            name: "PyTorch",
            level: 85,
            category: "AI/ML & Research",
            color: "from-red-500 to-red-600",
        },
        {
            name: "OpenCV",
            level: 78,
            category: "AI/ML & Research",
            color: "from-green-500 to-green-600",
        },
        {
            name: "NLP",
            level: 83,
            category: "AI/ML & Research",
            color: "from-indigo-500 to-indigo-600",
        },

        // DevOps & Tools
        {
            name: "Docker",
            level: 78,
            category: "DevOps & Tools",
            color: "from-blue-500 to-blue-600",
        },
        {
            name: "Kubernetes",
            level: 70,
            category: "DevOps & Tools",
            color: "from-blue-500 to-blue-600",
        },
        {
            name: "AWS",
            level: 75,
            category: "DevOps & Tools",
            color: "from-yellow-500 to-yellow-600",
        },
        {
            name: "Git",
            level: 94,
            category: "DevOps & Tools",
            color: "from-orange-500 to-orange-600",
        },

        // Databases
        {
            name: "PostgreSQL",
            level: 88,
            category: "Databases",
            color: "from-blue-500 to-blue-600",
        },
        {
            name: "Redis",
            level: 85,
            category: "Databases",
            color: "from-red-500 to-red-600",
        },
        {
            name: "MySQL",
            level: 88,
            category: "Databases",
            color: "from-orange-500 to-orange-600",
        },
        {
            name: "SQLite",
            level: 88,
            category: "Databases",
            color: "from-green-500 to-green-600",
        },
        {
            name: "MongoDB",
            level: 70,
            category: "Databases",
            color: "from-green-500 to-green-600",
        },
    ];

    const categoryEmojis: Record<string, string> = {
        "Backend & Systems": "🧱",
        "Frontend & Web": "🌐",
        "AI/ML & Research": "🧠",
        "DevOps & Tools": "⚙️",
        Databases: "🗄",
    };

    const categories = [...new Set(skills.map((s) => s.category))];
</script>

{#if mounted}
    <div class="space-y-12">
        {#each categories as category, catIndex}
            <Motion
                let:motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div use:motion class="space-y-6">
                    <h3
                        class="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-3"
                    >
                        <span class="text-2xl">{categoryEmojis[category]}</span>
                        {category}
                    </h3>

                    <div class="grid md:grid-cols-2 gap-6">
                        {#each skills.filter((s) => s.category === category) as skill, index}
                            <Motion
                                let:motion
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div use:motion class="space-y-2">
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <span
                                            class="text-sm font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            {skill.name}
                                        </span>
                                        <span
                                            class="text-sm font-bold text-slate-600 dark:text-slate-400"
                                        >
                                            {skill.level}%
                                        </span>
                                    </div>

                                    <div
                                        class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden"
                                    >
                                        <Motion
                                            let:motion
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${skill.level}%`,
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                ease: "easeOut",
                                                delay: 0.2,
                                            }}
                                        >
                                            <div
                                                use:motion
                                                class="h-full bg-gradient-to-r {skill.color} rounded-full relative"
                                            >
                                                <!-- Animated shine effect -->
                                                <Motion
                                                    let:motion
                                                    animate={{
                                                        x: ["-100%", "100%"],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    <div
                                                        use:motion
                                                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                    ></div>
                                                </Motion>
                                            </div>
                                        </Motion>
                                    </div>
                                </div>
                            </Motion>
                        {/each}
                    </div>
                </div>
            </Motion>
        {/each}
    </div>
{/if}
