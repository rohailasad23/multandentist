import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/dentist", "/treatments", "/smile-gallery", "/appointment", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...treatments.map((t) => ({ url: `${site.url}/treatments/${t.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
