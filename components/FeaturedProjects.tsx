"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string | JSX.Element;
  technologies: string[];
  link?: string;
  github?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  link,
  github,
}: ProjectCardProps) => (
  <motion.div
    className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between"
    whileHover={{ scale: 1.05, y: 1, x: -1 }}
  >
    <div className="flex flex-col justify-between">
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
    <div className="flex justify-between">
      {link ? (
        <Link
          href={link}
          target="_blank"
          className="text-pink-400 hover:text-pink-500 transition-colors inline-flex items-center"
        >
          View Project
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      ) : (
        <p className="text-gray-500 cursor-pointer">Demo N/A</p>
      )}
      {github && (
        <Link
          href={github}
          target="_blank"
          className="text-gray-400 hover:text-gray-300 transition-colors flex items-center"
        >
          View Source <FaGithub className="text-white ml-2" />
        </Link>
      )}
    </div>
  </motion.div>
);

const FeaturedProjects = () => {
  const projects = [
    {
      title: "Name Walker",
      description: (
        <>
          An application that takes in a name, converts it into a number, and
          generates a random walk using that number as a seed. The end result is
          a unique{" "}
          <a
            className="font-bold text-pink-300 hover:text-pink-400"
            href="https://en.wikipedia.org/wiki/Random_walk"
            target="_blank"
          >
            random walk
          </a>{" "}
          specific to each user{"'"}s name.,
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
    <section id="projects" className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white text-center lg:text-start">
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
