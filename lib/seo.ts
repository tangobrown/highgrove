import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetaInput = {
  /** Full <title>. Keep to ~60 characters with the main keyword first. */
  title: string;
  /** Meta description. Keep to ~155 characters. */
  description: string;
  /** Route path, e.g. "/patrick-ferry-house". Used for the canonical URL. */
  path: string;
  /** Social share image (defaults to the village exterior). */
  image?: { src: string; alt: string };
  type?: "website" | "article";
};

const DEFAULT_IMAGE = { src: "/images/grounds-apartments-lawn.jpg", alt: "Highgrove Retirement Village apartments and gardens" };

/**
 * Builds page metadata with a canonical URL and matching Open Graph / Twitter tags.
 * Next.js replaces (not merges) `openGraph` per page, so site-wide fields live here too.
 */
export function pageMeta({ title, description, path, image = DEFAULT_IMAGE, type = "website" }: PageMetaInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_NZ",
      siteName: site.name,
      title,
      description,
      url: path,
      images: [{ url: image.src, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.src] },
  };
}

/** Trim text to a meta-description length on a word boundary. */
export function clipDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]$/, "")}…`;
}

/** Absolute URL for structured data. */
export const absoluteUrl = (path: string) => `${site.url.replace(/\/$/, "")}${path === "/" ? "" : path}`;
