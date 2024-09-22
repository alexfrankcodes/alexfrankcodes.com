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
    className="bg-muted dark:bg-muted-dark rounded-lg p-6 flex flex-col justify-between text-foreground dark:text-muted-foreground-dark"
    whileHover={{ scale: 1.05, y: 1, x: -1 }}
  >
    <div className="flex flex-col justify-between">
      <h3 className="text-2xl font-bold mb-2 ">{title}</h3>
      <p className="text-muted-foreground dark:text-muted-foreground-dark mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="dark:bg-primary bg-gray-400 text-foreground dark:text-foreground-dark px-3 py-1 rounded-full text-sm"
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
          rel="noopener noreferrer"
          className="text-accent dark:text-accent-dark inline-flex items-center"
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
        <p className=" cursor-pointer">Demo N/A</p>
      )}
      {github && (
        <Link
          href={github}
          target="_blank"
          className=" text-gray-500 hover:text-black dark:text-muted-foreground-dark dark:hover:text-gray-400 transition-colors flex items-center"
        >
          View Source <FaGithub className=" ml-2" />
        </Link>
      )}
    </div>
  </motion.div>
);

export default ProjectCard;
