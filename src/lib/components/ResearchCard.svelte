<script lang="ts">
    import { Motion, AnimatePresence } from "svelte-motion";
    import {
        ExternalLink,
        FileText,
        Play,
        Download,
        Copy,
        Check,
        Github,
    } from "lucide-svelte";
    import { onMount } from "svelte";
    import { inview } from "../actions/inview";
    import type { InViewDetail } from "../actions/inview";
    import { tooltipStore } from "./GlobalTooltip.svelte";
    import type { Project } from "../data/projects";

    // Declare custom events for Svelte element augmentation
    type InViewEvent = CustomEvent<InViewDetail>;

    // Research entry type (simplified for Svelte - can be expanded)
    interface ResearchEntry {
        id: string;
        title: string;
        description: string;
        abstract?: string;
        type: "notebook" | "report";
        platform: string;
        date: string;
        url: string;
        tags: string[];
        featured?: boolean;
        image?: string;
        doi?: string;
        citation?: string;
        bibtex?: string;
        // Notebook-specific
        runtime?: string;
        framework?: string;
        interactive?: boolean;
        // Report-specific
        pages?: number;
        peerReviewed?: boolean;
        authors?: string[];
    }

    export let entry: ResearchEntry;
    export let className: string = "";

    let copied = false;
    let showBibtex = false;
    let isHovered = false;
    let mounted = false;
    let inView = false;

    onMount(() => {
        mounted = true;
    });

    const handleInView = (event: CustomEvent<InViewDetail>) => {
        if (event.detail.isInView) {
            inView = true;
        }
    };

    // Convert ResearchEntry to Project for tooltip compatibility
    import { get } from "svelte/store";

    const researchProject: Project = {
        id: entry.id,
        title: entry.title,
        description: entry.description,
        longDescription: entry.description,
        technologies: entry.tags, // Use tags as technologies
        image: entry.image,
        featured: entry.featured || false,
        category: "Research",
        highlights: [],
        complexity: "Advanced",
        impact: "Research contribution",
        github: entry.url, // Use URL as fallback
    };

    let hideTimeout: ReturnType<typeof setTimeout>;

    const handleMouseEnter = (e: MouseEvent) => {
        clearTimeout(hideTimeout);
        isHovered = true;
        tooltipStore.set({
            isVisible: true,
            isInteracting: false,
            project: researchProject,
            position: { x: e.clientX, y: e.clientY },
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isHovered) {
            tooltipStore.update((state) => ({
                ...state,
                position: { x: e.clientX, y: e.clientY },
            }));
        }
    };

    const handleMouseLeave = () => {
        isHovered = false;
        hideTimeout = setTimeout(() => {
            const state = get(tooltipStore);
            if (!state.isInteracting) {
                tooltipStore.update((state) => ({
                    ...state,
                    isVisible: false,
                }));
            }
        }, 100);
    };

    // Platform metadata
    const getPlatformMeta = (platform: string) => {
        const platforms: Record<
            string,
            { label: string; icon: string; color: string }
        > = {
            kaggle: {
                label: "Kaggle",
                icon: "📊",
                color: "from-blue-500 to-cyan-500",
            },
            osf: {
                label: "OSF",
                icon: "🔬",
                color: "from-green-500 to-emerald-500",
            },
            github: {
                label: "GitHub",
                icon: "🐙",
                color: "from-gray-700 to-gray-900",
            },
            arxiv: {
                label: "arXiv",
                icon: "📄",
                color: "from-red-500 to-pink-500",
            },
        };
        return (
            platforms[platform.toLowerCase()] || {
                label: platform,
                icon: "📚",
                color: "from-indigo-500 to-purple-500",
            }
        );
    };

    const platformMeta = getPlatformMeta(entry.platform);

    // Copy citation to clipboard
    const copyCitation = async () => {
        if (entry.citation) {
            await navigator.clipboard.writeText(entry.citation);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        }
    };

    // Copy BibTeX to clipboard
    const copyBibtex = async () => {
        if (entry.bibtex) {
            await navigator.clipboard.writeText(entry.bibtex);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        }
    };

    $: isNotebook = entry.type === "notebook";
</script>

{#if mounted}
    <Motion
        let:motion
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileHover={{ y: -5 }}
    >
        <div
            use:motion
            use:inview={{ once: true }}
            on:inview={handleInView}
            role="article"
            class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden {className}"
            on:mouseenter={handleMouseEnter}
            on:mousemove={handleMouseMove}
            on:mouseleave={handleMouseLeave}
        >
            <!-- Header with platform icon and type -->
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div
                        class="w-10 h-10 bg-gradient-to-r {platformMeta.color} rounded-lg flex items-center justify-center text-white text-lg"
                    >
                        {platformMeta.icon}
                    </div>
                    <div>
                        <div class="flex items-center space-x-2">
                            <span
                                class="text-sm font-medium text-slate-600 dark:text-slate-400"
                            >
                                {isNotebook ? "📓 Notebook" : "📄 Report"}
                            </span>
                            {#if entry.featured}
                                <span
                                    class="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full"
                                >
                                    Featured
                                </span>
                            {/if}
                        </div>
                        <div class="text-xs text-slate-500 dark:text-slate-400">
                            {platformMeta.label} • {new Date(
                                entry.date,
                            ).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Research image -->
            {#if entry.image}
                <div class="mb-4 aspect-video rounded-lg overflow-hidden">
                    <img
                        src={entry.image}
                        alt={entry.title}
                        class="w-full h-full object-cover"
                    />
                </div>
            {/if}

            <!-- Title and description -->
            <h3
                class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2"
            >
                {entry.title}
            </h3>
            <p class="text-slate-600 dark:text-slate-400 mb-4">
                {entry.description}
            </p>

            <!-- Abstract for reports -->
            {#if entry.abstract}
                <div
                    class="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                >
                    <p
                        class="text-sm text-slate-600 dark:text-slate-400 italic"
                    >
                        {entry.abstract}
                    </p>
                </div>
            {/if}

            <!-- Notebook-specific details -->
            {#if isNotebook && entry.runtime}
                <div
                    class="flex items-center space-x-4 mb-4 text-sm text-slate-500 dark:text-slate-400"
                >
                    <span>🖥️ {entry.runtime}</span>
                    {#if entry.framework}
                        <span>⚙️ {entry.framework}</span>
                    {/if}
                    {#if entry.interactive}
                        <span>🎮 Interactive</span>
                    {/if}
                </div>
            {/if}

            <!-- Report-specific details -->
            {#if !isNotebook}
                <div
                    class="flex items-center space-x-4 mb-4 text-sm text-slate-500 dark:text-slate-400"
                >
                    {#if entry.pages}
                        <span>📄 {entry.pages} pages</span>
                    {/if}
                    {#if entry.peerReviewed}
                        <span>✅ Peer Reviewed</span>
                    {/if}
                    {#if entry.authors}
                        <span>👥 {entry.authors.join(", ")}</span>
                    {/if}
                </div>
            {/if}

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
                {#each entry.tags as tag, index}
                    <Motion
                        let:motion
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span
                            use:motion
                            class="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full"
                        >
                            {tag}
                        </span>
                    </Motion>
                {/each}
            </div>

            <!-- Hover overlay with action buttons -->
            <AnimatePresence>
                {#if isHovered}
                    <Motion
                        let:motion
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            use:motion
                            class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6"
                        >
                            <div class="flex gap-2">
                                <!-- GitHub button -->
                                <a
                                    href="https://github.com/KleaSCM/research-notes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                                    aria-label="View on GitHub"
                                >
                                    <Github class="w-4 h-4" />
                                </a>

                                <!-- Platform-specific button -->
                                <a
                                    href={entry.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                                    aria-label="View on {platformMeta.label}"
                                >
                                    <span class="text-lg"
                                        >{platformMeta.icon}</span
                                    >
                                </a>
                            </div>
                        </div>
                    </Motion>
                {/if}
            </AnimatePresence>

            <!-- Action buttons -->
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <!-- View button -->
                    <Motion
                        let:motion
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            use:motion
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center space-x-1 px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors duration-200"
                        >
                            {#if isNotebook}
                                <Play class="w-3 h-3" />
                            {:else}
                                <FileText class="w-3 h-3" />
                            {/if}
                            <span
                                >{isNotebook ? "View Demo" : "Read Paper"}</span
                            >
                        </a>
                    </Motion>

                    <!-- DOI link for reports -->
                    {#if entry.doi}
                        <Motion
                            let:motion
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a
                                use:motion
                                href="https://doi.org/{entry.doi}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                            >
                                <span>DOI</span>
                            </a>
                        </Motion>
                    {/if}
                </div>

                <!-- Citation buttons for reports -->
                {#if !isNotebook && (entry.citation || entry.bibtex)}
                    <div class="flex items-center space-x-2">
                        {#if entry.citation}
                            <Motion
                                let:motion
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button
                                    use:motion
                                    on:click={copyCitation}
                                    class="flex items-center space-x-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                                >
                                    {#if copied}
                                        <Check class="w-3 h-3" />
                                    {:else}
                                        <Copy class="w-3 h-3" />
                                    {/if}
                                    <span>Cite</span>
                                </button>
                            </Motion>
                        {/if}

                        {#if entry.bibtex}
                            <Motion
                                let:motion
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button
                                    use:motion
                                    on:click={() => (showBibtex = !showBibtex)}
                                    class="flex items-center space-x-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                                >
                                    <span>BibTeX</span>
                                </button>
                            </Motion>
                        {/if}
                    </div>
                {/if}
            </div>

            <!-- BibTeX display -->
            {#if showBibtex && entry.bibtex}
                <Motion
                    let:motion
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div
                        use:motion
                        class="mt-4 p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs overflow-x-auto"
                    >
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-slate-400">BibTeX</span>
                            <Motion let:motion whileHover={{ scale: 1.1 }}>
                                <button
                                    use:motion
                                    on:click={copyBibtex}
                                    class="text-slate-400 hover:text-white transition-colors"
                                >
                                    {#if copied}
                                        <Check class="w-3 h-3" />
                                    {:else}
                                        <Copy class="w-3 h-3" />
                                    {/if}
                                </button>
                            </Motion>
                        </div>
                        <pre class="whitespace-pre-wrap">{entry.bibtex}</pre>
                    </div>
                </Motion>
            {/if}
        </div>
    </Motion>
{/if}
