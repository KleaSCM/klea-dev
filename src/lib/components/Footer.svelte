<script lang="ts">
    import { Github, Linkedin, Mail, Heart } from "lucide-svelte";

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: "https://github.com/KleaSCM", label: "GitHub" },
        {
            icon: Linkedin,
            href: "https://linkedin.com/in/klea-dev",
            label: "LinkedIn",
        },
        { icon: Mail, href: "mailto:kleascm@gmail.com", label: "Email" },
    ];

    const footerLinks = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Research", href: "#research" },
        { name: "Contact", href: "#contact" },
    ];

    function scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
</script>

<footer class="bg-slate-900 text-white py-12">
    <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <!-- About -->
            <div>
                <h3 class="text-xl font-bold mb-4 gradient-text">Yuriko</h3>
                <p class="text-slate-400 text-sm leading-relaxed">
                    Full-Stack Developer & AI/ML Engineer passionate about
                    building innovative solutions.
                </p>
            </div>

            <!-- Quick Links -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
                <div class="space-y-2">
                    {#each footerLinks as link}
                        <button
                            on:click={() => scrollToSection(link.href.slice(1))}
                            class="block text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                        >
                            {link.name}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Social -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Connect</h3>
                <div class="flex gap-4">
                    {#each socialLinks as social}
                        <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
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

        <!-- Bottom -->
        <div class="border-t border-slate-800 pt-8 text-center">
            <p
                class="text-slate-400 text-sm flex items-center justify-center gap-2"
            >
                Made with <Heart
                    class="w-4 h-4 text-red-500"
                    fill="currentColor"
                /> by Yuriko © {currentYear}
            </p>
        </div>
    </div>
</footer>
