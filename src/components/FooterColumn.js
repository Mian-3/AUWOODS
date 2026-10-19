"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

export default function FooterColumn({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/5 lg:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between min-h-12 py-4 text-left text-[13px] font-semibold uppercase tracking-[0.08em] lg:min-h-0 lg:cursor-default lg:py-0"
      >
        {title}
        <span className="lg:hidden">
          {open ? <Minus size={16} strokeWidth={1.25} /> : <Plus size={16} strokeWidth={1.25} />}
        </span>
      </button>

      <ul
        className={`grid transition-all duration-300 lg:mt-7 lg:!grid-rows-[1fr] ${
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        } lg:pb-0`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col lg:gap-[14px]">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block py-2 text-[14px] font-medium transition-opacity hover:opacity-60 lg:relative lg:inline lg:py-0 lg:text-[12px] lg:after:absolute lg:after:-inset-x-1 lg:after:-inset-y-[7px] lg:after:content-['']"
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