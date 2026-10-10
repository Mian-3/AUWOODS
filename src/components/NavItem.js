"use client";

import Link from "next/link";

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
        className={className}
      >
        {link.label}
      </button>
    );
  }

  return (
    <Link href={link.href} onClick={onNavigate} className={className}>
      {link.label}
    </Link>
  );
}