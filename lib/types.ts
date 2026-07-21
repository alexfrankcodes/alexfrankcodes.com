export interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export interface BuildingProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  /* absent link = not live yet; rendered as "Coming soon" */
  github?: string;
  devLog?: string;
  demo?: string;
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
