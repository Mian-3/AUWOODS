// Product page ka saara text yahan hai. Badalna ho to sirf yahan badlo.

export const FINISH_NOTES = {
  "Natural Walnut": "Deep, warm brown with a visible grain. Ages beautifully.",
  "Smoked Oak": "Dark and calm. Hides everyday marks, suits modern rooms.",
  "Honey Teak": "Golden and sunny, the warmest tone in the range.",
  "Ivory Ash": "Soft, light and airy. Brightens small or quiet spaces.",
};

export const PROCESS = [
  { step: "01", title: "You order", text: "Choose finish and size, then confirm with our team on WhatsApp." },
  { step: "02", title: "We build", text: "Wood is cut, joined and shaped in our workshop to your order." },
  { step: "03", title: "Hand finished", text: "Sanded in four stages, then sealed by hand." },
  { step: "04", title: "Delivered", text: "Our team delivers, assembles and places it in your room." },
];

export const FAQ = [
  {
    q: "Can I change the finish or size after ordering?",
    a: "Yes, until we start cutting the wood. Message us on WhatsApp as early as possible and we will update your order.",
  },
  {
    q: "How long does delivery take?",
    a: "Every piece is made to order. The estimate is shown on the product page, and we confirm the exact date when you order.",
  },
  {
    q: "Do you assemble the furniture?",
    a: "Yes. Our team delivers, assembles and places the piece in your room, then removes the packaging.",
  },
  {
    q: "Can I see the wood before I buy?",
    a: "Yes. Ask us for finish samples on WhatsApp and we will arrange them for you.",
  },
  {
    q: "What does the warranty cover?",
    a: "The frame and joinery are covered for 5 years. If something is not right, contact us and we will make it right.",
  },
];

export function getHighlights(product) {
  return [
    { value: "100%", label: "Solid wood frame" },
    { value: "5 yr", label: "Frame warranty" },
    { value: product.leadTime.replace(" weeks", ""), label: "Weeks to make" },
    { value: "Free", label: "Delivery and assembly" },
  ];
}

export function getSpecs(product, size, finish) {
  return [
    ["Material", product.material],
    ["Finishes", product.finishes.map((f) => f.name).join(", ")],
    ["Sizes", product.sizes.map((s) => s.label).join(", ")],
    ["Overall size", `${size.w} x ${size.d} x ${size.h} cm (W x D x H)`],
    ["Assembly", "Assembled by our team at your home"],
    ["Made", `To order, ready in ${product.leadTime}`],
    ["Warranty", "5 years on frame and joinery"],
  ].filter(Boolean);
}