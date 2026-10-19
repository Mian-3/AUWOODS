"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, MessageCircle, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck, Hammer } from "lucide-react";
import { addItem } from "@/lib/cart";
import { discountPercent, formatPrice } from "@/lib/format";
import { productOrderLink } from "@/lib/whatsapp";

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-14 w-full items-center justify-between text-left text-[15px] font-medium"
      >
        {title}
        <Plus
          size={16}
          strokeWidth={1.5}
          className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-[14px] leading-relaxed text-[#4a4440]">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function ProductInfo({ product }) {
  const [finish, setFinish] = useState(product.finishes[0]);
  const [size, setSize] = useState(product.sizes.find((s) => s.mult === 1) ?? product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const btnRef = useRef(null);
  const timer = useRef(null);

  const mult = size.mult;
  const price = Math.round((product.price * mult) / 1000) * 1000;
  const oldPrice = Math.round((product.oldPrice * mult) / 1000) * 1000;
  const percent = discountPercent(price, oldPrice);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Main button screen se bahar ho to mobile par sticky bar dikhao
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setBarVisible(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const add = () => {
    addItem(product, { finish: finish.name, size: size.label, price, qty });
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  };

  const btnLabel = added ? (
    <>
      <Check size={17} strokeWidth={1.75} /> Added to cart
    </>
  ) : (
    <>
      <ShoppingBag size={17} strokeWidth={1.5} /> Add to cart
    </>
  );

  return (
    <div>
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
        {product.type}
      </p>
      <h1 className="mt-2 font-serif text-4xl font-normal leading-[1.05] tracking-tight md:text-5xl">
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-2 text-[13px]">
        <span className="flex" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={14} className="fill-[var(--wood)] text-[var(--wood)]" />
          ))}
        </span>
        <span className="font-medium">{product.rating}</span>
        <span className="text-[var(--muted)]">({product.reviews} reviews)</span>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[26px] font-medium">{formatPrice(price)}</span>
        {percent > 0 && (
          <>
            <span className="text-[16px] text-[var(--muted)] line-through">{formatPrice(oldPrice)}</span>
            <span className="rounded-full bg-[#f6e9e6] px-2.5 py-1 text-[12px] font-medium text-[#8c2f23]">
              Save {percent}%
            </span>
          </>
        )}
      </div>
      <p className="mt-1 text-[12px] text-[var(--muted)]">Inclusive of all taxes</p>

      <p className="mt-6 text-[15px] leading-relaxed text-[#4a4440]">{product.story}</p>

      {/* Finish */}
      <div className="mt-8">
        <p className="text-[13px]">
          Finish: <span className="font-medium">{finish.name}</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-3" role="radiogroup" aria-label="Finish">
          {product.finishes.map((f) => (
            <button
              key={f.name}
              type="button"
              role="radio"
              aria-checked={finish.name === f.name}
              aria-label={f.name}
              onClick={() => setFinish(f)}
              className="relative grid h-11 w-11 place-items-center"
            >
              <span
                style={{ backgroundColor: f.color }}
                className={`h-8 w-8 rounded-full ring-offset-2 transition ${
                  finish.name === f.name ? "ring-2 ring-[var(--wood)]" : "ring-1 ring-black/15"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      {product.sizes.length > 1 && (
        <div className="mt-6">
          <p className="text-[13px]">
            Size: <span className="font-medium">{size.label}</span>
            <span className="text-[var(--muted)]">
              {" "}({size.w} x {size.d} x {size.h} cm)
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                type="button"
                role="radio"
                aria-checked={size.label === s.label}
                onClick={() => setSize(s)}
                className={`min-h-11 rounded-full border px-5 text-[13px] transition-colors ${
                  size.label === s.label
                    ? "border-[var(--wood)] bg-[var(--wood)] text-white"
                    : "border-black/15 hover:border-black"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Qty + add */}
      <div className="mt-8 flex gap-3">
        <div className="flex h-14 shrink-0 items-center rounded-full border border-black/15">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-14 w-12 place-items-center"
          >
            <Minus size={15} />
          </button>
          <span className="w-6 text-center text-[15px]" aria-live="polite">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="grid h-14 w-12 place-items-center"
          >
            <Plus size={15} />
          </button>
        </div>
        <button
          ref={btnRef}
          type="button"
          onClick={add}
          className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-medium text-white transition-colors ${
            added ? "bg-[#2f5d3a]" : "bg-[var(--wood)] hover:bg-black"
          }`}
        >
          {btnLabel}
        </button>
      </div>

      <a
        href={productOrderLink({ product, finish: finish.name, size: size.label, qty, price })}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#1f8f4e] text-[14px] font-medium text-[#1f6f40] transition-colors hover:bg-[#1f8f4e] hover:text-white"
      >
        <MessageCircle size={16} strokeWidth={1.5} /> Order on WhatsApp
      </a>

      {/* Trust row */}
      <ul className="mt-8 grid grid-cols-3 gap-3 border-y border-black/10 py-5 text-center text-[12px] leading-snug">
        <li className="flex flex-col items-center gap-2">
          <Hammer size={20} strokeWidth={1.25} /> Made to order
        </li>
        <li className="flex flex-col items-center gap-2">
          <Truck size={20} strokeWidth={1.25} /> Ready in {product.leadTime}
        </li>
        <li className="flex flex-col items-center gap-2">
          <ShieldCheck size={20} strokeWidth={1.25} /> 5 year frame warranty
        </li>
      </ul>

      <div className="mt-2">
        <Accordion title="Details" defaultOpen>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>{product.material}</li>
            <li>
              Overall size {size.w} x {size.d} x {size.h} cm (W x D x H)
            </li>
            <li>Finish: {finish.name}, hand rubbed and sealed</li>
            <li>Assembled by our team at your home</li>
          </ul>
        </Accordion>
        <Accordion title="Delivery and installation">
          Each piece is made to order in our workshop and ready in {product.leadTime}. Our team
          delivers, unpacks and places it in your room, and takes the packaging away.
        </Accordion>
        <Accordion title="Care">
          Wipe with a soft, dry cloth. Keep away from direct sun and standing water. Re-oil the
          wood once a year to keep the grain rich.
        </Accordion>
        <Accordion title="Warranty and returns">
          A 5 year warranty covers the frame and joinery. If something is not right, call us and we
          will make it right.
        </Accordion>
      </div>

      {/* Mobile sticky buy bar */}
      <div
        aria-hidden={!barVisible}
        inert={!barVisible}
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-black/10 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 lg:hidden ${
          barVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded bg-[#f3efea]">
          <Image src={product.image} alt="" fill sizes="40px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium">{product.name}</p>
          <p className="text-[13px]">{formatPrice(price)}</p>
        </div>
        <button
          type="button"
          onClick={add}
          className={`h-12 shrink-0 rounded-full px-6 text-[14px] font-medium text-white ${
            added ? "bg-[#2f5d3a]" : "bg-[var(--wood)]"
          }`}
        >
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}