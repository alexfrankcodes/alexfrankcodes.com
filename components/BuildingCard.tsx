"use client";

import { useState } from "react";
import Link from "next/link";
import { BuildingProject } from "@/lib/types";
import CardContourGlow from "@/components/CardContourGlow";

const LINK_SLOTS = [
  { key: "github", label: "GitHub", external: true },
  { key: "devLog", label: "Dev Log", external: false },
  { key: "demo", label: "Demo", external: true },
] as const;

const BuildingCard = ({ project }: { project: BuildingProject }) => {
  const [active, setActive] = useState(false);

  return (
    <li
      className="group relative"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setActive(false);
        }
      }}
    >
      {/* halo: painted before the card in DOM order, so the card's opaque
          background covers it everywhere except the bled-out edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[42px] sm:-inset-[62px] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          maskImage:
            "radial-gradient(closest-side, black 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, black 55%, transparent 100%)",
        }}
      >
        {active && <CardContourGlow />}
      </div>
      <div className="relative rounded-lg border border-border bg-surface p-6 sm:p-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:z-10 group-hover:scale-[1.02]">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-3 text-muted leading-relaxed">
          {project.description}
        </p>
        <p className="mt-4 font-mono text-xs text-muted">
          {project.technologies.join(" · ")}
        </p>
        <ul className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-2 font-mono text-sm">
          {LINK_SLOTS.map((slot) => ({ ...slot, href: project[slot.key] }))
            .sort((a, b) => Number(Boolean(a.href)) - Number(Boolean(b.href)))
            .map(({ key, label, external, href }) => (
              <li key={key}>
                {href ? (
                  external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                    >
                      {label} ↗
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                    >
                      {label}
                    </Link>
                  )
                ) : (
                  <span className="flex flex-col items-center gap-1.5 text-muted/60 cursor-not-allowed select-none">
                    {label}
                    <span className="rounded border border-accent/40 bg-accent/10 px-1.5 py-px text-[0.55rem] leading-relaxed uppercase tracking-[0.12em] text-accent">
                      coming soon
                    </span>
                  </span>
                )}
              </li>
            ))}
        </ul>
      </div>
    </li>
  );
};

export default BuildingCard;
