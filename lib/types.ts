export interface NavItem {
  id: string;
  label: string;
  href: string;
  /* set true to keep the item in data but hide it from the rendered nav */
  hidden?: boolean;
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

export interface DevlogProject {
  slug: string;
  title: string;
  description: string;
  draft?: boolean;
}

export interface DevlogPostMeta {
  slug: string;
  projectSlug: string;
  title: string;
  date: string;
  summary: string;
  draft?: boolean;
}

export interface DevlogPost extends DevlogPostMeta {
  content: string;
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
