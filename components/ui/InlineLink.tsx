import Link from "next/link";
import type { ReactNode } from "react";

/** A link inside running text: bold, with a green underline. `onTeal` for dark sections. */
export function InlineLink({ href, children, onTeal = false }: { href: string; children: ReactNode; onTeal?: boolean }) {
  return (
    <Link
      href={href}
      className={`font-bold underline decoration-green decoration-2 underline-offset-4 transition-colors duration-200 ${
        onTeal ? "text-white hover:text-green-soft" : "text-teal hover:text-green-text"
      }`}
    >
      {children}
    </Link>
  );
}
