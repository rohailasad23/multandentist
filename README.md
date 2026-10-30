# Luxury dental clinic website

A complete, multi-page website for a dental clinic: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4 and Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Requires Node 18.18+ (20+ recommended).

## Before launch

1. **Clinic details**: edit `src/content/site.ts`. Every `[bracketed]` value is a placeholder and is shown on the site with a dashed outline. Placeholders are automatically left out of search-engine structured data. See `PLACEHOLDERS.md` for the full checklist.
2. **Treatments**: edit `src/content/treatments.ts`. Set `offered: false` on anything the clinic does not provide; it disappears from navigation, the booking form and the sitemap.
3. **Photography**: replace the temporary Unsplash images in `src/content/images.ts` with the clinic's own photographs (see `IMAGE_CREDITS.md`).
4. **Smile gallery**: add genuine, consented patient cases to `cases` in `src/content/gallery.ts`.
5. **Bookings**: connect a backend (see `BOOKING.md`). Until then the form runs in clearly labelled demo mode.
6. Set `NEXT_PUBLIC_SITE_URL` to the real domain, and set `showPreviewNotice: false` in `site.ts`.

## Structure

```
src/app/                 Routes: /, /about, /dentist, /treatments, /treatments/[slug],
                         /smile-gallery, /appointment, /contact, /privacy, /credits,
                         api/appointments, sitemap.xml, robots.txt
src/content/             All editable copy and clinic data
src/components/motion/   Reveal, MaskText, ImageReveal, useReduce (reduced-motion aware)
src/components/sections/ Hero and page sections
src/components/booking/  Appointment form
src/components/gallery/  Before/after slider, lightbox, filterable gallery
src/lib/booking/         Validation schema (shared client/server) and providers
src/lib/seo.tsx          Page metadata and Dentist JSON-LD
```

## Notes

- **Motion**: the brand intro plays once per session, is skippable, and is skipped entirely for `prefers-reduced-motion`. No scroll hijacking: native scrolling throughout.
- **Images** use a custom loader so Unsplash's CDN serves resized, modern-format images. Local images in `/public` pass straight through; if you switch to self-hosted photos, you can remove the custom loader in `next.config.ts` to use Next's built-in optimiser.
- **Accessibility**: skip link, semantic landmarks, keyboard-operable menu (focus trap + Escape), accessible accordion, lightbox and before/after slider (native range input), labelled form fields with an error summary.

## Deploy to Netlify

`netlify.toml` is included. In Netlify choose **Add new site → Import an existing project → GitHub**, select this repository and deploy; no extra settings are needed. Afterwards set `NEXT_PUBLIC_SITE_URL` to the site's address under Site configuration → Environment variables and redeploy. Leave `BOOKING_PROVIDER` unset to keep the booking form in demo mode.
