import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string[];
  children?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  size?: "lg" | "md";
  id?: string;
};

export function SectionIntro({ eyebrow, title, children, className = "", tone = "dark", size = "lg", id }: Props) {
  const muted = tone === "light" ? "text-paper/70" : "text-ink-soft";
  return (
    <div className={className}>
      <Reveal>
        <p className={`eyebrow mb-6 flex items-center gap-3 ${tone === "light" ? "text-sage" : "text-forest"}`}>
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      </Reveal>
      <MaskText id={id} lines={title} className={size === "lg" ? "display-lg" : "display-md"} />
      {children && (
        <Reveal delay={0.15}>
          <div className={`lede mt-8 max-w-xl ${muted}`}>{children}</div>
        </Reveal>
      )}
    </div>
  );
}
