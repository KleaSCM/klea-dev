<script lang="ts">
    import { onMount } from "svelte";
    import { location } from "svelte-spa-router";

    // Access environment variable safely
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

    onMount(() => {
        if (GA_MEASUREMENT_ID) {
            // Load Google Analytics Script
            const script = document.createElement("script");
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            script.async = true;
            document.head.appendChild(script);

            // Initialize DataLayer
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]) {
                window.dataLayer.push(args);
            }
            window.gtag = gtag; // Make globally available

            gtag("js", new Date());
            gtag("config", GA_MEASUREMENT_ID, {
                page_title: document.title,
                page_location: window.location.href,
            });
        }

        // Attach global tracking functions
        window.trackEvent = trackEvent;
        window.trackProjectView = trackProjectView;
        window.trackContactForm = trackContactForm;
        window.trackSkillInteraction = trackSkillInteraction;

        // Performance Monitoring
        if ("performance" in window) {
            window.addEventListener("load", () => {
                const navigation = performance.getEntriesByType(
                    "navigation",
                )[0] as PerformanceNavigationTiming;
                if (navigation) {
                    trackEvent("page_performance", {
                        load_time:
                            navigation.loadEventEnd - navigation.loadEventStart,
                        dom_content_loaded:
                            navigation.domContentLoadedEventEnd -
                            navigation.domContentLoadedEventStart,
                        first_paint:
                            performance.getEntriesByName("first-paint")[0]
                                ?.startTime || 0,
                        first_contentful_paint:
                            performance.getEntriesByName(
                                "first-contentful-paint",
                            )[0]?.startTime || 0,
                    });
                }
            });
        }

        // Scroll Depth Tracking
        let scrollDepth = 0;
        const trackScrollDepth = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            if (scrollPercent > scrollDepth && scrollPercent % 25 === 0) {
                scrollDepth = scrollPercent;
                trackEvent("scroll_depth", {
                    depth: scrollPercent,
                    page_path: $location,
                });
            }
        };

        window.addEventListener("scroll", trackScrollDepth);

        return () => {
            window.removeEventListener("scroll", trackScrollDepth);
        };
    });

    // Track Page Views on Route Change
    $: {
        if (GA_MEASUREMENT_ID && $location) {
            if (window.gtag) {
                window.gtag("config", GA_MEASUREMENT_ID, {
                    page_path: $location,
                });
            }
        }
    }

    // Helper Functions
    function trackEvent(eventName: string, parameters?: Record<string, any>) {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", eventName, parameters);
        }
    }

    function trackProjectView(projectName: string) {
        trackEvent("project_view", {
            project_name: projectName,
            page_path: $location,
        });
    }

    function trackContactForm(action: "submit" | "error") {
        trackEvent("contact_form", {
            action: action,
            page_path: $location,
        });
    }

    function trackSkillInteraction(skillName: string, interactionType: string) {
        trackEvent("skill_interaction", {
            skill_name: skillName,
            interaction_type: interactionType,
            page_path: $location,
        });
    }
</script>

<svelte:head>
    <!-- Add global type declarations for window if not already in app.d.ts -->
</svelte:head>
