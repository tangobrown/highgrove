import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/ui/Arrow";

type Props = { href: string; children: ReactNode; className?: string; arrow?: boolean };

/** Bold teal link with a green underline rule, followed by an arrow. */
export function TextLink({ href, children, className = "", arrow = true }: Props) {
  const cls = `inline-flex items-center gap-1.5 border-b-2 border-green pb-[3px] text-[17px] font-bold text-teal transition-colors duration-200 hover:text-green-text ${className}`;
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (/^(tel:|mailto:|https?:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
