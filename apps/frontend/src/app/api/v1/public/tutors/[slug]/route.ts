import { NextResponse } from "next/server";
import { getTutor } from "@/lib/mock-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const tutor = getTutor(slug);

  if (!tutor) {
    return NextResponse.json({ message: "Tutor not found" }, { status: 404 });
  }

  return NextResponse.json(tutor);
}
