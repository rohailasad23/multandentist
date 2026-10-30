import { z } from "zod";
import { treatments } from "@/content/treatments";

export const timeSlots = [
  { value: "morning", label: "Morning", hint: "9 – 12" },
  { value: "afternoon", label: "Afternoon", hint: "12 – 4" },
  { value: "late", label: "Late afternoon", hint: "4 – close" },
  { value: "any", label: "Any time", hint: "Flexible" },
] as const;

export const treatmentOptions = [
  ...treatments.map((t) => ({ value: t.slug, label: t.name })),
  { value: "consultation", label: "General consultation / not sure" },
];

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

const todayISO = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export const minDate = () => todayISO();
export const maxDate = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
};

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80, "Please keep your name under 80 characters."),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number so we can reach you.")
    .regex(/^\+?[0-9\s().-]{7,20}$/, "Please enter a valid phone number."),
  email: z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address.").max(120),
  treatment: z.string().refine((v) => treatmentOptions.some((o) => o.value === v), "Please choose a treatment, or select “not sure”."),
  date: z
    .string()
    .regex(isoDate, "Please choose a preferred date.")
    // Allow one day of slack for timezone differences between browser and server.
    .refine((v) => v >= new Date(Date.now() - 86400000).toISOString().slice(0, 10), "Please choose a date from today onwards.")
    .refine((v) => v <= maxDate(), "Please choose a date within the next year."),
  time: z.enum(timeSlots.map((t) => t.value) as [string, ...string[]], { message: "Please choose a preferred time." }),
  message: z.string().trim().max(500, "Please keep your message under 500 characters.").optional().default(""),
  consent: z.literal(true, { message: "Please agree so we can contact you about your request." }),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type FieldErrors = Partial<Record<keyof AppointmentInput, string>>;

/** Spam-protection fields sent alongside the form, never stored. */
export const antiSpamSchema = z.object({
  company: z.string().max(0).optional().default(""), // honeypot: must stay empty
  startedAt: z.number().int().positive(),
});
