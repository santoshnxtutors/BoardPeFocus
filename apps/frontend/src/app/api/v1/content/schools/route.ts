import { NextResponse } from "next/server";
import { fetchBackend } from "@/lib/backend-api";

export async function GET() {
  const response = await fetchBackend("/content/schools");
  return NextResponse.json(await response.json(), { status: response.status });
}
