'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import type { YouTubeTrack } from '@/lib/youtube';

interface MusicContextType {
  currentTrack: YouTubeTrack | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  queue: YouTubeTrack[];
  currentIndex: number;
  isPlayerReady: boolean;
  play: (track: YouTubeTrack, trackList?: YouTubeTrack[]) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<YouTubeTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [queue, setQueue] = useState<YouTubeTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);
  const initAttemptRef = useRef(0);

  // Initialize YouTube Player on mount
  useEffect(() => {
    const initYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          setTimeout(() => initializePlayer(), 500);
        };
      } else {
        setTimeout(() => initializePlayer(), 500);
      }
    };

    initYouTubeAPI();
  }, []);

  const initializePlayer = () => {
    if (playerRef.current) {
      setIsPlayerReady(true);
      return;
    }

    if (!window.YT || !window.YT.Player) {
      initAttemptRef.current += 1;
      if (initAttemptRef.current < 10) {
        setTimeout(() => initializePlayer(), 500);
      }
      return;
    }

    try {
      playerRef.current = new window.YT.Player('global-youtube-player', {
        height: '0',
        width: '0',
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            event.target.setVolume(volume);
            toast.success('Music Player Ready!', {
              description: 'You can now play songs',
              duration: 2000,
            });
          },
          onStateChange: (event: any) => {
            if (event.data === 0) {
              // Ended - play next
              next();
            } else if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            }
          },
          onError: (event: any) => {
            console.error('YouTube player error:', event.data);
            toast.error('Playback error', {
              description: 'Try a different song',
            });
          },
        },
      });
    } catch (error) {
      console.error('Error initializing player:', error);
    }
  };

  const play = (track: YouTubeTrack, trackList?: YouTubeTrack[]) => {
    if (!playerRef.current || !isPlayerReady) {
      toast.info('Player is loading...', {
        description: 'Please wait a moment',
        duration: 2000,
      });
      return;
    }

    setCurrentTrack(track);

    if (trackList) {
      setQueue(trackList);
      const index = trackList.findIndex(t => t.id === track.id);
      setCurrentIndex(index);
    }

    try {
      playerRef.current.loadVideoById(track.videoId);
      playerRef.current.playVideo();
      setIsPlaying(true);

      toast.success('Now Playing', {
        description: `${track.title}`,
        duration: 2000,
      });
    } catch (error) {
      console.error('Error playing track:', error);
      toast.error('Failed to play track');
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const next = () => {
    if (queue.length > 0 && currentIndex < queue.length - 1) {
      const nextTrack = queue[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      play(nextTrack, queue);
    }
  };

  const previous = () => {
    if (queue.length > 0 && currentIndex > 0) {
      const prevTrack = queue[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      play(prevTrack, queue);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (playerRef.current && !isMuted) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        isMuted,
        queue,
        currentIndex,
        isPlayerReady,
        play,
        pause,
        resume,
        next,
        previous,
        setVolume,
        toggleMute,
      }}
    >
      {/* Global hidden YouTube player - always mounted */}
      <div id="global-youtube-player" style={{ display: 'none' }}></div>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}

