import { NextRequest, NextResponse } from 'next/server';
import { spotifyAPI } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('spotify_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const playlists = await spotifyAPI.getUserPlaylists(token);
    return NextResponse.json({ playlists });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: 500 });
  }
}

