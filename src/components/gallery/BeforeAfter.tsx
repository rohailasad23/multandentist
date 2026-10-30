"use client";

import Image from "next/image";
import { useId, useState } from "react";

type Props = {
  before: string | null;
  after: string | null;
  alt: string;
  className?: string;
  sizes?: string;
};

function Pane({ src, label, alt, tone, sizes }: { src: string | null; label: string; alt: string; tone: "before" | "after"; sizes: string }) {
  if (src) return <Image src={src} alt={`${alt}, ${label.toLowerCase()}`} fill sizes={sizes} className="object-cover" draggable={false} />;
  return (
    <div className={`absolute inset-0 flex items-center ${tone === "before" ? "justify-start bg-[#d9d0c2]" : "justify-end bg-[#ece6dc]"}`}>
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] [background-image:repeating-linear-gradient(135deg,transparent_0_14px,rgba(37,39,34,0.08)_14px_15px)]" />
      <p className="relative w-1/2 px-4 text-center text-[0.65rem] uppercase tracking-[0.2em] text-ink/60 sm:text-xs">
        {label} photograph
        <br />
        <span className="normal-case tracking-normal">[consented patient image]</span>
      </p>
    </div>
  );
}

/**
 * Accessible before/after comparison. A native range input drives the
 * divider, so it works with touch, mouse, and keyboard (arrow keys).
 */
export function BeforeAfter({ before, after, alt, className = "", sizes = "(min-width: 1024px) 50vw, 100vw" }: Props) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className={`relative select-none overflow-hidden bg-beige ${className}`}>
      <Pane src={after} label="After" alt={alt} tone="after" sizes={sizes} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Pane src={before} label="Before" alt={alt} tone="before" sizes={sizes} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-paper" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-[0_8px_30px_-8px_rgba(0,0,0,0.35)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M9 6 3 12l6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-paper">Before</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-paper">After</span>
      <label htmlFor={id} className="sr-only">Compare before and after: {alt}</label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% before image shown`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-0 [&:focus-visible+span]:block"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden ring-2 ring-inset ring-forest" />
    </div>
  );
}
