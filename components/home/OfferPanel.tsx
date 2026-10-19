import Image from "next/image";

/** "$99 fixed weekly fee" campaign panel. Rendered only when `campaign.showOffer` is on (see lib/site.ts). */
export function OfferPanel() {
  return (
    <section aria-labelledby="offer-heading">
      <div className="container-site pb-14 sm:pb-16 lg:pb-[104px]">
        <div className="grid-split items-stretch overflow-hidden rounded-[24px] bg-white sm:rounded-[32px]">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <p className="mb-5 text-sm font-bold tracking-[0.14em] uppercase">Limited time offer</p>
            <h2 id="offer-heading" className="font-display text-[clamp(44px,5.6vw,76px)] leading-none">
              $99 fixed weekly fee<span className="align-top text-[0.55em]">*</span>
            </h2>
            <p className="mt-2.5 font-display text-[28px] sm:text-[34px]">for 3 years.</p>
            <p className="text-copy mt-7 max-w-[44ch]">
              This special offer makes Highgrove’s boutique village lifestyle even more affordable — plus a welcome
              surprise to make your new home feel all brand new.
            </p>
            <div className="mt-[30px] flex items-center gap-4 border-t border-border pt-7">
              <span
                aria-hidden="true"
                className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-teal text-[13px] font-black tracking-[0.04em] text-white"
              >
                GIFT
              </span>
              <div>
                <p className="text-[14px] font-bold tracking-[0.12em] text-body uppercase">A welcome gift of</p>
                <p className="text-[19px] font-black italic sm:text-[20px]">Brand new Fisher &amp; Paykel appliances*</p>
              </div>
            </div>
            <p className="mt-6 text-[14px] text-muted">*Terms &amp; conditions apply</p>
          </div>
          <div className="relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/photo-pool-friends.png"
              alt="Two friends smiling in the indoor pool"
              fill
              sizes="(min-width: 1024px) 608px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
