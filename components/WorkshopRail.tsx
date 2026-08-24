"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sections = [
  { id: "home", index: "00", label: "START" },
  { id: "work", index: "01", label: "WORK" },
  { id: "services", index: "02", label: "CAPABILITIES" },
  { id: "about", index: "03", label: "FOUNDER" },
  { id: "lab", index: "04", label: "LAB" },
  { id: "notes", index: "05", label: "NOTES" },
  { id: "contact", index: "06", label: "CONTACT" },
];

export default function WorkshopRail() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (pathname !== "/") return;

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {
          rootMargin: "-34% 0px -52% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    let frame = 0;
    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--kodara-pointer-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--kodara-pointer-y", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  const activeSection = sections.find((section) => section.id === active) ?? sections[0];

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="kodara-pointer-field pointer-events-none fixed inset-0 z-20 hidden min-[680px]:block" aria-hidden="true" />

      <aside
        aria-label="Page position"
        className="pointer-events-none fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 min-[680px]:flex xl:right-5"
      >
        <div className="pointer-events-auto border border-white/10 bg-[#080808]/80 px-2 py-3 shadow-2xl backdrop-blur-xl xl:px-3">
          <div className="kodara-mono mb-3 hidden text-center text-[7px] uppercase tracking-[0.22em] text-white/25 xl:block">
            system rail
          </div>
          <div className="relative space-y-1.5">
            <div className="absolute bottom-2 left-[9px] top-2 w-px bg-white/10 xl:left-[13px]" aria-hidden="true" />
            {sections.map((section) => {
              const isActive = section.id === active;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => jumpTo(section.id)}
                  aria-label={`Go to ${section.label.toLowerCase()}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`kodara-mono group relative flex h-7 items-center gap-2 px-1 text-left text-[8px] font-semibold tracking-[0.12em] transition-colors xl:h-8 xl:px-1.5 ${
                    isActive ? "text-white" : "text-white/25 hover:text-white/65"
                  }`}
                >
                  <span
                    className={`relative z-10 block h-2 w-2 border transition-all xl:h-2.5 xl:w-2.5 ${
                      isActive
                        ? "rotate-45 border-red-600 bg-red-600 shadow-[0_0_16px_rgba(225,17,28,.55)]"
                        : "border-white/25 bg-[#080808] group-hover:border-white/60"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="hidden min-[900px]:inline">{section.index}</span>
                  <span className="hidden xl:inline text-[7px] tracking-[0.16em]">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="pointer-events-none fixed bottom-3 left-3 z-40 hidden min-[680px]:block xl:bottom-5 xl:left-5">
        <div className="kodara-mono flex items-center gap-3 border border-white/10 bg-[#080808]/82 px-3 py-2 text-[8px] uppercase tracking-[0.17em] text-white/35 shadow-2xl backdrop-blur-xl">
          <span className="h-1.5 w-1.5 bg-red-600 shadow-[0_0_12px_rgba(225,17,28,.65)]" />
          <span>{activeSection.index} / {activeSection.label}</span>
          <span className="text-white/15">|</span>
          <span className="text-green-400/65">online</span>
        </div>
      </div>
    </>
  );
}
