import { Photo } from "@/components/ui/Photo";

export type GalleryItem = { src: string; alt: string; caption?: string; position?: string };

/** Auto-fill grid of captioned image tiles (aspect 1.45, 18px radius). */
export function Gallery({ items, min = 260 }: { items: GalleryItem[]; min?: 230 | 260 }) {
  return (
    <div
      className="grid gap-x-5 gap-y-7"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${min}px), 1fr))` }}
    >
      {items.map((item) => (
        <figure key={item.src}>
          <Photo
            src={item.src}
            alt={item.alt}
            shape="tile"
            aspect={1.45}
            position={item.position}
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
          />
          <figcaption className="mt-3 text-base font-bold">{item.caption ?? item.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}
