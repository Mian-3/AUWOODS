"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { images } from "@/data/images";
import { navLinks, heroContent } from "@/data/content";
import NavItem from "@/components/NavItem";

export default function HeroSection() {
  const root = useRef(null);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from("[data-hero-image]", {
          scale: 1.08,
          duration: 1.8,
          ease: "power2.out",
        });
        gsap.from("[data-hero-fade]", {
          opacity: 0,
          y: 12,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.2,
          ease: "power3.out",
        });
      },
      rootEl
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative h-svh min-h-[560px] w-full overflow-hidden bg-wood text-white"
    >
      <div data-hero-image className="absolute inset-0">
        <Image
          src={images.hero}
          alt="AU WOODS featured furniture"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Top: logo + intro */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-5 pt-10 text-center md:flex-row md:items-start md:justify-between md:px-6 md:pt-5 md:text-left">
        <h1
          data-hero-fade
          className="font-serif text-5xl font-normal tracking-tight md:text-6xl"
        >
          AU WOODS
        </h1>
        <p
          data-hero-fade
          className="mt-3 text-[12px] font-medium leading-snug md:mt-2 md:text-right md:text-[11px]"
        >
          {heroContent.introLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* Bottom: nav (desktop) / Menu (mobile) */}
      <nav
        data-hero-fade
        aria-label="Hero"
        className="absolute bottom-6 left-6 z-10 hidden gap-8 text-[12px] font-medium md:flex"
      >
        {navLinks.map((link) => (
          <NavItem
            key={link.label}
            link={link}
            direction="up"
            className="transition-opacity hover:opacity-60"
          />
        ))}
      </nav>
      <button
        data-hero-fade
        type="button"
        onClick={() => window.dispatchEvent(new Event("open-menu"))}
        className="absolute bottom-3 left-5 py-3 text-[12px] font-medium md:hidden"
      >
        Menu
      </button>
    </section>
  );
}