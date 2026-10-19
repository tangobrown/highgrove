import Image from "next/image";
import Link from "next/link";
import { footerLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-10 pt-16 pb-12">
        <div className="min-w-0">
          <Image
            src="/images/logo-wide.png"
            alt="Highgrove Retirement Village & Patrick Ferry House"
            width={302}
            height={56}
            className="h-14 w-auto max-w-full"
          />
          <p className="mt-[22px] max-w-[38ch] text-base leading-relaxed text-body">
            A family owned and operated boutique retirement village in Albany, alongside Patrick Ferry House hospital.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-4 text-sm font-black tracking-[0.12em] uppercase">Explore</h2>
          <ul className="grid gap-2.5 text-base">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-green-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 text-sm font-black tracking-[0.12em] uppercase">Visit</h2>
          <address className="grid gap-2.5 text-base leading-normal text-body not-italic">
            <span>
              {site.address.street} or {site.address.alt}, {site.address.suburb}, {site.address.city}
            </span>
            <a href={site.phone.href} className="font-bold text-teal hover:text-green-text">
              {site.phone.short}
            </a>
            <a href={`mailto:${site.email}`} className="text-teal hover:text-green-text">
              {site.email}
            </a>
          </address>
        </div>
      </div>
      <div className="bg-teal text-sm text-white/80">
        <div className="container-site flex flex-wrap justify-between gap-x-6 gap-y-2 py-4">
          <span>© 2026 Ferry Enterprises Ltd</span>
          <span>Member of the Retirement Villages Association of New Zealand</span>
        </div>
      </div>
    </footer>
  );
}
