import { NextResponse } from 'next/server';
import { clearCache } from '../../../services/github';

/**
 * API Route: POST /api/cache/clear
 * 
 * Clears the GitHub cache to force fresh data fetch
 * Useful when you update project configurations
 */
export async function POST() {
  try {
    clearCache();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cache cleared successfully' 
    });
  } catch (error) {
    console.error('API: Error clearing cache:', error);
    
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
} 