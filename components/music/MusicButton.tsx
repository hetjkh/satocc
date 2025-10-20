'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Music2 } from 'lucide-react';
import YouTubeMusicPlayer from './YouTubeMusicPlayer';
import MiniPlayerWidget from './MiniPlayerWidget';
import { useMusic } from '@/contexts/MusicContext';
import { Toaster } from '@/components/ui/sonner';

export default function MusicButton() {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const music = useMusic();

  return (
    <>
      {/* Show mini player widget when music is playing, otherwise show green button */}
      {music.currentTrack ? (
        <MiniPlayerWidget onOpenPlayer={() => setIsPlayerOpen(true)} />
      ) : (
        !isPlayerOpen && (
          <Button
            onClick={() => setIsPlayerOpen(true)}
            className="fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 bg-green-400 text-foreground border-2 border-foreground hover:bg-green-500 transition-colors shadow-lg"
            size="icon"
          >
            <Music2 className="w-6 h-6" />
          </Button>
        )
      )}

      {/* Full Player Modal */}
      <YouTubeMusicPlayer 
        isOpen={isPlayerOpen} 
        onClose={() => setIsPlayerOpen(false)} 
      />

      <Toaster />
    </>
  );
}
