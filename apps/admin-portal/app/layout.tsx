import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Admin",
  description: "Platform administration, user management, and system configuration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
