import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Introduction, DentistIntro, Experience, GalleryTeaser, Testimonials, Journey, WhyChoose, BookingBand } from "@/components/sections/HomeSections";
import { FeaturedTreatments } from "@/components/sections/FeaturedTreatments";
import { FaqSection } from "@/components/sections/FaqSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { featuredSlugs, treatments } from "@/content/treatments";
import { generalFaqs } from "@/content/home";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Modern Dental Care in ${site.address.city}`,
    description: `${site.name} offers calm, considered general, cosmetic and restorative dentistry in ${site.address.city}. Request an appointment online.`,
    path: "/",
  }),
  title: { absolute: `${site.name} | Modern Dental Care in ${site.address.city}` },
};

export default function Home() {
  const featured = featuredSlugs.map((s) => treatments.find((t) => t.slug === s)).filter((t) => t !== undefined);
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedTreatments items={featured} />
      <DentistIntro />
      <Experience />
      <GalleryTeaser />
      <Testimonials />
      <Journey />
      <WhyChoose />
      <FaqSection items={generalFaqs} />
      <BookingBand />
      <LocationSection />
    </>
  );
}
