import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "name-walker",
    title: "Name Walker",
    description:
      "An application that takes in a name, converts it into a number, and generates a random walk using that number as a seed.",
    referenceLink: {
      label: "Learn more about random walks",
      href: "https://en.wikipedia.org/wiki/Random_walk",
    },
    technologies: ["React", "p5.js"],
    link: "https://alexfrankcodes.github.io/name-walker/",
    github: "https://github.com/alexfrankcodes/name-walker",
  },
  {
    id: "rainbow-sorts",
    title: "Rainbow Sorts",
    description:
      "Visualizations of sorting algorithms through rainbows. Arcs of various colors are drawn and sorted by their hue value.",
    technologies: ["HTML", "CSS", "p5.js"],
    link: "https://alexfrankcodes.github.io/rainbow-sorts/",
    github: "https://github.com/alexfrankcodes/rainbow-sorts",
  },
  {
    id: "galaxy-fighter",
    title: "Galaxy Fighter",
    description:
      "A 2D arcade shooter game built in C++ with OpenFrameworks. The player controls a spaceship and defends against incoming enemy ships and asteroids.",
    technologies: ["C++", "OpenFrameworks"],
    github: "https://github.com/alexfrankcodes/arcade-shooter",
  },
  {
    id: "devchat",
    title: "DevChat",
    description:
      "A chat application for developers. Users can enter a username and chatroom to have real-time discussions.",
    technologies: ["React", "TypeScript", "Express", "Socket.io"],
    github: "https://github.com/alexfrankcodes/devchat",
  },
];
