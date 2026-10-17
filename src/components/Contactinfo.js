import { Mail, Phone } from "lucide-react";
import { siteInfo } from "@/data/content";

export default function ContactInfo({ className = "", linkClassName = "" }) {
  const link = `inline-flex items-center gap-2.5 transition-opacity hover:opacity-60 ${linkClassName}`;

  return (
    <ul className={className}>
      <li>
        <a href={`mailto:${siteInfo.email}`} className={link}>
          <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
          {siteInfo.email}
        </a>
      </li>
      <li>
        <a href={siteInfo.phoneHref} className={link}>
          <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
          {siteInfo.phone}
        </a>
      </li>
    </ul>
  );
}