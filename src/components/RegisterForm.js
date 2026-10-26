"use client";

import { useState } from "react";
import Link from "next/link";
import { enquiryLink } from "@/lib/whatsapp";

export default function RegisterForm() {
  const [email, setEmail] = useState("");

  // Backend abhi nahi: email WhatsApp message ban kar hum tak pohanchti hai
  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    window.open(
      enquiryLink("please add me to your updates list", { Email: email }),
      "_blank",
      "noopener,noreferrer"
    );
    setEmail("");
  };

  return (
    <form onSubmit={submit} className="max-w-[26rem]">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        placeholder="Email address"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border-b border-neutral-400 bg-transparent py-3 text-[16px] outline-none placeholder:text-foreground focus:border-foreground lg:py-2 lg:text-[12px]"
      />
      <p className="mt-3 text-[12px] text-neutral-600 lg:text-[11px]">
        By registering, you agree to our{" "}
        <Link href="/privacy" className="inline-block py-1 underline underline-offset-2 lg:py-0">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}