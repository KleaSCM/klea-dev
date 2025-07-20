import { NextResponse } from 'next/server';

function extractListItems(content: string): string[] {
  const listPattern = /^[-*+]\s+(.+)$/gm;
  const matches = content.match(listPattern);
  
  if (!matches) return [];
  
  return matches.map(match => {
    // Remove the bullet point and clean up
    return match.replace(/^[-*+]\s+/, '').trim();
  }).filter(item => item.length > 0);
}

export async function GET(request: Request) {
  try {
    // Test with the actual content from your template
    const testContent = `## 🚀 Key Features

- **🧠 Neural Trait Mapping**: Transformer-based neural networks using sentence-transformers/all-MiniLM-L6-v2 for natural language to trait modification mapping
- **🔄 Emergent Behavior System**: Desire interaction networks that create new behaviors through synergy and conflict detection
- **🛡️ Identity Preservation**: Multi-tier protection system with differential penalty weights (50x for permanent, 10x for partial, 1x for evolvable traits)
- **⚖️ Mathematical Stability Controls**: Nash equilibrium resolution and Lyapunov stability analysis for guaranteed system stability
- **🎯 Real-time Goal Formation**: Field-like attraction dynamics with potential functions and multi-objective optimization
- **📊 Comprehensive Monitoring**: Shannon entropy analysis, complexity measures, and interaction tracking for system health
- **🧪 Robust Testing Framework**: Complete test suite with 16/16 passing tests and 100% coverage
- **📝 Structured Logging**: Organized logging system with persistent state tracking and execution traces`;

    const extracted = extractListItems(testContent);
    
    return NextResponse.json({
      success: true,
      content: testContent,
      extracted,
      count: extracted.length,
      pattern: /^[-*+]\s+(.+)$/gm.toString()
    });
  } catch (error) {
    console.error('Parser test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 