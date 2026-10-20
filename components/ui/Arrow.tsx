/** Arrow icon used in text links and buttons. Sized to the surrounding text. */
export function Arrow({ direction = "right", className = "" }: { direction?: "right" | "left"; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`inline-block size-[1.1em] shrink-0 ${direction === "left" ? "rotate-180" : ""} ${className}`}
    >
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
    </svg>
  );
}
