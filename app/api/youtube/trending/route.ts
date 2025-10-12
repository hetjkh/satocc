import { NextResponse } from 'next/server';
import { youtubeMusicAPI } from '@/lib/youtube';

export async function GET() {
  try {
    const tracks = await youtubeMusicAPI.getTrendingMusic(20);
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error fetching trending music:', error);
    return NextResponse.json({ error: 'Failed to fetch trending music' }, { status: 500 });
  }
}

