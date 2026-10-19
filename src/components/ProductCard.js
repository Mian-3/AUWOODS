"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { images } from "@/data/images";

const fmt = (n) => `Rs ${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export default function ProductCard({ item, variant = "masonry" }) {
  const [liked, setLiked] = useState(false);

  const save = item.oldPrice - item.price;
  const percent = Math.round((save / item.oldPrice) * 100);
  const src = item.image ?? images.bestSellers[item.imageKey];
  const ratio = item.ratio ?? "aspect-[4/5]";

  // Mobile aur touch devices: actions hamesha visible.
  // Desktop (hover wale): masonry me height slide, grid me opacity fade.
  const actionsWrap =
    variant === "grid"
      ? "grid grid-rows-[1fr] transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 [@media(hover:none)]:opacity-100"
      : "grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]";

  return (
    <article className="group break-inside-avoid pb-6 md:pb-8">
      <div
        className={`relative w-full overflow-hidden rounded-md bg-[#f3efea] ${ratio}`}
      >
        <Link
          href={item.href ?? "#"}
          aria-label={item.name}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={item.name}
            fill
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 30vw, 46vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <span className="absolute left-2 top-2 rounded-full bg-[var(--wood)] px-2 py-[5px] text-[11px] font-medium leading-none text-white md:left-2.5 md:top-2.5 md:px-2.5 md:py-1 md:text-[11px]">
          -{percent}%
        </span>

        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setLiked((v) => !v)}
          className="absolute right-1.5 top-1.5 grid h-9 w-9 place-items-center rounded-full transition-colors md:right-2.5 md:top-2.5 md:h-8 md:w-8 md:bg-white/80 md:backdrop-blur md:hover:bg-white"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/85 md:h-auto md:w-auto md:bg-transparent">
            <Heart
              size={16}
              strokeWidth={1.5}
              className={liked ? "fill-[var(--wood)] text-[var(--wood)]" : ""}
            />
          </span>
        </button>
      </div>

      <div className="pt-3">
        <h3 className="line-clamp-2 text-[13px] font-medium leading-snug md:text-[15px]">
          {item.name}
        </h3>

        <div className="mt-1.5 flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-3">
          <p className="flex flex-wrap items-baseline gap-x-2 text-[13px]">
            <span className="order-1 font-medium md:order-2">
              {fmt(item.price)}
            </span>
            <span className="order-2 text-[12px] text-[var(--muted)] line-through md:order-1 md:text-[13px]">
              {fmt(item.oldPrice)}
            </span>
          </p>
          <span className="text-[11px] font-medium text-[#8c2f23] md:text-[12px]">
            Save {fmt(save).replace("Rs ", "Rs.")}
          </span>
        </div>

        <div className={actionsWrap}>
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
                className="hidden h-9 w-9 place-items-center rounded-full transition-colors hover:bg-black/5 md:grid"
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