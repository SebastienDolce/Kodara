"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Point = { x: number; y: number };
type MeasuredRect = { left: number; right: number; top: number; bottom: number };
type BusNode = Point & { id: string };
type BusSection = { id: string; y: number };

type LayoutState = {
  width: number;
  height: number;
  busX: number;
  contentRight: number;
  start: Point;
  heroCard: MeasuredRect;
  nodes: BusNode[];
  sections: BusSection[];
};

const PACKET_INTERVAL_MS = 16000;
const PACKET_DURATION_SECONDS = 6.5;

const toDocumentRect = (element: HTMLElement): MeasuredRect => {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    right: rect.right,
    top: window.scrollY + rect.top,
    bottom: window.scrollY + rect.bottom,
  };
};

const cardPath = (card: MeasuredRect) =>
  `M ${card.left} ${card.top} H ${card.right} V ${card.bottom} H ${card.left} V ${card.top}`;

const parentSectionFor = (node: BusNode, sections: BusSection[]) =>
  [...sections]
    .filter((section) => section.y <= node.y + 1)
    .sort((a, b) => b.y - a.y)[0];

export default function DataBus() {
  const pathname = usePathname();
  const [layout, setLayout] = useState<LayoutState | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [packetRun, setPacketRun] = useState<number | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener?.("change", updateMotion);

    let frame = 0;

    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (window.innerWidth < 900) {
          setLayout(null);
          return;
        }

        const startElement = document.querySelector<HTMLElement>("[data-bus-start]");
        const cardElement = document.querySelector<HTMLElement>("[data-bus-card]");
        const containerElement = document.querySelector<HTMLElement>("[data-bus-container]");

        if (!startElement || !cardElement || !containerElement) {
          setLayout(null);
          return;
        }

        const startRect = startElement.getBoundingClientRect();
        const card = toDocumentRect(cardElement);
        const container = containerElement.getBoundingClientRect();
        const start = {
          x: startRect.left + startRect.width / 2,
          y: window.scrollY + startRect.top + startRect.height / 2,
        };

        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bus-section]"))
          .map((element) => ({
            id: element.dataset.busSection || element.id,
            y: window.scrollY + element.getBoundingClientRect().top,
          }))
          .filter((section) => Boolean(section.id));

        const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-bus-node]"))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            const centered = element.dataset.busPosition === "center";
            return {
              id: element.dataset.busNode || "node",
              x: centered ? rect.left + rect.width / 2 : rect.left,
              y: window.scrollY + (centered ? rect.top + rect.height / 2 : rect.top),
            };
          })
          .filter((node) => node.x > start.x + 8);

        setLayout({
          width: window.innerWidth,
          height: document.documentElement.scrollHeight,
          busX: start.x,
          contentRight: container.right,
          start,
          heroCard: card,
          nodes,
          sections,
        });
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const secondMeasure = window.setTimeout(measure, 600);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(secondMeasure);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      media.removeEventListener?.("change", updateMotion);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/" || reducedMotion || !layout) {
      setPacketRun(null);
      return;
    }

    const firstPacket = window.setTimeout(() => setPacketRun(0), 2600);
    const interval = window.setInterval(
      () => setPacketRun((run) => (run === null ? 0 : run + 1)),
      PACKET_INTERVAL_MS
    );

    return () => {
      window.clearTimeout(firstPacket);
      window.clearInterval(interval);
    };
  }, [pathname, reducedMotion, Boolean(layout)]);

  const packetTargets = useMemo(() => {
    if (!layout) return [];
    return layout.nodes.filter((node) =>
      /project|capability|founder|lab|note|contact/.test(node.id)
    );
  }, [layout]);

  const packetPath = useMemo(() => {
    if (!layout || packetRun === null || packetTargets.length === 0) return null;

    const target = packetTargets[packetRun % packetTargets.length];
    const section = parentSectionFor(target, layout.sections);
    const { start, heroCard, busX } = layout;
    const targetSectionY = section?.y ?? target.y;

    return [
      `M ${start.x} ${start.y}`,
      `H ${heroCard.left}`,
      `V ${heroCard.top}`,
      `H ${heroCard.right}`,
      `V ${heroCard.bottom}`,
      `H ${heroCard.left}`,
      `H ${busX}`,
      `V ${targetSectionY}`,
      `H ${target.x}`,
      `V ${target.y}`,
    ].join(" ");
  }, [layout, packetRun, packetTargets]);

  if (pathname !== "/" || !layout) return null;

  const trunkStartY = layout.start.y;
  const trunkEndY = Math.max(
    layout.heroCard.bottom,
    ...layout.sections.map((section) => section.y),
    ...layout.nodes.map((node) => node.y)
  );

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20 hidden min-[900px]:block"
      width={layout.width}
      height={layout.height}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      style={{ width: "100%", height: layout.height }}
    >
      <g fill="none" stroke="var(--kodara-red)" strokeWidth="1.15" strokeLinecap="square">
        <path d={`M ${layout.busX} ${trunkStartY} V ${trunkEndY}`} opacity="0.62" />

        <path
          d={`M ${layout.start.x} ${layout.start.y} H ${layout.heroCard.left} V ${layout.heroCard.top}`}
          opacity="0.78"
        />
        <path d={cardPath(layout.heroCard)} opacity="0.86" />
        <path
          d={`M ${layout.heroCard.left} ${layout.heroCard.bottom} H ${layout.busX}`}
          opacity="0.78"
        />

        {layout.sections.map((section) => (
          <path
            key={`section-${section.id}`}
            d={`M ${layout.busX} ${section.y} H ${layout.contentRight}`}
            opacity="0.5"
          />
        ))}

        {layout.nodes.map((node) => {
          const section = parentSectionFor(node, layout.sections);
          if (!section) return null;
          return (
            <path
              key={`branch-${node.id}`}
              d={`M ${node.x} ${section.y} V ${node.y}`}
              opacity="0.42"
            />
          );
        })}
      </g>

      <g fill="var(--kodara-red)">
        <rect x={layout.start.x - 5} y={layout.start.y - 5} width="10" height="10" />
        <rect x={layout.heroCard.left - 4} y={layout.heroCard.top - 4} width="8" height="8" />

        {layout.sections.map((section) => (
          <rect
            key={`junction-${section.id}`}
            x={layout.busX - 3.5}
            y={section.y - 3.5}
            width="7"
            height="7"
          />
        ))}

        {layout.nodes.map((node) => {
          const section = parentSectionFor(node, layout.sections);
          if (!section) return null;
          return (
            <g key={`node-${node.id}`}>
              <rect x={node.x - 3} y={section.y - 3} width="6" height="6" />
              <rect x={node.x - 4} y={node.y - 4} width="8" height="8" />
            </g>
          );
        })}

        {!reducedMotion && packetPath && packetRun !== null && (
          <rect key={`packet-${packetRun}`} x="-5" y="-5" width="10" height="10">
            <animateMotion
              path={packetPath}
              dur={`${PACKET_DURATION_SECONDS}s`}
              begin="0s"
              fill="remove"
              calcMode="linear"
            />
          </rect>
        )}
      </g>
    </svg>
  );
}
