import { NextResponse } from 'next/server';
import { fetchTemplateContent } from '../../services/githubReadme';
import { parseReadme } from '../../utils/readmeParser';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id') || 'kleascm-ilanya';
    
    console.log(`Debugging template parsing for project: ${projectId}`);
    
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
    
    // Parse the template
    const parsedTemplate = parseReadme(templateContent);
    
    return NextResponse.json({
      success: true,
      projectId,
      contentLength: templateContent.length,
      parsed: {
        title: parsedTemplate.title,
        description: parsedTemplate.description?.substring(0, 100) + '...',
        keyFeatures: parsedTemplate.keyFeatures,
        techStack: parsedTemplate.techStack,
        hasProblem: !!parsedTemplate.problem?.statement,
        hasArchitecture: !!parsedTemplate.architecture?.overview,
        hasPerformance: !!parsedTemplate.performance?.metrics,
        hasCodeSnippets: parsedTemplate.codeSnippets?.length || 0,
        hasCommentary: !!parsedTemplate.commentary?.motivation
      },
      rawContent: templateContent.substring(0, 500) + '...'
    });
  } catch (error) {
    console.error('Template debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 