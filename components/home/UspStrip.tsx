import { Fragment } from "react";
import { site } from "@/lib/site";

const usps = ["Family owned & operated", `${site.bedCount}-bed hospital on site`, "No-maintenance living"];

/** Full-width green-soft band of key selling points, separated by dots. */
export function UspStrip() {
  return (
    <section id="usps" aria-label="Why Highgrove" className="bg-green-soft">
      <ul className="container-site flex flex-col items-center justify-center gap-x-9 gap-y-2.5 py-6 text-center text-[19px] font-bold sm:flex-row sm:flex-wrap sm:gap-y-3.5">
        {usps.map((usp, i) => (
          <Fragment key={usp}>
            {i > 0 && (
              <li aria-hidden="true" className="hidden size-1.5 shrink-0 rounded-full bg-teal/40 sm:block" />
            )}
            <li className="whitespace-nowrap">{usp}</li>
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
