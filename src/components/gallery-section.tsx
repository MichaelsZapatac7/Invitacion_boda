"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./lightbox";
import { ScrollReveal } from "./scroll-reveal";
import { weddingConfig } from "@/config/weddingConfig";

interface GalleryImage {
  src: string;
  alt: string;
}

export function GallerySection() {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const images = weddingConfig.gallery.images.slice(1); // skip hero image

  const gridClasses = [
    "md:col-span-7 md:row-span-2",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-12",
  ];

  return (
    <>
      <div className="mt-10 grid auto-rows-[240px] gap-3 sm:auto-rows-[280px] md:auto-rows-[300px] md:grid-cols-12 md:gap-4">
        {images.map((img, i) => (
          <ScrollReveal key={img.src} delay={i * 80} className={gridClasses[i] ?? ""}>
            <button
              type="button"
              className="group relative h-full w-full overflow-hidden rounded-2xl border border-[var(--border-gold)]/20 bg-surface focus:outline-none"
              onClick={() => !errors[i] && setLightbox(img)}
              aria-label={`Ver foto: ${img.alt}`}
            >
              {errors[i] ? (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface to-[var(--bg-2)]">
                  <span className="font-script text-3xl text-gold opacity-40">M & J</span>
                </div>
              ) : (
                <>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    onError={() => setErrors((e) => ({ ...e, [i]: true }))}
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-end justify-start p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/70">Ver foto</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/0 transition-all duration-500 group-hover:ring-gold/30" />
                </>
              )}
            </button>
          </ScrollReveal>
        ))}
      </div>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </>
  );
}
