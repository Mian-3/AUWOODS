import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { collectionContent } from "@/data/content";

export default function CollectionSection() {
  return (
    <section
      aria-labelledby="collection-title"
      className="px-5 py-20 md:px-6 md:py-28"
    >
      {/* Contained width: full-bleed sections ke beech ye section alag breathe kare */}
      <div className="mx-auto w-full max-w-[1100px]">
        <div data-reveal className="mb-12 flex flex-col items-center md:mb-14">
          <span className="mb-5 block h-[2px] w-12 bg-[var(--wood)]" />
          <h2
            id="collection-title"
            className="font-serif text-4xl font-normal tracking-tight md:text-5xl"
          >
            {collectionContent.title}
          </h2>
        </div>

        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-8 md:gap-y-12">
          {collectionContent.items.map((item) => (
            <li key={item.label} data-reveal>
              <Link
                href={item.href}
                className="group flex flex-col items-center"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-full bg-[#f3efea]">
                  <Image
                    src={images.collection[item.imageKey]}
                    alt={item.label}
                    fill
                    sizes="(min-width: 1100px) 250px, (min-width: 768px) 22vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <span className="link-line mt-4 text-[15px] font-medium md:text-[16px]">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}