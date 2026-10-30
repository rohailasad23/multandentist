"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { appointmentSchema, maxDate, minDate, timeSlots, treatmentOptions, type FieldErrors } from "@/lib/booking/schema";
import { Button } from "@/components/ui/Button";
import { easeLux } from "@/components/motion/Reveal";
import { site, telHref, isPlaceholder } from "@/content/site";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; reference: string; mode: string; wa?: { mobile: boolean; web: string; app: string } }
  | { kind: "error"; message: string };

type Values = { name: string; phone: string; email: string; treatment: string; date: string; time: string; message: string; consent: boolean };

/** Builds a WhatsApp link with the request pre-written, for clinics that take bookings on WhatsApp. */
function whatsappRequestText(v: Values, reference: string) {
  const treatment = treatmentOptions.find((o) => o.value === v.treatment)?.label ?? v.treatment;
  const time = timeSlots.find((t) => t.value === v.time)?.label ?? v.time;
  const date = new Date(`${v.date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const lines = [
    "Hello, I would like to request an appointment.",
    "",
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    `Email: ${v.email}`,
    `Treatment: ${treatment}`,
    `Preferred date: ${date}`,
    `Preferred time: ${time}`,
    ...(v.message.trim() ? [`Message: ${v.message.trim()}`] : []),
    "",
    `Reference: ${reference}`,
  ];
  return encodeURIComponent(lines.join("\n"));
}

/**
 * Phones: wa.me hands straight over to the WhatsApp app.
 * Computers: wa.me shows an intermediate "Continue to chat" page that is easy
 * to mistake for a sent message, so go directly to WhatsApp Web instead, and
 * offer the desktop app as an alternative.
 */
function whatsappLinks(text: string) {
  const n = site.booking.whatsapp;
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  return {
    mobile,
    web: mobile ? `https://wa.me/${n}?text=${text}` : `https://web.whatsapp.com/send?phone=${n}&text=${text}`,
    app: `whatsapp://send?phone=${n}&text=${text}`,
  };
}

const fieldOrder: (keyof Values)[] = ["name", "phone", "email", "treatment", "date", "time", "message", "consent"];

const inputCls =
  "peer w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 pb-3 pt-2 text-[1.05rem] text-ink placeholder:text-ink/35 transition-colors duration-300 focus:border-forest focus:outline-none focus:ring-0 aria-[invalid=true]:border-error";

function Field({ id, label, error, hint, children, optional }: { id: string; label: string; error?: string; hint?: string; children: ReactNode; optional?: boolean }) {
  return (
    <div className="group relative">
      <label htmlFor={id} className="eyebrow mb-2 block text-ink-soft transition-colors group-focus-within:text-forest">
        {label} {optional && <span className="normal-case tracking-normal text-ink/50">(optional)</span>}
      </label>
      <div className="relative">
        {children}
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-forest transition-transform duration-500 ease-[var(--ease-lux)] group-focus-within:scale-x-100" />
      </div>
      {hint && !error && <p id={`${id}-hint`} className="mt-2 text-xs text-ink-soft">{hint}</p>}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-error`} className="mt-2 flex items-center gap-2 text-sm text-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" /><path d="M8 4.5v4M8 10.5v1" stroke="currentColor" strokeWidth="1.5" /></svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AppointmentForm({ defaultTreatment = "" }: { defaultTreatment?: string }) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [values, setValues] = useState<Values>({
    name: "", phone: "", email: "",
    treatment: treatmentOptions.some((o) => o.value === defaultTreatment) ? defaultTreatment : "",
    date: "", time: "", message: "", consent: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [bounds, setBounds] = useState({ min: "", max: "" });
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    setBounds({ min: minDate(), max: maxDate() });
  }, []);

  useEffect(() => {
    if (status.kind === "success" || status.kind === "error") {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status.kind]);

  const validate = (v: Values) => {
    const r = appointmentSchema.safeParse(v);
    if (r.success) return {};
    const e: FieldErrors = {};
    for (const issue of r.error.issues) {
      const k = issue.path[0] as keyof FieldErrors;
      if (k && !e[k]) e[k] = issue.message;
    }
    return e;
  };

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    const nextValues = { ...values, [k]: v };
    setValues(nextValues);
    if (touched) setErrors(validate(nextValues));
  };

  const aria = (k: keyof Values, hint?: boolean) => ({
    id: id(k),
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id(k)}-error` : hint ? `${id(k)}-hint` : undefined,
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    if (site.booking.whatsapp) {
      // Open WhatsApp within the click itself so mobile browsers don't block it.
      if (honeypot.current?.value) return;
      const reference = `REQ-${Date.now().toString(36).slice(-6).toUpperCase()}`;
      const wa = whatsappLinks(whatsappRequestText(values, reference));
      window.open(wa.web, "_blank", "noopener");
      setStatus({ kind: "success", reference, mode: "whatsapp", wa });
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.status === "received") {
        setStatus({ kind: "success", reference: data.reference, mode: data.mode });
      } else if (res.status === 422 && data.fieldErrors) {
        setErrors(data.fieldErrors);
        setStatus({ kind: "idle" });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      } else {
        setStatus({ kind: "error", message: data.message ?? "Something went wrong while sending your request." });
      }
    } catch {
      setStatus({ kind: "error", message: "We could not reach the server. Please check your connection and try again." });
    }
  }

  const tel = telHref();
  const errorList = fieldOrder.filter((k) => errors[k as keyof FieldErrors]);

  if (status.kind === "success") {
    const demo = status.mode === "demo";
    return (
      <motion.div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="bg-paper p-8 focus:outline-none md:p-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeLux }}
      >
        <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-forest text-paper">
          <svg viewBox="0 0 24 24" className="h-6 w-6"><motion.path d="M5 12.5 10 17 19 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: easeLux }} /></svg>
        </span>
        <h2 className="display-md mt-8">{status.wa ? "One last step" : "Thank you"}, {values.name.split(" ")[0]}.</h2>
        {status.wa ? (
          <>
            <p className="lede mt-6 max-w-lg text-ink-soft">
              Your request is written and waiting in WhatsApp, but it has <strong className="font-semibold text-ink">not been sent yet</strong>. Please open the chat and press <strong className="font-semibold text-ink">Send</strong> so it reaches the clinic.
            </p>
            <ol className="mt-6 max-w-lg list-inside list-decimal space-y-1 text-sm leading-relaxed text-ink-soft">
              {status.wa.mobile ? (
                <li>WhatsApp should have opened. If it didn&apos;t, tap the green button below.</li>
              ) : (
                <li>WhatsApp Web has opened in a new tab. Scan the QR code if asked, or use the WhatsApp app button below.</li>
              )}
              <li>Check the message, then press Send.</li>
              <li>The clinic will reply on WhatsApp to agree a time. This is not yet a confirmed booking.</li>
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={status.wa.web} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#1f7a4d] px-7 py-3 text-[0.9rem] font-semibold text-paper transition-colors hover:bg-[#17603c]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" /></svg>
                {status.wa.mobile ? "Open WhatsApp" : "Open WhatsApp Web"}
              </a>
              {!status.wa.mobile && (
                <a href={status.wa.app} className="inline-flex min-h-12 items-center rounded-full border border-ink/25 px-7 py-3 text-[0.9rem] font-semibold transition-colors hover:border-ink">
                  Open the WhatsApp app
                </a>
              )}
            </div>
          </>
        ) : (
          <p className="lede mt-6 max-w-lg text-ink-soft">
            Your appointment <strong className="font-semibold text-ink">request</strong> has been received. This is not yet a confirmed booking: a member of our team will contact you by phone or email to agree a time.
          </p>
        )}
        <p className="mt-6 text-sm text-ink-soft">Reference: <span className="font-mono text-ink">{status.reference}</span></p>
        {demo && (
          <p className="mt-8 rounded-md border border-dashed border-error/50 bg-error/5 px-4 py-3 text-sm text-error">
            <strong>Demo mode:</strong> no booking backend is configured, so this request was <strong>not</strong> sent to the clinic. See BOOKING.md to connect one.
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => { setStatus({ kind: "idle" }); setValues((v) => ({ ...v, message: "", date: "", time: "" })); setTouched(false); startedAt.current = Date.now(); }}>
            Make another request
          </Button>
          <Link href="/" className="inline-flex min-h-12 items-center px-4 text-sm font-semibold text-forest"><span className="link-underline">Return home</span></Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="bg-paper p-6 sm:p-10 md:p-14" aria-describedby={`${uid}-required`}>
      <p id={`${uid}-required`} className="mb-10 text-sm text-ink-soft">All fields are required unless marked optional. Please don&apos;t include detailed medical information here.</p>

      <AnimatePresence>
        {errorList.length > 0 && touched && (
          <motion.div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="mb-10 border-l-2 border-error bg-error/5 p-5 text-sm focus:outline-none"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className="font-semibold text-error">Please check {errorList.length === 1 ? "one field" : `${errorList.length} fields`}:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-error">
              {errorList.map((k) => (
                <li key={k}><a href={`#${id(k === "time" ? "time-0" : k)}`} className="underline underline-offset-2">{errors[k as keyof FieldErrors]}</a></li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="md:col-span-2">
          <Field id={id("name")} label="Full name" error={errors.name}>
            <input {...aria("name")} type="text" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Your name" />
          </Field>
        </div>
        <Field id={id("phone")} label="Phone number" error={errors.phone}>
          <input {...aria("phone")} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} placeholder="+00 000 000 000" />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email}>
          <input {...aria("email")} type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="you@example.com" />
        </Field>
        <Field id={id("treatment")} label="Preferred treatment" error={errors.treatment}>
          <div className="relative">
            <select {...aria("treatment")} value={values.treatment} onChange={(e) => set("treatment", e.target.value)} className={`${inputCls} appearance-none pr-8 ${values.treatment ? "" : "text-ink/45"}`}>
              <option value="" disabled>Select a treatment</option>
              {treatmentOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </div>
        </Field>
        <Field id={id("date")} label="Preferred date" error={errors.date} hint="We'll do our best to match it.">
          <input {...aria("date", true)} type="date" min={bounds.min} max={bounds.max} value={values.date} onChange={(e) => set("date", e.target.value)} className={`${inputCls} min-h-[2.75rem]`} />
        </Field>

        <fieldset className="md:col-span-2" aria-describedby={errors.time ? `${id("time")}-error` : undefined}>
          <legend className="eyebrow mb-4 text-ink-soft">Preferred time</legend>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {timeSlots.map((slot, i) => {
              const checked = values.time === slot.value;
              return (
                <label key={slot.value} className={`relative flex min-h-16 cursor-pointer flex-col justify-center rounded-sm border px-4 py-3 transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest ${checked ? "border-forest bg-forest text-paper" : errors.time ? "border-error/60" : "border-ink/20 hover:border-ink/60"}`}>
                  <input type="radio" id={id(`time-${i}`)} name="time" value={slot.value} checked={checked} onChange={() => set("time", slot.value)} className="sr-only" />
                  <span className="text-sm font-semibold">{slot.label}</span>
                  <span className={`text-xs ${checked ? "text-paper/75" : "text-ink-soft"}`}>{slot.hint}</span>
                </label>
              );
            })}
          </div>
          {errors.time && <p id={`${id("time")}-error`} className="mt-2 text-sm text-error">{errors.time}</p>}
        </fieldset>

        <div className="md:col-span-2">
          <Field id={id("message")} label="Short message" optional error={errors.message} hint={`${values.message.length}/500. Anything you'd like us to know, e.g. if you feel anxious.`}>
            <textarea {...aria("message", true)} rows={3} maxLength={500} value={values.message} onChange={(e) => set("message", e.target.value)} className={`${inputCls} resize-none`} placeholder="Optional" />
          </Field>
        </div>

        {/* Honeypot: hidden from people and assistive tech, attractive to bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("company")}>Company</label>
          <input ref={honeypot} id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="md:col-span-2">
          <label htmlFor={id("consent")} className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-ink-soft">
            <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center">
              <input
                {...aria("consent")}
                type="checkbox"
                checked={values.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="peer h-5 w-5 appearance-none rounded-sm border border-ink/40 bg-transparent checked:border-forest checked:bg-forest aria-[invalid=true]:border-error"
              />
              <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute h-3.5 w-3.5 text-paper opacity-0 peer-checked:opacity-100"><path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
            </span>
            <span>
              I agree to {site.name} contacting me about this request and processing my details as described in the{" "}
              <Link href="/privacy" className="text-forest underline underline-offset-2">privacy notice</Link>.
            </span>
          </label>
          {errors.consent && <p id={`${id("consent")}-error`} className="ml-9 mt-2 text-sm text-error">{errors.consent}</p>}
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink-soft">
          {site.booking.whatsapp ? "Submitting opens WhatsApp with your request ready to send. " : "Submitting sends a request only. "}Your appointment is confirmed once our team contacts you. For urgent dental problems, please call{" "}
          {tel ? <a className="underline" href={tel}>{site.phone}</a> : <span className={isPlaceholder(site.phone) ? "placeholder-chip" : ""}>{site.phone}</span>}.
        </p>
        <Button type="submit" arrow={status.kind !== "submitting"} disabled={status.kind === "submitting"} aria-busy={status.kind === "submitting"} className="min-w-[14rem]">
          {status.kind === "submitting" ? (
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />
              Sending request…
            </span>
          ) : (
            site.booking.whatsapp ? "Request via WhatsApp" : "Request Appointment"
          )}
        </Button>
      </div>

      <div ref={resultRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {status.kind === "error" && (
          <div role="alert" className="mt-8 border-l-2 border-error bg-error/5 p-5 text-sm">
            <p className="font-semibold text-error">Your request was not sent.</p>
            <p className="mt-1 text-ink-soft">{status.message} Your details are still in the form, so you can try again{tel ? <>, or call us on <a className="underline" href={tel}>{site.phone}</a></> : ""}.</p>
          </div>
        )}
      </div>
    </form>
  );
}
