import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { weddingConfig } from "@/config/weddingConfig";
import "./globals.css";

const titleFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400", "500", "600", "700"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: weddingConfig.seo.title,
  description: weddingConfig.seo.description
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${titleFont.variable} ${bodyFont.variable} font-body text-foreground`}>
        {children}
      </body>
    </html>
  );
}
