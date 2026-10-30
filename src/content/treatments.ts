import type { PhotoKey } from "./images";

export type TreatmentCategory = "Preventive" | "Cosmetic" | "Restorative" | "Orthodontic" | "Urgent care";

export type Treatment = {
  slug: string;
  name: string;
  category: TreatmentCategory;
  /** Set to false for any treatment the clinic does not offer: it disappears site-wide. */
  offered: boolean;
  summary: string;
  intro: string;
  involves: string[];
  suitableFor: string[];
  expect: string;
  process: { title: string; body: string }[];
  recovery?: string;
  faqs: { q: string; a: string }[];
  image: PhotoKey;
};

const consultFaq = {
  q: "How do I know if this treatment is right for me?",
  a: "Every plan starts with an examination and a conversation. Your dentist will explain what they see, outline the options that suit you, including doing nothing, and answer your questions before anything begins.",
};

const costFaq = {
  q: "How much does it cost?",
  a: "Fees depend on what your treatment involves. You will receive a written estimate after your consultation, before any treatment is booked. [Clinic to add fee guide or financing details if available.]",
};

const all: Treatment[] = [
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    category: "Preventive",
    offered: true,
    summary: "Thorough examinations and everyday care that keep small concerns from becoming larger ones.",
    intro:
      "Good dentistry begins with understanding. A general examination gives your dentist a complete picture of your teeth, gums and bite, so that care can be planned around you rather than around a problem.",
    involves: [
      "A careful check of teeth, gums, soft tissues and bite",
      "X-rays only where they are clinically needed",
      "Fillings and minor restorations when required",
      "Personalised advice for care at home",
    ],
    suitableFor: [
      "Anyone due a routine check-up",
      "New patients who would like a full assessment",
      "Patients with sensitivity, discomfort or a concern they would like looked at",
    ],
    expect:
      "Your appointment is unhurried. Your dentist will talk you through their findings, show you anything worth seeing, and agree next steps with you.",
    process: [
      { title: "Conversation", body: "We start with your history, your concerns and what you would like from your visit." },
      { title: "Examination", body: "A gentle, thorough check of your mouth, with imaging where clinically appropriate." },
      { title: "Plan", body: "A clear explanation of findings and options, with a written plan if treatment is needed." },
    ],
    faqs: [
      { q: "How often should I have a check-up?", a: "It varies from person to person. Your dentist will recommend an interval based on your oral health rather than a fixed schedule." },
      consultFaq,
    ],
    image: "examination",
  },
  {
    slug: "dental-cleaning",
    name: "Dental Cleaning",
    category: "Preventive",
    offered: true,
    summary: "A gentle professional clean that removes build-up and leaves your mouth feeling fresh.",
    intro:
      "Even with excellent brushing, plaque and tartar collect in places that are hard to reach. A professional clean removes them gently and is one of the simplest ways to look after your gums.",
    involves: [
      "Removal of plaque and tartar above and just below the gum line",
      "Polishing to lift everyday surface staining",
      "Guidance on brushing and interdental cleaning",
    ],
    suitableFor: [
      "Anyone looking to maintain healthy teeth and gums",
      "Patients who notice bleeding when brushing",
      "Those preparing for cosmetic treatment",
    ],
    expect:
      "Most cleans are comfortable. If you have sensitive teeth, let us know: we can adjust our approach and pace to suit you.",
    process: [
      { title: "Assessment", body: "A quick look at your gums to tailor the clean to your needs." },
      { title: "Clean", body: "Careful removal of build-up using fine instruments and, where suitable, ultrasonic cleaning." },
      { title: "Polish and advice", body: "A finishing polish and practical tips you can use at home." },
    ],
    recovery: "You can eat and drink as normal straight away. Some people notice mild sensitivity for a day or so.",
    faqs: [
      { q: "Does a professional clean hurt?", a: "Most patients find it comfortable. If your gums are inflamed you may feel some tenderness, and we can pause or adjust at any point." },
      { q: "Will it whiten my teeth?", a: "A clean can remove surface staining, which often makes teeth look brighter, but it does not change their natural shade. Whitening is a separate treatment." },
    ],
    image: "cleaning",
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    category: "Cosmetic",
    offered: true,
    summary: "Professionally supervised whitening for a brighter, natural-looking shade.",
    intro:
      "Whitening can gently lift the shade of natural teeth. Under professional supervision it is planned around the health of your teeth and gums, with realistic expectations agreed from the start.",
    involves: [
      "An examination to confirm whitening is suitable",
      "A record of your starting shade",
      "Custom-fitted trays and professional whitening gel, or in-clinic whitening [clinic to confirm method]",
    ],
    suitableFor: [
      "Adults with healthy teeth and gums who would like a brighter smile",
      "Patients planning other cosmetic work who want to set a shade first",
    ],
    expect:
      "Results vary between individuals and depend on the natural colour of your teeth. Whitening does not change the colour of crowns, veneers or fillings, which your dentist will discuss with you.",
    process: [
      { title: "Consultation", body: "We check suitability, discuss expectations and record your current shade." },
      { title: "Preparation", body: "Impressions or scans are taken for comfortable, close-fitting trays." },
      { title: "Whitening", body: "You whiten following a tailored schedule, with a review to check progress and comfort." },
    ],
    recovery: "Temporary sensitivity is common during whitening and usually settles once treatment ends.",
    faqs: [
      { q: "How long do results last?", a: "It varies depending on diet, habits and aftercare. Occasional top-up treatments can help maintain your shade." },
      { q: "Is whitening safe?", a: "When assessed and supervised by a dental professional, whitening is a well-established treatment. Your dentist will advise you if it is not suitable for you." },
      costFaq,
    ],
    image: "smileTeeth",
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    category: "Restorative",
    offered: true,
    summary: "A fixed, long-term option for replacing one or more missing teeth.",
    intro:
      "A dental implant replaces the root of a missing tooth, supporting a crown, bridge or denture. Because every mouth is different, implant treatment begins with a detailed assessment and a plan made specifically for you.",
    involves: [
      "A comprehensive assessment, including 3D imaging where needed",
      "Placement of the implant under local anaesthetic",
      "A healing period while the implant integrates with the bone",
      "Fitting of the final crown, bridge or denture",
    ],
    suitableFor: [
      "Adults missing one or more teeth",
      "Patients looking for an alternative to removable dentures",
      "Those with sufficient bone and good general health, or who may be suitable after additional procedures",
    ],
    expect:
      "Implant treatment usually takes place over several months. Your dentist will explain each stage, the timeline and any alternatives before you decide.",
    process: [
      { title: "Planning", body: "Detailed examination and imaging to assess bone, gums and bite." },
      { title: "Placement", body: "The implant is placed precisely under local anaesthetic, with sedation available if offered [clinic to confirm]." },
      { title: "Healing", body: "A period of integration, during which a temporary tooth may be provided." },
      { title: "Restoration", body: "Your final tooth is made to match your smile and fitted." },
    ],
    recovery:
      "Some swelling and tenderness is normal for a few days after placement. You will receive written aftercare instructions and a review appointment.",
    faqs: [
      { q: "Am I suitable for implants?", a: "Suitability depends on your bone, gum health and general health. A consultation and imaging are needed to say for certain." },
      { q: "How long does treatment take?", a: "Typically several months from placement to final tooth, though every case is different. Your plan will include an estimated timeline." },
      costFaq,
    ],
    image: "procedure",
  },
  {
    slug: "veneers",
    name: "Veneers",
    category: "Cosmetic",
    offered: true,
    summary: "Thin, custom-made facings that refine the shape, shade and proportion of teeth.",
    intro:
      "Veneers are thin shells, usually porcelain or composite, bonded to the front of teeth. They can change the colour, shape or proportion of a smile while keeping a natural appearance.",
    involves: [
      "A smile design consultation",
      "A preview of the proposed result, where possible",
      "Conservative preparation of the teeth where needed",
      "Bonding of custom-made veneers",
    ],
    suitableFor: [
      "Patients with chipped, worn, discoloured or uneven teeth",
      "Those who would like to change tooth shape or proportion",
      "Adults with healthy gums and a stable bite",
    ],
    expect:
      "Veneers are a considered decision. Some types require removal of a small amount of enamel, which is not reversible. Your dentist will explain the options and trade-offs clearly.",
    process: [
      { title: "Design", body: "We talk about the smile you have in mind and assess what is achievable for you." },
      { title: "Preview", body: "Where suitable, a mock-up lets you see the proposed shape before committing." },
      { title: "Preparation", body: "Teeth are gently prepared and impressions or scans taken." },
      { title: "Fitting", body: "Your veneers are checked for fit, shade and comfort, then bonded in place." },
    ],
    recovery: "Most patients return to normal activities straight away. Some short-term sensitivity is possible.",
    faqs: [
      { q: "Porcelain or composite?", a: "Each has advantages. Porcelain is very stain-resistant and durable, while composite is often more conservative and easier to repair. Your dentist will help you choose." },
      { q: "Do veneers look natural?", a: "Well-designed veneers are made to suit your face, gum line and existing teeth. A preview helps you judge this before treatment." },
      costFaq,
    ],
    image: "smileWoman",
  },
  {
    slug: "smile-makeovers",
    name: "Smile Makeovers",
    category: "Cosmetic",
    offered: true,
    summary: "A carefully sequenced plan combining treatments to achieve a harmonious smile.",
    intro:
      "A smile makeover is not a single treatment but a plan. It may combine whitening, alignment, bonding, veneers or restorations, ordered so that each step supports the next.",
    involves: [
      "An in-depth consultation and photographs",
      "Digital smile planning where available [clinic to confirm]",
      "A phased treatment plan with clear priorities",
    ],
    suitableFor: [
      "Patients with several cosmetic concerns they would like to address together",
      "Those who want a cohesive result rather than treating teeth one by one",
    ],
    expect:
      "We begin with your health, then your goals. You will see the plan, the sequence and the estimated timeline before deciding to go ahead.",
    process: [
      { title: "Listen", body: "We learn what you like and dislike about your smile, and why." },
      { title: "Design", body: "Photographs, scans and planning help shape a proposal that suits your face." },
      { title: "Sequence", body: "Treatment is ordered for the healthiest, most predictable result." },
      { title: "Refine", body: "We review the finished result with you and plan long-term care." },
    ],
    faqs: [
      { q: "How long does a smile makeover take?", a: "Anything from a few weeks to over a year, depending on the treatments involved. Your plan will give a realistic estimate." },
      consultFaq,
      costFaq,
    ],
    image: "smileLaugh",
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    category: "Restorative",
    offered: true,
    summary: "Gentle treatment to save a tooth when its inner pulp is inflamed or infected.",
    intro:
      "Root canal treatment removes inflamed or infected tissue from inside a tooth, cleans the canals and seals them. It allows many teeth to be kept that might otherwise need to be removed.",
    involves: [
      "Diagnosis with examination and X-rays",
      "Local anaesthetic for comfort",
      "Cleaning, shaping and sealing of the root canals",
      "A filling or crown to protect the tooth afterwards",
    ],
    suitableFor: [
      "Patients with persistent toothache or sensitivity to hot and cold",
      "Teeth with deep decay, cracks or an abscess",
    ],
    expect:
      "Modern root canal treatment is carried out under local anaesthetic and many patients find it similar to having a filling. It may take one or more visits.",
    process: [
      { title: "Diagnose", body: "We confirm the cause of your symptoms and explain your options." },
      { title: "Treat", body: "The tooth is numbed, cleaned inside and carefully sealed." },
      { title: "Protect", body: "A filling or crown restores strength to the treated tooth." },
    ],
    recovery: "Mild tenderness for a few days is common and usually eases with over-the-counter pain relief, as advised by your dentist.",
    faqs: [
      { q: "Is root canal treatment painful?", a: "The procedure is performed under local anaesthetic. It is often carried out to relieve pain rather than cause it." },
      { q: "Will I need a crown?", a: "Back teeth often benefit from a crown afterwards for protection. Your dentist will advise based on how much tooth remains." },
    ],
    image: "xray",
  },
  {
    slug: "orthodontics",
    name: "Orthodontics",
    category: "Orthodontic",
    offered: true,
    summary: "Fixed and removable options to straighten teeth and improve the bite.",
    intro:
      "Orthodontic treatment gradually moves teeth into better positions. Beyond appearance, a well-aligned bite can make teeth easier to clean and distribute chewing forces more evenly.",
    involves: [
      "An orthodontic assessment with photographs and scans",
      "Fixed braces or removable appliances, depending on your needs",
      "Regular adjustment visits",
      "Retainers to hold the result",
    ],
    suitableFor: [
      "Teenagers and adults with crowded, spaced or crooked teeth",
      "Patients with bite concerns such as overbite or crossbite",
    ],
    expect:
      "Treatment length depends on the complexity of your case. Your dentist will explain the options, how often you will visit and how to look after your appliance.",
    process: [
      { title: "Assess", body: "Records are taken to understand your teeth, bite and goals." },
      { title: "Plan", body: "We recommend an approach and explain the expected timeline." },
      { title: "Align", body: "Teeth are moved gradually, with regular reviews." },
      { title: "Retain", body: "Retainers keep teeth in their new positions." },
    ],
    faqs: [
      { q: "Am I too old for braces?", a: "Many adults have orthodontic treatment. Healthy teeth can usually be moved at any age." },
      { q: "Will I need to wear a retainer?", a: "Yes. Teeth naturally tend to move, so retainers are an important part of keeping your result." },
      costFaq,
    ],
    image: "braces",
  },
  {
    slug: "clear-aligners",
    name: "Clear Aligners",
    category: "Orthodontic",
    offered: true,
    summary: "Discreet, removable aligners for straightening suitable cases.",
    intro:
      "Clear aligners are a series of custom-made, removable trays that move teeth in small steps. They are discreet and can be taken out to eat and clean.",
    involves: [
      "A digital scan and treatment simulation",
      "A series of aligners, each worn for a set period",
      "Periodic reviews to monitor progress",
      "Retainers at the end of treatment",
    ],
    suitableFor: [
      "Adults and teenagers with mild to moderate alignment concerns",
      "Patients who can commit to wearing aligners for most of the day",
    ],
    expect:
      "Aligners work best when worn consistently, typically for most of the day. Your dentist will tell you honestly whether aligners suit your case or whether another option would be better.",
    process: [
      { title: "Scan", body: "A digital scan captures your teeth precisely, with no messy impressions." },
      { title: "Preview", body: "A simulation shows the planned movement of your teeth." },
      { title: "Wear", body: "You progress through your aligners, with check-ins along the way." },
      { title: "Retain", body: "Retainers help maintain your new alignment." },
    ],
    faqs: [
      { q: "Are aligners suitable for everyone?", a: "Not every case. Some movements are better achieved with fixed braces. An assessment will confirm what is right for you." },
      { q: "Can I eat with aligners in?", a: "Aligners are removed for eating and drinking anything other than water, then replaced after brushing." },
      costFaq,
    ],
    image: "smileClose",
  },
  {
    slug: "emergency-dentistry",
    name: "Emergency Dentistry",
    category: "Urgent care",
    offered: true,
    summary: "Prompt, calm care for dental pain, injury or urgent concerns.",
    intro:
      "Dental emergencies are stressful. We aim to see patients in pain as promptly as possible, relieve discomfort and explain the next steps clearly. [Clinic to confirm emergency availability.]",
    involves: [
      "Assessment of the problem and its cause",
      "Pain relief and stabilising treatment",
      "A clear plan for any further care needed",
    ],
    suitableFor: [
      "Severe or persistent toothache",
      "A broken, chipped or knocked-out tooth",
      "Swelling, a lost filling or crown, or a dental injury",
    ],
    expect:
      "Please call us as early as possible. If you have facial swelling affecting your breathing or swallowing, or a serious injury, seek emergency medical care immediately.",
    process: [
      { title: "Call", body: "Phone the clinic so we can understand the urgency and advise you." },
      { title: "Assess", body: "We examine the problem and explain what is happening." },
      { title: "Relieve", body: "Treatment focuses first on comfort and stabilising the tooth." },
    ],
    faqs: [
      { q: "What should I do if a tooth is knocked out?", a: "Hold it by the crown, not the root. If clean, place it back in its socket or keep it in milk, and contact a dentist immediately." },
      { q: "Can I book an emergency online?", a: "For urgent problems please telephone us rather than using the online form, so we can respond as quickly as possible." },
    ],
    image: "gloves",
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns and Bridges",
    category: "Restorative",
    offered: true,
    summary: "Custom restorations that strengthen damaged teeth or replace missing ones.",
    intro:
      "A crown covers and protects a weakened tooth, while a bridge replaces a missing tooth by attaching to the teeth on either side. Both are made to match the shape and shade of your natural smile.",
    involves: [
      "Assessment and preparation of the tooth or teeth",
      "Impressions or digital scans",
      "A temporary restoration while yours is made",
      "Fitting and adjustment of the final crown or bridge",
    ],
    suitableFor: [
      "Teeth that are cracked, heavily filled or root-treated",
      "Patients missing a tooth who prefer a fixed option",
    ],
    expect:
      "Treatment usually involves two appointments. Your dentist will discuss material choices and how they affect appearance and durability.",
    process: [
      { title: "Prepare", body: "The tooth is shaped under local anaesthetic and a scan is taken." },
      { title: "Craft", body: "Your restoration is made to match the colour and form of neighbouring teeth." },
      { title: "Fit", body: "We check bite, comfort and appearance before cementing it in place." },
    ],
    recovery: "Some sensitivity is normal for a short time. Look after crowns and bridges as you would natural teeth.",
    faqs: [
      { q: "How long do crowns last?", a: "With good care they can last many years, although no restoration is permanent. Regular check-ups help them last as long as possible." },
      costFaq,
    ],
    image: "instruments",
  },
  {
    slug: "gum-care",
    name: "Gum Care",
    category: "Preventive",
    offered: true,
    summary: "Assessment and treatment to keep gums healthy and teeth well supported.",
    intro:
      "Healthy gums are the foundation of a healthy smile. Gum disease is common and often painless in its early stages, so regular assessment helps catch it early.",
    involves: [
      "Measurement of gum health and any pocketing",
      "Deep cleaning below the gum line where needed",
      "A tailored home-care routine",
      "Ongoing maintenance and monitoring",
    ],
    suitableFor: [
      "Patients with bleeding, swollen or receding gums",
      "Those with persistent bad breath or loose teeth",
      "Anyone with a history of gum disease",
    ],
    expect:
      "Gum treatment is a partnership. We provide professional care and you continue it at home, with reviews to track progress.",
    process: [
      { title: "Measure", body: "A detailed check records the health of each area of your gums." },
      { title: "Treat", body: "Careful cleaning removes bacteria and deposits, under local anaesthetic if needed." },
      { title: "Maintain", body: "Regular reviews help keep your gums stable over time." },
    ],
    recovery: "Gums may feel tender for a few days after deep cleaning. Your dentist will advise on aftercare.",
    faqs: [
      { q: "Is bleeding when brushing normal?", a: "It is common, but not normal. It is often an early sign of gum inflammation and worth having checked." },
      consultFaq,
    ],
    image: "mirrorExam",
  },
];

export const treatments = all.filter((t) => t.offered);

export const featuredSlugs = ["teeth-whitening", "dental-implants", "veneers", "clear-aligners", "general-dentistry"];

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
