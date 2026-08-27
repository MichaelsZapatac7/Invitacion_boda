"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const total = images.length;
  const current = images[index];
  const touchStartX = useRef<number | null>(null);
  const [entered, setEntered] = useState(false);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + total) % total);
  }, [index, total, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % total);
  }, [index, total, onNavigate]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    },
    [onClose, goPrev, goNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setEntered(true), 10);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [handleKey]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  if (!current) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 ${entered ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotos"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="safe-top absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-gold hover:text-gold"
        aria-label="Cerrar"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      {total > 1 && (
        <div className="safe-top absolute left-1/2 top-6 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-white/50">
          {index + 1} / {total}
        </div>
      )}

      {/* Prev */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold hover:text-gold md:left-6"
          aria-label="Foto anterior"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold hover:text-gold md:right-6"
          aria-label="Foto siguiente"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="relative h-[82vh] w-[90vw] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          className="rounded-xl object-contain"
          sizes="90vw"
        />
      </div>
    </div>
  );
}
