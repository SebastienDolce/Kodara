"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type BusNode = {
  id: string;
  y: number;
  x: number;
};

type LayoutState = {
  height: number;
  busX: number;
  nodes: BusNode[];
};

const nodeSelectors = [
  { id: "home", selector: "#home" },
  { id: "work-1", selector: "#work article:nth-of-type(1)" },
  { id: "work-2", selector: "#work article:nth-of-type(2)" },
  { id: "work-3", selector: "#work article:nth-of-type(3)" },
  { id: "services", selector: "#services" },
  { id: "about", selector: "#about" },
  { id: "lab", selector: "#lab" },
  { id: "notes", selector: "#notes" },
  { id: "contact", selector: "#contact" },
];

export default function DataBus() {
  const pathname = usePathname();
  const [layout, setLayout] = useState<LayoutState | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

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

        const busX = Math.max(24, Math.min(42, window.innerWidth * 0.025));
        const nodes = nodeSelectors
          .map(({ id, selector }) => {
            const element = document.querySelector<HTMLElement>(selector);
            if (!element) return null;

            const rect = element.getBoundingClientRect();
            const y = window.scrollY + rect.top + Math.min(96, Math.max(44, rect.height * 0.12));
            const x = Math.max(busX + 18, rect.left - 12);

            return { id, y, x };
          })
          .filter((node): node is BusNode => Boolean(node));

        if (nodes.length < 2) {
          setLayout(null);
          return;
        }

        setLayout({
          height: document.documentElement.scrollHeight,
          busX,
          nodes,
        });
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    const timeout = window.setTimeout(measure, 500);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      media.removeEventListener?.("change", updateMotion);
    };
  }, [pathname]);

  const geometry = useMemo(() => {
    if (!layout) return null;
    const first = layout.nodes[0];
    const last = layout.nodes[layout.nodes.length - 1];
    return { firstY: first.y, lastY: last.y };
  }, [layout]);

  if (pathname !== "/" || !layout || !geometry) return null;

  const branchPacketNodes = layout.nodes.filter((_, index) => index === 1 || index === 4 || index === 6 || index === 8);

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20 hidden w-full min-[900px]:block"
      width="100%"
      height={layout.height}
      viewBox={`0 0 ${window.innerWidth} ${layout.height}`}
      preserveAspectRatio="none"
      style={{ height: layout.height }}
    >
      <line
        x1={layout.busX}
        x2={layout.busX}
        y1={geometry.firstY}
        y2={geometry.lastY}
        stroke="var(--kodara-red)"
        strokeWidth="1"
        opacity="0.72"
      />

      {layout.nodes.map((node) => (
        <g key={node.id}>
          <line
            x1={layout.busX}
            x2={node.x}
            y1={node.y}
            y2={node.y}
            stroke="var(--kodara-red)"
            strokeWidth="1"
            opacity="0.58"
          />
          <rect x={layout.busX - 3} y={node.y - 3} width="6" height="6" fill="var(--kodara-red)" />
          <rect x={node.x - 4} y={node.y - 4} width="8" height="8" fill="var(--kodara-red)" />
        </g>
      ))}

      {!reducedMotion && (
        <>
          <rect x={layout.busX - 4} y={geometry.firstY - 4} width="8" height="8" fill="var(--kodara-red)">
            <animate
              attributeName="y"
              values={`${geometry.firstY - 4};${geometry.lastY - 4};${geometry.firstY - 4}`}
              dur="18s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x={layout.busX - 3} y={geometry.lastY - 3} width="6" height="6" fill="var(--kodara-red)" opacity="0.65">
            <animate
              attributeName="y"
              values={`${geometry.lastY - 3};${geometry.firstY - 3};${geometry.lastY - 3}`}
              dur="24s"
              repeatCount="indefinite"
            />
          </rect>

          {branchPacketNodes.map((node, index) => (
            <rect key={`packet-${node.id}`} x={layout.busX - 3} y={node.y - 3} width="6" height="6" fill="var(--kodara-red)">
              <animate
                attributeName="x"
                values={`${layout.busX - 3};${node.x - 3};${layout.busX - 3}`}
                dur={`${5.5 + index * 0.8}s`}
                begin={`${index * 1.4}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </>
      )}
    </svg>
  );
}
