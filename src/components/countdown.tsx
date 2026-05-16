"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "./scroll-reveal";

type TimeLeft = { days: string; hours: string; minutes: string; seconds: string };
const ZERO: TimeLeft = { days: "00", hours: "00", minutes: "00", seconds: "00" };

const getTimeLeft = (target: string): TimeLeft => {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return ZERO;
  return {
    days: String(Math.floor(diff / 86400000)).padStart(3, "0"),
    hours: String(Math.floor((diff / 3600000) % 24)).padStart(2, "0"),
    minutes: String(Math.floor((diff / 60000) % 60)).padStart(2, "0"),
    seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
  };
};

export function Countdown({ targetDate }: { targetDate: string }) {
  const [t, setT] = useState<TimeLeft>(ZERO);

  useEffect(() => {
    setT(getTimeLeft(targetDate));
    const id = setInterval(() => setT(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const items = [
    { label: "Días", value: t.days },
    { label: "Horas", value: t.hours },
    { label: "Minutos", value: t.minutes },
    { label: "Segundos", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {items.map((item, i) => (
        <ScrollReveal key={item.label} delay={i * 80}>
          <div className="countdown-card group relative overflow-hidden rounded-2xl border border-[var(--border-gold)]/25 bg-surface p-5 text-center md:p-7">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold-glow)]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative font-title text-5xl font-light tracking-tight text-foreground md:text-7xl lg:text-8xl">
              {item.value}
            </div>
            <div className="relative mt-3 text-[9px] uppercase tracking-[0.35em] text-muted md:mt-4 md:text-[10px]">
              {item.label}
            </div>
            <div className="absolute bottom-0 left-1/2 h-px w-12 -translate-x-1/2 bg-gold opacity-30" />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
