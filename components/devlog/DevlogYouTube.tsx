interface DevlogYouTubeProps {
  id: string;
  title: string;
}

// For anything heavier than a short clip — see the copy-devlog-media.mjs
// comment for why video files themselves never live in the repo.
export function YouTube({ id, title }: DevlogYouTubeProps) {
  return (
    <div className="relative my-8 aspect-video overflow-hidden rounded-lg border border-border">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
