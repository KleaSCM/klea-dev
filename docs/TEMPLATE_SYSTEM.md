# Universal Template System ✨

## Overview

This is a **universal template system** that automatically populates your project pages from GitHub repositories! Just drop a `TEMPLATE.md` file into any repository, and your portfolio will automatically extract and display all the information beautifully! 💖

## How It Works

### Theory
- **Markdown Parsing**: Uses regex patterns to extract structured sections from markdown files
- **GitHub API Integration**: Fetches template files directly from repositories
- **Caching System**: Intelligent caching to avoid repeated API calls
- **Fallback Strategy**: Graceful degradation when templates aren't available

### Code Architecture
```
GitHub Repository → TEMPLATE.md → Parser → Project Details → Portfolio Page
```

### Results
- **Dynamic Content**: Project pages automatically update when you update your templates
- **Consistent Format**: All projects follow the same beautiful structure
- **Zero Maintenance**: No need to manually update portfolio for each project

### Conclusion
This system eliminates the need to manually create project pages - just write one template and use it everywhere! 🚀

## Quick Start

### 1. Copy the Template
Copy the `TEMPLATE.md` file from this repository into any project you want to showcase.

### 2. Fill It Out
Replace the placeholder content with your actual project information:

```markdown
# Your Project Name

Brief description of what your project does.

## 🚀 Key Features
- Feature 1: What makes your project special
- Feature 2: Another key capability
- Feature 3: One more important feature

## 🛠️ Technology Stack
### Languages
- JavaScript
- TypeScript
- Python

### Frameworks & Libraries
- React
- Next.js
- Tailwind CSS
```

### 3. Commit and Push
Push your `TEMPLATE.md` to your GitHub repository.

### 4. Magic Happens! ✨
Your portfolio will automatically detect the template and populate the project page with all the information!

## Template Sections

The template supports these sections (all optional):

### 🚀 Key Features
List the main features that make your project special.

### 🛠️ Technology Stack
Break down your tech stack into categories:
- **Languages**: Programming languages used
- **Frameworks & Libraries**: Frameworks and libraries
- **Databases & Storage**: Database technologies
- **Tools & Platforms**: Development tools and platforms

### 🎯 Problem Statement
Explain what problem your project solves:
- **Main Statement**: Brief description of the problem
- **Challenges Faced**: Technical or practical obstacles
- **Project Goals**: What you wanted to achieve

### 🏗️ Architecture
Describe your system design:
- **System Overview**: High-level architecture description
- **Core Components**: Main system components
- **Design Patterns**: Patterns and principles used

### 📊 Performance Metrics
Show your project's performance:
- **Key Metrics**: Important performance numbers
- **Benchmarks**: Test results and benchmarks

### 💻 Code Snippets
Showcase your best code:
```markdown
### Core Algorithm
```javascript
function amazingAlgorithm() {
    // Your actual code here
    return result;
}
```
**Explanation**: Why this code is important and how it works.
```

### 💭 Commentary
Share your insights:
- **Motivation**: Why you built this project
- **Design Decisions**: Important choices you made
- **Lessons Learned**: What you learned
- **Future Plans**: What you want to add next

## Project ID Format

Your project ID should follow this format: `owner-repo`

Examples:
- `kleascm-ilanya` → fetches from `kleascm/ilanya`
- `kleascm-vulnscan` → fetches from `kleascm/vulnscan`

## Advanced Features

### Caching
The system caches template data for 30 minutes to avoid repeated API calls.

### Fallback Strategy
1. **Static Template**: If a static template exists in the codebase, use that
2. **GitHub Template**: If `TEMPLATE.md` exists in the repo, parse and use that
3. **Basic GitHub Data**: Fall back to basic repository information

### Error Handling
- Graceful handling of missing templates
- API rate limit management
- Network error recovery

## API Endpoints

### Clear Cache
```
POST /api/cache/clear
```
Clears the template cache to force fresh data.

### Cache Stats
```
GET /api/cache/stats
```
Returns cache statistics and entries.

## Environment Variables

### GITHUB_TOKEN (Optional)
Set this for higher GitHub API rate limits:
```bash
GITHUB_TOKEN=your_github_token_here
```

## Troubleshooting

### Template Not Found
- Make sure `TEMPLATE.md` is in the root of your repository
- Check that the project ID format is correct (`owner-repo`)
- Verify the repository is public or you have access

### Parsing Errors
- Ensure your template follows the exact format
- Check that section headers match exactly (including emojis)
- Verify markdown syntax is correct

### Cache Issues
- Clear the cache using the API endpoint
- Check cache statistics to see what's cached
- Restart the server if needed

## Examples

### Minimal Template
```markdown
# My Project

A simple project that does amazing things.

## 🚀 Key Features
- Does something cool
- Easy to use
- Fast performance

## 🛠️ Technology Stack
### Languages
- JavaScript

### Frameworks & Libraries
- React
```

### Full Template
See `TEMPLATE.md` for a complete example with all sections.

## Contributing

Want to improve the template system? Here's how:

1. **Add New Sections**: Extend the parser to support new markdown sections
2. **Improve Parsing**: Enhance the regex patterns for better extraction
3. **Add Features**: New functionality like template validation or preview

## Support

Having issues? Check:
1. Template format matches exactly
2. Repository is accessible
3. Project ID is correct
4. Cache is cleared if needed

This system makes your portfolio maintenance-free and always up-to-date! 💕✨ 