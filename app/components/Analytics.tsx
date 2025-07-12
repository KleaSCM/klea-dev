'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Analytics Component
 * 
 * Handles comprehensive analytics tracking including:
 * - Google Analytics 4 integration
 * - Custom event tracking for portfolio interactions
 * - Performance monitoring
 * - User engagement metrics
 * 
 * @component
 * @description Provides analytics tracking for the portfolio website
 */
export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize Google Analytics if GA_MEASUREMENT_ID is available
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      // Load Google Analytics script
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`
      script.async = true
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      gtag('js', new Date())
      gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      })

      // Track page views
      gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: pathname,
      })
    }

    // Custom event tracking for portfolio interactions
    const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters)
      }
    }

    // Track project interactions
    const trackProjectView = (projectName: string) => {
      trackEvent('project_view', {
        project_name: projectName,
        page_path: pathname,
      })
    }

    // Track contact form interactions
    const trackContactForm = (action: 'submit' | 'error') => {
      trackEvent('contact_form', {
        action: action,
        page_path: pathname,
      })
    }

    // Track skill section interactions
    const trackSkillInteraction = (skillName: string, interactionType: string) => {
      trackEvent('skill_interaction', {
        skill_name: skillName,
        interaction_type: interactionType,
        page_path: pathname,
      })
    }

    // Expose tracking functions globally for use in other components
    window.trackEvent = trackEvent
    window.trackProjectView = trackProjectView
    window.trackContactForm = trackContactForm
    window.trackSkillInteraction = trackSkillInteraction

    // Performance monitoring
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          trackEvent('page_performance', {
            load_time: navigation.loadEventEnd - navigation.loadEventStart,
            dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            first_paint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
            first_contentful_paint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
          })
        }
      })
    }

    // User engagement tracking
    let scrollDepth = 0
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.offsetHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      
      if (scrollPercent > scrollDepth && scrollPercent % 25 === 0) {
        scrollDepth = scrollPercent
        trackEvent('scroll_depth', {
          depth: scrollPercent,
          page_path: pathname,
        })
      }
    }

    window.addEventListener('scroll', trackScrollDepth)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth)
    }
  }, [pathname])

  return null // This component doesn't render anything
}

// TypeScript declarations for global tracking functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    trackEvent: (eventName: string, parameters?: Record<string, any>) => void
    trackProjectView: (projectName: string) => void
    trackContactForm: (action: 'submit' | 'error') => void
    trackSkillInteraction: (skillName: string, interactionType: string) => void
  }
} 