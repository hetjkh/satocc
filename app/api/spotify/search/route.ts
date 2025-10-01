import { NextRequest, NextResponse } from 'next/server';
import { spotifyAPI } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const tracks = await spotifyAPI.searchTracks(query);
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to search tracks' }, { status: 500 });
  }
}
