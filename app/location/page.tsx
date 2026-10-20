import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { InlineLink } from "@/components/ui/InlineLink";
import { TextLink } from "@/components/ui/TextLink";
import { RelatedPages, related } from "@/components/sections/RelatedPages";
import type { ReactNode } from "react";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { InnerHero } from "@/components/sections/InnerHero";
import { Section } from "@/components/sections/Section";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { Testimonials } from "@/components/sections/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact & Location | Retirement Village Albany | Highgrove",
  description:
    "Visit Highgrove Retirement Village at 119 Albany Highway, Unsworth Heights, Albany, close to shops, clubs and parks. Call 09 444 6689 or send an enquiry.",
  path: "/location",
  image: { src: "/images/circle-entrance.png", alt: "The village entrance and gardens" },
});

const MAP_EMBED = "https://www.google.com/maps?q=119+Albany+Highway,+Unsworth+Heights,+Auckland&output=embed";

const directions: { label: string; text: ReactNode }[] = [
  { label: "Main entrance", text: `${site.address.street}, ${site.address.suburb}` },
  { label: "From Unsworth Heights", text: site.address.alt },
  { label: "Viewing", text: "Monday to Friday 10am–4pm, weekends by appointment" },
];

export default function LocationPage() {
  return (
    <>
      <InnerHero
        path="/location"
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Location" }]}
        eyebrow="Our location · Unsworth Heights, Albany"
        title="The best of both worlds."
        intro="Surrounded by bush, yet in the hub of Albany. There’s no need to retreat from the world (unless you really want to) — our location makes it easy to stay active in the wider community."
        image={{ src: "/images/circle-entrance.png", alt: "The village entrance and gardens" }}
        anchors={[
          { label: "Getting here", href: "#getting-here" },
          { label: "Shopping", href: "#shopping" },
          { label: "Clubs & recreation", href: "#clubs" },
          { label: "Parks & reserves", href: "#parks" },
          { label: "Enquire", href: "#enquire" },
        ]}
      />

      <Section id="getting-here" tone="white">
        <div
          id="map"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-stretch gap-10"
        >
          <div className="flex flex-col justify-center">
            <Eyebrow className="mb-4">Find us</Eyebrow>
            <h2 className="text-h2 mb-[22px]">Getting here</h2>
            <ul className="mb-8 grid border-t border-rule">
              {directions.map((d) => (
                <li key={d.label} className="flex items-center gap-4 border-b border-rule py-4 text-lg leading-snug">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-green" />
                  <span>
                    <strong>{d.label}</strong> — {d.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <ButtonLink href={site.mapsUrl}>Open in Google Maps</ButtonLink>
              <TextLink href="#enquire">Book a tour</TextLink>
            </div>
          </div>
          <iframe
            title="Map showing Highgrove Retirement Village"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block min-h-[440px] w-full rounded-[28px] border-0 bg-border"
          />
        </div>
      </Section>

      <SplitFeature
        id="shopping"
        tone="cream"
        image={{ src: "/images/loc-basket.jpg", alt: "A basket of fresh produce" }}
        eyebrow="Shopping"
        title="Everything within a 10 minute drive"
        body={[
          "Take your pick from the Albany Megacentre, Milford Shops, Glenfield Mall and Wairau Park, with smaller convenience shops close by.",
          <>
            Don’t drive? The village bus runs shopping trips to the main centres three times a week, so you can enjoy a
            spot of shopping or top up the groceries — one of the many{" "}
            <InlineLink href="/assisted-living">services available to residents</InlineLink>.
          </>,
        ]}
      />

      <SplitFeature
        id="clubs"
        tone="white"
        reverse
        image={{ src: "/images/petanque-balls.jpg", alt: "Petanque boules on gravel" }}
        eyebrow="Clubs & recreation"
        title="Golf, bowls, tennis — you name it"
        body={[
          "Highgrove is surrounded by clubs and recreational facilities, from golf and bowling to tennis, service clubs and Probus. The Birkenhead, East Coast Bays and Takapuna RSAs are all within a 10 minute drive.",
          <>
            And there’s plenty to do without leaving home, from the heated indoor pool to pétanque and our own
            boardwalk — see our <InlineLink href="/facilities">village facilities</InlineLink>.
          </>,
        ]}
      />

      <SplitFeature
        id="parks"
        tone="cream"
        image={{ src: "/images/loc-walking.jpg", alt: "Residents out walking together", shape: "circle" }}
        eyebrow="Parks & reserves"
        title="Some of the region’s best-kept secrets"
        body={[
          "Visit Wainoni Park in Greenhithe — the North Shore’s Cornwall Park — with its easy-access boardwalks and wide open fields. The beaches of the East Coast Bays are a short drive away.",
          "Prefer good food and fine wine? Kumeu, with its vineyards and artisan cafés, and the fresh produce of Hobsonville are close by.",
        ]}
      />

      <RelatedPages pages={[related.facilities, related.independent, related.faqs]} tone="white" />
      <Testimonials />
      <EnquirySection />
    </>
  );
}
