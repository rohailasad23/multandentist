import type { Metadata } from "next";
import { site, isPlaceholder } from "@/content/site";
import { photos } from "@/content/images";
import { treatments } from "@/content/treatments";

const ogImage = `${photos.heroChair.src}?w=1200&h=630&fit=crop&q=75&auto=format`;

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: photos.heroChair.alt }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [ogImage] },
  };
}

const real = (v: string) => (isPlaceholder(v) ? undefined : v);

/**
 * Dentist (LocalBusiness / MedicalBusiness) structured data. Placeholder
 * values are dropped so search engines never receive invented details.
 * No ratings or reviews are included: add them only from a genuine source.
 */
export function clinicJsonLd() {
  const a = site.address;
  const address = Object.fromEntries(
    Object.entries({
      "@type": "PostalAddress",
      streetAddress: real(a.street),
      addressLocality: real(a.city),
      addressRegion: real(a.region),
      postalCode: real(a.postalCode),
      addressCountry: real(a.country),
    }).filter(([, v]) => v),
  );
  const hours = site.hours
    .filter((h) => h.opens && !isPlaceholder(h.opens) && !isPlaceholder(h.closes))
    .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes }));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${site.url}/#clinic`,
    url: site.url,
    name: real(site.name),
    telephone: isPlaceholder(site.phoneE164) ? undefined : `+${site.phoneE164}`,
    email: real(site.email),
    image: photos.heroChair.src,
    address: Object.keys(address).length > 1 ? address : undefined,
    openingHoursSpecification: hours.length ? hours : undefined,
    availableService: treatments.map((t) => ({
      "@type": "MedicalProcedure",
      name: t.name,
      url: `${site.url}/treatments/${t.slug}`,
    })),
  };
  return JSON.stringify(Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)));
}

export function JsonLd({ json }: { json: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }} />;
}
