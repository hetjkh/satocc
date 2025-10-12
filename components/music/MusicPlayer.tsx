'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Music, 
  Search, 
  List,
  LogIn
} from 'lucide-react';
import type { SpotifyTrack } from '@/lib/spotify';

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  preview_url: string;
  album_art: string;
  duration_ms: number;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MusicPlayer({ isOpen, onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'playlists'>('search');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn && activeTab === 'playlists') {
      fetchUserPlaylists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, activeTab]);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('/api/auth/spotify/status');
      const data = await response.json();
      
      if (data.isLoggedIn) {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('spotify_token='))
          ?.split('=')[1];
        
        if (token) {
          setUserToken(token);
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const fetchUserPlaylists = async () => {
    if (!userToken && !isLoggedIn) return;
    
    setIsLoadingPlaylists(true);
    try {
      const response = await fetch('/api/spotify/playlists');
      const data = await response.json();
      
      if (data.playlists && data.playlists.length > 0) {
        // Fetch tracks for each playlist
        const playlistsWithTracks = await Promise.all(
          data.playlists.slice(0, 10).map(async (playlist: { id: string; name: string }) => {
            try {
              const tracksResponse = await fetch(
                `/api/spotify/playlist-tracks?playlistId=${playlist.id}`
              );
              const tracksData = await tracksResponse.json();
              
              const tracks: Track[] = (tracksData.tracks || []).map((track: SpotifyTrack) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0]?.name || 'Unknown Artist',
                album: track.album.name,
                preview_url: track.preview_url || '',
                album_art: track.album.images[0]?.url || '/signup.jpg',
                duration_ms: track.duration_ms
              }));

              return {
                id: playlist.id,
                name: playlist.name,
                tracks: tracks.slice(0, 10) // Limit to 10 tracks per playlist
              };
            } catch (error) {
              console.error(`Error fetching tracks for playlist ${playlist.id}:`, error);
              return {
                id: playlist.id,
                name: playlist.name,
                tracks: []
              };
            }
          })
        );
        
        setPlaylists(playlistsWithTracks);
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setIsLoadingPlaylists(false);
    }
  };

  useEffect(() => {
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audio]);

  const handlePlay = (track: Track) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(track.preview_url);
    newAudio.volume = isMuted ? 0 : volume;
    setAudio(newAudio);
    setCurrentTrack(track);

    newAudio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
        // Fallback to a demo sound or show error message
      });
  };

  const handlePause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleResume = () => {
    if (audio) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Error resuming audio:', error);
        });
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audio) {
      audio.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audio) {
      audio.volume = isMuted ? volume : 0;
    }
  };

  const searchTracks = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      // Call Spotify API
      const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      const tracks: Track[] = data.tracks.map((track: SpotifyTrack) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0]?.name || 'Unknown Artist',
        album: track.album.name,
        preview_url: track.preview_url || '',
        album_art: track.album.images[0]?.url || '/signup.jpg',
        duration_ms: track.duration_ms
      }));

      setSearchResults(tracks);
    } catch (error) {
      console.error('Error searching tracks:', error);
      // Fallback to mock data
      const mockResults: Track[] = [
        {
          id: `search-${query}-1`,
          name: `${query} Song 1`,
          artist: 'Search Artist 1',
          album: 'Search Album 1',
          preview_url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
          album_art: '/signup.jpg',
          duration_ms: 180000
        }
      ];
      setSearchResults(mockResults);
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSpotifyLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://satocci.vercel.app';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=ff536d252c90438abe66b2655a84bd6d&response_type=code&redirect_uri=${encodeURIComponent(`${baseUrl}/api/auth/spotify/callback`)}&scope=${encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-read-collaborative')}`;
    window.location.href = authUrl;
  };

  const handleSpotifyLogout = async () => {
    try {
      await fetch('/api/auth/spotify/logout', { method: 'POST' });
      setIsLoggedIn(false);
      setUserToken(null);
      setPlaylists([]);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden bg-background border-2 border-foreground">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 Space text-2xl font-semibold">
            <Music className="w-6 h-6" />
            Music Player
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-foreground hover:bg-foreground/10"
          >
            ×
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Track Display */}
          {currentTrack && (
            <div className="bg-foreground/5 rounded-2xl p-4 border border-foreground/20">
              <div className="flex items-center gap-4">
                <img 
                  src={currentTrack.album_art} 
                  alt={currentTrack.album}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="Space text-lg font-semibold">{currentTrack.name}</h3>
                  <p className="Poppins text-sm text-foreground/70">{currentTrack.artist}</p>
                  <p className="Poppins text-xs text-foreground/50">{currentTrack.album}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={isPlaying ? handlePause : handleResume}
                    className="rounded-full"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleMute}
                className="rounded-full"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-20"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'search' ? 'default' : 'outline'}
              onClick={() => setActiveTab('search')}
              className="Poppins rounded-full"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              variant={activeTab === 'playlists' ? 'default' : 'outline'}
              onClick={() => setActiveTab('playlists')}
              className="Poppins rounded-full"
            >
              <List className="w-4 h-4 mr-2" />
              Playlists
            </Button>
          </div>

          {/* Search Tab */}
          {activeTab === 'search' && (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Search for songs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchTracks(e.target.value);
                  }}
                  className="Poppins rounded-full pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50" />
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {searchResults.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-foreground/20 hover:bg-foreground/5 cursor-pointer transition-colors"
                    onClick={() => handlePlay(track)}
                  >
                    <img 
                      src={track.album_art} 
                      alt={track.album}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="Space text-sm font-semibold">{track.name}</h4>
                      <p className="Poppins text-xs text-foreground/70">{track.artist}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatDuration(track.duration_ms)}
                    </Badge>
                    <Button size="sm" className="rounded-full">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Playlists Tab */}
          {activeTab === 'playlists' && (
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {!isLoggedIn ? (
                <div className="text-center py-8">
                  <p className="Poppins text-foreground/70 mb-4">
                    Login to Spotify to access your playlists
                  </p>
                  <Button 
                    onClick={handleSpotifyLogin}
                    className="Poppins rounded-full bg-green-400 text-foreground border-2 border-foreground"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login to Spotify
                  </Button>
                </div>
              ) : isLoadingPlaylists ? (
                <div className="text-center py-8">
                  <p className="Poppins text-foreground/70">Loading your playlists...</p>
                </div>
              ) : playlists.length === 0 ? (
                <div className="text-center py-8">
                  <p className="Poppins text-foreground/70 mb-4">No playlists found</p>
                  <Button 
                    onClick={handleSpotifyLogout}
                    variant="outline"
                    className="Poppins rounded-full"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                <div className="flex justify-end mb-2">
                  <Button 
                    onClick={handleSpotifyLogout}
                    variant="ghost"
                    size="sm"
                    className="Poppins rounded-full text-xs"
                  >
                    Logout
                  </Button>
                </div>
                {playlists.map((playlist) => (
                <div key={playlist.id} className="border border-foreground/20 rounded-xl p-4">
                  <h3 className="Space text-lg font-semibold mb-3">{playlist.name}</h3>
                  <div className="space-y-2">
                    {playlist.tracks.length === 0 ? (
                      <p className="Poppins text-xs text-foreground/50">No tracks available</p>
                    ) : (
                      playlist.tracks.map((track) => (
                        <div
                          key={track.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5 cursor-pointer transition-colors"
                          onClick={() => handlePlay(track)}
                        >
                          <img 
                            src={track.album_art} 
                            alt={track.album}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="Space text-sm font-medium">{track.name}</h4>
                            <p className="Poppins text-xs text-foreground/70">{track.artist}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {formatDuration(track.duration_ms)}
                          </Badge>
                          <Button size="sm" className="rounded-full">
                            <Play className="w-3 h-3" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                ))}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
