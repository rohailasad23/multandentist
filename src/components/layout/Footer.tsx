import Link from "next/link";
import { nav, site, fullAddress, telHref, mailHref, whatsappHref, mapsHref } from "@/content/site";
import { treatments } from "@/content/treatments";
import { Detail } from "@/components/ui/Detail";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain bg-ink text-paper">
      <div className="container-lux relative z-[2] pt-24 md:pt-32">
        <div className="grid gap-16 border-b border-paper/15 pb-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6 text-sage">Begin here</p>
            <p className="display-lg max-w-[12ch]">A calmer kind of dental visit.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/appointment" variant="light" arrow>Request an Appointment</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">Contact the Clinic</ButtonLink>
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <h2 className="eyebrow mb-5 text-paper/60">Explore</h2>
              <ul className="space-y-3 text-[0.95rem]">
                {nav.map((n) => (
                  <li key={n.href}><Link className="link-underline" href={n.href}>{n.label}</Link></li>
                ))}
                <li><Link className="link-underline" href="/dentist">Meet the Dentist</Link></li>
                <li><Link className="link-underline" href="/appointment">Book Appointment</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-5 text-paper/60">Treatments</h2>
              <ul className="space-y-3 text-[0.95rem]">
                {treatments.slice(0, 7).map((t) => (
                  <li key={t.slug}><Link className="link-underline" href={`/treatments/${t.slug}`}>{t.name}</Link></li>
                ))}
                <li><Link className="link-underline text-sage" href="/treatments">All treatments</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-5 text-paper/60">Visit</h2>
              <address className="space-y-3 text-[0.95rem] not-italic">
                <p><Detail value={fullAddress()} href={mapsHref()} external /></p>
                <p><Detail value={site.phone} href={telHref()} /></p>
                <p><Detail value={site.email} href={mailHref()} /></p>
                {whatsappHref() && <p><a className="link-underline" href={whatsappHref()!} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>}
              </address>
              <ul className="mt-6 space-y-1.5 text-sm text-paper/70">
                {site.hours.map((h) => (
                  <li key={h.label}>{h.label}: {h.opens ? `${h.opens} – ${h.closes}` : "Closed"}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-8 py-10 md:flex-row md:items-center">
          <Logo />
          <p className="max-w-xl text-xs leading-relaxed text-paper/55">
            © {year} {site.name}. The information on this website is general and is not a substitute for a personal clinical assessment.
            Photography is temporary stock imagery and does not show our clinic, team or patients.
          </p>
          <ul className="flex gap-6 text-xs text-paper/70">
            <li><Link className="link-underline" href="/privacy">Privacy</Link></li>
            <li><Link className="link-underline" href="/credits">Image credits</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
