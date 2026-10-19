"use client";

import Link from "next/link";

// Invisible padding: touch par bada tap area, layout me koi farq nahi
const HIT = "relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']";

export default function NavItem({ link, className = "", onNavigate }) {
  if (link.menu) {
    return (
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          onNavigate?.();
          window.dispatchEvent(
            new CustomEvent("toggle-panel", { detail: link.menu })
          );
        }}
        className={`${HIT} ${className}`}
      >
        {link.label}
      </button>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={`${HIT} ${className}`}
    >
      {link.label}
    </Link>
  );
}