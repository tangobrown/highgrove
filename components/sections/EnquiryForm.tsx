"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";
import { interestOptions, validateEnquiry, type EnquiryErrors, type EnquiryPayload } from "@/lib/enquiry";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded-xl border border-input-border bg-input-bg px-4 py-[15px] text-[17px] text-teal placeholder:text-muted/70 outline-none transition-colors focus:border-teal focus-visible:outline-none aria-[invalid=true]:border-[#B3261E]";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <span id={id} className="text-[15px] font-normal text-[#B3261E]">
      {msg}
    </span>
  );
}

export function EnquiryForm({ variant = "default" }: { variant?: "default" | "home" }) {
  const uid = useId();
  const home = variant === "home";
  const options = home ? interestOptions.home : interestOptions.default;

  const [values, setValues] = useState({ name: "", firstName: "", lastName: "", email: "", phone: "", message: "", company: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<EnquiryErrors & { name?: string }>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const toggle = (opt: string) =>
    setInterests((cur) => (cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Home uses a single "Your name" field — split it into first/last for the API.
    let { firstName, lastName } = values;
    if (home) {
      const parts = values.name.trim().split(/\s+/);
      firstName = parts[0] ?? "";
      lastName = parts.slice(1).join(" ");
    }
    const payload: EnquiryPayload = {
      firstName,
      lastName: home ? lastName || "-" : lastName,
      email: values.email,
      phone: values.phone,
      interests,
      message: values.message,
      source: typeof window !== "undefined" ? window.location.pathname : undefined,
      company: values.company,
    };
    const errs: EnquiryErrors & { name?: string } = validateEnquiry(payload);
    if (home && (errs.firstName || errs.lastName)) {
      errs.name = "Please enter your name.";
      delete errs.firstName;
      delete errs.lastName;
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.querySelector<HTMLElement>(`[data-form="${uid}"] [aria-invalid="true"]`);
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="py-12 text-center">
        <Image src="/images/logo-icon.png" alt="" width={48} height={48} className="mx-auto mb-5 size-12" />
        <p className="mb-3 font-display text-[34px]">Thank you</p>
        <p className="text-lg text-body">We’ll be in touch within one working day.</p>
      </div>
    );
  }

  const id = (k: string) => `${uid}-${k}`;
  const field = (k: "firstName" | "lastName" | "email" | "phone" | "name", label: string, type: string, placeholder: string, autoComplete: string, required = true) => {
    const err = (errors as Record<string, string | undefined>)[k];
    return (
      <div className="grid gap-2">
        <label htmlFor={id(k)} className="text-[15px] font-bold">
          {label}
          {!required && <span className="font-normal text-muted"> (optional)</span>}
        </label>
        <input
          id={id(k)}
          name={k}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={values[k]}
          onChange={set(k)}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? id(`${k}-err`) : undefined}
          className={inputCls}
        />
        <FieldError id={id(`${k}-err`)} msg={err} />
      </div>
    );
  };

  return (
    <form noValidate onSubmit={onSubmit} data-form={uid}>
      <div className="grid gap-4 xs:grid-cols-2">
        {home ? (
          <>
            <div className="xs:col-span-2">{field("name", "Your name", "text", "Jane Smith", "name")}</div>
            {field("phone", "Phone", "tel", "021 123 4567", "tel", false)}
            {field("email", "Email", "email", "jane@example.com", "email")}
          </>
        ) : (
          <>
            {field("firstName", "First name", "text", "Jane", "given-name")}
            {field("lastName", "Last name", "text", "Smith", "family-name")}
            {field("email", "Email", "email", "jane@example.com", "email")}
            {field("phone", "Phone", "tel", "021 123 4567", "tel", false)}
          </>
        )}
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" name="company" value={values.company} onChange={set("company")} />
        </label>
      </div>

      <fieldset
        className="mt-[22px]"
        aria-invalid={errors.interests ? true : undefined}
        aria-describedby={errors.interests ? id("interests-err") : undefined}
      >
        <legend className="text-[15px] font-bold">I’m interested in</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {options.map((opt) => {
            const on = interests.includes(opt);
            return (
              <label
                key={opt}
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border-[1.5px] px-[18px] py-[11px] text-[15px] font-bold transition-colors duration-200 has-focus-visible:ring-2 has-focus-visible:ring-green has-focus-visible:ring-offset-2 ${
                  on ? "border-teal bg-teal text-white" : "border-input-border bg-input-bg text-teal hover:border-teal"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() => toggle(opt)}
                  aria-invalid={errors.interests ? true : undefined}
                />
                {opt}
              </label>
            );
          })}
        </div>
        <div className="mt-2">
          <FieldError id={id("interests-err")} msg={errors.interests} />
        </div>
      </fieldset>

      <div className="mt-[22px] grid gap-2">
        <label htmlFor={id("message")} className="text-[15px] font-bold">
          Your message <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id={id("message")}
          rows={4}
          placeholder="A question, or a good time to visit…"
          value={values.message}
          onChange={set("message")}
          className={`${inputCls} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-full bg-teal p-[19px] text-lg font-bold text-white transition-colors hover:bg-teal-hover focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : home ? "Book a tour today" : "Request information"}
      </button>
      {status === "error" ? (
        <p role="alert" className="mt-3.5 text-center text-[15px] text-[#B3261E]">
          Sorry, something went wrong. Please call us on {site.phone.display}.
        </p>
      ) : (
        <p className="mt-3.5 text-center text-sm text-muted">No obligation. We never share your details.</p>
      )}
    </form>
  );
}
