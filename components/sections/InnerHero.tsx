import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type Crumb = { label: string; href?: string };
export type Anchor = { label: string; href: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: { src: string; alt: string; position?: string };
  crumbs: Crumb[];
  anchors?: Anchor[];
  /** Label before the anchor pills. Defaults to "On this page". */
  anchorsLabel?: string;
  /** Replace the anchor pills with custom content (e.g. blog category filters). */
  bar?: ReactNode;
};

export function Breadcrumbs({ crumbs, className = "" }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap gap-2.5 text-[15px] text-muted">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={i} className="flex gap-2.5">
              {c.href && !last ? (
                <Link href={c.href} className="hover:text-green-text">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "font-bold text-teal" : ""}>
                  {c.label}
                </span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function AnchorPill({ href, children, active = false }: { href: string; children: ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-[18px] text-[15px] font-bold whitespace-nowrap transition-colors duration-200 ${
        active
          ? "border-teal bg-teal text-white"
          : "border-rule bg-white text-teal hover:border-teal hover:bg-teal hover:text-white"
      }`}
    >
      {children}
    </a>
  );
}

/** "On this page" style bar. Scrolls horizontally on one line on mobile. */
export function PillBar({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="-mx-5 flex items-center gap-2.5 overflow-x-auto border-t border-rule px-5 py-[18px] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      <span className="mr-2 shrink-0 text-sm font-bold tracking-[0.12em] whitespace-nowrap text-muted uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

/** Compact inner-page hero: breadcrumb, text + circle photo, then the anchor bar. */
export function InnerHero({ eyebrow, title, intro, image, crumbs, anchors, anchorsLabel = "On this page", bar }: Props) {
  return (
    <section className="container-site pt-9">
      <Breadcrumbs crumbs={crumbs} className="mb-7" />
      <div className="flex flex-col-reverse items-start gap-8 pb-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-14">
        <div className="min-w-0 flex-[1_1_460px]">
          <p className="eyebrow mb-3.5">{eyebrow}</p>
          <h1 className="text-h1 mb-[18px]">{title}</h1>
          {intro && <p className="text-lead max-w-[56ch]">{intro}</p>}
        </div>
        <div className="relative size-[180px] shrink-0 overflow-hidden rounded-full bg-rule/40 sm:size-[clamp(190px,24vw,300px)]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={90}
            sizes="(min-width: 640px) 300px, 180px"
            className="object-cover"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        </div>
      </div>
      {bar ??
        (anchors && anchors.length > 0 && (
          <PillBar label={anchorsLabel}>
            {anchors.map((a) => (
              <AnchorPill key={a.href} href={a.href}>
                {a.label}
              </AnchorPill>
            ))}
          </PillBar>
        ))}
    </section>
  );
}
