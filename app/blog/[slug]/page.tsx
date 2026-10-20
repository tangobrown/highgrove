import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { PostCard, PostImage, PostMetaLine } from "@/components/blog/PostCard";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { Breadcrumbs } from "@/components/sections/InnerHero";
import { NavyCta } from "@/components/sections/NavyCta";
import { TextLink } from "@/components/ui/TextLink";
import { bodyWithoutLead, getAllPosts, getPost, getRelatedPosts, type Author } from "@/lib/posts";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { absoluteUrl, clipDescription, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { Arrow } from "@/components/ui/Arrow";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMeta({
    title: `${post.title} | Highgrove`,
    description: clipDescription(post.excerpt),
    path: `/blog/${post.slug}`,
    image: post.heroImage ? { src: post.heroImage, alt: post.heroAlt ?? post.title } : undefined,
    type: "article",
  });
  return {
    ...base,
    authors: [{ name: post.author.name }],
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.date, authors: [post.author.name], section: post.category },
  };
}

function AuthorAvatar({ author }: { author: Author }) {
  const isLogo = author.avatar.endsWith("logo-icon.png");
  return (
    <div
      className={`relative size-[52px] shrink-0 overflow-hidden rounded-full ${isLogo ? "border border-rule bg-white" : "bg-rule/40"}`}
    >
      <Image
        src={author.avatar}
        alt=""
        fill
        sizes="52px"
        className={isLogo ? "object-contain p-3" : "object-cover"}
      />
    </div>
  );
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);
  const url = `${site.url}/blog/${post.slug}`;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }];
  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: clipDescription(post.excerpt),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-NZ",
    articleSection: post.category,
    image: absoluteUrl(post.heroImage ?? "/images/grounds-apartments-lawn.jpg"),
    author:
      post.author.name === "Highgrove team"
        ? { "@id": absoluteUrl("/#organization") }
        : { "@type": "Person", name: post.author.name },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: url,
  };

  return (
    <>
      <article>
        <header className="container-site pt-9">
          <Breadcrumbs
            crumbs={crumbs}
            className="mb-7"
          />
          <div className="mx-auto max-w-[860px] pt-2 pb-10 text-center sm:pt-6 sm:pb-12">
            <PostMetaLine post={post} className="mb-[22px] justify-center" />
            <h1 className="text-h1 mb-[22px]">{post.title}</h1>
            <p className="mx-auto max-w-[52ch] text-[19px] leading-[1.6] text-pretty text-body sm:text-[21px]">
              {post.excerpt}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3.5">
              <AuthorAvatar author={post.author} />
              <div className="text-left">
                <p className="text-base font-bold">{post.author.name}</p>
                <p className="text-[15px] text-muted">
                  {post.author.role} · {post.readingTime} min read
                </p>
              </div>
            </div>
          </div>
          <PostImage
            post={post}
            aspect="aspect-[1.5] sm:aspect-[2.2]"
            className="rounded-t-[20px] sm:rounded-t-[28px]"
            sizes="(min-width: 1280px) 1216px, 100vw"
            priority
          />
        </header>

        <div className="bg-white">
          <div className="mx-auto max-w-[760px] px-5 pt-12 pb-16 sm:px-8 sm:pt-[72px] sm:pb-[88px]">
            <ArticleBody markdown={bodyWithoutLead(post)} />

            <div className="mt-14 flex flex-wrap items-center justify-between gap-x-7 gap-y-4 border-t border-rule pt-7">
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center self-center text-base font-bold transition-colors duration-200 hover:text-green-text"
              >
                <span className="inline-flex items-center gap-1.5 border-b-2 border-green pb-0.5">
                  <Arrow direction="left" />
                  Back to the blog
                </span>
              </Link>
              <ShareButtons url={url} title={post.title} />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="more-heading" className="container-site pt-16 sm:pt-24">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-rule pb-5">
            <h2 id="more-heading" className="font-display text-[clamp(30px,3.2vw,40px)] leading-[1.15]">
              More from the blog
            </h2>
            <TextLink href="/blog" className="text-base whitespace-nowrap">
              All posts
            </TextLink>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-x-8 gap-y-14">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <NavyCta
        eyebrow="Come and see for yourself"
        title="Become part of the family."
        body="Available to view Monday to Friday 10am–4pm, and weekends by appointment."
        cta={{ label: "Book a tour today", href: "#enquire" }}
      />
      <EnquirySection />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(postSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs, `/blog/${post.slug}`))} />
    </>
  );
}
