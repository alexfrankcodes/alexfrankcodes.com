import { IconType } from "react-icons";

export interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  referenceLink?: {
    label: string;
    href: string;
  };
  link?: string;
  github?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: IconType;
  colorClass: string;
}

export interface MentorshipArea {
  id: string;
  title: string;
  description: string;
  icon: IconType;
}

export interface SocialLink {
  id: string;
  href: string;
  icon: IconType;
  label: string;
}
