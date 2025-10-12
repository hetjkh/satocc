import { NextRequest, NextResponse } from 'next/server';
import { spotifyAPI } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('Spotify auth error:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    const accessToken = await spotifyAPI.exchangeCodeForToken(code);
    
    if (!accessToken) {
      return NextResponse.redirect(new URL('/?error=token_exchange_failed', request.url));
    }

    // Store the token in a cookie or session
    const response = NextResponse.redirect(new URL('/blogs', request.url));
    response.cookies.set('spotify_token', accessToken, {
      httpOnly: false, // Set to false so client-side can read it
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/?error=callback_failed', request.url));
  }
}
