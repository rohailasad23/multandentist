import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { FaqSection } from "@/components/sections/FaqSection";
import { BookingBand } from "@/components/sections/HomeSections";
import { getTreatment, treatments } from "@/content/treatments";
import { site } from "@/content/site";
import { pageMetadata, JsonLd } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = getTreatment((await params).slug);
  if (!t) return {};
  return pageMetadata({
    title: `${t.name} in ${site.address.city}`,
    description: `${t.summary} Learn what ${t.name.toLowerCase()} involves, who it may suit and what to expect at ${site.name}.`,
    path: `/treatments/${t.slug}`,
  });
}

export default async function TreatmentPage({ params }: Params) {
  const t = getTreatment((await params).slug);
  if (!t) notFound();

  const idx = treatments.findIndex((x) => x.slug === t.slug);
  const next = treatments[(idx + 1) % treatments.length];
  const related = treatments.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, 3);

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: t.name,
    url: `${site.url}/treatments/${t.slug}`,
    about: { "@type": "MedicalProcedure", name: t.name, description: t.summary },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: t.faqs.filter((f) => !f.a.includes("[")).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  });

  return (
    <>
      <JsonLd json={jsonLd} />
      <PageHero
        eyebrow={t.category}
        title={t.name.split(" ").length > 2 ? [t.name.split(" ").slice(0, -1).join(" "), t.name.split(" ").slice(-1)[0]] : [t.name]}
        lede={t.intro}
        photo={t.image}
        breadcrumb={[{ href: "/", label: "Home" }, { href: "/treatments", label: "Treatments" }, { href: `/treatments/${t.slug}`, label: t.name }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/appointment?treatment=${t.slug}`} arrow>Book a Consultation</ButtonLink>
          <ButtonLink href="/contact" variant="outline">Ask a Question</ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="involves" className="border-t border-ink/10 bg-paper">
        <div className="container-lux grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIntro id="involves" eyebrow="What it involves" title={["The treatment."]} size="md" />
            <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
              {t.involves.map((x, i) => (
                <Reveal as="li" key={x} delay={i * 0.05} className="flex gap-6 py-5">
                  <span className="pt-1 text-xs tracking-[0.2em] text-ink-soft">0{i + 1}</span>
                  <span className="leading-relaxed">{x}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionIntro id="suitable" eyebrow="Who it may help" title={["Is it for you?"]} size="md" />
            <ul className="mt-12 space-y-4">
              {t.suitableFor.map((x, i) => (
                <Reveal as="li" key={x} delay={i * 0.05} className="flex gap-4 leading-relaxed">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-deep" />
                  {x}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}>
              <div className="mt-12 border-l border-sage pl-6">
                <h3 className="eyebrow mb-3 text-forest">What to expect</h3>
                <p className="leading-relaxed text-ink-soft">{t.expect}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="process" className="grain bg-forest text-paper">
        <div className="container-lux relative z-[2] py-24 md:py-32">
          <SectionIntro id="process" eyebrow="The process" title={["Step by step."]} size="md" tone="light" />
          <ol className={`mt-16 grid gap-px overflow-hidden bg-paper/15 sm:grid-cols-2 ${t.process.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {t.process.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="bg-forest p-8 md:p-10">
                <p className="font-serif text-5xl text-sage">{i + 1}</p>
                <h3 className="display-sm mt-10">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-paper/75">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          {t.recovery && (
            <Reveal delay={0.2}>
              <div className="mt-16 grid gap-6 border-t border-paper/15 pt-10 md:grid-cols-12">
                <h3 className="eyebrow text-sage md:col-span-3">Recovery &amp; aftercare</h3>
                <p className="leading-relaxed text-paper/85 md:col-span-8">{t.recovery}</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <FaqSection items={t.faqs} eyebrow={`${t.name} FAQ`} title={["Common", "questions."]} />

      <section aria-label="More treatments" className="container-lux border-t border-ink/10 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          {related.length > 0 && (
            <div>
              <h2 className="eyebrow mb-6 text-ink-soft">Related treatments</h2>
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/treatments/${r.slug}`} className="group flex items-center justify-between py-5">
                      <span className="display-sm !text-2xl">{r.name}</span>
                      <Arrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link href={`/treatments/${next.slug}`} className="group block md:col-start-2 md:text-right">
            <span className="eyebrow text-ink-soft">Next treatment</span>
            <span className="display-md mt-4 flex items-center gap-4 md:justify-end">
              <span className="link-underline">{next.name}</span>
              <Arrow className="!h-6 !w-6" />
            </span>
          </Link>
        </div>
        <p className="mt-16 max-w-2xl text-xs leading-relaxed text-ink-soft">
          This page provides general information and is not a substitute for a clinical assessment. Suitability, risks and outcomes vary between individuals and will be discussed with you personally.
        </p>
      </section>

      <BookingBand />
    </>
  );
}
