# Appointment booking

The form at `/appointment` posts to `POST /api/appointments`, which:

1. Rejects non-JSON requests and rate-limits each visitor (5 requests / 10 minutes, IP hashed, in memory).
2. Silently drops spam: a hidden honeypot field and a minimum fill time.
3. Validates every field with the same Zod schema the browser uses (`src/lib/booking/schema.ts`).
4. Passes the request to the configured provider (`src/lib/booking/providers.ts`).

Patient details are never put in URLs, never logged, and never stored by the website itself. The site always describes a submission as a **request**, never as a confirmed booking.

## Providers

Set `BOOKING_PROVIDER` in your environment (see `.env.example`):

| Value | What happens |
|---|---|
| `demo` (default) | Nothing is sent. The success screen shows a red "Demo mode" notice. |
| `webhook` | JSON is POSTed to `BOOKING_WEBHOOK_URL` (Zapier, Make, n8n, a CRM). If `BOOKING_WEBHOOK_SECRET` is set, an `X-Signature` HMAC-SHA256 header of the body is added so the receiver can verify it. |
| `resend` | An email is sent to the clinic via [Resend](https://resend.com) using `RESEND_API_KEY`, `BOOKING_EMAIL_TO`, `BOOKING_EMAIL_FROM`. |

## Connecting a calendar or practice-management system

Implement the `BookingProvider` interface in `providers.ts` (one `submit()` method) and register it in the `providers` map. If the clinic already uses an online booking platform that provides its own widget, you can instead embed it on `/appointment` and keep the current form as a fallback.

## Production hardening

- The in-memory rate limit is per server instance. On serverless or multi-instance hosting, swap it for a shared store (for example Upstash Redis).
- For stronger bot protection add Cloudflare Turnstile or hCaptcha: render the widget in `AppointmentForm.tsx` and verify the token in `route.ts` before calling the provider.
- Confirm that the chosen provider meets the clinic's data-protection obligations (e.g. GDPR / HIPAA where applicable), and complete the privacy notice at `/privacy`.
