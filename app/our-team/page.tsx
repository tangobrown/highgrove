import type { Metadata } from "next";
import Image from "next/image";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { InnerHero } from "@/components/sections/InnerHero";
import { Section } from "@/components/sections/Section";
import { Testimonials } from "@/components/sections/Testimonials";
import { SectionHeading } from "@/components/ui/Typography";
import { team } from "@/content/team";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the Ferry family and the team behind Highgrove Retirement Village in Albany — friendly, approachable and caring people who see Highgrove as their second home.",
  alternates: { canonical: "/our-team" },
};

export default function OurTeamPage() {
  return (
    <>
      <InnerHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }, { label: "Our team" }]}
        eyebrow="The Highgrove family"
        title="Friendly, approachable, caring."
        intro="Qualities our team have in abundance. Experts in their respective fields, our people see Highgrove as their second home."
        image={{ src: "/images/about-group.jpg", alt: "Highgrove residents together", position: "50% 40%" }}
        anchors={[
          { label: "Meet the team", href: "#team" },
          { label: `Call ${site.phone.display}`, href: site.phone.href },
          { label: "Enquire", href: "#enquire" },
        ]}
      />

      <Section id="team" tone="white">
        <SectionHeading eyebrow="Operations team" title="The family behind the village" className="mb-12" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-6">
          {team.map((m) => (
            <article
              key={m.name}
              className="grid items-start gap-5 rounded-[28px] bg-cream p-6 sm:grid-cols-[112px_1fr] sm:gap-7 sm:p-9"
            >
              {/* Source headshots are tiny (92×141) — cropped into a circle. */}
              <Image
                src={m.image}
                alt={m.alt}
                width={112}
                height={112}
                sizes="112px"
                className="size-28 rounded-full bg-rule/40 object-cover object-[50%_25%]"
              />
              <div className="min-w-0">
                <h3 className="text-h3 mb-1.5">{m.name}</h3>
                <p className="mb-[18px] text-[13px] font-bold tracking-[0.14em] text-green-text uppercase">{m.role}</p>
                {m.bio.map((p, i) => (
                  <p key={i} className="mb-3.5 text-base leading-[1.65] text-body last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Testimonials />
      <EnquirySection />
    </>
  );
}
