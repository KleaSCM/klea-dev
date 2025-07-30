import { NextResponse } from 'next/server';
import { clearCache } from '../../../services/github';

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