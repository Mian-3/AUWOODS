import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";

const rows = [
  {
    layout: "md:grid-cols-[39fr_59fr]",
    items: [
      { title: "Coffee Tables", src: images.categories.tables },
      { title: "Sofas", src: images.categories.sofas },
    ],
  },
  {
    layout: "md:grid-cols-[59fr_39fr]",
    items: [
      { title: "Beds", src: images.categories.beds },
      { title: "Side Tables", src: images.categories.sideTables },
    ],
  },
];

export default function CategoryGrid() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="flex flex-col gap-10 md:gap-12">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 gap-10 md:gap-[2%] ${row.layout}`}
          >
            {row.items.map((item) => (
              <Link key={item.title} href="#" className="group block">
                {/* Same height for both images in a row */}
                <div
                  data-reveal-img
                  className="relative aspect-[4/5] overflow-hidden bg-neutral-200 md:aspect-auto md:h-[34vw]"
                >
                  <div data-parallax className="absolute inset-0 scale-[1.15]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
                <p
                  data-reveal
                  className="mt-5 text-center text-[15px] md:text-[16px]"
                >
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}