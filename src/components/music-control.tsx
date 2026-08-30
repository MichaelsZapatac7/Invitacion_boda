"use client";

import { useEffect, useRef, useState } from "react";

type MusicControlProps = {
  src: string;
  enabled: boolean;
};

const TARGET_VOLUME = 0.7;

// Gentle volume ramp so the song never starts at full blast.
const fadeIn = (audio: HTMLAudioElement, ms = 1400) => {
  const steps = 28;
  const stepMs = ms / steps;
  let i = 0;
  audio.volume = 0;
  const id = window.setInterval(() => {
    i += 1;
    const t = i / steps;
    // ease-out curve
    audio.volume = Math.min(TARGET_VOLUME, TARGET_VOLUME * (1 - Math.pow(1 - t, 2)));
    if (i >= steps) window.clearInterval(id);
  }, stepMs);
};

export function MusicControl({ src, enabled }: MusicControlProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(enabled);
  const [hasStarted, setHasStarted] = useState(false);
  const [requiresGesture, setRequiresGesture] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

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
    audio.volume = TARGET_VOLUME;

    const startPlayback = async () => {
      try {
        audio.muted = false;
        await audio.play();
        fadeIn(audio);
        setIsMuted(false);
        setHasStarted(true);
        setRequiresGesture(false);
      } catch {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;
        setIsMuted(false);
        setRequiresGesture(true);
      }
    };

    void startPlayback();
  }, [isAvailable]);

  const handleGestureStart = async () => {
    const audio = audioRef.current;

    if (!audio || !isAvailable || isOpening) {
      return;
    }

    try {
      audio.muted = false;
      await audio.play();
      fadeIn(audio);
      setIsOpening(true);
      setHasStarted(true);
      setIsMuted(false);
      window.setTimeout(() => {
        setRequiresGesture(false);
        setIsOpening(false);
      }, 1350);
    } catch {
      setIsAvailable(false);
      setRequiresGesture(false);
      setIsOpening(false);
    }
  };

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
      setRequiresGesture(false);
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
          setRequiresGesture(false);
        }}
      />
      {requiresGesture ? (
        <button
          type="button"
          onClick={handleGestureStart}
          disabled={isOpening}
          className={`fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm transition-opacity duration-[1200ms] ${isOpening ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <span className={`envelope-stage ${isOpening ? "is-opening" : ""}`}>
            <span className="envelope-glow" />
            <span className="envelope-card">
              <span className="fade-up text-[10px] uppercase tracking-[0.36em] text-gold">Nos casamos</span>
              <span
                className="fade-up fade-delay-1 mt-2 text-5xl leading-none text-foreground sm:text-6xl"
                style={{ fontFamily: "var(--font-script)" }}
              >
                M &amp; J
              </span>
              <span className="fade-up fade-delay-2 mt-4 flex items-center gap-3 text-[11px] tracking-[0.4em] text-gold/80">
                <span className="h-px w-7 bg-gradient-to-r from-transparent to-gold/60" />
                14 · 11 · 2026
                <span className="h-px w-7 bg-gradient-to-l from-transparent to-gold/60" />
              </span>
              <span className="fade-up fade-delay-3 mt-4 max-w-[26ch] text-sm leading-7 text-muted sm:text-[15px]">
                Toca para abrir la invitación. El sobre se abrirá y sonará nuestra canción.
              </span>
              <span
                className="fade-up fade-delay-4 mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-[11px] uppercase tracking-[0.28em] shadow-gold"
                style={{ color: "var(--bg)" }}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16v16H4z" opacity="0" />
                  <path d="m3 7 9 6 9-6" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                </svg>
                Abrir invitación
              </span>
            </span>
            <span className="envelope-shell">
              <span className="envelope-back" />
              <span className="envelope-flap" />
              <span className="envelope-front" />
            </span>
          </span>
        </button>
      ) : null}
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
