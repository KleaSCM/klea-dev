import { NextResponse } from 'next/server';
import { getProjectsPageProjects, getAllProjectsFromPublicRepos } from '../../services/github';

/**
 * API Route: GET /api/projects
 * 
 * Fetches projects from the specific list for the projects page
 * Uses the curated list of repositories to avoid duplicates
 * 
 * Query parameters:
 * - all=true: Fetch all public repositories instead of just the configured ones
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fetchAll = searchParams.get('all') === 'true';
    
    if (fetchAll) {
      console.log('API: Fetching ALL public projects from GitHub...');
      const projects = await getAllProjectsFromPublicRepos();
      console.log(`API: Successfully fetched ${projects.length} projects from all public repositories`);
      return NextResponse.json(projects);
    } else {
      console.log('API: Fetching projects from specific list...');
      const projects = await getProjectsPageProjects();
      console.log(`API: Successfully fetched ${projects.length} projects from GitHub`);
      return NextResponse.json(projects);
    }
  } catch (error) {
    console.error('API: Error fetching projects:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch projects from GitHub' },
      { status: 500 }
    );
  }
} 