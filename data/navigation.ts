import { NavItem } from "@/lib/types";

export const SECTION_IDS = {
  home: "home",
  about: "about",
  projects: "projects",
  mentorship: "mentorship",
  contact: "contact",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: `#${SECTION_IDS.home}` },
  { id: "about", label: "About", href: `#${SECTION_IDS.about}` },
  { id: "projects", label: "Projects", href: `#${SECTION_IDS.projects}` },
  { id: "mentorship", label: "Mentorship", href: `#${SECTION_IDS.mentorship}` },
  { id: "contact", label: "Contact", href: `#${SECTION_IDS.contact}` },
];
