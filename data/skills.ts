import { Skill } from "@/lib/types";
import { FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiGraphql,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const skills: Skill[] = [
  { id: "react", icon: FaReact, name: "React", colorClass: "text-blue-400" },
  {
    id: "nextjs",
    icon: SiNextdotjs,
    name: "Next.js",
    colorClass: "text-foreground",
  },
  {
    id: "tailwind",
    icon: SiTailwindcss,
    name: "Tailwind",
    colorClass: "text-teal-400",
  },
  {
    id: "typescript",
    icon: SiTypescript,
    name: "TypeScript",
    colorClass: "text-blue-500",
  },
  { id: "nodejs", icon: FaNodeJs, name: "Node.js", colorClass: "text-green-500" },
  { id: "graphql", icon: SiGraphql, name: "GraphQL", colorClass: "text-pink-500" },
];
