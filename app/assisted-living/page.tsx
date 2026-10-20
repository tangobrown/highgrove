import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CardGrid, type NumberedCard } from "@/components/sections/CardGrid";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { InnerHero } from "@/components/sections/InnerHero";
import { NavyCta } from "@/components/sections/NavyCta";
import { Section } from "@/components/sections/Section";
import { Testimonials } from "@/components/sections/Testimonials";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = pageMeta({
  title: "Assisted Living & Care Services Albany | Highgrove",
  description:
    "Assisted living at Highgrove in Albany: meals, personal care, linen, cleaning and maintenance, with rest home and hospital care on site if needs change.",
  path: "/assisted-living",
  image: { src: "/images/fac-cards.jpg", alt: "Residents enjoying a game of cards together" },
});

const services: NumberedCard[] = [
  {
    title: "Delicious meals",
    body: "Meal plans overseen by a qualified dietitian, with varied menus each day and special dietary needs catered for. Dine in our restaurant, have meals delivered, or choose heat-and-eat options.",
  },
  {
    title: "Personal care",
    body: "Support with daily personal care, temporarily or permanently — from dressing and showering to clinical health needs — provided by staff from Patrick Ferry House.",
  },
  {
    title: "Fresh linen",
    body: "A linen service tailored to you: a simple collect and deliver, or the full service including stripping and remaking your bed.",
  },
  {
    title: "General maintenance",
    body: "Many jobs that normally fall to a home owner, we take care of. For anything beyond the usual, we’ll organise the right tradesperson.",
  },
  {
    title: "A clean home",
    body: "Cleaning customised to your requirements — as much or as little as you like, from dusting and vacuuming to the kitchen and bathroom.",
  },
  {
    title: "Friendly staff",
    body: "Approachable and caring, our team includes Registered Nurses and qualified Health Care Assistants, so you can be sure of the best care.",
  },
];

export default function AssistedLivingPage() {
  return (
    <>
      <InnerHero
        path="/assisted-living"
        eyebrow="Assisted living · Albany"
        title="As your needs change, keep your independence."
        intro="Whether you need a hand or just want a little luxury, our meal, linen and cleaning services free you up to do the things you would rather be doing."
        image={{ src: "/images/fac-cards.jpg", alt: "Residents enjoying a game of cards together", position: "45% 50%" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Highgrove Village" }, { label: "Assisted living" }]}
        anchors={[
          { label: "Our services", href: "#services" },
          { label: "Patrick Ferry House", href: "#pfh" },
          { label: "Enquire", href: "#enquire" },
        ]}
      />

      <section aria-label="Life at Highgrove" className="bg-white">
        <div className="container-site grid gap-6 pt-14 sm:grid-cols-2 sm:pt-16 lg:pt-24">
          <Photo
            src="/images/garden-table-residents.jpg"
            alt="Residents chatting around a table in the village garden"
            shape="card"
            aspect={1.3}
            sizes="(min-width: 1280px) 616px, (min-width: 640px) 50vw, 100vw"
          />
          <Photo
            src="/images/al-friends-bench.jpg"
            alt="Two friends laughing together on a garden bench with a small white dog"
            shape="card"
            aspect={1.3}
            position="50% 40%"
            sizes="(min-width: 1280px) 616px, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      </section>

      <Section id="services" tone="white">
        <SectionHeading
          eyebrow="Our services"
          title="The help you need, your life your way"
          intro="So whether you need a bit of help cleaning your apartment or require 24/7 personal care, we provide the full range of services to suit your changing needs."
          className="mb-12"
        />
        <CardGrid cards={services} cardTone="cream" />
      </Section>

      <NavyCta
        id="pfh"
        eyebrow="Patrick Ferry House"
        title="All the care you need, right alongside."
        body="Our on-site hospital is a short internal walk from the apartments — so couples and families stay close, even when care needs change."
        cta={{ label: "About Patrick Ferry House", href: "/patrick-ferry-house" }}
      />

      <Testimonials />
      <EnquirySection />
    </>
  );
}
