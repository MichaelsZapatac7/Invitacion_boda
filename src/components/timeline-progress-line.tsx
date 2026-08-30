"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A gold line that fills from top to bottom as the reader scrolls through
 * the story timeline. Sits on top of the faint static line drawn by
 * `.timeline-container::before`. Purely decorative.
 */
export function TimelineProgressLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const container = el.parentElement;
    if (!container) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the container's top reaches the viewport middle,
      // 1 when its bottom passes the middle.
      const start = vh * 0.75;
      const raw = (start - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="timeline-progress"
      aria-hidden="true"
      style={{ transform: `scaleY(${progress})` }}
    />
  );
}
