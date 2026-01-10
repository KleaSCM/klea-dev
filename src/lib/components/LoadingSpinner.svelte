<script lang="ts">
    export let size: "sm" | "md" | "lg" = "md";
    export let color: "primary" | "white" | "slate" = "primary";

    const sizeClasses: Record<string, string> = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    };

    const colorClasses: Record<string, string> = {
        primary: "border-primary/30 border-t-primary",
        white: "border-white/30 border-t-white",
        slate: "border-slate-200 border-t-slate-600 dark:border-slate-700 dark:border-t-slate-300",
    };
</script>

<div
    class="inline-block animate-spin rounded-full {sizeClasses[
        size
    ]} {colorClasses[color]}"
    role="status"
    aria-label="loading"
>
    <span class="sr-only">Loading...</span>
</div>
