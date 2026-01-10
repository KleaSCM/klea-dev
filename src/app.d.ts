// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }

    // Augment HTML elements to support custom events from actions
    namespace svelteHTML {
        interface HTMLAttributes<T> {
            'on:inview'?: (event: CustomEvent<import('./lib/actions/inview').InViewDetail>) => void;
        }
    }
}

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
        trackEvent: (eventName: string, parameters?: Record<string, any>) => void;
        trackProjectView: (projectName: string) => void;
        trackContactForm: (action: 'submit' | 'error') => void;
        trackSkillInteraction: (skillName: string, interactionType: string) => void;
    }
}

export { };
