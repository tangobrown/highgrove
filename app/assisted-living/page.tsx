import type { Metadata } from "next";
import { CardGrid, type NumberedCard } from "@/components/sections/CardGrid";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { InnerHero } from "@/components/sections/InnerHero";
import { NavyCta } from "@/components/sections/NavyCta";
import { Section } from "@/components/sections/Section";
import { Testimonials } from "@/components/sections/Testimonials";
import { SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Assisted Living",
  description:
    "Meals, personal care, linen, cleaning and maintenance services at Highgrove in Albany — the help you need as your needs change, while you keep your independence.",
  alternates: { canonical: "/assisted-living" },
};

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
        eyebrow="Assisted living options"
        title="As your needs change, keep your independence."
        intro="Whether you need a hand or just want a little luxury, our meal, linen and cleaning services free you up to do the things you would rather be doing."
        image={{ src: "/images/fac-cards.png", alt: "Residents enjoying a game of cards together", position: "45% 50%" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Highgrove Village" }, { label: "Assisted living" }]}
        anchors={[
          { label: "Our services", href: "#services" },
          { label: "Patrick Ferry House", href: "#pfh" },
          { label: "Enquire", href: "#enquire" },
        ]}
      />

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
