import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { OrnamentRule } from "@/components/ui/OrnamentRule";
import { Photo } from "@/components/ui/Photo";

/** Home hero: H1, ornament rule, intro and CTAs beside an arch photo with a floating badge. */
export function HomeHero() {
  return (
    <section aria-labelledby="home-title">
      <div className="container-site grid-split items-center gap-12 pt-10 pb-14 sm:pt-16 sm:pb-[72px] lg:gap-14">
        <div className="max-w-[560px]">
          <p className="mb-[22px] text-[15px] font-bold tracking-[0.14em] uppercase">Highgrove Village · Albany</p>
          <h1 id="home-title" className="text-h1-home">
            Feels like family.
          </h1>
          <OrnamentRule className="mt-[34px] mb-[30px]" />
          <p className="max-w-[46ch] text-[19px] leading-[1.6] text-pretty text-body sm:text-[20px]">
            Family owned and operated, Highgrove is a friendly, boutique village set amongst beautiful grounds and
            gardens. Live independently and enjoy a wonderfully social, no-maintenance lifestyle in Albany.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <ButtonLink href="#visit">Book a tour today</ButtonLink>
            <ButtonLink href="#living" variant="secondary">
              Explore the village
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <Photo
            src="/images/home-hero.jpg"
            alt="Residents sharing a sunny lunch on a village courtyard"
            shape="arch"
            aspect={0.8}
            position="50% 50%"
            sizes="(min-width: 1024px) 540px, (min-width: 640px) 580px, 92vw"
            priority
          />
          <div className="absolute right-3 bottom-4 left-3 flex max-w-[300px] items-center gap-3.5 rounded-[18px] bg-white px-[22px] py-[18px] shadow-pop sm:right-auto sm:bottom-[34px] sm:left-4 lg:-left-7">
            <Image
              src="/images/circle-friends.jpg"
              alt=""
              width={52}
              height={52}
              className="size-[52px] shrink-0 rounded-full object-cover"
            />
            <p className="text-[15px] leading-[1.4] text-body">
              <strong className="text-teal">Family owned</strong> and run by people you’ll actually meet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
