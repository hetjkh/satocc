import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('spotify_token')?.value;

  return NextResponse.json({ 
    isLoggedIn: !!token,
    hasToken: !!token
  });
}

