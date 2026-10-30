import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SmileGallery } from "@/components/gallery/SmileGallery";
import { PlaceholderNote } from "@/components/ui/Detail";
import { BookingBand } from "@/components/sections/HomeSections";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Smile Gallery",
  description: `Genuine treatment results from ${site.name}, shared with patient consent, and a look inside the clinic.`,
  path: "/smile-gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Smile gallery"
        title={["Shared with", "permission."]}
        lede="Every result in this gallery belongs to a real patient who has given written consent. Results vary from person to person, and your dentist will talk you through what is realistic for you."
        breadcrumb={[{ href: "/", label: "Home" }, { href: "/smile-gallery", label: "Smile Gallery" }]}
      >
        <PlaceholderNote>
          Patient cases are shown as labelled placeholders until the clinic supplies consented photographs. Add them in <code>src/content/gallery.ts</code>.
        </PlaceholderNote>
      </PageHero>
      <section aria-label="Gallery" className="container-lux pb-28 md:pb-36">
        <SmileGallery />
      </section>
      <BookingBand />
    </>
  );
}
