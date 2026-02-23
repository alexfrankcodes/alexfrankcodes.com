import { SECTION_IDS } from "@/data/navigation";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

const FeaturedProjects = () => {
  return (
    <section
      id={SECTION_IDS.projects}
      className="relative section-padding"
    >
      {/* Dot grid background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-display italic mb-12 text-foreground text-center lg:text-start">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
