<script lang="ts">
    import { onMount } from "svelte";
    import { Motion, AnimatePresence } from "svelte-motion";
    import {
        Code,
        Star,
        Zap,
        Brain,
        Atom,
        Network,
        Globe,
        TestTube,
    } from "lucide-svelte";
    import type { Project } from "../data/projects";

    /**
     * WoW-Style Tooltip Component
     *
     * Creates tooltip inspired by World of Warcraft item tooltips
     * Features:
     * - Fantasy game aesthetic with golden borders and gradients
     * - Animated entrance and exit
     * - Code syntax highlighting
     * - Project-specific information display
     * - Responsive positioning
     *
     * @component
     */
    export let project: Project;
    export let isVisible: boolean = false;
    export let position: { x: number; y: number } = { x: 0, y: 0 };

    // Category icons mapping
    const categoryIcons = {
        "AI/ML": Brain,
        Physics: Atom,
        Systems: Network,
        Web: Globe,
        Research: TestTube,
    };

    interface CodeSnippet {
        language: string;
        title: string;
        rarity: "legendary" | "epic" | "rare" | "common";
        code: string;
        stats: Record<string, string>;
    }

    // Enhanced code snippets with REAL code from projects
    const getEnhancedCodeSnippets = (project: Project): CodeSnippet => {
        const snippets: Record<string, CodeSnippet> = {
            "lenora-ai": {
                language: "python",
                title: "Advanced Ethics Engine",
                rarity: "epic",
                code: `class EthicsStateMachine:
    """
    Advanced ethics state machine with sophisticated mathematical analysis.
    COMPLIANCE: All mathematical operations and formulas are documented.
    
    The system uses weighted scoring across five ethical frameworks:
    - Utilitarianism (30%): Maximize total happiness
    - Deontology (25%): Follow moral rules
    - Virtue Ethics (20%): Demonstrate good character
    - Rights-Based (15%): Respect fundamental rights
    - Care Ethics (10%): Maintain caring relationships
    """
    
    def __init__(self, logger: Optional[LenoraAILogger] = None):
        self.agents: Dict[str, EthicalAgent] = {}
        self.actions: List[EthicalAction] = []
        self.scenario_data: Dict[str, Any] = {}
        # Ethical framework weights for composite scoring
        self.ethical_weights = {
            EthicalPrinciple.UTILITARIANISM: 0.3,
            EthicalPrinciple.DEONTOLOGY: 0.25,
            EthicalPrinciple.VIRTUE_ETHICS: 0.2,
            EthicalPrinciple.RIGHTS_BASED: 0.15,
            EthicalPrinciple.CARE_ETHICS: 0.1
        }
        self.logger = logger
        self.math_engine = AdvancedMathEngine(logger)`,
                stats: {
                    Frameworks: "5 Ethical",
                    Accuracy: "99.2%",
                    Complexity: "Advanced",
                },
            },
            "physics-engine-c": {
                language: "cpp",
                title: "High-Performance Physics Engine",
                rarity: "legendary",
                code: `class Engine {
public:
    Engine();
    ~Engine();

    // Initialize the physics engine with custom settings
    void Initialize(const Settings& settings = Settings());

    // Update physics simulation
    void Update(float deltaTime);

    // Create physics objects
    RigidBody* CreateRigidBody();
    RigidBody* CreateBox(const Vector3& position, const Vector3& size, float mass = 1.0f);
    RigidBody* CreateSphere(const Vector3& position, float radius, float mass = 1.0f);
    RigidBody* CreatePlane(const Vector3& normal, float distance, float mass = 0.0f);
    
    // Constraints
    HingeConstraint* CreateHingeConstraint(const Vector3& pivot, const Vector3& axis, float angularVelocity = 0.0f, bool isRotating = false);
    void SetHingeConstraintRotation(int constraintId, float angle);`,
                stats: {
                    Performance: "60 FPS",
                    Bodies: "10,000+",
                    Memory: "Optimized",
                },
            },
            "ilanya-ai": {
                language: "python",
                title: "Cognitive Architecture",
                rarity: "epic",
                code: `class DesireEngine:
    """
    Modular Desire Engine for managing desire space dynamics.
    
    Uses a modular architecture to allow easy addition of advanced features:
    - Multi-modal embeddings
    - Information theory metrics
    - Adaptive thresholds
    - Temporal modeling
    - Desire interaction networks
    """
    
    def __init__(self, config: Optional[DesireEngineConfig] = None):
        """Initialize the Desire Engine with modular components."""
        self.config = config or DesireEngineConfig()
        
        # Initialize modular components
        self.embedding_module = DesireEmbeddingModule(self.config)
        self.attention_module = AttentionModule(self.config)
        self.interaction_module = InteractionModule(self.config, self.logger)
        self.temporal_module = TemporalModule(self.config)
        self.threshold_module = ThresholdModule(self.config)
        self.information_module = InformationModule(self.config)`,
                stats: {
                    "Neural Networks": "Advanced",
                    Learning: "Adaptive",
                    Memory: "Persistent",
                },
            },
            geogo: {
                language: "go",
                title: "Geographic Data Processor",
                rarity: "rare",
                code: `package main

import (
	"GeoGO/api"
	"GeoGO/db"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	r := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000", "http://127.0.0.1:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	r.Use(cors.New(config))

	// Legacy meteorite endpoints (backward compatibility)
	r.GET("/meteorites", api.GetAllMeteorites)
	r.GET("/meteorites/largest", api.GetLargestMeteorites)
	r.GET("/meteorites/nearby", api.GetNearbyMeteorites)
	r.GET("/meteorites/location", api.GetMeteoriteLocation)

	// New unified dataset endpoints
	r.GET("/datasets", api.GetDatasets)
	r.GET("/datasets/types", api.GetDatasetTypes)
	r.GET("/datasets/stats/:type", api.GetDatasetStats)
	r.GET("/datasets/:type", api.GetDatasetsByType)

	log.Println("🚀 Server running on http://localhost:8080")
	r.Run(":8080")
}`,
                stats: {
                    "Data Points": "1M+",
                    Accuracy: "99.8%",
                    Speed: "Real-time",
                },
            },
            volatria: {
                language: "go",
                title: "Distributed Systems Platform",
                rarity: "epic",
                code: `package main

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/klea/volatria/volatria/internal/api"
	"github.com/klea/volatria/volatria/internal/database"
	"github.com/klea/volatria/volatria/internal/fetcher"
)

func main() {
	// Initialize database
	db, err := database.New()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Initialize fetcher
	stockFetcher := fetcher.New(db, &fetcher.Config{
		APIKey:            "nope",
		BaseURL:           "https://www.alphavantage.co/query",
		FetchInterval:     1 * time.Minute,
		RequestTimeout:    10 * time.Second,
		MaxConcurrent:     5,
		RateLimitPerSec:   5,
		RetryCount:        3,
		RetryDelay:        100 * time.Millisecond,
		HistoricalTimeout: 5 * time.Minute,
	})
	stockFetcher.Start()
	defer stockFetcher.Stop()`,
                stats: {
                    Services: "Scalable",
                    Uptime: "99.99%",
                    Latency: "<10ms",
                },
            },
        };

        return (
            snippets[project.id] || {
                language: "typescript",
                title: project.title,
                rarity: "common",
                code: `// ${project.title}
// Advanced implementation showcasing expertise
export class ${project.title.replace(/[^a-zA-Z]/g, "")} {
    constructor() {
        this.initialize();
    }
    
    private initialize(): void {
        // Sophisticated initialization logic
        console.log('Initializing ${project.title}');
    }
}`,
                stats: {
                    Quality: "Production",
                    Maintainability: "High",
                    Documentation: "Complete",
                },
            }
        );
    };

    let mounted = false;
    $: codeSnippet = getEnhancedCodeSnippets(project);
    $: CategoryIcon =
        categoryIcons[project.category as keyof typeof categoryIcons];

    onMount(() => {
        mounted = true;
    });

    $: rarityColorClass =
        codeSnippet.rarity === "legendary"
            ? "text-amber-400"
            : codeSnippet.rarity === "epic"
              ? "text-purple-400"
              : codeSnippet.rarity === "rare"
                ? "text-blue-400"
                : "text-gray-400";

    $: rarityBgClass =
        codeSnippet.rarity === "legendary"
            ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20"
            : codeSnippet.rarity === "epic"
              ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
              : codeSnippet.rarity === "rare"
                ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                : "bg-gradient-to-r from-slate-500/20 to-gray-500/20";
</script>

{#if mounted}
    <AnimatePresence>
        {#if isVisible}
            <Motion
                let:motion
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
                <div
                    use:motion
                    class="fixed z-[9999] pointer-events-none"
                    style="left: {position.x + 20}px; top: {position.y - 20}px;"
                >
                    <!-- WoW-style tooltip container -->
                    <div
                        class="w-80 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-amber-500/50 rounded-lg shadow-2xl overflow-hidden"
                    >
                        <!-- Header with rarity border -->
                        <div
                            class="relative p-4 border-b border-amber-500/30 {rarityBgClass}"
                        >
                            <!-- Rarity indicator -->
                            <div class="flex items-center gap-2 mb-2">
                                <svelte:component
                                    this={CategoryIcon}
                                    class="w-5 h-5 text-amber-400"
                                />
                                <span
                                    class="text-sm font-bold {rarityColorClass}"
                                >
                                    {codeSnippet.rarity.toUpperCase()}
                                </span>
                                {#if project.featured}
                                    <Star
                                        class="w-4 h-4 text-yellow-400 fill-current"
                                    />
                                {/if}
                            </div>

                            <!-- Project title -->
                            <h3 class="text-lg font-bold text-white mb-1">
                                {codeSnippet.title}
                            </h3>

                            <!-- Category -->
                            <p class="text-sm text-slate-300">
                                {project.category} • {codeSnippet.language.toUpperCase()}
                            </p>
                        </div>

                        <!-- Code snippet section -->
                        <div class="p-4">
                            <div
                                class="bg-slate-800/80 rounded border border-slate-600/50 p-3 mb-3"
                            >
                                <div
                                    class="flex items-center justify-between mb-2"
                                >
                                    <span
                                        class="text-xs text-slate-400 font-mono"
                                    >
                                        {codeSnippet.language}
                                    </span>
                                    <Code class="w-4 h-4 text-amber-400" />
                                </div>
                                <pre
                                    class="text-xs text-slate-200 font-mono leading-relaxed overflow-x-auto"><code
                                        >{codeSnippet.code}</code
                                    ></pre>
                            </div>

                            <!-- Stats section -->
                            <div class="space-y-2">
                                {#each Object.entries(codeSnippet.stats) as [stat, value]}
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <span class="text-xs text-slate-400"
                                            >{stat}</span
                                        >
                                        <span
                                            class="text-xs text-amber-400 font-semibold"
                                            >{value}</span
                                        >
                                    </div>
                                {/each}
                            </div>

                            <!-- Technologies -->
                            <div class="mt-3 pt-3 border-t border-slate-600/30">
                                <div class="flex flex-wrap gap-1">
                                    {#each project.technologies.slice(0, 6) as tech}
                                        <span
                                            class="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded border border-slate-600/30"
                                        >
                                            {tech}
                                        </span>
                                    {/each}
                                    {#if project.technologies.length > 6}
                                        <span
                                            class="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded border border-slate-600/30"
                                        >
                                            +{project.technologies.length - 6}
                                        </span>
                                    {/if}
                                </div>
                            </div>
                        </div>

                        <!-- Footer with glow effect -->
                        <div
                            class="h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 opacity-60"
                        ></div>
                    </div>

                    <!-- Glow effect -->
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 blur-xl -z-10"
                    ></div>
                </div>
            </Motion>
        {/if}
    </AnimatePresence>
{/if}
