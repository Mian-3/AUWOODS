"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import FitImage from "@/components/FitImage";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const scroller = useRef(null);

  const go = useCallback(
    (dir) => setActive((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  // Mobile carousel: scroll position se active index nikalo
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActive((cur) => (cur === i ? cur : i));
  };

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, go]);

  return (
    <div>
      {/* Desktop main image */}
      <div className="relative hidden aspect-[4/3] overflow-hidden rounded-md bg-[#f1ece6] lg:block">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <FitImage
              src={src}
              alt={`${name}, view ${i + 1}`}
              priority={i === 0}
              sizes="(min-width: 1280px) 620px, 55vw"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Zoom image"
          className="absolute inset-0 cursor-zoom-in"
        />
        <span className="pointer-events-none absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/90">
          <Expand size={16} strokeWidth={1.5} />
        </span>
      </div>

      {images.length > 1 && (
        <ul className="mt-3 hidden grid-cols-4 gap-3 lg:grid">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={active === i}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded bg-[#f1ece6] ring-1 transition ${
                  active === i ? "ring-[var(--wood)]" : "opacity-70 ring-transparent hover:opacity-100"
                }`}
              >
                <FitImage src={src} sizes="160px" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Mobile / tablet carousel */}
      <div className="relative lg:hidden">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto sm:mx-0 sm:rounded-md"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightbox(true)}
              aria-label={`Zoom image ${i + 1}`}
              className="relative aspect-[4/3] w-full shrink-0 snap-center"
            >
              <FitImage
                src={src}
                alt={`${name}, view ${i + 1}`}
                priority={i === 0}
                sizes="(min-width: 640px) 90vw, 100vw"
              />
            </button>
          ))}
        </div>
        {images.length > 1 && (<div className="mt-3 flex justify-center gap-2" aria-hidden>
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-[3px] rounded-full transition-all ${
                active === i ? "w-6 bg-[var(--wood)]" : "w-3 bg-black/20"
              }`}
            />
          ))}
        </div>)}
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} images`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(false)}
            className="absolute right-3 top-3 z-10 grid h-12 w-12 place-items-center text-white"
          >
            <X size={24} strokeWidth={1.25} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-2 z-10 grid h-12 w-12 place-items-center text-white md:left-6"
          >
            <ChevronLeft size={28} strokeWidth={1.25} />
          </button>
          <div className="relative h-[82vh] w-[92vw] max-w-[1100px]">
            <Image
              src={images[active]}
              alt={`${name}, view ${active + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-2 z-10 grid h-12 w-12 place-items-center text-white md:right-6"
          >
            <ChevronRight size={28} strokeWidth={1.25} />
          </button>
          <p className="absolute bottom-4 text-[13px] text-white/70">
            {active + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}