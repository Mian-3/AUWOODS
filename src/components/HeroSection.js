"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { images } from "@/data/images";
import { navLinks, heroContent } from "@/data/content";
import NavItem from "@/components/NavItem";
import Logo from "@/components/Logo";

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

      {/* Scrims */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/55 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-[55vw] bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.6),transparent_70%)] md:w-[40vw]" />

      {/* Top: logo + intro */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-5 pt-10 text-center md:flex-row md:items-start md:justify-between md:px-6 md:pt-5 md:text-left">
        <h1
          data-hero-fade
          className="flex items-center gap-3 font-serif text-5xl font-normal tracking-tight [text-shadow:0_1px_16px_rgba(0,0,0,0.35)] md:gap-4 md:text-6xl"
        >
          <Logo
            variant="white"
            priority
            className="h-10 drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] md:h-14"
          />
          AU WOODS
        </h1>
        <p
          data-hero-fade
          className="mt-3 text-[17px] font-semibold leading-snug [text-shadow:0_1px_14px_rgba(0,0,0,0.7)] md:mt-3 md:text-right md:text-[20px]"
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
        className="absolute bottom-7 left-6 z-10 hidden gap-9 text-[17px] font-medium leading-none [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] md:flex"
      >
        {navLinks.map((link) => (
          <NavItem
            key={link.label}
            link={link}
            className="transition-opacity hover:opacity-60"
          />
        ))}
      </nav>
      <button
        data-hero-fade
        type="button"
        onClick={() => window.dispatchEvent(new Event("open-menu"))}
        className="absolute bottom-4 left-5 py-3 text-[17px] font-medium [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] md:hidden"
      >
        Menu
      </button>
    </section>
  );
}