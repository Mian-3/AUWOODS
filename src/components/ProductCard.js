"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { images } from "@/data/images";

const fmt = (n) => `Rs ${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export default function ProductCard({ item }) {
  const [liked, setLiked] = useState(false);

  const save = item.oldPrice - item.price;
  const percent = Math.round((save / item.oldPrice) * 100);

  return (
    <article className="group break-inside-avoid pb-6 md:pb-8">
      <div
        className={`relative w-full overflow-hidden rounded-md bg-[#f3efea] ${item.ratio}`}
      >
        <Link href="#" aria-label={item.name} className="absolute inset-0">
          <Image
            src={images.bestSellers[item.imageKey]}
            alt={item.name}
            fill
            sizes="(min-width: 1100px) 340px, (min-width: 768px) 30vw, 46vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--wood)] px-2.5 py-1 text-[11px] font-medium leading-none text-white">
          -{percent}%
        </span>

        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setLiked((v) => !v)}
          className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-white/80 backdrop-blur transition-colors hover:bg-white"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={liked ? "fill-[var(--wood)] text-[var(--wood)]" : ""}
          />
        </button>
      </div>

      <div className="pt-3">
        <h3 className="text-[14px] font-medium leading-snug md:text-[15px]">
          {item.name}
        </h3>
        <div className="mt-1 flex items-baseline justify-between gap-3 text-[13px]">
          <p className="flex items-baseline gap-2">
            <span className="text-[var(--muted)] line-through">
              {fmt(item.oldPrice)}
            </span>
            <span className="font-medium">{fmt(item.price)}</span>
          </p>
          <span className="text-[12px] font-medium text-[#8c2f23]">
            Save {fmt(save).replace("Rs ", "Rs.")}
          </span>
        </div>

        {/* Hover par slide: mobile par hamesha visible */}
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 pt-3">
              <button
                type="button"
                className="group/btn relative h-9 flex-1 rounded-full bg-[var(--wood)] text-[12px] font-medium text-white transition-colors hover:bg-black"
              >
                <span className="transition-opacity duration-200 group-hover/btn:opacity-0">
                  Select options
                </span>
                <ShoppingBag
                  size={16}
                  strokeWidth={1.5}
                  className="absolute inset-0 m-auto opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100"
                />
              </button>
              <button
                type="button"
                aria-label={`Quick view ${item.name}`}
                className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-black/5"
              >
                <Search size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}