import type { ReactNode } from "react";

export type NumberedCard = { title: string; body: ReactNode };

/** Auto-fit grid of numbered white cards ("01", H3, paragraph). Place inside a cream Section. */
export function CardGrid({ cards, className = "", cardTone = "white" }: { cards: NumberedCard[]; className?: string; cardTone?: "white" | "cream" }) {
  return (
    <div className={`grid-cards gap-6 ${className}`}>
      {cards.map((c, i) => (
        <div
          key={c.title}
          className={`flex flex-col gap-3.5 rounded-3xl px-[30px] pt-8 pb-[30px] ${cardTone === "white" ? "bg-white" : "bg-cream"}`}
        >
          <span className="text-sm font-black tracking-[0.12em] text-green-text">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-h3">{c.title}</h3>
          <p className="text-[17px] leading-[1.65] text-body">{c.body}</p>
        </div>
      ))}
    </div>
  );
}
