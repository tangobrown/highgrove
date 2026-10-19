"use client";

import { useEffect, useRef, useState } from "react";

const pill =
  "inline-flex min-h-11 items-center rounded-full bg-cream px-4 text-[15px] font-bold whitespace-nowrap text-teal transition-colors duration-200 hover:bg-teal hover:text-white";

/** Share pills: Facebook, Email and Copy link. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const email = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${url}`)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older browsers: fall back to a hidden textarea
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="mr-1 text-sm font-bold tracking-[0.12em] text-muted uppercase">Share</span>
      <a href={facebook} target="_blank" rel="noopener noreferrer" className={pill}>
        Facebook<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={email} className={pill}>
        Email
      </a>
      <button type="button" onClick={copy} className={`${pill} cursor-pointer`}>
        {copied ? "Link copied" : "Copy link"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
