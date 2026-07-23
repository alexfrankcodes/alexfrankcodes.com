import Image from "next/image";
import pro from "@/public/img/pro.png";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";

const About = () => (
  <Section id={SECTION_IDS.about} title="About">
    <div className="flex flex-col-reverse sm:flex-row sm:items-start gap-8">
      <div className="space-y-4 text-muted leading-relaxed">
        <p>
          Hi there! My name is Alex. I{"'"}m a software engineer at Southwest
          Airlines, working remotely from San Jose, CA.
        </p>
        <p>
          I care about building software that{"'"}s fast, reliable,
          accessible, and pleasant to use.
        </p>
        <p>
          When I{"'"}m not writing code, you can find me hiking,
          reading, traveling, learning, playing video games, or spending time with friends and
          family.
        </p>
      </div>
      <div className="relative shrink-0 self-center sm:self-start">
        <div
          className="absolute -inset-2 rounded-full border border-dashed border-accent/40 animate-orbit"
          aria-hidden="true"
        />
        <Image
          src={pro}
          alt="Alex Frank"
          priority
          className="w-24 h-24 rounded-full object-cover border border-border"
        />
      </div>
    </div>
  </Section>
);

export default About;
