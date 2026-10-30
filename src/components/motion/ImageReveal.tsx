"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useReduce } from "./useReduce";
import { useRef } from "react";
import { easeLux } from "./Reveal";
import { Photo } from "@/components/ui/Photo";
import type { PhotoKey } from "@/content/images";

type Props = {
  photo: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Subtle scroll parallax on the inner image */
  parallax?: boolean;
  direction?: "up" | "left" | "right";
  delay?: number;
};

const hiddenClip = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/** Clip-path mask reveal with a gentle settle-in scale, plus optional parallax. */
export function ImageReveal({ photo, className = "", sizes = "100vw", priority, parallax = true, direction = "up", delay = 0 }: Props) {
  const { reduce, tr } = useReduce();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-beige ${className}`}
      initial={{ clipPath: hiddenClip[direction] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={tr({ duration: 1.4, ease: easeLux, delay })}
    >
      <motion.div
        className="absolute inset-[-7%]"
        style={parallax && !reduce ? { y } : undefined}
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={tr({ duration: 1.8, ease: easeLux, delay })}
      >
        <Photo photo={photo} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
