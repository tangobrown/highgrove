/**
 * Blog content: Markdown files in /content/posts, read at build time.
 * Imported from the old WordPress site with `npm run import:posts`.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const POSTS_PER_PAGE = 9;

/** Categories shown in the blog filter, in display order. */
export const categories = ["Village life", "Events", "Health & care", "News"] as const;
export type Category = (typeof categories)[number];

export type Author = { name: string; role: string; avatar: string };

export type PostMeta = {
  title: string;
  slug: string;
  /** ISO 8601 */
  date: string;
  category: Category;
  excerpt: string;
  heroImage?: string;
  heroAlt: string;
  author: Author;
  featured: boolean;
  readingTime: number;
};

export type Post = PostMeta & { body: string };

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const DEFAULT_AUTHOR: Author = { name: "Highgrove team", role: "Highgrove Village", avatar: "/images/logo-icon.png" };

/** Minutes to read at ~200 words per minute. */
export function readingTime(markdown: string): number {
  const words = markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (categories as readonly string[]).includes(value);
}

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = typeof data.slug === "string" && data.slug ? data.slug : file.replace(/\.md$/, "");
  const title = String(data.title ?? slug);
  const date = data.date instanceof Date ? data.date.toISOString() : String(data.date ?? "");
  const author = (data.author ?? {}) as Partial<Author>;
  return {
    title,
    slug,
    date,
    category: isCategory(data.category) ? data.category : "News",
    excerpt: String(data.excerpt ?? ""),
    heroImage: typeof data.heroImage === "string" && data.heroImage ? data.heroImage : undefined,
    heroAlt: String(data.heroAlt ?? title),
    author: {
      name: author.name || DEFAULT_AUTHOR.name,
      role: author.role || DEFAULT_AUTHOR.role,
      avatar: author.avatar || DEFAULT_AUTHOR.avatar,
    },
    featured: data.featured === true,
    readingTime: readingTime(content),
    body: content.trim(),
  };
}

let cache: Post[] | undefined;

function loadAll(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(POSTS_DIR) ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md")) : [];
  cache = files.map(parse).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return cache;
}

function toMeta(post: Post): PostMeta {
  const { body: _body, ...meta } = post;
  void _body;
  return meta;
}

/** All posts, newest first (metadata only). */
export function getAllPosts(): PostMeta[] {
  return loadAll().map(toMeta);
}

/** A single post with its Markdown body, or undefined. */
export function getPost(slug: string): Post | undefined {
  return loadAll().find((p) => p.slug === slug);
}

/** The featured post: the one flagged `featured`, else the newest. */
export function getFeaturedPost(): PostMeta | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0];
}

/** Up to `count` other posts: same category first, then the most recent. */
export function getRelatedPosts(slug: string, count = 3): PostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  const others = posts.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...same, ...rest].slice(0, count);
}

/** Map a `?category=` value (slug or label) to a category. */
export function categoryFromParam(value: string | string[] | undefined): Category | undefined {
  const v = (Array.isArray(value) ? value[0] : value)?.toLowerCase().trim();
  if (!v) return undefined;
  return categories.find((c) => c.toLowerCase() === v || categorySlug(c) === v);
}

/** "Health & care" → "health-care" */
export function categorySlug(category: Category): string {
  return category
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** "4 October 2024" in New Zealand time. */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Pacific/Auckland",
  }).format(new Date(iso));
}

/**
 * The excerpt doubles as the article's intro (standfirst). When the body opens
 * with that same text, drop it so the reader doesn't see it twice.
 */
export function bodyWithoutLead(post: Post): string {
  const lead = post.excerpt.trim();
  if (!lead || lead.endsWith("…")) return post.body;
  const [first, ...rest] = post.body.split(/\n{2,}/);
  if (!first || /[[\]*_`#>]/.test(first) || !first.startsWith(lead)) return post.body;
  const remainder = first.slice(lead.length).trim();
  return [remainder, ...rest].filter(Boolean).join("\n\n");
}
