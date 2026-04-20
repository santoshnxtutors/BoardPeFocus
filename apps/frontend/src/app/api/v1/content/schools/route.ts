import { NextResponse } from "next/server";
import { getSchools } from "@/lib/mock-api";

export async function GET() {
  return NextResponse.json(getSchools());
}
