import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research & Interactive Work | Klea Dev',
  description: 'Explore interactive notebooks, research papers, and technical reports. From AI system design to cognitive architecture, discover cutting-edge work in artificial intelligence and software engineering.',
  keywords: 'research, AI, machine learning, notebooks, technical reports, cognitive systems, artificial intelligence',
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 