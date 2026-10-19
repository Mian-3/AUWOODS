import { PROCESS } from "@/data/productContent";

export default function CraftSection() {
  return (
    <section className="bg-[var(--wood)] px-5 py-16 text-white md:px-6 md:py-28">
      <div className="mx-auto w-full max-w-[1280px]">
        <div data-reveal className="max-w-2xl">
          <span className="mb-5 block h-[2px] w-12 bg-[#f4b17c]" />
          <h2 className="font-serif text-4xl font-normal tracking-tight md:text-6xl">
            From your order to your room
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            Every AU WOODS piece is made to order in our own workshop. Fewer pieces, made properly.
          </p>
        </div>

        <ol className="mt-12 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
          {PROCESS.map((p) => (
            <li key={p.step} data-reveal className="border-t border-white/25 pt-6">
              <span className="font-serif text-5xl text-[#f4b17c] md:text-6xl">{p.step}</span>
              <h3 className="mt-5 font-serif text-2xl">{p.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}