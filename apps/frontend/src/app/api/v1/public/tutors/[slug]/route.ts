import { NextResponse } from "next/server";
import { fetchBackend, relayBackendResponse } from "@/lib/backend-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const response = await fetchBackend(`/public/tutors/${encodeURIComponent(slug)}`);
    return relayBackendResponse(response, JSON.stringify({ message: "Tutor not found" }));
  } catch {
    return NextResponse.json({ message: "Tutor not found" }, { status: 404 });
  }
}
