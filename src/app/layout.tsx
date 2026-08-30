import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Great_Vibes } from "next/font/google";
import { weddingConfig } from "@/config/weddingConfig";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://invitacion-michael-juliana.vercel.app";

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
  metadataBase: new URL(siteUrl),
  title: weddingConfig.seo.title,
  description: weddingConfig.seo.description,
  applicationName: "Michael & Juliana",
  authors: [{ name: "Michael & Juliana" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Michael & Juliana",
    title: `Michael & Juliana · 14 · 11 · 2026`,
    description:
      "Nos casamos el 14 de noviembre de 2026 en Cali. Abre la invitación y acompáñanos en este día.",
    url: siteUrl,
    images: [
      {
        url: "/images/hero-main.JPG",
        width: 1200,
        height: 630,
        alt: "Michael & Juliana — 14 de noviembre de 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael & Juliana · 14 · 11 · 2026",
    description:
      "Nos casamos el 14 de noviembre de 2026 en Cali. Abre la invitación y acompáñanos en este día.",
    images: ["/images/hero-main.JPG"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0908" },
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
