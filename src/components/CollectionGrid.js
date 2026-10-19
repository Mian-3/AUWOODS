"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
];

const PAGE_SIZE = 8;

export default function CollectionGrid({ products }) {
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "discount") {
      list.sort(
        (a, b) =>
          (b.oldPrice - b.price) / b.oldPrice -
          (a.oldPrice - a.price) / a.oldPrice
      );
    }
    return list;
  }, [products, sort]);

  const shown = sorted.slice(0, visible);

  return (
    <>
      <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-4 text-[14px]">
        <p className="text-[var(--muted)]">{products.length} products</p>
        <label className="flex items-center gap-3">
          <span className="text-[var(--muted)]">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-h-11 cursor-pointer bg-transparent py-1 text-[16px] font-medium outline-none md:text-[14px]"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

     <div className="grid grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {shown.map((item) => (
          <ProductCard key={item.id} item={item} variant="grid" />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 md:mt-14">
        <p className="text-[13px] text-[var(--muted)]">
          Showing {shown.length} of {sorted.length}
        </p>
        {visible < sorted.length && (
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-[var(--wood)] px-10 py-3 text-[14px] font-medium transition-colors duration-300 hover:bg-[var(--wood)] hover:text-white"
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
}