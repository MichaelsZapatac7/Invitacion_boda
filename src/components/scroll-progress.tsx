"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[100] h-px w-full">
      <div className="h-full bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-100" style={{ width: `${pct}%` }} />
    </div>
  );
}
