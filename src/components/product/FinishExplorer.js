import { FINISH_NOTES } from "@/data/productContent";

export default function FinishExplorer({ product }) {
  return (
    <section className="bg-[#f7f3ee] px-5 py-16 md:px-6 md:py-28">
      <div className="mx-auto w-full max-w-[1280px]">
        <div data-reveal className="max-w-xl">
          <span className="mb-5 block h-[2px] w-12 bg-[var(--wood)]" />
          <h2 className="font-serif text-4xl font-normal tracking-tight md:text-6xl">
            Choose your finish
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#4a4440]">
            Each finish is hand rubbed and sealed. Ask us for a sample and see it in your own light.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {product.finishes.map((f) => (
            <li key={f.name} data-reveal className="overflow-hidden rounded-md bg-white">
              <div
                className="h-40 md:h-52"
                style={{
                  background: `linear-gradient(115deg, ${f.color} 0%, ${f.color} 40%, color-mix(in srgb, ${f.color} 82%, white) 55%, ${f.color} 70%, color-mix(in srgb, ${f.color} 90%, black) 100%)`,
                }}
              />
              <div className="p-5 md:p-6">
                <h3 className="font-serif text-2xl">{f.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#4a4440]">
                  {FINISH_NOTES[f.name]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}