"use client";

import { useState } from "react";
import Link from "next/link";
import { FINISHES } from "@/data/products";
import { FINISH_NOTES } from "@/data/productContent";

// Lakdi ka dana: layered gradients, alag alag finish me color badalta hai
const GRAIN = [
  "repeating-linear-gradient(91deg, rgba(0,0,0,0.07) 0 2px, transparent 2px 11px)",
  "repeating-linear-gradient(88deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 27px)",
  "repeating-linear-gradient(93deg, rgba(0,0,0,0.05) 0 5px, transparent 5px 61px)",
  "radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,0.22), transparent 60%)",
  "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.22))",
].join(",");

const isLight = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return r * 0.299 + g * 0.587 + b * 0.114 > 170;
};

export default function FinishStudio() {
  const [i, setI] = useState(0);
  const f = FINISHES[i];
  const light = isLight(f.color);

  return (
    <section aria-labelledby="finish-title" className="px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid w-full max-w-[1280px] items-stretch gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Wood panel */}
        <div
          data-reveal
          style={{ backgroundColor: f.color, backgroundImage: GRAIN }}
          className="relative min-h-[320px] overflow-hidden rounded-md transition-colors duration-700 sm:min-h-[420px] lg:min-h-[560px]"
        >
          <span
            className={`absolute left-6 top-6 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-700 ${
              light ? "text-black/60" : "text-white/70"
            }`}
          >
            Finish {String(i + 1).padStart(2, "0")} / {String(FINISHES.length).padStart(2, "0")}
          </span>
          <p
            className={`absolute bottom-6 left-6 right-6 font-serif text-5xl leading-none tracking-tight transition-colors duration-700 md:text-7xl ${
              light ? "text-[#2a1a12]" : "text-white"
            }`}
          >
            {f.name}
          </p>
        </div>

        {/* Controls */}
        <div data-reveal className="flex min-w-0 flex-col justify-center">
          <span className="mb-5 block h-[2px] w-12 bg-[var(--wood)]" />
          <h2
            id="finish-title"
            className="font-serif text-4xl font-normal leading-[1.08] tracking-tight md:text-6xl"
          >
            Pick the wood. We build the rest.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#4a4440]">
            Every piece is made to order in the finish you choose, hand rubbed and sealed in our
            workshop.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="radiogroup" aria-label="Wood finish">
            {FINISHES.map((x, idx) => (
              <button
                key={x.name}
                type="button"
                role="radio"
                aria-checked={idx === i}
                onClick={() => setI(idx)}
                className={`flex min-h-11 items-center gap-2.5 rounded-full border px-4 text-[14px] transition-colors ${
                  idx === i ? "border-[var(--wood)] bg-[var(--wood)] text-white" : "border-black/15 hover:border-black"
                }`}
              >
                <span
                  style={{ backgroundColor: x.color }}
                  className="h-4 w-4 rounded-full ring-1 ring-black/20"
                />
                {x.name}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="mt-6 min-h-[3.2rem] max-w-md text-[15px] leading-relaxed">
            {FINISH_NOTES[f.name]}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/swatches"
              className="rounded-full bg-[var(--wood)] px-8 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-black"
            >
              Order swatches
            </Link>
            <Link
              href="/collections/all"
              className="rounded-full border border-[var(--wood)] px-8 py-3.5 text-[14px] font-medium transition-colors hover:bg-[var(--wood)] hover:text-white"
            >
              Shop all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}