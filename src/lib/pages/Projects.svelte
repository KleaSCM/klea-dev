<script lang="ts">
    import { onMount } from "svelte";
    import { link } from "svelte-spa-router";
    import Navigation from "../components/Navigation.svelte";
    import Footer from "../components/Footer.svelte";
    import InteractiveProjectCard from "../components/InteractiveProjectCard.svelte";
    import GlobalTooltip from "../components/GlobalTooltip.svelte";
    import { projects as staticProjects } from "../data/projects";
    import type { Project } from "../data/projects";

    let mounted = false;
    let projects: Project[] = [];
    let loading = true;

    // Categorized projects
    let aiProjects: Project[] = [];
    let physicsProjects: Project[] = [];
    let systemsProjects: Project[] = [];
    let webProjects: Project[] = [];

    onMount(async () => {
        mounted = true;
        try {
            // Import dynamically
            const { getAllProjectsFromPublicRepos } = await import(
                "../services/github"
            );
            const dynamicProjects = await getAllProjectsFromPublicRepos();

            if (dynamicProjects && dynamicProjects.length > 0) {
                projects = dynamicProjects;
            } else {
                projects = staticProjects;
            }
        } catch (error) {
            console.error("Failed to load projects:", error);
            projects = staticProjects;
        } finally {
            loading = false;
            categorizeProjects();
        }
    });

    function categorizeProjects() {
        aiProjects = projects.filter((p) => p.category === "AI/ML");
        physicsProjects = projects.filter((p) => p.category === "Physics");
        systemsProjects = projects.filter((p) => p.category === "Systems");
        webProjects = projects.filter((p) => p.category === "Web");
    }
</script>

<Navigation />

{#if mounted}
    <main class="min-h-screen pt-20">
        <!-- Hero Section -->
        <section
            class="section bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
        >
            <div class="container-custom text-center">
                <h1 class="heading-responsive font-bold mb-6 gradient-text">
                    My Projects
                </h1>
                <p
                    class="text-responsive text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto"
                >
                    A collection of advanced AI systems, physics engines, and
                    research projects showcasing expertise in cutting-edge
                    technologies.
                </p>
            </div>
        </section>

        <!-- AI/ML Projects -->
        {#if aiProjects.length > 0}
            <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                <div class="container-custom">
                    <h2 class="text-3xl font-bold mb-8 gradient-text">
                        AI & Machine Learning
                    </h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {#each aiProjects as project}
                            <InteractiveProjectCard {project} />
                        {/each}
                    </div>
                </div>
            </section>
        {/if}

        <!-- Physics Projects -->
        {#if physicsProjects.length > 0}
            <section class="section">
                <div class="container-custom">
                    <h2 class="text-3xl font-bold mb-8 gradient-text">
                        Physics & Simulation
                    </h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {#each physicsProjects as project}
                            <InteractiveProjectCard {project} />
                        {/each}
                    </div>
                </div>
            </section>
        {/if}

        <!-- Systems Projects -->
        {#if systemsProjects.length > 0}
            <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                <div class="container-custom">
                    <h2 class="text-3xl font-bold mb-8 gradient-text">
                        Systems & Architecture
                    </h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {#each systemsProjects as project}
                            <InteractiveProjectCard {project} />
                        {/each}
                    </div>
                </div>
            </section>
        {/if}

        <!-- Web Projects -->
        {#if webProjects.length > 0}
            <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                <div class="container-custom">
                    <h2 class="text-3xl font-bold mb-8 gradient-text">
                        Web & Frontend
                    </h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {#each webProjects as project}
                            <InteractiveProjectCard {project} />
                        {/each}
                    </div>
                </div>
            </section>
        {/if}
    </main>

    <!-- Global Tooltip removed (moved to App.svelte) -->
{/if}

<Footer />

<style>
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
