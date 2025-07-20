import { NextResponse } from 'next/server';
import { fetchTemplateContent } from '../../services/githubReadme';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id') || 'kleascm-ilanya';
    
    console.log(`Debugging sections for project: ${projectId}`);
    
    // Parse project ID
    const [owner, repo] = projectId.split('-', 2);
    
    if (!owner || !repo) {
      return NextResponse.json({
        success: false,
        error: `Invalid project ID format: ${projectId}`
      });
    }
    
    // Fetch template content
    const templateContent = await fetchTemplateContent(owner, repo);
    
    // Find all section headers
    const sectionHeaders = templateContent.match(/^##\s+(.+)$/gm) || [];
    
    // Check for specific sections we're looking for
    const sections = {
      keyFeatures: templateContent.includes('## 🚀 Key Features'),
      techStack: templateContent.includes('## 🛠️ Technology Stack'),
      problemStatement: templateContent.includes('## 🎯 Problem Statement'),
      architecture: templateContent.includes('## 🏗️ Architecture'),
      performanceMetrics: templateContent.includes('## 📊 Performance Metrics'),
      codeSnippets: templateContent.includes('## 💻 Code Snippets'),
      commentary: templateContent.includes('## 💭 Commentary')
    };
    
    // Get the first 1000 characters around each section
    const getSectionPreview = (sectionName: string) => {
      const index = templateContent.indexOf(sectionName);
      if (index === -1) return null;
      return templateContent.substring(index, index + 1000);
    };
    
    return NextResponse.json({
      success: true,
      projectId,
      contentLength: templateContent.length,
      allHeaders: sectionHeaders.map(h => h.trim()),
      sections,
      keyFeaturesPreview: getSectionPreview('## 🚀 Key Features'),
      techStackPreview: getSectionPreview('## 🛠️ Technology Stack'),
      problemPreview: getSectionPreview('## 🎯 Problem Statement')
    });
  } catch (error) {
    console.error('Section debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 