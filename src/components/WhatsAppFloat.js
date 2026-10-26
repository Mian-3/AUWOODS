"use client";

import { usePathname } from "next/navigation";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { enquiryLink } from "@/lib/whatsapp";

// Poori site par neeche right me floating WhatsApp button
export default function WhatsAppFloat() {
  const pathname = usePathname();
  // Product page par mobile me sticky buy bar hai, usse upar rakho
  const onProduct = pathname?.startsWith("/products/");

  return (
    <a
      href={enquiryLink("I would like to know more", {})}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105 md:right-6 md:h-[60px] md:w-[60px] ${
        onProduct ? "bottom-24 lg:bottom-6" : "bottom-5 md:bottom-6"
      }`}
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}