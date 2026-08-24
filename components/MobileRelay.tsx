"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type RelayKind = "card" | "separator" | "terminal";
type RelayTone = "red" | "black";

type RelayDescriptor = {
  id: string;
  selector: string;
  kind: RelayKind;
  tone?: RelayTone;
};

type RelayPoint = {
  id: string;
  x: number;
  y: number;
  kind: RelayKind;
  tone: RelayTone;
  fromX: number;
  toX: number;
  lineLeft: number;
  lineWidth: number;
};

const relayTargets: RelayDescriptor[] = [
  { id: "hero-system", selector: "[data-bus-card]", kind: "card" },
  { id: "work", selector: "#work", kind: "separator" },
  { id: "project-spenthere", selector: '[data-bus-project-card="spenthere"]', kind: "card" },
  { id: "project-coordinator", selector: '[data-bus-project-card="coordinator"]', kind: "card" },
  { id: "project-credentials", selector: '[data-bus-project-card="credentials"]', kind: "card" },
  { id: "services", selector: "#services", kind: "separator" },
  { id: "about", selector: "#about", kind: "separator" },
  { id: "lab", selector: "#lab", kind: "separator" },
  { id: "notes", selector: "#notes", kind: "separator" },
  { id: "contact", selector: "#contact", kind: "separator", tone: "black" },
  { id: "footer", selector: "[data-bus-end]", kind: "terminal" },
];

const pointForElement = (element: HTMLElement, descriptor: RelayDescriptor): RelayPoint => {
  const rect = element.getBoundingClientRect();
  const tone = descriptor.tone ?? "red";

  if (descriptor.kind === "terminal") {
    return {
      id: descriptor.id,
      x: rect.left + rect.width / 2,
      y: window.scrollY + rect.top + rect.height / 2,
      kind: descriptor.kind,
      tone,
      fromX: -52,
      toX: 0,
      lineLeft: -52,
      lineWidth: 52,
    };
  }

  if (descriptor.kind === "card") {
    const travel = Math.max(42, Math.min(72, rect.width * 0.22));
    return {
      id: descriptor.id,
      x: rect.left + 1,
      y: window.scrollY + rect.top + 1,
      kind: descriptor.kind,
      tone,
      fromX: 0,
      toX: travel,
      lineLeft: 0,
      lineWidth: travel,
    };
  }

  const travel = Math.max(46, Math.min(68, rect.width * 0.2));
  return {
    id: descriptor.id,
    x: Math.max(rect.left + travel + 18, rect.right - 18),
    y: window.scrollY + rect.top + 1,
    kind: descriptor.kind,
    tone,
    fromX: -travel,
    toX: 0,
    lineLeft: -travel,
    lineWidth: travel,
  };
};

export default function MobileRelay() {
  const pathname = usePathname();
  const [point, setPoint] = useState<RelayPoint | null>(null);
  const [visible, setVisible] = useState(false);
  const [traveling, setTraveling] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const lastAnyTrigger = useRef(0);
  const lastTriggerById = useRef(new Map<string, number>());

  useEffect(() => {
    if (pathname !== "/") return;

    const mobile = window.matchMedia("(max-width: 899px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const descriptorByElement = new Map<Element, RelayDescriptor>();

    const trigger = (element: HTMLElement, descriptor: RelayDescriptor) => {
      if (!mobile.matches || reducedMotion.matches) return;

      const now = Date.now();
      const lastForTarget = lastTriggerById.current.get(descriptor.id) ?? 0;
      if (now - lastAnyTrigger.current < 1400 || now - lastForTarget < 7000) return;

      lastAnyTrigger.current = now;
      lastTriggerById.current.set(descriptor.id, now);

      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);

      setPoint(pointForElement(element, descriptor));
      setTraveling(false);
      setVisible(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTraveling(true));
      });

      hideTimer.current = window.setTimeout(() => {
        setVisible(false);
        setTraveling(false);
      }, 1180);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!mobile.matches || reducedMotion.matches) return;

        const candidates = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            entry,
            descriptor: descriptorByElement.get(entry.target),
          }))
          .filter(
            (candidate): candidate is { entry: IntersectionObserverEntry; descriptor: RelayDescriptor } =>
              Boolean(candidate.descriptor)
          )
          .sort((a, b) => {
            const center = window.innerHeight * 0.48;
            return (
              Math.abs(a.entry.boundingClientRect.top - center) -
              Math.abs(b.entry.boundingClientRect.top - center)
            );
          });

        const candidate = candidates[0];
        if (candidate) trigger(candidate.entry.target as HTMLElement, candidate.descriptor);
      },
      {
        threshold: [0.12, 0.28, 0.5],
        rootMargin: "-8% 0px -12% 0px",
      }
    );

    relayTargets.forEach((descriptor) => {
      const element = document.querySelector<HTMLElement>(descriptor.selector);
      if (!element) return;
      descriptorByElement.set(element, descriptor);
      observer.observe(element);
    });

    const handleMediaChange = () => {
      if (!mobile.matches || reducedMotion.matches) {
        setVisible(false);
        setTraveling(false);
      }
    };

    mobile.addEventListener?.("change", handleMediaChange);
    reducedMotion.addEventListener?.("change", handleMediaChange);

    return () => {
      observer.disconnect();
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
      mobile.removeEventListener?.("change", handleMediaChange);
      reducedMotion.removeEventListener?.("change", handleMediaChange);
    };
  }, [pathname]);

  if (pathname !== "/" || !point) return null;

  const color = point.tone === "black" ? "#080808" : "var(--kodara-red)";
  const packetSize = point.kind === "terminal" ? 12 : 10;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 z-20 min-[900px]:hidden transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translate3d(${point.x}px, ${point.y}px, 0)`,
        color,
      }}
    >
      <span
        className="absolute top-[5px] h-px bg-current opacity-60"
        style={{ left: point.lineLeft, width: point.lineWidth }}
      />

      <span
        className="absolute block bg-current"
        style={{
          width: packetSize,
          height: packetSize,
          transform: `translate3d(${traveling ? point.toX : point.fromX}px, 0, 0)`,
          transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
