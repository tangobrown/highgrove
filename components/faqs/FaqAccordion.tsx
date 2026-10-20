"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import type { Faq, FaqBlock } from "@/content/faqs";

const linkCls =
  "font-bold text-teal underline decoration-green decoration-2 underline-offset-4 transition-colors hover:text-green-text";

/** Turn bare "www.example.co.nz" mentions into links. */
function linkify(text: string): ReactNode[] {
  return text.split(/(www\.[a-z0-9-]+(?:\.[a-z0-9-]+)+)/gi).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`https://${part}`} target="_blank" rel="noopener noreferrer" className={linkCls}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function Block({ block }: { block: FaqBlock }) {
  if (typeof block === "string") return <p>{linkify(block)}</p>;
  if ("list" in block) {
    return (
      <ul className="grid gap-2">
        {block.list.map((li) => (
          <li key={li} className="flex items-baseline gap-3.5">
            <span aria-hidden="true" className="relative -top-0.5 size-2 shrink-0 rounded-full bg-green" />
            <span>{li}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      {block.before}
      {/^https?:/.test(block.link.href) || block.link.href.endsWith(".pdf") ? (
        <a href={block.link.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {block.link.label}
        </a>
      ) : (
        <Link href={block.link.href} className={linkCls}>
          {block.link.label}
        </Link>
      )}
      {block.after}
    </p>
  );
}

/** One-open-at-a-time FAQ accordion. The first item is open by default. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto grid max-w-[920px] border-t border-rule">
      {items.map((f, i) => {
        const open = openIndex === i;
        const btnId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <div key={f.q} className="border-b border-rule">
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left text-[18px] leading-[1.4] font-bold text-teal transition-colors duration-200 hover:text-green-text focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:outline-none sm:gap-6 sm:text-[19px]"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-[22px] leading-none font-normal text-teal"
                >
                  {open ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="grid gap-4 pb-[26px] text-[18px] leading-[1.65] text-body sm:pr-[60px]">
                  {f.a.map((b, j) => (
                    <Block key={j} block={b} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
