import { NextResponse } from 'next/server';
import { getCachedProjectDetails } from '../../services/githubReadme';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id') || 'kleascm-ilanya';
    
    console.log(`Testing template system for project: ${projectId}`);
    
    const details = await getCachedProjectDetails(projectId);
    
    return NextResponse.json({
      success: true,
      projectId,
      hasDetails: details !== null,
      details: details ? {
        id: details.id,
        title: details.title,
        keyFeatures: details.keyFeatures?.length || 0,
        techStack: details.techStack ? Object.keys(details.techStack).length : 0
      } : null
    });
  } catch (error) {
    console.error('Template test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 