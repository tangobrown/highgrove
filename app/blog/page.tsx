import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryFilter, Pagination } from "@/components/blog/BlogNav";
import { FeaturedPostCard, PostCard } from "@/components/blog/PostCard";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { InnerHero } from "@/components/sections/InnerHero";
import { NavyCta } from "@/components/sections/NavyCta";
import {
  categoryFromParam,
  getAllPosts,
  getFeaturedPost,
  POSTS_PER_PAGE,
  type Category,
} from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories, events and updates from the Highgrove Retirement Village and Patrick Ferry House family in Albany, Auckland.",
  alternates: { canonical: "/blog" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function parsePage(value: string | string[] | undefined) {
  const n = Number.parseInt(Array.isArray(value) ? value[0] : (value ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

/** Featured card, "Latest posts" grid and pagination for a category/page. */
function PostListing({ category, page: requestedPage }: { category?: Category; page: number }) {
  const all = getAllPosts();
  const featured = !category ? getFeaturedPost() : undefined;
  const pool = category ? all.filter((p) => p.category === category) : all.filter((p) => p.slug !== featured?.slug);
  const totalPages = Math.max(1, Math.ceil(pool.length / POSTS_PER_PAGE));
  const page = Math.min(requestedPage, totalPages);
  const posts = pool.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const showFeatured = featured && page === 1;

  return (
    <>
      {showFeatured && (
        <div className="mb-16 sm:mb-[88px]">
          <FeaturedPostCard post={featured} />
        </div>
      )}
      <div className="mb-9 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-rule pb-5">
        <h2 className="font-display text-[clamp(30px,3.2vw,40px)] leading-[1.15]">
          {category ? category : "Latest posts"}
        </h2>
        {totalPages > 1 && (
          <p className="text-[15px] text-muted">
            Page {page} of {totalPages}
          </p>
        )}
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-x-8 gap-y-14">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-lg text-muted">No posts in this category yet.</p>
      )}
      <Pagination page={page} totalPages={totalPages} category={category} />
    </>
  );
}

async function FilteredListing({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  return <PostListing category={categoryFromParam(sp.category)} page={parsePage(sp.page)} />;
}

async function FilterBar({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  return <CategoryFilter active={categoryFromParam(sp.category)} />;
}

export default function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <InnerHero
        eyebrow="Highgrove blog"
        title="News from the village."
        intro="Stories, events and updates from the Highgrove and Patrick Ferry House family."
        image={{ src: "/images/loc-gardener.png", alt: "A resident with fresh produce from the village gardens" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }, { label: "Blog" }]}
        bar={
          <Suspense fallback={<CategoryFilter />}>
            <FilterBar searchParams={searchParams} />
          </Suspense>
        }
      />

      <section id="posts" aria-label="Blog posts" className="bg-white">
        <div className="container-site pt-14 pb-16 sm:pt-[72px] sm:pb-24">
          <Suspense fallback={<PostListing page={1} />}>
            <FilteredListing searchParams={searchParams} />
          </Suspense>
        </div>
      </section>

      <NavyCta
        eyebrow="Come and see for yourself"
        title="Become part of the family."
        body="Available to view Monday to Friday 10am–4pm, and weekends by appointment."
        cta={{ label: "Book a tour today", href: "#enquire" }}
      />
      <EnquirySection />
    </>
  );
}
