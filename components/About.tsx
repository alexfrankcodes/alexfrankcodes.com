import Image from "next/image";
import pro from "@/public/img/pro.png";
import { skills } from "@/data/skills";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";

const About = () => (
  <Section id={SECTION_IDS.about} title="About">
    <div className="flex flex-col-reverse sm:flex-row sm:items-start gap-8">
      <div className="space-y-4 text-muted leading-relaxed">
        <p>
          Hi there! My name is Alex. I{"'"}m currently working as a Software
          Engineer for Southwest Airlines! ✈ I work remotely from San Jose,
          CA.
        </p>
        <p>
          I{"'"}m passionate about building accessible, performant web apps
          with a focus on user experience. I{"'"}m experienced with modern web
          technologies including React, Next.js, and GraphQL.
        </p>
        <p>
          When I{"'"}m not hacking away at code, you can find me exploring new
          hiking trails, spending time with my friends and family, reading, or
          playing video games.
        </p>
      </div>
      <Image
        src={pro}
        alt="Alex Frank"
        priority
        className="w-24 h-24 rounded-full object-cover border border-border shrink-0"
      />
    </div>
    <p className="mt-10 font-mono text-sm text-muted">
      <span className="text-foreground">Working with</span>{" "}
      {skills.join(" · ")} · and many more
    </p>
  </Section>
);

export default About;
