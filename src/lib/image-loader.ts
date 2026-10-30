"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Unsplash's CDN (imgix) resizes and serves modern formats itself, so images
 * are optimised at the edge without routing through the Next.js server.
 * Local images pass through unchanged.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
