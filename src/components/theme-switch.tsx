"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "wedding-theme";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const initialTheme = savedTheme ?? "dark";

    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar tema de la invitacion"
      className="theme-surface-strong inline-flex items-center gap-1 rounded-full border px-1.5 py-1.5 shadow-soft backdrop-blur md:gap-3 md:px-2 md:py-2"
    >
      <span
        className={`rounded-full px-2.5 py-1.5 text-[10px] uppercase tracking-[0.2em] transition md:px-3 md:py-2 md:text-[11px] md:tracking-[0.25em] ${mounted && theme === "light" ? "" : "text-muted"}`}
        style={mounted && theme === "light" ? { background: "var(--button-primary)", color: "var(--button-primary-text)" } : undefined}
      >
        Claro
      </span>
      <span
        className={`rounded-full px-2.5 py-1.5 text-[10px] uppercase tracking-[0.2em] transition md:px-3 md:py-2 md:text-[11px] md:tracking-[0.25em] ${mounted && theme === "dark" ? "" : "text-muted"}`}
        style={mounted && theme === "dark" ? { background: "var(--button-primary)", color: "var(--button-primary-text)" } : undefined}
      >
        Oscuro
      </span>
    </button>
  );
}
