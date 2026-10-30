import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PlaceholderNote } from "@/components/ui/Detail";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  description: `How ${site.name} handles the personal information you share through this website.`,
  path: "/privacy",
});

const sections = [
  { h: "What we collect", p: "When you request an appointment we collect your name, phone number, email address, preferred treatment, date and time, and any optional message you choose to include. We do not ask for detailed medical information online." },
  { h: "Why we collect it", p: "Solely to respond to your request and arrange your appointment. We do not use it for marketing unless you separately agree." },
  { h: "How it is handled", p: "Requests are sent securely over HTTPS to the clinic's team. Patient details are not included in website URLs or analytics, and are not written to website server logs." },
  { h: "How long we keep it", p: "[Clinic to state its retention period and the legal basis for processing under applicable data-protection law.]" },
  { h: "Your rights", p: `You can ask to see, correct or delete the information you have shared with us. Contact ${site.email}.` },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title={["Privacy notice."]} breadcrumb={[{ href: "/", label: "Home" }, { href: "/privacy", label: "Privacy" }]} />
      <section className="container-lux pb-28">
        <div className="max-w-2xl space-y-12">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="display-sm">{s.h}</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{s.p}</p>
            </div>
          ))}
          <PlaceholderNote>This is a starting draft. It must be reviewed and completed by the clinic to meet local data-protection requirements before launch.</PlaceholderNote>
        </div>
      </section>
    </>
  );
}
