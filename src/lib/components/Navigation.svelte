<script lang="ts">
    import { onMount } from "svelte";
    import { location, push } from "svelte-spa-router";
    import { Menu, X, Github, Linkedin, Mail } from "lucide-svelte";
    import ThemeToggle from "./ThemeToggle.svelte";

    let isOpen = false;
    let scrolled = false;

    // Handle scroll to add background
    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 50;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    // Smart navigation handler that routes OR scrolls based on context
    function handleNavigation(target: string) {
        const currentPath = $location;

        // Close mobile menu
        isOpen = false;

        // Special handling for "Projects" and "Research" - these have dedicated pages
        if (target === "projects") {
            push("/projects");
            return;
        }

        if (target === "research") {
            push("/research");
            return;
        }

        // For other sections (home, about, games, contact)
        // If we're on the home page, just scroll to section
        if (currentPath === "/" || currentPath === "") {
            scrollToSection(target);
        } else {
            // If we're on a different page, navigate to home first
            push("/");
            // Give the router time to navigate, then scroll
            setTimeout(() => {
                scrollToSection(target);
            }, 100);
        }
    }

    // Smooth scroll to section
    function scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    const navLinks = [
        { name: "Home", target: "home" },
        { name: "About", target: "about" },
        { name: "Projects", target: "projects" },
        { name: "Research", target: "research" },
        { name: "Games", target: "games" },
        { name: "Contact", target: "contact" },
    ];

    const socialLinks = [
        {
            icon: Github,
            href: "https://github.com/yourusername",
            label: "GitHub",
        },
        {
            icon: Linkedin,
            href: "https://linkedin.com/in/yourusername",
            label: "LinkedIn",
        },
        { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
    ];
</script>

<nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg'
        : 'bg-transparent'}"
>
    <div class="container-custom">
        <div class="flex items-center justify-between h-16 sm:h-20">
            <!-- Logo -->
            <button
                on:click={() => handleNavigation("home")}
                class="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
            >
                Yuriko
            </button>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-8">
                <div class="flex items-center gap-6">
                    {#each navLinks as link}
                        <button
                            on:click={() => handleNavigation(link.target)}
                            class="nav-link text-sm font-medium"
                        >
                            {link.name}
                        </button>
                    {/each}
                </div>

                <!-- Social Links -->
                <div class="flex items-center gap-3">
                    {#each socialLinks as social}
                        <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                            title={social.label}
                        >
                            <svelte:component
                                this={social.icon}
                                class="w-5 h-5"
                            />
                        </a>
                    {/each}
                </div>

                <ThemeToggle />
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center gap-3">
                <ThemeToggle />
                <button
                    on:click={() => (isOpen = !isOpen)}
                    class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                    aria-label="Toggle menu"
                >
                    {#if isOpen}
                        <X class="w-6 h-6" />
                    {:else}
                        <Menu class="w-6 h-6" />
                    {/if}
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    {#if isOpen}
        <div
            class="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
        >
            <div class="container-custom py-4 space-y-2">
                {#each navLinks as link}
                    <button
                        on:click={() => handleNavigation(link.target)}
                        class="mobile-nav-item w-full"
                    >
                        {link.name}
                    </button>
                {/each}

                <!-- Mobile Social Links -->
                <div
                    class="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700"
                >
                    {#each socialLinks as social}
                        <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                            title={social.label}
                        >
                            <svelte:component
                                this={social.icon}
                                class="w-5 h-5"
                            />
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</nav>
