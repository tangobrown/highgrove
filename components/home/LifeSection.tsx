import { Photo } from "@/components/ui/Photo";

const circles = [
  { src: "/images/circle-boardwalk.png", alt: "Residents on a local boardwalk" },
  { src: "/images/circle-entrance.png", alt: "Village entrance and gardens" },
  { src: "/images/circle-couple.jpg", alt: "Residents laughing together" },
  { src: "/images/circle-interior.png", alt: "A bright apartment lounge" },
  { src: "/images/circle-friends.jpg", alt: "Friends chatting over tea" },
];

const tiles = [
  { src: "/images/photo-pool.jpg", alt: "Heated indoor pool", caption: "Heated indoor pool" },
  { src: "/images/photo-lounge.png", alt: "Open-plan living", caption: "Light-filled, open-plan living" },
  { src: "/images/photo-kitchen.png", alt: "Modern apartment kitchen", caption: "Modern, easy-care kitchens" },
];

/** Life at Highgrove (#life): centred header, five offset circle photos, three tile cards. */
export function LifeSection() {
  return (
    <section id="life" aria-labelledby="life-heading">
      <div className="container-site py-14 sm:py-16 lg:pt-[104px] lg:pb-[104px]">
        <div className="mx-auto mb-10 max-w-[760px] text-center sm:mb-14">
          <p className="eyebrow mb-4">Life at Highgrove</p>
          <h2 id="life-heading" className="font-display text-[clamp(38px,4.4vw,56px)] leading-[1.1] text-balance">
            Set amongst beautiful grounds and gardens
          </h2>
          <p className="text-lead mx-auto mt-[22px] max-w-[52ch]">
            A wonderfully social, no-maintenance lifestyle — with a heated indoor pool, lounges, library and gardens a
            short walk from your door.
          </p>
        </div>

        {/* 3 + 2 wrap on phones/tablets, one row of five from lg. Alternate circles drop 28px. */}
        <ul className="flex flex-wrap items-center justify-center gap-4 pb-7 sm:gap-6">
          {circles.map((c, i) => (
            <li
              key={c.src}
              className={`w-[calc((100%-2rem)/3)] sm:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-6rem)/5)] ${
                i % 2 === 1 ? "translate-y-7" : ""
              }`}
            >
              <Photo
                src={c.src}
                alt={c.alt}
                shape="circle"
                aspect={1}
                sizes="(min-width: 1024px) 230px, 30vw"
              />
            </li>
          ))}
        </ul>

        <ul className="grid-cards mt-12 gap-5 sm:mt-16 lg:mt-[72px]">
          {tiles.map((t) => (
            <li key={t.src} className="overflow-hidden rounded-[22px] bg-white">
              <Photo src={t.src} alt={t.alt} aspect={1.4} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 92vw" />
              <p className="px-6 pt-5 pb-6 text-lg font-bold">{t.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
