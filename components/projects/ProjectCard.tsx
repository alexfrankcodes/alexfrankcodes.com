"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/types";

interface ProjectCardProps extends Project {
  index: number;
}

const ProjectCard = ({
  title,
  description,
  referenceLink,
  technologies,
  link,
  github,
  index,
}: ProjectCardProps) => (
  <motion.div
    className={cn(
      "group relative glass rounded-xl p-6 flex flex-col justify-between",
      "text-foreground transition-shadow duration-300",
      "hover:shadow-[0_8px_30px_rgb(var(--accent)/0.12)]"
    )}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.02, y: -2 }}
  >
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="flex flex-col justify-between">
      <h3 className="text-2xl font-display italic mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 text-[15px] leading-relaxed">{description}</p>
      {referenceLink ? (
        <Link
          href={referenceLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:text-accent-secondary transition-colors mb-4 inline-block"
        >
          {referenceLink.label}
        </Link>
      ) : null}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={`${title}-${tech}`}
            className="bg-background/80 border border-border/60 text-muted-foreground px-3 py-1 rounded-full text-xs tracking-wide"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
    <div className="flex justify-between items-center pt-2 border-t border-border/40">
      {link ? (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent inline-flex items-center hover:text-accent-secondary transition-colors text-sm font-medium"
        >
          View Project
          <svg
            className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5"
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
        <p className="text-muted-foreground text-sm">Demo N/A</p>
      )}
      {github && (
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center text-sm"
        >
          Source <FaGithub className="ml-1.5" />
        </Link>
      )}
    </div>
  </motion.div>
);

export default ProjectCard;
