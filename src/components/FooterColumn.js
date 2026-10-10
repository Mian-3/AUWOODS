"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

export default function FooterColumn({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/5 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-[13px] font-semibold uppercase tracking-[0.08em] md:cursor-default md:py-0"
      >
        {title}
        <span className="md:hidden">
          {open ? <Minus size={16} strokeWidth={1.25} /> : <Plus size={16} strokeWidth={1.25} />}
        </span>
      </button>

      <ul
        className={`grid transition-all duration-300 md:mt-7 md:!grid-rows-[1fr] ${
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        } md:pb-0`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 md:gap-[14px]">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13px] font-medium transition-opacity hover:opacity-60 md:text-[12px]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
}