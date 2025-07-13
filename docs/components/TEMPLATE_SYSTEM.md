# Template System Guide

## 🎯 **Much Cleaner Approach!**

Instead of having everything in one big file, we now use **separate template files** for each project. This is much more intuitive and maintainable!

## 📁 **File Structure**

```
app/data/
├── templates/
│   ├── vulnscan.ts          # vulnSCAN project template
│   ├── example.ts           # Example template to copy
│   └── yourproject.ts       # Your new project template
├── templateLoader.ts         # Loads templates dynamically
└── projectDetails.ts        # Main interface and functions
```

## 🚀 **How to Add a New Project**

### Step 1: Create Template File
Create `app/data/templates/yourproject.ts`:

```typescript
/**
 * Your Project Template
 * 
 * Fill in the details for your project
 */

export const yourProjectTemplate = {
  id: 'kleascm-yourproject',
  
  // Key features - what makes your project special
  keyFeatures: [
    'Feature 1 - What makes this unique',
    'Feature 2 - Another key capability',
    'Feature 3 - One more important feature'
  ],
  
  // Tech stack - be specific!
  techStack: {
    languages: ['Language 1', 'Language 2'],
    frameworks: ['Framework 1', 'Framework 2'],
    databases: ['Database 1', 'Database 2'],
    tools: ['Tool 1', 'Tool 2'],
    platforms: ['Platform 1', 'Platform 2']
  },
  
  // Problem statement
  problem: {
    statement: 'What problem does this solve?',
    challenges: [
      'Challenge 1 - Technical obstacle',
      'Challenge 2 - Another challenge'
    ],
    goals: [
      'Goal 1 - What you wanted to achieve',
      'Goal 2 - Another objective'
    ]
  },
  
  // Architecture
  architecture: {
    overview: 'How is your system structured?',
    components: [
      'Component 1 (Language) - What it does',
      'Component 2 (Language) - What it does'
    ],
    patterns: [
      'Design Pattern 1 - Why you used it',
      'Design Pattern 2 - Another pattern'
    ]
  },
  
  // Performance metrics
  performance: {
    metrics: [
      {
        name: 'Metric Name',
        value: 'Specific Value',
        description: 'What this means'
      }
    ],
    benchmarks: [
      {
        test: 'Test Name',
        result: 'Result Value',
        unit: 'Unit of measurement'
      }
    ]
  },
  
  // Code snippets - show your best work!
  codeSnippets: [
    {
      title: 'Snippet Title',
      description: 'What this code does',
      language: 'language',
      code: `// Your actual code here
function example() {
    // Implementation
}`,
      explanation: 'Why this code is important and how it works'
    }
  ],
  
  // Your personal insights
  commentary: {
    motivation: 'Why you built this project',
    designDecisions: [
      'Decision 1 - Why you made this choice',
      'Decision 2 - Another important decision'
    ],
    lessonsLearned: [
      'Lesson 1 - What you learned',
      'Lesson 2 - Another insight'
    ],
    futurePlans: [
      'Plan 1 - What you want to add next',
      'Plan 2 - Another improvement'
    ]
  }
};
```

### Step 2: Add to Template Loader
In `app/data/templateLoader.ts`, add your template:

```typescript
import { yourProjectTemplate } from './templates/yourproject';

const templateRegistry: Record<string, ProjectDetails> = {
  'kleascm-vulnscan': vulnscanTemplate,
  'kleascm-yourproject': yourProjectTemplate,  // Add this line
};
```

## 📋 **Template Sections**

### **Required Sections**
- `id` - Project identifier (e.g., 'kleascm-yourproject')

### **Optional Sections** (only fill in what you want!)
- `keyFeatures` - What makes your project special
- `techStack` - Technologies used
- `problem` - What problem it solves
- `architecture` - How it's structured
- `performance` - Metrics and benchmarks
- `codeSnippets` - Your best code with explanations
- `commentary` - Your personal insights

## 🎨 **Best Practices**

### **1. Be Specific**
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

### **2. Show Real Code**
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

### **3. Explain the Why**
❌ Bad:
```typescript
explanation: 'This code does SQL injection testing.'
```

✅ Good:
```typescript
explanation: 'This code demonstrates sophisticated SQL injection detection using multiple techniques. It tests for boolean-based, time-based, union-based, and error-based injection patterns. The mathematical approach involves pattern matching with O(n*m) complexity where n is payloads and m is error patterns.'
```

### **4. Use Real Metrics**
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

## 🔧 **How It Works**

1. **Template Files**: Each project gets its own `.ts` file in `templates/`
2. **Template Loader**: `templateLoader.ts` imports and manages all templates
3. **Dynamic Loading**: `getProjectDetails()` automatically loads the right template
4. **Clean Structure**: No more giant files with everything mixed together!

## 💡 **Benefits**

- ✅ **Organized**: Each project has its own file
- ✅ **Maintainable**: Easy to find and edit specific projects
- ✅ **Scalable**: Add new projects without cluttering existing code
- ✅ **Intuitive**: File name matches project name
- ✅ **Type Safe**: Full TypeScript support
- ✅ **Flexible**: Only fill in sections you want

## 🚀 **Quick Start**

1. Copy `app/data/templates/example.ts`
2. Rename to your project (e.g., `myproject.ts`)
3. Fill in the sections you want
4. Add to `templateLoader.ts`
5. Done! ✨

Much cleaner than the old approach! 💕 