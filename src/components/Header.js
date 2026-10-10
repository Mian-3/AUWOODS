"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { navLinks } from "@/data/content";
import NavItem from "@/components/NavItem";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const barRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Bar hero ke baad slide down hoti hai
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.set(bar, { yPercent: -100, autoAlpha: 1 });

    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom top+=64",
      onEnter: () =>
        gsap.to(bar, { yPercent: 0, duration: 0.5, ease: "power3.out" }),
      onLeaveBack: () =>
        gsap.to(bar, { yPercent: -100, duration: 0.4, ease: "power3.out" }),
    });

    return () => trigger.kill();
  }, []);

  // Hero ka mobile "Menu" button yahi menu kholta hai
  useEffect(() => {
    const open = () => setMenuOpen(true);
    window.addEventListener("open-menu", open);
    return () => window.removeEventListener("open-menu", open);
  }, []);

  // Menu open ho to body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={barRef}
        style={{ visibility: "hidden" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white"
      >
        <div className="grid h-16 grid-cols-3 items-center px-5 text-[15px] font-medium md:px-6">
          <nav aria-label="Primary" className="hidden gap-9 md:flex">
            {navLinks.map((link) => (
              <NavItem
                key={link.label}
                link={link}
                className="transition-opacity hover:opacity-60"
              />
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="w-fit py-3 text-left md:hidden"
          >
            Menu
          </button>

          <Link
            href="/"
            className="justify-self-center font-serif text-3xl font-normal tracking-tight"
          >
            AU WOODS
          </Link>

          <Link href="#" className="justify-self-end py-3">
            Cart
          </Link>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] overflow-y-auto bg-white px-5 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-16 items-center justify-between text-[15px] font-medium">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 py-3"
          >
            <X size={16} /> Close
          </button>
          <Link href="#" className="py-3">
            Cart
          </Link>
        </div>
        <nav className="mt-10 flex flex-col items-start gap-6 pb-10">
          {navLinks.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              onNavigate={() => setMenuOpen(false)}
              className="font-serif text-4xl font-light"
            />
          ))}
        </nav>
      </div>
    </>
  );
}