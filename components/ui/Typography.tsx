import type { ReactNode } from "react";

/** Small uppercase label above headings. `onTeal` switches to the soft green used on dark sections. */
export function Eyebrow({
  children,
  onTeal = false,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  onTeal?: boolean;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return <Tag className={`eyebrow ${onTeal ? "text-green-soft" : ""} ${className}`}>{children}</Tag>;
}

/** A section header: eyebrow, H2 and an optional intro paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  onTeal = false,
  align = "left",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  onTeal?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-[760px] ${className}`}>
      {eyebrow && (
        <Eyebrow onTeal={onTeal} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={`text-h2 ${onTeal ? "text-white" : ""}`}>{title}</h2>
      {intro && (
        <p
          className={`text-lead mt-5 max-w-[56ch] ${centered ? "mx-auto" : ""} ${onTeal ? "text-white/88" : ""}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** Bulleted list with rule dividers and green dots. */
export function BulletList({ items, className = "", onTeal = false }: { items: ReactNode[]; className?: string; onTeal?: boolean }) {
  return (
    <ul className={`grid ${className}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex items-baseline gap-3.5 border-b py-3.5 text-lg leading-snug ${
            onTeal ? "border-green-soft/30 text-white/88" : "border-rule text-body"
          }`}
        >
          <span aria-hidden="true" className="relative -top-0.5 size-2 shrink-0 rounded-full bg-green" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
