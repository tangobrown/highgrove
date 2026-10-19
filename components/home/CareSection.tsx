import { ButtonLink } from "@/components/ui/Button";
import { OrnamentRule } from "@/components/ui/OrnamentRule";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Typography";
import { site } from "@/lib/site";

/** Teal Patrick Ferry House band (#care). */
export function CareSection() {
  return (
    <section id="care" aria-labelledby="care-heading" className="bg-teal text-white">
      <div className="container-site grid-split items-center gap-12 py-14 sm:py-16 lg:gap-16 lg:py-[104px]">
        <div className="mx-auto w-full max-w-[500px]">
          <Photo
            src="/images/photo-pfh-care.png"
            alt="A carer at Patrick Ferry House walking with a resident"
            shape="arch"
            aspect={0.92}
            position="50% 20%"
            sizes="(min-width: 1024px) 500px, 92vw"
          />
        </div>
        <div className="min-w-0">
          <Eyebrow onTeal className="mb-[18px]">
            Patrick Ferry House
          </Eyebrow>
          <h2 id="care-heading" className="font-display text-[clamp(40px,5vw,68px)] leading-[1.04] text-balance">
            All the care you need.
          </h2>
          <OrnamentRule onTeal className="my-[30px]" />
          <p className="mb-[30px] max-w-[48ch] text-[18px] leading-[1.65] text-pretty text-white/88 sm:text-[19px]">
            Situated alongside Highgrove is Patrick Ferry House, our {site.bedCount}-bed on-site hospital — so couples
            and families stay close, even when one of you needs more care.
          </p>
          <div className="mb-9 max-w-[260px] rounded-2xl border border-green-soft/30 px-5 py-[18px]">
            <p className="font-display text-[34px] leading-tight">{site.bedCount} beds</p>
            <p className="mt-1 text-[15px] text-white/78">hospital-level care on site</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5">
            <ButtonLink href="/patrick-ferry-house" variant="onTeal">
              Visit Patrick Ferry House
            </ButtonLink>
            <a
              href={site.tours.href}
              className="inline-flex min-h-11 items-center text-[17px] font-bold text-white transition-colors duration-200 hover:text-green-soft"
            >
              <span className="border-b-[1.5px] border-green pb-0.5">
                Call {site.tours.name} on {site.tours.display}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
