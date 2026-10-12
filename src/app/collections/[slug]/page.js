import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import ShopMenu from "@/components/ShopMenu";
import CollectionGrid from "@/components/CollectionGrid";
import {
  allCollection,
  collections,
  getCollection,
  getProducts,
} from "@/data/products";

export function generateStaticParams() {
  return [allCollection, ...collections].map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  return {
    title: collection
      ? `${collection.title} | AU WOODS`
      : "Collection | AU WOODS",
  };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = getProducts(slug, 16);

  return (
    <>
      <Header />

      <main className="px-5 pb-24 pt-28 md:px-6 md:pt-36">
        <div className="mx-auto w-full max-w-[1280px]">
          <nav
            aria-label="Breadcrumb"
            data-reveal
            className="mb-6 text-[13px] text-[var(--muted)]"
          >
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Collections</span>
            <span className="mx-2">/</span>
            <span className="text-black">{collection.title}</span>
          </nav>

          <header data-reveal className="mb-10 md:mb-14">
            <h1 className="font-serif text-5xl font-normal tracking-tight md:text-7xl">
              {collection.title}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] md:text-[16px]">
              {collection.description}
            </p>
          </header>

          {/* Collection chips: doosri category par seedha jao */}
          <ul
            data-reveal
            className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
          >
            {[allCollection, ...collections].map((c) => {
              const active = c.slug === slug;
              return (
                <li key={c.slug} className="shrink-0">
                  <Link
                    href={`/collections/${c.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full border px-5 py-2 text-[13px] font-medium transition-colors duration-300 md:text-[14px] ${
                      active
                        ? "border-[var(--wood)] bg-[var(--wood)] text-white"
                        : "border-black/15 hover:border-[var(--wood)]"
                    }`}
                  >
                    {c.slug === "all" ? "All" : c.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <CollectionGrid key={slug} products={products} />
        </div>
      </main>

      <Footer />
      <ScrollAnimations />
      <ShopMenu />
    </>
  );
}