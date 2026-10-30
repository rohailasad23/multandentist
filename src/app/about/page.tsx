import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ButtonLink } from "@/components/ui/Button";
import { PlaceholderNote } from "@/components/ui/Detail";
import { BookingBand, Journey } from "@/components/sections/HomeSections";
import { principles } from "@/content/home";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the Clinic",
  description: `Discover the philosophy, people and environment behind ${site.name}, a calm and considered dental studio in ${site.address.city}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the clinic"
        title={["A quieter", "approach to", "dentistry."]}
        lede={`${site.name} was created to offer the kind of dental care we would want for our own families: unhurried, honest and beautifully looked after.`}
        photo="roomWithArt"
        breadcrumb={[{ href: "/", label: "Home" }, { href: "/about", label: "About" }]}
      />

      <section aria-labelledby="philosophy" className="container-lux py-24 md:py-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <SectionIntro id="philosophy" className="lg:col-span-5" eyebrow="Our philosophy" title={["Health first.", "Beauty follows."]} size="md" />
          <div className="space-y-8 text-[1.05rem] leading-relaxed text-ink-soft lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p>
                We believe the best dentistry is often the least dramatic. Healthy gums, a stable bite and well-cared-for teeth are the foundation for everything else, including the cosmetic work our patients sometimes choose.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                That is why every relationship begins with understanding. We ask about your history, your worries and what you would like to change, and we give you clear, honest options. Sometimes the right answer is to wait and monitor. We will always tell you when that is the case.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <PlaceholderNote>[Clinic to add its founding story, year established and any details about the team, once verified.]</PlaceholderNote>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="dentist-about" className="bg-paper">
        <div className="container-lux grid items-center gap-16 py-24 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ImageReveal photo="dentistAtDesk" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
            <p className="mt-3 text-[0.7rem] text-ink-soft">Placeholder image (stock). Replace with a photograph of the dentist.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionIntro id="dentist-about" eyebrow="Led by" title={[site.dentist.name]} size="md">
              <span className="placeholder-chip">{site.dentist.title}</span>
            </SectionIntro>
            <Reveal delay={0.15}>
              <h3 className="eyebrow mb-4 mt-12 text-ink-soft">Professional credentials</h3>
              <ul className="divide-y divide-ink/10 border-y border-ink/10 text-[0.95rem]">
                <li className="py-4">[Primary dental qualification, institution, year]</li>
                <li className="py-4">[Professional registration body and number]</li>
                <li className="py-4">[Postgraduate training or memberships, if applicable]</li>
              </ul>
              <PlaceholderNote>Credentials are left blank on purpose. Only add qualifications the dentist has verified.</PlaceholderNote>
              <div className="mt-10"><ButtonLink href="/dentist" variant="outline" arrow>Full profile</ButtonLink></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach" className="container-lux py-24 md:py-36">
        <SectionIntro id="approach" eyebrow="Clinical approach" title={["How we work."]} size="md" className="mb-16" />
        <ul className="grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08} className="bg-ivory p-8 md:p-10">
              <p className="font-serif text-2xl italic text-sage-deep">{["i", "ii", "iii", "iv"][i]}.</p>
              <h3 className="display-sm mt-10">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="environment" className="container-lux pb-24 md:pb-36">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-4">
            <SectionIntro id="environment" eyebrow="The environment" title={["Light, space,", "and quiet."]} size="md">
              Interiors chosen to feel more like a calm living room than a clinic, with every clinical standard quietly in place.
            </SectionIntro>
          </div>
          <ImageReveal photo="reception" className="aspect-[4/5] md:col-span-6 lg:col-span-4" sizes="(min-width:768px) 33vw, 100vw" />
          <ImageReveal photo="treatmentRoom" className="aspect-[4/5] md:col-span-6 md:mt-24 lg:col-span-4" sizes="(min-width:768px) 33vw, 100vw" delay={0.15} />
        </div>
        <p className="mt-6 text-[0.7rem] text-ink-soft">Temporary stock photography of dental environments. Replace with photographs of the clinic.</p>
      </section>

      <Journey />
      <BookingBand />
    </>
  );
}
