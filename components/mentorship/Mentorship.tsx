import Link from "next/link";
import { SECTION_IDS } from "@/data/navigation";
import { mentorshipAreas } from "@/data/mentorship";
import { MentorshipCard } from "@/components/mentorship/MentorshipCard";

const Mentorship = () => {
  return (
    <section
      id={SECTION_IDS.mentorship}
      className="relative section-padding"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-display italic mb-8 text-foreground text-center lg:text-start">
          Mentorship
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed">
          I{"'"}m passionate about helping the next generation of developers
          grow and succeed. Here are some ways I offer{" "}
          <span className="font-semibold italic text-accent">(100% free!)</span>{" "}
          mentorship to junior engineers and students:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {mentorshipAreas.map((area) => (
            <MentorshipCard key={area.id} {...area} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="mailto:alexfrankcodes@gmail.com?subject=Mentorship Request"
            className="inline-block bg-accent hover:bg-accent-secondary text-white py-3 px-8 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-secondary"
          >
            Hit Me Up!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
