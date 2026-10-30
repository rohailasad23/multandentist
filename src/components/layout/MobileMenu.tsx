"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { nav, site, telHref, isPlaceholder } from "@/content/site";
import { easeLux } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

type Props = { open: boolean; onClose: () => void; isActive: (href: string) => boolean };

export function MobileMenu({ open, onClose, isActive }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const toggle = document.getElementById("menu-toggle");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      // Trap focus inside the menu, including the toggle button that closes it.
      const items = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>("a,button")].filter(Boolean) as HTMLElement[];
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open, onClose]);

  const tel = telHref();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-forest-deep text-paper lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: easeLux }}
        >
          <nav aria-label="Mobile" className="container-lux flex flex-1 flex-col justify-center pb-10 pt-28">
            <ul className="space-y-1">
              {[...nav, { href: "/dentist", label: "Meet the Dentist" }].map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, ease: easeLux, delay: 0.15 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline gap-4 py-2 font-serif text-[clamp(2.5rem,11vw,4rem)] leading-[1.05]"
                    >
                      <span className="w-6 font-sans text-xs tracking-[0.2em] text-sage">{String(i + 1).padStart(2, "0")}</span>
                      <span className={isActive(item.href) ? "italic" : ""}>{item.label}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: easeLux, delay: 0.5 }}
              className="mt-12 space-y-6 border-t border-paper/15 pt-8"
            >
              <ButtonLink href="/appointment" variant="light" arrow onClick={onClose} className="w-full sm:w-auto">
                Book an Appointment
              </ButtonLink>
              <p className="text-sm text-paper/70">
                Or call{" "}
                {tel ? (
                  <a href={tel} className="text-paper underline underline-offset-4">{site.phone}</a>
                ) : (
                  <span className={isPlaceholder(site.phone) ? "placeholder-chip text-paper" : ""}>{site.phone}</span>
                )}
              </p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
