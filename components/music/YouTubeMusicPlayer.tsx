'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { toast } from 'sonner';
import { useMusic } from '@/contexts/MusicContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Music, 
  Search, 
  TrendingUp,
  SkipForward,
  SkipBack
} from 'lucide-react';
import type { YouTubeTrack } from '@/lib/youtube';

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Declare YouTube types for TypeScript
declare global {
  interface Window {
    YT: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function YouTubeMusicPlayer({ isOpen, onClose }: MusicPlayerProps) {
  const music = useMusic();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<YouTubeTrack[]>([]);
  const [trendingTracks, setTrendingTracks] = useState<YouTubeTrack[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'trending'>('search');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);

  // Load trending music on mount
  useEffect(() => {
    if (activeTab === 'trending' && trendingTracks.length === 0) {
      fetchTrendingMusic();
    }
  }, [activeTab, trendingTracks.length]);

  const fetchTrendingMusic = async () => {
    setIsLoadingTrending(true);
    try {
      const response = await fetch('/api/youtube/trending');
      const data = await response.json();
      setTrendingTracks(data.tracks || []);
    } catch (error) {
      console.error('Error fetching trending music:', error);
      toast.error('Failed to load trending music');
    } finally {
      setIsLoadingTrending(false);
    }
  };

  // Debounced search to prevent too many API calls
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const searchTracks = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debounced search
    const timeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSearchResults(data.tracks || []);
      } catch (error) {
        console.error('Error searching tracks:', error);
        toast.error('Failed to search music');
      } finally {
        setIsSearching(false);
      }
    }, 500); // Wait 500ms after user stops typing

    setSearchTimeout(timeout);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[500px] overflow-y-auto bg-background border-l-2 border-foreground">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 Space text-2xl font-bold">
            <div className="p-1.5 bg-green-400 rounded-full">
              <Music className="w-5 h-5 text-foreground" />
            </div>
            Music Player
            {!music.isPlayerReady && (
              <span className="text-xs text-foreground/50 font-normal Poppins bg-foreground/10 px-2 py-1 rounded-full">
                Loading...
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 px-4">
          {/* Current Track Display */}
          {music.currentTrack && (
            <div className="bg-gradient-to-r from-green-400/10 to-purple-400/10 rounded-2xl p-4 border border-foreground/20 shadow-md">
              <div className="flex items-center gap-3">
                <img 
                  src={music.currentTrack.thumbnail} 
                  alt={music.currentTrack.title}
                  className="w-14 h-14 rounded-xl object-cover shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="Space text-lg font-bold truncate">{music.currentTrack.title}</h3>
                  <p className="Poppins text-sm text-foreground/70 truncate">{music.currentTrack.artist}</p>
                  <p className="Poppins text-xs text-foreground/50">{music.currentTrack.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={music.previous}
                    disabled={music.currentIndex === 0}
                    className="rounded-full w-10 h-10 hover:bg-foreground/10"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={music.isPlaying ? music.pause : music.resume}
                    className="rounded-full w-12 h-12 bg-green-400 hover:bg-green-500 text-foreground"
                  >
                    {music.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={music.next}
                    disabled={music.currentIndex === music.queue.length - 1}
                    className="rounded-full w-10 h-10 hover:bg-foreground/10"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Volume Controls */}
          <div className="bg-foreground/5 rounded-xl p-3 border border-foreground/20">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={music.toggleMute}
                className="rounded-full w-10 h-10 hover:bg-foreground/10"
              >
                {music.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={music.volume}
                onChange={(e) => music.setVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-foreground/20 rounded-lg appearance-none cursor-pointer slider"
              />
              </div>
              <span className="text-xs font-medium text-foreground/70 min-w-[35px]">{music.volume}%</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-foreground/5 rounded-xl border border-foreground/20">
            <Button
              variant={activeTab === 'search' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('search')}
              className={`Poppins rounded-lg flex-1 transition-all duration-200 text-sm ${
                activeTab === 'search' 
                  ? 'bg-green-400 text-foreground shadow-md' 
                  : 'hover:bg-foreground/10'
              }`}
            >
              <Search className="w-4 h-4 mr-1" />
              Search
            </Button>
            <Button
              variant={activeTab === 'trending' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('trending')}
              className={`Poppins rounded-lg flex-1 transition-all duration-200 text-sm ${
                activeTab === 'trending' 
                  ? 'bg-green-400 text-foreground shadow-md' 
                  : 'hover:bg-foreground/10'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Trending
            </Button>
          </div>

          {/* Search Tab */}
          {activeTab === 'search' && (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Search for any song, artist, or album..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchTracks(e.target.value);
                  }}
                  className="Poppins rounded-xl pr-10 py-3 text-base border border-foreground/20 focus:border-green-400 transition-all duration-200"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50" />
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {isSearching && (
                  <div className="text-center text-foreground/50 py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-2"></div>
                    <p className="Poppins text-sm">Searching...</p>
                  </div>
                )}
                {!isSearching && searchResults.length === 0 && searchQuery && (
                  <div className="text-center text-foreground/50 py-8">
                    <p className="Poppins text-sm">No results found. Try a different search.</p>
                  </div>
                )}
                {!isSearching && searchResults.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-foreground/20 hover:border-green-400/50 hover:bg-gradient-to-r hover:from-green-400/5 hover:to-purple-400/5 cursor-pointer transition-all duration-200"
                    onClick={() => music.play(track, searchResults)}
                  >
                    <img 
                      src={track.thumbnail} 
                      alt={track.title}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="Space text-sm font-bold truncate">{track.title}</h4>
                      <p className="Poppins text-xs text-foreground/70 truncate">{track.artist}</p>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-full border-foreground/30">
                      {track.duration}
                    </Badge>
                    <Button size="sm" className="rounded-full w-10 h-10 bg-green-400 hover:bg-green-500 text-foreground shadow-sm">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Tab */}
          {activeTab === 'trending' && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {isLoadingTrending ? (
                <div className="text-center text-foreground/50 py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-2"></div>
                  <p className="Poppins text-sm">Loading trending music...</p>
                </div>
              ) : trendingTracks.length === 0 ? (
                <div className="text-center text-foreground/50 py-8">
                  <p className="Poppins text-sm">No trending music found.</p>
                </div>
              ) : (
                trendingTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-foreground/20 hover:border-green-400/50 hover:bg-gradient-to-r hover:from-green-400/5 hover:to-purple-400/5 cursor-pointer transition-all duration-200"
                    onClick={() => music.play(track, trendingTracks)}
                  >
                    <img 
                      src={track.thumbnail} 
                      alt={track.title}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="Space text-sm font-bold truncate">{track.title}</h4>
                      <p className="Poppins text-xs text-foreground/70 truncate">{track.artist}</p>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-full border-foreground/30">
                      {track.duration}
                    </Badge>
                    <Button size="sm" className="rounded-full w-10 h-10 bg-green-400 hover:bg-green-500 text-foreground shadow-sm">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
                  </div>
      </SheetContent>
    </Sheet>
  );
}

