import type { Metadata } from "next";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { InnerHero } from "@/components/sections/InnerHero";
import { Section } from "@/components/sections/Section";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { Testimonials } from "@/components/sections/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { OrnamentRule } from "@/components/ui/OrnamentRule";
import { Photo } from "@/components/ui/Photo";
import { TextLink } from "@/components/ui/TextLink";
import { Eyebrow } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Independent Living",
  description:
    "Independent retirement living in Albany: beautifully appointed, easy-care apartments, a great range of facilities and Patrick Ferry House hospital right alongside.",
  alternates: { canonical: "/independent-living" },
};

const facilityPhotos = [
  { src: "/images/photo-pool.jpg", alt: "The heated indoor pool", caption: "Heated indoor pool" },
  {
    src: "/images/garden-hero.jpg",
    alt: "Residents with produce from the village gardens",
    caption: "Grounds & gardens",
    position: "70% 40%",
  },
];

export default function IndependentLivingPage() {
  return (
    <>
      <InnerHero
        eyebrow="Independent living options"
        title="Life doesn’t stand still. Why should you?"
        intro="Whether your apartment is a secure place to call home between adventures, or you’d rather relax and enjoy the community, Highgrove’s beautifully appointed apartments and great range of facilities offer everything you need."
        image={{
          src: "/images/photo-lounge.png",
          alt: "A light-filled apartment living room opening to a balcony",
          position: "50% 40%",
        }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Highgrove Village" }, { label: "Independent living" }]}
        anchors={[
          { label: "Apartments", href: "#apartments" },
          { label: "Facilities", href: "#facilities" },
          { label: "On-site hospital", href: "#hospital" },
          { label: "Enquire", href: "#enquire" },
        ]}
      />

      <SplitFeature
        id="apartments"
        tone="white"
        image={{ src: "/images/photo-kitchen.png", alt: "A modern apartment kitchen" }}
        eyebrow="Apartments"
        title="Elegant, spacious and easy to look after"
        body={[
          "Every apartment is finished to a contemporary, high standard — with oversized living areas that flow out to a balcony or courtyard.",
        ]}
        bullets={[
          "Contemporary, high-quality finishes",
          "Energy-efficient fridge, washer and dryer included",
          "Living areas that open onto balconies or courtyards",
          "Designed so privacy is maintained throughout",
        ]}
        action={<ButtonLink href="/apartments">Available apartments</ButtonLink>}
      />

      <Section id="facilities" tone="cream">
        <div className="grid-split items-center gap-10 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow className="mb-4">Facilities</Eyebrow>
            <h2 className="text-h2 mb-6">Stay fit, happy and healthy</h2>
            <p className="text-lead mb-[34px] max-w-[46ch]">
              A wide range of facilities right on your doorstep — because we want you living as independently as
              possible, for as long as possible.
            </p>
            <TextLink href="/facilities">View facilities</TextLink>
          </div>
          <div className="mx-auto grid w-full max-w-[560px] grid-cols-2 gap-3 xs:gap-[18px]">
            {facilityPhotos.map((p, i) => (
              <figure key={p.src} className={i === 1 ? "pt-10 sm:pt-14" : ""}>
                <Photo
                  src={p.src}
                  alt={p.alt}
                  aspect={0.75}
                  position={p.position}
                  className="rounded-[9999px_9999px_18px_18px]"
                  sizes="(min-width: 1024px) 280px, 45vw"
                />
                <figcaption className="mt-3.5 text-base font-bold xs:text-[17px]">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <SplitFeature
        id="hospital"
        tone="teal"
        image={{
          src: "/images/photo-pfh-care.jpg",
          alt: "A carer at Patrick Ferry House walking with a resident",
          position: "50% 20%",
        }}
        eyebrow="On-site hospital"
        title="Together, even when care needs change."
        action={
          <ButtonLink href="/patrick-ferry-house" variant="onTeal">
            On-site hospital info
          </ButtonLink>
        }
      >
        <OrnamentRule onTeal className="mt-1.5 mb-[30px]" />
        <p className="max-w-[48ch] text-[19px] leading-[1.65] text-pretty text-white/88">
          With Patrick Ferry House right alongside the village, couples and community friends stay together and
          connected — even when one resident needs a more intensive level of care.
        </p>
      </SplitFeature>

      <Testimonials />
      <EnquirySection />
    </>
  );
}
