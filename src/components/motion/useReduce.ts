"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Reduced-motion preference that is stable through hydration: the server and
 * the first client render both assume motion, so markup matches. After mount,
 * `instant` collapses scroll-reveal transitions to zero duration.
 */
export function useReduce() {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefers;
  return {
    reduce,
    tr: <T extends object>(t: T) => (reduce ? { duration: 0 } : t),
  };
}
