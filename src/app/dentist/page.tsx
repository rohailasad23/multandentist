import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderNote } from "@/components/ui/Detail";
import { BookingBand } from "@/components/sections/HomeSections";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: `Meet ${site.dentist.name}`,
  description: `Meet ${site.dentist.name}, ${site.dentist.title} at ${site.name}. Background, approach to care and areas of interest.`,
  path: "/dentist",
});

const profile = [
  { label: "Qualifications", items: ["[Dental degree, institution, year]", "[Further qualifications, if any]"] },
  { label: "Experience", items: ["[Years in practice, verified]", "[Previous roles or practices, if relevant]"] },
  { label: "Professional registration", items: ["[Registration body and number]"] },
  { label: "Memberships", items: ["[Professional associations, if provided]"] },
];

export default function DentistPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet the dentist"
        title={[site.dentist.name]}
        lede={<span className="placeholder-chip">{site.dentist.title}</span>}
        photo="dentistPortrait"
        breadcrumb={[{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/dentist", label: "Meet the Dentist" }]}
      >
        <p className="text-xs text-ink-soft">Portrait shown is a stock placeholder and does not depict the clinic&apos;s dentist.</p>
      </PageHero>

      <section aria-labelledby="bio" className="container-lux py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <SectionIntro id="bio" className="lg:col-span-4" eyebrow="Biography" title={["In brief."]} size="md" />
          <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink-soft lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p>[Professional biography, written with the dentist. Two or three short paragraphs covering their path into dentistry, the kind of work they enjoy most, and what patients say it is like to be treated by them.]</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>[Optional personal note: interests outside dentistry, languages spoken, or why they chose to practise in {site.address.city}.]</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="credentials" className="bg-paper">
        <div className="container-lux py-24 md:py-32">
          <SectionIntro id="credentials" eyebrow="Verified credentials" title={["Training and", "registration."]} size="md" className="mb-14" />
          <dl className="grid gap-px overflow-hidden bg-ink/10 md:grid-cols-2">
            {profile.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.06} className="bg-paper p-8 md:p-10">
                <dt className="eyebrow text-forest">{p.label}</dt>
                <dd>
                  <ul className="mt-6 space-y-3">
                    {p.items.map((it) => <li key={it} className="font-serif text-2xl leading-snug">{it}</li>)}
                  </ul>
                </dd>
              </Reveal>
            ))}
          </dl>
          <PlaceholderNote>Every credential above must be supplied and verified by the dentist. Nothing has been assumed.</PlaceholderNote>
        </div>
      </section>

      <section aria-labelledby="philosophy-d" className="container-lux py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIntro id="philosophy-d" eyebrow="Treatment philosophy" title={["Listen first.", "Then plan."]} size="md" />
            <Reveal delay={0.1}>
              <blockquote className="mt-12 border-l border-sage pl-8">
                <p className="display-sm italic">&ldquo;[The dentist&apos;s own words on how they approach care and decision-making with patients.]&rdquo;</p>
              </blockquote>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.15}>
            <h3 className="eyebrow mb-6 text-ink-soft">Areas of interest</h3>
            <p className="mb-6"><span className="placeholder-chip">{site.specialties}</span></p>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {treatments.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link href={`/treatments/${t.slug}`} className="group flex items-center justify-between py-4">
                    <span className="link-underline">{t.name}</span>
                    <span aria-hidden="true" className="text-ink-soft transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <PlaceholderNote>Clinic to confirm which treatments the dentist personally provides.</PlaceholderNote>
          </Reveal>
        </div>
      </section>

      <BookingBand />
    </>
  );
}
