"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { testimonials } from "@/content/testimonials";

/** Rotating testimonial quotes. Auto-advances every 7s unless reduced motion is on or a dot is clicked. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [autoplay]);

  const q = testimonials[index];

  return (
    <section aria-roledescription="carousel" aria-label="What families say" className="bg-white">
      <div className="mx-auto max-w-[880px] px-5 py-16 text-center sm:px-8 lg:py-24">
        <Image src="/images/logo-icon.png" alt="" width={44} height={44} className="mx-auto mb-7 size-11" />
        <figure aria-live={autoplay ? "off" : "polite"}>
          <blockquote className="text-quote">“{q.quote}”</blockquote>
          <figcaption className="mt-[26px] text-[15px] font-bold tracking-[0.14em] text-green-text uppercase">
            {q.name}
          </figcaption>
        </figure>
        <div className="mt-7 flex justify-center gap-1">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              aria-current={i === index}
              onClick={() => {
                setAutoplay(false);
                setIndex(i);
              }}
              className="grid h-11 place-items-center px-0.5"
            >
              <span
                className={`block h-[9px] rounded-full transition-all duration-300 ease-out ${
                  i === index ? "w-[26px] bg-teal" : "w-[9px] bg-green-soft"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
