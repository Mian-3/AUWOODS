"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { faqContent } from "@/data/content";
import { enquiryLink } from "@/lib/whatsapp";

export default function HomeFaq() {
  const [open, setOpen] = useState(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section aria-labelledby="faq-title" className="bg-[#f7f3ee] px-5 py-20 md:px-6 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto grid w-full max-w-[1100px] gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-24">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="mb-5 block h-[2px] w-12 bg-[var(--wood)]" />
          <h2
            id="faq-title"
            className="font-serif text-4xl font-normal leading-[1.08] tracking-tight md:text-6xl"
          >
            {faqContent.title}
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#4a4440]">
            {faqContent.intro}
          </p>
          <a
            href={enquiryLink("I have a question", {})}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#1f8f4e] px-6 text-[14px] font-medium text-[#1f6f40] transition-colors hover:bg-[#1f8f4e] hover:text-white"
          >
            <WhatsAppIcon size={18} /> Ask us on WhatsApp
          </a>
        </div>

        <ul data-reveal className="min-w-0 border-t border-black/15">
          {faqContent.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-black/15">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="grid min-h-[4.5rem] w-full grid-cols-[2.5rem_1fr_auto] items-center gap-2 py-4 text-left"
                >
                  <span className="text-[13px] text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px] font-medium leading-snug md:text-[18px]">{f.q}</span>
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border transition-colors duration-300 ${
                      isOpen ? "border-[var(--wood)] bg-[var(--wood)] text-white" : "border-black/20"
                    }`}
                  >
                    <Plus
                      size={16}
                      strokeWidth={1.5}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pl-[2.5rem] pr-12 text-[15px] leading-relaxed text-[#4a4440]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}