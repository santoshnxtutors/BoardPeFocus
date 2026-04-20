import { NextResponse } from "next/server";
import { getBoards } from "@/lib/mock-api";

export async function GET() {
  return NextResponse.json(getBoards());
}
