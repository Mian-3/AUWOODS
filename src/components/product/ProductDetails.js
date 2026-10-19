"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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

export default function ProductDetails({ product }) {
  return (
    <div>
      <Accordion title="Details" defaultOpen>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>{product.material}</li>
          <li>Sizes: {product.sizes.map((s) => `${s.label} (${s.w} x ${s.d} x ${s.h} cm)`).join(", ")}</li>
          <li>Finishes: {product.finishes.map((f) => f.name).join(", ")}, hand rubbed and sealed</li>
          <li>Assembled by our team at your home</li>
        </ul>
      </Accordion>
      <Accordion title="Delivery and installation">
        Each piece is made to order in our workshop and ready in {product.leadTime}. Our team
        delivers, unpacks and places it in your room, and takes the packaging away.
      </Accordion>
      <Accordion title="Care">
        Wipe with a soft, dry cloth. Keep away from direct sun and standing water. Re-oil the wood
        once a year to keep the grain rich.
      </Accordion>
      <Accordion title="Warranty and returns">
        A 5 year warranty covers the frame and joinery. If something is not right, call us and we
        will make it right.
      </Accordion>
    </div>
  );
}