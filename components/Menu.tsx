"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

const links = [
  { label: "WORK", href: "/#work" },
  { label: "CAPABILITIES", href: "/#services" },
  { label: "LAB", href: "/#lab" },
  { label: "NOTES", href: "/blog" },
  { label: "CONTACT", href: "/#contact" },
];

const Menu = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderLinks = (vertical = false) =>
    links.map((item) => {
      const active = item.href === "/blog" && pathname.startsWith("/blog");

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          className={`${vertical ? "block border-b border-white/10 py-5" : ""}`}
        >
          <motion.span
            whileHover={{ y: -2 }}
            className={`text-[11px] font-black tracking-[0.18em] transition-colors ${active ? "text-red-500" : "text-white/60 hover:text-white"}`}
          >
            {item.label}
          </motion.span>
        </Link>
      );
    });

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080808]/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-10 lg:px-16">
        <Link href="/" aria-label="Kodara home" className="group inline-flex items-center gap-2">
          <span className="text-2xl font-black tracking-[-0.055em] md:text-3xl">KODARA</span>
          <motion.span
            whileHover={{ rotate: 45 }}
            className="h-3.5 w-3.5 bg-red-600 md:h-4 md:w-4"
            aria-hidden="true"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">{renderLinks()}</div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-white/15 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={19} /> : <MenuIcon size={19} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#080808] px-5 pb-4 md:hidden">
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
};

export default Menu;
