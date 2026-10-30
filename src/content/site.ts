/**
 * Central clinic configuration.
 *
 * Every value wrapped in [square brackets] is a placeholder the clinic must
 * supply. Placeholders are rendered visibly on the site, and are automatically
 * excluded from structured data (JSON-LD) so search engines never receive
 * invented business details. See PLACEHOLDERS.md for the full checklist.
 */

export type OpeningHours = {
  /** Schema.org day names, e.g. "Monday" */
  days: string[];
  label: string;
  opens: string; // "09:00" or placeholder
  closes: string;
};

export const site = {
  name: "[Clinic Name]",
  shortName: "[Clinic]",
  tagline: "Considered dentistry, beautifully delivered.",
  dentist: {
    name: "[Dentist Name]",
    title: "[Professional title, e.g. Principal Dentist]",
    firstName: "[Dentist]",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example-clinic.com",
  phone: "[Phone Number]",
  /** International format, digits only, for tel: and WhatsApp links, e.g. "441234567890" */
  phoneE164: "[Phone digits]",
  whatsapp: "[WhatsApp digits]",
  email: "[Email Address]",
  address: {
    street: "[Street Address]",
    city: "[City]",
    region: "[Region]",
    postalCode: "[Postal Code]",
    country: "[Country]",
  },
  specialties: "[Clinic Specialties]",
  /** Optional Google Maps place query, falls back to the address */
  mapQuery: "",
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], label: "Monday – Friday", opens: "[09:00]", closes: "[18:00]" },
    { days: ["Saturday"], label: "Saturday", opens: "[09:00]", closes: "[13:00]" },
    { days: ["Sunday"], label: "Sunday", opens: "", closes: "" },
  ] satisfies OpeningHours[],
  social: {
    instagram: "",
    facebook: "",
    googleReviews: "",
  },
  /**
   * Where appointment requests are delivered. When `whatsapp` is set (digits
   * only, international format), submitting the form opens WhatsApp with the
   * request pre-written to this number; the patient taps Send. Leave empty to
   * use the server-side provider configured in BOOKING.md instead.
   */
  booking: {
    whatsapp: "923139785089",
  },
  /** Shows a slim notice that bracketed details are placeholders. Turn off at launch. */
  showPreviewNotice: true,
} as const;

export const isPlaceholder = (value: string | undefined | null): boolean =>
  !value || /^\[.*\]$/.test(value.trim()) || value.includes("[");

export const fullAddress = () => {
  const a = site.address;
  return [a.street, a.city, a.region, a.postalCode, a.country].join(", ");
};

export const telHref = () => (isPlaceholder(site.phoneE164) ? null : `tel:+${site.phoneE164}`);
export const mailHref = () => (isPlaceholder(site.email) ? null : `mailto:${site.email}`);
export const whatsappHref = (text?: string) =>
  isPlaceholder(site.whatsapp)
    ? null
    : `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const mapsHref = () => {
  const q = site.mapQuery || fullAddress();
  return isPlaceholder(site.address.street) && !site.mapQuery
    ? null
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/smile-gallery", label: "Smile Gallery" },
  { href: "/contact", label: "Contact" },
] as const;
