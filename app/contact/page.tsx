import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { InnerHero } from "@/components/sections/InnerHero";
import { RelatedPages, related } from "@/components/sections/RelatedPages";
import { Section } from "@/components/sections/Section";
import { ButtonLink } from "@/components/ui/Button";
import { InlineLink } from "@/components/ui/InlineLink";
import { TextLink } from "@/components/ui/TextLink";
import { Eyebrow } from "@/components/ui/Typography";
import { contactPageSchema, jsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact Us | Highgrove Retirement Village, Albany",
  description:
    "Contact Highgrove Retirement Village in Albany: call 09 444 6689, email enquiries@highgrove.co.nz, book a tour or send us a message online.",
  path: "/contact",
  image: { src: "/images/circle-entrance.png", alt: "The entrance to Highgrove Retirement Village" },
});

const cardCls = "flex flex-col gap-1.5 rounded-3xl bg-white p-6 sm:p-7";
const valueCls = "text-[22px] font-bold leading-snug text-teal hover:text-green-text break-words";

function ContactCard({ label, children, note }: { label: string; children: ReactNode; note: ReactNode }) {
  return (
    <div className={cardCls}>
      <span className="text-sm font-bold tracking-[0.14em] text-green-text uppercase">{label}</span>
      {children}
      <p className="text-base leading-normal text-body">{note}</p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(contactPageSchema)} />
      <InnerHero
        path="/contact"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact Highgrove Retirement Village · Albany"
        title="We’d love to hear from you."
        intro="Call, email or send us a message — or come and see the village for yourself. We’ll get back to you within one working day."
        image={{ src: "/images/circle-entrance.png", alt: "The entrance to Highgrove Retirement Village" }}
        anchors={[
          { label: "Contact details", href: "#details" },
          { label: "Send a message", href: "#enquire" },
          { label: "Map", href: "#map" },
        ]}
      />

      <Section id="enquire" tone="cream">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-16">
          <div id="details">
            <Eyebrow className="mb-4">Contact details</Eyebrow>
            <h2 className="text-h2 mb-6">Talk to a real person</h2>
            <p className="text-copy mb-9 max-w-[52ch]">
              We’re a small, family-run village, so you’ll always speak to someone who knows Highgrove well. Ask us
              about availability, pricing, care options or anything else.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ContactCard label="Phone" note="General enquiries">
                <a href={site.phone.href} className={valueCls}>
                  {site.phone.display}
                </a>
              </ContactCard>
              <ContactCard label="Book a tour" note={`Call ${site.tours.name} to arrange a time to look around.`}>
                <a href={site.tours.href} className={valueCls}>
                  {site.tours.display}
                </a>
              </ContactCard>
              <ContactCard label="Email" note="We reply within one working day.">
                <a href={`mailto:${site.email}`} className={`${valueCls} text-[17px]! whitespace-nowrap`}>
                  {site.email}
                </a>
              </ContactCard>
              <ContactCard
                label="Patrick Ferry House"
                note={
                  <>
                    Rest home and hospital enquiries — ask for Margaret, our Hospital Manager. See{" "}
                    <InlineLink href="/patrick-ferry-house">care at Patrick Ferry House</InlineLink>
                    .
                  </>
                }
              >
                <a href={site.phone.href} className={valueCls}>
                  {site.phone.display}
                </a>
              </ContactCard>
            </div>

            <div className="mt-4 grid gap-4 rounded-3xl bg-white p-6 sm:grid-cols-2 sm:p-7">
              <div>
                <span className="text-sm font-bold tracking-[0.14em] text-green-text uppercase">Visit us</span>
                <address className="mt-2 text-lg leading-normal text-teal not-italic">
                  {site.address.street}
                  <br />
                  {site.address.suburb}, {site.address.city} {site.address.postcode}
                </address>
                <p className="mt-1 text-base text-body">Also accessible from {site.address.alt}.</p>
              </div>
              <div>
                <span className="text-sm font-bold tracking-[0.14em] text-green-text uppercase">Viewing hours</span>
                <p className="mt-2 text-lg leading-normal text-teal">
                  Monday–Friday 10am–4pm
                  <br />
                  Weekends by appointment
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-float sm:p-10">
            <h2 className="text-h3 mb-2">Send us a message</h2>
            <p className="mb-7 text-base leading-normal text-body">
              Tell us a little about what you’re looking for and we’ll send current availability or arrange a visit.
            </p>
            <EnquiryForm />
          </div>
        </div>
      </Section>

      <Section id="map" tone="white">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-14">
          <div className="flex flex-col justify-center">
            <Eyebrow className="mb-4">Find us</Eyebrow>
            <h2 className="text-h2 mb-5">In the heart of Albany</h2>
            <p className="text-copy mb-8">
              Highgrove is on Albany Highway in Unsworth Heights, with the Albany Megacentre and the rest of the North
              Shore within a short drive.
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <ButtonLink href={site.mapsUrl}>Get directions</ButtonLink>
              <TextLink href="/location">About the area</TextLink>
            </div>
          </div>
          <iframe
            title="Map showing Highgrove Retirement Village, 119 Albany Highway, Unsworth Heights"
            src={site.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block min-h-[420px] w-full rounded-[28px] border-0 bg-border"
          />
        </div>
      </Section>

      <RelatedPages pages={[related.location, related.faqs, related.team]} />
    </>
  );
}
