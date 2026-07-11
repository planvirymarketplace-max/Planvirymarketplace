import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Booking Engine",
  description: "Cart, checkout, reservations, itinerary",
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
