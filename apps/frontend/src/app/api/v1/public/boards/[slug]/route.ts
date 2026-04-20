import { NextResponse } from "next/server";
import { getBoard } from "@/lib/mock-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const board = getBoard(slug);

  if (!board) {
    return NextResponse.json({ message: "Board not found" }, { status: 404 });
  }

  return NextResponse.json(board);
}
