import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { MapEmbed } from "@/components/sections/LocationSection";
import { Reveal } from "@/components/motion/Reveal";
import { Detail, PlaceholderNote } from "@/components/ui/Detail";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import { site, fullAddress, telHref, mailHref, whatsappHref, mapsHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact the Clinic",
  description: `Contact ${site.name} in ${site.address.city}: phone, email, WhatsApp, opening hours and directions.`,
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappHref("Hello, I have a question for the clinic.");
  const tel = telHref();
  const blocks = [
    { label: "Telephone", value: site.phone, href: tel, note: "Best for urgent problems and quick questions." },
    { label: "Email", value: site.email, href: mailHref(), note: "We aim to reply within [one working day]." },
    { label: "WhatsApp", value: wa ? "Send a message" : "[WhatsApp number]", href: wa, note: "Please don't share medical details over messaging.", external: true },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["We would love", "to hear from you."]}
        lede="Whether you have a question about a treatment or would like to arrange a visit, our team is here to help."
        breadcrumb={[{ href: "/", label: "Home" }, { href: "/contact", label: "Contact" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/appointment" arrow>Request an Appointment</ButtonLink>
          {tel && <ButtonA href={tel} variant="outline">Call the Clinic</ButtonA>}
        </div>
      </PageHero>

      <section aria-label="Contact details" className="container-lux pb-20">
        <ul className="grid gap-px overflow-hidden bg-ink/10 md:grid-cols-3">
          {blocks.map((b, i) => (
            <Reveal as="li" key={b.label} delay={i * 0.08} className="bg-ivory p-8 md:p-10">
              <p className="eyebrow text-forest">{b.label}</p>
              <p className="display-sm mt-6 break-words"><Detail value={b.value} href={b.href} external={b.external} /></p>
              <p className="mt-4 text-sm text-ink-soft">{b.note}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="visit-h" className="bg-paper">
        <div className="container-lux grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="visit-h" className="display-md">Visiting the studio</h2>
            <address className="mt-10 not-italic leading-relaxed">
              <Detail value={fullAddress()} href={mapsHref()} external />
            </address>
            {mapsHref() && (
              <a href={mapsHref()!} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-forest"><span className="link-underline">Get directions</span> ↗</a>
            )}
            <h3 className="eyebrow mb-4 mt-12 text-ink-soft">Opening hours</h3>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {site.hours.map((h) => (
                <li key={h.label} className="flex justify-between py-3 text-[0.95rem]">
                  <span>{h.label}</span>
                  <span className="text-ink-soft">{h.opens ? `${h.opens} – ${h.closes}` : "Closed"}</span>
                </li>
              ))}
            </ul>
            <h3 className="eyebrow mb-4 mt-12 text-ink-soft">Getting here</h3>
            <p className="text-sm leading-relaxed text-ink-soft">[Parking, public transport and accessibility information, e.g. step-free access.]</p>
            <PlaceholderNote>Clinic to supply address, hours, and access details.</PlaceholderNote>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <MapEmbed className="aspect-[4/3] w-full md:min-h-[380px]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
