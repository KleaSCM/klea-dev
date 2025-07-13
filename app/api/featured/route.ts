import { NextResponse } from 'next/server';
import { getFeaturedProjects } from '../../services/github';

/**
 * API Route: GET /api/featured
 * 
 * Fetches featured projects from pinned repositories
 * Used by the homepage to display featured projects
 */
export async function GET() {
  try {
    console.log('API: Fetching featured projects from pinned repositories...');
    
    const projects = await getFeaturedProjects();
    
    console.log(`API: Successfully fetched ${projects.length} featured projects from GitHub`);
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('API: Error fetching featured projects:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch featured projects from GitHub' },
      { status: 500 }
    );
  }
} 