<script lang="ts">
    import {
        Mail,
        Send,
        CheckCircle,
        AlertCircle,
        User,
        MessageSquare,
        Phone,
    } from "lucide-svelte";
    import { fade, slide, fly } from "svelte/transition";

    interface FormData {
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
    }

    interface FormErrors {
        name?: string;
        email?: string;
        phone?: string;
        subject?: string;
        message?: string;
    }

    let formData: FormData = {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    };

    let errors: FormErrors = {};
    let isSubmitting = false;
    let submitStatus: "idle" | "success" | "error" = "idle";
    let errorMessage = "";

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        if (!phone) return true;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (formData.phone && !validatePhone(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        } else if (formData.subject.trim().length < 5) {
            newErrors.subject = "Subject must be at least 5 characters";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        errors = newErrors;
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        formData[field] = value;

        if (errors[field]) {
            errors[field] = undefined;
        }
    };

    async function handleSubmit() {
        if (!validateForm()) {
            return;
        }

        isSubmitting = true;
        submitStatus = "idle";
        errorMessage = "";

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            // Handle API response gracefully even if endpoint is mocked/missing in dev
            let result;
            try {
                result = await response.json();
            } catch (e) {
                // If JSON fails, assume success for demo purposes if code is ok, or fallback
                result = { success: response.ok };
            }

            if (response.ok && result.success) {
                submitStatus = "success";

                if (typeof window !== "undefined") {
                    window.trackContactForm?.("submit");
                }

                setTimeout(() => {
                    formData = {
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                    };
                    submitStatus = "idle";
                }, 3000);
            } else {
                submitStatus = "error";
                errorMessage =
                    result.error || "Something went wrong. Please try again.";

                if (typeof window !== "undefined") {
                    window.trackContactForm?.("error");
                }
            }
        } catch (error) {
            // For development/demo without backend, we might want to simulate success
            // But let's stick to error handling
            console.error("Contact form error:", error);
            submitStatus = "error";
            errorMessage =
                "Network error. Please check your connection and try again.";
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="card p-8" in:fly={{ y: 20, duration: 600 }}>
    <div class="flex items-center gap-3 mb-6">
        <div
            class="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg"
        >
            <Mail class="w-6 h-6 text-white" />
        </div>
        <h4 class="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Get In Touch
        </h4>
    </div>

    <!-- Status Messages -->
    {#if submitStatus === "success"}
        <div
            in:slide
            out:slide
            class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
        >
            <CheckCircle class="w-5 h-5 text-green-500" />
            <span class="text-green-700 dark:text-green-300">
                Thank you! Your message has been sent successfully. I'll get
                back to you soon!
            </span>
        </div>
    {/if}

    {#if submitStatus === "error"}
        <div
            in:slide
            out:slide
            class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
        >
            <AlertCircle class="w-5 h-5 text-red-500" />
            <span class="text-red-700 dark:text-red-300">
                {errorMessage ||
                    "Something went wrong. Please try again or contact me directly."}
            </span>
        </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit} class="mobile-form space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Name -->
            <div>
                <label
                    class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                    <User class="w-4 h-4 inline mr-2" />
                    Name *
                </label>
                <input
                    type="text"
                    value={formData.name}
                    on:input={(e) =>
                        handleInputChange("name", e.currentTarget.value)}
                    class={`mobile-input ${
                        errors.name
                            ? "border-red-300 dark:border-red-600"
                            : "border-slate-200 dark:border-slate-700"
                    }`}
                    placeholder="Your full name"
                />
                {#if errors.name}
                    <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.name}
                    </p>
                {/if}
            </div>

            <!-- Email -->
            <div>
                <label
                    class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                    <Mail class="w-4 h-4 inline mr-2" />
                    Email *
                </label>
                <input
                    type="email"
                    value={formData.email}
                    on:input={(e) =>
                        handleInputChange("email", e.currentTarget.value)}
                    class={`mobile-input ${
                        errors.email
                            ? "border-red-300 dark:border-red-600"
                            : "border-slate-200 dark:border-slate-700"
                    }`}
                    placeholder="your.email@example.com"
                />
                {#if errors.email}
                    <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.email}
                    </p>
                {/if}
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Phone -->
            <div>
                <label
                    class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                    <Phone class="w-4 h-4 inline mr-2" />
                    Phone (Optional)
                </label>
                <input
                    type="tel"
                    value={formData.phone}
                    on:input={(e) =>
                        handleInputChange("phone", e.currentTarget.value)}
                    class={`mobile-input ${
                        errors.phone
                            ? "border-red-300 dark:border-red-600"
                            : "border-slate-200 dark:border-slate-700"
                    }`}
                    placeholder="+1 (555) 123-4567"
                />
                {#if errors.phone}
                    <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.phone}
                    </p>
                {/if}
            </div>

            <!-- Subject -->
            <div>
                <label
                    class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                    <MessageSquare class="w-4 h-4 inline mr-2" />
                    Subject *
                </label>
                <input
                    type="text"
                    value={formData.subject}
                    on:input={(e) =>
                        handleInputChange("subject", e.currentTarget.value)}
                    class={`mobile-input ${
                        errors.subject
                            ? "border-red-300 dark:border-red-600"
                            : "border-slate-200 dark:border-slate-700"
                    }`}
                    placeholder="Project inquiry, collaboration, etc."
                />
                {#if errors.subject}
                    <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.subject}
                    </p>
                {/if}
            </div>
        </div>

        <!-- Message -->
        <div>
            <label
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
                <MessageSquare class="w-4 h-4 inline mr-2" />
                Message *
            </label>
            <textarea
                value={formData.message}
                on:input={(e) =>
                    handleInputChange("message", e.currentTarget.value)}
                rows="6"
                class={`mobile-input resize-none ${
                    errors.message
                        ? "border-red-300 dark:border-red-600"
                        : "border-slate-200 dark:border-slate-700"
                }`}
                placeholder="Tell me about your project, requirements, or how I can help you..."
            ></textarea>
            {#if errors.message}
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.message}
                </p>
            {/if}
        </div>

        <button
            type="submit"
            disabled={isSubmitting}
            class="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mobile-touch transition-transform active:scale-95"
        >
            {#if isSubmitting}
                <div
                    class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></div>
                <span>Sending...</span>
            {:else}
                <Send class="w-4 h-4" />
                <span>Send Message</span>
            {/if}
        </button>
    </form>

    <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
        <h5
            class="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3"
        >
            Alternative Contact Methods
        </h5>
        <div class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div class="flex items-center gap-2">
                <Mail class="w-4 h-4" />
                <span>klea@example.com</span>
            </div>
            <div class="flex items-center gap-2">
                <Phone class="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
            </div>
        </div>
    </div>
</div>
