import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planviry — Bespoke Celebration Planning Concierge",
  description:
    "Planviry is a premium celebration planning platform for curated private events, spaces, and luxury event experiences.",
  keywords: [
    "Planviry",
    "event planning",
    "luxury events",
    "concierge",
    "wedding planning",
    "celebration",
  ],
  authors: [{ name: "Planviry Co." }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Planviry — Bespoke Celebration Planning Concierge",
    description:
      "Premium celebration planning platform for curated private events, spaces, and luxury event experiences.",
    siteName: "Planviry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planviry — Bespoke Celebration Planning Concierge",
    description:
      "Premium celebration planning platform for curated private events, spaces, and luxury event experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Planviry type system */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Syne:wght@400..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Instrument+Serif:ital@0;1&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols (used throughout the Planviry UI) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
