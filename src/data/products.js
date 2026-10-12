import { images } from "@/data/images";

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

export function getProducts(slug, count = 16) {
  const col = getCollection(slug);
  if (!col) return [];

  const r = rng(hash(slug));
  const prefixes = shuffle(PREFIXES, r);
  const pool = shuffle(IMAGE_POOL, r);

  return Array.from({ length: count }, (_, i) => {
    const discount = 0.08 + r() * 0.17;
    const price = Math.round((30000 + r() * 220000) / 1000) * 1000;
    const oldPrice = Math.round(price / (1 - discount) / 1000) * 1000;

    return {
      id: `${slug}-${i}`,
      name: `${prefixes[i]} ${col.types[i % col.types.length]}`,
      price,
      oldPrice,
      image: pool[i % pool.length],
      ratio: "aspect-[4/5]",
      href: "#",
    };
  });
}