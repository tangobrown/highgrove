import Image from "next/image";

/** Line · leaf mark · line. Sits between an H1/H2 and its intro. Use `onTeal` on dark sections. */
export function OrnamentRule({ onTeal = false, className = "" }: { onTeal?: boolean; className?: string }) {
  const line = onTeal ? "bg-green-soft/40" : "bg-green-line";
  return (
    <div aria-hidden="true" className={`flex max-w-[380px] items-center gap-3.5 ${className}`}>
      <span className={`h-px flex-1 ${line}`} />
      {onTeal ? (
        <span className="size-2 rounded-full bg-green" />
      ) : (
        <Image src="/images/logo-icon.png" alt="" width={22} height={22} className="size-[22px]" />
      )}
      <span className={`h-px flex-1 ${line}`} />
    </div>
  );
}
