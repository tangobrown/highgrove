import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
import { BulletList, Eyebrow } from "@/components/ui/Typography";
import { Section } from "./Section";

type ImageShape = "arch" | "circle" | "card";

type Props = {
  id?: string;
  tone?: "white" | "cream" | "teal";
  reverse?: boolean;
  image: { src: string; alt: string; position?: string; shape?: ImageShape };
  eyebrow?: string;
  title: ReactNode;
  /** Paragraphs of body copy. */
  body?: ReactNode[];
  bullets?: ReactNode[];
  /** Button, text link or any extra content under the copy. */
  action?: ReactNode;
  children?: ReactNode;
};

const aspect: Record<ImageShape, number> = { arch: 0.9, circle: 1, card: 1.3 };

/** Two-column image + text block. Image sits above the text when stacked. */
export function SplitFeature({ id, tone = "white", reverse = false, image, eyebrow, title, body, bullets, action, children }: Props) {
  const shape = image.shape ?? "arch";
  const onTeal = tone === "teal";
  return (
    <Section id={id} tone={tone}>
      <div className="grid-split items-center gap-10 lg:gap-16">
        <div className={`mx-auto w-full ${shape === "card" ? "max-w-[600px]" : "max-w-[500px]"} ${reverse ? "lg:order-2" : ""}`}>
          <Photo
            src={image.src}
            alt={image.alt}
            shape={shape}
            aspect={aspect[shape]}
            position={image.position}
            sizes="(min-width: 1024px) 500px, 90vw"
          />
        </div>
        <div className="min-w-0">
          {eyebrow && (
            <Eyebrow onTeal={onTeal} className="mb-4">
              {eyebrow}
            </Eyebrow>
          )}
          <h2 className={`text-h2 mb-6 ${onTeal ? "text-white" : ""}`}>{title}</h2>
          {body?.map((p, i) => (
            <p key={i} className={`text-copy mb-[18px] max-w-[52ch] ${onTeal ? "text-white/88" : ""}`}>
              {p}
            </p>
          ))}
          {bullets && <BulletList items={bullets} onTeal={onTeal} className="mt-2 mb-2 max-w-[52ch]" />}
          {children}
          {action && <div className="mt-8 flex flex-wrap gap-3">{action}</div>}
        </div>
      </div>
    </Section>
  );
}
