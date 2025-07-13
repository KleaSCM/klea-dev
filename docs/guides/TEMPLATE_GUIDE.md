# Project Template Guide

## How the Template Works

The project template system allows you to easily add detailed project information to your portfolio. It uses a hybrid approach that combines GitHub data with custom sections you can fill in.

## Template Structure

### 1. Basic Template (`PROJECT_TEMPLATE`)

```typescript
export const PROJECT_TEMPLATE = {
  id: 'kleascm-your-project-name',
  
  // Easy sections to fill in - only add what you want!
  keyFeatures: ['Feature 1', 'Feature 2', 'Feature 3'],
  techStack: { languages: [], frameworks: [], databases: [], tools: [], platforms: [] },
  problem: { statement: '', challenges: [], goals: [] },
  architecture: { overview: '', components: [], patterns: [] },
  performance: { metrics: [], benchmarks: [] },
  codeSnippets: [],
  commentary: { motivation: '', designDecisions: [], lessonsLearned: [], futurePlans: [] }
};
```

### 2. Comprehensive Example (`VULNSCAN_EXAMPLE`)

This shows how to properly fill out the template with real project details from the vulnSCAN security scanner.

## How to Use the Template

### Step 1: Copy the Template
```typescript
// Copy this structure
export const YOUR_PROJECT = {
  id: 'kleascm-your-project-name',
  // Fill in sections below...
};
```

### Step 2: Fill in Sections (Only What You Want!)

#### Key Features
```typescript
keyFeatures: [
  'Real-time vulnerability scanning',
  'Multi-vector attack detection (SQLi, XSS, Port scanning)',
  'SSL/TLS security assessment',
  'Automated report generation'
]
```

#### Tech Stack
```typescript
techStack: {
  languages: ['Go', 'HTML/CSS', 'JavaScript'],
  frameworks: ['Standard HTTP library', 'TLS/SSL libraries'],
  databases: ['File-based JSON storage'],
  tools: ['Go modules', 'Net package', 'Crypto/TLS'],
  platforms: ['Cross-platform (Linux, Windows, macOS)']
}
```

#### Problem Statement
```typescript
problem: {
  statement: 'Web applications face constant security threats from SQL injection, XSS attacks, and misconfigured services...',
  challenges: [
    'Detecting sophisticated SQL injection techniques beyond basic patterns',
    'Identifying XSS vulnerabilities across different injection contexts'
  ],
  goals: [
    'Create an automated security scanner for web applications',
    'Implement multiple vulnerability detection techniques'
  ]
}
```

#### Architecture
```typescript
architecture: {
  overview: 'vulnSCAN uses a modular architecture with separate scanning modules...',
  components: [
    'Scanner Module (Go) - Core scanning logic and vulnerability detection',
    'Port Scanner (Go) - TCP port scanning with timeout handling'
  ],
  patterns: [
    'Modular Design - Separate modules for different scan types',
    'Strategy Pattern - Different scanning strategies for various vulnerabilities'
  ]
}
```

#### Performance Metrics
```typescript
performance: {
  metrics: [
    {
      name: 'Scan Speed',
      value: '50-100 ports/second',
      description: 'Port scanning performance on typical networks'
    }
  ],
  benchmarks: [
    {
      test: 'Port Scan (1000 ports)',
      result: '15 seconds',
      unit: 'Time'
    }
  ]
}
```

#### Code Snippets
```typescript
codeSnippets: [
  {
    title: 'Advanced SQL Injection Detection',
    description: 'Multi-technique SQL injection testing with error pattern analysis',
    language: 'go',
    code: `func TestSQLiVulnerability(url string) bool {
    // Your actual code here
}`,
    explanation: 'This code demonstrates sophisticated SQL injection detection...'
  }
]
```

#### Commentary
```typescript
commentary: {
  motivation: 'I built vulnSCAN to address the growing need for automated security testing tools...',
  designDecisions: [
    'Chose Go for its excellent networking capabilities and cross-platform support',
    'Implemented modular architecture to allow easy addition of new scan types'
  ],
  lessonsLearned: [
    'Network programming requires careful timeout and error handling',
    'Security testing tools need to be both thorough and fast'
  ],
  futurePlans: [
    'Add support for more vulnerability types (CSRF, SSRF, etc.)',
    'Implement concurrent scanning for better performance'
  ]
}
```

### Step 3: Add to Project Details

```typescript
// In projectDetails.ts
export const PROJECT_DETAILS: Record<string, ProjectDetails> = {
  'kleascm-your-project-name': {
    id: 'kleascm-your-project-name',
    keyFeatures: [...],
    techStack: {...},
    // ... rest of your sections
  }
};
```

## Best Practices

### 1. Be Specific
❌ Bad:
```typescript
techStack: {
  languages: ['Go'],
  frameworks: ['Some framework']
}
```

✅ Good:
```typescript
techStack: {
  languages: ['Go', 'HTML/CSS', 'JavaScript'],
  frameworks: ['Standard HTTP library', 'TLS/SSL libraries'],
  tools: ['Go modules', 'Net package', 'Crypto/TLS']
}
```

### 2. Show Real Code
❌ Bad:
```typescript
code: `function example() {
    // Placeholder code
}`
```

✅ Good:
```typescript
code: `func TestSQLiVulnerability(url string) bool {
    payloads := []string{
        "?id=1' OR '1'='1",           // Boolean-based injection
        "?id=1;--",                   // Comment-based injection
    }
    // Real implementation...
}`
```

### 3. Explain the Why
❌ Bad:
```typescript
explanation: 'This code does SQL injection testing.'
```

✅ Good:
```typescript
explanation: 'This code demonstrates sophisticated SQL injection detection using multiple techniques. It tests for boolean-based, time-based, union-based, and error-based injection patterns. The mathematical approach involves pattern matching with O(n*m) complexity where n is payloads and m is error patterns.'
```

### 4. Use Real Metrics
❌ Bad:
```typescript
metrics: [
  { name: 'Speed', value: 'Fast', description: 'It runs quickly' }
]
```

✅ Good:
```typescript
metrics: [
  {
    name: 'Scan Speed',
    value: '50-100 ports/second',
    description: 'Port scanning performance on typical networks'
  }
]
```

## vulnSCAN Example Breakdown

The vulnSCAN example demonstrates:

1. **Real Project Analysis**: Based on actual Go code from the project
2. **Comprehensive Coverage**: All template sections filled with meaningful content
3. **Technical Depth**: Real code snippets with explanations
4. **Performance Focus**: Actual metrics and benchmarks
5. **Personal Touch**: Developer commentary and insights

### Key Sections Explained

#### Problem Statement
- **What**: Clear description of the security gap
- **Challenges**: Technical and practical obstacles
- **Goals**: Specific objectives achieved

#### Architecture
- **Overview**: High-level system description
- **Components**: Specific modules with languages
- **Patterns**: Design patterns used

#### Performance
- **Metrics**: Quantifiable performance indicators
- **Benchmarks**: Specific test results with units

#### Code Snippets
- **Real Code**: Actual implementation
- **Explanations**: Technical reasoning and complexity analysis
- **Context**: Why this code is important

#### Commentary
- **Motivation**: Personal reasons for building
- **Design Decisions**: Technical choices and rationale
- **Lessons Learned**: Real insights from development
- **Future Plans**: Roadmap and improvements

## Template Benefits

1. **Flexible**: Only fill in sections you want
2. **Comprehensive**: Covers all aspects of a project
3. **Professional**: Structured and detailed
4. **Personal**: Includes developer insights
5. **Technical**: Shows real code and metrics

## Quick Start

1. Copy `PROJECT_TEMPLATE` structure
2. Replace `'kleascm-your-project-name'` with your project ID
3. Fill in sections that matter for your project
4. Add real code snippets with explanations
5. Include personal commentary and insights
6. Add to `PROJECT_DETAILS` in `projectDetails.ts`

The template system makes it easy to create detailed, professional project pages that showcase both technical skills and personal insights! 💕 