<script lang="ts">
    import { Motion, AnimatePresence } from "svelte-motion";
    import { onMount } from "svelte";
    import { link, push } from "svelte-spa-router";
    import {
        ExternalLink,
        Github,
        Star,
        Zap,
        Brain,
        Atom,
        Network,
        TestTube,
        Globe,
        ArrowRight,
        GitFork,
    } from "lucide-svelte";
    import type { Project } from "../data/projects";
    import { tooltipStore } from "./GlobalTooltip.svelte";

    export let project: Project;

    let stars: number = project.stars || 0;
    let forks: number = project.forks || 0;
    let loadingStats = false;

    // Category icons mapping
    const categoryIconsMap = {
        "AI/ML": Brain,
        Physics: Atom,
        Systems: Network,
        Web: Globe,
        Research: TestTube,
    };

    const CategoryIcon =
        categoryIconsMap[project.category as keyof typeof categoryIconsMap];

    // Default images for different project types
    const getDefaultImage = (project: Project): string | null => {
        const projectId = project.id.toLowerCase();

        // Check if we have a specific image for this project
        if (project.image) {
            return project.image;
        }

        // Default images based on project name or category
        const defaultImages: Record<string, string> = {
            volatria: "/screenshots/volatria-distributed-city.jpg",
            geogo: "/screenshots/geogo-mountain-data.jpg",
            vulnscan: "/screenshots/vulnscan-neon-security.jpg",
            physicsengine: "/screenshots/physics-engine-liquid.jpg",
            kdemon: "/screenshots/kdemon-cyber-daemon.jpg",
            "lenora-ai": "/screenshots/lenora-ai-ethics-machine.png",
            "ilanya-ai": "/screenshots/ilanya-cognitive-robot.png",
        };

        return defaultImages[projectId] || null;
    };

    import { get } from "svelte/store";

    $: projectImage = getDefaultImage(project);

    let isHovered = false;
    let mounted = false;
    let hideTimeout: ReturnType<typeof setTimeout>;

    onMount(() => {
        mounted = true;
    });

    const handleClick = () => {
        // Use svelte-spa-router for internal navigation
        push(`/projects/${project.id}`);
    };

    const handleMouseEnter = (e: MouseEvent) => {
        clearTimeout(hideTimeout);
        isHovered = true;
        tooltipStore.set({
            isVisible: true,
            isInteracting: false,
            project,
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
                tooltipStore.update((state: any) => ({
                    ...state,
                    isVisible: false,
                }));
            }
        }, 100);
    };
</script>

{#if mounted}
    <Motion
        let:motion
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
    >
        <div
            use:motion
            class="project-card group relative overflow-hidden cursor-pointer"
            on:mouseenter={handleMouseEnter}
            on:mousemove={handleMouseMove}
            on:mouseleave={handleMouseLeave}
            on:click={handleClick}
            on:keypress={(e) => e.key === "Enter" && handleClick()}
            role="button"
            tabindex="0"
        >
            <!-- Main card content -->
            <div class="p-6">
                <!-- Header with category and featured badge -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <svelte:component
                            this={CategoryIcon}
                            class="w-5 h-5 text-indigo-500"
                        />
                        <span
                            class="text-sm font-medium text-slate-600 dark:text-slate-400"
                        >
                            {project.category}
                        </span>
                    </div>
                    {#if project.featured}
                        <Star class="w-4 h-4 text-yellow-500 fill-current" />
                    {/if}
                </div>

                <!-- Project image/icon -->
                <div
                    class="w-full h-32 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative"
                    style={projectImage
                        ? `background-image: url(${projectImage}); background-size: cover; background-position: center;`
                        : ""}
                >
                    {#if projectImage}
                        <!-- Image overlay with gradient -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                        ></div>
                    {:else}
                        <!-- Fallback icon -->
                        <svelte:component
                            this={CategoryIcon}
                            class="w-12 h-12 text-indigo-500 opacity-60"
                        />
                    {/if}

                    <!-- Category badge on image -->
                    <div
                        class="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-lg p-1"
                    >
                        <svelte:component
                            this={CategoryIcon}
                            class="w-4 h-4 text-white"
                        />
                    </div>
                </div>

                <!-- Project title -->
                <h3
                    class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                >
                    {project.title}
                </h3>

                <!-- Project description -->
                <p
                    class="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3"
                >
                    {project.description}
                </p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-1 mb-4">
                    {#each project.technologies.slice(0, 3) as tech}
                        <span
                            class="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700"
                        >
                            {tech}
                        </span>
                    {/each}
                    {#if project.technologies.length > 3}
                        <span
                            class="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 rounded border border-slate-200 dark:border-slate-700"
                        >
                            +{project.technologies.length - 3}
                        </span>
                    {/if}
                </div>
                <!-- Stats Row -->
                <div
                    class="flex items-center gap-4 mt-4 text-sm text-slate-500 dark:text-slate-400"
                >
                    {#if stars > 0 || (project.github && loadingStats)}
                        <div class="flex items-center gap-1">
                            <Star
                                class="w-4 h-4 {stars > 0
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : ''}"
                            />
                            <span>{stars}</span>
                        </div>
                    {/if}

                    {#if forks > 0 || (project.github && loadingStats)}
                        <div class="flex items-center gap-1">
                            <GitFork class="w-4 h-4" />
                            <span>{forks}</span>
                        </div>
                    {/if}

                    {#if project.date}
                        <div class="ml-auto">
                            {project.date}
                        </div>
                    {/if}
                </div>

                <div
                    class="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50"
                >
                    <div class="flex gap-3">
                        {#if project.github}
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                                title="View Code"
                                on:click|stopPropagation
                            >
                                <Github class="w-5 h-5" />
                            </a>
                        {/if}
                        {#if project.live}
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                                title="Live Demo"
                                on:click|stopPropagation
                            >
                                <ExternalLink class="w-5 h-5" />
                            </a>
                        {/if}
                    </div>

                    <a
                        href="#/projects/{project.id}"
                        class="group/btn flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-focus transition-colors"
                    >
                        View Details
                        <ArrowRight
                            class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                        />
                    </a>
                </div>
            </div>

            <!-- Hover overlay -->
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
                            class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
                        ></div>
                    </Motion>
                {/if}
            </AnimatePresence>
        </div>
    </Motion>
{/if}

<style>
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
