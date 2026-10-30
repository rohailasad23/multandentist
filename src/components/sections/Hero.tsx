"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useReduce } from "@/components/motion/useReduce";
import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { easeLux } from "@/components/motion/Reveal";
import { photos } from "@/content/images";
import { site } from "@/content/site";

type Phase = "pending" | "intro" | "reveal";

export function Hero() {
  const { reduce, tr } = useReduce();
  const [phase, setPhase] = useState<Phase>("pending");
  const [curtain, setCurtain] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  useEffect(() => {
    const skip = document.documentElement.dataset.intro === "skip";
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (skip) {
      setCurtain(false);
      setPhase("reveal");
      return;
    }
    setPhase("intro");
    const t1 = setTimeout(() => setCurtain(false), 1100);
    const t2 = setTimeout(() => setPhase("reveal"), 1250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const skipIntro = () => {
    setCurtain(false);
    setPhase("reveal");
  };

  const shown = phase === "reveal";
  const d = (n: number) => (reduce ? 0 : n);
  const lines = [
    { text: "Your smile,", className: "" },
    { text: "beautifully", className: "italic text-beige" },
    { text: "cared for.", className: "" },
  ];

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-forest-deep text-paper">
      {/* Image: clip-path opening from a centred frame, then settling scale */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(22% 28% 22% 28%)" }}
        animate={shown ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={tr({ duration: 1.5, ease: easeLux })}
      >
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.28 }}
            animate={shown ? { scale: 1.04 } : undefined}
            transition={tr({ duration: 2.6, ease: easeLux })}
          >
            <Photo photo="heroChair" fill priority sizes="100vw" className="object-cover object-[60%_50%]" />
          </motion.div>
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,34,28,0.55)_0%,rgba(26,34,28,0.05)_35%,rgba(26,34,28,0.25)_60%,rgba(26,34,28,0.85)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,rgba(38,52,43,0.7),transparent_60%)]" />
      </motion.div>

      <motion.div className="container-lux relative z-10 flex h-full flex-col justify-end pb-24 pt-32 md:pb-20" style={reduce ? undefined : { y: textY }}>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p
              className="eyebrow mb-8 flex items-center gap-3 text-paper/80"
              initial={{ opacity: 0, y: 12 }}
              animate={shown ? { opacity: 1, y: 0 } : undefined}
              transition={tr({ duration: 0.9, ease: easeLux, delay: d(0.5) })}
            >
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              Dental studio · {site.address.city}
            </motion.p>
            <h1 id="hero-title" className="display-xl">
              {lines.map((l, i) => (
                <span key={l.text} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block ${l.className}`}
                    initial={{ y: "110%" }}
                    animate={shown ? { y: "0%" } : undefined}
                    transition={tr({ duration: 1.25, ease: easeLux, delay: d(0.25 + i * 0.1) })}
                  >
                    {l.text}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
          <motion.div
            className="lg:col-span-4 lg:pb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={shown ? { opacity: 1, y: 0 } : undefined}
            transition={tr({ duration: 1.1, ease: easeLux, delay: d(0.85) })}
          >
            <p className="lede max-w-md text-paper/85">
              Thoughtful, unhurried dentistry in a calm, light-filled space. Care that begins with listening, and plans made around you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/appointment" variant="light" arrow>Book an Appointment</ButtonLink>
              <ButtonLink href="/treatments" variant="ghost">Explore Treatments</ButtonLink>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue and photo credit */}
      <motion.div
        className="absolute inset-x-0 bottom-6 z-10"
        initial={{ opacity: 0 }}
        animate={shown ? { opacity: 1 } : undefined}
        transition={tr({ duration: 1, delay: d(1.3) })}
      >
        <div className="container-lux flex items-end justify-between">
          <a href="#introduction" className="group hidden items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-paper/75 hover:text-paper md:flex">
            <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-paper/25">
              <span className="scroll-cue-line absolute inset-0 bg-paper" />
            </span>
            Scroll to discover
          </a>
          <p className="ml-auto text-[0.65rem] tracking-[0.04em] text-paper/55">
            Photograph: {photos.heroChair.credit} / Unsplash (stock, not our clinic)
          </p>
        </div>
      </motion.div>

      {/* Brand curtain: brief, skippable, never shown to reduced-motion or returning visitors */}
      <AnimatePresence>
        {curtain && !reduce && (
          <motion.div
            className="intro-curtain fixed inset-0 z-[70] grid place-items-center bg-forest-deep text-paper"
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={tr({ duration: 0.9, ease: easeLux })}
          >
            <div aria-hidden="true" className="flex flex-col items-center gap-5">
              <motion.span
                className="block overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={tr({ duration: 0.6 })}
              >
                <motion.span
                  className="block font-serif text-4xl md:text-5xl"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={tr({ duration: 0.9, ease: easeLux })}
                >
                  {site.name}
                </motion.span>
              </motion.span>
              <motion.span
                aria-hidden="true"
                className="block h-px w-40 origin-left bg-sage"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={tr({ duration: 1, ease: easeLux, delay: 0.1 })}
              />
            </div>
            <button
              type="button"
              onClick={skipIntro}
              className="absolute bottom-8 right-8 rounded-full border border-paper/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-paper/80 hover:border-paper hover:text-paper"
            >
              Skip intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
