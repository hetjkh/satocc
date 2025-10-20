'use client';

import { Button } from '@/components/ui/button';
import { useMusic } from '@/contexts/MusicContext';
import { Play, Pause, X } from 'lucide-react';

interface MiniPlayerWidgetProps {
  onOpenPlayer: () => void;
}

export default function MiniPlayerWidget({ onOpenPlayer }: MiniPlayerWidgetProps) {
  const music = useMusic();

  if (!music.currentTrack) return null;

  // Debug progress value
  console.log('Progress:', music.progress);
  
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  // Use actual progress value
  const strokeDashoffset = circumference - (music.progress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="Space rounded-full bg-black text-white transition-all duration-300 cursor-pointer px-4 py-3 flex items-center gap-3">
        {/* Album Art with Border Progress */}
        <div className="relative">
          {/* Album Art */}
          <div className="w-12 h-12 rounded-full overflow-hidden relative">
            <img 
              src={music.currentTrack.thumbnail} 
              alt={music.currentTrack.title}
              className="w-full h-full object-cover"
              style={{ opacity: 1 }}
            />
            
            {/* Progress Border SVG */}
            <svg className="absolute inset-0 w-12 h-12 transform -rotate-90" viewBox="0 0 48 48" style={{ color: 'white' }}>
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="3"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="#00FF00 !important"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeOpacity="1"
                className="transition-all duration-300"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  stroke: '#00FF00',
                  color: 'white'
                }}
              />
            </svg>
          </div>

          {/* Play/Pause Button Overlay */}
          <Button
            size="sm"
            variant="default"
            onClick={music.isPlaying ? music.pause : music.resume}
            className="absolute inset-0 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 p-0"
            style={{ opacity: 1 }}
          >
            {music.isPlaying ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3 ml-0.5" />
            )}
          </Button>
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0 max-w-[180px]">
          <h4 className="Space text-sm font-bold truncate text-white">
            {music.currentTrack.title}
          </h4>
          <p className="Poppins text-xs text-white/70 truncate">
            {music.currentTrack.artist}
          </p>
        </div>

        {/* Close Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onOpenPlayer}
          className="rounded-full w-8 h-8 p-0 hover:bg-white/10 text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
