"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { navLinks } from "@/data/content";
import NavItem from "@/components/NavItem";
import Logo from "@/components/Logo";
import ContactInfo from "@/components/ContactInfo";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const barRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Jin pages par hero nahi (collections), bar hamesha visible
    const hero = document.getElementById("hero");
    if (!hero) {
      gsap.set(bar, { yPercent: 0, autoAlpha: 1 });
      return;
    }

    gsap.set(bar, { yPercent: -100, autoAlpha: 1 });

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "bottom top+=64",
      onEnter: () =>
        gsap.to(bar, { yPercent: 0, duration: 0.5, ease: "power3.out" }),
      onLeaveBack: () =>
        gsap.to(bar, { yPercent: -100, duration: 0.4, ease: "power3.out" }),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const open = () => setMenuOpen(true);
    window.addEventListener("open-menu", open);
    return () => window.removeEventListener("open-menu", open);
  }, []);

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
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5 md:px-6">
          <nav
            aria-label="Primary"
            className="hidden gap-7 whitespace-nowrap text-[17px] font-medium leading-none min-[1440px]:gap-9 xl:flex"
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
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 min-h-11 w-fit px-2 text-left text-[17px] font-medium xl:hidden"
          >
            Menu
          </button>

          <Link
            href="/"
            aria-label="AU WOODS home"
            className="flex items-center gap-2.5 justify-self-center"
          >
           <Logo className="h-10 md:h-9" />
            <span className="hidden font-serif text-3xl font-normal tracking-tight md:inline">
              AU WOODS
            </span>
          </Link>

          <Link
            href="#"
            className="-mr-2 flex min-h-11 items-center justify-self-end px-2 text-[17px] font-medium"
          >
            Cart
          </Link>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] overflow-y-auto bg-white transition-opacity duration-300 xl:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex min-h-full flex-col px-5">
          <div className="grid h-16 shrink-0 grid-cols-[1fr_auto_1fr] items-center text-[17px] font-medium">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="-ml-2 flex min-h-11 w-fit items-center gap-2 px-2"
            >
              <X size={16} /> Close
            </button>
            <Link
              href="/"
              aria-label="AU WOODS home"
              onClick={() => setMenuOpen(false)}
              className="justify-self-center"
            >
              <Logo className="h-9" />
            </Link>
            <Link href="#" className="-mr-2 flex min-h-11 items-center justify-self-end px-2">
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

          {/* Contact: hamesha neeche pinned */}
          <div className="mt-auto border-t border-black/10 pb-8 pt-5">
            <ContactInfo
              className="flex flex-col"
              linkClassName="py-2 text-[15px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}