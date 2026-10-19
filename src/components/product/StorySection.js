import FitImage from "@/components/FitImage";
import { getSpecs } from "@/data/productContent";

export default function StorySection({ product }) {
  const size = product.sizes.find((s) => s.mult === 1) ?? product.sizes[0];
  const img = product.images[product.images.length - 1];

  return (
    <section className="px-5 py-16 md:px-6 md:py-28">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div data-reveal className="min-w-0">
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <FitImage src={img} alt={product.name} sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
        </div>

        <div data-reveal className="min-w-0">
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            The piece
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-[1.08] tracking-tight md:text-6xl">
            {product.name}, made to be lived with.
          </h2>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-[#4a4440]">{product.story}</p>

          <dl className="mt-10 border-t border-black/10">
            {getSpecs(product, size).map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-black/10 py-4 text-[14px] md:grid-cols-[9rem_1fr]"
              >
                <dt className="text-[var(--muted)]">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}