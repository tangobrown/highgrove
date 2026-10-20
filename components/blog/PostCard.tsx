import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { formatPostDate, type PostMeta } from "@/lib/posts";
import { Arrow } from "@/components/ui/Arrow";

/** "Village life · 4 October 2024" */
export function PostMetaLine({ post, className = "" }: { post: Pick<PostMeta, "category" | "date">; className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3.5 gap-y-2 text-sm font-bold tracking-[0.1em] uppercase ${className}`}
    >
      <span className="text-green-text">{post.category}</span>
      <span aria-hidden="true" className="size-1 rounded-full bg-[#9DB0BF]" />
      <time dateTime={post.date} className="text-muted">
        {formatPostDate(post.date)}
      </time>
    </div>
  );
}

/**
 * A post's hero image in a fixed-aspect frame, or a calm branded panel
 * (soft green with the leaf mark) when the post has no image.
 */
export function PostImage({
  post,
  aspect,
  className = "",
  sizes,
  priority,
}: {
  post: Pick<PostMeta, "heroImage" | "heroAlt">;
  aspect: number | string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const style = typeof aspect === "number" ? { aspectRatio: aspect } : undefined;
  const aspectClass = typeof aspect === "string" ? aspect : "";
  if (!post.heroImage) {
    return (
      <div
        className={`flex w-full items-center justify-center overflow-hidden bg-green-soft ${aspectClass} ${className}`}
        style={style}
      >
        <div className="flex size-[30%] max-h-28 max-w-28 min-h-14 min-w-14 items-center justify-center rounded-full bg-cream">
          <Image src="/images/logo-icon.png" alt="" width={64} height={64} className="size-1/2 object-contain" />
        </div>
      </div>
    );
  }
  return (
    <div className={`relative w-full overflow-hidden bg-rule/40 ${aspectClass} ${className}`} style={style}>
      <Image
        src={post.heroImage}
        quality={90}
        alt={post.heroAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

/** Blog card: image, meta, H3, excerpt and "Read more" with an arrow. The whole card is the link. */
export function PostCard({ post, headingLevel = "h3" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4 text-teal">
      <PostImage
        post={post}
        aspect={1.45}
        className="rounded-[20px]"
        sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw"
      />
      <PostMetaLine post={post} />
      <Heading className="text-h3 transition-colors duration-200 group-hover:text-green-text">{post.title}</Heading>
      <p className="text-[17px] leading-[1.6] text-body">{post.excerpt}</p>
      <span className="inline-flex items-center gap-1.5 self-start border-b-2 border-green pb-0.5 text-base font-bold">
        Read more <Arrow />
      </span>
    </Link>
  );
}

/** Two-column featured post: large image, "Featured" chip, meta, H2, excerpt and a button. */
export function FeaturedPostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group grid-split items-center gap-8 text-teal sm:gap-12">
      <PostImage
        post={post}
        aspect={1.35}
        className="rounded-[28px]"
        sizes="(min-width: 1280px) 600px, (min-width: 900px) 50vw, 100vw"
        priority
      />
      <div>
        <span className="mb-[22px] inline-block rounded-full bg-green-soft px-3.5 py-[7px] text-[13px] font-black tracking-[0.12em] uppercase">
          Featured
        </span>
        <PostMetaLine post={post} />
        <h2 className="mt-4 mb-[18px] font-display text-[clamp(34px,3.8vw,50px)] leading-[1.08] text-balance transition-colors duration-200 group-hover:text-green-text">
          {post.title}
        </h2>
        <p className="text-copy mb-7 max-w-[50ch]">{post.excerpt}</p>
        <span className={buttonClasses("primary", "md", "group-hover:bg-teal-hover")}>Read the article</span>
      </div>
    </Link>
  );
}
