import { NextResponse } from "next/server";
import { validateEnquiry, type EnquiryPayload } from "@/lib/enquiry";

const MAX = 5000;
const clip = (v: unknown, n = 200) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request) {
  let body: Partial<EnquiryPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (clip(body.company)) return NextResponse.json({ ok: true });

  const enquiry: EnquiryPayload = {
    firstName: clip(body.firstName),
    lastName: clip(body.lastName),
    email: clip(body.email),
    phone: clip(body.phone, 50),
    interests: Array.isArray(body.interests) ? body.interests.map((i) => clip(i, 80)).filter(Boolean).slice(0, 10) : [],
    message: clip(body.message, MAX),
    source: clip(body.source, 200),
  };

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO(client): deliver the enquiry (email to enquiries@highgrove.co.nz or CRM).
  // Until a destination is chosen, enquiries are only logged on the server.
  console.info("[enquiry]", JSON.stringify(enquiry));

  return NextResponse.json({ ok: true });
}
