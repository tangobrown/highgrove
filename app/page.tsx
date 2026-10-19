import type { Metadata } from "next";
import { CareSection } from "@/components/home/CareSection";
import { HomeHero } from "@/components/home/HomeHero";
import { LifeSection } from "@/components/home/LifeSection";
import { LivingOptions } from "@/components/home/LivingOptions";
import { OfferPanel } from "@/components/home/OfferPanel";
import { UspStrip } from "@/components/home/UspStrip";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { Testimonials } from "@/components/sections/Testimonials";
import { campaign } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Highgrove Retirement Village, Albany | Feels like family" },
  description:
    "Family owned and operated boutique retirement village in Albany, Auckland. Independent living, care suites and Patrick Ferry House hospital on one site, set amongst beautiful grounds and gardens.",
  alternates: { canonical: "/" },
};

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
