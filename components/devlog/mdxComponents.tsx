import type { MDXComponents } from "mdx/types";
import { createDevlogImg } from "@/components/devlog/DevlogImg";
import { YouTube } from "@/components/devlog/DevlogYouTube";

// The catalog of embeds a post can use. Add a new interactive component here
// (and build it under components/devlog/) to make it available in MDX.
export function getDevlogMdxComponents(
  projectSlug: string,
  postSlug: string
): MDXComponents {
  return {
    Img: createDevlogImg(projectSlug, postSlug),
    YouTube,
  };
}
