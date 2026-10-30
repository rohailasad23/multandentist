"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** A small, dismissible reminder that bracketed details are placeholders. Disable via site.showPreviewNotice. */
export function PreviewNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      setVisible(sessionStorage.getItem("preview-notice") !== "hidden");
    } catch {
      setVisible(true);
    }
  }, []);
  if (!site.showPreviewNotice || !visible) return null;
  const hide = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("preview-notice", "hidden");
    } catch {}
  };
  return (
    <div role="note" className="fixed bottom-4 left-4 right-4 z-30 flex items-start gap-3 rounded-2xl bg-forest-deep/95 p-4 text-[0.78rem] leading-relaxed text-paper/90 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur sm:right-auto sm:max-w-sm">
      <p>
        <strong className="font-semibold text-paper">Preview build.</strong> Details in <span className="placeholder-chip">[brackets]</span> are placeholders for the clinic to supply. Photography is temporary stock imagery.
      </p>
      <button type="button" onClick={hide} aria-label="Dismiss preview notice" className="-m-1 grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-paper/10">
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5"><path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
    </div>
  );
}
