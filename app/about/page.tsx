import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { InnerHero } from "@/components/sections/InnerHero";
import { Section } from "@/components/sections/Section";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { Testimonials } from "@/components/sections/Testimonials";
import { TextLink } from "@/components/ui/TextLink";
import { InlineLink } from "@/components/ui/InlineLink";
import { RelatedPages, related } from "@/components/sections/RelatedPages";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = pageMeta({
  title: "About Highgrove | Family-Owned Retirement Village Albany",
  description:
    "Highgrove is a family owned and operated retirement village in Albany, Auckland, founded by Patrick and Gerrie Ferry on a simple ethos: family first.",
  path: "/about",
  image: { src: "/images/about-group.jpg", alt: "A group of Highgrove residents laughing together" },
});

const timeline = [
  {
    label: "1997",
    title: "Where it began",
    body: "Patrick and Gerrie Ferry build their first village, Greenview Park Retirement Village, and Terence Kennedy House in Oratia, Waitakere.",
  },
  {
    label: "The vision",
    title: "Designed with a friend",
    body: "Gerrie — a Director and former nurse — works with close family friend and renowned British architect Terence Kennedy to design the village she imagined.",
  },
  {
    label: "2007",
    title: "A difficult time",
    body: "Patrick passes away unexpectedly midway through construction of the hospital. Daughter Khim, already part of the management team, oversees the project.",
  },
  {
    label: "2008",
    title: "Highgrove opens",
    body: "The village and hospital are completed. Now Managing Director, Khim is joined in 2012 by her brother Patrick (Jnr) as Operations Manager.",
  },
];

export default function AboutPage() {
  return (
    <>
      <InnerHero
        path="/about"
        crumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
        eyebrow="About Highgrove Retirement Village"
        title="Family first, always."
        intro={
          <>
            Highgrove Retirement Village and <InlineLink href="/patrick-ferry-house">Patrick Ferry House</InlineLink>{" "}
            hospital are the brainchild of the late Patrick Ferry and his wife Gerrie. Highgrove is a family affair,
            where the driving ethos is family first.
          </>
        }
        image={{ src: "/images/about-group.jpg", alt: "A group of Highgrove residents laughing together", position: "50% 40%" }}
        anchors={[
          { label: "Our village", href: "#village" },
          { label: "Our history", href: "#history" },
          { label: "The concept", href: "#concept" },
          { label: "Enquire", href: "#enquire" },
        ]}
      />

      <Section id="village" tone="white">
        <div className="grid-split items-start gap-8 lg:gap-16">
          <div>
            <Eyebrow className="mb-4">Our village</Eyebrow>
            <h2 className="text-h2">A proudly family operated village in Albany, Auckland.</h2>
          </div>
          <div className="lg:pt-2">
            <p className="text-copy mb-[18px] max-w-[52ch]">
              Not only are we a family run village, we consider all our residents to be members of our family too.
            </p>
            <p className="text-copy max-w-[52ch]">
              Everything we do is centred on providing the best place to live — there are no compromises when it comes
              to how residents are cared for and treated by <InlineLink href="/our-team">our team</InlineLink>.
            </p>
          </div>
        </div>
      </Section>

      <Section id="history" tone="cream">
        <SectionHeading eyebrow="Our history" title="From one family vision to two villages" className="mb-12" />
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-6 gap-y-10">
          {timeline.map((t) => (
            <li key={t.label} className="border-t-2 border-teal pt-[22px]">
              <p className="font-display text-[40px] leading-none">{t.label}</p>
              <h3 className="mt-4 mb-2.5 text-lg font-bold">{t.title}</h3>
              <p className="text-[17px] leading-[1.65] text-body">{t.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <TextLink href="/our-team">Meet the Ferry family and our team</TextLink>
        </div>
      </Section>

      <SplitFeature
        id="concept"
        tone="teal"
        image={{ src: "/images/fac-cards.jpg", alt: "Residents chatting over cards and tea" }}
        eyebrow="The concept"
        title="First-class facilities, personal care, an enviable lifestyle."
        body={[
          <>
            The Highgrove concept replicates Greenview Park and Terence Kennedy House:{" "}
            <InlineLink href="/facilities" onTeal>
              first-class facilities
            </InlineLink>{" "}
            that let residents keep living life their way, backed by outstanding personal service and, most
            importantly, personal care.
          </>,
          <>
            Today Highgrove stands as a testament to Patrick and Gerrie’s vision — a family friendly, boutique village
            of{" "}
            <InlineLink href="/apartments" onTeal>
              50 apartments
            </InlineLink>
            , side by side with{" "}
            <InlineLink href="/patrick-ferry-house" onTeal>
              Patrick Ferry House
            </InlineLink>{" "}
            hospital.
          </>,
        ]}
      />

      <section aria-label="Memberships" className="bg-white">
        <div className="container-site pt-14 sm:pt-[72px]">
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-5 border-y border-rule py-8">
            <p className="max-w-[60ch] text-lg leading-[1.6] text-body">
              We’re proud members of the <strong className="text-teal">New Zealand Aged Care Association</strong> and
              the <strong className="text-teal">Retirement Villages Association</strong>.
            </p>
            <TextLink href="/faqs">Read our FAQs</TextLink>
          </div>
        </div>
      </section>

      <RelatedPages pages={[related.team, related.location, related.pfh]} />
      <Testimonials />
      <EnquirySection />
    </>
  );
}
