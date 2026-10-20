import Image from "next/image";
import type { CSSProperties } from "react";

type Shape = "arch" | "circle" | "card" | "tile" | "none";

const shapes: Record<Shape, string> = {
  arch: "rounded-arch",
  circle: "rounded-full",
  card: "rounded-3xl",
  tile: "rounded-[18px]",
  none: "",
};

type Props = {
  src: string;
  alt: string;
  /** width / height, e.g. 0.9 for a portrait arch */
  aspect?: number;
  shape?: Shape;
  /** CSS object-position, e.g. "70% 40%" */
  position?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
};

/**
 * A responsive photo in a fixed-aspect frame. Wraps next/image with `fill`
 * so every shape (arch, circle, card, tile) crops consistently.
 */
export function Photo({
  src,
  alt,
  aspect = 1,
  shape = "none",
  position,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className = "",
  imgClassName = "",
  style,
}: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-rule/40 ${shapes[shape]} ${className}`}
      style={{ aspectRatio: aspect, ...style }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        className={`object-cover ${imgClassName}`}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
