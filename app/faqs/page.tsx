import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { RelatedPages, related } from "@/components/sections/RelatedPages";
import { FaqAccordion } from "@/components/faqs/FaqAccordion";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { InnerHero } from "@/components/sections/InnerHero";
import { Section } from "@/components/sections/Section";
import { Testimonials } from "@/components/sections/Testimonials";
import { faqAnswerText, faqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Retirement Village FAQs | Highgrove, Albany",
  description:
    "Common questions about Highgrove Retirement Village in Albany: buying an apartment, Occupation Right Agreements, weekly fees, care options, pets and more.",
  path: "/faqs",
  image: { src: "/images/circle-couple.jpg", alt: "Residents laughing together" },
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: faqAnswerText(f.a) },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <InnerHero
        path="/faqs"
        eyebrow="Retirement village FAQs"
        title="Your questions, answered."
        intro="A selection of the questions families ask us most. If yours isn’t here, we’re always happy to talk it through."
        image={{ src: "/images/circle-couple.jpg", alt: "Residents laughing together" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "FAQs" }]}
        anchors={[
          { label: "All questions", href: "#questions" },
          { label: `Call ${site.phone.display}`, href: site.phone.href },
          { label: "Send a message", href: "#enquire" },
        ]}
      />

      <Section id="questions" tone="white">
        <h2 className="sr-only">All questions</h2>
        <FaqAccordion items={faqs} />
      </Section>

      <RelatedPages pages={[related.team, related.pfh, related.location]} />
      <Testimonials />
      <EnquirySection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
