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
  lineOrigin: "left" | "right";
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
    const travel = 116;
    return {
      id: descriptor.id,
      x: rect.left + rect.width / 2,
      y: window.scrollY + rect.top + rect.height / 2,
      kind: descriptor.kind,
      tone,
      fromX: -travel,
      toX: 0,
      lineLeft: -travel,
      lineWidth: travel,
      lineOrigin: "right",
    };
  }

  if (descriptor.kind === "card") {
    const travel = Math.max(100, Math.min(136, rect.width * 0.4));
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
      lineOrigin: "left",
    };
  }

  const travel = Math.max(108, Math.min(140, rect.width * 0.38));
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
    lineOrigin: "right",
  };
};

export default function MobileRelay() {
  const pathname = usePathname();
  const [point, setPoint] = useState<RelayPoint | null>(null);
  const [visible, setVisible] = useState(false);
  const [lineReady, setLineReady] = useState(false);
  const [traveling, setTraveling] = useState(false);
  const [lineFading, setLineFading] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const travelTimer = useRef<number | null>(null);
  const fadeTimer = useRef<number | null>(null);
  const settleTimer = useRef<number | null>(null);
  const lastAnyTrigger = useRef(0);
  const lastTriggerById = useRef(new Map<string, number>());
  const activeCandidate = useRef<{ element: HTMLElement; descriptor: RelayDescriptor } | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const mobile = window.matchMedia("(max-width: 899px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const descriptorByElement = new Map<Element, RelayDescriptor>();

    const clearAnimationTimers = () => {
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
      if (travelTimer.current !== null) window.clearTimeout(travelTimer.current);
      if (fadeTimer.current !== null) window.clearTimeout(fadeTimer.current);
    };

    const trigger = (element: HTMLElement, descriptor: RelayDescriptor) => {
      if (!mobile.matches || reducedMotion.matches) return;

      const now = Date.now();
      const lastForTarget = lastTriggerById.current.get(descriptor.id) ?? 0;
      if (now - lastAnyTrigger.current < 1900 || now - lastForTarget < 9000) return;

      lastAnyTrigger.current = now;
      lastTriggerById.current.set(descriptor.id, now);
      clearAnimationTimers();

      setPoint(pointForElement(element, descriptor));
      setVisible(true);
      setLineReady(false);
      setTraveling(false);
      setLineFading(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setLineReady(true));
      });

      travelTimer.current = window.setTimeout(() => setTraveling(true), 210);
      fadeTimer.current = window.setTimeout(() => setLineFading(true), 1080);
      hideTimer.current = window.setTimeout(() => {
        setVisible(false);
        setTraveling(false);
        setLineReady(false);
        setLineFading(false);
      }, 1580);
    };

    const candidateIsSettled = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const minimumVisible = Math.min(rect.height * 0.3, viewportHeight * 0.2);
      const anchor = rect.top + Math.min(rect.height * 0.35, 180);

      return (
        visibleHeight >= minimumVisible &&
        anchor >= viewportHeight * 0.2 &&
        anchor <= viewportHeight * 0.78
      );
    };

    const scheduleSettledTrigger = () => {
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => {
        const candidate = activeCandidate.current;
        if (!candidate || !candidateIsSettled(candidate.element)) return;
        trigger(candidate.element, candidate.descriptor);
      }, 240);
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
            const aAnchor = a.entry.boundingClientRect.top + Math.min(a.entry.boundingClientRect.height * 0.35, 180);
            const bAnchor = b.entry.boundingClientRect.top + Math.min(b.entry.boundingClientRect.height * 0.35, 180);
            return Math.abs(aAnchor - center) - Math.abs(bAnchor - center);
          });

        const candidate = candidates[0];
        if (!candidate) return;

        activeCandidate.current = {
          element: candidate.entry.target as HTMLElement,
          descriptor: candidate.descriptor,
        };
        scheduleSettledTrigger();
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-14% 0px -16% 0px",
      }
    );

    relayTargets.forEach((descriptor) => {
      const element = document.querySelector<HTMLElement>(descriptor.selector);
      if (!element) return;
      descriptorByElement.set(element, descriptor);
      observer.observe(element);
    });

    const handleScroll = () => {
      if (!mobile.matches || reducedMotion.matches) return;
      scheduleSettledTrigger();
    };

    const handleMediaChange = () => {
      if (!mobile.matches || reducedMotion.matches) {
        setVisible(false);
        setTraveling(false);
        setLineReady(false);
        setLineFading(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    mobile.addEventListener?.("change", handleMediaChange);
    reducedMotion.addEventListener?.("change", handleMediaChange);

    return () => {
      observer.disconnect();
      clearAnimationTimers();
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
      window.removeEventListener("scroll", handleScroll);
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
        className="absolute top-[5px] h-px bg-current"
        style={{
          left: point.lineLeft,
          width: point.lineWidth,
          opacity: lineReady ? (lineFading ? 0 : 0.64) : 0,
          transform: `scaleX(${lineReady ? 1 : 0.12})`,
          transformOrigin: point.lineOrigin,
          transition: lineFading
            ? "opacity 420ms ease"
            : "transform 180ms ease-out, opacity 140ms ease-out",
        }}
      />

      <span
        className="absolute block bg-current"
        style={{
          width: packetSize,
          height: packetSize,
          opacity: lineReady ? 1 : 0,
          transform: `translate3d(${traveling ? point.toX : point.fromX}px, 0, 0)`,
          transition: traveling
            ? "transform 1280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 120ms ease-out"
            : "opacity 120ms ease-out",
        }}
      />
    </div>
  );
}
