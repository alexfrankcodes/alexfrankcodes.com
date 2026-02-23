import { SECTION_IDS } from "@/data/navigation";
import SocialLinks from "@/components/common/SocialLinks";

const Contact = () => {
  return (
    <section
      id={SECTION_IDS.contact}
      className="relative section-padding"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-4xl md:text-5xl font-display italic mb-8 text-foreground">
          Get in Touch
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          I{"'"}m always open to new opportunities, collaborations, and
          mentorship requests. Feel free to reach out!
        </p>
        <SocialLinks size={28} />
      </div>
    </section>
  );
};

export default Contact;
