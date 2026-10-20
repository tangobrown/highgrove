import type { Metadata } from "next";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { Gallery, type GalleryItem } from "@/components/sections/Gallery";
import { InnerHero } from "@/components/sections/InnerHero";
import { Section } from "@/components/sections/Section";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { Testimonials } from "@/components/sections/Testimonials";
import { SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "A heated indoor pool, fitness centre, library, petanque, gardens, boardwalk and a club lounge — Highgrove’s village facilities in Albany are right on your doorstep.",
  alternates: { canonical: "/facilities" },
};

const gallery: GalleryItem[] = [
  { src: "/images/fac-garden.jpg", alt: "A resident tending the vegetable gardens", caption: "Vegetable gardens" },
  { src: "/images/fac-poolroom.jpg", alt: "Heated indoor pool" },
  { src: "/images/fac-gym.jpg", alt: "Fitness centre" },
  { src: "/images/fac-library.jpg", alt: "Library" },
  { src: "/images/petanque-balls.jpg", alt: "Petanque" },
  { src: "/images/fac-billiards.jpg", alt: "Pool table & darts" },
  { src: "/images/fac-boardwalk.jpg", alt: "Boardwalk" },
  { src: "/images/outdoor-chess.jpg", alt: "Outdoor chess" },
];

export default function FacilitiesPage() {
  return (
    <>
      <InnerHero
        eyebrow="Village facilities"
        title="Put your feet up, or get active."
        intro="Whether it’s time to slow down a little or get moving, Highgrove offers a surprising range of facilities, right on your doorstep."
        image={{ src: "/images/photo-pool-friends.png", alt: "Two friends in the heated indoor pool" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
        anchors={[
          { label: "Keep fit", href: "#keep-fit" },
          { label: "Socialise", href: "#socialise" },
          { label: "Gallery", href: "#gallery" },
          { label: "Enquire", href: "#enquire" },
        ]}
      />

      <SplitFeature
        id="keep-fit"
        tone="white"
        image={{ src: "/images/photo-pool.jpg", alt: "The heated indoor pool" }}
        eyebrow="Keep fit, physically & mentally"
        title="Something for every fitness level, every season"
        body={[
          "Our gardens, courtyards and boardwalk are a favourite way to stay active — or simply to relax and socialise.",
          "Outdoor petanque, draughts and chess bring a bit of (competitive) fun in the sun, while the heated pool, fitness centre and spa are popular all year round. The library has books, board games and puzzles too.",
        ]}
      />

      <SplitFeature
        id="socialise"
        tone="cream"
        reverse
        image={{ src: "/images/fac-cards.jpg", alt: "Residents playing cards in the lounge" }}
        eyebrow="Socialise & have fun"
        title="Good company is easy to find"
        body={[
          "Residents, family and friends can be as social as they like. Meet neighbours in the village restaurant and bar, or head to the club lounge for activities — from housie to arts, crafts and group exercise.",
          "Prefer some quiet? Take a walk on the boardwalk or through the gardens. And there are special screenings on the big-screen lounge TV for a night at the movies.",
        ]}
      />

      <Section id="gallery" tone="white">
        <SectionHeading eyebrow="A look around" title="Everything close to home" className="mb-12" />
        <Gallery items={gallery} min={230} />
      </Section>

      <Testimonials />
      <EnquirySection />
    </>
  );
}
