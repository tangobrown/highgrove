import { TextLink } from "@/components/ui/TextLink";
import { SectionHeading } from "@/components/ui/Typography";
import { Section } from "./Section";

export type RelatedPage = { eyebrow: string; title: string; body: string; href: string; cta: string };

/** "Keep exploring" row of three related-page cards, for internal linking at the end of a page. */
export function RelatedPages({
  pages,
  title = "Keep exploring",
  tone = "cream",
}: {
  pages: RelatedPage[];
  title?: string;
  tone?: "cream" | "white";
}) {
  return (
    <Section tone={tone} aria-label={title}>
      <SectionHeading eyebrow="More about Highgrove" title={title} className="mb-10" />
      <ul className="grid-cards gap-6">
        {pages.map((p) => (
          <li
            key={p.href}
            className={`flex flex-col gap-3 rounded-3xl px-[30px] pt-8 pb-[30px] ${tone === "cream" ? "bg-white" : "bg-cream"}`}
          >
            <span className="text-sm font-bold tracking-[0.14em] text-green-text uppercase">{p.eyebrow}</span>
            <h3 className="text-h3">{p.title}</h3>
            <p className="grow text-[17px] leading-[1.65] text-body">{p.body}</p>
            <TextLink href={p.href} className="mt-2 self-start">
              {p.cta}
            </TextLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Shared card content so the same page is described consistently wherever it's linked. */
export const related = {
  about: {
    eyebrow: "About us",
    title: "Family first, always",
    body: "How Patrick and Gerrie Ferry’s vision became a boutique, family-run retirement village in Albany.",
    href: "/about",
    cta: "Our story",
  },
  team: {
    eyebrow: "Our team",
    title: "Meet the Ferry family",
    body: "The friendly, approachable people who run Highgrove and Patrick Ferry House day to day.",
    href: "/our-team",
    cta: "Meet the team",
  },
  location: {
    eyebrow: "Location",
    title: "The best of both worlds",
    body: "Surrounded by bush in Unsworth Heights, with Albany’s shops, clubs and parks minutes away.",
    href: "/location",
    cta: "Find us",
  },
  faqs: {
    eyebrow: "FAQs",
    title: "Your questions, answered",
    body: "Buying an apartment, Occupation Right Agreements, weekly fees, pets, care and more.",
    href: "/faqs",
    cta: "Read the FAQs",
  },
  pfh: {
    eyebrow: "Patrick Ferry House",
    title: "Rest home & hospital care",
    body: "Rest home, hospital-level, respite and palliative care, a short internal walk from the apartments.",
    href: "/patrick-ferry-house",
    cta: "All the care you need",
  },
  independent: {
    eyebrow: "Independent living",
    title: "Life doesn’t stand still",
    body: "Beautifully appointed, easy-care apartments and a wonderfully social, no-maintenance lifestyle.",
    href: "/independent-living",
    cta: "Independent living",
  },
  facilities: {
    eyebrow: "Facilities",
    title: "Put your feet up, or get active",
    body: "Heated indoor pool, fitness centre, library, pétanque, gardens and our own boardwalk.",
    href: "/facilities",
    cta: "View facilities",
  },
} satisfies Record<string, RelatedPage>;
