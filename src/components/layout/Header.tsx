"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const overHero = pathname === "/" && !scrolled;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,padding,box-shadow] duration-700 ease-[var(--ease-lux)] ${
          overHero || menuOpen
            ? "bg-transparent py-6 text-paper"
            : scrolled
              ? "bg-ivory/88 py-3 text-ink shadow-[0_1px_0_rgba(37,39,34,0.08)] backdrop-blur-md"
              : "bg-ivory py-6 text-ink"
        }`}
      >
        <div className="container-lux flex items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2 text-[0.88rem] font-medium tracking-[0.01em]"
                  >
                    {item.label}
                    {isActive(item.href) ? (
                      <motion.span layoutId="nav-indicator" className="absolute -bottom-0.5 left-0 h-px w-full bg-current" />
                    ) : (
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-lux)] group-hover:origin-left group-hover:scale-x-100" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <ButtonLink href="/appointment" variant={overHero || menuOpen ? "light" : "primary"} className="!min-h-11 !px-6">
                Book Appointment
              </ButtonLink>
            </span>
            <button
              type="button"
              className="relative z-[60] grid h-12 w-12 place-items-center rounded-full border border-current/30 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              id="menu-toggle"
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-lux)] ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-lux)] ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} isActive={isActive} />
    </>
  );
}
