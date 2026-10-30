"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { easeLux } from "@/components/motion/Reveal";

type Props = {
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  label: string;
  caption: ReactNode;
  index: number;
  total: number;
  children: ReactNode;
};

export function Lightbox({ open, onClose, onPrev, onNext, label, caption, index, total, children }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && !(e.target instanceof HTMLInputElement)) onNext();
      else if (e.key === "ArrowLeft" && !(e.target instanceof HTMLInputElement)) onPrev();
      else if (e.key === "Tab" && dialogRef.current) {
        const els = [...dialogRef.current.querySelectorAll<HTMLElement>("button,input,a")];
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [open, onClose, onNext, onPrev]);

  const navBtn = "grid h-12 w-12 place-items-center rounded-full border border-paper/30 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 text-paper backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container-lux flex items-center justify-between py-5">
            <p className="text-xs tracking-[0.2em] text-paper/70" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} className={navBtn} aria-label="Close gallery">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4"><path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </div>
          <div className="container-lux flex min-h-0 flex-1 items-center gap-4">
            <button type="button" onClick={onPrev} className={`${navBtn} hidden shrink-0 md:grid`} aria-label="Previous image">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 rotate-180"><path d="M3 10h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                className="relative mx-auto flex h-full max-h-[78svh] w-full max-w-5xl flex-col"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: easeLux }}
              >
                <div className="relative min-h-0 flex-1">{children}</div>
                <figcaption className="pt-4 text-sm text-paper/75">{caption}</figcaption>
              </motion.figure>
            </AnimatePresence>
            <button type="button" onClick={onNext} className={`${navBtn} hidden shrink-0 md:grid`} aria-label="Next image">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4"><path d="M3 10h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </div>
          <div className="container-lux flex justify-center gap-3 py-5 md:hidden">
            <button type="button" onClick={onPrev} className={navBtn} aria-label="Previous image">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 rotate-180"><path d="M3 10h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
            <button type="button" onClick={onNext} className={navBtn} aria-label="Next image">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4"><path d="M3 10h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
