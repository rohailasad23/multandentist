import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { PlaceholderNote } from "@/components/ui/Detail";
import { Photo } from "@/components/ui/Photo";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { site } from "@/content/site";
import { journey, principles } from "@/content/home";
import { photos } from "@/content/images";

export function Introduction() {
  return (
    <section id="introduction" aria-labelledby="intro-title" className="container-lux scroll-mt-24 py-28 md:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-8 flex items-center gap-3 text-forest"><span aria-hidden="true" className="h-px w-8 bg-current" />The clinic</p>
          </Reveal>
          <MaskText
            as="h2"
            id="intro-title"
            lines={["Dentistry that feels", "less like a procedure,", "more like being cared for."]}
            className="display-lg"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-ink-soft">
                {site.name} is a dental studio in {site.address.city} built around a simple idea: that excellent clinical care and a genuinely calm experience belong together.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="leading-relaxed text-ink-soft">
                We take the time to understand you, explain every option clearly, and plan treatment at a pace that feels right. Specialties: <span className="placeholder-chip">{site.specialties}</span>
              </p>
              <Link href="/about" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                <span className="link-underline">Our philosophy</span> <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="relative lg:col-span-5">
          <ImageReveal photo="reception" className="aspect-[4/5] w-full rounded-[2px]" sizes="(min-width:1024px) 40vw, 100vw" />
          <div className="absolute -bottom-16 -left-6 hidden w-[46%] border-[10px] border-ivory md:block lg:-left-24">
            <ImageReveal photo="waiting" className="aspect-[3/4] w-full" sizes="20vw" delay={0.25} direction="left" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DentistIntro() {
  return (
    <section aria-labelledby="dentist-title" className="grain overflow-hidden bg-forest text-paper">
      <div className="container-lux relative z-[2] grid items-center gap-16 py-28 md:py-36 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <ImageReveal photo="dentistPortrait" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
          <p className="mt-3 text-[0.7rem] tracking-[0.04em] text-paper/60">Placeholder portrait (stock). Replace with the dentist&apos;s own photograph.</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionIntro id="dentist-title" eyebrow="Meet your dentist" title={[site.dentist.name]} tone="light">
            <span className="placeholder-chip">{site.dentist.title}</span>
          </SectionIntro>
          <Reveal delay={0.2}>
            <blockquote className="mt-12 border-l border-sage pl-8">
              <p className="display-sm italic text-paper/95">&ldquo;[A short quote from the dentist about their approach to care.]&rdquo;</p>
            </blockquote>
            <p className="mt-10 max-w-lg leading-relaxed text-paper/75">
              [A two-sentence introduction to the dentist, their background and what patients can expect from them. Qualifications and experience will appear here once verified.]
            </p>
            <div className="mt-10">
              <ButtonLink href="/dentist" variant="light" arrow>Meet {site.dentist.firstName}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const experience = [
  { photo: "reception" as const, title: "Arrive", body: "A quiet welcome, no clipboard queues. Forms are completed before your visit where possible." },
  { photo: "roomWithArt" as const, title: "Settle", body: "Rooms designed with natural light, soft materials and space to breathe." },
  { photo: "consultation" as const, title: "Understand", body: "Your dentist explains what they see, in plain language, before any decision is made." },
];

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="container-lux py-28 md:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionIntro id="experience-title" eyebrow="The experience" title={["Designed", "around calm."]}>
              Every detail, from the first phone call to the final review, is considered with your comfort in mind.
            </SectionIntro>
          </div>
        </div>
        <ol className="space-y-24 md:space-y-32 lg:col-span-7 lg:col-start-6">
          {experience.map((item, i) => (
            <li key={item.title} className={`grid gap-8 md:grid-cols-2 md:items-end ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <ImageReveal photo={item.photo} className="aspect-[4/5] w-full" sizes="(min-width:768px) 30vw, 100vw" direction={i % 2 ? "right" : "left"} />
              <Reveal delay={0.15}>
                <p className="font-serif text-6xl text-sage">0{i + 1}</p>
                <h3 className="display-sm mt-4">{item.title}</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function GalleryTeaser() {
  return (
    <section aria-labelledby="gallery-teaser" className="bg-beige/60">
      <div className="container-lux grid items-center gap-16 py-28 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro id="gallery-teaser" eyebrow="Smile gallery" title={["Real results,", "shared with consent."]}>
            Our gallery will feature genuine patients who have kindly agreed to share their treatment. We never use stock images or edited photographs as results.
          </SectionIntro>
          <Reveal delay={0.2}>
            <div className="mt-10"><ButtonLink href="/smile-gallery" variant="outline" arrow>View the Gallery</ButtonLink></div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <BeforeAfter before={null} after={null} alt="Example treatment case" className="aspect-[4/3] w-full" />
          <PlaceholderNote>Drag the divider to compare. Consented before-and-after photographs will appear here once supplied by the clinic.</PlaceholderNote>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="container-lux py-28 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="eyebrow mb-10 text-forest" id="testimonials-title">In their words</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <span aria-hidden="true" className="block font-serif text-[7rem] leading-[0.5] text-sage">&ldquo;</span>
          <blockquote>
            <p className="display-md mx-auto mt-6 max-w-4xl">[A genuine patient testimonial, shared with written permission, will appear here.]</p>
            <footer className="mt-10 text-sm text-ink-soft">[Patient first name] · [Treatment received]</footer>
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <PlaceholderNote>
            Testimonials are intentionally left empty. Add only genuine reviews with the patient&apos;s consent, or link to the clinic&apos;s verified Google reviews.
          </PlaceholderNote>
        </Reveal>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="grain bg-ink text-paper">
      <div className="container-lux relative z-[2] py-28 md:py-36">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionIntro id="journey-title" className="lg:col-span-6" eyebrow="Your journey" title={["From first hello", "to lasting care."]} tone="light" />
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={0.15}>
            <p className="leading-relaxed text-paper/70">Clear at every step. You will always know what happens next, and you are never asked to decide on the spot.</p>
          </Reveal>
        </div>
        <ol className="mt-20 grid gap-px overflow-hidden bg-paper/15 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.08} className="group bg-ink p-8 transition-colors duration-700 hover:bg-forest-deep">
              <p className="text-xs tracking-[0.2em] text-sage">{step.n}</p>
              <h3 className="display-sm mt-14">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="container-lux py-28 md:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro id="why-title" eyebrow="Why patients choose us" title={["Care you can", "feel at ease with."]} />
          <ImageReveal photo="instruments" className="mt-14 aspect-[5/4] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
        </div>
        <ul className="grid content-start gap-x-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:pt-28">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08} className="border-t border-ink/15 py-10">
              <p className="font-serif text-2xl italic text-sage-deep">{["i", "ii", "iii", "iv"][i]}.</p>
              <h3 className="display-sm mt-6">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BookingBand() {
  return (
    <section aria-labelledby="booking-band" className="relative overflow-hidden bg-forest-deep text-paper">
      <div className="absolute inset-0 opacity-50">
        <Photo photo="treatmentRoom" fill sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,52,43,0.95)_0%,rgba(38,52,43,0.7)_55%,rgba(38,52,43,0.35)_100%)]" />
      <div className="container-lux relative py-32 md:py-44">
        <p className="eyebrow mb-8 text-sage">Appointments</p>
        <MaskText id="booking-band" lines={["When you are ready,", "we are here."]} className="display-lg max-w-4xl" />
        <Reveal delay={0.2}>
          <p className="lede mt-8 max-w-lg text-paper/80">Request a time online in under two minutes. Our team will contact you to confirm.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/appointment" variant="light" arrow>Book an Appointment</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Ask a Question</ButtonLink>
          </div>
        </Reveal>
      </div>
      <p className="absolute bottom-3 right-4 text-[0.6rem] text-paper/50">Photo: {photos.treatmentRoom.credit} / Unsplash</p>
    </section>
  );
}
