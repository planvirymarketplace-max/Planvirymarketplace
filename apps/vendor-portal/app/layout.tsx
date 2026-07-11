import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { VendorSidebar } from "@/components/VendorSidebar";
import { VendorHeader } from "@/components/VendorHeader";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vendor Suite | Precision Trust",
  description: "Vendor management dashboard for Planviry marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-body-md text-on-surface bg-surface`}>
        <div className="min-h-screen bg-surface">
          <VendorSidebar />
          <VendorHeader title="Vendor Suite" />
          <main className="ml-[240px] pt-16 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
