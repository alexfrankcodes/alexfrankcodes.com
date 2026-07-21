import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { DevlogPost, DevlogPostMeta, DevlogProject } from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content", "devlog");

const isProduction = () => process.env.NODE_ENV === "production";

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

export function getDevlogProjects(): DevlogProject[] {
  return readDirNames(CONTENT_ROOT)
    .map((slug) => {
      const metaPath = path.join(CONTENT_ROOT, slug, "_project.mdx");
      if (!fs.existsSync(metaPath)) return null;
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
  const postPath = path.join(CONTENT_ROOT, projectSlug, postSlug, "index.mdx");
  if (!fs.existsSync(postPath)) return null;
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
  const projectDir = path.join(CONTENT_ROOT, projectSlug);
  return readDirNames(projectDir)
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
  const postPath = path.join(CONTENT_ROOT, projectSlug, postSlug, "index.mdx");
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
