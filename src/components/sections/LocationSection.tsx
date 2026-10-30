import { site, fullAddress, telHref, mailHref, whatsappHref, mapsHref, isPlaceholder } from "@/content/site";
import { Detail } from "@/components/ui/Detail";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";

export function MapEmbed({ className = "" }: { className?: string }) {
  const hasAddress = !isPlaceholder(site.address.street) || !!site.mapQuery;
  if (!hasAddress) {
    return (
      <div className={`relative grid place-items-center overflow-hidden bg-beige ${className}`}>
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-ink/10" preserveAspectRatio="none" viewBox="0 0 400 300">
          <path d="M0 80 Q120 60 200 120 T400 100M0 200 Q140 170 220 230 T400 210M90 0 Q110 150 70 300M280 0 Q250 140 310 300" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="relative text-center">
          <span aria-hidden="true" className="mx-auto mb-4 block h-4 w-4 rounded-full bg-forest ring-8 ring-forest/15" />
          <p className="text-sm text-ink-soft">Map will appear once the clinic address is added.</p>
        </div>
      </div>
    );
  }
  const q = encodeURIComponent(site.mapQuery || fullAddress());
  return (
    <iframe
      title={`Map showing the location of ${site.name}`}
      src={`https://www.google.com/maps?q=${q}&output=embed`}
      className={`border-0 grayscale-[0.6] ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

export function LocationSection() {
  const wa = whatsappHref("Hello, I have a question about an appointment.");
  return (
    <section aria-labelledby="visit-title" className="bg-paper">
      <div className="container-lux grid gap-14 py-28 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro id="visit-title" eyebrow="Visit us" title={["Find the", "studio."]} size="md" />
          <Reveal delay={0.1}>
            <dl className="mt-12 grid gap-8 text-[0.95rem] sm:grid-cols-2">
              <div>
                <dt className="eyebrow mb-3 text-ink-soft">Address</dt>
                <dd><address className="not-italic"><Detail value={fullAddress()} href={mapsHref()} external /></address></dd>
              </div>
              <div>
                <dt className="eyebrow mb-3 text-ink-soft">Contact</dt>
                <dd className="space-y-1.5">
                  <p><Detail value={site.phone} href={telHref()} /></p>
                  <p><Detail value={site.email} href={mailHref()} /></p>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="eyebrow mb-3 text-ink-soft">Opening hours</dt>
                <dd>
                  <ul className="divide-y divide-ink/10 border-y border-ink/10">
                    {site.hours.map((h) => (
                      <li key={h.label} className="flex justify-between py-3">
                        <span>{h.label}</span>
                        <span className="text-ink-soft">{h.opens ? `${h.opens} – ${h.closes}` : "Closed"}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/appointment" arrow>Book an Appointment</ButtonLink>
              {wa && <ButtonA href={wa} target="_blank" rel="noopener noreferrer" variant="outline">WhatsApp</ButtonA>}
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.15}>
          <MapEmbed className="aspect-[4/3] h-full w-full md:min-h-[360px]" />
        </Reveal>
      </div>
    </section>
  );
}
