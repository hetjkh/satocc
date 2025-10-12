import { NextRequest, NextResponse } from 'next/server';
import { youtubeMusicAPI } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID parameter is required' }, { status: 400 });
  }

  try {
    const streamUrl = await youtubeMusicAPI.getStreamUrl(videoId);
    
    if (!streamUrl) {
      return NextResponse.json({ error: 'Stream URL not available for this video' }, { status: 404 });
    }

    return NextResponse.json({ 
      streamUrl,
      videoId,
      message: 'Stream URL retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting stream URL:', error);
    return NextResponse.json({ error: 'Failed to get stream URL' }, { status: 500 });
  }
}
