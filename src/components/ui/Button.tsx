import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "ghost";

const base =
  "group relative inline-flex whitespace-nowrap min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3 text-[0.9rem] font-semibold tracking-[0.01em] transition-[color,background-color,border-color,transform] duration-500 ease-[var(--ease-lux)] active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-paper hover:text-ink",
  outline: "border border-ink/25 text-ink hover:border-ink hover:text-paper",
  light: "bg-paper text-ink hover:text-paper",
  ghost: "border border-paper/40 text-paper hover:border-paper hover:text-ink",
};

const fill: Record<Variant, string> = {
  primary: "bg-sage",
  outline: "bg-ink",
  light: "bg-forest",
  ghost: "bg-paper",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 transition-transform duration-500 ease-[var(--ease-lux)] group-hover:translate-x-1 ${className}`}>
      <path d="M3 10h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Inner({ children, variant, arrow }: { children: ReactNode; variant: Variant; arrow?: boolean }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-500 ease-[var(--ease-lux)] group-hover:translate-y-0 ${fill[variant]}`}
      />
      <span className="relative">{children}</span>
      {arrow && <Arrow className="relative" />}
    </>
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & { variant?: Variant; arrow?: boolean; className?: string };

export function ButtonLink({ variant = "primary", arrow, className = "", children, ...rest }: LinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner variant={variant} arrow={arrow}>{children}</Inner>
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { variant?: Variant; arrow?: boolean };

export function Button({ variant = "primary", arrow, className = "", children, ...rest }: BtnProps) {
  return (
    <button className={`${base} ${variants[variant]} disabled:pointer-events-none disabled:opacity-60 ${className}`} {...rest}>
      <Inner variant={variant} arrow={arrow}>{children}</Inner>
    </button>
  );
}

type AProps = ComponentProps<"a"> & { variant?: Variant; arrow?: boolean };

export function ButtonA({ variant = "primary", arrow, className = "", children, ...rest }: AProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner variant={variant} arrow={arrow}>{children}</Inner>
    </a>
  );
}
