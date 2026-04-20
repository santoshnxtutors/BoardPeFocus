import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/mock-api";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  board: z.string().optional(),
  class: z.string().optional(),
  subject: z.string().optional(),
  school: z.string().optional(),
  location: z.string().optional(),
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

  const result = await saveLead(parsed.data);
  return NextResponse.json(result, { status: 201 });
}
