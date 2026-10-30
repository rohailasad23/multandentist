"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { easeLux } from "@/components/motion/Reveal";

type Item = { q: string; a: string };

export function Accordion({ items, tone = "dark" }: { items: Item[]; tone?: "dark" | "light" }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  const border = tone === "light" ? "border-paper/20" : "border-ink/15";
  const muted = tone === "light" ? "text-paper/75" : "text-ink-soft";

  return (
    <div className={`border-t ${border}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${id}-b-${i}`;
        const panelId = `${id}-p-${i}`;
        return (
          <div key={item.q} className={`border-b ${border}`}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              >
                <span className="display-sm !text-[clamp(1.25rem,2vw,1.75rem)] transition-transform duration-500 ease-[var(--ease-lux)] group-hover:translate-x-1">
                  {item.q}
                </span>
                <span aria-hidden="true" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current/30 transition-colors duration-300 group-hover:border-current">
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className={`absolute h-3.5 w-px bg-current transition-transform duration-500 ease-[var(--ease-lux)] ${isOpen ? "scale-y-0" : ""}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeLux }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-2xl pb-8 pr-14 leading-relaxed ${muted}`}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
