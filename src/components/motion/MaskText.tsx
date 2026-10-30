"use client";

import { motion } from "motion/react";
import { useReduce } from "./useReduce";
import { easeLux } from "./Reveal";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
};

/** Editorial line-by-line mask reveal. Text stays in the DOM as one readable heading. */
export function MaskText({ lines, className, lineClassName, delay = 0, stagger = 0.09, immediate = false, as = "h2", id }: Props) {
  const { tr } = useReduce();
  const Tag = as;
  const viewProps = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag id={id} className={className}>
      <motion.span className="block" initial={"hidden"} {...viewProps}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className={`block will-change-transform ${lineClassName ?? ""}`}
              variants={{
                hidden: { y: "105%", rotate: 1.5 },
                show: { y: "0%", rotate: 0, transition: tr({ duration: 1.15, ease: easeLux, delay: delay + i * stagger }) },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
