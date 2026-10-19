import type { Metadata } from "next";
import { CardGrid, type NumberedCard } from "@/components/sections/CardGrid";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { Gallery, type GalleryItem } from "@/components/sections/Gallery";
import { InnerHero } from "@/components/sections/InnerHero";
import { Section } from "@/components/sections/Section";
import { Testimonials } from "@/components/sections/Testimonials";
import { TextLink } from "@/components/ui/TextLink";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patrick Ferry House",
  description: `Patrick Ferry House is Highgrove’s ${site.bedCount}-bed on-site hospital in Albany, offering day, respite, rehabilitation and recovery, full rest home and palliative care — a short internal walk from the apartments.`,
  alternates: { canonical: "/patrick-ferry-house" },
};

const services = [
  "24/7 Registered Nurse & emergency call button",
  "Visiting doctor & physiotherapist",
  "Medicine dispensing",
  "Full-time care",
  "Meal plans",
  "Hairdresser",
  "Cleaning & laundry services",
  "Activities programme & van outings",
  "Communal dining",
];

const careCards: NumberedCard[] = [
  {
    title: "Aged care",
    body: "We offer day, respite, rehabilitation and recovery, full rest home and palliative care. Our Registered Nurses and Healthcare Assistants support residents while encouraging dignity and independence.",
  },
  {
    title: "Feel at home",
    body: "Modern single rooms, each with a private ensuite and access to a Mediterranean courtyard or individual balcony — plus emergency response systems for comfort and security.",
  },
  {
    title: "Comfortable surroundings",
    body: "Four comfortable lounges for residents and their families, with a dining room and kitchenette on each floor, so a cup of tea is always close at hand.",
  },
];

const gallery: GalleryItem[] = [
  { src: "/images/pfh-building.jpg", alt: "Balconies overlooking the grounds" },
  { src: "/images/pfh-room.jpg", alt: "Private rooms" },
  { src: "/images/pfh-nurse.jpg", alt: "Caring, attentive staff" },
  { src: "/images/pfh-window.jpg", alt: "Light-filled spaces" },
  { src: "/images/pfh-corridor.jpg", alt: "A short walk from the village" },
  { src: "/images/pfh-reception.jpg", alt: "Friendly reception" },
  { src: "/images/pfh-menu.jpg", alt: "Fresh daily menus" },
  { src: "/images/pfh-dining.jpg", alt: "Communal dining" },
];

export default function PatrickFerryHousePage() {
  return (
    <>
      <InnerHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Patrick Ferry House" }]}
        eyebrow="Patrick Ferry House · On-site hospital"
        title="All the care you need."
        intro="Day, respite, rehabilitation and recovery, full rest home and palliative care — right alongside Highgrove, a short internal walk from the apartments."
        image={{ src: "/images/photo-pfh-care.jpg", alt: "A carer walking with a resident", position: "50% 25%" }}
        anchors={[
          { label: "Services", href: "#services" },
          { label: "Our care", href: "#care" },
          { label: "Gallery", href: "#gallery" },
          { label: "Premium rooms", href: "#premium" },
          { label: "Enquire", href: "#enquire" },
        ]}
      />

      <Section id="services" tone="white">
        <div className="grid-split items-start gap-10 lg:gap-16">
          <div>
            <Eyebrow className="mb-4">Family first</Eyebrow>
            <h2 className="text-h2 mb-6">Keeping families and loved ones together</h2>
            <p className="text-copy mb-[18px] max-w-[52ch]">
              The close proximity to Highgrove lets couples and community friends stay together and connected, even when
              one resident needs a more intensive level of care.
            </p>
            <p className="text-copy max-w-[52ch]">
              Consistent with our family-first ethos, Patrick Ferry House was designed to be closely connected with the
              independent living apartments — literally just a short internal walk away.
            </p>
          </div>
          <div className="rounded-[28px] bg-cream p-7 sm:p-10">
            <h3 className="text-h3 mb-5">Services we offer</h3>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-7">
              {services.map((s) => (
                <li
                  key={s}
                  className="flex items-baseline gap-3 border-b border-rule py-3 text-[17px] leading-[1.4] text-teal"
                >
                  <span aria-hidden="true" className="relative -top-0.5 size-[7px] shrink-0 rounded-full bg-green" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="care" tone="cream">
        <SectionHeading eyebrow="Our care" title="Comfortable, familiar, and close to home" className="mb-12" />
        <CardGrid cards={careCards} />
      </Section>

      <Section id="gallery" tone="white" aria-label="Gallery">
        <Gallery items={gallery} />
      </Section>

      <Section id="premium" tone="cream">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-6">
          <div className="rounded-[28px] bg-green-soft p-7 sm:p-10">
            {/* Teal (not green-text) eyebrow on the green-soft panel, per design */}
            <p className="mb-4 text-sm font-bold tracking-[0.14em] text-teal uppercase">Premium rooms</p>
            <h3 className="mb-3.5 font-display text-[30px] leading-[1.15]">$40–$90 per day</h3>
            <p className="text-[17px] leading-[1.6]">
              If you choose one of our premium rooms, an additional premium room charge applies (as at 1 June 2026).
              Charges are subject to change — please contact Margaret, our Hospital Manager, for details.
            </p>
          </div>
          <div className="rounded-[28px] bg-white p-7 sm:p-10">
            <Eyebrow className="mb-4">Member of NZACA</Eyebrow>
            <h3 className="mb-3.5 font-display text-[30px] leading-[1.15]">Finding the right care</h3>
            <p className="mb-5 text-[17px] leading-[1.6] text-body">
              We’re a member of the New Zealand Aged Care Association, and recommend their website for information on
              admission into an aged care hospital or rest home.
            </p>
            <TextLink href="https://www.findaresthome.co.nz">findaresthome.co.nz</TextLink>
          </div>
        </div>
      </Section>

      <Testimonials />
      <EnquirySection />
    </>
  );
}
