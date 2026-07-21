import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { createDevlogImg } from "@/components/devlog/DevlogImg";
import { YouTube } from "@/components/devlog/DevlogYouTube";

// The catalog of embeds a post can use. Add a new interactive component here
// (and build it under components/devlog/) to make it available in MDX.
export function getDevlogMdxComponents(
  projectSlug: string,
  postSlug: string
): MDXRemoteProps["components"] {
  return {
    Img: createDevlogImg(projectSlug, postSlug),
    YouTube,
  };
}
