import Link from "next/link";
import { PillBar } from "@/components/sections/InnerHero";
import { categories, categorySlug, type Category } from "@/lib/posts";

/** Build a /blog URL for a category and page. */
export function blogHref({ category, page }: { category?: Category; page?: number }) {
  const params = new URLSearchParams();
  if (category) params.set("category", categorySlug(category));
  if (page && page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

function FilterPill({ href, active, children }: { href: string; active: boolean; children: string }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-[18px] text-[15px] font-bold whitespace-nowrap transition-colors duration-200 ${
        active
          ? "border-teal bg-teal text-white"
          : "border-rule bg-white text-teal hover:border-teal hover:bg-teal hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

/** "Browse" bar with the category filter pills. */
export function CategoryFilter({ active }: { active?: Category }) {
  return (
    <PillBar label="Browse">
      <FilterPill href={blogHref({})} active={!active}>
        All
      </FilterPill>
      {categories.map((c) => (
        <FilterPill key={c} href={blogHref({ category: c })} active={active === c}>
          {c}
        </FilterPill>
      ))}
    </PillBar>
  );
}

const circle =
  "flex size-[46px] shrink-0 items-center justify-center rounded-full font-bold transition-colors duration-200";
const outline = "border border-rule text-teal hover:border-teal";

/** Numbered page circles with Previous / Next pills. */
export function Pagination({ page, totalPages, category }: { page: number; totalPages: number; category?: Category }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav aria-label="Pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2.5 sm:mt-[72px]">
      {page > 1 && (
        <Link
          href={`${blogHref({ category, page: page - 1 })}#posts`}
          className={`mr-1.5 inline-flex min-h-[46px] items-center rounded-full px-[22px] font-bold ${outline}`}
        >
          <span aria-hidden="true">←&nbsp;</span>Previous
        </Link>
      )}
      {pages.map((n) =>
        n === page ? (
          <span key={n} aria-current="page" className={`${circle} bg-teal text-white`}>
            <span className="sr-only">Page </span>
            {n}
          </span>
        ) : (
          <Link key={n} href={`${blogHref({ category, page: n })}#posts`} className={`${circle} ${outline}`}>
            <span className="sr-only">Page </span>
            {n}
          </Link>
        ),
      )}
      {page < totalPages && (
        <Link
          href={`${blogHref({ category, page: page + 1 })}#posts`}
          className={`ml-1.5 inline-flex min-h-[46px] items-center rounded-full px-[22px] font-bold ${outline}`}
        >
          Next<span aria-hidden="true">&nbsp;→</span>
        </Link>
      )}
    </nav>
  );
}
