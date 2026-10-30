import { Accordion } from "@/components/ui/Accordion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function FaqSection({ items, title = ["Questions,", "answered."], eyebrow = "FAQ" }: { items: { q: string; a: string }[]; title?: string[]; eyebrow?: string }) {
  return (
    <section aria-labelledby="faq-title" className="container-lux py-28 md:py-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionIntro id="faq-title" eyebrow={eyebrow} title={title} size="md">
            Can&apos;t find what you are looking for? <Link href="/contact" className="link-underline text-forest">Contact the clinic</Link>.
          </SectionIntro>
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
