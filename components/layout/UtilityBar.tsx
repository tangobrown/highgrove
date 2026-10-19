import { site } from "@/lib/site";

export function UtilityBar() {
  return (
    <div className="bg-teal text-sm text-white">
      <div className="container-site flex flex-wrap items-center justify-between gap-x-7 gap-y-1.5 py-[9px]">
        <span className="hidden text-white/85 sm:inline">{site.hours}</span>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <a href={site.phone.href} className="font-bold hover:text-green-soft">
            Phone {site.phone.short}
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-green-soft">
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}
