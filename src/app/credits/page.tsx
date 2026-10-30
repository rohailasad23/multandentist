import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { photos } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Image Credits", description: "Credits for photography used on this website.", path: "/credits" }),
  robots: { index: false },
};

export default function CreditsPage() {
  return (
    <>
      <PageHero
        eyebrow="Credits"
        title={["Image credits."]}
        lede="Photography on this site is temporary stock imagery from Unsplash, used under the Unsplash License. It does not depict our clinic, team or patients."
        breadcrumb={[{ href: "/", label: "Home" }, { href: "/credits", label: "Image credits" }]}
      />
      <section className="container-lux pb-28">
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {Object.values(photos).map((p) => (
            <li key={p.src} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm">{p.alt}</span>
              <a href={p.source} target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-forest">{p.credit} / Unsplash ↗</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
