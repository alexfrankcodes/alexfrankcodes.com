import { BuildingProject } from "@/lib/types";

export const buildingProjects: BuildingProject[] = [
  {
    id: "reflect",
    title: "Reflect",
    description:
      "A lightweight desktop journaling app for Windows. It sits in the system tray and reminds you once a day, at a time you choose, to write. Entries are saved as plain text files on your own machine. Built in Rust with Tauri.",
    technologies: ["Rust", "Tauri"],
    icon: "/img/reflect.svg",
    github: "https://github.com/alexfrankcodes/reflect",
  },
  {
    id: "sunrise",
    title: "Sunrise",
    description:
      "A straightforward agent harness for running your engineering tasks. You write the day's work as a markdown file, one task per heading, and Sunrise kicks off an agent for each task in its own git worktree and branch, in parallel. A local web cockpit shows the day's board live and surfaces any task that needs your input. Built in TypeScript with React and the Claude Agent SDK.",
    technologies: ["TypeScript", "React", "Claude Agent SDK"],
    icon: "/img/sunrise.svg",
    github: "https://github.com/alexfrankcodes/sunrise",
  },
];
