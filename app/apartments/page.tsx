import type { Metadata } from "next";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { InnerHero } from "@/components/sections/InnerHero";
import { NavyCta } from "@/components/sections/NavyCta";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Apartments",
  description:
    "One and two bedroom retirement apartments in Albany, designed with architect Terence Kennedy — spacious open-plan living, full kitchens, double glazing and underfloor-heated bathrooms.",
  alternates: { canonical: "/apartments" },
};

export default function ApartmentsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Retirement village apartments"
        title="Designed for living."
        intro="No one wants to feel they’re living in a motel unit. Highgrove’s apartments, designed with renowned British architect Terence Kennedy, offer a standard of living you’d be hard pressed to find elsewhere."
        image={{ src: "/images/apt-living.jpg", alt: "A resident relaxing in his apartment living room", position: "60% 50%" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Highgrove Village" }, { label: "Apartments" }]}
        anchors={[
          { label: "Living areas", href: "#living" },
          { label: "Kitchen", href: "#kitchen" },
          { label: "Bedrooms", href: "#bedrooms" },
          { label: "Bathroom & laundry", href: "#bathroom" },
          { label: "Enquire", href: "#enquire" },
        ]}
      />

      <SplitFeature
        id="living"
        tone="white"
        image={{ src: "/images/photo-lounge.png", alt: "Open-plan living area opening to a balcony" }}
        eyebrow="Living areas"
        title="Room to make it your own"
        body={[
          "Every apartment has a spacious open-plan living area that opens onto a paved garden patio or a balcony with a view.",
          "There is ample room for a family-sized lounge suite, television, dining suite and sideboard. New Zealand-made, 100% wool carpet in a neutral shade suits any décor, and a heat pump keeps things cool in summer and toasty in winter.",
        ]}
      />

      <SplitFeature
        id="kitchen"
        tone="cream"
        reverse
        image={{ src: "/images/apt-kitchen.jpg", alt: "A full apartment kitchen" }}
        eyebrow="Kitchen"
        title="A full-functioning kitchen"
        body={[
          "Cook up a storm in a thoughtfully laid-out kitchen — practical, easy to keep clean and good looking too, with granite bench tops and ceramic tiling.",
        ]}
        bullets={["Full-height fridge/freezer", "Oven, hob and range extractor", "Fisher & Paykel dishdrawer"]}
      />

      <SplitFeature
        id="bedrooms"
        tone="white"
        image={{ src: "/images/apt-bedroom.jpg", alt: "A master bedroom with mirrored wardrobe" }}
        eyebrow="Bedrooms"
        title="For a good night’s rest"
        body={[
          "Choose one or two bedrooms. The master fits a King or two singles and features a double fitted wardrobe with mirrored doors, with double glazing throughout for a quiet night.",
          "Telephone and television jacks are standard in each master bedroom, as is an emergency 24-hour call button.",
        ]}
      />

      <SplitFeature
        id="bathroom"
        tone="cream"
        reverse
        image={{ src: "/images/apt-bathroom.jpg", alt: "An accessible apartment bathroom" }}
        eyebrow="Bathroom & laundry"
        title="A little luxury, built for independence"
        body={[
          "High-quality fixtures, an easy-access shower and well-placed grab rails make the bathroom easy to use, with a 24/7 emergency call button.",
          "A heated towel rail and underfloor heating will spoil you all year round, and discreet laundry facilities include a washing machine and dryer.",
        ]}
      />

      <NavyCta
        flushTop
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
