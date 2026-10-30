"use client";

import { motion } from "motion/react";
import { useReduce } from "./useReduce";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "p";
};

export const easeLux = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: Props) {
  const { tr } = useReduce();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={tr({ duration: 1, ease: easeLux, delay })}
    >
      {children}
    </Comp>
  );
}
