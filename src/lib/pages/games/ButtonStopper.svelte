<script lang="ts">
    import { onMount } from "svelte";
    import { link } from "svelte-spa-router";
    import Navigation from "../../components/Navigation.svelte";
    import Footer from "../../components/Footer.svelte";

    let isPlaying = false;
    let time = 30;
    let message = "";
    let code = `// Write code to stop the button!\n// Hint: document.querySelector('.target-btn')\n`;

    // Button position for evasion
    let buttonX = 50;
    let buttonY = 50;
    let gameArea: HTMLElement;

    function startGame() {
        isPlaying = true;
        time = 30;
        message = "";
        buttonX = 50; // Reset to center
        buttonY = 50;

        const interval = setInterval(() => {
            time--;
            if (time <= 0) {
                clearInterval(interval);
                isPlaying = false;
                message = "Time up! Try again!";
            }
        }, 1000);
    }

    function handleMouseMove(event: MouseEvent) {
        if (!isPlaying || !gameArea) return;

        const rect = gameArea.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((event.clientY - rect.top) / rect.height) * 100;

        // Calculate distance from mouse to button
        const dx = buttonX - mouseX;
        const dy = buttonY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If mouse is too close (within 20% of the area), move button away
        if (distance < 20) {
            // Move in opposite direction
            const angle = Math.atan2(dy, dx);
            const moveDistance = 15;

            buttonX = Math.max(
                10,
                Math.min(90, buttonX + Math.cos(angle) * moveDistance),
            );
            buttonY = Math.max(
                10,
                Math.min(90, buttonY + Math.sin(angle) * moveDistance),
            );
        }
    }

    function runCode() {
        try {
            // Simple sandbox eval
            eval(code);
            const btn = document.querySelector(".target-btn") as HTMLElement;
            if (
                btn &&
                (btn.style.display === "none" ||
                    btn.style.visibility === "hidden")
            ) {
                message = "🎉 Success! You stopped the button!";
                isPlaying = false;
            } else {
                message = "Code executed but button still visible!";
            }
        } catch (e: any) {
            message = `Error:  ${e.message}`;
        }
    }
</script>

<Navigation />

<main
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 pt-24 p-8"
>
    <div class="container-custom max-w-6xl">
        <h1 class="text-4xl font-bold gradient-text mb-4">Button Stopper</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Write JavaScript code to stop the moving button!
        </p>

        <div class="grid md:grid-cols-2 gap-8">
            <!-- Game Area -->
            <div class="card p-6">
                <h2 class="text-2xl font-bold mb-4">Game Area</h2>
                {#if !isPlaying}
                    <button on:click={startGame} class="btn-primary mb-4"
                        >Start Game</button
                    >
                {:else}
                    <div class="mb-4 text-xl font-bold">Time: {time}s</div>
                {/if}

                <div
                    bind:this={gameArea}
                    on:mousemove={handleMouseMove}
                    role="region"
                    aria-label="Game area"
                    class="relative bg-slate-100 dark:bg-slate-700 rounded-lg h-64 flex items-center justify-center overflow-hidden"
                >
                    {#if isPlaying}
                        <button
                            class="target-btn btn-primary absolute"
                            style="left: {buttonX}%; top: {buttonY}%; transform: translate(-50%, -50%); transition: all 0.2s ease-out;"
                        >
                            Catch Me!
                        </button>
                    {:else}
                        <p class="text-slate-500">Start the game to begin!</p>
                    {/if}
                </div>

                {#if message}
                    <div
                        class="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
                    >
                        {message}
                    </div>
                {/if}
            </div>

            <!-- Code Editor -->
            <div class="card p-6">
                <h2 class="text-2xl font-bold mb-4">Code Editor</h2>
                <textarea
                    bind:value={code}
                    class="w-full h-48 p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-lg mb-4"
                    disabled={!isPlaying}
                ></textarea>
                <button
                    on:click={runCode}
                    disabled={!isPlaying}
                    class="btn-primary w-full"
                >
                    Execute Code
                </button>

                <div
                    class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm"
                >
                    <strong>Hint:</strong> Try hiding the button using
                    <code class="bg-slate-200 dark:bg-slate-700 px-1 rounded"
                        >style.display = 'none'</code
                    >
                </div>
            </div>
        </div>

        <div class="mt-8 text-center">
            <a href="/#games" use:link class="text-indigo-500 hover:underline"
                >← Back to Games</a
            >
        </div>
    </div>
</main>

<Footer />
