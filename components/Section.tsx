import Reveal from "@/components/Reveal";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} className="py-14 sm:py-16 border-t border-border">
    <Reveal>
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-10">
        {title}
      </h2>
      {children}
    </Reveal>
  </section>
);

export default Section;
