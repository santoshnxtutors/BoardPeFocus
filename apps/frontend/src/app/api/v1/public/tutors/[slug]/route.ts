import { NextResponse } from "next/server";
import { fetchBackend } from "@/lib/backend-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const response = await fetchBackend(`/public/tutors/${encodeURIComponent(slug)}`);
    if (response.ok) {
      return NextResponse.json(await response.json(), { status: response.status });
    }
  } catch {
    return NextResponse.json({ message: "Tutor not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Tutor not found" }, { status: 404 });
}
