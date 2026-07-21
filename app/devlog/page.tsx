import type { Metadata } from "next";
import Link from "next/link";
import { getAllDevlogPosts, getDevlogProjects, formatDevlogDate } from "@/lib/devlog";

const DESCRIPTION =
  "Process notes from projects Alex is building — decisions, dead ends, and how things actually got made.";

export const metadata: Metadata = {
  title: "Devlog",
  description: DESCRIPTION,
  alternates: {
    canonical: "/devlog",
    types: { "application/rss+xml": "/devlog/feed.xml" },
  },
  openGraph: {
    title: "Devlog",
    description: DESCRIPTION,
    url: "/devlog",
    type: "website",
  },
};

export default function DevlogIndexPage() {
  const posts = getAllDevlogPosts();
  const projects = getDevlogProjects();
  const projectTitle = (slug: string) =>
    projects.find((project) => project.slug === slug)?.title ?? slug;

  return (
    <div>
      <h1 className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-10">
        Devlog
      </h1>
      {posts.length === 0 ? (
        <div className="fade-rise">
          <p className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Coming Soon!
          </p>
          <p className="mt-3 max-w-md text-muted leading-relaxed">
            Process notes from projects in progress — decisions, dead ends, and
            how things actually got made. First entries are on the way.
          </p>
        </div>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li
              key={`${post.projectSlug}/${post.slug}`}
              className="border-b border-border pb-8 last:border-0"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs text-muted">
                <time dateTime={post.date}>{formatDevlogDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <Link
                  href={`/devlog/${post.projectSlug}`}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {projectTitle(post.projectSlug)}
                </Link>
              </div>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
                <Link
                  href={`/devlog/${post.projectSlug}/${post.slug}`}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-muted leading-relaxed">{post.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
