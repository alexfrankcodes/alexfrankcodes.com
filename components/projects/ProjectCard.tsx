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
        <p className="text-gray-200 cursor-pointer">Demo N/A</p>
      )}
      {github && (
        <Link
          href={github}
          target="_blank"
          className="text-gray-200 hover:text-gray-300 transition-colors flex items-center"
        >
          View Source <FaGithub className="text-white ml-2" />
        </Link>
      )}
    </div>
  </motion.div>
);

export default ProjectCard;
