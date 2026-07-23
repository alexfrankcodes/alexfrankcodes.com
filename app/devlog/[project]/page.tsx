import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDevlogProject,
  getDevlogProjects,
  getPostsForProject,
  formatDevlogDate,
} from "@/lib/devlog";
import { DevlogBreadcrumb } from "@/components/devlog/DevlogBreadcrumb";

interface Props {
  params: Promise<{ project: string }>;
}

export function generateStaticParams() {
  return getDevlogProjects().map((project) => ({ project: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: projectSlug } = await params;
  const project = getDevlogProject(projectSlug);
  if (!project) return {};

  const title = `${project.title} Devlog`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/devlog/${project.slug}` },
    openGraph: {
      title,
      description: project.description,
      url: `/devlog/${project.slug}`,
      type: "website",
    },
  };
}

export default async function DevlogProjectPage({ params }: Props) {
  const { project: projectSlug } = await params;
  const project = getDevlogProject(projectSlug);
  if (!project) notFound();
  const posts = getPostsForProject(project.slug);

  return (
    <div>
      <DevlogBreadcrumb
        crumbs={[{ label: "Devlog", href: "/devlog" }, { label: project.title }]}
      />
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-3 max-w-column text-muted leading-relaxed">
        {project.description}
      </p>

      <ul className="mt-10 space-y-8">
        {posts.length === 0 ? (
          <li className="text-muted">No entries yet.</li>
        ) : (
          posts.map((post) => (
            <li
              key={post.slug}
              className="border-b border-border pb-8 last:border-0"
            >
              <time dateTime={post.date} className="font-mono text-xs text-muted">
                {formatDevlogDate(post.date)}
              </time>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
                <Link
                  href={`/devlog/${project.slug}/${post.slug}`}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-muted leading-relaxed">{post.summary}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
