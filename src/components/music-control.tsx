"use client";

import { useEffect, useRef, useState } from "react";

type MusicControlProps = {
  src: string;
  enabled: boolean;
};

export function MusicControl({ src, enabled }: MusicControlProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(enabled);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsAvailable(false);
    }
  }, [enabled]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !isAvailable) {
      return;
    }

    audio.loop = true;
    audio.volume = 0.7;

    const startPlayback = async () => {
      try {
        audio.muted = false;
        await audio.play();
        setIsMuted(false);
        setHasStarted(true);
      } catch {
        try {
          audio.muted = true;
          await audio.play();
          setIsMuted(true);
          setHasStarted(true);
        } catch {
          // Some browsers block autoplay without user interaction.
          // Keep the control enabled so the guest can start audio manually.
          audio.pause();
          audio.muted = false;
          setIsMuted(false);
        }
      }
    };

    void startPlayback();
  }, [isAvailable]);

  const toggleMuted = async () => {
    const audio = audioRef.current;

    if (!audio || !isAvailable) {
      return;
    }

    try {
      if (audio.paused || !hasStarted) {
        await audio.play();
        setHasStarted(true);
      }

      const nextMuted = !audio.muted;
      audio.muted = nextMuted;
      setIsMuted(nextMuted);
    } catch {
      setIsAvailable(false);
    }
  };

  return (
    <div className="inline-flex">
      <audio
        ref={audioRef}
        preload="auto"
        src={src}
        loop
        playsInline
        onError={() => {
          setIsAvailable(false);
          setIsMuted(false);
          setHasStarted(false);
        }}
      />
      <button
        type="button"
        onClick={toggleMuted}
        disabled={!isAvailable}
        aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
        className="theme-surface-strong inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-soft backdrop-blur transition hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:border-line disabled:text-muted md:h-11 md:w-11"
      >
        {isAvailable ? (
          isMuted ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-foreground md:h-5 md:w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6.5 9H3v6h3.5L11 19z" />
              <path d="m16 9 5 6" />
              <path d="m21 9-5 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-foreground md:h-5 md:w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6.5 9H3v6h3.5L11 19z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
            </svg>
          )
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-muted md:h-5 md:w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6.5 9H3v6h3.5L11 19z" />
            <path d="M16 12h5" />
          </svg>
        )}
      </button>
    </div>
  );
}
