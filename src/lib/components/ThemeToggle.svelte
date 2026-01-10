<script lang="ts">
    import { onMount } from "svelte";
    import { Sun, Moon, Monitor } from "lucide-svelte";

    type Theme = "light" | "dark" | "system";

    let theme: Theme = "system";
    let mounted = false;

    // Apply theme to document
    function applyTheme(newTheme: Theme) {
        const root = document.documentElement;

        // Determine actual theme to apply
        const actualTheme =
            newTheme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : newTheme;

        // Update DOM
        if (actualTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }

    // Handle theme change
    function handleThemeChange(newTheme: Theme) {
        theme = newTheme;
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    }

    // Initialize on mount - NO SSR ISSUES!
    onMount(() => {
        mounted = true;

        // Get stored theme or default to system
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        if (storedTheme) {
            theme = storedTheme;
            applyTheme(storedTheme);
        } else {
            theme = "system";
            applyTheme("system");
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (theme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    });
</script>

{#if mounted}
    <div
        class="relative inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 shadow-lg"
    >
        <button
            on:click={() => handleThemeChange("light")}
            class="p-2 rounded-full transition-all duration-200 {theme ===
            'light'
                ? 'bg-white dark:bg-slate-700 text-yellow-500 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-yellow-500'}"
            title="Light mode"
        >
            <Sun class="w-4 h-4" />
        </button>

        <button
            on:click={() => handleThemeChange("dark")}
            class="p-2 rounded-full transition-all duration-200 {theme ===
            'dark'
                ? 'bg-white dark:bg-slate-700 text-indigo-500 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'}"
            title="Dark mode"
        >
            <Moon class="w-4 h-4" />
        </button>

        <button
            on:click={() => handleThemeChange("system")}
            class="p-2 rounded-full transition-all duration-200 {theme ===
            'system'
                ? 'bg-white dark:bg-slate-700 text-slate-500 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-500'}"
            title="System theme"
        >
            <Monitor class="w-4 h-4" />
        </button>
    </div>
{/if}
