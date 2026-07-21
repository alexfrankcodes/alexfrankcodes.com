import type { MetadataRoute } from "next";
import { getAllDevlogPosts, getDevlogProjects } from "@/lib/devlog";

const SITE_URL = "https://alexfrankcodes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllDevlogPosts();
  const projects = getDevlogProjects();

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/devlog`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/devlog/${project.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/devlog/${post.projectSlug}/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
