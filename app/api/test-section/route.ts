import { NextResponse } from 'next/server';

function extractSection(content: string, startHeader: string, endHeader?: string): string {
  // Create regex pattern for the start header
  const startPattern = new RegExp(`^##?\\s*${startHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'mi');
  const startMatch = content.match(startPattern);
  
  if (!startMatch) return '';
  
  const startIndex = startMatch.index! + startMatch[0].length;
  
  // Find the end of the section
  let endIndex = content.length;
  if (endHeader) {
    const endPattern = new RegExp(`^##?\\s*${endHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'mi');
    const endMatch = content.substring(startIndex).match(endPattern);
    if (endMatch) {
      endIndex = startIndex + endMatch.index!;
    }
  } else {
    // Find next header of same or higher level
    const nextHeaderPattern = /^##?\s+/gm;
    const nextMatch = content.substring(startIndex).match(nextHeaderPattern);
    if (nextMatch) {
      endIndex = startIndex + nextMatch.index!;
    }
  }
  
  return content.substring(startIndex, endIndex).trim();
}

export async function GET(request: Request) {
  try {
    // Test with the actual content from your template
    const testContent = `# Ilanya - Advanced AI Cognitive Architecture

A revolutionary AI system that implements a multi-stage cognitive processing pipeline combining neural networks with mathematical control systems to create stable, protected, and evolvable personality systems.

## 🚀 Key Features

- **🧠 Neural Trait Mapping**: Transformer-based neural networks using sentence-transformers/all-MiniLM-L6-v2 for natural language to trait modification mapping
- **🔄 Emergent Behavior System**: Desire interaction networks that create new behaviors through synergy and conflict detection
- **🛡️ Identity Preservation**: Multi-tier protection system with differential penalty weights (50x for permanent, 10x for partial, 1x for evolvable traits)

## 🛠️ Technology Stack

### Languages
- Python 3.8+
- CUDA (for GPU acceleration)

### Frameworks & Libraries
- PyTorch (Neural Networks)
- Transformers (sentence-transformers/all-MiniLM-L6-v2)

## 🎯 Problem Statement

Traditional AI systems lack the ability to maintain consistent identity while evolving naturally through experience.`;

    const keyFeaturesSection = extractSection(testContent, '🚀 Key Features');
    const techStackSection = extractSection(testContent, '🛠️ Technology Stack');
    const problemSection = extractSection(testContent, '🎯 Problem Statement');
    
    return NextResponse.json({
      success: true,
      keyFeaturesSection: keyFeaturesSection.substring(0, 200) + '...',
      techStackSection: techStackSection.substring(0, 200) + '...',
      problemSection: problemSection.substring(0, 200) + '...',
      keyFeaturesLength: keyFeaturesSection.length,
      techStackLength: techStackSection.length,
      problemLength: problemSection.length
    });
  } catch (error) {
    console.error('Section test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 