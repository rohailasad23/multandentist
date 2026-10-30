import type { PhotoKey } from "./images";

/**
 * Smile Gallery data.
 *
 * `cases` must only ever contain GENUINE clinic patient photographs, used with
 * the patient's written consent. Until the clinic supplies them, the gallery
 * shows clearly labelled placeholder cases so the layout can be reviewed.
 * Never use stock images or edited photos as before-and-after results.
 */
export type SmileCase = {
  id: string;
  title: string;
  category: GalleryCategory;
  treatment: string;
  before: string | null; // image URL, null = awaiting photograph
  after: string | null;
  note?: string;
};

export type GalleryCategory = "Whitening" | "Veneers" | "Alignment" | "Restorative";

export const galleryCategories: GalleryCategory[] = ["Whitening", "Veneers", "Alignment", "Restorative"];

export const cases: SmileCase[] = [];

export const placeholderCases: SmileCase[] = galleryCategories.flatMap((category, i) => [
  {
    id: `placeholder-${i}-a`,
    title: `${category} case`,
    category,
    treatment: `[Treatment details for ${category.toLowerCase()} case]`,
    before: null,
    after: null,
    note: "Awaiting consented patient photography",
  },
  {
    id: `placeholder-${i}-b`,
    title: `${category} case`,
    category,
    treatment: `[Treatment details for ${category.toLowerCase()} case]`,
    before: null,
    after: null,
    note: "Awaiting consented patient photography",
  },
]);

/** Atmosphere images: stock photography of dental environments, not patient results. */
export const atmosphere: { key: PhotoKey; caption: string }[] = [
  { key: "heroChair", caption: "Treatment room, natural light" },
  { key: "reception", caption: "Arrival and reception" },
  { key: "waiting", caption: "A quiet place to wait" },
  { key: "roomWithArt", caption: "Considered interiors" },
  { key: "mirrorChair", caption: "Precision, gently applied" },
  { key: "roomDesk", caption: "Consultation space" },
];
