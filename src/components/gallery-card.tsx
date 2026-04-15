"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryCardProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function GalleryCard({ src, alt, priority = false, className = "" }: GalleryCardProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-[#f8f4ec] via-white to-[#f0e6d2] ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,106,0.18),transparent_40%)]" />
        <div className="relative flex h-full min-h-[280px] items-end p-6 md:p-8">
          <div>
            <p className="font-title text-2xl text-foreground/85 md:text-3xl">Michael & Juliana</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
              Agrega esta imagen en <span className="font-medium text-foreground">{src}</span> para personalizar la galeria.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-line bg-black/5 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition duration-700 hover:scale-[1.03]"
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
    </div>
  );
}
