import Avatar from "@/components/about/Avatar";
import Skills from "@/components/about/Skills";
import { SECTION_IDS } from "@/data/navigation";

const About = () => {
  return (
    <section
      id={SECTION_IDS.about}
      className="relative text-foreground section-padding"
    >
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:space-x-16 items-center">
          <div className="lg:w-2/3">
            <h2 className="text-4xl md:text-5xl font-display italic mb-8 text-foreground text-center lg:text-start">
              About Me
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Hi there! My name is Alex. I{"'"}m currently working as a Software
                Engineer for Southwest Airlines! ✈ I work remotely from San Jose,
                CA.
              </p>
              <p>
                I{"'"}m passionate about building accessible, performant web apps
                with a focus on user experience. I{"'"}m experienced with modern
                web technologies including React, Next.js, and GraphQL.
              </p>
              <p>
                When I{"'"}m not hacking away at code, you can find me exploring
                new hiking trails, spending time with my friends and family,
                reading, or playing video games.
              </p>
            </div>
          </div>
          <div className="lg:w-1/3 flex flex-col items-center ml-4">
            <Avatar />
          </div>
        </div>
        <Skills />
      </div>
    </section>
  );
};

export default About;
