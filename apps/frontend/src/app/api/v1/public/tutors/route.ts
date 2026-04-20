import { NextResponse } from "next/server";
import { getTutors } from "@/lib/mock-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return NextResponse.json(
    getTutors({
      q: searchParams.get("q"),
      board: searchParams.get("board"),
      subject: searchParams.get("subject"),
    }),
  );
}
