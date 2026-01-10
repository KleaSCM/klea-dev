<script lang="ts">
    import { onMount } from "svelte";

    export let skipToContent = true;
    export let highContrast = false;
    export let reducedMotion = false;
    let className = "";
    export { className as class };

    let isHighContrast = highContrast;
    let isReducedMotion = reducedMotion;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let focusVisible = false;
    let mainContentRef: HTMLElement;

    onMount(() => {
        // Reduced Motion Preference
        const motionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        isReducedMotion = motionQuery.matches;

        const handleMotionChange = (e: MediaQueryListEvent) => {
            isReducedMotion = e.matches;
        };
        motionQuery.addEventListener("change", handleMotionChange);

        // High Contrast Preference
        const contrastQuery = window.matchMedia("(prefers-contrast: high)");
        isHighContrast = contrastQuery.matches;

        const handleContrastChange = (e: MediaQueryListEvent) => {
            isHighContrast = e.matches;
        };
        contrastQuery.addEventListener("change", handleContrastChange);

        // Focus Visibility
        const handleFocusIn = () => (focusVisible = true);
        const handleFocusOut = () => (focusVisible = false);
        document.addEventListener("focusin", handleFocusIn);
        document.addEventListener("focusout", handleFocusOut);

        return () => {
            motionQuery.removeEventListener("change", handleMotionChange);
            contrastQuery.removeEventListener("change", handleContrastChange);
            document.removeEventListener("focusin", handleFocusIn);
            document.removeEventListener("focusout", handleFocusOut);
        };
    });

    function handleSkipToContent(e: MouseEvent) {
        e.preventDefault();
        if (mainContentRef) {
            mainContentRef.focus();
            mainContentRef.scrollIntoView({ behavior: "smooth" });
        }
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement && activeElement.blur) {
                activeElement.blur();
            }
        }

        if (e.key === "Enter" || e.key === " ") {
            const target = e.target as HTMLElement;
            if (
                (target.tagName === "BUTTON" &&
                    target.getAttribute("type") !== "submit") ||
                target.getAttribute("role") === "button"
            ) {
                // Only prevent default if it's acting as a generic button, standard buttons might need default behavior
                // But the original React code did preventDefault unconditionally for button/role=button
                e.preventDefault();
                target.click();
            }
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class={`accessibility-wrapper ${className}`}
    on:keydown={handleKeyDown}
    style:--high-contrast={isHighContrast ? "1" : "0"}
    style:--reduced-motion={isReducedMotion ? "1" : "0"}
>
    {#if skipToContent}
        <a
            href="#main-content"
            class="skip-to-content"
            on:click={handleSkipToContent}
        >
            Skip to content
        </a>
    {/if}

    <main
        bind:this={mainContentRef}
        id="main-content"
        tabindex="-1"
        aria-label="Main content"
        class={`main-content ${isHighContrast ? "high-contrast" : ""} ${isReducedMotion ? "reduced-motion" : ""}`}
    >
        <slot />
    </main>

    <div
        id="announcements"
        aria-live="polite"
        aria-atomic="true"
        class="sr-only"
        style="position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;"
    ></div>
</div>

<style>
    .accessibility-wrapper {
        /* Variables need to be defined or used carefully since CSS variables in style attribute cascade */
        --focus-ring: var(--high-contrast) == 1 ? 3px solid #ffff00: 2px solid
            var(--primary, #3b82f6);
        --focus-ring-offset: var(--high-contrast) == 1 ? 2px: 1px;
    }

    /* Note: CSS variables in property values like above won't work directly with ternary logic in pure CSS withoutcalc/helpers, 
     so we rely on Svelte style attribute for the flags and use CSS custom properties for logic or just class overrides. */

    /* Retaining the original logic via classes is reliable */
    .main-content:focus {
        outline: 2px solid var(--primary, #3b82f6);
        outline-offset: 1px;
    }

    /* High Contrast Mode */
    .high-contrast {
        --text-color: #ffffff;
        --background-color: #000000;
        --border-color: #ffffff;
        --link-color: #ffff00;
    }

    .high-contrast:focus {
        outline: 3px solid #ffff00;
        outline-offset: 2px;
    }

    /* Reduced Motion */
    /* :global(.reduced-motion *) triggers for children */
    :global(.reduced-motion *) {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    /* Skip Link */
    .skip-to-content {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary, #3b82f6);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        transition: top 0.3s ease;
    }

    .skip-to-content:focus {
        top: 6px;
        outline: 2px solid var(--primary, #3b82f6);
        outline-offset: 1px;
    }

    /* Screen Reader Only */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
</style>
