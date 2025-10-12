import { NextRequest, NextResponse } from 'next/server';
import { spotifyAPI } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get('playlistId');
  const token = request.cookies.get('spotify_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!playlistId) {
    return NextResponse.json({ error: 'Playlist ID required' }, { status: 400 });
  }

  try {
    const tracks = await spotifyAPI.getPlaylistTracks(playlistId, token);
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch playlist tracks' }, { status: 500 });
  }
}

