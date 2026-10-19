import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import ShopMenu from "@/components/ShopMenu";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetails from "@/components/product/ProductDetails";
import ProductInfo from "@/components/product/ProductInfo";
import DimensionsSection from "@/components/product/DimensionsSection";
import HighlightsBand from "@/components/product/HighlightsBand";
import StorySection from "@/components/product/StorySection";
import FinishExplorer from "@/components/product/FinishExplorer";
import ProductFaq from "@/components/product/ProductFaq";
import CraftSection from "@/components/product/CraftSection";
import RelatedProducts from "@/components/product/RelatedProducts";
import {
  getAllProducts,
  getCollection,
  getComplete,
  getProduct,
  getRelated,
} from "@/data/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product | AU WOODS" };
  return {
    title: `${p.name} | AU WOODS`,
    description: p.story,
    openGraph: { title: `${p.name} | AU WOODS`, description: p.story, images: [p.image] },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collection = getCollection(product.collection);
  const related = getRelated(product, 4);
  const complete = getComplete(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.story,
    image: product.images,
    brand: { "@type": "Brand", name: "AU WOODS" },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <main>
        <section className="px-5 pb-16 pt-24 md:px-6 md:pt-32 lg:pb-24">
          <div className="mx-auto w-full max-w-[1280px]">
            <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-[var(--muted)]">
              <Link href="/" className="hover:text-black">Home</Link>
              <span className="mx-2">/</span>
              <Link href={`/collections/${product.collection}`} className="hover:text-black">
                {collection?.title ?? "Collection"}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-black">{product.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-x-16 xl:gap-x-24">
              <div className="min-w-0 lg:col-start-1 lg:row-start-1">
                <ProductGallery images={product.images} name={product.name} />
              </div>
              <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-24 lg:self-start">
                <ProductInfo product={product} />
              </div>
              <div className="min-w-0 lg:col-start-1 lg:row-start-2">
                <ProductDetails product={product} />
              </div>
            </div>
          </div>
        </section>

        <HighlightsBand product={product} />
        <StorySection product={product} />
        <FinishExplorer product={product} />
        <DimensionsSection product={product} />
        <CraftSection />
        <ProductFaq />
        <RelatedProducts
          title="You may also like"
          items={related}
          href={`/collections/${product.collection}`}
          linkLabel={`View all ${collection?.title ?? "products"}`}
        />
        <RelatedProducts
          title="Complete the room"
          items={complete}
          href="/collections/all"
          linkLabel="Shop all products"
          tone="cream"
        />
      </main>

      <Footer />
      <ShopMenu />
      <ScrollAnimations />
    </>
  );
}