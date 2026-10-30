import type { Metadata } from "next";
import { AppointmentForm } from "@/components/booking/AppointmentForm";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Detail } from "@/components/ui/Detail";
import { site, telHref, mailHref, whatsappHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book an Appointment",
  description: `Request an appointment at ${site.name} in ${site.address.city}. Choose a treatment and preferred time, and our team will contact you to confirm.`,
  path: "/appointment",
});

const steps = [
  { t: "Send your request", b: "Tell us what you need and when suits you. It takes about two minutes." },
  { t: "We contact you", b: "Our team calls or emails to confirm a time and answer questions." },
  { t: "Your visit", b: "Arrive, settle in, and talk through everything with your dentist." },
];

export default async function AppointmentPage({ searchParams }: { searchParams: Promise<{ treatment?: string }> }) {
  const { treatment } = await searchParams;
  const wa = whatsappHref("Hello, I'd like to book an appointment.");
  return (
    <section className="container-lux pb-28 pt-36 md:pb-36 md:pt-48">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow mb-8 flex items-center gap-3 text-forest"><span aria-hidden="true" className="h-px w-8 bg-current" />Appointments</p>
            </Reveal>
            <MaskText as="h1" immediate lines={["Request an", "appointment."]} className="display-lg" delay={0.1} />
            <Reveal delay={0.3}>
              <p className="lede mt-8 max-w-md text-ink-soft">Choose a treatment and a time that suits you. We&apos;ll be in touch to confirm, usually within [one working day].</p>
              <ol className="mt-12 space-y-6 border-t border-ink/10 pt-8">
                {steps.map((s, i) => (
                  <li key={s.t} className="flex gap-5">
                    <span className="font-serif text-2xl italic text-sage-deep">{i + 1}.</span>
                    <span>
                      <span className="block font-semibold">{s.t}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{s.b}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-12 space-y-2 border-t border-ink/10 pt-8 text-sm">
                <p className="eyebrow mb-3 text-ink-soft">Prefer to talk?</p>
                <p>Call <Detail value={site.phone} href={telHref()} /></p>
                <p>Email <Detail value={site.email} href={mailHref()} /></p>
                {wa && <p><a className="link-underline" href={wa} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></p>}
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-7" delay={0.2}>
          <AppointmentForm defaultTreatment={treatment} />
        </Reveal>
      </div>
    </section>
  );
}
