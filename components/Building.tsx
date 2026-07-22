import { buildingProjects } from "@/data/building";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";
import BuildingCard from "@/components/BuildingCard";

const Building = () => (
  <Section id={SECTION_IDS.building} title="Building">
    <ul className="space-y-16">
      {buildingProjects.map((project) => (
        <BuildingCard key={project.id} project={project} />
      ))}
    </ul>
  </Section>
);

export default Building;
