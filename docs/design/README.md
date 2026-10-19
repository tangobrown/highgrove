# Handoff: Highgrove Retirement Village — website rebuild

## Overview
A full redesign of **highgrove.co.nz**: a family-owned boutique retirement village in Albany, Auckland, together with **Patrick Ferry House**, its on-site aged-care hospital. The new look comes from the 2026 print campaign: cream backgrounds, dark teal type, Playfair Display headings, arch- and circle-shaped photos and pill buttons. The site has 12 pages, a shared header, footer and enquiry form, and a dropdown menu that turns into a mobile menu on smaller screens.

**Target stack:** Next.js (App Router, TypeScript) + Tailwind CSS. The whole site must be fully responsive, from 360px phones up to 1440px+ desktops.

## About the design files
The `.dc.html` files in `designs/` are **design references built in HTML**. They are prototypes showing the intended look, content and behaviour. They are **not production code to copy**. Inline styles, the `support.js` runtime and the `{{ }}` template syntax are part of the prototyping tool only. Rebuild the designs from scratch as Next.js components styled with Tailwind, using the tokens, layouts and copy in this README. Open any `.dc.html` file in a browser (served from this folder) to see the page.

## Fidelity
**High fidelity.** Colours, type, spacing, radii, shadows, copy and interactions are final. Match them closely. Copy in `[brackets]` or marked "placeholder" is still to come from the client.

---

## Suggested project structure

```
app/
  layout.tsx                  fonts, <UtilityBar/>, <SiteHeader/>, <SiteFooter/>
  page.tsx                    Home
  independent-living/page.tsx
  apartments/page.tsx
  assisted-living/page.tsx
  facilities/page.tsx
  patrick-ferry-house/page.tsx
  about/page.tsx
  location/page.tsx
  faqs/page.tsx
  our-team/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  api/enquiry/route.ts        form POST (email/CRM to be decided)
components/
  layout/  UtilityBar, SiteHeader, NavDropdown, MobileMenu, SiteFooter
  sections/ HomeHero, InnerHero, UspStrip, SplitFeature, CardGrid, Gallery,
            NavyCta, Testimonials, EnquirySection, Timeline, FaqAccordion, TeamCard
  ui/      Button, TextLink, Eyebrow, OrnamentRule, Pill, ArchImage, CircleImage
content/   nav.ts, testimonials.ts, faqs.ts, team.ts, posts (MDX or CMS)
public/images/   (see Assets)
```

Each route's `<InnerHero>` takes `eyebrow`, `title`, `intro`, `image`, `crumbs[]` and `anchors[]`. Page sections need matching `id`s for the "On this page" links.

---

## Design tokens

### Colours (`tailwind.config` → `theme.extend.colors`)
| Token | Hex | Use |
|---|---|---|
| `teal` (primary) | `#0D3958` | All headings, nav, primary buttons, dark sections, utility bar |
| `teal-hover` | `#16507A` | Hover on primary buttons |
| `teal-deep` | `#0B2C39` | (legacy, unused in final) |
| `green` | `#7BB729` | **Accents only**: dots, rules, link underlines. Never use as text on cream (fails contrast) |
| `green-text` | `#5E8F1C` | Green text: eyebrows, active nav, hover links (passes AA on cream/white) |
| `green-soft` | `#D0DEBB` | USP strip, chips, eyebrows on teal, inactive testimonial dots |
| `green-line` | `#C9D7B2` | Ornament rule lines |
| `cream` | `#F7F1EC` | Page background |
| `white` | `#FFFFFF` | Alternating section background, cards |
| `body` | `#2E4B66` | Paragraph text |
| `muted` | `#5B7389` | Breadcrumbs, captions, helper text |
| `rule` | `#E1D6CB` | Dividers, list rules, pill borders |
| `border` | `#E6DCD2` | Header bottom border |
| `input-border` | `#DCD0C4` | Form fields |
| `input-bg` | `#FBF8F5` | Form field background |

On teal backgrounds: body text is `rgba(255,255,255,0.88)`, eyebrows are `#D0DEBB`, and card borders are `rgba(208,222,187,0.3)`.

### Typography
Load both families with `next/font/google`.
- **Display:** `Playfair Display` 400 (plus italic 400 for quotes). Print equivalent: Fenway Variable Banner Light.
- **UI and body:** `Lato` 400 / 700 / 900. Print equivalent: Proxima Nova.

| Role | Font | Size | Line-height | Other |
|---|---|---|---|---|
| Home H1 | Playfair 400 | `clamp(56px, 7.4vw, 104px)` | 0.98 | letter-spacing −0.01em |
| Inner H1 | Playfair 400 | `clamp(42px, 5vw, 64px)` | 1.04 | −0.01em, `text-wrap: balance` |
| Blog post H1 | Playfair 400 | `clamp(40px, 5vw, 64px)` | 1.06 | centred |
| H2 section | Playfair 400 | `clamp(36px, 4.2vw, 52px)` (home: up to 56px) | 1.08 | |
| H2 on teal / CTA | Playfair 400 | `clamp(40px, 5vw, 68px)` (home care), `clamp(32px, 3.6vw, 46px)` (CTA panel) | 1.04–1.1 | |
| H3 card | Playfair 400 | 28–32px | 1.15 | |
| Eyebrow | Lato 700 | 14px | — | uppercase, letter-spacing 0.14em, colour `green-text` |
| Lead / intro | Lato 400 | 19–20px | 1.6 | colour `body`, max 46–56ch |
| Body | Lato 400 | 17–18px | 1.6–1.65 | colour `body`, max ~52ch |
| Article body | Lato 400 | 19px | 1.75 | max-width 760px column |
| Nav | Lato 700 | 16px | — | |
| Button | Lato 700 | 16–18px | — | |
| Quote | Playfair italic | `clamp(24px, 2.8vw, 34px)` | 1.45 | |
| Small/meta | Lato 700 | 13–15px | — | meta lines uppercase 0.1em |

Body text is never smaller than 15px. The audience skews 65+ and their adult children, so keep type generous.

### Spacing and layout
- Content max-width is **1280px**, with side padding **32px** (20px below 640px).
- Section vertical padding is **96–104px** on desktop. Drop it to about 64px on tablet and 56px on mobile.
- Grids use `repeat(auto-fit, minmax(min(100%, 420px), 1fr))` for two-column splits and `minmax(min(100%, 300px), 1fr)` for three-up cards, with gaps of 24–64px. In Tailwind, use `grid-cols-1 md:grid-cols-2` / `lg:grid-cols-3` with equivalent gaps.

### Radii
- Pills and buttons: `9999px`
- **Arch image:** `border-radius: 9999px 9999px 0 0`, used for hero and feature photos (aspect around 0.8–1.08)
- **Card arch:** `9999px 9999px 0 0` image sitting on a white box with `0 0 24px 24px`
- Circles: `9999px` with 1:1 aspect
- Cards and panels: 20–32px. Form fields: 12px. Gallery tiles: 18px.

### Shadows
- Floating card / form panel: `0 20px 50px rgba(13,57,88,0.08)`
- Dropdown / hero badge: `0 18px 40px rgba(13,57,88,0.14)`

---

## Global components

### Utility bar (every page)
A full-width `teal` bar with 14px text and 9px 32px padding. On the left: "Open to view Monday–Friday 10am–4pm, weekends by appointment" in white at 85% opacity. On the right: **"Phone 444 6689"** (bold, `tel:094446689`) and "enquiries@highgrove.co.nz" (`mailto:`). It wraps on mobile; the hours text can be hidden below 640px.

### Site header
- Sticky (`top: 0`, `z-50`), with background `rgba(247,241,236,0.94)`, `backdrop-blur(10px)` and a 1px `border` bottom border. Padding is 16px 32px.
- Logo (`logo-wide.png`, 48px tall) links home.
- **Desktop nav (≥1240px)** sits right-aligned with the CTA, 26px gap, Lato 700 16px, teal, hover `green-text`. The current page shows in `green-text`.
  1. Home
  2. **Highgrove Village ▾**: Independent Living, Assisted Living, Apartments
  3. Patrick Ferry House
  4. Facilities
  5. **About ▾**: About us, Location, FAQs, Our Team, Blog
  6. Contact (goes to `/location#enquire`)
- **Dropdown trigger:** a button with a chevron icon (18px, `currentColor`, nudged down 2px):
  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/></svg>`
  It opens on hover **and** on click/keyboard. The panel is white, 16px radius, 8px padding, min-width 220px, with the dropdown shadow. It sits `top:100%`, offset −16px left, with an 8px gap. Items are Lato 400 16px, 11px 16px padding, 10px radius, with a cream background on hover. Use proper ARIA (`aria-expanded`, `aria-haspopup`); Escape and click-outside close it.
- **CTA:** a "Book a tour" teal pill (13px 24px), hover `teal-hover`.
- **Below 1240px** the nav is replaced by a **"Menu"** outline pill (1.5px teal border) next to the CTA, which toggles to "Close". It opens a full-width cream panel under the header:
  - Top-level items are Playfair 26px with a `rule` divider and 18px vertical padding.
  - Group headings (Highgrove Village, About) list their sub-links in Lato 17px `body`.
  - "Phone 444 6689" sits at the bottom.
  - Lock body scroll while it's open, close it on route change, and trap focus.

### USP strip (Home only)
A full-width `green-soft` band, 24px vertical padding, centred and wrapping, Lato 700 19px teal. The items are separated by 6px teal dots at 40% opacity: "Family owned & operated · 77-bed hospital on site · No-maintenance living".

### Ornament rule
A 1px `green-line` line, then the 22px `logo-icon.png`, then another line, max-width 380px with a 14px gap. It sits between an H1 and its intro. On teal, use a lines + 8px green dot variant.

### Testimonials
A white section with content max 880px, centred and 96px padding. At the top is the 44px `logo-icon`, then the quote in Playfair italic, then the name in Lato 700 15px uppercase 0.14em `green-text`. It auto-advances every **7s**, and clicking a dot stops the auto-advance. Dots are 9px high; the active dot is 26px wide and teal, inactive dots are 9px and `green-soft`, with a 0.3s transition. Respect `prefers-reduced-motion` (no auto-advance).
Quotes (in `content/testimonials.ts`):
1. "Thanks Patrick Ferry House, we're so lucky to have picked you!" — Janet Templeman & Leonie Gallaher
2. "Thanks for the consideration and dedication you show towards my Dad. His profession was one of caring for people less fortunate, so it is nice to know he is now on the receiving end." — Megan
3. "Thank you for the good care you have given Mike over the last week. I appreciate the attention you give him, which gives me the opportunity to recharge my batteries." — Pat Scott
4. "Thank you for your warm and welcoming manner. The assistance and support you offered us was appreciated and first class." — Lester Family

### Enquiry section (`#enquire`, every inner page; Home uses `#visit`)
Two columns that stack on mobile.
- **Left column:** the eyebrow "Request information" (Home: "Come and see for yourself") and the H2 "Become part of the family." Then the intro and a contact table: rows with a 120px label column and `rule` dividers for Phone (09 444 6689), Email, and Find us (119 Albany Highway, Unsworth Heights, Albany; Home also lists 47 Condor Place). Home adds a "Tours: Contact Carol on 0274 970 784" row.
- **Right column:** a white card, 28px radius, 40px padding, with the floating shadow.
  - Fields are First name, Last name, Email, Phone, in a 2×2 grid that becomes one column below about 480px. Home uses a single "Your name" field plus Phone and Email.
  - Labels are Lato 700 15px. Inputs are 1px `input-border`, 12px radius, 15px 16px padding, 17px text, `input-bg` background, and a 1px teal border on focus.
  - "I'm interested in" is a set of **toggle chips** (multi-select): One bedroom apartment / Two bedroom apartment / Patrick Ferry House / Other. Home uses Independent living / Care suites / Patrick Ferry House / Not sure yet. Chips are 11px 18px, 1.5px border; off is `input-border` with an `input-bg` fill, on is a teal fill with white text. Implement them as checkboxes styled as pills.
  - "Your message (optional)" is a textarea, 4 rows.
  - Submit is a full-width teal pill, 19px padding, 18px text: "Request information" (Home: "Book a tour today"). Under it, the helper "No obligation. We never share your details." in 14px `muted`.
  - **On success**, the form is replaced by the icon, "Thank you" (Playfair 34px), and "We'll be in touch within one working day."
  - **Validation:** First name, Last name, Email and at least one interest are required (this matches the live site). Show errors inline under each field. Add spam protection (honeypot or Cloudflare Turnstile) instead of the old reCAPTCHA checkbox. POST to `/api/enquiry`.

### Site footer
- **Top area:** white background, `border` top border, padding 64px 32px 48px, laid out as `auto-fit minmax(240px,1fr)`.
  - Column 1: the logo (56px) and "A family owned and operated boutique retirement village in Albany, alongside Patrick Ferry House hospital."
  - **Explore** column (Lato 900 14px uppercase 0.12em heading): Independent living, Care suites (links to /assisted-living), Patrick Ferry House, Life at Highgrove (links to /facilities).
  - **Visit** column: the address, the phone number (bold) and the email.
- **Bottom bar:** teal, 14px, 80% white: "© 2026 Ferry Enterprises Ltd" and "Member of the Retirement Villages Association of New Zealand".

### Buttons and links
- **Primary:** teal pill, white Lato 700, 17–18px padding × 30–34px, hover `teal-hover`.
- **Secondary:** a 1.5px teal outline pill; hover fills teal with white text.
- **On-teal:** a white pill with teal text; hover `green-soft`.
- **Text link:** Lato 700 16–17px teal, 2px `green` bottom border, 2–3px padding-bottom, followed by "→".
- Give every interactive element a visible focus ring (for example `ring-2 ring-green ring-offset-2`).

---

## Screens

### 1. Home (`/`), reference `designs/Home v2.dc.html`
1. **Hero:** two columns (text 560px max, arch image 540px max, aspect 0.8), 64px top padding.
   - Eyebrow "Highgrove Village · Albany".
   - H1 "Feels like family.", then the ornament rule.
   - Intro: "Family owned and operated, Highgrove is a friendly, boutique village set amongst beautiful grounds and gardens. Live independently and enjoy a wonderfully social, no-maintenance lifestyle in Albany."
   - Buttons: "Book a tour today" (primary, links to #visit) and "Explore the village" (secondary, links to #living).
   - The image is `garden-hero.jpg`, with object-position 70% 40%.
   - A floating white badge overlaps the image's bottom-left (left −28px, bottom 34px, 18px radius, with the dropdown shadow). It holds a 52px circle photo and "**Family owned** and run by people you'll actually meet." Drop the negative offset on mobile.
2. **USP strip** (see above).
3. **"Choose the way you'd like to live"** (`#living`)
   - Header row: an eyebrow "Your home, your haven" and the H2 on the left, with "Three levels of living and care on one site — so your choices can change with you, without ever having to leave." on the right.
   - Three cards: a full-width arch image (aspect 1.05) sitting directly on a white box with `0 0 24px 24px` radius and 28px 28px 32px padding. Each box has an eyebrow benefit, an H3, a paragraph and a text link.
     - **Independent living:** "No maintenance, ever". Link "View apartments →" to /independent-living.
     - **Care suites:** "Support when you want it". Link "About care suites →" to /assisted-living.
     - **Patrick Ferry House:** "Stay close as needs change". Link "All the care you need →" to /patrick-ferry-house.
4. **$99 offer panel.** This is optional (campaign toggle, default **on**) and should be easy to switch off.
   - A white panel with 32px radius. On the left: "Limited time offer", the H2 "$99 fixed weekly fee*", "for 3 years.", a paragraph, and a gift row ("A welcome gift of / Brand new Fisher & Paykel appliances*"). Then "*Terms & conditions apply".
   - The image `photo-pool-friends.png` fills the right half.
5. **Care** (`#care`): a teal section with two columns.
   - An arch image of the carer (aspect 0.92, object-position 50% 20%).
   - Eyebrow "Patrick Ferry House", H2 "All the care you need." and the teal ornament rule.
   - Paragraph: "Situated alongside Highgrove is Patrick Ferry House, our 77-bed on-site hospital — so couples and families stay close, even when one of you needs more care."
   - A stat box "77 beds / hospital-level care on site" (max 260px wide, 16px radius, translucent green border).
   - Buttons: "Visit Patrick Ferry House" (white pill) and "Call Carol on 0274 970 784".
6. **Life at Highgrove** (`#life`): a centred header (eyebrow, H2 "Set amongst beautiful grounds and gardens", intro).
   - Five circle photos in a row, with alternating ones offset `translateY(28px)`. Use a horizontal scroll or a 3+2 wrap on mobile.
   - Then three tile cards: "Heated indoor pool", "Light-filled, open-plan living", "Modern, easy-care kitchens".
7. Testimonials → Enquiry (`#visit`) → Footer.

### Inner page template (all pages below)
**InnerHero** (deliberately compact so inner pages don't look like the home page), reference `designs/Patrick Ferry House.dc.html`:
- **Breadcrumb:** 15px `muted`, "/" separators, current page bold teal. It sits at padding-top 36px with 28px below it.
- **Main row:** flex-wrap, 32–56px gap, items centred, 40px padding-bottom.
  - **Text column** (flex 1 1 460px): eyebrow (14px `green-text`), H1 (inner scale, 18px below), intro (19px `body`, max 56ch).
  - **Circle photo:** `clamp(190px, 24vw, 300px)` square, object-fit cover, `rounded-full`, flex-shrink 0. On mobile it sits above or below the text at about 180px.
- **"On this page" bar:** a 1px `rule` top border, 18px vertical padding, flex-wrap with a 10px gap. A 14px uppercase `muted` label, then pills (white background, 1px `rule` border, 9px 18px, Lato 700 15px; hover fills teal with white text).
  - Each pill links to a section anchor.
  - Give target sections `scroll-margin-top: 110px` so they clear the sticky header, and use `scroll-behavior: smooth` (disabled under reduced motion).
  - On mobile, make this row horizontally scrollable on one line.
- There is no USP strip on inner pages.

**Section patterns used on inner pages:**
- **SplitFeature:** two columns, image and text. Alternates `reverse`, and the background alternates white/cream. The image is an arch (aspect 0.9, max 500px), a circle (1:1) or a card (24px radius, aspect 1.3). The text is an eyebrow, H2, paragraphs and an optional bullet list (`rule` dividers, an 8px green dot, 18px text), plus an optional button.
- **CardGrid:** an auto-fit grid (min 300px, 24px gap) of white cards (24px radius, padding 32px 30px 30px). Each card has a number "01" (Lato 900 14px 0.12em `green-text`), an H3 (Playfair 28px) and a paragraph (17px).
- **Gallery:** an auto-fill grid (min 230–260px, gap 28px 20px). Each tile is an image (aspect 1.45, 18px radius) with a caption in Lato 700 16px.
- **NavyCta:** a teal panel with 32px radius and 56px padding, in two columns: eyebrow and H2 on one side, paragraph and white pill on the other.

### 2. Independent Living (`/independent-living`), `designs/Independent Living v3.dc.html`
- **Hero:** eyebrow "Independent living options". H1 "Life doesn't stand still. Why should you?" Intro "Whether your apartment is a secure place to call home between adventures, or you'd rather relax and enjoy the community, Highgrove's beautifully appointed apartments and great range of facilities offer everything you need." Image: lounge. Anchors: Apartments, Facilities, On-site hospital, Enquire.
- **Apartments** (`#apartments`, white): arch kitchen image with the H2 "Elegant, spacious and easy to look after". Four bullets: Contemporary, high-quality finishes / Energy-efficient fridge, washer and dryer included / Living areas that open onto balconies or courtyards / Designed so privacy is maintained throughout. Button "Available apartments" to /apartments.
- **Facilities** (`#facilities`): H2 "Stay fit, happy and healthy", a "View facilities →" link, and two arch figures (pool; gardens, offset 56px down) with captions.
- **On-site hospital** (`#hospital`, teal): H2 "Together, even when care needs change." and the button "On-site hospital info".
- Testimonials → Enquiry → Footer.

### 3. Apartments (`/apartments`), `designs/Apartments.dc.html`
- **Hero:** eyebrow "Retirement village apartments", H1 "Designed for living.", the intro about architect Terence Kennedy, and the `apt-living` image. Anchors: Living areas, Kitchen, Bedrooms, Bathroom & laundry, Enquire.
- Four SplitFeatures, alternating:
  - **Living areas:** "Room to make it your own"
  - **Kitchen:** "A full-functioning kitchen". Bullets: Full-height fridge/freezer, Oven, hob and range extractor, Fisher & Paykel dishdrawer.
  - **Bedrooms:** "For a good night's rest"
  - **Bathroom & laundry:** "A little luxury, built for independence"
- NavyCta (Patrick Ferry House) → Testimonials → Enquiry.

### 4. Assisted Living (`/assisted-living`), `designs/Assisted Living.dc.html`
- **Hero:** eyebrow "Assisted living options", H1 "As your needs change, keep your independence.", and the cards image. Anchors: Our services, Patrick Ferry House, Enquire.
- **CardGrid** (white) with the header "The help you need, your life your way". Six cards: Delicious meals, Personal care, Fresh linen, General maintenance, A clean home, Friendly staff. The copy is in the design file.
- NavyCta → Testimonials → Enquiry.

### 5. Facilities (`/facilities`), `designs/Facilities.dc.html`
- **Hero:** eyebrow "Village facilities", H1 "Put your feet up, or get active.", and the pool-friends image. Anchors: Keep fit, Socialise, Gallery, Enquire.
- Two SplitFeatures: "Something for every fitness level, every season" and "Good company is easy to find".
- **Gallery** (8 tiles): Vegetable gardens, Heated indoor pool, Fitness centre, Library, Petanque, Pool table & darts, Boardwalk, Outdoor chess.

### 6. Patrick Ferry House (`/patrick-ferry-house`), `designs/Patrick Ferry House.dc.html`
- **Hero:** eyebrow "Patrick Ferry House · On-site hospital", H1 "All the care you need.", intro "Day, respite, rehabilitation and recovery, full rest home and palliative care — right alongside Highgrove, a short internal walk from the apartments." Image: carer. Anchors: Services, Our care, Gallery, Premium rooms, Enquire.
- **Services** (white): two columns.
  - Left: "Keeping families and loved ones together", two paragraphs.
  - Right: a cream panel (28px radius) titled "Services we offer", with 9 items in a two-column list: 24/7 Registered Nurse & emergency call button, Visiting doctor & physiotherapist, Medicine dispensing, Full-time care, Meal plans, Hairdresser, Cleaning & laundry services, Activities programme & van outings, Communal dining.
- **Our care:** three cards: Aged care, Feel at home, Comfortable surroundings.
- **Gallery** (8 tiles, white).
- **Two panels:**
  - **Premium rooms** (`green-soft`): "$40–$90 per day". Charges are as at 1 June 2026; contact Margaret, Hospital Manager.
  - **NZACA** (white): links to findarestthome.co.nz. ⚠ This URL has a typo ("findarestthome") — the live site uses www.findaresthome.co.nz. Confirm with the client.

### 7. About (`/about`), `designs/About.dc.html`
- **Hero:** eyebrow "About Highgrove", H1 "Family first, always.", and the group photo. Anchors: Our village, Our history, The concept, Enquire.
- **Our village** (white): two columns, with the H2 "A proudly family operated village in Albany, Auckland." and two paragraphs.
- **Our history:** a **timeline** of four columns, each with a 2px teal top border, a Playfair 40px year label, an H3 and a paragraph: 1997 Where it began / The vision, Designed with a friend / 2007 A difficult time / 2008 Highgrove opens.
- **The concept** (teal SplitFeature): "First-class facilities, personal care, an enviable lifestyle." It mentions 50 apartments.
- **Memberships row:** NZACA + RVA, with a "Read our FAQs →" link.

### 8. Location (`/location`), `designs/Location.dc.html`
This page also hosts the main **Contact** anchor (`/location#enquire`).
- **Hero:** eyebrow "Our location", H1 "The best of both worlds.", and the entrance image. Anchors: Getting here, Shopping, Clubs & recreation, Parks & reserves, Enquire.
- **Getting here** (`#getting-here`, white): two columns.
  - A list: Main entrance 119 Albany Highway; From Unsworth Heights 47 Condor Place; viewing hours. Then the button "Open in Google Maps" (directions URL).
  - An embedded Google Map iframe, min-height 440px, 28px radius, lazy-loaded.
- Three SplitFeatures:
  - **Shopping:** "Everything within a 10 minute drive"
  - **Clubs & recreation:** "Golf, bowls, tennis — you name it"
  - **Parks & reserves:** "Some of the region's best-kept secrets" (circle image)

### 9. FAQs (`/faqs`), `designs/FAQs.dc.html`
- **Hero:** eyebrow "Frequently asked questions", H1 "Your questions, answered.", and a circle image of a couple. Anchors: All questions, Call 09 444 6689 (tel:), Send a message.
- **Accordion** (white, max 920px): 23 items with `rule` dividers.
  - Each question is a button (Lato 700 19px, 24px vertical padding) with a 36px cream circle on the right showing "+" or "−".
  - Only **one item is open at a time**; the first is open by default.
  - Answers are 18px `body`. Use `<button aria-expanded>` with a region, and animate the height (200ms ease) unless reduced motion is on.
  - **Only Q1 has an answer.** The other 22 answers must be copied from the live site, highgrove.co.nz/frequently-asked-questions. The full question list is in `designs/FAQs.dc.html` (the `faqs = [...]` array).
  - Consider FAQPage JSON-LD for SEO.

### 10. Our Team (`/our-team`), `designs/Our Team.dc.html`
- **Hero:** eyebrow "The Highgrove family", H1 "Friendly, approachable, caring.", and the group image.
- **Team grid** (white): `auto-fit minmax(480px,1fr)`, one column on mobile.
  - Each card is cream, 28px radius, 36px padding, laid out as a 112px circle photo next to the text.
  - Text: name in Playfair 28px, role in 13px uppercase `green-text`, then two bio paragraphs at 16px.
  - Team: Geraldine Ferry (Director), Khim Fletcher (nee Ferry, Managing Director), Patrick Ferry (Operations Manager), Linda McFadyen (General Manager), Andrew Fletcher (Legal Counsel / Contracts & Compliance). Bios are in the design file.

### 11. Blog index (`/blog`), `designs/Blog.dc.html`
- **Hero:** eyebrow "Highgrove blog", H1 "News from the village.", and the gardener circle image.
  - The "Browse" bar holds **category filter pills**: All, Village life, Events, Health & care, News. The active pill is a teal fill. Filtering is client-side or uses `?category=`.
  - If a category has no posts, show "No posts in this category yet."
- **Featured post:** a two-column link card. The image has a 28px radius and 1.35 aspect. Next to it: a "Featured" `green-soft` chip, the meta line (category · date), the H2, the excerpt and the "Read the article" button.
- **"Latest posts"** grid: `auto-fill minmax(320px,1fr)`, gap 56px 32px.
  - Each card is a link: image (20px radius, 1.45 aspect), meta, H3 (Playfair 28px), excerpt and "Read more →".
- **Pagination:** 46px circles (active is teal) and "Next →".
- NavyCta "Become part of the family." → Enquiry.

### 12. Blog post (`/blog/[slug]`), `designs/Blog Post.dc.html`
- **Header:** breadcrumb (Home / Blog / title), then centred content, max 860px: meta, H1, a 21px intro, and an author row (52px circle avatar, name, role · read time).
- A full-width hero image (aspect 2.2, `28px 28px 0 0` radius) that meets the white article section below.
- **Article** (white, 760px column), rendered from MDX/CMS rich text:
  - Paragraphs: 19px, line-height 1.75.
  - H2: Playfair 36px.
  - H3: Lato 700 22px.
  - Pull quote: icon, then Playfair italic, then a caption in uppercase `green-text`.
  - Figure with caption: 20px radius, 15px `muted` caption.
  - Bullet list: `rule` dividers with green dots.
- **Footer row:** "← Back to the blog" and the Share buttons (Facebook, Email, Copy link) as cream pills.
- **"More from the blog":** three related posts, using the same card as the index.
- NavyCta → Enquiry.
- **Content source:** MDX files in `/content/posts` or a headless CMS (Sanity, Contentful) — to be decided. Each post needs: title, slug, date, category, excerpt, hero image, author (name, role, avatar), body and featured flag. Generate metadata and Open Graph tags per post.

---

## Interactions and behaviour
- **Header:** sticky. The dropdowns open on hover (with about a 150ms close delay) and on click/Enter/Space; Escape closes them.
- **Mobile menu:** below **1240px**. Lock body scroll while open, close on navigation, and trap focus.
- **Anchor pills:** smooth scroll, with a 110px scroll margin on targets.
- **Testimonials:** auto-advance every 7s. A dot click jumps to that quote and stops the auto-advance.
- **FAQ:** accordion with one item open at a time.
- **Blog:** category filter.
- **Forms:** client-side and server-side validation. The submit button shows "Sending…" and is disabled while sending. On success, swap in the thank-you state. On error, show "Sorry, something went wrong. Please call us on 09 444 6689."
- **Hover states:** primary `teal`→`teal-hover`; outline pills fill teal; text links turn `green-text`; cards have no lift (kept deliberately calm).
- **Motion:** keep it minimal. Transitions are 150–300ms ease. Disable everything non-essential under `prefers-reduced-motion`.

## Responsive rules (essential)
| Breakpoint | Behaviour |
|---|---|
| < 640px | One column everywhere. Side padding 20px. H1 scales down via the `clamp` values. Section padding about 56px. Hero circle about 180px above the text. Anchor pills scroll horizontally. Form fields go single-column. The utility bar shows just the phone and email. |
| 640–1023px | Two-column splits stack, with the image above the text. Card grids go two-up. Gallery goes 2–3 up. |
| 1024–1239px | Two-column splits side by side. Card grids go three-up. **The header still uses the Menu button.** |
| ≥ 1240px | Full desktop nav. Content capped at 1280px. |
- Use `next/image` for every photo, with proper `sizes`. Use `object-cover` and keep the object-position values given above.
- Tap targets are at least 44px. Body text never goes below 15px.

## State
- Header: `openDropdown: 'village' | 'about' | null` and `mobileMenuOpen: boolean`.
- Testimonials: `index` and `autoplay`.
- FAQ: `openIndex` (default 0).
- Blog: `category` (URL param).
- Enquiry form: field values, the `interests: string[]` array, `status: 'idle' | 'sending' | 'sent' | 'error'`, and `errors`.
- No auth. Everything is static or ISR except the enquiry API and the blog source.

## SEO and accessibility
- Every page gets a unique `metadata` title and description, e.g. "Independent Living | Highgrove Retirement Village, Albany".
- Add LocalBusiness/SeniorLivingCommunity JSON-LD (address 119 Albany Highway, Unsworth Heights, Auckland; phone +64 9 444 6689).
- Add a sitemap and robots file.
- Use semantic landmarks, one H1 per page, alt text on every image (it's in the design files), and colour contrast to WCAG AA. Note that green `#7BB729` must never be used as text; use `#5E8F1C`.

## Assets (`assets/` → `public/images/`)
All photos were **extracted from print-ad PDFs and screenshots of the current site**, so they are low resolution (about 200–900px wide). **Get the original photography from the client before launch.** The file names map to subjects as follows:
- **Brand:** `logo-wide.png` (the Highgrove & Patrick Ferry House lockup) and `logo-icon.png` (the leaf mark). Ask for SVGs.
- **Hero / campaign:** `garden-hero.jpg` (the home hero: residents with produce), `photo-pool-friends.png`, `photo-pfh-care.png`, `photo-pool.png`, `photo-lounge.png`, `photo-kitchen.png`
- **Circles:** `circle-boardwalk`, `circle-entrance`, `circle-couple`, `circle-interior`, `circle-friends`
- **Apartments:** `apt-living`, `apt-kitchen`, `apt-bedroom`, `apt-bathroom`
- **Facilities:** `fac-cards`, `fac-garden`, `fac-poolroom`, `fac-gym`, `fac-library`, `fac-petanque`, `fac-billiards`, `fac-boardwalk`, `fac-chess`
- **Location:** `loc-basket`, `loc-petanque`, `loc-walking`, `loc-gardener`
- **Patrick Ferry House:** `pfh-building`, `pfh-room`, `pfh-nurse`, `pfh-window`, `pfh-corridor`, `pfh-reception`, `pfh-menu`, `pfh-dining`
- **Team headshots** (very low resolution, replace them): `team-geraldine`, `team-khim`, `team-patrick`, `team-linda`, `team-andrew`, `about-group`
- **Blog images:** none yet. The design uses empty placeholder slots.
- **Icons:** only the chevron SVG above. No icon library is needed.

## Open items for the client
1. The 22 FAQ answers.
2. Bed count: the new ads say **77**, the live About page says **74**.
3. Is the $99 offer still running, and what are the T&Cs link and the end date?
4. Original high-resolution photos and SVG logos.
5. Where should enquiries go (email address or CRM), and which spam protection should be used?
6. The blog CMS choice, and any existing posts to migrate.
7. The NZACA link URL, and whether a separate Contact page is wanted. Right now Contact goes to `/location#enquire`.

## Files in this bundle
- `designs/*.dc.html`: the 12 page references (Home v2, Independent Living v3, Apartments, Assisted Living, Facilities, Patrick Ferry House, About, Location, FAQs, Our Team, Blog, Blog Post) plus `Highgrove Brand System.dc.html` (the token sheet) and `Inner Page Hero Options.dc.html` (option **1d** was chosen).
- `designs/support.js`, `designs/image-slot.js`: these exist only so the references open in a browser. Do not port them.
- `designs/assets/`: all images.
