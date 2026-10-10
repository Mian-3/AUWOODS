"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/images";
import { edits } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function EditsSection() {
  const track = useRef(null);
  const stage = useRef(null);
  const listRef = useRef(null);
  const [active, setActive] = useState(0);
  const firstRun = useRef(true);

  // Desktop: stage sticky rehta hai, list bottom se label ke neeche aati hai
  useEffect(() => {
    const trackEl = track.current;
    const stageEl = stage.current;
    const list = listRef.current;
    if (!trackEl || !stageEl || !list) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () =>
          stageEl.offsetHeight - list.offsetTop - list.offsetHeight - 40;

        gsap.fromTo(
          list,
          { y: distance },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: trackEl,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      },
      trackEl
    );

    return () => mm.revert();
  }, []);

  // Image change par halka zoom-out
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const trackEl = track.current;
    if (!trackEl) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          `[data-edit-img="${active}"]`,
          { scale: 1.06 },
          { scale: 1, duration: 1.4, ease: "power2.out" }
        );
      },
      trackEl
    );
    return () => mm.revert();
  }, [active]);

  return (
    <section ref={track} aria-label="Edits" className="relative md:h-[170svh]">
      <div
        ref={stage}
        className="grid grid-cols-1 md:sticky md:top-0 md:h-[100svh] md:min-h-[600px] md:grid-cols-[30fr_70fr]"
      >
        {/* Images (stacked, crossfade) */}
        <div className="relative order-1 aspect-[4/3] overflow-hidden bg-neutral-200 md:order-2 md:aspect-auto">
          {edits.map((item, i) => (
            <div
              key={item.id}
              data-edit-img={i}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={images.edits[item.imageKey]}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 70vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Label + list */}
        <div className="relative order-2 px-5 py-8 md:order-1 md:px-[30px] md:py-0 md:pt-[24vh]">
          <h2 className="text-[18px] font-light text-neutral-600 md:text-[22px]">
            Edits
          </h2>

          <ul
            ref={listRef}
            className="mt-8 flex flex-col gap-4 md:mt-14 md:gap-6"
          >
            {edits.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={isActive}
                    className="group relative grid w-full grid-cols-[2.5rem_1fr] items-baseline text-left text-[15px] md:text-[17px]"
                  >
                    <span
                      className={`transition-colors ${
                        isActive ? "text-foreground" : "text-neutral-400"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute -left-1 top-1/2 h-4 w-px -translate-y-1/2 bg-foreground" />
                      )}
                      {item.id}
                    </span>
                    <span className="text-right">
                      <span
                        className={`border-b pb-0.5 transition-colors ${
                          isActive
                            ? "border-foreground text-foreground"
                            : "border-transparent text-neutral-400 group-hover:text-foreground"
                        }`}
                      >
                        {item.title}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}