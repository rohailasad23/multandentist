"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal, easeLux } from "@/components/motion/Reveal";
import type { Treatment } from "@/content/treatments";

/** Editorial index of treatments: a hover/focus-driven image preview on desktop, inline thumbnails on mobile. */
export function FeaturedTreatments({ items }: { items: Treatment[] }) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <section aria-labelledby="treatments-title" className="border-t border-ink/10 bg-paper">
      <div className="container-lux py-28 md:py-40">
        <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-12">
          <SectionIntro id="treatments-title" className="lg:col-span-7" eyebrow="Treatments" title={["Care for every", "stage of your smile."]} />
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={0.1}>
            <p className="leading-relaxed text-ink-soft">From preventive check-ups to considered cosmetic work, each treatment begins with a conversation about what matters to you.</p>
            <div className="mt-8"><ButtonLink href="/treatments" variant="outline" arrow>All Treatments</ButtonLink></div>
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-7">
            {items.map((t, i) => (
              <Reveal as="li" key={t.slug} delay={i * 0.05} className="border-t border-ink/15 last:border-b">
                <Link
                  href={`/treatments/${t.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 md:gap-8 md:py-9"
                >
                  <span className="hidden w-14 text-xs tracking-[0.2em] text-ink-soft sm:block">0{i + 1}</span>
                  <span className="relative block h-16 w-16 overflow-hidden rounded-full sm:hidden">
                    <Photo photo={t.image} fill sizes="64px" className="object-cover" />
                  </span>
                  <span>
                    <span className={`block font-serif text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.02] transition-[transform,color] duration-700 ease-[var(--ease-lux)] group-hover:translate-x-2 ${active === i ? "lg:text-forest" : ""}`}>
                      {t.name}
                    </span>
                    <span className="mt-2 block max-w-md text-sm leading-relaxed text-ink-soft">{t.summary}</span>
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-paper">
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28 aspect-[3/4] overflow-hidden bg-beige">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={current.slug}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.9, ease: easeLux }}
                >
                  <Photo photo={current.image} fill sizes="33vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/70 to-transparent p-6 text-paper">
                <p className="eyebrow text-paper/80">{current.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
