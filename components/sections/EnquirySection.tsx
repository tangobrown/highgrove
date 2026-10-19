import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { EnquiryForm } from "./EnquiryForm";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-4 border-b border-rule py-[18px] text-[17px] sm:grid-cols-[120px_1fr]">
      <dt className="font-bold">{label}</dt>
      <dd className="min-w-0 leading-normal break-words">{children}</dd>
    </div>
  );
}

/** "Become part of the family." contact details + enquiry form. `#enquire` on inner pages, `#visit` on Home. */
export function EnquirySection({ variant = "default" }: { variant?: "default" | "home" }) {
  const home = variant === "home";
  return (
    <section id={home ? "visit" : "enquire"} aria-labelledby="enquire-heading">
      <div className="container-site grid-split items-start gap-12 py-14 sm:py-16 lg:gap-16 lg:py-[104px]">
        <div>
          <p className="eyebrow mb-4">{home ? "Come and see for yourself" : "Request information"}</p>
          <h2 id="enquire-heading" className="mb-6 font-display text-[clamp(40px,4.6vw,60px)] leading-[1.06]">
            Become part of the family.
          </h2>
          <p className="text-lead mb-9 max-w-[44ch]">
            Tell us a little about what you’re looking for and we’ll send current availability, or arrange a time to
            show you and your family through.
          </p>
          <dl className="grid border-t border-rule">
            <Row label="Phone">
              <a href={site.phone.href} className="hover:text-green-text">
                {site.phone.display}
              </a>
            </Row>
            {home && (
              <Row label="Tours">
                Contact {site.tours.name} on{" "}
                <a href={site.tours.href} className="hover:text-green-text">
                  {site.tours.display}
                </a>
              </Row>
            )}
            <Row label="Email">
              <a href={`mailto:${site.email}`} className="hover:text-green-text">
                {site.email}
              </a>
            </Row>
            <Row label="Find us">
              {home
                ? `${site.address.street} or ${site.address.alt}, ${site.address.suburb}, ${site.address.city}`
                : `${site.address.street}, ${site.address.suburb}, ${site.address.city}`}
            </Row>
          </dl>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-float sm:p-10">
          <EnquiryForm variant={variant} />
        </div>
      </div>
    </section>
  );
}
