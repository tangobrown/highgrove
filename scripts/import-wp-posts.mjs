#!/usr/bin/env node
/**
 * Import blog posts from the old WordPress site into content/posts/*.md.
 *
 *   npm run import:posts            # import everything
 *   npm run import:posts -- --dry   # convert only, write nothing
 *
 * - Fetches every post (paginated, with _embed) from the public WP REST API.
 * - Cleans the messy editor HTML and converts it to Markdown with Turndown.
 * - Downloads the featured image and inline images into public/images/blog/<slug>/
 *   (largest available size; existing files are not downloaded again).
 * - Rewrites links to the old site to the new routes.
 * - Writes content/posts/<slug>.md with YAML frontmatter.
 *
 * Safe to re-run: Markdown files are overwritten, images are cached on disk.
 */
import { mkdir, writeFile, stat, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const he = createRequire(import.meta.url)("he");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WP = process.env.WP_URL ?? "https://www.highgrove.co.nz";
const API = `${WP}/wp-json/wp/v2`;
const POSTS_DIR = path.join(ROOT, "content/posts");
const IMAGES_DIR = path.join(ROOT, "public/images/blog");
const DRY = process.argv.includes("--dry");
const USER_AGENT = "HighgroveContentImport/1.0 (+https://www.highgrove.co.nz)";

const DEFAULT_AUTHOR = { name: "Highgrove team", role: "Highgrove Village", avatar: "/images/logo-icon.png" };

/** Old-site paths → new routes. Post slugs are handled separately. */
const ROUTES = {
  "": "/",
  "home": "/",
  "contact-us": "/location#enquire",
  "contact": "/location#enquire",
  "frequently-asked-questions": "/faqs",
  "faqs": "/faqs",
  "village": "/facilities",
  "facilities": "/facilities",
  "about-us": "/about",
  "about": "/about",
  "blog": "/blog",
  "news": "/blog",
  "patrick-ferry-house": "/patrick-ferry-house",
  "independent-living": "/independent-living",
  "assisted-living": "/assisted-living",
  "apartments": "/apartments",
  "location": "/location",
  "our-team": "/our-team",
  "team": "/our-team",
};

/** One-off fixes for editorial placeholders left in the WordPress copy. */
const CONTENT_FIXES = {
  "7-tips-for-stress-management-in-retirement": [
    [
      /read more here \\\[link to sleep blog\\\]/,
      "[read more here](/blog/tips-for-a-better-sleep-for-over-60s).",
    ],
  ],
  "tips-for-a-safe-retirement-how-to-protect-yourself-from-online-scams": [
    [/’\. \*\*Cold calling scams\*\*/, "’.\n\n**Cold calling scams**"],
  ],
};

// ── Fetch ──────────────────────────────────────────────────────────────────

async function getJson(url) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: "application/json", "User-Agent": USER_AGENT } });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return { data: await res.json(), headers: res.headers };
    } catch (err) {
      if (attempt >= 4) throw new Error(`GET ${url} failed: ${err.message}`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

async function fetchAllPosts() {
  const posts = [];
  for (let page = 1; ; page++) {
    const { data, headers } = await getJson(`${API}/posts?per_page=100&page=${page}&_embed&status=publish`);
    posts.push(...data);
    const totalPages = Number(headers.get("x-wp-totalpages") ?? 1);
    if (page >= totalPages || data.length === 0) break;
  }
  return posts;
}

async function exists(file) {
  try {
    return (await stat(file)).size > 0;
  } catch {
    return false;
  }
}

/** Download `url` to `dir`, returning the public path. Skips files already on disk. */
const downloaded = new Map();
let downloadCount = 0;
async function downloadImage(url, slug) {
  const abs = new URL(url, WP).href;
  if (downloaded.has(abs)) return downloaded.get(abs);
  const name = decodeURIComponent(path.basename(new URL(abs).pathname))
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-");
  const dir = path.join(IMAGES_DIR, slug);
  const file = path.join(dir, name);
  const publicPath = `/images/blog/${slug}/${name}`;
  if (!DRY && !(await exists(file))) {
    await mkdir(dir, { recursive: true });
    const res = await fetch(abs, { headers: { "User-Agent": USER_AGENT } });
    if (!res.ok) throw new Error(`Image ${abs}: ${res.status}`);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    downloadCount++;
  }
  downloaded.set(abs, publicPath);
  return publicPath;
}

/** Largest rendition of a WP media object. */
function largestMediaUrl(media) {
  const sizes = Object.values(media?.media_details?.sizes ?? {});
  const candidates = [
    ...sizes.map((s) => ({ url: s.source_url, w: s.width ?? 0 })),
    { url: media?.source_url, w: media?.media_details?.width ?? 0 },
  ].filter((c) => c.url);
  candidates.sort((a, b) => b.w - a.w);
  return candidates[0]?.url;
}

/** Largest candidate from an <img> tag's srcset, falling back to src. */
function largestFromImgTag(tag) {
  const src = /\ssrc="([^"]+)"/.exec(tag)?.[1];
  const srcset = /\ssrcset="([^"]+)"/.exec(tag)?.[1];
  if (!srcset) return src;
  const best = srcset
    .split(",")
    .map((s) => s.trim().split(/\s+/))
    .map(([u, w]) => ({ u, w: parseInt(w ?? "0", 10) || 0 }))
    .sort((a, b) => b.w - a.w)[0];
  return best?.u ?? src;
}

// ── HTML clean-up ──────────────────────────────────────────────────────────

const BULLET = /^\s*(?:[●•▪◦⬜☐✓✔]|&#9679;|&bull;)\s*/;

function rewriteHref(href, postSlugs) {
  let url;
  try {
    url = new URL(he.decode(href), WP);
  } catch {
    return href;
  }
  if (!/(^|\.)highgrove\.co\.nz$/i.test(url.hostname)) return href;
  if (url.pathname.startsWith("/wp-content/")) return url.href;
  const seg = url.pathname.replace(/^\/+|\/+$/g, "");
  const last = seg.split("/").pop() ?? "";
  if (postSlugs.has(last)) return `/blog/${last}`;
  if (seg in ROUTES) return ROUTES[seg] + (url.hash && !ROUTES[seg].includes("#") ? url.hash : "");
  console.warn(`  ! unmapped internal link ${url.href} → /${seg}`);
  return `/${seg}`;
}

/**
 * Normalise WordPress editor HTML before Turndown sees it:
 * spans unwrapped, styles/classes gone, spacer paragraphs dropped,
 * bold-only paragraphs promoted to headings, hard-wrapped <br> lines joined,
 * "●"/"⬜" pseudo-bullets turned into real lists, heading levels normalised.
 */
function cleanHtml(html, postSlugs) {
  let h = html
    .replace(/\r/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?(?:span|div|font|section|article)\b[^>]*>/gi, "")
    .replace(/&nbsp;|&#160;|\u00a0/g, " ")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/<(b|strong|i|em)>(\s*)<\/\1>/gi, "$2")
    // drop presentational attributes
    .replace(/\s(?:style|class|id|data-[\w-]+|dir|align|rel|target)="[^"]*"/gi, "");

  // Links: rewrite old-site URLs
  h = h.replace(/<a\s[^>]*?href="([^"]*)"[^>]*>/gi, (_, href) => `<a href="${rewriteHref(href, postSlugs)}">`);

  // Headings: strip bold wrappers inside
  h = h.replace(/<(h[1-6])>([\s\S]*?)<\/\1>/gi, (_, tag, inner) => {
    // "Myth 1.<br>It's just for old people." → "Myth 1: It's just for old people."
    const text = inner
      .replace(/<\/?(?:b|strong)>/gi, "")
      .split(/<br\s*\/?>/i)
      .map((part) => part.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .reduce((acc, part) => (acc ? (/[.:]$/.test(acc) ? `${acc.replace(/[.:]$/, "")}: ${part}` : `${acc} ${part}`) : part), "");
    return text ? `<${tag}>${text}</${tag}>` : "";
  });

  // Paragraph-level clean-up
  h = h.replace(/<p>([\s\S]*?)<\/p>/gi, (_, para) => {
    let inner = para;
    const text = he.decode(inner.replace(/<[^>]+>/g, "")).trim();
    if (!text) return "";
    if (/^[—–-]+$/.test(text)) return "<hr>";
    // Bold-only paragraph → heading (h2 for now; normalised below)
    const boldOnly = /^\s*<(b|strong)>([\s\S]*?)<\/\1>\s*$/i.exec(inner);
    if (boldOnly && !/<br/i.test(boldOnly[2]) && text.length <= 120) {
      return `<h2>${boldOnly[2].trim().replace(/[:.]$/, "")}</h2>`;
    }
    // An italic quotation with an attribution → pull quote
    const quote = /^\s*<(i|em)>([\s\S]*?)<\/\1>\s*$/i.exec(inner) && /^([“"][\s\S]+?)[,.]?([”"])[,.]?\s*[–—-]\s*(.+)$/.exec(text);
    if (quote) {
      const body = quote[1].replace(/[,.]$/, "") + quote[2];
      return `<blockquote><p>${he.encode(body)}</p><p>— ${he.encode(quote[3].trim())}</p></blockquote>`;
    }
    // Dash-bullets ("– Item one. – Item two."): only when the paragraph itself starts with a dash
    const dashList = /^[–-]\s+[A-Z]/.test(text);
    const bullet = dashList ? /^\s*(?:[–-]|[●•▪◦⬜☐✓✔])\s*/ : BULLET;
    if (dashList) inner = inner.replace(/([.!?])\s+[–-]\s+(?=[A-Z])/g, "$1<br>– ");
    // Split on <br>, join hard-wrapped lines, convert pseudo-bullets
    const lines = inner
      .split(/<br\s*\/?>|\s+(?=[●⬜•▪]\s)/i)
      .map((l) => l.replace(/\n/g, " ").trim())
      .filter((l) => he.decode(l.replace(/<[^>]+>/g, "")).trim());
    const blocks = [];
    for (const line of lines) {
      const plain = he.decode(line.replace(/<[^>]+>/g, "")).trim();
      if (bullet.test(plain)) {
        blocks.push({ li: line.replace(bullet, "").trim() });
        continue;
      }
      const prev = blocks[blocks.length - 1];
      const prevKey = prev?.li !== undefined ? "li" : "p";
      const prevPlain = prev ? he.decode(prev[prevKey].replace(/<[^>]+>/g, "")).trim() : "";
      // A hard-wrapped line: previous line didn't end a sentence and this one starts lower-case
      if (prev && !/[.!?:;”"’)]$/.test(prevPlain) && /^[a-z(‘'“"0-9–-]/.test(plain)) {
        prev[prevKey] += " " + line;
      } else if (prev && prev.p !== undefined && prevPlain.length <= 30 && /:$/.test(prevPlain) && !/^<(?:b|strong)>/i.test(prev.p)) {
        // "The truth:<br>Yes, …" → "**The truth:** Yes, …"
        prev.p = `<strong>${prev.p}</strong> ${line}`;
      } else {
        blocks.push({ p: line });
      }
    }
    return blocks.map((b) => (b.li ? `<li>${b.li}</li>` : `<p>${b.p}</p>`)).join("\n");
  });

  // A sentence split across two paragraphs (copy-pasted from a PDF): join them
  h = h.replace(/([^.!?:;”"’)>\s])\s*<\/p>\s*<p>(?=[a-z])/g, "$1 ");

  // "item one. ● item two" inside a single <li>: split into separate items
  h = h.replace(/<li>([\s\S]*?)<\/li>/g, (_, inner) => `<li>${inner.split(/\s+[●⬜•▪]\s+/).join("</li>\n<li>")}</li>`);

  // Wrap runs of loose <li> in a <ul>
  h = h.replace(/(?:<li>[\s\S]*?<\/li>\s*)+/g, (run, offset, all) => {
    const before = all.slice(0, offset);
    const openUl = (before.match(/<(?:ul|ol)\b/gi) ?? []).length;
    const closeUl = (before.match(/<\/(?:ul|ol)>/gi) ?? []).length;
    return openUl > closeUl ? run : `<ul>${run.trim()}</ul>\n`;
  });

  // Normalise heading levels so the top level used is h2
  const levels = [...h.matchAll(/<h([1-6])>/gi)].map((m) => Number(m[1]));
  if (levels.length) {
    const shift = Math.min(...levels) - 2;
    if (shift !== 0) {
      h = h.replace(/<(\/?)h([1-6])>/gi, (_, slash, n) => `<${slash}h${Math.min(6, Math.max(2, Number(n) - shift))}>`);
    }
  }

  // Remove a trailing <hr>
  h = h.replace(/(?:\s*<hr>\s*)+$/i, "");
  return h.trim();
}

// ── Markdown ───────────────────────────────────────────────────────────────

const turndown = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
  strongDelimiter: "**",
  linkStyle: "inlined",
});
turndown.use(gfm);
turndown.remove(["script", "style", "iframe", "noscript"]);
// Tighter list items: "- item" rather than "-   item"
turndown.addRule("listItem", {
  filter: "li",
  replacement(content, node) {
    content = content.replace(/^\n+/, "").replace(/\n+$/, "\n").replace(/\n/gm, "\n  ");
    const parent = node.parentNode;
    const prefix =
      parent.nodeName === "OL" ? `${Array.prototype.indexOf.call(parent.children, node) + 1}. ` : "- ";
    return prefix + content + (node.nextSibling && !/\n$/.test(content) ? "\n" : "");
  },
});
// Keep emphasis tight: "**word** " instead of "** word**"
for (const [name, tags, delim] of [
  ["strong", ["strong", "b"], "**"],
  ["em", ["em", "i"], "_"],
]) {
  turndown.addRule(name, {
    filter: tags,
    replacement(content) {
      if (!content.trim()) return content;
      const lead = content.match(/^\s*/)[0];
      const trail = content.match(/\s*$/)[0];
      return `${lead}${delim}${content.trim()}${delim}${trail}`;
    },
  });
}

function tidyMarkdown(md) {
  return (
    md
      .replace(/[ \t]+$/gm, "")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/^(#{2,6})[ \t]+(.*?)[ \t]*$/gm, "$1 $2")
      .replace(/^(#{2,6} \d+)\\\./gm, "$1.")
      .replace(/^(#{2,6} .*?)[.:]$/gm, "$1")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n"
  );
}

/** Bold short "Label:" lead-ins at the start of paragraphs and list items. */
function boldLeadIns(md) {
  return md.replace(/^(- )?([A-Z][^:.!?\n*_[\]()]{1,42}):[ \t]+(?=\S)/gm, (all, dash = "", label) =>
    label.trim().split(/\s+/).length <= 6 ? `${dash}**${label.trim()}:** ` : all,
  );
}

function plainText(md) {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** ~30-word excerpt from the opening paragraphs, ending on a sentence when possible. */
function makeExcerpt(md) {
  const intro = md.split(/\n#{2,6} /)[0];
  const paras = intro
    .split(/\n{2,}/)
    .filter((p) => !/^(?:[-*] |!\[|---)/.test(p.trim()))
    .map(plainText)
    .filter(Boolean);
  const words = paras.join(" ").split(" ");
  // Prefer whole sentences between 18 and 40 words
  const sentences = paras.join(" ").match(/[^.!?]+[.!?]+["”’]?(\s|$)/g) ?? [];
  let out = "";
  for (const s of sentences) {
    const next = (out + s).trim();
    if (next.split(" ").length > 40) break;
    out = next + " ";
    if (out.trim().split(" ").length >= 18) break;
  }
  out = out.trim();
  if (out.split(" ").length >= 12) return out;
  return words.slice(0, 30).join(" ").replace(/[,;:–—-]+$/, "") + "…";
}

/** Minimal YAML frontmatter writer: one key per line, JSON-quoted strings where needed. */
function yamlScalar(v) {
  if (typeof v === "boolean" || typeof v === "number") return String(v);
  const s = String(v);
  return /^[\w/][\w ./&,()'’-]*$/.test(s) && !/^(true|false|null|yes|no|~)$/i.test(s) && !/^\d/.test(s)
    ? s
    : JSON.stringify(s);
}
function toFrontmatter(data) {
  const lines = [];
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined) continue;
    if (v && typeof v === "object") {
      lines.push(`${k}:`);
      for (const [k2, v2] of Object.entries(v)) lines.push(`  ${k2}: ${yamlScalar(v2)}`);
    } else {
      lines.push(`${k}: ${yamlScalar(v)}`);
    }
  }
  return `---\n${lines.join("\n")}\n---\n\n`;
}

// ── Mapping ────────────────────────────────────────────────────────────────

function mapCategory(names) {
  const lower = names.map((n) => n.toLowerCase());
  if (lower.some((n) => n.includes("health"))) return "Health & care";
  if (lower.some((n) => n.includes("lifestyle") || n.includes("retirement"))) return "Village life";
  return "News";
}

function mapAuthor(wpAuthor) {
  const name = wpAuthor?.name?.trim();
  if (!name || /admin|highgrove|team|editor|^wp/i.test(name) || /admin/i.test(wpAuthor?.slug ?? "")) {
    return DEFAULT_AUTHOR;
  }
  return { ...DEFAULT_AUTHOR, name };
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Fetching posts from ${API} …`);
  const posts = await fetchAllPosts();
  console.log(`Found ${posts.length} posts.`);
  const postSlugs = new Set(posts.map((p) => p.slug));
  const newest = [...posts].sort((a, b) => (a.date_gmt < b.date_gmt ? 1 : -1))[0];

  if (!DRY) await mkdir(POSTS_DIR, { recursive: true });
  const stats = { categories: {} };

  for (const post of posts) {
    const slug = post.slug;
    const embedded = post._embedded ?? {};
    const title = he.decode(post.title.rendered).replace(/\s+/g, " ").trim();

    // Inline images: download the largest rendition and point at the local copy
    let html = post.content.rendered;
    const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    for (const tag of imgTags) {
      const url = largestFromImgTag(tag);
      if (!url) continue;
      const local = await downloadImage(url, slug);
      const alt = he.decode(/\salt="([^"]*)"/.exec(tag)?.[1] ?? "");
      html = html.replace(tag, `<img src="${local}" alt="${he.encode(alt)}">`);
    }
    // Images wrapped in links to the full-size file: keep just the image
    html = html.replace(/<a\s[^>]*href="[^"]*\.(?:jpe?g|png|gif|webp)"[^>]*>\s*(<img[^>]*>)\s*<\/a>/gi, "$1");
    // WP captions
    html = html.replace(
      /<figure\b[^>]*>\s*(<img[^>]*>)\s*<figcaption[^>]*>([\s\S]*?)<\/figcaption>\s*<\/figure>/gi,
      (_, img, cap) => img.replace(/alt="[^"]*"/, `alt="${he.encode(he.decode(cap.replace(/<[^>]+>/g, "")).trim())}"`),
    );

    let markdown = boldLeadIns(tidyMarkdown(turndown.turndown(cleanHtml(html, postSlugs))));

    for (const [find, replace] of CONTENT_FIXES[slug] ?? []) markdown = markdown.replace(find, replace);

    // Featured image
    const media = (embedded["wp:featuredmedia"] ?? [])[0];
    const mediaUrl = media && !media.code ? largestMediaUrl(media) : undefined;
    const heroImage = mediaUrl ? await downloadImage(mediaUrl, slug) : undefined;
    const heroAlt = he.decode(media?.alt_text ?? "").trim() || title;

    const termNames = (embedded["wp:term"] ?? []).flat().filter((t) => t.taxonomy === "category").map((t) => t.name);
    const category = mapCategory(termNames);
    stats.categories[category] = (stats.categories[category] ?? 0) + 1;

    const front = {
      title,
      slug,
      date: new Date(`${post.date_gmt}Z`).toISOString(),
      category,
      excerpt: makeExcerpt(markdown),
      ...(heroImage ? { heroImage, heroAlt } : {}),
      author: mapAuthor((embedded.author ?? [])[0]),
      featured: post.id === newest.id,
      wpId: post.id,
    };

    if (!DRY) await writeFile(path.join(POSTS_DIR, `${slug}.md`), toFrontmatter(front) + markdown);
    console.log(`  ✓ ${slug} [${category}]`);
  }

  // Report Markdown files that no longer exist in WordPress (left in place)
  if (!DRY) {
    const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
    const stale = files.filter((f) => !postSlugs.has(f.replace(/\.md$/, "")));
    if (stale.length) console.log(`Not in WordPress (kept): ${stale.join(", ")}`);
  }

  console.log(`\nDone. ${posts.length} posts, ${downloadCount} new images downloaded.`);
  console.log("Categories:", stats.categories);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
