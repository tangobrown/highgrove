import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { OrnamentRule } from "@/components/ui/OrnamentRule";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Highgrove Retirement Village" },
  robots: { index: false, follow: true },
};

const links = [
  { label: "Independent living", href: "/independent-living" },
  { label: "Retirement apartments", href: "/apartments" },
  { label: "Assisted living", href: "/assisted-living" },
  { label: "Patrick Ferry House rest home & hospital", href: "/patrick-ferry-house" },
  { label: "Village facilities", href: "/facilities" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
];

export default function NotFound() {
  return (
    <section className="container-site section-y">
      <div className="mx-auto max-w-[720px] text-center">
        <p className="eyebrow mb-4">Page not found</p>
        <h1 className="text-h1 mb-6">Sorry, we can’t find that page.</h1>
        <OrnamentRule className="mx-auto mb-7" />
        <p className="text-lead mx-auto mb-9 max-w-[52ch]">
          It may have moved when we updated our website. Try one of these pages, or call us on{" "}
          <a href={site.phone.href} className="font-bold text-teal hover:text-green-text">
            {site.phone.display}
          </a>
          .
        </p>
        <ul className="mb-10 flex flex-wrap justify-center gap-2.5">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex min-h-11 items-center rounded-full border border-rule bg-white px-[18px] text-[15px] font-bold text-teal transition-colors hover:border-teal hover:bg-teal hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/">Back to the home page</ButtonLink>
      </div>
    </section>
  );
}
