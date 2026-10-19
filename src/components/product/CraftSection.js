import { Hammer, Leaf, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    icon: Leaf,
    title: "Selected solid wood",
    text: "Kiln dried sheesham, chosen for straight grain and cut for strength. No particle board, ever.",
  },
  {
    icon: Hammer,
    title: "Joined by hand",
    text: "Mortise and tenon joints, glued and pinned. The frame stays silent and steady for decades.",
  },
  {
    icon: ShieldCheck,
    title: "Finished to last",
    text: "Sanded in four stages and sealed by hand, so the wood feels warm and resists daily wear.",
  },
];

export default function CraftSection() {
  return (
    <section className="bg-[var(--wood)] px-5 py-16 text-white md:px-6 md:py-24">
      <div className="mx-auto w-full max-w-[1100px]">
        <div data-reveal className="max-w-xl">
          <span className="mb-5 block h-[2px] w-12 bg-[#f4b17c]" />
          <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl">
            Built the slow way
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            Every AU WOODS piece is made to order in our own workshop. Fewer pieces, made properly.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div key={title} data-reveal className="border-t border-white/20 pt-6">
              <Icon size={26} strokeWidth={1.1} className="text-[#f4b17c]" />
              <h3 className="mt-5 font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}