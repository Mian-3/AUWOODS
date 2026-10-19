import Link from "next/link";
import Logo from "@/components/Logo";
import FooterColumn from "@/components/FooterColumn";
import RegisterForm from "@/components/RegisterForm";
import { footerColumns } from "@/data/content";

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-6 md:px-[6vw] md:pb-16 md:pt-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,2fr)] lg:gap-6">
        {/* Mobile: accordion group. Desktop: 4 columns via contents */}
        <div className="contents">
          {footerColumns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em]">
            Register
          </h3>
          <div className="mt-8 lg:mt-7">
            <RegisterForm />
          </div>
        </div>
      </div>

      <div className="mt-20 flex justify-center border-b border-foreground pb-10 md:mt-28 md:border-0 md:pb-0">
        <Link href="/" aria-label="AU WOODS home">
          <Logo alt="AU WOODS" className="h-20 md:h-24" />
        </Link>
      </div>
    </footer>
  );
}