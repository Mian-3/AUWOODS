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
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
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
      className="grid grid-cols-1 lg:h-[100svh] lg:min-h-[560px] lg:grid-cols-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 lg:aspect-auto">
        <Image
          src={images.services.flagships}
          alt="AU WOODS flagship store"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div ref={column} className="px-5 py-8 md:px-8 lg:px-[30px] lg:py-0">
        <div ref={text} className="lg:pt-[8vh]">
          <h2 className="text-[18px] font-light text-neutral-600 lg:text-[22px]">
            {flagships.title}
          </h2>
          <p className="mt-5 max-w-[26rem] text-[15px] leading-snug lg:text-[16px]">
            {flagships.body}
          </p>
          <Link
            href={flagships.cta.href}
            className="mt-4 inline-block py-2 text-[15px] font-medium transition-opacity hover:opacity-60 lg:relative lg:mt-6 lg:py-0 lg:text-[16px] lg:after:absolute lg:after:-inset-x-1 lg:after:-inset-y-2 lg:after:content-['']"
          >
            {flagships.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}