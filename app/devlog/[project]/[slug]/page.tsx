import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllDevlogPosts,
  getDevlogPost,
  getDevlogProject,
  formatDevlogDate,
} from "@/lib/devlog";
import { DevlogBreadcrumb } from "@/components/devlog/DevlogBreadcrumb";
import { MdxContent } from "@/components/devlog/MdxContent";
import { getDevlogMdxComponents } from "@/components/devlog/mdxComponents";

interface Props {
  params: { project: string; slug: string };
}

export function generateStaticParams() {
  return getAllDevlogPosts().map((post) => ({
    project: post.projectSlug,
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getDevlogPost(params.project, params.slug);
  if (!post) return {};

  const url = `/devlog/${params.project}/${params.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function DevlogPostPage({ params }: Props) {
  const post = getDevlogPost(params.project, params.slug);
  if (!post) notFound();
  const project = getDevlogProject(params.project);
  if (!project) notFound();

  return (
    <article>
      <DevlogBreadcrumb
        crumbs={[
          { label: "Devlog", href: "/devlog" },
          { label: project.title, href: `/devlog/${project.slug}` },
          { label: post.title },
        ]}
      />
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        {post.title}
      </h1>
      <time dateTime={post.date} className="mt-3 block font-mono text-xs text-muted">
        {formatDevlogDate(post.date)}
      </time>
      <div className="prose prose-sm sm:prose-base mt-10 max-w-none">
        <MdxContent
          source={post.content}
          components={getDevlogMdxComponents(project.slug, post.slug)}
        />
      </div>
    </article>
  );
}
