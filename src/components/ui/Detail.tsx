import { isPlaceholder } from "@/content/site";
import type { ReactNode } from "react";

/**
 * Renders a clinic detail. When the value is still a placeholder it is shown
 * as a dashed chip and never as a link, so no button leads nowhere.
 */
export function Detail({ value, href, className = "", external }: { value: string; href?: string | null; className?: string; external?: boolean }) {
  if (isPlaceholder(value) || !href) {
    return <span className={`${isPlaceholder(value) ? "placeholder-chip" : ""} ${className}`}>{value}</span>;
  }
  return (
    <a href={href} className={`link-underline ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {value}
    </a>
  );
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 inline-flex items-start gap-2 rounded-md border border-dashed border-ink/25 bg-paper/60 px-3 py-2 text-xs leading-relaxed text-ink-soft">
      <span aria-hidden="true">✎</span>
      <span>{children}</span>
    </p>
  );
}
