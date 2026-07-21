import { buildingProjects } from "@/data/building";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";

const LINK_SLOTS = [
  { key: "github", label: "Github" },
  { key: "devLog", label: "Dev Log" },
  { key: "demo", label: "Demo" },
] as const;

const Building = () => (
  <Section id={SECTION_IDS.building} title="Building">
    <ul className="space-y-10">
      {buildingProjects.map((project) => (
        <li
          key={project.id}
          className="rounded-lg border border-border bg-surface p-6 sm:p-8"
        >
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-3 text-muted leading-relaxed">
            {project.description}
          </p>
          <p className="mt-4 font-mono text-xs text-muted">
            {project.technologies.join(" · ")}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
            {LINK_SLOTS.map(({ key, label }) => {
              const href = project[key];
              return (
                <li key={key}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                    >
                      {label} ↗
                    </a>
                  ) : (
                    <span
                      className="text-muted/50 cursor-not-allowed select-none"
                      title="Coming soon!"
                    >
                      {label}
                      <span className="sr-only"> (coming soon)</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  </Section>
);

export default Building;
