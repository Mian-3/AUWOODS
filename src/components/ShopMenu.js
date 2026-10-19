"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { X } from "lucide-react";
import { navLinks, panels } from "@/data/content";
import Logo from "@/components/Logo";
import ContactInfo from "@/components/ContactInfo";

export default function ShopMenu() {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("shop");

  const rootRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  const wasOpen = useRef(false);
  const openRef = useRef(false);
  const keyRef = useRef("shop");

  const close = () => setOpen(false);

  useEffect(() => {
    openRef.current = open;
    keyRef.current = key;
  }, [open, key]);

  // Custom scroll line (native scrollbar hidden hai)
  const updateThumb = useCallback(() => {
    const s = scrollRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!s || !track || !thumb) return;

    const ratio = s.clientHeight / s.scrollHeight;
    if (ratio >= 1) {
      thumb.style.opacity = "0";
      return;
    }
    const trackH = track.clientHeight;
    const thumbH = Math.max(36, trackH * ratio);
    const maxY = trackH - thumbH;
    const y = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * maxY;

    thumb.style.height = `${thumbH}px`;
    thumb.style.transform = `translateY(${y}px)`;
    thumb.style.opacity = "1";
  }, []);

  // Events: nav link click (toggle-panel), Esc
  useEffect(() => {
    const onToggle = (e) => {
      const next = e.detail;
      if (openRef.current && keyRef.current === next) {
        setOpen(false);
      } else {
        setKey(next);
        setOpen(true);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("toggle-panel", onToggle);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("toggle-panel", onToggle);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Initial closed state
  useEffect(() => {
    if (panelRef.current) gsap.set(panelRef.current, { xPercent: -100 });
    if (backdropRef.current) gsap.set(backdropRef.current, { opacity: 0 });
  }, []);

  // Scroll listeners
  useEffect(() => {
    const s = scrollRef.current;
    if (!s) return;
    s.addEventListener("scroll", updateThumb, { passive: true });
    window.addEventListener("resize", updateThumb);
    return () => {
      s.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, [updateThumb]);

  // Open / switch / close animation
  useEffect(() => {
    const root = rootRef.current;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    const scroller = scrollRef.current;
    if (!root || !backdrop || !panel || !scroller) return;

    const items = root.querySelectorAll("[data-panel-item]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      document.body.style.overflow = "hidden";
      scroller.scrollTop = 0;

      // Pehli baar khul raha hai: panel slide in
      if (!wasOpen.current) {
        gsap.killTweensOf([root, backdrop, panel]);
        gsap.set(root, { autoAlpha: 1 });

        if (reduce) {
          gsap.set(backdrop, { opacity: 1 });
          gsap.set(panel, { xPercent: 0 });
        } else {
          gsap.to(backdrop, { opacity: 1, duration: 0.5, ease: "power2.out" });
          gsap.fromTo(
            panel,
            { xPercent: -100 },
            { xPercent: 0, duration: 0.75, ease: "power4.out" }
          );
        }
        panel.focus({ preventScroll: true });
      }

      // Items stagger (khulte waqt aur content switch hote waqt dono me)
      gsap.killTweensOf(items);
      if (reduce) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
      } else {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.06,
            delay: wasOpen.current ? 0 : 0.25,
          }
        );
      }

      wasOpen.current = true;
      requestAnimationFrame(updateThumb);
    } else if (wasOpen.current) {
      wasOpen.current = false;
      document.body.style.overflow = "";
      gsap.killTweensOf([root, backdrop, panel]);

      if (reduce) {
        gsap.set(panel, { xPercent: -100 });
        gsap.set(backdrop, { opacity: 0 });
        gsap.set(root, { autoAlpha: 0 });
      } else {
        gsap.to(panel, { xPercent: -100, duration: 0.55, ease: "power3.inOut" });
        gsap.to(backdrop, { opacity: 0, duration: 0.45, ease: "power2.out" });
        gsap.set(root, { autoAlpha: 0, delay: 0.55 });
      }
    }
  }, [open, key, updateThumb]);

  const sections = panels[key]?.sections ?? [];

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${key} menu`}
      aria-hidden={!open}
      style={{ visibility: "hidden" }}
      className="fixed inset-0 z-[70]"
    >
      {/* Backdrop: click par band */}
      <button
        ref={backdropRef}
        type="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={close}
        className="absolute inset-0 cursor-default bg-black/20"
      />

      <aside
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 left-0 flex w-full flex-col bg-white outline-none md:w-[40vw] md:min-w-[560px] md:max-w-[780px]"
      >
        {/* Top: logo + mobile close */}
        <div className="flex shrink-0 items-center justify-between px-5 pb-1 pt-5 md:px-10 md:pt-7">
          <Link
            href="/"
            onClick={close}
            aria-label="AU WOODS home"
            className="flex items-center gap-2.5"
          >
            <Logo className="h-9 md:h-10" />
            <span className="font-serif text-2xl tracking-tight md:text-3xl">
              AU WOODS
            </span>
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="-mr-2 p-2 md:hidden"
          >
            <X size={20} strokeWidth={1.25} />
          </button>
        </div>

        {/* Scroll area (native scrollbar hidden) */}
        <div className="relative min-h-0 flex-1">
          <div
            ref={scrollRef}
            className="no-scrollbar panel-list h-full overflow-y-auto overscroll-contain px-5 pb-12 pt-8 md:px-10 md:pt-10"
          >
            <div className="flex flex-col gap-10 md:gap-[44px]">
              {sections.map((section) => (
                <div
                  key={`${key}-${section.title}`}
                  data-panel-item
                  className="grid grid-cols-[7rem_1fr] md:grid-cols-[9.3rem_1fr]"
                >
                  <h3 className="py-2 text-[15px] font-medium uppercase leading-[22px] md:py-[5px] md:text-[16px]">
                    {section.title}
                  </h3>

                  <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                    {section.columns.map((col, ci) => (
                      <ul key={ci}>
                        {col.map((item, ii) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={close}
                              className={`panel-link block py-2 text-[15px] leading-[22px] md:py-[5px] md:text-[16px] ${
                                section.emphasizeFirst && ci === 0 && ii === 0
                                  ? "font-medium"
                                  : ""
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom scroll line */}
          <div
            ref={trackRef}
            aria-hidden
            className="pointer-events-none absolute inset-y-2 right-2 w-[2px] rounded-full bg-black/5"
          >
            <div
              ref={thumbRef}
              className="w-full rounded-full bg-black/35 opacity-0 transition-opacity duration-300"
            />
          </div>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Pinned footer: contact + nav */}
        <div className="shrink-0 border-t border-black/10 bg-white px-5 pb-6 pt-3 md:px-10 md:pb-7">
          <ContactInfo
            className="flex flex-wrap gap-x-7 [@media(max-height:520px)]:hidden"
            linkClassName="py-1.5 text-[14px] md:text-[15px]"
          />
          <nav
            aria-label="Menu"
            className="mt-2 flex flex-wrap gap-x-8 gap-y-2 text-[15px] font-medium md:text-[16px]"
          >
            {navLinks.map((link) =>
              link.menu ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("toggle-panel", { detail: link.menu })
                    )
                  }
                  className={`border-b py-1.5 transition-opacity hover:opacity-60 ${
                    link.menu === key
                      ? "border-foreground"
                      : "border-transparent"
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  className="border-b border-transparent py-1.5 transition-opacity hover:opacity-60"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </aside>
    </div>
  );
}