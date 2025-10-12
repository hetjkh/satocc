'use client';

import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

interface MiniPlayerProps {
  onExpand: () => void;
}

export default function MiniPlayer({ onExpand }: MiniPlayerProps) {
  const { currentTrack, isPlaying, pause, resume, next, previous, volume, isMuted, toggleMute, currentIndex, queue } = useMusic();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t-2 border-foreground shadow-lg z-50 p-3">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img 
            src={currentTrack.thumbnail} 
            alt={currentTrack.title}
            className="w-12 h-12 rounded-lg object-cover cursor-pointer"
            onClick={onExpand}
          />
          <div className="flex-1 min-w-0">
            <h4 className="Space text-sm font-semibold truncate">{currentTrack.title}</h4>
            <p className="Poppins text-xs text-foreground/70 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={previous}
            disabled={currentIndex === 0}
            className="rounded-full"
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="default"
            onClick={isPlaying ? pause : resume}
            className="rounded-full w-10 h-10"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={next}
            disabled={currentIndex === queue.length - 1}
            className="rounded-full"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleMute}
            className="rounded-full"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <span className="text-xs text-foreground/70 w-8">{volume}%</span>
        </div>

        {/* Expand */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onExpand}
          className="rounded-full"
          title="Expand player"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

