"use client";

import Link from "next/link";

export default function RegisterForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-[26rem]">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        placeholder="Email address"
        autoComplete="email"
        className="w-full border-b border-neutral-400 bg-transparent pb-2 text-[13px] outline-none placeholder:text-foreground focus:border-foreground md:text-[12px]"
      />
      <p className="mt-3 text-[12px] text-neutral-600 md:text-[11px]">
        By registering, you agree to our{" "}
        <Link href="#" className="underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}