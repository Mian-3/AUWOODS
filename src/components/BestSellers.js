import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { bestSellersContent } from "@/data/content";
import { getBestSellers } from "@/data/products";

export default function BestSellers() {
  const items = getBestSellers();
  return (
    <section
      aria-labelledby="best-sellers-title"
      className="px-5 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <div data-reveal className="mb-12 flex flex-col items-center md:mb-14">
          <span className="mb-5 block h-[2px] w-12 bg-[var(--wood)]" />
          <h2
            id="best-sellers-title"
            className="font-serif text-4xl font-normal tracking-tight md:text-5xl"
          >
            {bestSellersContent.title}
          </h2>
        </div>

        {/* Barabar size ke cards */}
        <div className="grid grid-cols-2 gap-x-3 md:grid-cols-3 md:gap-x-6">
          {items.map((item) => (
            <ProductCard key={item.slug} item={item} variant="grid" />
          ))}
        </div>

        <div data-reveal className="mt-8 flex justify-center md:mt-12">
          <Link
            href={bestSellersContent.cta.href}
            className="rounded-full border border-[var(--wood)] px-10 py-3 text-[14px] font-medium transition-colors duration-300 hover:bg-[var(--wood)] hover:text-white"
          >
            {bestSellersContent.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}