import { BuildingProject } from "@/lib/types";

export const buildingProjects: BuildingProject[] = [
  {
    id: "reflect",
    title: "Reflect",
    description:
      "A tray-only desktop journal that interrupts you once a day, at a time you chose, and offers a blank page. Everything it keeps is a plain text file on your own machine.",
    technologies: ["Rust", "Tauri", "Windows"],
    github: "https://github.com/alexfrankcodes/reflect",
  },
];
