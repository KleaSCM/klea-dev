<script lang="ts">
    import { onMount } from "svelte";
    import { Motion, AnimatePresence } from "svelte-motion";
    import {
        Calendar,
        MapPin,
        Building,
        Award,
        Code,
        Database,
        Cpu,
        Globe,
        Brain,
        Zap,
        Star,
    } from "lucide-svelte";
    import {
        parseResumeExperience,
        type Experience,
    } from "../services/resumeParser";

    let experiences: Experience[] = [];
    let loading = true;
    let mounted = false;

    onMount(async () => {
        mounted = true;
        try {
            // Try to load from PDF resume first, fallback to hardcoded data
            // In SPA mode this will use the service's fallback data
            experiences = await parseResumeExperience("/resume/Resume ay.pdf");
        } catch (error) {
            console.error("Error loading resume experience:", error);
        } finally {
            loading = false;
        }
    });
</script>

{#if loading}
    <section
        class="section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
        <div class="container-custom">
            <div class="text-center">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"
                ></div>
                <p class="text-slate-600 dark:text-slate-400">
                    Loading your beautiful experience...
                </p>
            </div>
        </div>
    </section>
{:else if mounted}
    <section
        class="section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
        <div class="container-custom">
            <Motion
                let:motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div use:motion class="text-center mb-16">
                    <h2 class="heading-responsive font-bold mb-6 gradient-text">
                        Professional Experience
                    </h2>
                    <p
                        class="text-responsive text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
                    >
                        A comprehensive timeline of my professional journey,
                        showcasing expertise across AI systems, physics engines,
                        web development, and systems programming.
                    </p>
                </div>
            </Motion>

            <!-- Timeline -->
            <div class="relative">
                <!-- Center line -->
                <div
                    class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-pink-500"
                ></div>

                <!-- Timeline items -->
                <div class="space-y-8 lg:space-y-12">
                    {#each experiences as experience, index}
                        <Motion
                            let:motion
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div
                                use:motion
                                class="flex flex-col lg:flex-row gap-4 lg:gap-8"
                                class:lg:flex-row-reverse={index % 2 !== 0}
                            >
                                <!-- Timeline line with dot -->
                                <div
                                    class="relative flex flex-col items-center"
                                >
                                    <div
                                        class="w-0.5 h-full bg-gradient-to-b from-indigo-500 to-pink-500"
                                    ></div>
                                    <div
                                        class="absolute top-0 w-4 h-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full border-4 border-white dark:border-slate-800"
                                    ></div>
                                </div>

                                <!--Content -->
                                <Motion
                                    let:motion
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div
                                        use:motion
                                        class="flex-1 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <!-- Header -->
                                        <div
                                            class="flex items-start gap-3 sm:gap-4 mb-4"
                                        >
                                            <div
                                                class="p-2 sm:p-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex-shrink-0"
                                            >
                                                <svelte:component
                                                    this={experience.icon}
                                                    class="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                                />
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <h3
                                                    class="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-1 break-words"
                                                >
                                                    {experience.title}
                                                </h3>
                                                <div
                                                    class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2"
                                                >
                                                    <div
                                                        class="flex items-center gap-1"
                                                    >
                                                        <Building
                                                            class="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                                                        />
                                                        <span
                                                            class="break-words"
                                                            >{experience.company}</span
                                                        >
                                                    </div>
                                                    <div
                                                        class="flex items-center gap-1"
                                                    >
                                                        <MapPin
                                                            class="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                                                        />
                                                        <span
                                                            class="break-words"
                                                            >{experience.location}</span
                                                        >
                                                    </div>
                                                    <div
                                                        class="flex items-center gap-1"
                                                    >
                                                        <Calendar
                                                            class="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                                                        />
                                                        <span
                                                            class="break-words"
                                                            >{experience.period}</span
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Description -->
                                        <p
                                            class="text-slate-600 dark:text-slate-400 mb-4 text-sm sm:text-base break-words"
                                        >
                                            {experience.description}
                                        </p>

                                        <!-- Technologies -->
                                        <div class="mb-4">
                                            <h4
                                                class="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2"
                                            >
                                                Technologies Used
                                            </h4>
                                            <div
                                                class="flex flex-wrap gap-1 sm:gap-2"
                                            >
                                                {#each experience.technologies as tech}
                                                    <span
                                                        class="skill-badge text-xs px-2 py-1 break-words"
                                                    >
                                                        {tech}
                                                    </span>
                                                {/each}
                                            </div>
                                        </div>

                                        <!-- Achievements -->
                                        <div>
                                            <h4
                                                class="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2"
                                            >
                                                Key Achievements
                                            </h4>
                                            <ul class="space-y-2">
                                                {#each experience.achievements as achievement, idx}
                                                    <Motion
                                                        let:motion
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                index * 0.1 +
                                                                idx * 0.1,
                                                        }}
                                                    >
                                                        <li
                                                            use:motion
                                                            class="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
                                                        >
                                                            <Star
                                                                class="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0"
                                                            />
                                                            <span
                                                                class="break-words"
                                                                >{achievement}</span
                                                            >
                                                        </li>
                                                    </Motion>
                                                {/each}
                                            </ul>
                                        </div>
                                    </div>
                                </Motion>
                            </div>
                        </Motion>
                    {/each}
                </div>
            </div>

            <!-- Skills summary -->
            <Motion
                let:motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div
                    use:motion
                    class="mt-20 p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
                >
                    <h3
                        class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-6 text-center"
                    >
                        Core Competencies
                    </h3>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {#each [{ title: "AI/ML Systems", count: 8, icon: Brain }, { title: "Physics Engines", count: 5, icon: Cpu }, { title: "Web Applications", count: 6, icon: Globe }, { title: "Systems Programming", count: 4, icon: Database }] as skill, index}
                            <Motion
                                let:motion
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div
                                    use:motion
                                    class="text-center p-4 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-lg"
                                >
                                    <svelte:component
                                        this={skill.icon}
                                        class="w-8 h-8 text-indigo-500 mx-auto mb-2"
                                    />
                                    <h4
                                        class="font-semibold text-slate-800 dark:text-slate-200 mb-1"
                                    >
                                        {skill.title}
                                    </h4>
                                    <p
                                        class="text-sm text-slate-600 dark:text-slate-400"
                                    >
                                        {skill.count} projects
                                    </p>
                                </div>
                            </Motion>
                        {/each}
                    </div>
                </div>
            </Motion>
        </div>
    </section>
{/if}
