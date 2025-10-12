// YouTube Music API integration using youtubei.js
// This bypasses official API limits and provides unlimited streaming

import { Innertube } from 'youtubei.js';

export interface YouTubeTrack {
  id: string;
  videoId: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  channelTitle: string;
  streamUrl?: string; // Direct streaming URL for unlimited playback
}

export interface YouTubeSearchResult {
  tracks: YouTubeTrack[];
}

class YouTubeMusicAPI {
  private yt: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  constructor() {
    this.initializeYouTube();
  }

  /**
   * Initialize YouTube instance
   */
  private async initializeYouTube() {
    try {
      this.yt = await Innertube.create();
    } catch (error) {
      console.error('Error initializing YouTube:', error);
    }
  }

  /**
   * Ensure YouTube is initialized
   */
  private async ensureInitialized() {
    if (!this.yt) {
      await this.initializeYouTube();
    }
  }

  /**
   * Search for music on YouTube using youtubei.js (OPTIMIZED FOR SPEED)
   * @param query - Search query (song name, artist, etc.)
   * @param maxResults - Maximum number of results to return
   */
  async searchMusic(query: string, maxResults: number = 20): Promise<YouTubeTrack[]> {
    try {
      await this.ensureInitialized();
      
      // Search for music videos
      const search = await this.yt.search(query, { 
        type: 'video',
        sort_by: 'relevance'
      });

      if (!search.results || search.results.length === 0) {
        return [];
      }

      const tracks: YouTubeTrack[] = [];
      const results = search.results.slice(0, maxResults);

      // OPTIMIZATION: Process results without individual getInfo() calls for speed
      for (const result of results) {
        try {
          // Extract basic info directly from search results (much faster)
          const titleParts = result.title?.text?.split('-') || [result.title?.text || 'Unknown'];
          const artist = titleParts.length > 1 ? titleParts[0].trim() : result.author?.name || 'Unknown Artist';
          const title = titleParts.length > 1 ? titleParts.slice(1).join('-').trim() : result.title?.text || 'Unknown Title';

          tracks.push({
            id: result.id,
            videoId: result.id,
            title: title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim(),
            artist: artist,
            thumbnail: result.thumbnails?.[0]?.url || result.thumbnail?.url || '',
            duration: result.duration?.text || 'Unknown', // Use duration from search result
            channelTitle: result.author?.name || 'Unknown Channel',
            streamUrl: '' // Will be fetched when user clicks play
          });
        } catch (error) {
          console.error(`Error processing video ${result.id}:`, error);
          // Continue with other videos even if one fails
        }
      }

      return tracks;
    } catch (error) {
      console.error('Error searching YouTube music:', error);
      return [];
    }
  }

  /**
   * Get trending music using youtubei.js (OPTIMIZED FOR SPEED)
   */
  async getTrendingMusic(maxResults: number = 20): Promise<YouTubeTrack[]> {
    try {
      await this.ensureInitialized();
      
      // Search for trending music
      const search = await this.yt.search('music trending', { 
        type: 'video',
        sort_by: 'relevance'
      });

      if (!search.results || search.results.length === 0) {
        return [];
      }

      const tracks: YouTubeTrack[] = [];
      const results = search.results.slice(0, maxResults);

      // OPTIMIZATION: Process results without individual getInfo() calls for speed
      for (const result of results) {
        try {
          const titleParts = result.title?.text?.split('-') || [result.title?.text || 'Unknown'];
          const artist = titleParts.length > 1 ? titleParts[0].trim() : result.author?.name || 'Unknown Artist';
          const title = titleParts.length > 1 ? titleParts.slice(1).join('-').trim() : result.title?.text || 'Unknown Title';

          tracks.push({
            id: result.id,
            videoId: result.id,
            title: title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim(),
            artist: artist,
            thumbnail: result.thumbnails?.[0]?.url || result.thumbnail?.url || '',
            duration: result.duration?.text || 'Unknown', // Use duration from search result
            channelTitle: result.author?.name || 'Unknown Channel',
            streamUrl: '' // Will be fetched when user clicks play
          });
        } catch (error) {
          console.error(`Error processing trending video ${result.id}:`, error);
        }
      }

      return tracks;
    } catch (error) {
      console.error('Error fetching trending music:', error);
      return [];
    }
  }

  /**
   * Get direct streaming URL for a video (for unlimited playback)
   */
  async getStreamUrl(videoId: string): Promise<string | null> {
    try {
      await this.ensureInitialized();
      
      const info = await this.yt.getInfo(videoId);
      
      if (info.streaming_data?.formats) {
        // Get the best audio format
        const audioFormats = info.streaming_data.formats.filter((format: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
          format.mime_type?.includes('audio') || format.audio_quality || format.has_audio
        );
        
        if (audioFormats.length > 0) {
          return audioFormats[0].url || audioFormats[0].signature_cipher?.url || null;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error getting stream URL:', error);
      return null;
    }
  }

  /**
   * Format duration from seconds to readable format (e.g., "3:45")
   */
  private formatDuration(seconds: number): string {
    if (!seconds || seconds === 0) return 'Unknown';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

export const youtubeMusicAPI = new YouTubeMusicAPI();

