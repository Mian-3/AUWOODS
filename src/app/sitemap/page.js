import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import ShopMenu from "@/components/ShopMenu";
import { collections } from "@/data/products";
import { pages } from "@/data/pages";

export const metadata = { title: "Sitemap | AU WOODS" };

export default function SitemapPage() {
  const groups = [
    {
      title: "Shop",
      links: [
        { label: "All products", href: "/collections/all" },
        ...collections.map((c) => ({ label: c.title, href: `/collections/${c.slug}` })),
      ],
    },
    { title: "Pages", links: pages.map((p) => ({ label: p.title, href: `/${p.slug}` })) },
  ];

  return (
    <>
      <Header />
      <main className="px-5 pb-24 pt-28 md:px-6 md:pt-36">
        <div className="mx-auto w-full max-w-[1100px]">
          <h1 className="font-serif text-5xl tracking-tight md:text-7xl">Sitemap</h1>
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {groups.map((g) => (
              <section key={g.title} data-reveal>
                <h2 className="border-b border-black/10 pb-3 font-serif text-2xl">{g.title}</h2>
                <ul className="mt-4">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-2 text-[15px] hover:opacity-60">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ShopMenu />
      <ScrollAnimations />
    </>
  );
}