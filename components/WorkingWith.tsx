import { skills } from "@/data/skills";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";

const WorkingWith = () => (
  <Section id={SECTION_IDS.workingWith} title="Working with">
    <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
      {skills.map((skill) => (
        <li key={skill} className="text-foreground">
          {skill}
        </li>
      ))}
      <li className="text-muted">...and more!</li>
    </ul>
  </Section>
);

export default WorkingWith;
