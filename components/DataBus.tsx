"use client";

import { usePathname } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";

type Point = { x: number; y: number };
type MeasuredRect = { left: number; right: number; top: number; bottom: number };
type BusNode = Point & { id: string };
type BusSection = { id: string; y: number };
type ProjectRoute = { id: string; rowTop: number; rowBottom: number; card: MeasuredRect };

type LayoutState = {
  width: number;
  height: number;
  contentLeft: number;
  contentRight: number;
  routeX: number;
  start: Point;
  heroCard: MeasuredRect;
  workTop: number;
  projects: ProjectRoute[];
  nodes: BusNode[];
  sections: BusSection[];
  contact: MeasuredRect | null;
  footerEnd: Point | null;
};

const PACKET_INTERVAL_MS = 16000;
const PACKET_DURATION_SECONDS = 11;

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

const lastProjectBottom = (projects: ProjectRoute[], fallback: number) =>
  projects.length > 0 ? projects[projects.length - 1].rowBottom : fallback;

export default function DataBus() {
  const pathname = usePathname();
  const [layout, setLayout] = useState<LayoutState | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [packetRun, setPacketRun] = useState<number | null>(null);
  const hasLayout = Boolean(layout);

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

        const heroCopyElement = document.querySelector<HTMLElement>("[data-bus-hero-copy]");
        const heroTitleElement = document.querySelector<HTMLElement>("[data-bus-hero-title]");
        const heroCardElement = document.querySelector<HTMLElement>("[data-bus-card]");
        const workElement = document.querySelector<HTMLElement>("#work");
        const workHeadingElement = document.querySelector<HTMLElement>("[data-bus-work-heading]");
        const workContainerElement = document.querySelector<HTMLElement>("[data-bus-work-container]");
        const contactElement = document.querySelector<HTMLElement>("#contact");
        const footerEndElement = document.querySelector<HTMLElement>("[data-bus-end]");

        if (!heroCopyElement || !heroTitleElement || !heroCardElement || !workElement || !workHeadingElement || !workContainerElement) {
          setLayout(null);
          return;
        }

        const heroCopy = toDocumentRect(heroCopyElement);
        const heroTitle = toDocumentRect(heroTitleElement);
        const heroCard = toDocumentRect(heroCardElement);
        const work = toDocumentRect(workElement);
        const workHeading = toDocumentRect(workHeadingElement);
        const workContainer = toDocumentRect(workContainerElement);
        const gapWidth = Math.max(24, heroCard.left - heroCopy.right);

        const start = {
          x: heroCopy.right + gapWidth * 0.5,
          y: heroTitle.top + 14,
        };

        const routeX = Math.max(18, workHeading.left - 20);

        const projects = Array.from(document.querySelectorAll<HTMLElement>("[data-bus-project-row]"))
          .map((row) => {
            const id = row.dataset.busProjectRow;
            if (!id) return null;
            const card = document.querySelector<HTMLElement>(`[data-bus-project-card="${id}"]`);
            if (!card) return null;
            const rowRect = toDocumentRect(row);
            return {
              id,
              rowTop: rowRect.top,
              rowBottom: rowRect.bottom,
              card: toDocumentRect(card),
            };
          })
          .filter((project): project is ProjectRoute => Boolean(project));

        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bus-section]"))
          .map((element) => ({
            id: element.dataset.busSection || element.id,
            y: window.scrollY + element.getBoundingClientRect().top,
          }))
          .filter((section) => Boolean(section.id) && section.id !== "work");

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
          .filter((node) => !node.id.startsWith("project-") && node.id !== "contact");

        const contact = contactElement ? toDocumentRect(contactElement) : null;

        const footerEnd = footerEndElement
          ? (() => {
              const rect = footerEndElement.getBoundingClientRect();
              return {
                x: rect.left + rect.width / 2,
                y: window.scrollY + rect.top + rect.height / 2,
              };
            })()
          : null;

        setLayout({
          width: window.innerWidth,
          height: document.documentElement.scrollHeight,
          contentLeft: workContainer.left,
          contentRight: workContainer.right,
          routeX,
          start,
          heroCard,
          workTop: work.top,
          projects,
          nodes,
          sections,
          contact,
          footerEnd,
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
    if (pathname !== "/" || reducedMotion || !hasLayout) {
      setPacketRun(null);
      return;
    }

    const firstPacket = window.setTimeout(() => setPacketRun(0), 3200);
    const interval = window.setInterval(
      () => setPacketRun((run) => (run === null ? 0 : run + 1)),
      PACKET_INTERVAL_MS
    );

    return () => {
      window.clearTimeout(firstPacket);
      window.clearInterval(interval);
    };
  }, [pathname, reducedMotion, hasLayout]);

  const mainPath = useMemo(() => {
    if (!layout) return null;

    const { start, heroCard, workTop, routeX, projects, sections, contentRight, footerEnd } = layout;
    const parts = [
      `M ${start.x} ${start.y}`,
      `V ${heroCard.top}`,
      `H ${heroCard.left}`,
      `H ${heroCard.right}`,
      `V ${heroCard.bottom}`,
      `H ${heroCard.left}`,
      `V ${workTop}`,
      `H ${routeX}`,
    ];

    projects.forEach((project) => {
      parts.push(
        `V ${project.rowTop}`,
        `H ${project.card.left}`,
        `V ${project.card.top}`,
        `H ${project.card.right}`,
        `V ${project.card.bottom}`,
        `H ${project.card.left}`,
        `V ${project.rowBottom}`,
        `H ${routeX}`
      );
    });

    const lowerSections = sections
      .filter((section) => section.y > lastProjectBottom(projects, workTop))
      .sort((a, b) => a.y - b.y);

    if (lowerSections.length > 0) {
      parts.push(`V ${lowerSections[0].y}`, `H ${contentRight}`);
      lowerSections.slice(1).forEach((section) => parts.push(`V ${section.y}`));
    }

    if (footerEnd) {
      parts.push(`V ${footerEnd.y}`, `H ${footerEnd.x}`);
    }

    return parts.join(" ");
  }, [layout]);

  if (pathname !== "/" || !layout || !mainPath) return null;

  const lowerSections = layout.sections
    .filter((section) => section.y > lastProjectBottom(layout.projects, layout.workTop))
    .sort((a, b) => a.y - b.y);

  const regularNodes = layout.nodes.filter(
    (node) => !node.id.startsWith("lab-") && !node.id.startsWith("note-")
  );
  const labNodes = layout.nodes.filter((node) => node.id.startsWith("lab-")).sort((a, b) => a.y - b.y);
  const noteNodes = layout.nodes.filter((node) => node.id.startsWith("note-")).sort((a, b) => a.y - b.y);
  const labSection = lowerSections.find((section) => section.id === "lab");
  const labBusX = labNodes.length > 0 ? Math.max(layout.contentLeft + 8, Math.min(...labNodes.map((node) => node.x)) - 28) : null;
  const firstProjectCardLeft = layout.projects[0]?.card.left ?? layout.contentRight;
  const contactClipId = "kodara-contact-bus-clip";
  const busLinesId = "kodara-bus-lines";
  const busNodesId = "kodara-bus-nodes";

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20 hidden min-[900px]:block"
      width={layout.width}
      height={layout.height}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      style={{ width: "100%", height: layout.height }}
    >
      <defs>
        <g id={busLinesId} fill="none" strokeWidth="1.15" strokeLinecap="square">
          <path d={mainPath} opacity="0.76" />
          <path d={cardPath(layout.heroCard)} opacity="0.9" />

          <path d={`M ${layout.routeX} ${layout.workTop} H ${firstProjectCardLeft}`} opacity="0.56" />

          {layout.projects.map((project) => (
            <g key={`project-${project.id}`}>
              <path d={`M ${layout.routeX} ${project.rowTop} H ${project.card.left}`} opacity="0.48" />
              <path d={`M ${layout.routeX} ${project.rowBottom} H ${project.card.left}`} opacity="0.48" />
              <path d={cardPath(project.card)} opacity="0.84" />
            </g>
          ))}

          {lowerSections.map((section) => (
            <path
              key={`section-${section.id}`}
              d={`M ${layout.contentLeft} ${section.y} H ${layout.contentRight}`}
              opacity="0.46"
            />
          ))}

          {regularNodes.map((node) => {
            const section = parentSectionFor(node, lowerSections);
            if (!section || node.y <= section.y) return null;
            return <path key={`branch-${node.id}`} d={`M ${node.x} ${section.y} V ${node.y}`} opacity="0.36" />;
          })}

          {labSection && labBusX !== null && labNodes.length > 0 && (
            <g>
              <path d={`M ${labBusX} ${labSection.y} V ${labNodes[labNodes.length - 1].y}`} opacity="0.42" />
              {labNodes.map((node) => (
                <path key={`lab-tap-${node.id}`} d={`M ${labBusX} ${node.y} H ${node.x}`} opacity="0.5" />
              ))}
            </g>
          )}

          {noteNodes.map((node) => (
            <path
              key={`note-tap-${node.id}`}
              d={`M ${layout.contentRight} ${node.y} H ${node.x}`}
              opacity="0.5"
            />
          ))}
        </g>

        <g id={busNodesId}>
          <rect x={layout.start.x - 4} y={layout.start.y - 4} width="8" height="8" />
          <rect x={layout.routeX - 3.5} y={layout.workTop - 3.5} width="7" height="7" />

          {layout.projects.map((project) => (
            <Fragment key={`junctions-${project.id}`}>
              <rect x={layout.routeX - 3} y={project.rowTop - 3} width="6" height="6" />
              <rect x={layout.routeX - 3} y={project.rowBottom - 3} width="6" height="6" />
            </Fragment>
          ))}

          {lowerSections.map((section) => (
            <rect
              key={`junction-${section.id}`}
              x={layout.contentRight - 3.5}
              y={section.y - 3.5}
              width="7"
              height="7"
            />
          ))}

          {labSection && labBusX !== null && (
            <rect x={labBusX - 3} y={labSection.y - 3} width="6" height="6" />
          )}

          {noteNodes.map((node) => (
            <rect
              key={`note-junction-${node.id}`}
              x={layout.contentRight - 3}
              y={node.y - 3}
              width="6"
              height="6"
            />
          ))}
        </g>

        {layout.contact && (
          <clipPath id={contactClipId}>
            <rect
              x="0"
              y={layout.contact.top}
              width={layout.width}
              height={Math.max(0, layout.contact.bottom - layout.contact.top)}
            />
          </clipPath>
        )}
      </defs>

      <use href={`#${busLinesId}`} stroke="var(--kodara-red)" />
      <use href={`#${busNodesId}`} fill="var(--kodara-red)" />

      {layout.contact && (
        <>
          <use href={`#${busLinesId}`} stroke="#080808" clipPath={`url(#${contactClipId})`} />
          <use href={`#${busNodesId}`} fill="#080808" clipPath={`url(#${contactClipId})`} />
        </>
      )}

      {!reducedMotion && packetRun !== null && (
        <>
          <rect key={`packet-red-${packetRun}`} x="-5" y="-5" width="10" height="10" fill="var(--kodara-red)">
            <animateMotion
              path={mainPath}
              dur={`${PACKET_DURATION_SECONDS}s`}
              begin="0s"
              fill="remove"
              calcMode="linear"
            />
          </rect>

          {layout.contact && (
            <rect
              key={`packet-black-${packetRun}`}
              x="-5"
              y="-5"
              width="10"
              height="10"
              fill="#080808"
              clipPath={`url(#${contactClipId})`}
            >
              <animateMotion
                path={mainPath}
                dur={`${PACKET_DURATION_SECONDS}s`}
                begin="0s"
                fill="remove"
                calcMode="linear"
              />
            </rect>
          )}
        </>
      )}
    </svg>
  );
}
