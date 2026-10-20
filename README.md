# Highgrove Retirement Village — website

Next.js 16 (App Router, TypeScript) + Tailwind CSS v4 rebuild of [highgrove.co.nz](https://www.highgrove.co.nz).

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint
npm run import:posts # re-import blog posts from the old WordPress site
```

## Where things live

| Path | What |
|---|---|
| `app/` | Routes. Each page sets its own `metadata`. `api/enquiry/route.ts` handles the enquiry form. |
| `app/globals.css` | Design tokens (`@theme`) and shared utilities (`container-site`, `section-y`, `eyebrow`, `text-h1`, `text-h2`, …). |
| `lib/site.ts` | Contact details, navigation, bed count and the **`campaign.showOffer`** toggle for the $99 panel. |
| `components/layout` | Utility bar, sticky header (dropdowns + mobile menu below 1240px), footer. |
| `components/sections` | Reusable page sections: `InnerHero`, `SplitFeature`, `CardGrid`, `Gallery`, `NavyCta`, `Testimonials`, `EnquirySection`. |
| `components/ui` | `ButtonLink`, `TextLink`, `Eyebrow`, `BulletList`, `OrnamentRule`, `Photo`. |
| `content/` | Testimonials, FAQs, team, and blog posts (`content/posts/*.md`). |
| `public/images/` | Photography (blog images in `public/images/blog/<slug>/`). |
| `docs/design/` | The original design handoff (spec + HTML references). |

## Blog

Posts are Markdown files with YAML frontmatter in `content/posts/`. Add a post by creating a new `.md` file:

```md
---
title: "Spring in the village"
slug: spring-in-the-village
date: 2026-10-01T09:00:00.000Z
category: Village life      # Village life | Events | Health & care | News
excerpt: "One or two sentences for cards and search results."
heroImage: /images/blog/spring-in-the-village/hero.jpg
heroAlt: "Residents in the vegetable garden"
author:
  name: Highgrove team
  role: Highgrove Village
  avatar: /images/logo-icon.png
featured: false
---

Body in Markdown…
```

The existing posts were imported from the WordPress REST API with `npm run import:posts`. Re-running it is safe, but it overwrites imported files, so stop using it once posts are edited here.

## SEO

- **Canonical domain** is `https://highgrove.co.nz` (no www, matching the old site's indexed URLs). Override with `NEXT_PUBLIC_SITE_URL` for staging. Requests to `www.` are redirected to the apex.
- **Page metadata**: use `pageMeta()` from `lib/seo.ts` in each page — it sets the title, description, canonical URL and Open Graph/Twitter tags. Keep titles under 60 characters with the main keyword first, and descriptions under 155.
- **Structured data** (`lib/schema.ts`): the village (`SeniorLivingCommunity` + `LocalBusiness`) and `WebSite` on every page, `NursingHome` on Patrick Ferry House, `BreadcrumbList` on every inner page (from `InnerHero`), `FAQPage` on FAQs and `BlogPosting` on posts.
- **Old WordPress URLs** are permanently redirected in `lib/redirects.ts` (pages, all 45 posts that lived at the site root, categories, tags, testimonials, attachment pages and old sitemaps). The legacy post list is frozen in `content/legacy-post-slugs.json`.
- **Headings**: the small label above each page title is part of the `<h1>`, so put the page's main search phrase there (e.g. "Patrick Ferry House · Rest home & hospital care").
- After launch, submit `https://highgrove.co.nz/sitemap.xml` in Google Search Console and watch the Coverage report for any 404s from old links.

## Enquiries

`/api/enquiry` validates input (with a honeypot field for spam) and currently only **logs** enquiries on the server. Hook up email or CRM delivery in `app/api/enquiry/route.ts` once the destination is decided.

## Open items for the client

See `docs/design/README.md` → "Open items": high-res photography and SVG logos, $99 offer T&Cs and end date, enquiry destination, and the bed count (77 vs 74).
