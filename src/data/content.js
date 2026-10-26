export const navLinks = [
  { label: "Shop", href: "/collections/all", menu: "shop" },
  { label: "Interior Design", href: "/interior-design" },
  { label: "Services", href: "/interior-design", menu: "services" },
  { label: "Swatches", href: "/swatches" },
  { label: "Stores", href: "/stores", menu: "stores" },
];

export const heroContent = {
  introLines: ["Introducing The Brasa & The Brio", "Discover New Designs"],
};

export const introContent = {
  label: "New from Fall/Winter 2026",
  body: "This season brings expressive materiality to architectural forms. The Brasa Collection pairs richly figured sapele with fine upholstery, while the Brio Coffee Tables highlight the natural movement of Bronze Fantasy stone.",
  cta: { label: "Shop Now", href: "/collections/all" },
};

export const services = [
  {
    id: "01",
    title: "AU WOODS Interiors",
    body: "Create exquisite spaces with a dedicated interior designer, here to guide you through projects of all scopes and sizes.",
    cta: { label: "Schedule a Consultation", href: "/interior-design" },
  },
  {
    id: "02",
    title: "Swatches",
    body: "Experience the fabrics, leathers, and finishes of your choice in your space.",
    cta: { label: "Order Swatches", href: "/swatches" },
  },
  {
    id: "03",
    title: "For Design Professionals",
    body: "Interior designers and architects enjoy services tailored to their needs.",
    cta: { label: "Apply", href: "/trade" },
  },
];

export const flagships = {
  title: "Flagships",
  body: "Experience our designs, materials, and philosophy at AU WOODS flagships in New York and Miami.",
  cta: { label: "Visit", href: "/stores" },
};

export const edits = [
  { id: "01", title: "The Bedroom Collection", href: "/collections/beds", imageKey: "bedroom" },
  { id: "02", title: "The Living Room Collection", href: "/collections/sofas", imageKey: "living" },
  { id: "03", title: "The Dining Collection", href: "/collections/dining-tables", imageKey: "dining" },
  { id: "04", title: "New Arrivals", href: "/collections/all", imageKey: "arrivals" },
];

export const footerColumns = [
  {
    title: "Brand",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Instagram", href: "/contact" },
      { label: "Pinterest", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Trade & Contract", href: "/trade" },
      { label: "AU WOODS Interiors", href: "/interior-design" },
      { label: "Care Services & Resources", href: "/care" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Product & Material Care", href: "/care" },
      { label: "Catalog Preferences", href: "/contact" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Notice at Collection", href: "/privacy" },
      { label: "Do Not Sell My Info", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Accessibility Statement", href: "/accessibility" },
    ],
  },
];

// Menu panel ke har label ka asli page
const MENU_LINKS = {
  "Fall/Winter 2026": "/collections/all",
  "The Collectible Series": "/collections/all",
  "Ready to Ship": "/collections/all",
  Sofas: "/collections/sofas",
  Sectionals: "/collections/sofas",
  "Modular Seating": "/collections/sofas",
  "Accent Chairs": "/collections/accent-chairs",
  Daybeds: "/collections/beds",
  Benches: "/collections/accent-chairs",
  "Ottomans & Stools": "/collections/accent-chairs",
  "Sleeper Sofas": "/collections/sofas",
  "Dining Chairs": "/collections/accent-chairs",
  "Bar & Counter Stools": "/collections/accent-chairs",
  "Dining Tables": "/collections/dining-tables",
  "Console & Entry Tables": "/collections/storage",
  "Coffee Tables": "/collections/side-tables",
  "Side Tables": "/collections/side-tables",
  Plinths: "/collections/side-tables",
  Desks: "/collections/desks",
  Beds: "/collections/beds",
  "Mirrors & Screens": "/collections/accents",
  "Sideboards & Consoles": "/collections/storage",
  Shelves: "/collections/accents",
  "Dressers & Armoires": "/collections/storage",
  Nightstands: "/collections/beds",
  "The Living Collection": "/collections/sofas",
  "The Dining Collection": "/collections/dining-tables",
  "The Bedroom Collection": "/collections/beds",
  "AU WOODS Interiors": "/interior-design",
  "Trade & Contract": "/trade",
  "Care Services & Resources": "/care",
  Contact: "/contact",
  "New York Flagship": "/stores",
  "Miami Flagship": "/stores",
};

const l = (label) => ({ label, href: MENU_LINKS[label] ?? "/collections/all" });

export const shopMenu = [
  {
    title: "Edits",
    columns: [[l("Fall/Winter 2026"), l("The Collectible Series"), l("Ready to Ship")]],
  },
  {
    title: "Seating",
    columns: [
      [l("Sofas"), l("Sectionals"), l("Modular Seating"), l("Accent Chairs"), l("Daybeds")],
      [l("Benches"), l("Ottomans & Stools"), l("Sleeper Sofas"), l("Dining Chairs"), l("Bar & Counter Stools")],
    ],
  },
  {
    title: "Tables",
    columns: [
      [l("Dining Tables"), l("Console & Entry Tables"), l("Coffee Tables"), l("Side Tables")],
      [l("Plinths"), l("Desks")],
    ],
  },
  { title: "Beds", columns: [[l("Beds")]] },
  { title: "Accents", columns: [[l("Mirrors & Screens")]] },
  {
    title: "Storage",
    columns: [[l("Sideboards & Consoles"), l("Shelves"), l("Dressers & Armoires"), l("Nightstands")]],
  },
  {
    title: "Collections",
    columns: [[l("The Living Collection"), l("The Dining Collection"), l("The Bedroom Collection")]],
  },
];

// Side panel content: key = navLinks ke "menu" ki value
export const panels = {
  shop: { sections: shopMenu },
  services: {
    sections: [
      {
        title: "Services",
        emphasizeFirst: true,
        columns: [
          [
            l("AU WOODS Interiors"),
            l("Trade & Contract"),
            l("Care Services & Resources"),
            l("Contact"),
          ],
        ],
      },
    ],
  },
  stores: {
    sections: [
      {
        title: "Stores",
        emphasizeFirst: true,
        columns: [[l("New York Flagship"), l("Miami Flagship")]],
      },
    ],
  },
  
};
export const collectionContent = {
  title: "Collection",
  items: [
    { label: "Sofas", href: "/collections/sofas", imageKey: "sofas" },
    { label: "Beds", href: "/collections/beds", imageKey: "beds" },
    { label: "Dining Tables", href: "/collections/dining-tables", imageKey: "dining" },
    { label: "Side Tables", href: "/collections/side-tables", imageKey: "sideTables" },
    { label: "Accent Chairs", href: "/collections/accent-chairs", imageKey: "chairs" },
    { label: "Storage", href: "/collections/storage", imageKey: "storage" },
    { label: "Desks", href: "/collections/desks", imageKey: "desks" },
    { label: "Accents", href: "/collections/accents", imageKey: "accents" },
  ],
};
export const bestSellersContent = {
  title: "Best Sellers",
  cta: { label: "View All", href: "/collections/all" },  items: [
    { name: "Veloura Sofa", price: 90000, oldPrice: 120000, imageKey: "sofaA", ratio: "aspect-[4/5]" },
    { name: "Ellen TV Table", price: 99000, oldPrice: 117000, imageKey: "tvTable", ratio: "aspect-[1/1]" },
    { name: "Arch Chair", price: 84000, oldPrice: 102000, imageKey: "chair", ratio: "aspect-[4/3]" },
    { name: "Ovarine Sofa Set", price: 144000, oldPrice: 180000, imageKey: "sofaB", ratio: "aspect-[4/3]" },
    { name: "Arc & Orb", price: 66000, oldPrice: 78000, imageKey: "coffeeTable", ratio: "aspect-[1/1]" },
    { name: "Verano Loom Dining Set", price: 216000, oldPrice: 240000, imageKey: "dining", ratio: "aspect-[4/5]" },
    { name: "Stoic Slumber Bed", price: 228000, oldPrice: 252000, imageKey: "bed", ratio: "aspect-[4/3]" },
    { name: "Crescent Cabinet", price: 66000, oldPrice: 78000, imageKey: "storage", ratio: "aspect-[1/1]" },
    { name: "Caldera Accent Chair", price: 80000, oldPrice: 90000, imageKey: "accent", ratio: "aspect-[4/5]" },
  ],
};

export const siteInfo = {
  name: "AU WOODS",
  email: "infoauwoods@gmail.com",
  phone: "0309 4666939",
  phoneHref: "tel:+923094666939",
  // Instagram profile ka poora link yahan likho, jaise "https://instagram.com/yourhandle"
  instagram: "",
};
export const faqContent = {
  title: "Questions, answered",
  intro: "Everything people ask us before ordering their first AU WOODS piece.",
  items: [
    {
      q: "What is AU WOODS furniture made of?",
      a: "Our frames are solid wood, kiln dried and joined by hand. Upholstered pieces pair the wood frame with fine fabrics and high resilience foam. We do not use particle board.",
    },
    {
      q: "Is everything made to order?",
      a: "Yes. Each piece is built in our workshop after you order it, in the finish and size you choose. The estimated time is shown on every product page.",
    },
    {
      q: "How do I place an order?",
      a: "Pick your finish and size, add the piece to your cart and press Order on WhatsApp. Your selection reaches us as a ready message, and our team confirms price, timing and delivery with you.",
    },
    {
      q: "Can I see the wood or fabric before I decide?",
      a: "Yes. Order swatches and see the finishes in your own light and space. You can also arrange a visit through our Stores page.",
    },
    {
      q: "Do you deliver and assemble?",
      a: "Our team delivers, assembles and places the furniture in your room, then takes the packaging away.",
    },
    {
      q: "What if something is not right?",
      a: "A 5 year warranty covers the frame and joinery. If anything is not right, contact us and we will make it right.",
    },
  ],
};