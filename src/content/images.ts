/**
 * Temporary photography, sourced from Unsplash under the Unsplash License
 * (free for commercial use, no permission needed). These are stock images:
 * they do NOT depict the clinic, its team or its patients, and are labelled
 * as such where it matters. Replace with the clinic's own photography before
 * launch. Full credits are listed in IMAGE_CREDITS.md.
 */

export type Photo = {
  src: string;
  alt: string;
  credit: string;
  source: string;
};

const u = (id: string) => `https://images.unsplash.com/${id}`;

export const photos = {
  heroChair: {
    src: u("photo-1728342057953-94bfad8f0e7e"),
    alt: "A white dental chair beside a large window filled with soft daylight",
    credit: "Katarzyna Zygnerska",
    source: "https://unsplash.com/photos/a-white-dental-chair-in-a-room-with-a-window-44jaETSVX2I",
  },
  reception: {
    src: u("photo-1781513144825-aa1e284c5950"),
    alt: "A calm white reception area with curved walls and glass partitions",
    credit: "何青蓝",
    source: "https://unsplash.com/photos/modern-white-reception-area-with-curved-lines-and-glass-partitions-ECBg5FQkBXI",
  },
  waiting: {
    src: u("photo-1759262151080-e05ba1c6294f"),
    alt: "A woman reading quietly in a modern, softly lit waiting room",
    credit: "Caroline Badran",
    source: "https://unsplash.com/photos/woman-sitting-in-a-modern-waiting-room-reading-jH05wxjmAWE",
  },
  consultation: {
    src: u("photo-1777331903190-341a3dd0441b"),
    alt: "A dentist in conversation with a patient in a modern dental room",
    credit: "Harold Hisona",
    source: "https://unsplash.com/photos/dentist-talking-to-patient-in-a-modern-dental-office-Bg81yWKZlMg",
  },
  dentistPortrait: {
    src: u("photo-1606811841689-23dfddce3e95"),
    alt: "Placeholder portrait of a dentist in a white shirt (stock photograph)",
    credit: "Caroline LM",
    source: "https://unsplash.com/photos/man-in-white-dress-shirt-holding-black-pen--m-4tYmtLlI",
  },
  dentistAtDesk: {
    src: u("photo-1606811842243-af7e16970c1f"),
    alt: "Placeholder image of a dentist seated in a treatment room (stock photograph)",
    credit: "Caroline LM",
    source: "https://unsplash.com/photos/man-in-white-dress-shirt-sitting-on-black-office-rolling-chair-QA9fRIi6sFw",
  },
  treatmentRoom: {
    src: u("photo-1629909613654-28e377c37b09"),
    alt: "A modern dental treatment room with chair and equipment",
    credit: "Benyamin Bohlouli",
    source: "https://unsplash.com/photos/modern-dental-office-with-chair-and-equipment-e7MJLM5VGjY",
  },
  roomWithArt: {
    src: u("photo-1643660526741-094639fbe53a"),
    alt: "A dental chair in a treatment room with a framed painting on the wall",
    credit: "Ozkan Guner",
    source: "https://unsplash.com/photos/a-dentist-chair-in-a-room-with-a-painting-on-the-wall-aFqSRokmw2E",
  },
  roomDesk: {
    src: u("photo-1704455306251-b4634215d98f"),
    alt: "A dental room with a consultation desk and chairs",
    credit: "Kari Bjorn Photography",
    source: "https://unsplash.com/photos/a-dental-room-with-a-desk-and-chairs-Fdku_oMrDvk",
  },
  procedure: {
    src: u("photo-1588776814546-daab30f310ce"),
    alt: "Two dentists in protective wear carefully treating a patient",
    credit: "Jonathan Borba",
    source: "https://unsplash.com/photos/dentists-performing-procedure-in-clinic-hl6uG9cHW5A",
  },
  xray: {
    src: u("photo-1588776814546-1ffcf47267a5"),
    alt: "A dentist studying dental x-ray images on a light box",
    credit: "Jonathan Borba",
    source: "https://unsplash.com/photos/dentist-examining-dental-x-ray-scans-v_2FRXEba94",
  },
  mirrorExam: {
    src: u("photo-1606811971618-4486d14f3f99"),
    alt: "A dental examination with a mouth mirror and probe",
    credit: "Caroline LM",
    source: "https://unsplash.com/photos/dental-exam-with-mirror-and-tool-8BkF0sTC6Uo",
  },
  instruments: {
    src: u("photo-1606811856475-5e6fcdc6e509"),
    alt: "A dental mirror and explorer resting on a clean white surface",
    credit: "Caroline LM",
    source: "https://unsplash.com/photos/dental-mirror-and-explorer-tool-ux18C551ghI",
  },
  mirrorChair: {
    src: u("photo-1698749778813-ad5f2814e50f"),
    alt: "A dental mirror in the foreground with a softly blurred dental chair behind",
    credit: "Katarzyna Zygnerska",
    source: "https://unsplash.com/photos/dental-mirror-in-clinical-office-rubu_NvklJE",
  },
  braces: {
    src: u("photo-1777446899714-c26de766dffd"),
    alt: "A dental model showing fixed metal braces on the teeth",
    credit: "Harold Hisona",
    source: "https://unsplash.com/photos/dental-model-with-metal-braces-on-teeth-cx3JCL5PDew",
  },
  examination: {
    src: u("photo-1667133295352-ef4c83620e8e"),
    alt: "A dentist examining a patient's teeth with a dental mirror",
    credit: "Filip Rankovic Grobgaard",
    source: "https://unsplash.com/photos/dentist-examining-patient-in-dental-office-rm7Mgu33tHU",
  },
  checkup: {
    src: u("photo-1681939282781-341ac4f61996"),
    alt: "A woman having her teeth checked by a dentist",
    credit: "SoyBreno",
    source: "https://unsplash.com/photos/a-woman-getting-her-teeth-checked-by-a-dentist-z8BIWPwV3zo",
  },
  cleaning: {
    src: u("photo-1681939278218-a755fb2bf2d3"),
    alt: "A patient receiving a professional dental clean",
    credit: "SoyBreno",
    source: "https://unsplash.com/photos/a-woman-getting-her-teeth-brushed-by-a-dentist-7n50uixCBV8",
  },
  gloves: {
    src: u("photo-1663755489920-5e09f66d011a"),
    alt: "A dentist in blue gloves examining a man's teeth",
    credit: "D Dental Office",
    source: "https://unsplash.com/photos/dentist-examining-teeth-in-dental-office-BiknMFl7iOw",
  },
  smileWoman: {
    src: u("photo-1548382131-e0ebb1f0cdea"),
    alt: "A woman in a white top smiling naturally",
    credit: "Connor Wilkins",
    source: "https://unsplash.com/photos/woman-smiling-wearing-white-top-u68jZr7ky0I",
  },
  smileClose: {
    src: u("photo-1489278353717-f64c6ee8a4d2"),
    alt: "Close-up of a woman with long dark hair smiling",
    credit: "Lesly Juarez",
    source: "https://unsplash.com/photos/long-black-haired-woman-smiling-close-up-photography-1AhGNGKuhR0",
  },
  smileLaugh: {
    src: u("photo-1611695434369-a8f5d76ceb7b"),
    alt: "A person with shoulder-length hair laughing in a textured blue shirt",
    credit: "nrd",
    source: "https://unsplash.com/photos/person-laughing-in-blue-shirt-y3kC_7Qhmjk",
  },
  smileMan: {
    src: u("photo-1667133295308-9ef24f71952e"),
    alt: "A man smiling warmly at the camera",
    credit: "Filip Rankovic Grobgaard",
    source: "https://unsplash.com/photos/a-man-smiling-for-the-camera-9_1Y_IKP4tY",
  },
  smileTeeth: {
    src: u("photo-1677026010083-78ec7f1b84ed"),
    alt: "A close-up of a smile showing natural white teeth",
    credit: "Kamal Hoseinianzade",
    source: "https://unsplash.com/photos/a-close-up-of-a-womans-mouth-with-white-teeth-RCQnbyQsnUg",
  },
  smileSoft: {
    src: u("photo-1562337404-3044c84ac061"),
    alt: "A smiling woman photographed in soft natural light",
    credit: "Kate Kozyrka",
    source: "https://unsplash.com/photos/smiling-woman-B41fY4dhX18",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
