'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<{
    totalCalls: number;
    successfulCalls: number;
    failedCalls: number;
    blockedCalls: number;
    averageResponseTime: number;
    startTime: number;
    errors: string[];
    responseTimes: number[];
    currentCall?: number;
    totalTime?: number;
    successRate?: number;
    blockRate?: number;
    callsPerSecond?: number;
  } | null>(null);

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

  // Test function to make 500 API calls
  const runAPILimitationTest = async () => {
    setIsTesting(true);
    setTestResults(null);
    
    const testQueries = [
      'music', 'song', 'audio', 'track', 'melody', 'rhythm', 'beat', 'tune', 'sound', 'vocal',
      'instrumental', 'classical', 'rock', 'pop', 'jazz', 'blues', 'country', 'hip hop', 'rap', 'electronic',
      'dance', 'reggae', 'folk', 'soul', 'funk', 'disco', 'punk', 'metal', 'indie', 'alternative',
      'acoustic', 'piano', 'guitar', 'violin', 'drums', 'bass', 'saxophone', 'trumpet', 'flute', 'cello',
      'orchestra', 'choir', 'singer', 'band', 'group', 'artist', 'musician', 'composer', 'producer', 'dj'
    ];

    const results = {
      totalCalls: 0,
      successfulCalls: 0,
      failedCalls: 0,
      blockedCalls: 0,
      averageResponseTime: 0,
      startTime: Date.now(),
      errors: [] as string[],
      responseTimes: [] as number[]
    };

    console.log('🚀 Starting API limitation test with 500 calls...');
    
    for (let i = 0; i < 500; i++) {
      try {
        const query = testQueries[i % testQueries.length] + ' ' + (i + 1);
        const startTime = Date.now();
        
        const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        results.totalCalls++;
        results.responseTimes.push(responseTime);
        
        if (response.ok) {
          results.successfulCalls++;
          console.log(`✅ Call ${i + 1}/500 successful (${responseTime}ms)`);
        } else {
          results.failedCalls++;
          if (response.status === 429 || response.status === 403) {
            results.blockedCalls++;
            console.log(`🚫 Call ${i + 1}/500 blocked (${response.status})`);
          } else {
            console.log(`❌ Call ${i + 1}/500 failed (${response.status})`);
          }
          results.errors.push(`Call ${i + 1}: ${response.status} ${response.statusText}`);
        }
        
        // Add small delay to avoid overwhelming
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Update results every 50 calls
        if ((i + 1) % 50 === 0) {
          setTestResults({
            ...results,
            currentCall: i + 1,
            averageResponseTime: results.responseTimes.reduce((a, b) => a + b, 0) / results.responseTimes.length
          });
        }
        
      } catch (error) {
        results.failedCalls++;
        results.errors.push(`Call ${i + 1}: ${error}`);
        console.error(`❌ Call ${i + 1}/500 error:`, error);
      }
    }
    
    const endTime = Date.now();
    const totalTime = endTime - results.startTime;
    results.averageResponseTime = results.responseTimes.reduce((a, b) => a + b, 0) / results.responseTimes.length;
    
    const finalResults = {
      ...results,
      totalTime,
      successRate: (results.successfulCalls / results.totalCalls) * 100,
      blockRate: (results.blockedCalls / results.totalCalls) * 100,
      callsPerSecond: results.totalCalls / (totalTime / 1000)
    };
    
    setTestResults(finalResults);
    setIsTesting(false);
    
    console.log('📊 Test Results:', finalResults);
    toast.success('API Test Complete!', {
      description: `${results.successfulCalls}/${results.totalCalls} calls successful`,
      duration: 5000
    });
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden bg-background border-2 border-foreground">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 Space text-2xl font-semibold">
            <Music className="w-6 h-6" />
            Music Player
            {!music.isPlayerReady && (
              <span className="text-xs text-foreground/50 font-normal Poppins">
                (Loading player...)
              </span>
            )}
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
          {music.currentTrack && (
            <div className="bg-foreground/5 rounded-2xl p-4 border border-foreground/20">
              <div className="flex items-center gap-4">
                <img 
                  src={music.currentTrack.thumbnail} 
                  alt={music.currentTrack.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="Space text-lg font-semibold">{music.currentTrack.title}</h3>
                  <p className="Poppins text-sm text-foreground/70">{music.currentTrack.artist}</p>
                  <p className="Poppins text-xs text-foreground/50">{music.currentTrack.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={music.previous}
                    disabled={music.currentIndex === 0}
                    className="rounded-full"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={music.isPlaying ? music.pause : music.resume}
                    className="rounded-full"
                  >
                    {music.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={music.next}
                    disabled={music.currentIndex === music.queue.length - 1}
                    className="rounded-full"
                  >
                    <SkipForward className="w-4 h-4" />
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
                onClick={music.toggleMute}
                className="rounded-full"
              >
                {music.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={music.volume}
                onChange={(e) => music.setVolume(parseInt(e.target.value))}
                className="w-24"
              />
              <span className="text-xs text-foreground/70">{music.volume}%</span>
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
              variant={activeTab === 'trending' ? 'default' : 'outline'}
              onClick={() => setActiveTab('trending')}
              className="Poppins rounded-full"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
            <Button
              onClick={runAPILimitationTest}
              disabled={isTesting}
              className="Poppins rounded-full bg-red-500 hover:bg-red-600 text-white"
            >
              {isTesting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Testing...
                </>
              ) : (
                <>
                  🧪 Test API Limits (500 calls)
                </>
              )}
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
                  className="Poppins rounded-full pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50" />
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {isSearching && (
                  <div className="text-center text-foreground/50 py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-2"></div>
                    <p>Searching...</p>
                  </div>
                )}
                {!isSearching && searchResults.length === 0 && searchQuery && (
                  <p className="text-center text-foreground/50 py-8">No results found. Try a different search.</p>
                )}
                {!isSearching && searchResults.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-foreground/20 hover:bg-foreground/5 cursor-pointer transition-colors"
                    onClick={() => music.play(track, searchResults)}
                  >
                    <img 
                      src={track.thumbnail} 
                      alt={track.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="Space text-sm font-semibold line-clamp-1">{track.title}</h4>
                      <p className="Poppins text-xs text-foreground/70 line-clamp-1">{track.artist}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {track.duration}
                    </Badge>
                    <Button size="sm" className="rounded-full">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Tab */}
          {activeTab === 'trending' && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {isLoadingTrending ? (
                <div className="text-center text-foreground/50 py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-2"></div>
                  <p>Loading trending music...</p>
                </div>
              ) : trendingTracks.length === 0 ? (
                <p className="text-center text-foreground/50 py-8">No trending music found.</p>
              ) : (
                trendingTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-foreground/20 hover:bg-foreground/5 cursor-pointer transition-colors"
                    onClick={() => music.play(track, trendingTracks)}
                  >
                    <img 
                      src={track.thumbnail} 
                      alt={track.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="Space text-sm font-semibold line-clamp-1">{track.title}</h4>
                      <p className="Poppins text-xs text-foreground/70 line-clamp-1">{track.artist}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {track.duration}
                    </Badge>
                    <Button size="sm" className="rounded-full">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Test Results Display */}
          {testResults && (
            <div className="mt-6 p-4 bg-foreground/5 rounded-2xl border border-foreground/20">
              <h3 className="Space text-lg font-semibold mb-4">🧪 API Test Results</h3>
              
              {isTesting ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                    <span className="Poppins text-sm">Testing... {testResults.currentCall || 0}/500 calls</span>
                  </div>
                  <div className="w-full bg-foreground/10 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((testResults.currentCall || 0) / 500) * 100}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-foreground/70">Successful:</span>
                      <span className="ml-2 font-semibold text-green-500">{testResults.successfulCalls}</span>
                    </div>
                    <div>
                      <span className="text-foreground/70">Failed:</span>
                      <span className="ml-2 font-semibold text-red-500">{testResults.failedCalls}</span>
                    </div>
                    <div>
                      <span className="text-foreground/70">Blocked:</span>
                      <span className="ml-2 font-semibold text-orange-500">{testResults.blockedCalls}</span>
                    </div>
                    <div>
                      <span className="text-foreground/70">Avg Time:</span>
                      <span className="ml-2 font-semibold">{Math.round(testResults.averageResponseTime || 0)}ms</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{testResults.successfulCalls}</div>
                      <div className="text-sm text-green-700">Successful Calls</div>
                    </div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{testResults.failedCalls}</div>
                      <div className="text-sm text-red-700">Failed Calls</div>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{testResults.blockedCalls}</div>
                      <div className="text-sm text-orange-700">Blocked Calls</div>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{testResults.successRate?.toFixed(1) || '0.0'}%</div>
                      <div className="text-sm text-blue-700">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-foreground/70">Total Time:</span>
                      <span className="ml-2 font-semibold">{Math.round((testResults.totalTime || 0) / 1000)}s</span>
                    </div>
                    <div>
                      <span className="text-foreground/70">Calls/Second:</span>
                      <span className="ml-2 font-semibold">{(testResults.callsPerSecond || 0).toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-foreground/70">Avg Response:</span>
                      <span className="ml-2 font-semibold">{Math.round(testResults.averageResponseTime)}ms</span>
                    </div>
                    <div>
                      <span className="text-foreground/70">Block Rate:</span>
                      <span className="ml-2 font-semibold">{(testResults.blockRate || 0).toFixed(1)}%</span>
                    </div>
                  </div>

                  {testResults.errors.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Recent Errors:</h4>
                      <div className="max-h-32 overflow-y-auto text-xs text-red-600">
                        {testResults.errors.slice(-10).map((error, index) => (
                          <div key={index} className="mb-1">{error}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

