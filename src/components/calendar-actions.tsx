"use client";

import { createGoogleCalendarUrl, createIcsFile } from "@/lib/calendar";

export function CalendarActions() {
  const handleDownloadIcs = () => {
    const ics = createIcsFile();
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "michael-juliana-boda.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <a
        href={createGoogleCalendarUrl()}
        target="_blank"
        rel="noreferrer"
        className="theme-calendar-button-primary w-full rounded-full px-5 py-3 text-center text-[11px] uppercase tracking-[0.28em] transition hover:scale-[1.01] sm:w-auto sm:px-6 sm:text-xs sm:tracking-[0.3em]"
      >
        Google Calendar
      </a>
      <button
        type="button"
        onClick={handleDownloadIcs}
        className="theme-calendar-button-secondary w-full rounded-full border px-5 py-3 text-center text-[11px] uppercase tracking-[0.24em] transition hover:scale-[1.01] sm:w-auto sm:px-6 sm:text-xs sm:tracking-[0.3em]"
      >
        Descargar calendario (.ics)
      </button>
    </div>
  );
}
