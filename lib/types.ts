export interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export type ProjectSketchKind = "walk" | "sort" | "ship" | "chat";

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
  sketch?: ProjectSketchKind;
}

export interface MentorshipArea {
  id: string;
  title: string;
  description: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}
