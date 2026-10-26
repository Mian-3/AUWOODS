import { formatPrice } from "@/lib/format";

// WhatsApp number: country code ke saath, sirf digits (+ ya spaces ke baghair).
// 0309 4666939 -> 92 309 4666939
export const WHATSAPP_NUMBER = "923094666939";

const clean = (s) => (s ? String(s).trim() : "");

function link(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function origin() {
  return typeof window === "undefined" ? "https://auwoods.com" : window.location.origin;
}

// Ek product ka order message (selected variant ke saath)
export function productOrderLink({ product, finish, size, qty, price }) {
  const lines = [
    "Hello AU WOODS, I would like to order:",
    "",
    `Product: ${product.name}`,
    finish && `Finish: ${clean(finish)}`,
    size && `Size: ${clean(size)}`,
    `Quantity: ${qty}`,
    `Price: ${formatPrice(price)} each`,
    `Total: ${formatPrice(price * qty)}`,
    "",
    `${origin()}/products/${product.slug}`,
    "",
    "Please confirm availability and delivery details.",
  ].filter((l) => l !== false && l !== null && l !== undefined);
  return link(lines.join("\n"));
}

// Poore cart ka order message
export function cartOrderLink(items, subtotal) {
  const body = items.map((it, i) =>
    [
      `${i + 1}. ${it.name}`,
      `   ${[it.finish, it.size].filter(Boolean).join(" / ")}`.trimEnd(),
      `   Qty ${it.qty} x ${formatPrice(it.price)} = ${formatPrice(it.price * it.qty)}`,
      `   ${origin()}/products/${it.slug}`,
    ]
      .filter((l) => l.trim() !== "")
      .join("\n")
  );
  const text = [
    "Hello AU WOODS, I would like to order:",
    "",
    ...body,
    "",
    `Total: ${formatPrice(subtotal)}`,
    "",
    "Please confirm availability and delivery details.",
  ].join("\n");
  return link(text);
}

// Form / enquiry ka message: { "Name": "Ali", ... } fields se
export function enquiryLink(topic, fields) {
  const lines = Object.entries(fields)
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${k}: ${String(v).trim()}`);
  return link([`Hello AU WOODS, ${topic}.`, "", ...lines].join("\n"));
}