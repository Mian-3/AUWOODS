"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQ } from "@/data/productContent";

export default function ProductFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-5 py-16 md:px-6 md:py-28">
      <div className="mx-auto grid w-full max-w-[1100px] gap-10 md:grid-cols-[1fr_1.6fr] md:gap-20">
        <div data-reveal>
          <span className="mb-5 block h-[2px] w-12 bg-[var(--wood)]" />
          <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl">
            Good to know
          </h2>
        </div>
        <ul className="border-t border-black/10">
          {FAQ.map((f, i) => (
            <li key={f.q} className="border-b border-black/10">
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-3 text-left text-[16px] font-medium"
              >
                {f.q}
                <Plus
                  size={18}
                  strokeWidth={1.5}
                  className={`shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 text-[15px] leading-relaxed text-[#4a4440]">{f.a}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}