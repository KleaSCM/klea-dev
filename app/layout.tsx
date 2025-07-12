import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Comprehensive SEO metadata
export const metadata: Metadata = {
  title: {
    default: "Klea Dev - AI Systems Engineer & Fullstack Software Developer",
    template: "%s | Klea Dev"
  },
  description: "AI Systems Engineer specializing in native AI engines, cognitive systems, trait/desire models, and recursive agents. Expert in Go, C++, Python, TypeScript, and cutting-edge AI technologies.",
  keywords: [
    "AI Systems Engineer",
    "Cognitive Systems",
    "Native AI Engines",
    "Trait Models",
    "Desire Models",
    "State Engines",
    "Recursive Agents",
    "Machine Learning",
    "Go Programming",
    "C++ Development",
    "Python Development",
    "TypeScript",
    "React",
    "Next.js",
    "Fullstack Developer",
    "Cognitive Architecture",
    "AI Research",
    "Systems Programming"
  ],
  authors: [{ name: "Klea Dev" }],
  creator: "Klea Dev",
  publisher: "Klea Dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://klea-dev.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://klea-dev.com',
    title: 'Klea Dev - AI Systems Engineer & Fullstack Software Developer',
    description: 'Building native AI engines, cognitive systems, and cutting-edge applications with Go, C++, Python, and TypeScript.',
    siteName: 'Klea Dev Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Klea Dev - AI Systems Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klea Dev - AI Systems Engineer & Fullstack Software Developer',
    description: 'Building native AI engines, cognitive systems, and cutting-edge applications with Go, C++, Python, and TypeScript.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

// Structured data for rich snippets
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Klea Dev",
  "jobTitle": "AI Systems Engineer & Fullstack Software Developer",
  "description": "Building native AI engines, cognitive systems, trait/desire models, and recursive agents with Go, C++, Python, and TypeScript.",
  "url": "https://klea-dev.com",
  "sameAs": [
    "https://github.com/klea-dev",
    "https://linkedin.com/in/klea-dev"
  ],
  "knowsAbout": [
    "Artificial Intelligence",
    "Cognitive Systems",
    "Native AI Engines",
    "Trait Models",
    "Desire Models",
    "State Engines",
    "Recursive Agents",
    "Machine Learning",
    "Systems Programming",
    "Go Programming",
    "C++ Development",
    "Python Development",
    "TypeScript",
    "React",
    "Next.js",
    "Cognitive Architecture"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance AI Systems Engineer"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
              });
              
              // Track form submissions
              window.trackFormSubmission = () => {
                gtag('event', 'form_submit', {
                  event_category: 'engagement',
                  event_label: 'contact_form'
                });
              };
              
              // Track project clicks
              window.trackProjectClick = (projectName) => {
                gtag('event', 'click', {
                  event_category: 'engagement',
                  event_label: 'project_view',
                  value: projectName
                });
              };
              
              // Track scroll depth
              let maxScroll = 0;
              window.addEventListener('scroll', () => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                if (scrollPercent > maxScroll) {
                  maxScroll = scrollPercent;
                  if (maxScroll >= 25 && maxScroll % 25 === 0) {
                    gtag('event', 'scroll', {
                      event_category: 'engagement',
                      event_label: \`scroll_depth_\${maxScroll}\`
                    });
                  }
                }
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
