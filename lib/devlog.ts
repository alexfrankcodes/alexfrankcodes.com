import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { DevlogPost, DevlogPostMeta, DevlogProject } from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content", "devlog");
// Gitignored — drafts live here so they're never committed. Only surfaced
// outside production so a local `next build` (and Vercel, which never has
// this untracked directory in the first place) can't ship one by accident.
const DRAFTS_ROOT = path.join(process.cwd(), "content", "devlog-drafts");

const isProduction = () => process.env.NODE_ENV === "production";

function contentRoots(): string[] {
  return isProduction() ? [CONTENT_ROOT] : [CONTENT_ROOT, DRAFTS_ROOT];
}

function readDirNames(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function isPublished(meta: { draft?: boolean }): boolean {
  return !meta.draft || !isProduction();
}

// A project/post can only live under one root at a time (drafts get moved,
// not duplicated), so first root that has the slug wins.
function findRootFor(...segments: string[]): string | null {
  return (
    contentRoots().find((root) => fs.existsSync(path.join(root, ...segments))) ??
    null
  );
}

export function getDevlogProjects(): DevlogProject[] {
  const slugs = Array.from(
    new Set(contentRoots().flatMap((root) => readDirNames(root)))
  );
  return slugs
    .map((slug) => {
      const root = findRootFor(slug, "_project.mdx");
      if (!root) return null;
      const metaPath = path.join(root, slug, "_project.mdx");
      const { data } = matter(fs.readFileSync(metaPath, "utf8"));
      const project: DevlogProject = {
        slug,
        title: data.title as string,
        description: data.description as string,
        draft: Boolean(data.draft),
      };
      return isPublished(project) ? project : null;
    })
    .filter((project): project is DevlogProject => project !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getDevlogProject(projectSlug: string): DevlogProject | null {
  return (
    getDevlogProjects().find((project) => project.slug === projectSlug) ?? null
  );
}

// gray-matter's YAML parser auto-coerces an unquoted "date: 2026-07-21" into
// a JS Date (midnight UTC), not a string — normalize back to "YYYY-MM-DD" so
// callers can rely on a plain string regardless of how the author wrote it.
function normalizeDate(rawDate: unknown): string {
  if (rawDate instanceof Date) return rawDate.toISOString().slice(0, 10);
  return String(rawDate);
}

function readPostMeta(
  projectSlug: string,
  postSlug: string
): DevlogPostMeta | null {
  const root = findRootFor(projectSlug, postSlug, "index.mdx");
  if (!root) return null;
  const postPath = path.join(root, projectSlug, postSlug, "index.mdx");
  const { data } = matter(fs.readFileSync(postPath, "utf8"));
  const meta: DevlogPostMeta = {
    slug: postSlug,
    projectSlug,
    title: data.title as string,
    date: normalizeDate(data.date),
    summary: data.summary as string,
    draft: Boolean(data.draft),
  };
  return isPublished(meta) ? meta : null;
}

// Dates are ISO "YYYY-MM-DD", so lexicographic order is chronological order.
function byDateDesc(a: DevlogPostMeta, b: DevlogPostMeta): number {
  return b.date.localeCompare(a.date);
}

export function getPostsForProject(projectSlug: string): DevlogPostMeta[] {
  const postSlugs = Array.from(
    new Set(
      contentRoots().flatMap((root) =>
        readDirNames(path.join(root, projectSlug))
      )
    )
  );
  return postSlugs
    .map((postSlug) => readPostMeta(projectSlug, postSlug))
    .filter((post): post is DevlogPostMeta => post !== null)
    .sort(byDateDesc);
}

export function getAllDevlogPosts(): DevlogPostMeta[] {
  return getDevlogProjects()
    .flatMap((project) => getPostsForProject(project.slug))
    .sort(byDateDesc);
}

export function getDevlogPost(
  projectSlug: string,
  postSlug: string
): DevlogPost | null {
  const meta = readPostMeta(projectSlug, postSlug);
  if (!meta) return null;
  const root = findRootFor(projectSlug, postSlug, "index.mdx");
  const postPath = path.join(root as string, projectSlug, postSlug, "index.mdx");
  const { content } = matter(fs.readFileSync(postPath, "utf8"));
  return { ...meta, content };
}

export function formatDevlogDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

interface ImageManifest {
  [relPath: string]: { width: number; height: number };
}

let manifestCache: ImageManifest | null = null;

function loadImageManifest(): ImageManifest {
  if (manifestCache) return manifestCache;
  const manifestPath = path.join(
    process.cwd(),
    "public",
    "devlog",
    "manifest.json"
  );
  manifestCache = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
    : {};
  return manifestCache as ImageManifest;
}

export function getDevlogImageDimensions(
  projectSlug: string,
  postSlug: string,
  filename: string
): { width: number; height: number } | null {
  const manifest = loadImageManifest();
  return manifest[`${projectSlug}/${postSlug}/${filename}`] ?? null;
}
