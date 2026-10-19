"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { closeCart, removeItem, setQty, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { cartOrderLink } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, open, count, subtotal } = useCart();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Checkout abhi nahi: order WhatsApp par message ban kar jata hai
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close cart"
        onClick={closeCart}
        className={`absolute inset-0 cursor-default bg-black/30 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        ref={panelRef}
        tabIndex={-1}
        className={`absolute inset-y-0 right-0 flex w-full flex-col bg-white outline-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[440px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/10 px-5">
          <h2 className="font-serif text-2xl tracking-tight">
            Your cart <span className="text-[15px] text-[var(--muted)]">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="-mr-2 grid h-11 w-11 place-items-center"
          >
            <X size={20} strokeWidth={1.25} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag size={36} strokeWidth={1} className="text-[var(--muted)]" />
            <p className="mt-5 font-serif text-2xl">Your cart is empty</p>
            <p className="mt-2 text-[14px] text-[var(--muted)]">
              Pieces you add will wait for you here.
            </p>
            <Link
              href="/collections/all"
              onClick={closeCart}
              className="mt-7 rounded-full bg-[var(--wood)] px-8 py-3 text-[14px] font-medium text-white transition-colors hover:bg-black"
            >
              Shop all products
            </Link>
          </div>
        ) : (
          <>
            <ul className="no-scrollbar flex-1 divide-y divide-black/10 overflow-y-auto overscroll-contain px-5">
              {items.map((it) => (
                <li key={it.key} className="flex gap-4 py-5">
                  <Link
                    href={`/products/${it.slug}`}
                    onClick={closeCart}
                    className="relative h-24 w-20 shrink-0 overflow-hidden rounded bg-[#f3efea]"
                  >
                    {it.image && (
                      <Image src={it.image} alt={it.name} fill sizes="80px" className="object-cover" />
                    )}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/products/${it.slug}`}
                        onClick={closeCart}
                        className="text-[14px] font-medium leading-snug hover:opacity-70"
                      >
                        {it.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(it.key)}
                        aria-label={`Remove ${it.name}`}
                        className="-mr-2 -mt-2 grid h-9 w-9 shrink-0 place-items-center text-[var(--muted)] hover:text-black"
                      >
                        <X size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="mt-1 text-[12px] text-[var(--muted)]">
                      {[it.finish, it.size].filter(Boolean).join(" / ")}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-black/15">
                        <button
                          type="button"
                          onClick={() => setQty(it.key, it.qty - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-9 w-9 place-items-center"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-[13px]" aria-live="polite">
                          {it.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(it.key, it.qty + 1)}
                          aria-label="Increase quantity"
                          className="grid h-9 w-9 place-items-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-[14px] font-medium">
                        {formatPrice(it.price * it.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="shrink-0 border-t border-black/10 px-5 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px]">Subtotal</span>
                <span className="text-[18px] font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-[12px] text-[var(--muted)]">
                Delivery and installation are arranged by our team after you order.
              </p>
              <a
                href={cartOrderLink(items, subtotal)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1f8f4e] text-[14px] font-medium text-white transition-colors hover:bg-[#177a40]"
              >
                <MessageCircle size={17} strokeWidth={1.5} /> Order on WhatsApp
              </a>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 h-11 w-full text-[13px] underline-offset-4 hover:underline"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}