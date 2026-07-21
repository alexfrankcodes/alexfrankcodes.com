import Image from "next/image";
import { getDevlogImageDimensions } from "@/lib/devlog";

interface DevlogImgProps {
  src: string;
  alt: string;
  caption?: string;
}

// MDX authors write <Img src="diagram.png" alt="..." /> with a filename
// relative to their post folder — project/post are bound in via
// createDevlogComponents so the author never repeats that context.
export function createDevlogImg(projectSlug: string, postSlug: string) {
  return function Img({ src, alt, caption }: DevlogImgProps) {
    const dims = getDevlogImageDimensions(projectSlug, postSlug, src);
    const url = `/devlog/${projectSlug}/${postSlug}/${src}`;
    const isSvg = src.toLowerCase().endsWith(".svg");
    const className = "w-full h-auto rounded-lg border border-border";

    return (
      <figure className="my-8">
        {isSvg || !dims ? (
          // next/image blocks local SVGs by default, and raster images
          // without a manifest entry (rare — see copy-devlog-media.mjs)
          // still need to render something.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={alt}
            width={dims?.width}
            height={dims?.height}
            className={className}
          />
        ) : (
          <Image
            src={url}
            alt={alt}
            width={dims.width}
            height={dims.height}
            className={className}
          />
        )}
        {caption ? (
          <figcaption className="mt-2 text-center font-mono text-xs text-muted">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  };
}
