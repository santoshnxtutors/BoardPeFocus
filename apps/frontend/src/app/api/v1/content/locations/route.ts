import { NextResponse } from "next/server";
import { getLocations } from "@/lib/mock-api";

export async function GET() {
  return NextResponse.json(getLocations());
}
