import { mentorshipAreas } from "@/data/mentorship";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";

const Mentorship = () => (
  <Section id={SECTION_IDS.mentorship} title="Mentorship">
    <p className="text-muted leading-relaxed max-w-lg">
      I{"'"}m passionate about helping the next generation of developers grow
      and succeed. I offer{" "}
      <span className="text-accent">100% free</span> mentorship to junior
      engineers and students:
    </p>
    <ul className="mt-10 space-y-8">
      {mentorshipAreas.map((area) => (
        <li key={area.id} className="border-l border-border pl-5">
          <h3 className="font-display font-semibold tracking-tight text-foreground">
            {area.title}
          </h3>
          <p className="mt-1.5 text-muted leading-relaxed">
            {area.description}
          </p>
        </li>
      ))}
    </ul>
    <p className="mt-10 font-mono text-sm">
      <a
        href="mailto:alexfrankcodes@gmail.com?subject=Mentorship Request"
        className="text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        Request mentorship ↗
      </a>
    </p>
  </Section>
);

export default Mentorship;
