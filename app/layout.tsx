// app/layout.tsx
import "./globals.css"; // Your styles
import type { Metadata } from "next";
import { ReactNode } from "react";
import Menu from "@/components/Menu"; // Update path if needed
import Footer from "@/components/Footer"; // Update path if needed

export const metadata: Metadata = {
  title: "Kodara",
  description: "Software made simple. Business made better."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black font-mono">
        <Menu />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
