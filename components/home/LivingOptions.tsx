import Link from "next/link";
import { Photo } from "@/components/ui/Photo";

const options = [
  {
    href: "/independent-living",
    image: { src: "/images/photo-lounge.png", alt: "Apartment living room" },
    eyebrow: "No maintenance, ever",
    title: "Independent living",
    body: "One and two bedroom apartments, light-filled and low maintenance, with the grounds looked after for you.",
    link: "View apartments",
  },
  {
    href: "/assisted-living",
    image: { src: "/images/photo-kitchen.png", alt: "Care suite interior" },
    eyebrow: "Support when you want it",
    title: "Care suites",
    body: "The independence you want with the support you need — meals, housekeeping and care, there when you want a hand.",
    link: "About care suites",
  },
  {
    href: "/patrick-ferry-house",
    image: { src: "/images/photo-pfh-care.jpg", alt: "A carer walking with a resident", position: "50% 30%" },
    eyebrow: "Stay close as needs change",
    title: "Patrick Ferry House",
    body: "Continued care right alongside the village, in surroundings as familiar and friendly as Highgrove itself.",
    link: "All the care you need",
  },
];

/** "Choose the way you'd like to live" — three arch cards linking to the living options. */
export function LivingOptions() {
  return (
    <section id="living" aria-labelledby="living-heading">
      <div className="container-site py-14 sm:py-16 lg:pt-[104px] lg:pb-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 lg:mb-[52px]">
          <div>
            <p className="eyebrow mb-4">Your home, your haven</p>
            <h2
              id="living-heading"
              className="max-w-[18ch] font-display text-[clamp(38px,4.4vw,56px)] leading-[1.08] text-balance"
            >
              Choose the way you’d like to live
            </h2>
          </div>
          <p className="text-lead max-w-[42ch]">
            Three levels of living and care on one site — so your choices can change with you, without ever having to
            leave.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((o) => (
            <li key={o.href} className="flex">
              <Link
                href={o.href}
                className="group flex w-full flex-col rounded-b-3xl text-teal focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream focus-visible:outline-none"
              >
                <Photo
                  src={o.image.src}
                  alt={o.image.alt}
                  shape="arch"
                  aspect={1.05}
                  position={o.image.position}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw"
                />
                <div className="flex grow flex-col gap-3 rounded-b-3xl bg-white px-6 pt-6 pb-7 sm:px-7 sm:pt-7 sm:pb-8">
                  <span className="text-[13px] font-bold tracking-[0.14em] text-green-text uppercase">
                    {o.eyebrow}
                  </span>
                  <h3 className="font-display text-[28px] leading-[1.15] sm:text-[32px]">{o.title}</h3>
                  <p className="grow text-[17px] leading-[1.6] text-body">{o.body}</p>
                  <span className="mt-2 self-start border-b-2 border-green pb-[3px] text-base font-bold transition-colors duration-200 group-hover:text-green-text">
                    {o.link}
                    <span aria-hidden="true"> →</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
