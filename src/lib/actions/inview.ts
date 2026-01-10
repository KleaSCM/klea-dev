import type { Action } from 'svelte/action';

export interface InViewOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
    once?: boolean;
}

export interface InViewDetail {
    isInView: boolean;
    entry: IntersectionObserverEntry;
}

/**
 * IntersectionObserver Action for Svelte
 * 
 * Dispatches an 'inview' event when the element enters/exits the viewport.
 * Use this to trigger scroll-based animations.
 * 
 * @example
 * ```svelte
 * <div use:inview={{ once: true }} on:inview={handleInView}>
 *   Content
 * </div>
 * ```
 */
export const inview: Action<HTMLElement, InViewOptions | undefined> = (
    node: HTMLElement,
    options: InViewOptions = {}
) => {
    const { once = false, ...observerOptions } = options;
    let hasTriggered = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const isInView = entry.isIntersecting;

            // If once=true and already triggered, don't dispatch again
            if (once && hasTriggered && !isInView) {
                return;
            }

            if (isInView && once) {
                hasTriggered = true;
            }

            node.dispatchEvent(
                new CustomEvent<InViewDetail>('inview', {
                    detail: {
                        isInView,
                        entry,
                    },
                })
            );
        });
    }, observerOptions);

    observer.observe(node);

    return {
        update(newOptions: InViewOptions = {}) {
            observer.disconnect();
            observer.observe(node);
        },
        destroy() {
            observer.disconnect();
        },
    };
};
