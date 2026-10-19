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

## Enquiries

`/api/enquiry` validates input (with a honeypot field for spam) and currently only **logs** enquiries on the server. Hook up email or CRM delivery in `app/api/enquiry/route.ts` once the destination is decided.

## Open items for the client

See `docs/design/README.md` → "Open items": high-res photography and SVG logos, $99 offer T&Cs and end date, enquiry destination, and the bed count (77 vs 74).
