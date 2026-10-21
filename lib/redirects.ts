/**
 * Permanent redirects from the old WordPress site (highgrove.co.nz) so existing
 * search rankings and bookmarks carry over. Inventory taken from the old Yoast
 * sitemaps: 13 pages, 45 posts (served at the site root), categories, tags,
 * testimonials and ~180 image attachment pages (`/<parent>/<attachment>/`).
 */
import legacyPostSlugs from "../content/legacy-post-slugs.json";

type Redirect = { source: string; destination: string; permanent: true; has?: { type: "host"; value: string }[] };

const r = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

/** Old page slug → new path. Pages whose path didn't change only need their attachment pages redirected. */
const pages: Record<string, string> = {
  home: "/",
  village: "/facilities",
  "about-us": "/about",
  "contact-us": "/contact",
  thanks: "/",
  "frequently-asked-questions": "/faqs",
  "independent-living": "/independent-living",
  "assisted-living": "/assisted-living",
  apartments: "/apartments",
  location: "/location",
  "our-team": "/our-team",
  "patrick-ferry-house": "/patrick-ferry-house",
};

const categories: Record<string, string> = {
  health: "/blog?category=health-care",
  lifestyle: "/blog?category=village-life",
  retirement: "/blog?category=village-life",
  finance: "/blog?category=news",
  uncategorised: "/blog?category=news",
  uncategorized: "/blog?category=news",
};

export function legacyRedirects(): Redirect[] {
  const out: Redirect[] = [
    // www → apex (the old site's canonical host)
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.highgrove.co.nz" }],
      destination: "https://highgrove.co.nz/:path*",
      permanent: true,
    },
  ];

  for (const [slug, dest] of Object.entries(pages)) {
    if (`/${slug}` !== dest) out.push(r(`/${slug}`, dest));
    out.push(r(`/${slug}/:attachment`, dest));
  }

  for (const slug of legacyPostSlugs) {
    out.push(r(`/${slug}`, `/blog/${slug}`));
    out.push(r(`/${slug}/:attachment`, `/blog/${slug}`));
  }

  for (const [slug, dest] of Object.entries(categories)) out.push(r(`/category/${slug}/:rest*`, dest));
  out.push(r("/category/:rest*", "/blog"));
  out.push(r("/tag/:rest*", "/blog"));
  out.push(r("/testimonial/:rest*", "/"));
  out.push(r("/testimonials/:rest*", "/"));
  out.push(r("/blog/page/:n", "/blog?page=:n"));
  out.push(r("/page/:n", "/blog?page=:n"));
  out.push(r("/feed", "/blog"));
  out.push(r("/comments/feed", "/blog"));
  out.push(r("/wp-content/uploads/:year/:month/Highgrove-Complaints-Policy-1-April-2017.pdf", "/docs/highgrove-complaints-policy.pdf"));
  out.push(r("/:sitemap(post-sitemap|page-sitemap|attachment-sitemap|testimonials-sitemap|category-sitemap|post_tag-sitemap|sitemap_index|wp-sitemap).xml", "/sitemap.xml"));

  return out;
}
