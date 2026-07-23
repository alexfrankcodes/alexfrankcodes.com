// Colocated devlog media (content/devlog/**) isn't web-servable on its own —
// only public/ is. This mirrors non-.mdx files into public/devlog/ on every
// dev/build start and records image dimensions so <Img> can size them without
// authors specifying width/height by hand. Rerun (restart `next dev`) after
// adding new media so it picks up.
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CONTENT_ROOT = path.join(process.cwd(), "content", "devlog");
// Gitignored drafts root (see lib/devlog.ts) — walked too so draft images
// preview locally. Never present in a Vercel build, since it's never committed.
const DRAFTS_ROOT = path.join(process.cwd(), "content", "devlog-drafts");
const PUBLIC_ROOT = path.join(process.cwd(), "public", "devlog");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]);

async function walk(dir, relDir, manifest) {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const srcPath = path.join(dir, entry.name);
    const relPath = relDir ? `${relDir}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      await walk(srcPath, relPath, manifest);
      continue;
    }

    if (entry.name.endsWith(".mdx")) continue;

    const destPath = path.join(PUBLIC_ROOT, relPath);
    mkdirSync(path.dirname(destPath), { recursive: true });
    copyFileSync(srcPath, destPath);

    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext)) {
      const { width, height } = await sharp(srcPath).metadata();
      if (width && height) manifest[relPath] = { width, height };
    }
  }
}

async function main() {
  rmSync(PUBLIC_ROOT, { recursive: true, force: true });
  mkdirSync(PUBLIC_ROOT, { recursive: true });

  const manifest = {};
  await walk(CONTENT_ROOT, "", manifest);
  await walk(DRAFTS_ROOT, "", manifest);

  writeFileSync(
    path.join(PUBLIC_ROOT, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`[devlog] copied media for ${Object.keys(manifest).length} image(s)`);
}

main();
