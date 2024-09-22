"use client";

import ProjectCard from "./ProjectCard";

const FeaturedProjects = () => {
  const projects = [
    {
      title: "Name Walker",
      // Needs the fragment in order to render the <a> tag
      description: (
        <>
          An application that takes in a name, converts it into a number, and
          generates a random walk using that number as a seed. The end result is
          a unique{" "}
          <a
            className="font-bold text-accent dark:text-pink-500 hover:text-accent-secondary dark:hover:text-pink-600"
            href="https://en.wikipedia.org/wiki/Random_walk"
            target="_blank"
          >
            random walk
          </a>{" "}
          specific to each user{"'"}s name.
        </>
      ),
      technologies: ["React", "p5.js"],
      link: "https://alexfrankcodes.github.io/name-walker/",
      github: "https://github.com/alexfrankcodes/name-walker",
    },
    {
      title: "Rainbow Sorts",
      description:
        "Visualizations of sorting algorithms through rainbows. Arcs of various colors are drawn and then sorted by their hue value(or the 'H' in HSL).",
      technologies: ["HTML", "CSS", "p5.js"],
      link: "https://alexfrankcodes.github.io/rainbow-sorts/",
      github: "https://github.com/alexfrankcodes/rainbow-sorts",
    },
    {
      title: "Galaxy Fighter",
      description:
        "A 2D Arcade Shooter game, built in C++ w/ OpenFrameworks as a part of my Computer Game Design course (CS134 @ SJSU). The player controls a spaceship, and has to fire projectiles to defend against incoming enemy ships and asteroids.",
      technologies: ["C++", "OpenFrameworks"],
      github: "https://github.com/alexfrankcodes/arcade-shooter",
    },
    {
      title: "DevChat",
      description:
        "A chat application for developers. Users can enter a username and chatroom, and have real-time discussions with other users. DevChat is currently deployed across Heroku (back-end) and Netlify (front-end).",
      technologies: ["React", "TypeScript", "Express", "Socket.io"],
      github: "https://github.com/alexfrankcodes/devchat",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-background dark:bg-background-dark py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-foreground dark:text-foreground-dark text-center lg:text-start">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
