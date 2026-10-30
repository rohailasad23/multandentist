import Link from "next/link";
import { site } from "@/content/site";

export function Logo({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={`group inline-flex items-center gap-3 ${className}`} aria-label={`${site.name}, home`}>
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 shrink-0">
        <circle cx="16" cy="16" r="15.25" fill="none" stroke="currentColor" strokeWidth="1" />
        <path
          d="M10.5 11.5c0-2 1.6-3 3.2-3 1 0 1.6.4 2.3.4s1.3-.4 2.3-.4c1.6 0 3.2 1 3.2 3 0 2.6-.9 4.2-1.4 6.6-.4 1.9-.7 4.4-1.8 4.4-1.3 0-1-4-2.3-4s-1 4-2.3 4c-1.1 0-1.4-2.5-1.8-4.4-.5-2.4-1.4-4-1.4-6.6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
          className="origin-center transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.06]"
        />
      </svg>
      <span className="whitespace-nowrap font-serif text-[1.45rem] leading-none tracking-[-0.01em]">{site.name}</span>
    </Link>
  );
}
