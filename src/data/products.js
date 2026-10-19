import { images } from "@/data/images";
import { bestSellersContent } from "@/data/content";

export const allCollection = {
  slug: "all",
  title: "All Products",
  description:
    "Our complete range of sofas, beds, tables, storage and accents, crafted in solid wood and fine upholstery.",
  types: ["Sofa", "Bed", "Dining Table", "Side Table", "Accent Chair", "Cabinet", "Desk", "Mirror"],
};

export const collections = [
  {
    slug: "sofas",
    title: "Sofas",
    description: "Deep, sculpted seating in rich fabrics and solid wood frames.",
    types: ["Sofa", "Sectional", "Sofa Set", "Loveseat"],
  },
  {
    slug: "beds",
    title: "Beds",
    description: "Upholstered and solid wood beds designed for quiet, restful rooms.",
    types: ["Bed", "Platform Bed", "Bed Frame", "Upholstered Bed"],
  },
  {
    slug: "dining-tables",
    title: "Dining Tables",
    description: "Tables built to gather around, from intimate pairs to long family sets.",
    types: ["Dining Table", "Dining Set", "Extension Table"],
  },
  {
    slug: "side-tables",
    title: "Side Tables",
    description: "Small tables with sculptural presence, finished in wood and stone.",
    types: ["Side Table", "Nesting Table", "End Table", "Coffee Table"],
  },
  {
    slug: "accent-chairs",
    title: "Accent Chairs",
    description: "Statement chairs that add comfort and character to any corner.",
    types: ["Accent Chair", "Armchair", "Lounge Chair", "Arm Chair"],
  },
  {
    slug: "storage",
    title: "Storage",
    description: "Cabinets, sideboards and dressers that keep spaces calm and ordered.",
    types: ["Cabinet", "Sideboard", "Dresser", "Console"],
  },
  {
    slug: "desks",
    title: "Desks",
    description: "Considered work surfaces for focused days at home or in the studio.",
    types: ["Desk", "Writing Desk", "Work Table", "Study Desk"],
  },
  {
    slug: "accents",
    title: "Accents",
    description: "Mirrors, screens and finishing pieces that complete a room.",
    types: ["Mirror", "Screen", "Shelf", "Planter Stand"],
  },
];

export function getCollection(slug) {
  if (slug === "all") return allCollection;
  return collections.find((c) => c.slug === slug) ?? null;
}

const PREFIXES = [
  "Veloura", "Ovarine", "Arc", "Orb", "Caldera", "Cushova", "Whisper", "Crescent",
  "Zenith", "Verano", "Loom", "Stoic", "Slumber", "Ellen", "Brasa", "Brio",
  "Sapele", "Ember", "Haven", "Solace", "Mosaic", "Atlas", "Nimbus", "Terra",
];

const IMAGE_POOL = [
  ...Object.values(images.bestSellers),
  ...Object.values(images.collection),
];

// Har collection ki apni "hero" image, gallery me pehle yehi aati hai
const COLLECTION_IMAGE = {
  sofas: images.collection.sofas,
  beds: images.collection.beds,
  "dining-tables": images.collection.dining,
  "side-tables": images.collection.sideTables,
  "accent-chairs": images.collection.chairs,
  storage: images.collection.storage,
  desks: images.collection.desks,
  accents: images.collection.accents,
};

export const FINISHES = [
  { name: "Natural Walnut", color: "#6b4a34" },
  { name: "Smoked Oak", color: "#4a3a2e" },
  { name: "Honey Teak", color: "#b07b4f" },
  { name: "Ivory Ash", color: "#d9cfc1" },
];

// Collection ke hisaab se size options (price multiplier ke saath)
const SIZES = {
  sofas: [
    { label: "2 Seater", w: 168, d: 92, h: 82, mult: 0.8 },
    { label: "3 Seater", w: 218, d: 96, h: 82, mult: 1 },
    { label: "L Shape", w: 290, d: 168, h: 82, mult: 1.45 },
  ],
  beds: [
    { label: "Queen", w: 168, d: 218, h: 118, mult: 0.9 },
    { label: "King", w: 198, d: 224, h: 118, mult: 1 },
  ],
  "dining-tables": [
    { label: "6 Seater", w: 180, d: 90, h: 76, mult: 0.85 },
    { label: "8 Seater", w: 240, d: 100, h: 76, mult: 1 },
  ],
  "side-tables": [
    { label: "Small", w: 45, d: 45, h: 50, mult: 0.8 },
    { label: "Large", w: 60, d: 60, h: 55, mult: 1 },
  ],
  "accent-chairs": [{ label: "Standard", w: 76, d: 80, h: 84, mult: 1 }],
  storage: [
    { label: "Two Door", w: 120, d: 45, h: 80, mult: 0.85 },
    { label: "Four Door", w: 200, d: 45, h: 80, mult: 1 },
  ],
  desks: [
    { label: "4 ft", w: 120, d: 60, h: 75, mult: 0.85 },
    { label: "5 ft", w: 150, d: 70, h: 75, mult: 1 },
  ],
  accents: [{ label: "Standard", w: 70, d: 6, h: 160, mult: 1 }],
};

const MATERIALS = {
  sofas: "Kiln dried sheesham frame, high resilience foam and performance fabric",
  beds: "Solid sheesham frame with a tufted upholstered headboard",
  "dining-tables": "Solid sheesham top on a mortise and tenon base",
  "side-tables": "Solid wood top with a hand turned base",
  "accent-chairs": "Solid wood legs, sculpted seat and bouclé fabric",
  storage: "Solid wood carcass with veneered doors and soft close hinges",
  desks: "Solid wood top with cable management and a dovetail drawer",
  accents: "Solid wood frame with hand finished detailing",
};

const STORY = {
  sofas: "Deep, sculpted seating built around a kiln dried hardwood frame. Every seat is hand tailored and tested for years of daily use.",
  beds: "A calm, grounded bed with generous proportions. The frame is joined without metal brackets so it stays silent and steady.",
  "dining-tables": "A table made to gather around. The top is book matched by hand so the grain flows across the whole surface.",
  "side-tables": "A small piece with real presence. Turned, sanded and hand oiled so the grain is felt as much as seen.",
  "accent-chairs": "A statement chair that stays comfortable. The shell is shaped to support the back and the legs are carved from solid wood.",
  storage: "Quiet storage with considered detail. Doors close softly, shelves are adjustable and the finish is built to last.",
  desks: "A work surface for focused days. Edges are softened, the drawer runs on dovetail joints and cables stay out of sight.",
  accents: "A finishing piece that completes a room. Made in small batches by our workshop and finished by hand.",
};

// Seeded random: har baar same result, taake SSR aur browser match karein
function hash(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, r) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const kebab = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const BADGES = ["Bestseller", "New", "Limited", null, null, null];

// Ek product ki poori detail banao
function build({ name, slug, collection, price, oldPrice, image, ratio, seed }) {
  const r = rng(hash(seed));
  const sizes = SIZES[collection] ?? SIZES.accents;
  const gallery = [
    image,
    ...shuffle(IMAGE_POOL.filter((x) => x !== image), r).slice(0, 3),
  ];
  const finishes = shuffle(FINISHES, r).slice(0, 3);
  const type = name.split(" ").slice(-1)[0];
  return {
    id: slug,
    slug,
    name,
    type,
    collection,
    price,
    oldPrice,
    image,
    images: gallery,
    hoverImage: gallery[1],
    ratio: ratio ?? "aspect-[4/5]",
    href: `/products/${slug}`,
    badge: BADGES[Math.floor(r() * BADGES.length)],
    rating: Math.round((4.5 + r() * 0.5) * 10) / 10,
    reviews: 12 + Math.floor(r() * 140),
    finishes,
    sizes,
    material: MATERIALS[collection] ?? MATERIALS.accents,
    story: STORY[collection] ?? STORY.accents,
    leadTime: `${3 + Math.floor(r() * 3)} to ${6 + Math.floor(r() * 3)} weeks`,
  };
}

const cache = new Map();
const BEST_SLUGS = new Set(bestSellersContent.items.map((i) => kebab(i.name)));

export function getProducts(slug, count = 16) {
  const col = getCollection(slug);
  if (!col) return [];

  if (slug === "all") {
    // All = har collection se barabar hissa
    const per = Math.ceil(count / collections.length);
    return collections
      .flatMap((c) => getProducts(c.slug, per))
      .slice(0, count);
  }

  const key = `${slug}:${count}`;
  if (cache.has(key)) return cache.get(key);

  const r = rng(hash(slug));
  const prefixes = shuffle(PREFIXES, r);
  const own = COLLECTION_IMAGE[slug];
  const pool = shuffle(IMAGE_POOL.filter((x) => x !== own), r);

  const list = Array.from({ length: count }, (_, i) => {
    const discount = 0.08 + r() * 0.17;
    const price = Math.round((30000 + r() * 220000) / 1000) * 1000;
    const oldPrice = Math.round(price / (1 - discount) / 1000) * 1000;
    const name = `${prefixes[i % prefixes.length]} ${col.types[i % col.types.length]}`;
    return build({
      name,
      slug: BEST_SLUGS.has(kebab(name)) ? `${kebab(name)}-${slug}` : kebab(name),
      collection: slug,
      price,
      oldPrice,
      image: i === 0 && own ? own : pool[i % pool.length],
      seed: `${slug}-${i}`,
    });
  });
  cache.set(key, list);
  return list;
}

// Home page ke Best Sellers: content.js ke fixed items, ab asli product pages ke saath
const BEST_SELLER_COLLECTION = {
  sofaA: "sofas", tvTable: "storage", chair: "accent-chairs", sofaB: "sofas",
  coffeeTable: "side-tables", dining: "dining-tables", bed: "beds",
  storage: "storage", accent: "accent-chairs",
};

export function getBestSellers() {
  return bestSellersContent.items.map((it) =>
    build({
      name: it.name,
      slug: kebab(it.name),
      collection: BEST_SELLER_COLLECTION[it.imageKey] ?? "sofas",
      price: it.price,
      oldPrice: it.oldPrice,
      image: images.bestSellers[it.imageKey],
      ratio: it.ratio,
      seed: `bs-${it.name}`,
    })
  );
}

// Har generated product ka slug yahan se resolve hota hai (static params ke liye bhi)
export function getAllProducts() {
  const seen = new Map();
  [
    ...getBestSellers(),
    ...collections.flatMap((c) => getProducts(c.slug, 16)),
  ].forEach((p) => {
    if (!seen.has(p.slug)) seen.set(p.slug, p);
  });
  return [...seen.values()];
}

export function getProduct(slug) {
  return getAllProducts().find((p) => p.slug === slug) ?? null;
}

// Related: pehle same collection, phir baaki collections se
export function getRelated(product, count = 4) {
  const all = getAllProducts().filter((p) => p.slug !== product.slug);
  const same = all.filter((p) => p.collection === product.collection);
  const other = shuffle(
    all.filter((p) => p.collection !== product.collection),
    rng(hash(product.slug))
  );
  return [...same, ...other].slice(0, count);
}

// "Complete the room": doosre collections ke products
export function getComplete(product, count = 4) {
  const r = rng(hash(`${product.slug}-complete`));
  const other = getAllProducts().filter((p) => p.collection !== product.collection);
  return shuffle(other, r).slice(0, count);
}