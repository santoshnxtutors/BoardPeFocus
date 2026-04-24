import { NextResponse } from "next/server";
import { fetchBackend } from "@/lib/backend-api";
import { mockTutors } from "@/data/mock";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const mockTutor = mockTutors.find((item) => item.slug === slug);
  if (mockTutor) {
    return NextResponse.json(mockTutor, { status: 200 });
  }

  try {
    const response = await fetchBackend(`/public/tutors/${encodeURIComponent(slug)}`);
    if (response.ok) {
      return NextResponse.json(await response.json(), { status: response.status });
    }
  } catch {
    // Fall through to the curated tutor dataset below.
  }

  return NextResponse.json({ message: "Tutor not found" }, { status: 404 });
}
