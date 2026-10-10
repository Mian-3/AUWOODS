"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/images";
import { flagships } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function FlagshipSection() {
  const root = useRef(null);
  const column = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    const rootEl = root.current;
    const columnEl = column.current;
    const textEl = text.current;
    if (!rootEl || !columnEl || !textEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () =>
          Math.max(
            0,
            columnEl.clientHeight -
              textEl.offsetHeight -
              window.innerHeight * 0.08
          );

        gsap.fromTo(
          textEl,
          { y: 0 },
          {
            y: distance,
            ease: "none",
            scrollTrigger: {
              trigger: rootEl,
              start: "top bottom",
              end: "bottom 40%",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );
      },
      rootEl
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-label="Flagships"
      className="grid grid-cols-1 md:h-[100svh] md:min-h-[560px] md:grid-cols-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 md:aspect-auto">
        <Image
          src={images.services.flagships}
          alt="AU WOODS flagship store"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div ref={column} className="px-5 py-8 md:px-[30px] md:py-0">
        <div ref={text} className="md:pt-[8vh]">
          <h2 className="text-[18px] font-light text-neutral-600 md:text-[22px]">
            {flagships.title}
          </h2>
          <p className="mt-5 max-w-[26rem] text-[15px] leading-snug md:text-[16px]">
            {flagships.body}
          </p>
          <Link
            href={flagships.cta.href}
            className="mt-6 inline-block text-[15px] font-medium transition-opacity hover:opacity-60 md:text-[16px]"
          >
            {flagships.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}