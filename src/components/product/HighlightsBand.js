import { getHighlights } from "@/data/productContent";

export default function HighlightsBand({ product }) {
  return (
    <section aria-label="Highlights" className="border-y border-black/10 px-5 md:px-6">
      <ul className="mx-auto grid w-full max-w-[1280px] grid-cols-2 md:grid-cols-4">
        {getHighlights(product).map((h, i) => (
          <li
            key={h.label}
            className={`px-2 py-8 text-center md:py-12 ${i % 2 === 1 ? "border-l border-black/10" : ""} ${
              i > 1 ? "border-t border-black/10 md:border-t-0" : ""
            } ${i > 0 ? "md:border-l md:border-black/10" : ""}`}
          >
            <p className="font-serif text-4xl tracking-tight md:text-6xl">{h.value}</p>
            <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-[var(--muted)] md:text-[13px]">
              {h.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}