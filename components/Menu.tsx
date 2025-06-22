"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

const Menu = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "team", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [pathname]);

  const links = [
    { label: "HOME", href: "/" },
    { label: "SERVICES", href: "/services" },
    { label: "TEAM", href: "/#team", section: "team" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/#contact", section: "contact" },
  ];

 const renderLinks = (vertical = false) => {
  return links.map((item) => {
    const isHomePage = pathname === "/";
    const isHashLink = item.href.startsWith("/#");

    const isActive =
      pathname === item.href ||
      (isHomePage && item.section === activeSection) ||
      (isHomePage && item.href === "/" && activeSection === "home");

    return (
      <Link
        key={item.href}
        href={isHashLink ? `/#${item.section}` : item.href}
        scroll={true}
        onClick={() => setMobileOpen(false)} // ✅ Close menu on click
      >
        <motion.span
          className={`text-sm font-bold transition-colors cursor-pointer ${
            isActive ? "text-red-600" : "hover:text-red-600"
          } ${vertical ? "block py-2" : ""}`}
          whileHover={{ y: -2 }}
        >
          {item.label}
        </motion.span>
      </Link>
    );
  });
};



  return (
    <nav className="fixed top-0 w-full bg-black z-40 border-b-4 border-white text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/">
            <h1 className="text-4xl font-black tracking-tighter cursor-pointer">
              KODARA<span className="text-red-600">.</span>
            </h1>
          </Link>
        </motion.div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8">{renderLinks()}</div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen((prev) => !prev)}>
            {mobileOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-6 bg-black border-t-2 border-white">
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
};

export default Menu;
