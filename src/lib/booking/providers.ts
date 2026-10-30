import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import type { AppointmentInput } from "./schema";
import { treatmentOptions, timeSlots } from "./schema";

/**
 * Booking provider integration point.
 *
 * Choose a provider with the BOOKING_PROVIDER environment variable:
 *   - "demo"    (default) nothing is transmitted; the UI clearly says so.
 *   - "webhook" POSTs the request as JSON to BOOKING_WEBHOOK_URL
 *               (Zapier, Make, a CRM, or the clinic's practice-management system).
 *               If BOOKING_WEBHOOK_SECRET is set, an X-Signature HMAC-SHA256 header is added.
 *   - "resend"  emails the clinic via the Resend API (RESEND_API_KEY, BOOKING_EMAIL_TO, BOOKING_EMAIL_FROM).
 *
 * To connect a calendar or practice-management platform, implement
 * BookingProvider and add it to `providers` below.
 */
export type ProviderResult = { ok: true; reference: string } | { ok: false; error: string };

export interface BookingProvider {
  readonly mode: "demo" | "live";
  submit(request: AppointmentInput): Promise<ProviderResult>;
}

const reference = () => `REQ-${randomUUID().slice(0, 8).toUpperCase()}`;

const label = (req: AppointmentInput) => ({
  treatment: treatmentOptions.find((o) => o.value === req.treatment)?.label ?? req.treatment,
  time: timeSlots.find((t) => t.value === req.time)?.label ?? req.time,
});

const demo: BookingProvider = {
  mode: "demo",
  async submit() {
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, reference: reference() };
  },
};

const webhook: BookingProvider = {
  mode: "live",
  async submit(req) {
    const url = process.env.BOOKING_WEBHOOK_URL;
    if (!url) return { ok: false, error: "Booking webhook is not configured." };
    const ref = reference();
    const body = JSON.stringify({ type: "appointment_request", reference: ref, submittedAt: new Date().toISOString(), ...req, labels: label(req) });
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const secret = process.env.BOOKING_WEBHOOK_SECRET;
    if (secret) headers["X-Signature"] = createHmac("sha256", secret).update(body).digest("hex");
    const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(10000) });
    return res.ok ? { ok: true, reference: ref } : { ok: false, error: `Webhook responded with ${res.status}` };
  },
};

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const resend: BookingProvider = {
  mode: "live",
  async submit(req) {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.BOOKING_EMAIL_TO;
    const from = process.env.BOOKING_EMAIL_FROM;
    if (!key || !to || !from) return { ok: false, error: "Email provider is not configured." };
    const ref = reference();
    const l = label(req);
    const rows = [
      ["Reference", ref],
      ["Name", req.name],
      ["Phone", req.phone],
      ["Email", req.email],
      ["Treatment", l.treatment],
      ["Preferred date", req.date],
      ["Preferred time", l.time],
      ["Message", req.message || "—"],
    ];
    const html = `<h2>New appointment request</h2><table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join("")}</table><p>This is a request, not a confirmed booking. Please contact the patient to confirm.</p>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: req.email, subject: `Appointment request ${ref}`, html }),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok ? { ok: true, reference: ref } : { ok: false, error: `Email provider responded with ${res.status}` };
  },
};

const providers = { demo, webhook, resend } as const;

export function getProvider(): BookingProvider {
  const name = (process.env.BOOKING_PROVIDER ?? "demo") as keyof typeof providers;
  return providers[name] ?? demo;
}
