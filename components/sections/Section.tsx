import type { ReactNode } from "react";

type Tone = "cream" | "white" | "teal" | "green";

const tones: Record<Tone, string> = {
  cream: "bg-cream",
  white: "bg-white",
  teal: "bg-teal text-white",
  green: "bg-green-soft",
};

/** Full-width band with the standard container and vertical rhythm. */
export function Section({
  id,
  tone = "cream",
  className = "",
  innerClassName = "",
  children,
  "aria-label": ariaLabel,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={`${tones[tone]} ${className}`}>
      <div className={`container-site section-y ${innerClassName}`}>{children}</div>
    </section>
  );
}
