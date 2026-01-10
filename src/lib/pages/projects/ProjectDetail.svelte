<script lang="ts">
    import { onMount } from "svelte";
    import { link } from "svelte-spa-router";
    import {
        Github,
        ExternalLink,
        Star,
        Code,
        Layers,
        Database,
        Wrench,
        Globe,
        Target,
        AlertTriangle,
        CheckCircle,
        Network,
        Cpu,
        BarChart3,
        FileText,
        MessageSquare,
        ArrowRight,
        TrendingUp,
        Download,
        Mail,
        Brain,
        Lightbulb,
    } from "lucide-svelte";
    import Navigation from "../../components/Navigation.svelte";
    import Footer from "../../components/Footer.svelte";
    import { projects } from "../../data/projects";
    import LoadingSpinner from "../../components/LoadingSpinner.svelte";
    import InteractiveConsole from "../../components/InteractiveConsole.svelte";

    export let params: { id: string } = { id: "" };

    import type { Project } from "../../data/projects";

    import { getProjectById } from "../../services/github";

    let project: Project | null = null;
    let mounted = false;
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        mounted = true;
        try {
            // Fetch project data - this handles both static and dynamic lookups
            const fetchedProject = await getProjectById(params.id);

            if (fetchedProject) {
                project = fetchedProject;

                // If we have a project and it has a GitHub URL, try to fetch dynamic details from TEMPLATE.md
                if (project.github || project.id) {
                    const { getCachedProjectDetails } = await import(
                        "../../services/githubReadme"
                    );

                    // Use repo name or ID to fetch template
                    const dynamicDetails = await getCachedProjectDetails(
                        project.id,
                    );

                    if (dynamicDetails) {
                        console.log("Loaded dynamic details for", project.id);
                        // Merge dynamic details into project
                        project = {
                            ...project,
                            ...dynamicDetails,
                            highlights:
                                dynamicDetails.highlights || project.highlights,
                            technicalStack:
                                dynamicDetails.technicalStack ||
                                project.technicalStack,
                            codeSnippets:
                                dynamicDetails.codeSnippets ||
                                project.codeSnippets,
                            architecture:
                                dynamicDetails.architecture ||
                                project.architecture,
                            performanceStats:
                                dynamicDetails.performanceStats ||
                                project.performanceStats,
                            benchmarks:
                                dynamicDetails.benchmarks || project.benchmarks,
                            futurePlans:
                                dynamicDetails.futurePlans ||
                                project.futurePlans,
                            designDecisions:
                                dynamicDetails.designDecisions ||
                                project.designDecisions,
                            prerequisites:
                                dynamicDetails.prerequisites ||
                                project.prerequisites,
                            installation:
                                dynamicDetails.installation ||
                                project.installation,
                            usage: dynamicDetails.usage || project.usage,
                            lessonsLearned:
                                dynamicDetails.lessonsLearned ||
                                project.lessonsLearned,
                            contact: dynamicDetails.contact || project.contact,
                            license: dynamicDetails.license || project.license,
                        } as Project;
                    }
                }
            } else {
                error = "Project not found";
            }
        } catch (err) {
            console.error("Error loading project:", err);
            error = "Failed to load project";
        } finally {
            loading = false;
        }
    });

    // Helper function to clean markdown while preserving bold formatting
    function cleanMarkdown(text: any): string {
        if (typeof text !== "string") return String(text);
        return text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>");
    }

    // Get color scheme for different sections
    function getSectionColors(sectionName: string) {
        const colors: Record<string, any> = {
            Languages: {
                bg: "from-blue-500/20 to-blue-600/10",
                text: "text-blue-600",
                border: "border-blue-500/20",
                hover: "hover:from-blue-500/30 hover:to-blue-600/20",
            },
            "Frameworks & Libraries": {
                bg: "from-purple-500/20 to-purple-600/10",
                text: "text-purple-600",
                border: "border-purple-500/20",
                hover: "hover:from-purple-500/30 hover:to-purple-600/20",
            },
            "Databases & Storage": {
                bg: "from-green-500/20 to-green-600/10",
                text: "text-green-600",
                border: "border-green-500/20",
                hover: "hover:from-green-500/30 hover:to-green-600/20",
            },
            "Tools & Platforms": {
                bg: "from-orange-500/20 to-orange-600/10",
                text: "text-orange-600",
                border: "border-orange-500/20",
                hover: "hover:from-orange-500/30 hover:to-orange-600/20",
            },
        };
        return (
            colors[sectionName] || {
                bg: "from-secondary/20 to-secondary/10",
                text: "text-secondary",
                border: "border-secondary/20",
                hover: "hover:from-secondary/30 hover:to-secondary/20",
            }
        );
    }

    // Helper function to get icon for subsections
    function getSectionIcon(subsectionName: string) {
        if (subsectionName.toLowerCase().includes("challenge")) return "⚠️";
        if (subsectionName.toLowerCase().includes("goal")) return "🎯";
        return "💻";
    }

    // Define section icons
    const sectionIcons: Record<string, any> = {
        "🚀 Key Features": Star,
        "🛠️ Technology Stack": Wrench,
        "🎯 Problem Statement": Target,
        "🏗️ Architecture": Network,
        "📊 Performance Metrics": BarChart3,
        "💻 Code Snippets": Code,
        "💭 Commentary": MessageSquare,
        "🚀 Getting Started": ArrowRight,
        "📝 License": FileText,
        "🤝 Contributing": MessageSquare,
        "📞 Contact": Mail,
        "🧪 Benchmarks": BarChart3,
        "🔮 Future Plans": TrendingUp,
        "💡 Design Decisions": Brain,
        "📋 Prerequisites": Layers,
        "⬇️ Installation": Download,
        "🖱️ Usage": ExternalLink,
        "🎓 Lessons Learned": CheckCircle,
    };
</script>

<Navigation />

{#if mounted}
    {#if loading}
        <div class="min-h-screen flex items-center justify-center">
            <div
                class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
            ></div>
        </div>
    {:else if error}
        <div
            class="min-h-screen flex flex-col items-center justify-center space-y-4"
        >
            <h1 class="text-3xl font-bold text-red-500">Error</h1>
            <p class="text-xl text-slate-600 dark:text-slate-400">{error}</p>
            <a href="#/projects" class="btn-primary">Back to Projects</a>
        </div>
    {:else if project}
        <main class="min-h-screen">
            <!-- Hero Section -->
            <section
                class="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
                {#if project.image}
                    <div
                        class="absolute inset-0 z-0 opacity-20 dark:opacity-10"
                        style="background-image: url('{project.image}'); background-size: cover; background-position: center;"
                    ></div>
                {/if}

                <div
                    class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
                ></div>

                <div class="container-custom relative z-10">
                    <div class="text-center">
                        <!-- Project badges -->
                        <div class="flex flex-wrap justify-center gap-3 mb-6">
                            {#if project.category}
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                                >
                                    {project.category}
                                </span>
                            {/if}
                            {#if project.featured}
                                <span
                                    class="px-4 py-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium border border-yellow-300 dark:border-yellow-600 flex items-center gap-2"
                                >
                                    <Star class="w-4 h-4" />
                                    Featured
                                </span>
                            {/if}
                        </div>

                        <!-- Title -->
                        <h1
                            class="text-5xl md:text-7xl font-bold mb-6 gradient-text"
                        >
                            {project.title}
                        </h1>

                        <!-- Description -->
                        <p
                            class="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-4xl mx-auto leading-relaxed"
                        >
                            {project.description}
                        </p>

                        <!-- Key Features from highlights -->
                        {#if project.highlights && project.highlights.length > 0}
                            <div class="mb-8">
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto"
                                >
                                    {#each project.highlights.slice(0, 4) as feature}
                                        <div
                                            class="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg p-4 text-left"
                                        >
                                            <p
                                                class="text-slate-700 dark:text-slate-300"
                                            >
                                                {@html cleanMarkdown(feature)}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        <!-- Action buttons -->
                        <div class="flex flex-wrap justify-center gap-4 mb-8">
                            {#if project.github}
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn-primary inline-flex items-center gap-2"
                                >
                                    <Github class="w-4 h-4" />
                                    View on GitHub
                                </a>
                            {/if}
                            {#if project.live}
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn-secondary inline-flex items-center gap-2"
                                >
                                    <ExternalLink class="w-4 h-4" />
                                    Live Demo
                                </a>
                            {/if}
                        </div>
                    </div>
                </div>
            </section>

            <!-- Technology Stack Section -->
            {#if project.technicalStack || project.technologies}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Wrench class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Technology Stack
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if project.technicalStack}
                                <!-- Render as categorized tech stack -->
                                <div class="space-y-6">
                                    {#each Object.entries(project.technicalStack) as [category, items]}
                                        <div class="space-y-3">
                                            <h4
                                                class="text-lg font-semibold text-gray-800 dark:text-gray-200"
                                            >
                                                {category}
                                            </h4>
                                            <div class="flex flex-wrap gap-3">
                                                {#each items || [] as item}
                                                    {@const colors =
                                                        getSectionColors(
                                                            category,
                                                        )}
                                                    <span
                                                        class="px-4 py-2 bg-gradient-to-r {colors.bg} {colors.text} rounded-full text-sm font-medium border {colors.border} {colors.hover} transition-all duration-200 shadow-sm"
                                                    >
                                                        {@html cleanMarkdown(
                                                            item,
                                                        )}
                                                    </span>
                                                {/each}
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {:else if project.technologies}
                                <!-- Render as simple tech list -->
                                <div class="flex flex-wrap gap-3">
                                    {#each project.technologies as tech}
                                        <span
                                            class="px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:from-primary/30 hover:to-primary/20 transition-all duration-200 shadow-sm"
                                        >
                                            {tech}
                                        </span>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Problem Statement Section -->
            {#if project.problemStatement}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Target class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Problem Statement
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            <div class="card p-8">
                                <p
                                    class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed"
                                >
                                    {@html cleanMarkdown(
                                        project.problemStatement,
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Architecture Section -->
            {#if project.architecture}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Network class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Architecture
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if Array.isArray(project.architecture)}
                                <!-- Render as component cards -->
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {#each project.architecture as component}
                                        {@const emojiMatch =
                                            component.match(
                                                /^([🧬💭🎯📝🧪⚡])/,
                                            )}
                                        {@const emoji = emojiMatch
                                            ? emojiMatch[1]
                                            : "⚡"}
                                        {@const title = component
                                            .replace(/^[🧬💭🎯📝🧪⚡]\s*/, "")
                                            .split(":")[0]}
                                        {@const description =
                                            component.split(":")[1] || ""}

                                        <div
                                            class="group relative bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
                                        >
                                            <div
                                                class="flex items-start space-x-4"
                                            >
                                                <div
                                                    class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                                                >
                                                    {emoji}
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <h5
                                                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary transition-colors duration-300"
                                                    >
                                                        {@html cleanMarkdown(
                                                            title,
                                                        )}
                                                    </h5>
                                                    <p
                                                        class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                                    >
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            ></div>
                                        </div>
                                    {/each}
                                </div>
                            {:else}
                                <!-- Render as text -->
                                <div class="card p-8">
                                    <p
                                        class="text-slate-700 dark:text-slate-300 leading-relaxed"
                                    >
                                        {@html cleanMarkdown(
                                            project.architecture,
                                        )}
                                    </p>
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Benchmarks Section -->
            {#if project.benchmarks}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <BarChart3 class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Benchmarks
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if Array.isArray(project.benchmarks)}
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {#each project.benchmarks as item}
                                        {@const parts = item.split(":")}
                                        {@const benchmarkName =
                                            parts[0]?.replace(/\*\*/g, "") ||
                                            ""}
                                        {@const valueAndDesc = parts
                                            .slice(1)
                                            .join(":")
                                            .split(" - ")}
                                        {@const value = valueAndDesc[0] || ""}
                                        {@const description =
                                            valueAndDesc[1] || ""}

                                        <!-- Parse numeric values -->
                                        {@const numMatch =
                                            value.match(/(\d+(?:\.\d+)?)/)}
                                        {@const percentMatch =
                                            value.match(/(\d+(?:\.\d+)?)%/)}
                                        {@const timeMatch =
                                            value.match(/>(\d+)/)}
                                        {@const parsedValue = percentMatch
                                            ? parseFloat(percentMatch[1])
                                            : numMatch
                                              ? parseFloat(numMatch[1])
                                              : 0}
                                        {@const max = percentMatch
                                            ? 100
                                            : timeMatch
                                              ? 600
                                              : 100}
                                        {@const percentage = Math.min(
                                            (parsedValue / max) * 100,
                                            100,
                                        )}
                                        {@const normalizedPercent = isNaN(
                                            percentage,
                                        )
                                            ? 0
                                            : percentage}

                                        <div
                                            class="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
                                        >
                                            <div class="space-y-4">
                                                <div
                                                    class="flex items-center justify-between"
                                                >
                                                    <h5
                                                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300"
                                                    >
                                                        {benchmarkName}
                                                    </h5>
                                                    <div
                                                        class="text-2xl font-bold text-primary"
                                                    >
                                                        {value}
                                                    </div>
                                                </div>

                                                <div class="space-y-3">
                                                    <div
                                                        class="flex justify-between text-sm text-gray-600 dark:text-gray-400"
                                                    >
                                                        <span
                                                            class="font-medium"
                                                            >Performance</span
                                                        >
                                                        <span
                                                            class="font-bold text-primary"
                                                            >{normalizedPercent.toFixed(
                                                                1,
                                                            )}%</span
                                                        >
                                                    </div>

                                                    <!-- Animated progress bar container -->
                                                    <div
                                                        class="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner"
                                                    >
                                                        <!-- Main progress bar with gradient animation -->
                                                        <div
                                                            class="h-full bg-gradient-to-r {normalizedPercent >
                                                            80
                                                                ? 'from-green-500 to-green-600'
                                                                : normalizedPercent >
                                                                    50
                                                                  ? 'from-blue-500 to-blue-600'
                                                                  : 'from-yellow-500 to-orange-500'} transition-all duration-1000 ease-out relative overflow-hidden"
                                                            style="width: {normalizedPercent}%"
                                                        >
                                                            <!-- Shimmer effect -->
                                                            <div
                                                                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                                                                style="background-size: 200% 100%"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p
                                                    class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                                >
                                                    {description}
                                                </p>
                                            </div>
                                            <div
                                                class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            ></div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Prerequisites Section -->
            {#if project.prerequisites}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Layers class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Prerequisites
                            </h2>
                        </div>
                        <div class="max-w-6xl mx-auto flex flex-wrap gap-3">
                            {#if Array.isArray(project.prerequisites)}
                                {#each project.prerequisites as item}
                                    {@const cleanItem = item
                                        .replace(/\*\*/g, "")
                                        .trim()}
                                    {@const lowerText = cleanItem.toLowerCase()}
                                    {@const colorClass = lowerText.includes(
                                        "python",
                                    )
                                        ? "from-blue-500/20 to-blue-600/10 text-blue-600 border-blue-500/20"
                                        : lowerText.includes("gpu") ||
                                            lowerText.includes("cuda")
                                          ? "from-purple-500/20 to-purple-600/10 text-purple-600 border-purple-500/20"
                                          : lowerText.includes("ram") ||
                                              lowerText.includes("memory")
                                            ? "from-green-500/20 to-green-600/10 text-green-600 border-green-500/20"
                                            : "from-primary/20 to-primary/10 text-primary border-primary/20"}
                                    <span
                                        class="px-4 py-2 bg-gradient-to-r {colorClass} rounded-full text-sm font-medium border transition-all duration-200 shadow-sm"
                                    >
                                        {cleanItem}
                                    </span>
                                {/each}
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Installation Section -->
            {#if project.installation}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Download class="w-8 h-8 text-green-600" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Installation
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto space-y-4">
                            {#if Array.isArray(project.installation)}
                                {#each project.installation as item}
                                    {#if typeof item === "object" && item !== null}
                                        {@const codeObj = item}
                                        {@const code =
                                            codeObj.code || codeObj.value || ""}
                                        {@const language =
                                            codeObj.language || "bash"}
                                        {@const title =
                                            codeObj.title ||
                                            "Installation Command"}
                                        <div
                                            class="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-green-400/30"
                                        >
                                            <div class="space-y-4">
                                                <div
                                                    class="flex items-center space-x-3"
                                                >
                                                    <div
                                                        class="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform duration-300"
                                                    >
                                                        <Download
                                                            class="w-5 h-5"
                                                        />
                                                    </div>
                                                    <h5
                                                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-600 transition-colors duration-300"
                                                    >
                                                        {title}
                                                    </h5>
                                                </div>
                                                {#if code}
                                                    <div class="relative">
                                                        <div
                                                            class="absolute top-3 right-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                                                        >
                                                            {language}
                                                        </div>
                                                        <pre
                                                            class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code
                                                                >{code}</code
                                                            ></pre>
                                                    </div>
                                                {/if}
                                            </div>
                                        </div>
                                    {:else}
                                        <span
                                            class="px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-600 border-green-500/20 rounded-full text-sm font-medium border transition-all duration-200 shadow-sm"
                                        >
                                            {item}
                                        </span>
                                    {/if}
                                {/each}
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Usage Section -->
            {#if project.usage}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <ExternalLink class="w-8 h-8 text-blue-600" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Usage
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto space-y-4">
                            {#if Array.isArray(project.usage)}
                                {#each project.usage as item}
                                    {#if typeof item === "object" && item !== null}
                                        {@const codeObj = item}
                                        {@const code =
                                            codeObj.code || codeObj.value || ""}
                                        {@const language =
                                            codeObj.language || "bash"}
                                        {@const title =
                                            codeObj.title || "Usage Command"}
                                        <div
                                            class="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-400/30"
                                        >
                                            <div class="space-y-4">
                                                <div
                                                    class="flex items-center space-x-3"
                                                >
                                                    <div
                                                        class="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300"
                                                    >
                                                        <ExternalLink
                                                            class="w-5 h-5"
                                                        />
                                                    </div>
                                                    <h5
                                                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors duration-300"
                                                    >
                                                        {title}
                                                    </h5>
                                                </div>
                                                {#if code}
                                                    <div class="relative">
                                                        <div
                                                            class="absolute top-3 right-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                                                        >
                                                            {language}
                                                        </div>
                                                        <pre
                                                            class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code
                                                                >{code}</code
                                                            ></pre>
                                                    </div>
                                                {/if}
                                            </div>
                                        </div>
                                    {:else}
                                        <span
                                            class="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-600 border-blue-500/20 rounded-full text-sm font-medium border transition-all duration-200 shadow-sm"
                                        >
                                            {item}
                                        </span>
                                    {/if}
                                {/each}
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Interactive Console Demo -->
            {#if project.id}
                <section class="section">
                    <div class="container-custom">
                        <InteractiveConsole
                            projectId={project.id}
                            projectTitle={project.title}
                        />
                    </div>
                </section>
            {/if}

            <!-- Contact Section -->
            {#if project.contact}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Mail class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Contact
                            </h2>
                        </div>
                        <div
                            class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {#if Array.isArray(project.contact)}
                                {#each project.contact as item}
                                    {@const contactText = item
                                        .replace(/\*\*/g, "")
                                        .trim()}
                                    {@const parts = contactText.split(":")}
                                    {@const contactType =
                                        parts[0]?.trim() || ""}
                                    {@const contactValue = parts
                                        .slice(1)
                                        .join(":")
                                        .trim()}
                                    {@const lowerType =
                                        contactType.toLowerCase()}
                                    {@const icon = lowerType.includes("email")
                                        ? "📧"
                                        : lowerType.includes("github")
                                          ? "🐙"
                                          : lowerType.includes("linkedin")
                                            ? "💼"
                                            : "📞"}

                                    <div
                                        class="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
                                    >
                                        <div
                                            class="flex items-center space-x-4"
                                        >
                                            <div
                                                class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                                            >
                                                {icon}
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <h5
                                                    class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary transition-colors duration-300"
                                                >
                                                    {contactType}
                                                </h5>
                                                <div
                                                    class="text-sm text-gray-600 dark:text-gray-400 truncate"
                                                >
                                                    {contactValue}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Performance Metrics Section -->
            {#if project.performanceStats}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <BarChart3 class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Performance Metrics
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            <div
                                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {#each Object.entries(project.performanceStats) as [key, value]}
                                    <div
                                        class="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
                                    >
                                        <div class="flex items-start space-x-4">
                                            <div
                                                class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300"
                                            >
                                                <BarChart3 class="w-6 h-6" />
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <h5
                                                    class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary transition-colors duration-300"
                                                >
                                                    {key
                                                        .replace(
                                                            /([A-Z])/g,
                                                            " $1",
                                                        )
                                                        .trim()}
                                                </h5>
                                                <div
                                                    class="text-2xl font-bold text-primary mb-2"
                                                >
                                                    {value}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        ></div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Code Snippets Section -->
            {#if project.codeSnippets}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Code class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Code Snippets
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto space-y-6">
                            {#each Object.entries(project.codeSnippets) as [snippetName, snippetData]}
                                {@const data = snippetData as any}
                                {@const codeBlock =
                                    data.code || data.value || ""}
                                {@const explanation =
                                    data.explanation || data.description || ""}
                                {@const language = data.language || "python"}

                                <div
                                    class="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
                                >
                                    <div class="space-y-4">
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                class="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300"
                                            >
                                                <Code class="w-5 h-5" />
                                            </div>
                                            <h5
                                                class="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300"
                                            >
                                                {snippetName}
                                            </h5>
                                        </div>

                                        {#if codeBlock}
                                            <div class="relative">
                                                <div
                                                    class="absolute top-3 right-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                                                >
                                                    {language}
                                                </div>
                                                <pre
                                                    class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed border border-gray-700"><code
                                                        >{codeBlock}</code
                                                    ></pre>
                                            </div>
                                        {/if}

                                        {#if explanation}
                                            <div
                                                class="prose prose-gray dark:prose-invert max-w-none"
                                            >
                                                <p
                                                    class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                                >
                                                    {explanation}
                                                </p>
                                            </div>
                                        {/if}
                                    </div>

                                    <div
                                        class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    ></div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Highlights Section -->
            {#if project.highlights && project.highlights.length > 0}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Star class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Project Highlights
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            <ul class="space-y-3">
                                {#each project.highlights as highlight}
                                    <li class="flex items-start space-x-3">
                                        <span
                                            class="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-primary to-primary/ rounded-full mt-2"
                                        ></span>
                                        <span
                                            class="text-gray-700 dark:text-gray-300 leading-relaxed"
                                        >
                                            {@html cleanMarkdown(highlight)}
                                        </span>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Commentary Section -->
            {#if project.commentary}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <MessageSquare class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Commentary
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            <div class="card p-8">
                                <div
                                    class="prose prose-gray dark:prose-invert max-w-none"
                                >
                                    <p
                                        class="text-slate-700 dark:text-slate-300 leading-relaxed"
                                    >
                                        {@html cleanMarkdown(
                                            project.commentary,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Complexity & Impact Section -->
            {#if project.complexity || project.impact}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <FileText class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Project Details
                            </h2>
                        </div>

                        <div
                            class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8"
                        >
                            {#if project.complexity}
                                <div class="card p-6">
                                    <h3
                                        class="text-xl font-bold mb-4 flex items-center gap-2"
                                    >
                                        <Layers class="w-5 h-5 text-primary" />
                                        Complexity
                                    </h3>
                                    <p
                                        class="text-slate-600 dark:text-slate-400"
                                    >
                                        {project.complexity}
                                    </p>
                                </div>
                            {/if}

                            {#if project.impact}
                                <div class="card p-6">
                                    <h3
                                        class="text-xl font-bold mb-4 flex items-center gap-2"
                                    >
                                        <Target class="w-5 h-5 text-primary" />
                                        Impact
                                    </h3>
                                    <p
                                        class="text-slate-600 dark:text-slate-400"
                                    >
                                        {project.impact}
                                    </p>
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Design Patterns Section -->
            {#if project.designPatterns}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Layers class="w-8 h-8 text-primary" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Design Patterns
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if Array.isArray(project.designPatterns)}
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {#each project.designPatterns as pattern}
                                        {@const title = pattern.split(":")[0]}
                                        {@const description =
                                            pattern.split(":")[1] || ""}

                                        <div
                                            class="group relative bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30"
                                        >
                                            <div
                                                class="flex items-start space-x-4"
                                            >
                                                <div
                                                    class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="w-6 h-6 text-primary"
                                                    >
                                                        <path
                                                            d="M12 2L2 7l10 5 10-5-10-5z"
                                                        ></path>
                                                        <path
                                                            d="M2 17l10 5 10-5"
                                                        ></path>
                                                        <path
                                                            d="M2 12l10 5 10-5"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <h5
                                                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-primary transition-colors duration-300"
                                                    >
                                                        {@html cleanMarkdown(
                                                            title,
                                                        )}
                                                    </h5>
                                                    <div
                                                        class="flex items-start space-x-2"
                                                    >
                                                        <span
                                                            class="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full mt-2"
                                                        ></span>
                                                        <p
                                                            class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                                        >
                                                            {description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            ></div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Lessons Learned Section -->
            {#if project.lessonsLearned}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <CheckCircle class="w-8 h-8 text-emerald-500" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Lessons Learned
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if Array.isArray(project.lessonsLearned)}
                                <div class="space-y-4">
                                    {#each project.lessonsLearned as lesson}
                                        {@const title = lesson.split(":")[0]}
                                        {@const description =
                                            lesson.split(":")[1] || ""}

                                        <div
                                            class="group relative bg-gradient-to-br from-emerald-50/90 to-emerald-100/60 dark:from-emerald-900/90 dark:to-emerald-800/60 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-emerald-400/30"
                                        >
                                            <div
                                                class="flex items-start space-x-4"
                                            >
                                                <div
                                                    class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    >
                                                        <polyline
                                                            points="20 6 9 17 4 12"
                                                        ></polyline>
                                                    </svg>
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <h5
                                                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-emerald-600 transition-colors duration-300"
                                                    >
                                                        {@html cleanMarkdown(
                                                            title,
                                                        )}
                                                    </h5>
                                                    <p
                                                        class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                                    >
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            ></div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Future Plans Section -->
            {#if project.futurePlans}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <ArrowRight class="w-8 h-8 text-purple-500" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Future Plans
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if Array.isArray(project.futurePlans)}
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {#each project.futurePlans as plan}
                                        {@const title = plan.split(":")[0]}
                                        {@const description =
                                            plan.split(":")[1] || ""}
                                        {@const emoji = title
                                            .toLowerCase()
                                            .includes("multi-modal")
                                            ? "🎨"
                                            : title
                                                    .toLowerCase()
                                                    .includes("social")
                                              ? "🤝"
                                              : title
                                                      .toLowerCase()
                                                      .includes("emotional")
                                                ? "💝"
                                                : title
                                                        .toLowerCase()
                                                        .includes("memory")
                                                  ? "🧠"
                                                  : title
                                                          .toLowerCase()
                                                          .includes("ethical")
                                                    ? "⚖️"
                                                    : "🚀"}

                                        <div
                                            class="group relative bg-gradient-to-br from-purple-50/90 to-purple-100/60 dark:from-purple-900/90 dark:to-purple-800/60 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-purple-400/30"
                                        >
                                            <div class="space-y-4">
                                                <div
                                                    class="flex items-center justify-between"
                                                >
                                                    <div
                                                        class="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                                                    >
                                                        {emoji}
                                                    </div>
                                                    <div
                                                        class="text-purple-500 group-hover:scale-110 transition-transform duration-300"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        >
                                                            <path d="M5 12h14"
                                                            ></path>
                                                            <path
                                                                d="m12 5 7 7-7 7"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5
                                                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-purple-600 transition-colors duration-300"
                                                    >
                                                        {@html cleanMarkdown(
                                                            title,
                                                        )}
                                                    </h5>
                                                    <p
                                                        class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                                    >
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            ></div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Design Decisions Section -->
            {#if project.designDecisions}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Target class="w-8 h-8 text-indigo-500" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Design Decisions
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if Array.isArray(project.designDecisions)}
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {#each project.designDecisions as decision}
                                        {@const title = decision.split(":")[0]}
                                        {@const description =
                                            decision.split(":")[1] || ""}
                                        {@const emoji = title
                                            .toLowerCase()
                                            .includes("transformer")
                                            ? "🧠"
                                            : title
                                                    .toLowerCase()
                                                    .includes("trait space")
                                              ? "📊"
                                              : title
                                                      .toLowerCase()
                                                      .includes("protection")
                                                ? "🛡️"
                                                : title
                                                        .toLowerCase()
                                                        .includes("stability")
                                                  ? "⚖️"
                                                  : title
                                                          .toLowerCase()
                                                          .includes("real-time")
                                                    ? "⚡"
                                                    : "💡"}

                                        <div
                                            class="group relative bg-gradient-to-br from-indigo-50/90 to-indigo-100/60 dark:from-indigo-900/90 dark:to-indigo-800/60 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-indigo-400/30"
                                        >
                                            <div
                                                class="flex items-start space-x-4"
                                            >
                                                <div
                                                    class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                                                >
                                                    {emoji}
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <h5
                                                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-indigo-600 transition-colors duration-300"
                                                    >
                                                        {@html cleanMarkdown(
                                                            title,
                                                        )}
                                                    </h5>
                                                    <p
                                                        class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                                    >
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            ></div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Benchmarks Section with Animated Progress Bars -->
            {#if project.benchmarks}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <TrendingUp class="w-8 h-8 text-blue-500" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Performance Benchmarks
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto space-y-6">
                            {#if Array.isArray(project.benchmarks)}
                                {#each project.benchmarks as benchmark}
                                    {@const title = benchmark.split(":")[0]}
                                    {@const value =
                                        benchmark.split(":")[1] || "0"}
                                    {@const percentage =
                                        parseFloat(
                                            value.replace(/[^0-9.]/g, ""),
                                        ) || 0}

                                    <div
                                        class="group bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div
                                            class="flex items-center justify-between mb-4"
                                        >
                                            <h5
                                                class="text-lg font-semibold text-gray-800 dark:text-gray-200"
                                            >
                                                {@html cleanMarkdown(title)}
                                            </h5>
                                            <span
                                                class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                            >
                                                {value}
                                            </span>
                                        </div>
                                        <div
                                            class="relative w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                                        >
                                            <div
                                                class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                                                style="width: {percentage}%"
                                            >
                                                <div
                                                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Prerequisites Section -->
            {#if project.prerequisites}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <FileText class="w-8 h-8 text-orange-500" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Prerequisites
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if Array.isArray(project.prerequisites)}
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    {#each project.prerequisites as prereq}
                                        <div
                                            class="flex items-start space-x-3 bg-gradient-to-br from-orange-50/90 to-orange-100/60 dark:from-orange-900/90 dark:to-orange-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div
                                                class="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                                            >
                                                ✓
                                            </div>
                                            <p
                                                class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                                            >
                                                {@html cleanMarkdown(prereq)}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Installation Section -->
            {#if project.installation}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Download class="w-8 h-8 text-green-500" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Installation
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if Array.isArray(project.installation)}
                                <div class="space-y-4">
                                    {#each project.installation as step, index}
                                        {@const isString =
                                            typeof step === "string"}
                                        {@const stepTitle = isString
                                            ? step.split(":")[0]
                                            : step.title || ""}
                                        {@const stepCommand = isString
                                            ? step.split(":")[1] || ""
                                            : step.code || step.value || ""}

                                        <div
                                            class="group relative bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                                        >
                                            <div
                                                class="flex items-start space-x-4"
                                            >
                                                <div
                                                    class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                                                >
                                                    {index + 1}
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <h5
                                                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                                                    >
                                                        {stepTitle}
                                                    </h5>
                                                    {#if stepCommand}
                                                        <div
                                                            class="bg-slate-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto"
                                                        >
                                                            <code
                                                                >{stepCommand}</code
                                                            >
                                                        </div>
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Usage Section -->
            {#if project.usage}
                <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Code class="w-8 h-8 text-cyan-500" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Usage
                            </h2>
                        </div>

                        <div class="max-w-6xl mx-auto">
                            {#if Array.isArray(project.usage)}
                                <div class="space-y-6">
                                    {#each project.usage as usage}
                                        {@const isString =
                                            typeof usage === "string"}
                                        {@const title = isString
                                            ? usage.split(":")[0]
                                            : usage.title || ""}
                                        {@const description = isString
                                            ? usage.split(":")[1] || ""
                                            : usage.description || ""}

                                        <div
                                            class="bg-gradient-to-br from-cyan-50/90 to-cyan-100/60 dark:from-cyan-900/90 dark:to-cyan-800/60 backdrop-blur-sm border border-cyan-200/50 dark:border-cyan-700/50 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                                        >
                                            <h5
                                                class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2"
                                            >
                                                <span class="text-cyan-600"
                                                    >▸</span
                                                >
                                                {@html cleanMarkdown(title)}
                                            </h5>
                                            <p
                                                class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed ml-6"
                                            >
                                                {description}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Contact Information Section -->
            {#if project.contact}
                <section class="section">
                    <div class="container-custom">
                        <div class="flex items-center gap-3 mb-8">
                            <Mail class="w-8 h-8 text-pink-500" />
                            <h2
                                class="heading-responsive font-bold gradient-text"
                            >
                                Get in Touch
                            </h2>
                        </div>

                        <div class="max-w-4xl mx-auto">
                            <div
                                class="bg-gradient-to-br from-pink-50/90 to-purple-100/60 dark:from-pink-900/90 dark:to-purple-800/60 backdrop-blur-sm border border-pink-200/50 dark:border-pink-700/50 rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300"
                            >
                                <p
                                    class="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                                >
                                    {@html cleanMarkdown(project.contact)}
                                </p>
                                <div
                                    class="flex flex-wrap justify-center gap-4"
                                >
                                    {#if project.github}
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                                        >
                                            <Github class="w-5 h-5" />
                                            GitHub
                                        </a>
                                    {/if}
                                    {#if project.demo}
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                                        >
                                            <ExternalLink class="w-5 h-5" />
                                            Live Demo
                                        </a>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Back to Projects -->
            <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                <div class="container-custom text-center">
                    <a
                        href="/projects"
                        use:link
                        class="text-primary hover:underline text-lg inline-flex items-center gap-2"
                    >
                        <ArrowRight class="w-5 h-5 rotate-180" />
                        Back to All Projects
                    </a>
                </div>
            </section>
        </main>
    {:else}
        <main class="min-h-screen pt-20 flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-4 gradient-text">
                    Project Not Found
                </h1>
                <a
                    href="/projects"
                    use:link
                    class="text-primary hover:underline"
                >
                    ← Back to Projects
                </a>
            </div>
        </main>
    {/if}
{/if}

<Footer />
