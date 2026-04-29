import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchBackend, relayBackendResponse } from "@/lib/backend-api";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  board: z.string().optional(),
  class: z.string().optional(),
  subject: z.string().optional(),
  school: z.string().optional(),
  location: z.string().optional(),
  preferredMode: z.string().optional(),
  preferredTimeSlot: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid lead payload" },
      { status: 400 },
    );
  }

  const response = await fetchBackend("/public/leads", {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });

  return relayBackendResponse(response, JSON.stringify({ message: "Lead submission failed" }));
}
