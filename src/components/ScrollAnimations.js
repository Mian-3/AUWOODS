"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Poori site ki scroll animations ek jagah:
// [data-reveal]     -> text/blocks halka upar se fade in (group me stagger)
// [data-reveal-img] -> image upar se neeche wipe hoke khulti hai
// [data-parallax]   -> image ke andar halka parallax
export default function ScrollAnimations() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Fade up (batch: ek saath aane wale items stagger me)
      const items = gsap.utils.toArray("[data-reveal]");
      gsap.set(items, { autoAlpha: 0, y: 28 });

      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });

      // 2. Image wipe reveal
      gsap.utils.toArray("[data-reveal-img]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      // 3. Parallax
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}