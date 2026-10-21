import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/independent-living", priority: 0.9, changeFrequency: "monthly" },
  { path: "/apartments", priority: 0.9, changeFrequency: "monthly" },
  { path: "/assisted-living", priority: 0.9, changeFrequency: "monthly" },
  { path: "/patrick-ferry-house", priority: 0.9, changeFrequency: "monthly" },
  { path: "/facilities", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/location", priority: 0.8, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/faqs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/our-team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const posts = getAllPosts();
  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path === "/" ? "" : r.path}`,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      ...(r.path === "/blog" && posts[0] ? { lastModified: posts[0].date } : {}),
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
