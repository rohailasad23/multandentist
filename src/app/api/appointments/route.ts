import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { antiSpamSchema, appointmentSchema, type FieldErrors } from "@/lib/booking/schema";
import { getProvider } from "@/lib/booking/providers";

export const runtime = "nodejs";

// Simple in-memory rate limit (per server instance). For multi-instance
// production deployments, replace with a shared store such as Upstash Redis.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  // Hash the IP so raw addresses are never held in memory or logs.
  const key = createHash("sha256").update(ip).digest("hex").slice(0, 16);
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ status: "error", message: "Unsupported request." }, { status: 415 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ status: "error", message: "Too many requests. Please try again later or call the clinic." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "error", message: "Invalid request." }, { status: 400 });
  }

  const spam = antiSpamSchema.safeParse(body);
  // Honeypot filled or form submitted implausibly fast: respond as if accepted, transmit nothing.
  if (!spam.success || Date.now() - spam.data.startedAt < 2500) {
    return NextResponse.json({ status: "received", mode: "filtered", reference: "REQ-RECEIVED" });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0] as keyof FieldErrors;
      if (k && !fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return NextResponse.json({ status: "invalid", fieldErrors }, { status: 422 });
  }

  const provider = getProvider();
  try {
    const result = await provider.submit(parsed.data);
    if (!result.ok) {
      // Log the failure reason only, never patient details.
      console.error("[appointments] provider error:", result.error);
      return NextResponse.json({ status: "error", message: "We could not send your request just now." }, { status: 502 });
    }
    return NextResponse.json({ status: "received", mode: provider.mode, reference: result.reference });
  } catch (err) {
    console.error("[appointments] provider exception:", err instanceof Error ? err.name : "unknown");
    return NextResponse.json({ status: "error", message: "We could not send your request just now." }, { status: 502 });
  }
}
