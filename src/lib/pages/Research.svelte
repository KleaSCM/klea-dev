<script lang="ts">
    import { onMount } from "svelte";
    import { link } from "svelte-spa-router";
    import Navigation from "../components/Navigation.svelte";
    import Footer from "../components/Footer.svelte";
    import { researchData } from "../data/research.js";

    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    const notebooks = researchData.filter((r) => r.type === "notebook");
    const reports = researchData.filter((r) => r.type === "report");
</script>

<Navigation />

{#if mounted}
    <main class="min-h-screen pt-20">
        <!-- Hero Section -->
        <section
            class="section bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
        >
            <div class="container-custom text-center">
                <h1 class="heading-responsive font-bold mb-6 gradient-text">
                    Research & Publications
                </h1>
                <p
                    class="text-responsive text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto"
                >
                    Academic research and interactive notebooks exploring
                    cognitive architecture, AI systems, and advanced algorithms.
                </p>
            </div>
        </section>

        <!-- Research Reports -->
        {#if reports.length > 0}
            <section class="section">
                <div class="container-custom">
                    <h2 class="text-3xl font-bold mb-8 gradient-text">
                        Research Papers
                    </h2>
                    <div class="grid md:grid-cols-2 gap-8">
                        {#each reports as research}
                            <div class="card p-6">
                                <div
                                    class="flex items-start justify-between mb-4"
                                >
                                    <span
                                        class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full"
                                    >
                                        {research.platform}
                                    </span>
                                    <span class="text-xs text-slate-500"
                                        >{research.date}</span
                                    >
                                </div>
                                <h3 class="text-xl font-bold mb-3">
                                    {research.title}
                                </h3>
                                <p
                                    class="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3"
                                >
                                    {research.description}
                                </p>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    {#each research.tags.slice(0, 4) as tag}
                                        <span
                                            class="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded"
                                        >
                                            {tag}
                                        </span>
                                    {/each}
                                </div>
                                <a
                                    href={research.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-indigo-500 hover:underline text-sm"
                                >
                                    View Research →
                                </a>
                            </div>
                        {/each}
                    </div>
                </div>
            </section>
        {/if}

        <!-- Interactive Notebooks -->
        {#if notebooks.length > 0}
            <section class="section bg-slate-50/50 dark:bg-slate-900/50">
                <div class="container-custom">
                    <h2 class="text-3xl font-bold mb-8 gradient-text">
                        Interactive Notebooks
                    </h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {#each notebooks as research}
                            <div class="card p-6">
                                <div
                                    class="flex items-start justify-between mb-4"
                                >
                                    <span
                                        class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full"
                                    >
                                        Notebook
                                    </span>
                                    <span class="text-xs text-slate-500"
                                        >{research.platform}</span
                                    >
                                </div>
                                <h3 class="text-lg font-bold mb-3">
                                    {research.title}
                                </h3>
                                <p
                                    class="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2"
                                >
                                    {research.description}
                                </p>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    {#each research.tags.slice(0, 3) as tag}
                                        <span
                                            class="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded"
                                        >
                                            {tag}
                                        </span>
                                    {/each}
                                </div>
                                <a
                                    href={research.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-green-500 hover:underline text-sm"
                                >
                                    Open Notebook →
                                </a>
                            </div>
                        {/each}
                    </div>
                </div>
            </section>
        {/if}
    </main>
{/if}

<Footer />

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
