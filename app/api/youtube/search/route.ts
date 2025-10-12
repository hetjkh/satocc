import { NextRequest, NextResponse } from 'next/server';
import { youtubeMusicAPI } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const tracks = await youtubeMusicAPI.searchMusic(query, 20);
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error searching YouTube music:', error);
    return NextResponse.json({ error: 'Failed to search music' }, { status: 500 });
  }
}

