import Avatar from "./Avatar";
import Skills from "./Skills";

const About = () => {
  return (
    <section
      id="about"
      className="bg-background dark:bg-background-dark text-foreground dark:text-muted-foreground-dark py-82"
    >
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:space-x-12 items-center">
          <div className="lg:w-2/3">
            <h2 className="text-4xl font-bold mb-8 text-foreground dark:text-foreground-dark text-center lg:text-start">
              About Me
            </h2>
            <p className="mb-4 mr-4">
              Hi there! My name is Alex. I{"'"}m currently working as a Software
              Engineer for Southwest Airlines! ✈ I work remotely from San Jose,
              CA.
            </p>
            <p className="mb-4 mr-4">
              I{"'"}m passionate about building accessible, performant web apps
              with a focus on user experience. I{"'"}m experienced with modern
              web technologies including React, Next.js, and GraphQL.
            </p>
            <p className="mb-4 mr-4">
              When I{"'"}m not hacking away at code, you can find me exploring
              new hiking trails, spending time with my friends and family,
              reading, or playing video games.
            </p>
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
