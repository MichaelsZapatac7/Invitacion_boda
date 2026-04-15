import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-title)"],
        body: ["var(--font-body)"]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "var(--gold)",
        muted: "var(--muted)",
        line: "var(--line)"
      },
      boxShadow: {
        soft: "0 24px 60px rgba(0, 0, 0, 0.12)"
      },
      backgroundImage: {
        glow: "radial-gradient(circle at top, rgba(201, 168, 106, 0.22), transparent 35%), radial-gradient(circle at bottom, rgba(201, 168, 106, 0.14), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
