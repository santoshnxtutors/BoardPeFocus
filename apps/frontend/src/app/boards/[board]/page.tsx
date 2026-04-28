import { redirect } from "next/navigation";
import {
  generateStaticParams,
  getBoardPageMetadata,
} from "./page-content";
import { getBoardPath } from "@/app/boards/_data/boards";

interface PageProps {
  params: Promise<{ board: string }>;
}

export { generateStaticParams };

export async function generateMetadata({ params }: PageProps) {
  const { board } = await params;
  return getBoardPageMetadata(board);
}

export default async function BoardPage({ params }: PageProps) {
  const { board } = await params;
  redirect(getBoardPath(board));
}
