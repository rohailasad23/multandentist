"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { BeforeAfter } from "./BeforeAfter";
import { Lightbox } from "./Lightbox";
import { Photo } from "@/components/ui/Photo";
import { easeLux } from "@/components/motion/Reveal";
import { atmosphere, cases, galleryCategories, placeholderCases, type SmileCase } from "@/content/gallery";
import { photos, type PhotoKey } from "@/content/images";

type Item =
  | { kind: "case"; id: string; category: string; data: SmileCase }
  | { kind: "space"; id: string; category: "Clinic"; photo: PhotoKey; caption: string };

const filters = ["All", ...galleryCategories, "Clinic"] as const;
type Filter = (typeof filters)[number];

export function SmileGallery() {
  const usingPlaceholders = cases.length === 0;
  const items: Item[] = useMemo(
    () => [
      ...(usingPlaceholders ? placeholderCases : cases).map((c) => ({ kind: "case" as const, id: c.id, category: c.category, data: c })),
      ...atmosphere.map((a) => ({ kind: "space" as const, id: a.key, category: "Clinic" as const, photo: a.key, caption: a.caption })),
    ],
    [usingPlaceholders],
  );

  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => setOpenIndex((i) => (i === null ? i : (i - 1 + visible.length) % visible.length)), [visible.length]);
  const next = useCallback(() => setOpenIndex((i) => (i === null ? i : (i + 1) % visible.length)), [visible.length]);
  const current = openIndex !== null ? visible[openIndex] : null;

  return (
    <div>
      <div role="group" aria-label="Filter gallery" className="mb-12 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`relative inline-flex min-h-11 items-center rounded-full border px-5 text-sm transition-colors duration-300 ${
              filter === f ? "border-forest text-paper" : "border-ink/20 hover:border-ink"
            }`}
          >
            {filter === f && <motion.span layoutId="gallery-filter" className="absolute inset-0 rounded-full bg-forest" transition={{ duration: 0.5, ease: easeLux }} />}
            <span className="relative">{f === "Clinic" ? "Clinic spaces" : f}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">{visible.length} items shown</p>

      <motion.ul layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.li
              layout
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: easeLux }}
              className={i % 5 === 0 ? "sm:row-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block h-full min-h-[280px] w-full overflow-hidden bg-beige text-left"
                aria-label={item.kind === "case" ? `Open ${item.data.title}` : `Open image: ${item.caption}`}
              >
                {item.kind === "space" ? (
                  <Photo photo={item.photo} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-[1.05]" />
                ) : item.data.after ? (
                  // Genuine case thumbnail (after image)
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.data.after} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-[1.05]" loading="lazy" />
                ) : (
                  <span className="absolute inset-0 grid grid-cols-2">
                    <span className="bg-[#d9d0c2]" />
                    <span className="bg-[#ece6dc]" />
                    <span aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(135deg,transparent_0_14px,rgba(37,39,34,0.08)_14px_15px)]" />
                    <span className="absolute inset-y-0 left-1/2 w-px bg-paper" />
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent p-6 pt-20 text-paper">
                  <span className="eyebrow block text-paper/75">{item.kind === "case" ? item.category : "Clinic spaces"}</span>
                  <span className="mt-2 block font-serif text-2xl">{item.kind === "case" ? item.data.title : item.caption}</span>
                  {item.kind === "case" && item.data.note && <span className="mt-1 block text-xs text-paper/70">{item.data.note}</span>}
                </span>
                <span aria-hidden="true" className="absolute right-5 top-5 grid h-10 w-10 scale-90 place-items-center rounded-full bg-paper/90 text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <svg viewBox="0 0 16 16" className="h-4 w-4"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" /></svg>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox
        open={current !== null}
        onClose={close}
        onPrev={prev}
        onNext={next}
        index={openIndex ?? 0}
        total={visible.length}
        label="Smile gallery viewer"
        caption={
          current?.kind === "case" ? (
            <>
              <strong className="font-semibold text-paper">{current.data.title}</strong> · {current.data.treatment}
              {current.data.note && <> · {current.data.note}</>}
            </>
          ) : current ? (
            <>
              {current.caption} · {photos[current.photo].alt}. Stock photograph by {photos[current.photo].credit} / Unsplash, not our clinic.
            </>
          ) : null
        }
      >
        {current?.kind === "case" ? (
          <BeforeAfter before={current.data.before} after={current.data.after} alt={current.data.title} className="absolute inset-0" sizes="90vw" />
        ) : current ? (
          <Photo photo={current.photo} fill sizes="90vw" className="object-contain" />
        ) : null}
      </Lightbox>
    </div>
  );
}
