import Link from "next/link";
import { introContent } from "@/data/content";

export default function IntroSection() {
  return (
    <section className="pb-20 pt-10 md:pb-28 md:pt-12">
      <div className="grid gap-6 md:grid-cols-[30fr_70fr] md:gap-0">
        <h2
          data-reveal
          className="px-5 text-[18px] font-light text-neutral-600 md:px-[30px] md:text-[22px]"
        >
          {introContent.label}
        </h2>

        <div className="px-5 md:px-0">
          <p
            data-reveal
            className="max-w-[32rem] text-[15px] leading-snug md:text-[16px]"
          >
            {introContent.body}
          </p>
          <Link
            data-reveal
            href={introContent.cta.href}
            className="link-line mt-7 inline-block pb-0.5 text-[15px] font-medium md:text-[16px]"
          >
            {introContent.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}