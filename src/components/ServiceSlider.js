"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/images";
import { services } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const slideImages = [
  images.services.interiors,
  images.services.swatches,
  images.services.professionals,
];

export default function ServiceSlider() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const firstRun = useRef(true);

  // Desktop: text upar se neeche aata hai (pager ke qareeb), scroll ke saath
  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const wraps = gsap.utils.toArray(
          rootEl.querySelectorAll("[data-text-wrap]")
        );

        wraps.forEach((wrap) => {
          const column = wrap.parentElement;
          const pager = column.querySelector("[data-pager]");
          if (!pager) return;

          // Text ka neeche rukne ka point: pager se thoda upar
          const distance = () =>
            Math.max(
              0,
              pager.offsetTop -
                (wrap.offsetTop + wrap.offsetHeight) -
                window.innerHeight * 0.06
            );

          gsap.fromTo(
            wrap,
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
        });
      },
      rootEl
    );

    return () => mm.revert();
  }, []);

  // Slide change par image zoom-out aur text halka fade in
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const rootEl = root.current;
    if (!rootEl) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          `[data-slide="${active}"] [data-img]`,
          { scale: 1.06 },
          { scale: 1, duration: 1.4, ease: "power2.out" }
        );
        gsap.fromTo(
          `[data-slide="${active}"] [data-text]`,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
        );
      },
      rootEl
    );
    return () => mm.revert();
  }, [active]);

  return (
    <section ref={root} aria-label="Services" className="grid">
      {services.map((s, i) => {
        const isActive = i === active;
        return (
          <article
            key={s.id}
            data-slide={i}
            aria-hidden={!isActive}
            className={`col-start-1 row-start-1 grid grid-cols-1 transition-opacity duration-700 lg:h-[100svh] lg:min-h-[600px] lg:grid-cols-[30fr_70fr] ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* Text + pager */}
            <div className="relative order-2 flex flex-col justify-between px-5 py-8 md:px-8 lg:order-1 lg:px-[30px] lg:py-10">
              <div data-text-wrap className="lg:pt-[4vh]">
                <h2
                  data-text
                  className="text-[18px] font-light text-neutral-600 lg:text-[22px]"
                >
                  {s.title}
                </h2>
                <p
                  data-text
                  className="mt-5 max-w-[30rem] text-[15px] leading-snug lg:text-[16px]"
                >
                  {s.body}
                </p>
                <Link
                  data-text
                  href={s.cta.href}
                  className="mt-4 inline-block py-2 text-[15px] font-medium transition-opacity hover:opacity-60 lg:relative lg:mt-6 lg:py-0 lg:text-[16px] lg:after:absolute lg:after:-inset-x-1 lg:after:-inset-y-2 lg:after:content-['']"
                >
                  {s.cta.label}
                </Link>
              </div>

              <div
                data-pager
                role="tablist"
                aria-label="Services pager"
                className="mt-8 flex gap-2 text-[15px] lg:mt-0 lg:gap-6 lg:text-[16px]"
              >
                {services.map((p, n) => (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={n === active}
                    onClick={() => setActive(n)}
                    className={`min-h-11 min-w-11 border-b-2 px-2 transition-colors lg:relative lg:min-h-0 lg:min-w-0 lg:border-b lg:px-0 lg:pb-0.5 lg:after:absolute lg:after:-inset-2 lg:after:content-[''] ${
                      n === active
                        ? "border-foreground font-medium text-foreground"
                        : "border-transparent text-neutral-500 hover:text-foreground"
                    }`}
                  >
                    {p.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 aspect-[4/3] overflow-hidden bg-neutral-200 lg:order-2 lg:aspect-auto">
              <div data-img className="absolute inset-0">
                <Image
                  src={slideImages[i]}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}