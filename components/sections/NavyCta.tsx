import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";

type Props = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  cta: { label: string; href: string };
  /** Background of the band around the panel. */
  tone?: "cream" | "white";
  /** Drop the top padding when the panel follows a section of the same colour. */
  flushTop?: boolean;
};

/** Teal rounded panel: eyebrow + H2 on one side, copy + white pill on the other. */
export function NavyCta({ id, eyebrow, title, body, cta, tone = "cream", flushTop = false }: Props) {
  return (
    <section id={id} className={tone === "white" ? "bg-white" : "bg-cream"}>
      <div className={`container-site section-y ${flushTop ? "pt-0!" : ""}`}>
        <div className="grid-split items-center gap-8 rounded-[32px] bg-teal p-8 text-white sm:p-14 lg:gap-14">
          <div>
            <Eyebrow onTeal className="mb-4">
              {eyebrow}
            </Eyebrow>
            <h2 className="text-h2-cta">{title}</h2>
          </div>
          <div>
            <p className="mb-7 max-w-[48ch] text-lg leading-relaxed text-white/88">{body}</p>
            <ButtonLink href={cta.href} variant="onTeal">
              {cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
