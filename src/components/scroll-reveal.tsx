"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
  threshold?: number;
}

export function ScrollReveal({ children, delay = 0, direction = "up", className = "", threshold = 0.1 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("sr-revealed"), delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const cls = { up: "sr-up", left: "sr-left", right: "sr-right", fade: "sr-fade" }[direction];
  return <div ref={ref} className={`sr-base ${cls} ${className}`}>{children}</div>;
}
