"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { enquiryLink } from "@/lib/whatsapp";

const field =
  "w-full border-b border-black/25 bg-transparent py-3 text-[16px] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-black";

// Form bharne par WhatsApp khulta hai aur message pehle se likha hota hai
export default function InquiryForm({ form }) {
  const [values, setValues] = useState({});
  const [error, setError] = useState("");

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const missing = form.fields.find((f) => f.required && !values[f.name]?.trim());
    if (missing) {
      setError(`Please fill in: ${missing.label}`);
      return;
    }
    setError("");
    const data = Object.fromEntries(form.fields.map((f) => [f.label, values[f.name]]));
    window.open(enquiryLink(form.topic, data), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} noValidate className="max-w-xl">
      <div className="flex flex-col gap-6">
        {form.fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={`f-${f.name}`} className="text-[13px] text-[var(--muted)]">
              {f.label}
              {f.required && " *"}
            </label>
            {f.options ? (
              <select
                id={`f-${f.name}`}
                value={values[f.name] ?? ""}
                onChange={set(f.name)}
                className={field}
              >
                <option value="">Select</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.textarea ? (
              <textarea
                id={`f-${f.name}`}
                rows={3}
                value={values[f.name] ?? ""}
                onChange={set(f.name)}
                className={`${field} resize-none`}
              />
            ) : (
              <input
                id={`f-${f.name}`}
                type={f.type ?? "text"}
                value={values[f.name] ?? ""}
                onChange={set(f.name)}
                autoComplete={f.type === "tel" ? "tel" : f.name === "name" ? "name" : "off"}
                className={field}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-5 text-[14px] text-[#8c2f23]">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1f8f4e] text-[15px] font-medium text-white transition-colors hover:bg-[#177a40] sm:w-auto sm:px-10"
      >
        <WhatsAppIcon size={20} /> {form.submit}
      </button>
    </form>
  );
}