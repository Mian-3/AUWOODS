import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function RelatedProducts({ title, items, href, linkLabel, tone = "white" }) {
  if (!items?.length) return null;
  return (
    <section
      aria-label={title}
      className={`px-5 py-16 md:px-6 md:py-24 ${tone === "cream" ? "bg-[#f7f3ee]" : ""}`}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div data-reveal className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div>
            <span className="mb-5 block h-[2px] w-12 bg-[var(--wood)]" />
            <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl">{title}</h2>
          </div>
          {href && (
            <Link href={href} className="link-line text-[14px] font-medium">
              {linkLabel}
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-3 md:grid-cols-4 md:gap-x-6">
          {items.map((p) => (
            <ProductCard key={p.slug} item={p} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}