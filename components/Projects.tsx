import { projects } from "@/data/projects";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";

const Projects = () => (
  <Section id={SECTION_IDS.projects} title="Projects">
    <ul className="space-y-12">
      {projects.map((project) => (
        <li key={project.id}>
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                {project.title} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              project.title
            )}
          </h3>
          <p className="mt-2 text-muted leading-relaxed">
            {project.description}
            {project.referenceLink && (
              <>
                {" "}
                <a
                  href={project.referenceLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  {project.referenceLink.label}
                </a>
              </>
            )}
          </p>
          <p className="mt-3 font-mono text-xs text-muted">
            {project.technologies.join(" · ")}
            {project.github && (
              <>
                {" — "}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  source ↗
                </a>
              </>
            )}
          </p>
        </li>
      ))}
    </ul>
  </Section>
);

export default Projects;
