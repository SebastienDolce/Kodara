import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body className="bg-[#080808] text-[#f3f0ea] antialiased">
        <Menu />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
