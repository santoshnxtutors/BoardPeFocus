import { NextResponse } from "next/server";
import { fetchBackend } from "@/lib/backend-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const response = await fetchBackend(`/public/boards/${encodeURIComponent(slug)}`);
  return NextResponse.json(await response.json(), { status: response.status });
}
