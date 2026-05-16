import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-title)"],
        body: ["var(--font-body)"],
        script: ["var(--font-script)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        "gold-glow": "var(--gold-glow)",
        "bg-2": "var(--bg-2)",
        "bg-warm": "var(--bg-warm)",
        rose: "var(--rose)",
        muted: "var(--muted)",
        line: "var(--line)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        border: "var(--border)",
        "border-gold": "var(--border-gold)",
      },
      boxShadow: {
        soft: "0 24px 60px rgba(0, 0, 0, 0.35)",
        gold: "0 0 80px rgba(201, 169, 110, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
