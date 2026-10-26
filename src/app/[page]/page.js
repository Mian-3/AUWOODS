import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import ShopMenu from "@/components/ShopMenu";
import ContactInfo from "@/components/ContactInfo";
import InquiryForm from "@/components/InquiryForm";
import { getPage, pages } from "@/data/pages";

export function generateStaticParams() {
  return pages.map((p) => ({ page: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { page } = await params;
  const data = getPage(page);
  return {
    title: data ? `${data.title} | AU WOODS` : "AU WOODS",
    description: data?.intro,
  };
}

export default async function InfoPage({ params }) {
  const { page } = await params;
  const data = getPage(page);
  if (!data) notFound();

  return (
    <>
      <Header />
      <main className="px-5 pb-24 pt-28 md:px-6 md:pt-36">
        <div className="mx-auto w-full max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-[var(--muted)]">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-black">{data.title}</span>
          </nav>

          <header data-reveal className="max-w-2xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
              {data.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-5xl font-normal leading-[1.05] tracking-tight md:text-7xl">
              {data.title}
            </h1>
            <p className="mt-6 text-[16px] leading-relaxed text-[#4a4440] md:text-[18px]">
              {data.intro}
            </p>
            {data.draft && (
              <p className="mt-4 rounded bg-[#f7f3ee] px-4 py-3 text-[13px] text-[#4a4440]">
                This is a starting draft. Please review it before relying on it.
              </p>
            )}
          </header>

          <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-20">
            <div className="min-w-0">
              {data.sections.map((s) => (
                <section key={s.h} data-reveal className="mb-10 border-t border-black/10 pt-6">
                  <h2 className="font-serif text-2xl md:text-3xl">{s.h}</h2>
                  {s.p && (
                    <p className="mt-3 text-[15px] leading-relaxed text-[#4a4440]">{s.p}</p>
                  )}
                  {s.list && (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-[#4a4440]">
                      {s.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              {data.showContact && (
                <div data-reveal className="border-t border-black/10 pt-6">
                  <h2 className="font-serif text-2xl md:text-3xl">Reach us directly</h2>
                  <ContactInfo className="mt-3 flex flex-col" linkClassName="py-2 text-[16px]" />
                </div>
              )}
            </div>

            {data.form && (
              <div data-reveal className="min-w-0">
                <h2 className="mb-6 font-serif text-2xl md:text-3xl">Get in touch</h2>
                <InquiryForm form={data.form} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ShopMenu />
      <ScrollAnimations />
    </>
  );
}