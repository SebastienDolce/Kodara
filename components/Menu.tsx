"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

const links = [
  { label: "WORK", href: "/#work", section: "work", index: "01" },
  { label: "CAPABILITIES", href: "/#services", section: "services", index: "02" },
  { label: "LAB", href: "/#lab", section: "lab", index: "03" },
  { label: "NOTES", href: "/#notes", section: "notes", index: "04" },
  { label: "CONTACT", href: "/#contact", section: "contact", index: "05" },
];

const Menu = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname.startsWith("/blog") ? "notes" : "home");
      setScrollProgress(0);
      return;
    }

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };

    const sections = ["home", "work", "services", "about", "lab", "notes", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.45, 0.7] }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [pathname]);

  const renderLinks = (vertical = false) =>
    links.map((item) => {
      const active = activeSection === item.section || (item.section === "notes" && pathname.startsWith("/blog"));

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          className={`${vertical ? "group flex items-center justify-between border-b border-white/10 py-5" : "group"}`}
        >
          {vertical && (
            <span className="kodara-mono text-[9px] tracking-[0.18em] text-white/25">{item.index}</span>
          )}
          <motion.span
            whileHover={vertical ? undefined : { y: -2 }}
            className={`relative text-[10px] font-black tracking-[0.18em] transition-colors ${
              active ? "text-white" : "text-white/48 hover:text-white"
            }`}
          >
            {!vertical && (
              <span
                className={`absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 transition-all ${
                  active ? "rotate-45 bg-red-600 opacity-100" : "bg-white opacity-0 group-hover:opacity-30"
                }`}
                aria-hidden="true"
              />
            )}
            {item.label}
          </motion.span>
        </Link>
      );
    });

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080808]/90 text-white backdrop-blur-xl">
      <div className="relative mx-auto grid max-w-[1500px] grid-cols-[1fr_auto] items-center px-5 py-5 md:grid-cols-[1fr_auto] md:px-10 lg:grid-cols-[1fr_auto_1fr] lg:px-16">
        <Link href="/" aria-label="Kodara home" className="group inline-flex w-fit items-center gap-2">
          <span className="text-2xl font-black tracking-[-0.055em] md:text-3xl">KODARA</span>
          <motion.span
            whileHover={{ rotate: 45 }}
            className="h-3.5 w-3.5 bg-red-600 md:h-4 md:w-4"
            aria-hidden="true"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex lg:justify-self-center">{renderLinks()}</div>

        <div className="kodara-mono hidden items-center justify-self-end gap-3 text-[8px] font-bold uppercase tracking-[0.18em] text-white/30 lg:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-red-600 opacity-40" />
            <span className="relative inline-flex h-2 w-2 bg-red-600" />
          </span>
          systems / online
        </div>

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

      <div className="absolute inset-x-0 bottom-0 h-px bg-white/5" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-red-600"
          animate={{ scaleX: pathname === "/" ? scrollProgress : 0 }}
          transition={{ duration: 0.12, ease: "linear" }}
        />
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#080808] px-5 pb-4 md:hidden">
          <div className="kodara-mono flex items-center justify-between border-b border-white/10 py-4 text-[8px] uppercase tracking-[0.18em] text-white/25">
            <span>Navigate / workshop</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-red-600" /> online</span>
          </div>
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
};

export default Menu;
