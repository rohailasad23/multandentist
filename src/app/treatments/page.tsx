import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Button";
import { BookingBand } from "@/components/sections/HomeSections";
import { treatments, type TreatmentCategory } from "@/content/treatments";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dental Treatments",
  description: `Preventive, cosmetic, restorative and orthodontic dental treatments at ${site.name} in ${site.address.city}, each planned around you.`,
  path: "/treatments",
});

const order: TreatmentCategory[] = ["Preventive", "Cosmetic", "Restorative", "Orthodontic", "Urgent care"];

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title={["Every smile,", "thoughtfully", "treated."]}
        lede="Explore the care we offer. Each treatment page explains what is involved, who it may suit and what to expect, so you can arrive informed."
        breadcrumb={[{ href: "/", label: "Home" }, { href: "/treatments", label: "Treatments" }]}
      >
        <nav aria-label="Treatment categories">
          <ul className="flex flex-wrap gap-2">
            {order.filter((c) => treatments.some((t) => t.category === c)).map((c) => (
              <li key={c}>
                <a href={`#${c.toLowerCase().replace(/\s/g, "-")}`} className="inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 text-sm transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-paper">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {order.map((cat) => {
        const items = treatments.filter((t) => t.category === cat);
        if (!items.length) return null;
        const id = cat.toLowerCase().replace(/\s/g, "-");
        return (
          <section key={cat} id={id} aria-labelledby={`${id}-h`} className="container-lux scroll-mt-28 border-t border-ink/10 py-20 md:py-28">
            <div className="mb-12 flex items-baseline justify-between gap-6">
              <h2 id={`${id}-h`} className="display-md">{cat}</h2>
              <p className="text-xs tracking-[0.2em] text-ink-soft">{String(items.length).padStart(2, "0")} {items.length === 1 ? "TREATMENT" : "TREATMENTS"}</p>
            </div>
            <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {items.map((t, i) => (
                <Reveal as="li" key={t.slug} delay={i * 0.08}>
                  <Link href={`/treatments/${t.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-beige">
                      <Photo photo={t.image} fill sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-[1.06]" />
                      <span aria-hidden="true" className="absolute inset-0 bg-forest/0 transition-colors duration-700 group-hover:bg-forest/15" />
                    </div>
                    <div className="mt-6 flex items-start justify-between gap-6">
                      <div>
                        <h3 className="display-sm">{t.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.summary}</p>
                      </div>
                      <span aria-hidden="true" className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-paper">
                        <Arrow />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>
        );
      })}
      <BookingBand />
    </>
  );
}
