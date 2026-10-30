import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import type { PhotoKey } from "@/content/images";
import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string[];
  lede?: ReactNode;
  photo?: PhotoKey;
  breadcrumb?: { href: string; label: string }[];
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lede, photo, breadcrumb, children }: Props) {
  return (
    <section className="container-lux pb-16 pt-36 md:pb-24 md:pt-48">
      {breadcrumb && (
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
            {breadcrumb.map((b, i) => (
              <li key={b.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === breadcrumb.length - 1 ? (
                  <span aria-current="page">{b.label}</span>
                ) : (
                  <Link className="link-underline hover:text-ink" href={b.href}>{b.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className={photo ? "lg:col-span-7" : "lg:col-span-10"}>
          <Reveal>
            <p className="eyebrow mb-8 flex items-center gap-3 text-forest"><span aria-hidden="true" className="h-px w-8 bg-current" />{eyebrow}</p>
          </Reveal>
          <MaskText as="h1" immediate lines={title} className="display-xl !text-[clamp(3rem,8vw,7.5rem)]" delay={0.1} />
          {lede && (
            <Reveal delay={0.35}>
              <div className="lede mt-10 max-w-xl text-ink-soft">{lede}</div>
            </Reveal>
          )}
          {children && <Reveal delay={0.45}><div className="mt-10">{children}</div></Reveal>}
        </div>
        {photo && (
          <div className="lg:col-span-5">
            <ImageReveal photo={photo} priority className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}
