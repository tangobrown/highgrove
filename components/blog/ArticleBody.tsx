import Image from "next/image";
import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/** Minimal hast shape, enough to read plain text out of a node. */
type HastNode = { type: string; value?: string; tagName?: string; children?: HastNode[] };

function textOf(node: HastNode | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

function isImageOnly(node: HastNode | undefined) {
  const kids = (node?.children ?? []).filter((c) => !(c.type === "text" && !c.value?.trim()));
  return kids.length === 1 && kids[0].tagName === "img";
}

const components: Components = {
  p({ node, children }) {
    // A lone image is rendered as a <figure>, which can't sit inside <p>
    if (isImageOnly(node as HastNode)) return <>{children}</>;
    return <p className="mb-6 text-[19px] leading-[1.75] text-body">{children}</p>;
  },
  h2: ({ children }) => (
    <h2 className="mt-12 mb-[18px] font-display text-[30px] leading-[1.15] text-balance text-teal sm:text-[36px]">
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="mt-10 mb-3.5 text-[22px] leading-snug font-bold text-teal">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-8 mb-3 text-[19px] leading-snug font-bold text-teal">{children}</h4>,
  a({ href = "", children }) {
    const cls =
      "font-bold text-teal underline decoration-green decoration-2 underline-offset-4 [overflow-wrap:anywhere] transition-colors duration-200 hover:text-green-text";
    if (href.startsWith("/") && !href.startsWith("//")) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  },
  strong: ({ children }) => <strong className="font-bold text-teal">{children}</strong>,
  ul: ({ children }) => <ul className="mb-8 grid border-t border-rule">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-8 grid list-inside list-decimal border-t border-rule marker:font-bold marker:text-green-text">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex items-baseline gap-4 border-b border-rule py-[15px] text-lg leading-[1.6] text-body in-[ol]:list-item">
      <span aria-hidden="true" className="relative -top-0.5 size-2 shrink-0 rounded-full bg-green in-[ol]:hidden" />
      <span className="min-w-0">{children}</span>
    </li>
  ),
  blockquote({ node }) {
    // Pull quote: the last paragraph starting with a dash is the attribution
    const paras = ((node as HastNode | undefined)?.children ?? []).filter((c) => c.tagName === "p").map(textOf);
    const last = paras[paras.length - 1] ?? "";
    const hasCaption = paras.length > 1 && /^[—–-]\s*/.test(last);
    const quote = (hasCaption ? paras.slice(0, -1) : paras).join(" ");
    return (
      <figure className="my-14 text-center">
        <Image src="/images/logo-icon.png" alt="" width={30} height={30} className="mx-auto mb-[22px] size-[30px]" />
        <blockquote className="font-display text-[clamp(26px,3vw,34px)] leading-[1.4] text-balance text-teal italic">
          {quote}
        </blockquote>
        {hasCaption && (
          <figcaption className="mt-[18px] text-sm font-bold tracking-[0.14em] text-green-text uppercase">
            {last.replace(/^[—–-]\s*/, "")}
          </figcaption>
        )}
      </figure>
    );
  },
  img({ src, alt = "", title }) {
    if (typeof src !== "string" || !src) return null;
    return (
      <figure className="my-12">
        <div className="relative aspect-[1.5] w-full overflow-hidden rounded-[20px] bg-rule/40">
          <Image src={src} alt={alt} fill sizes="(min-width: 800px) 700px, 100vw" className="object-cover" />
        </div>
        {title && <figcaption className="mt-3.5 text-[15px] text-muted">{title}</figcaption>}
      </figure>
    );
  },
  hr: () => <hr className="mx-auto my-12 w-24 border-0 border-t-2 border-green-line" />,
  table: ({ children }) => (
    <div className="mb-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[17px] text-body">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b-2 border-rule px-3 py-2.5 font-bold text-teal">{children}</th>,
  td: ({ children }) => <td className="border-b border-rule px-3 py-2.5">{children}</td>,
};

/** Renders a post's Markdown body with the article styles from the design. */
export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </Markdown>
    </div>
  );
}
