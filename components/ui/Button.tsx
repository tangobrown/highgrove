import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "onTeal" | "outlineOnTeal";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-teal text-white hover:bg-teal-hover",
  secondary: "border-[1.5px] border-teal text-teal hover:bg-teal hover:text-white",
  onTeal: "bg-white text-teal hover:bg-green-soft focus-visible:ring-offset-teal",
  outlineOnTeal:
    "border-[1.5px] border-white/60 text-white hover:bg-white hover:text-teal focus-visible:ring-offset-teal",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-[13px] text-base",
  lg: "px-[30px] py-[17px] text-[17px] sm:px-[34px] sm:py-[18px] sm:text-lg",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** A pill-shaped link styled as a button. Uses a plain <a> for tel:/mailto:/external hrefs. */
export function ButtonLink({ variant = "primary", size = "lg", className, href, children, ...rest }: ButtonLinkProps) {
  const cls = buttonClasses(variant, size, className);
  if (typeof href === "string" && /^(tel:|mailto:|https?:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
