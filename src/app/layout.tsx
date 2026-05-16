import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Great_Vibes } from "next/font/google";
import { weddingConfig } from "@/config/weddingConfig";
import "./globals.css";

const titleFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: weddingConfig.seo.title,
  description: weddingConfig.seo.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-theme="dark">
      <body className={`${titleFont.variable} ${scriptFont.variable} ${bodyFont.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
