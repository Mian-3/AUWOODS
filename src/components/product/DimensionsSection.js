// Simple front aur side view schematic, product ke size options ke saath
export default function DimensionsSection({ product }) {
  const base = product.sizes.find((s) => s.mult === 1) ?? product.sizes[0];
  const max = Math.max(base.w, base.h);
  const W = 220 * (base.w / max);
  const H = 220 * (base.h / max);

  return (
    <section className="bg-[#f7f3ee] px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 md:grid-cols-2 md:gap-16">
        <div data-reveal className="min-w-0">
          <span className="mb-5 block h-[2px] w-12 bg-[var(--wood)]" />
          <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl">
            Dimensions
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#4a4440]">
            Measure your room before you order. Every size is made to the exact measurements below.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[300px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-black/15 text-[12px] uppercase tracking-[0.1em] text-[var(--muted)]">
                  <th className="py-3 pr-4 font-medium">Size</th>
                  <th className="py-3 pr-4 font-medium">Width</th>
                  <th className="py-3 pr-4 font-medium">Depth</th>
                  <th className="py-3 font-medium">Height</th>
                </tr>
              </thead>
              <tbody>
                {product.sizes.map((s) => (
                  <tr key={s.label} className="border-b border-black/10">
                    <td className="py-3.5 pr-4 font-medium">{s.label}</td>
                    <td className="py-3.5 pr-4">{s.w} cm</td>
                    <td className="py-3.5 pr-4">{s.d} cm</td>
                    <td className="py-3.5">{s.h} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div data-reveal className="flex justify-center">
          <svg
            viewBox="0 0 340 330"
            role="img"
            aria-label={`${product.name} dimensions diagram`}
            className="w-full max-w-[380px]"
          >
            <g transform={`translate(${(340 - W - 60) / 2}, ${20})`} fill="none" stroke="#3a1f16" strokeWidth="1.25">
              <rect x="0" y="0" width={W} height={H} rx="6" fill="#fff" />
              <line x1="0" y1={H + 28} x2={W} y2={H + 28} />
              <line x1="0" y1={H + 22} x2="0" y2={H + 34} />
              <line x1={W} y1={H + 22} x2={W} y2={H + 34} />
              <line x1={W + 28} y1="0" x2={W + 28} y2={H} />
              <line x1={W + 22} y1="0" x2={W + 34} y2="0" />
              <line x1={W + 22} y1={H} x2={W + 34} y2={H} />
            </g>
            <g fontSize="13" fill="#3a1f16" textAnchor="middle">
              <text x={(340 - W - 60) / 2 + W / 2} y={20 + H + 52}>{base.w} cm</text>
              <text
                transform={`translate(${(340 - W - 60) / 2 + W + 50}, ${20 + H / 2}) rotate(90)`}
              >
                {base.h} cm
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}