import { redirect } from "next/navigation";
import {
  generateStaticParams,
  getBoardClassPageMetadata,
} from "./page-content";
import { getBoardClassPath } from "@/app/boards/_data/boards";

interface PageProps {
  params: Promise<{ board: string; classLevel: string }>;
}

export { generateStaticParams };

export async function generateMetadata({ params }: PageProps) {
  const { board, classLevel } = await params;
  return getBoardClassPageMetadata(board, classLevel);
}

export default async function BoardClassPage({ params }: PageProps) {
  const { board, classLevel } = await params;
  redirect(getBoardClassPath(board, classLevel));
}
