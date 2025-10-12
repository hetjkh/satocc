// Spotify Web API integration
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || 'ff536d252c90438abe66b2655a84bd6d';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'c8ceb04d686a48aa8dc958a5ccb1ddd4';

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  preview_url: string | null;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  tracks: {
    items: Array<{
      track: SpotifyTrack;
    }>;
  };
  images: Array<{ url: string }>;
}

class SpotifyAPI {
  private accessToken: string | null = null;

  async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    this.accessToken = data.access_token;
    
    if (!this.accessToken) {
      throw new Error('Failed to obtain Spotify access token');
    }
    
    return this.accessToken;
  }

  async searchTracks(query: string, limit: number = 20): Promise<SpotifyTrack[]> {
    try {
      const token = await this.getAccessToken();
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      return data.tracks?.items || [];
    } catch (error) {
      console.error('Error searching tracks:', error);
      return [];
    }
  }

  async getUserPlaylists(userToken: string): Promise<SpotifyPlaylist[]> {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  }

  async getPlaylistTracks(playlistId: string, userToken: string): Promise<SpotifyTrack[]> {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        }
      );

      const data = await response.json();
      return data.items?.map((item: { track: SpotifyTrack }) => item.track).filter((track: SpotifyTrack | null) => track) || [];
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
      return [];
    }
  }

  // Generate Spotify OAuth URL
  generateAuthURL(): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://satocci.vercel.app';
    const redirectUri = encodeURIComponent(`${baseUrl}/api/auth/spotify/callback`);
    const scopes = encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-read-collaborative');
    
    return `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code: string): Promise<string | null> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://satocci.vercel.app';
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: `${baseUrl}/api/auth/spotify/callback`,
        }),
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      return null;
    }
  }
}

export const spotifyAPI = new SpotifyAPI();
