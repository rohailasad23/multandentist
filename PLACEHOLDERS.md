# Information the clinic needs to supply

Nothing below has been invented. Each item appears on the site in `[brackets]` with a dashed outline until replaced.

## `src/content/site.ts`
- Clinic name and short name
- Dentist name, professional title, first name
- City, region, postal code, country, street address (also enables the map and directions link)
- Phone number (display format) and digits-only international format (enables tap-to-call)
- WhatsApp number, digits only (enables WhatsApp buttons; they are hidden until set)
- Email address
- Clinic specialties
- Opening hours
- Social / Google reviews links (optional)
- Then set `showPreviewNotice: false`

## Content
- Dentist: biography, quote, verified qualifications, experience, registration number, memberships (`src/app/dentist/page.tsx`, `src/components/sections/HomeSections.tsx`, `src/app/about/page.tsx`)
- About page: founding story and team details
- Treatments: confirm which are offered (`offered` flag), whitening method, sedation availability, emergency availability, fee guide / financing (`src/content/treatments.ts`)
- FAQs: new-patient status, insurance and payment options (`src/content/home.ts`)
- Appointment page: typical response time ("[one working day]")
- Contact page: parking, transport and accessibility information
- Testimonials: genuine reviews only, with consent (`Testimonials` in `HomeSections.tsx`)
- Smile gallery: consented before/after photographs (`src/content/gallery.ts`)
- Privacy notice: retention period and legal basis, reviewed by the clinic (`src/app/privacy/page.tsx`)

## Photography
- Dentist portrait and team photos
- Clinic interior and exterior photographs
