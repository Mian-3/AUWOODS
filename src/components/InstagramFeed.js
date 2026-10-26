import Image from "next/image";
import Link from "next/link";
import { collections, getAllProducts } from "@/data/products";
import { siteInfo } from "@/data/content";
import { formatPrice } from "@/lib/format";

function InstagramMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Har collection ka ek product, feed ki tarah square tiles
export default function InstagramFeed() {
  const all = getAllProducts();
  const tiles = collections
    .map((c) => all.find((p) => p.collection === c.slug))
    .filter(Boolean)
    .slice(0, 6);

  return (
    <section aria-labelledby="feed-title" className="px-5 pb-20 pt-4 md:px-6 md:pb-28">
      <div className="mx-auto w-full max-w-[1280px]">
        <div data-reveal className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-12 md:flex-row md:items-end">
          <div>
            <span className="mb-5 block h-[2px] w-12 bg-[var(--wood)]" />
            <h2 id="feed-title" className="font-serif text-4xl font-normal tracking-tight md:text-5xl">
              Shop the feed
            </h2>
            <p className="mt-3 text-[15px] text-[#4a4440]">
              Pieces from our workshop, ready for your home. Tap any post to shop it.
            </p>
          </div>
          <Link
            href={siteInfo.instagram || "/contact"}
            target={siteInfo.instagram ? "_blank" : undefined}
            rel={siteInfo.instagram ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--wood)] px-6 text-[14px] font-medium transition-colors hover:bg-[var(--wood)] hover:text-white"
          >
            <InstagramMark /> Follow AU WOODS
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
          {tiles.map((p) => (
            <li key={p.slug} data-reveal>
              <Link
                href={p.href}
                aria-label={`${p.name}, ${formatPrice(p.price)}`}
                className="group relative block aspect-square overflow-hidden bg-[#f1ece6]"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute right-2 top-2 text-white drop-shadow">
                  <InstagramMark size={16} />
                </span>
                <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                  <span className="block truncate text-[13px] font-medium">{p.name}</span>
                  <span className="block text-[12px] text-white/80">{formatPrice(p.price)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}