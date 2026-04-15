"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
};

type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const INITIAL_TIME_LEFT: TimeLeft = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00"
};

const getTimeLeft = (targetDate: string): TimeLeft => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return INITIAL_TIME_LEFT;
  }

  return {
    days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
    hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
    seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0")
  };
};

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(INITIAL_TIME_LEFT);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  const items = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="theme-surface-strong rounded-[1.5rem] border px-4 py-5 text-center shadow-soft backdrop-blur md:rounded-[2rem] md:px-5 md:py-6"
        >
          <div className="font-title text-3xl text-foreground md:text-5xl">{item.value}</div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-muted md:text-xs md:tracking-[0.3em]">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
