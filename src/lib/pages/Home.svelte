<script lang="ts">
    import { onMount } from "svelte";
    import { link } from "svelte-spa-router";
    import Navigation from "../components/Navigation.svelte";
    import Footer from "../components/Footer.svelte";
    import ContactForm from "../components/ContactForm.svelte";
    import SkillBars from "../components/SkillBars.svelte";
    import Games from "../components/Games.svelte";
    import SylvanasMini from "../components/SylvanasMini.svelte";

    // Import both static data and the service
    import { projects as staticProjects } from "../data/projects";
    import InteractiveProjectCard from "../components/InteractiveProjectCard.svelte";
    import InteractiveResume from "../components/InteractiveResume.svelte";
    import ResearchCard from "../components/ResearchCard.svelte";
    import { researchData, getFeaturedResearch } from "../data/research.js";
    import type { Project } from "../data/projects";

    const featuredResearch = getFeaturedResearch();

    // State for projects
    let featuredProjects: Project[] = [];
    let loadingProjects = true;

    // Load projects on mount
    onMount(async () => {
        try {
            // Import dynamically
            const { getFeaturedProjects } = await import("../services/github");
            const dynamicProjects = await getFeaturedProjects();

            if (dynamicProjects && dynamicProjects.length > 0) {
                featuredProjects = dynamicProjects;
            } else {
                // Fallback to static featured projects
                featuredProjects = staticProjects.filter((p) => p.featured);
            }
        } catch (error) {
            console.error("Failed to load featured projects:", error);
            // Fallback
            featuredProjects = staticProjects.filter((p) => p.featured);
        } finally {
            loadingProjects = false;
        }

        // Handle hash-based navigation (existing code)
        const hash = window.location.hash;
        if (hash) {
            const sectionId = hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    });
</script>

<Navigation />

<main
    class="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
>
    <!-- Hero Section -->
    <section
        id="home"
        class="section min-h-screen flex items-center justify-center pt-20"
    >
        <div class="container-custom text-center space-y-8">
            <h1 class="heading-responsive font-bold gradient-text animate-in">
                Yuriko's Portfolio
            </h1>

            <p
                class="text-responsive text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
                Full-Stack Developer | AI/ML Engineer | Systems Architect
            </p>

            <p
                class="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto"
            >
                Building innovative solutions at the intersection of AI, systems
                programming, and modern web development.
            </p>

            <div
                class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
                <a href="#projects" class="btn-primary"> View My Work </a>
                <a href="#contact" class="btn-secondary"> Get In Touch </a>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section bg-slate-50 dark:bg-slate-800/50">
        <div class="container-custom">
            <h2 class="subheading-responsive font-bold text-center mb-12">
                About Me
            </h2>
            <div class="card p-8 max-w-4xl mx-auto space-y-6">
                <p
                    class="text-responsive text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                    I'm a passionate developer specializing in building modern
                    web applications and AI-powered solutions. With expertise in
                    full-stack development, machine learning, and systems
                    architecture, I create innovative solutions that solve
                    real-world problems.
                </p>
                <p
                    class="text-responsive text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                    My work spans across cutting-edge technologies including Go,
                    C++, Python, TypeScript, and modern web frameworks. I'm
                    particularly interested in AI ethics, cognitive
                    architectures, and high-performance systems.
                </p>
            </div>

            <!-- Skills Section -->
            <div class="mt-16">
                <h3 class="text-2xl font-bold text-center mb-8">
                    Technical Skills
                </h3>
                <SkillBars />
            </div>
        </div>
    </section>

    <!-- Interactive Resume Section -->
    <InteractiveResume />

    <!-- Projects Section -->
    <section id="projects" class="section">
        <div class="container-custom">
            <h2 class="subheading-responsive font-bold text-center mb-12">
                Featured Projects
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each featuredProjects as project}
                    <InteractiveProjectCard {project} />
                {/each}
            </div>
        </div>
    </section>

    <!-- Research Section -->
    <section id="research" class="section bg-slate-50 dark:bg-slate-800/50">
        <div class="container-custom">
            <h2 class="subheading-responsive font-bold text-center mb-12">
                Research & Publications
            </h2>
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
                {#each featuredResearch as research}
                    <ResearchCard entry={research} />
                {/each}
            </div>
        </div>
    </section>

    <!-- Games Section -->
    <section id="games" class="section">
        <div class="container-custom">
            <h2 class="subheading-responsive font-bold text-center mb-12">
                Interactive Challenges
            </h2>
            <Games />
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section bg-slate-50 dark:bg-slate-800/50">
        <div class="container-custom">
            <h2 class="subheading-responsive font-bold text-center mb-12">
                Get In Touch
            </h2>
            <ContactForm />
        </div>
    </section>
</main>

<Footer />
<SylvanasMini />

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }

    @keyframes animate-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-in {
        animation: animate-in 0.6s ease-out;
    }

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
