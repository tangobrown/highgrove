import type { Metadata } from "next";
import { CareSection } from "@/components/home/CareSection";
import { HomeHero } from "@/components/home/HomeHero";
import { LifeSection } from "@/components/home/LifeSection";
import { LivingOptions } from "@/components/home/LivingOptions";
import { OfferPanel } from "@/components/home/OfferPanel";
import { UspStrip } from "@/components/home/UspStrip";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { Testimonials } from "@/components/sections/Testimonials";
import { pageMeta } from "@/lib/seo";
import { campaign } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Retirement Village Albany, Auckland | Highgrove",
  description:
    "Highgrove is a family-owned retirement village in Albany, Auckland, with independent living, assisted living and an on-site rest home and hospital.",
  path: "/",
  image: { src: "/images/photo-pool-friends.png", alt: "Two friends smiling in the indoor pool at Highgrove" },
});

export default function Home() {
  return (
    <>
      <HomeHero />
      <UspStrip />
      <LivingOptions />
      {campaign.showOffer && <OfferPanel />}
      <CareSection />
      <LifeSection />
      <Testimonials />
      <EnquirySection variant="home" />
    </>
  );
}
