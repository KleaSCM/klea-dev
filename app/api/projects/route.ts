import { NextResponse } from 'next/server';
import { getProjectsPageProjects } from '../../services/github';

/**
 * API Route: GET /api/projects
 * 
 * Fetches projects from the specific list for the projects page
 * Uses the curated list of repositories to avoid duplicates
 */
export async function GET() {
  try {
    console.log('API: Fetching projects from specific list...');
    
    const projects = await getProjectsPageProjects();
    
    console.log(`API: Successfully fetched ${projects.length} projects from GitHub`);
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('API: Error fetching projects:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch projects from GitHub' },
      { status: 500 }
    );
  }
} 