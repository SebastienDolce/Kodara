"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

const links = [
  { label: "WORK", href: "/#work", section: "work" },
  { label: "CAPABILITIES", href: "/#services", section: "services" },
  { label: "LAB", href: "/#lab", section: "lab" },
  { label: "NOTES", href: "/#notes", section: "notes" },
  { label: "CONTACT", href: "/#contact", section: "contact" },
];

export default function Menu() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname.startsWith("/blog") ? "notes" : "home");
      return;
    }

    const sections = ["home", "work", "services", "about", "lab", "notes", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.2, 0.5] }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080808]/94 text-white">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-10 lg:px-16">
        <Link href="/" aria-label="Kodara home" className="inline-flex items-center gap-2">
          <span className="text-2xl font-black tracking-[-0.055em] md:text-3xl">KODARA</span>
          <span className="h-3.5 w-3.5 bg-red-600 md:h-4 md:w-4" aria-hidden="true" />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((item) => {
            const active = activeSection === item.section || (item.section === "notes" && pathname.startsWith("/blog"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-[10px] font-black tracking-[0.18em] transition-colors ${
                  active ? "text-white" : "text-white/45 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-red-600 transition-transform ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#080808] px-5 pb-3 md:hidden">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b border-white/10 py-5 text-sm font-bold tracking-[0.12em] text-white/70 last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
