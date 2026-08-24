import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-kodara-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kodara-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kodara.dev"),
  title: {
    default: "Kodara — Product Systems Studio",
    template: "%s — Kodara",
  },
  description:
    "Kodara is a founder-led product systems studio building software, AI automation, integrations, and infrastructure for ambitious ideas and messy workflows.",
  openGraph: {
    title: "Kodara — Product Systems Studio",
    description: "Build the thing. Connect the things. Automate the rest.",
    url: "https://kodara.dev",
    siteName: "Kodara",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-[#080808] text-[#f3f0ea] antialiased">
        <Menu />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
