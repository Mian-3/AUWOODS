// Info pages: har slug ek page banata hai (/about, /contact, ...).
// Text badalna ho to sirf yahan badlo. Naya page = naya object.

export const pages = [
  {
    slug: "interior-design",
    title: "AU WOODS Interiors",
    eyebrow: "Services",
    intro:
      "A dedicated interior designer to guide you through projects of every scope, from a single room to a full home.",
    sections: [
      {
        h: "How it works",
        list: [
          "Tell us about your space and what you need",
          "We discuss layout, materials and budget with you",
          "Our team builds, delivers and places every piece",
        ],
      },
    ],
    form: {
      topic: "Interior design consultation",
      submit: "Schedule on WhatsApp",
      fields: [
        { name: "name", label: "Your name", required: true },
        { name: "phone", label: "Phone number", type: "tel" },
        { name: "city", label: "City" },
        {
          name: "project",
          label: "Project type",
          options: ["Single room", "Full home", "Office or commercial", "Not sure yet"],
        },
        { name: "details", label: "Tell us about your space", textarea: true },
      ],
    },
  },
  {
    slug: "swatches",
    title: "Swatches",
    eyebrow: "Services",
    intro:
      "Experience the fabrics, leathers and wood finishes of your choice in your own space, in your own light.",
    sections: [
      {
        h: "Available finishes",
        list: ["Natural Walnut", "Smoked Oak", "Honey Teak", "Ivory Ash"],
      },
    ],
    form: {
      topic: "Swatch request",
      submit: "Order swatches on WhatsApp",
      fields: [
        { name: "name", label: "Your name", required: true },
        { name: "phone", label: "Phone number", type: "tel" },
        { name: "address", label: "Delivery address", textarea: true, required: true },
        { name: "details", label: "Which finishes or fabrics?", textarea: true },
      ],
    },
  },
  {
    slug: "trade",
    title: "For Design Professionals",
    eyebrow: "Services",
    intro:
      "Interior designers, architects and contractors enjoy services tailored to their needs.",
    sections: [
      {
        h: "What you get",
        list: [
          "A dedicated contact for your projects",
          "Made to order sizes and finishes",
          "Support from quote to installation",
        ],
      },
    ],
    form: {
      topic: "Trade and contract application",
      submit: "Apply on WhatsApp",
      fields: [
        { name: "name", label: "Your name", required: true },
        { name: "company", label: "Studio or company" },
        { name: "phone", label: "Phone number", type: "tel" },
        { name: "details", label: "Tell us about your projects", textarea: true },
      ],
    },
  },
  {
    slug: "stores",
    title: "Visit AU WOODS",
    eyebrow: "Stores",
    intro:
      "Experience our designs, materials and philosophy in person. Message us to arrange a visit.",
    sections: [
      {
        h: "Plan your visit",
        p: "Tell us when you would like to come and we will confirm the address and timings with you.",
      },
    ],
    form: {
      topic: "Showroom visit",
      submit: "Request a visit on WhatsApp",
      fields: [
        { name: "name", label: "Your name", required: true },
        { name: "phone", label: "Phone number", type: "tel" },
        { name: "when", label: "Preferred day and time" },
      ],
    },
  },
  {
    slug: "contact",
    title: "Contact",
    eyebrow: "Support",
    intro: "Questions about a piece, an order or a custom size? We are happy to help.",
    sections: [],
    form: {
      topic: "General enquiry",
      submit: "Send on WhatsApp",
      fields: [
        { name: "name", label: "Your name", required: true },
        { name: "phone", label: "Phone number", type: "tel" },
        { name: "details", label: "How can we help?", textarea: true, required: true },
      ],
    },
    showContact: true,
  },
  {
    slug: "about",
    title: "About AU WOODS",
    eyebrow: "Brand",
    intro:
      "AU WOODS makes furniture in solid wood and fine upholstery, built to be lived with for decades.",
    sections: [
      {
        h: "Made to order",
        p: "Every piece is built in our own workshop after you order it. Wood is selected for straight grain, joined by hand and finished in four stages.",
      },
      {
        h: "Fewer pieces, made properly",
        p: "We focus on a small range of sofas, beds, tables, storage and accents, so each one gets the time it deserves.",
      },
    ],
  },
  {
    slug: "careers",
    title: "Careers",
    eyebrow: "Brand",
    intro: "Join the people who build AU WOODS furniture.",
    sections: [
      {
        h: "Open roles",
        p: "We are always glad to meet skilled carpenters, upholsterers and designers. Send us a message with your work.",
      },
    ],
    form: {
      topic: "Careers",
      submit: "Message us on WhatsApp",
      fields: [
        { name: "name", label: "Your name", required: true },
        { name: "phone", label: "Phone number", type: "tel" },
        { name: "details", label: "Your skills and experience", textarea: true },
      ],
    },
  },
  {
    slug: "care",
    title: "Care and Materials",
    eyebrow: "Support",
    intro: "A little care keeps solid wood and fine fabric beautiful for years.",
    sections: [
      {
        h: "Wood",
        list: [
          "Wipe with a soft, dry cloth",
          "Keep away from direct sun and standing water",
          "Re-oil once a year to keep the grain rich",
        ],
      },
      {
        h: "Upholstery",
        list: [
          "Vacuum gently every week",
          "Blot spills straight away, never rub",
          "Rotate cushions to wear them evenly",
        ],
      },
      {
        h: "Care services",
        p: "Need a repair, re-finish or re-upholstery? Contact us and our team will help.",
      },
    ],
  },
  {
    slug: "faq",
    title: "Frequently asked questions",
    eyebrow: "Support",
    intro: "Quick answers to what customers ask most.",
    sections: [
      { h: "How long does delivery take?", p: "Every piece is made to order. The estimate is on each product page and we confirm the exact date when you order." },
      { h: "Can I change my order?", p: "Yes, until we start cutting the wood. Message us as early as possible." },
      { h: "Do you assemble the furniture?", p: "Yes. Our team delivers, assembles and places the piece, then removes the packaging." },
      { h: "How do I order?", p: "Add pieces to your cart and press Order on WhatsApp. Your selection is sent to us as a message and we confirm everything with you." },
      { h: "What does the warranty cover?", p: "The frame and joinery are covered for 5 years." },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    eyebrow: "Legal",
    draft: true,
    intro: "How AU WOODS handles the information you share with us.",
    sections: [
      { h: "What we collect", p: "Only what you send us, such as your name, phone number, address and the details of your order or enquiry." },
      { h: "How we use it", p: "To reply to you, prepare and deliver your order, and provide after sales support. We do not sell your information." },
      { h: "Your cart", p: "Your cart is stored on your own device. It is not sent to us until you choose to order." },
      { h: "Contact", p: "Questions about your information? Contact us and we will respond." },
    ],
  },
  {
    slug: "terms",
    title: "Terms and Conditions",
    eyebrow: "Legal",
    draft: true,
    intro: "The terms that apply when you order from AU WOODS.",
    sections: [
      { h: "Orders", p: "Orders are confirmed with our team after you contact us. Prices on the site are shown in Pakistani rupees." },
      { h: "Made to order", p: "Pieces are built after you order. Changes are possible until production starts." },
      { h: "Warranty", p: "A 5 year warranty covers the frame and joinery against manufacturing faults." },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    eyebrow: "Legal",
    intro: "We want everyone to be able to browse and shop AU WOODS comfortably.",
    sections: [
      { h: "Our approach", p: "We design with readable type, strong contrast, keyboard navigation and screen reader labels, and we respect reduced motion settings." },
      { h: "Tell us what is hard", p: "If something on the site is difficult for you to use, contact us and we will fix it." },
    ],
  },
];

export const getPage = (slug) => pages.find((p) => p.slug === slug) ?? null;