export const navLinks = [
  { label: "Shop", href: "#", menu: "shop" },
  { label: "Interior Design", href: "#" },
  { label: "Services", href: "#", menu: "services" },
  { label: "Swatches", href: "#" },
  { label: "Stores", href: "#", menu: "stores" },
];

export const heroContent = {
  introLines: ["Introducing The Brasa & The Brio", "Discover New Designs"],
};

export const introContent = {
  label: "New from Fall/Winter 2026",
  body: "This season brings expressive materiality to architectural forms. The Brasa Collection pairs richly figured sapele with fine upholstery, while the Brio Coffee Tables highlight the natural movement of Bronze Fantasy stone.",
  cta: { label: "Shop Now", href: "#" },
};

export const services = [
  {
    id: "01",
    title: "AU WOODS Interiors",
    body: "Create exquisite spaces with a dedicated interior designer, here to guide you through projects of all scopes and sizes.",
    cta: { label: "Schedule a Consultation", href: "#" },
  },
  {
    id: "02",
    title: "Swatches",
    body: "Experience the fabrics, leathers, and finishes of your choice in your space.",
    cta: { label: "Order Swatches", href: "#" },
  },
  {
    id: "03",
    title: "For Design Professionals",
    body: "Interior designers and architects enjoy services tailored to their needs.",
    cta: { label: "Apply", href: "#" },
  },
];

export const flagships = {
  title: "Flagships",
  body: "Experience our designs, materials, and philosophy at AU WOODS flagships in New York and Miami.",
  cta: { label: "Visit", href: "#" },
};

export const edits = [
  { id: "01", title: "The Bedroom Collection", href: "#", imageKey: "bedroom" },
  { id: "02", title: "The Living Room Collection", href: "#", imageKey: "living" },
  { id: "03", title: "The Dining Collection", href: "#", imageKey: "dining" },
  { id: "04", title: "New Arrivals", href: "#", imageKey: "arrivals" },
];

export const footerColumns = [
  {
    title: "Brand",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Pinterest", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Trade & Contract", href: "#" },
      { label: "AU WOODS Interiors", href: "#" },
      { label: "Care Services & Resources", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Product & Material Care", href: "#" },
      { label: "Catalog Preferences", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Notice at Collection", href: "#" },
      { label: "Do Not Sell My Info", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Accessibility Statement", href: "#" },
    ],
  },
];

const l = (label) => ({ label, href: "#" });

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