import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
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

## 🎯 Problem Statement

Traditional AI systems lack the ability to maintain consistent identity while evolving naturally through experience.`;

    // Test different regex patterns
    const patterns = [
      /^##\s*🚀 Key Features\s*$/mi,
      /^##\s*🛠️ Technology Stack\s*$/mi,
      /^##\s*🎯 Problem Statement\s*$/mi,
      /^##\s*🚀 Key Features/mi,
      /^##\s*🛠️ Technology Stack/mi,
      /^##\s*🎯 Problem Statement/mi
    ];

    const results = patterns.map((pattern, index) => {
      const match = testContent.match(pattern);
      return {
        pattern: pattern.toString(),
        found: !!match,
        match: match ? match[0] : null,
        index: match ? match.index : null
      };
    });

    // Also test line by line
    const lines = testContent.split('\n');
    const lineMatches = lines.map((line, index) => {
      const keyFeaturesMatch = line.match(/^##\s*🚀 Key Features\s*$/);
      const techStackMatch = line.match(/^##\s*🛠️ Technology Stack\s*$/);
      const problemMatch = line.match(/^##\s*🎯 Problem Statement\s*$/);
      
      return {
        lineNumber: index + 1,
        line: line,
        isKeyFeatures: !!keyFeaturesMatch,
        isTechStack: !!techStackMatch,
        isProblem: !!problemMatch
      };
    }).filter(match => match.isKeyFeatures || match.isTechStack || match.isProblem);

    return NextResponse.json({
      success: true,
      patterns: results,
      lineMatches,
      contentLength: testContent.length
    });
  } catch (error) {
    console.error('Regex debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 