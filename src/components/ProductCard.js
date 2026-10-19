"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Heart, ShoppingBag } from "lucide-react";
import FitImage from "@/components/FitImage";
import { addItem } from "@/lib/cart";
import { discountPercent, formatPrice } from "@/lib/format";

export default function ProductCard({ item, variant = "masonry" }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const percent = discountPercent(item.price, item.oldPrice);
  const save = item.oldPrice - item.price;
  const href = item.href ?? `/products/${item.slug}`;
  const defaultSize = item.sizes?.find((s) => s.mult === 1) ?? item.sizes?.[0];

  const handleAdd = () => {
    addItem(item, {
      finish: item.finishes?.[0]?.name,
      size: defaultSize?.label,
      price: item.price,
    });
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  };

  // Touch par actions hamesha visible. Desktop: masonry me height slide, grid me fade.
  const actionsWrap =
    variant === "grid"
      ? "grid grid-rows-[1fr] transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
      : "grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]";

  return (
    <article className="group flex h-full flex-col pb-6 md:pb-8">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-md bg-[#f1ece6]">
        <Link href={href} aria-label={item.name} className="absolute inset-0">
          <FitImage
            src={item.image}
            alt={item.name}
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 30vw, 46vw"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {item.hoverImage && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100">
              <FitImage
                src={item.hoverImage}
                sizes="(min-width: 1280px) 300px, (min-width: 768px) 30vw, 46vw"
              />
            </div>
          )}
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1 md:left-2.5 md:top-2.5">
          {percent > 0 && (
            <span className="rounded-full bg-[var(--wood)] px-2 py-[5px] text-[11px] font-medium leading-none text-white md:px-2.5 md:py-1">
              -{percent}%
            </span>
          )}
          {item.badge && (
            <span className="rounded-full bg-white/90 px-2 py-[5px] text-[10px] font-medium uppercase leading-none tracking-[0.08em] backdrop-blur md:px-2.5 md:py-1">
              {item.badge}
            </span>
          )}
        </div>

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

      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 min-h-[2.6em] text-[13px] md:min-h-0 font-medium leading-snug md:text-[15px]">
            <Link href={href} className="hover:opacity-70">
              {item.name}
            </Link>
          </h3>
        </div>

        {item.finishes?.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5" aria-label="Available finishes">
            {item.finishes.map((f) => (
              <span
                key={f.name}
                title={f.name}
                style={{ backgroundColor: f.color }}
                className="h-3 w-3 rounded-full ring-1 ring-black/10"
              />
            ))}
          </div>
        )}

        <div className="mt-1.5 flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-3">
          <p className="flex flex-wrap items-baseline gap-x-2 text-[13px]">
            <span className="order-1 font-medium md:order-2">{formatPrice(item.price)}</span>
            {save > 0 && (
              <span className="order-2 text-[12px] text-[var(--muted)] line-through md:order-1 md:text-[13px]">
                {formatPrice(item.oldPrice)}
              </span>
            )}
          </p>
          {save > 0 && (
            <span className="text-[11px] font-medium text-[#8c2f23] md:text-[12px]">
              Save {formatPrice(save).replace("Rs ", "Rs.")}
            </span>
          )}
        </div>

        <div className={`mt-auto ${actionsWrap}`}>
          <div className="overflow-hidden">
            <div className="pt-3">
              <button
                type="button"
                onClick={handleAdd}
                aria-live="polite"
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-full text-[12px] font-medium text-white transition-colors md:text-[13px] ${
                  added ? "bg-[#2f5d3a]" : "bg-[var(--wood)] hover:bg-black"
                }`}
              >
                {added ? (
                  <>
                    <Check size={15} strokeWidth={1.75} /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} strokeWidth={1.5} /> Add to cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}