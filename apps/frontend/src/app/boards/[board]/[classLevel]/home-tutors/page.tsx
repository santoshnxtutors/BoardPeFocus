import {
  generateStaticParams,
  getBoardClassPageMetadata,
  renderBoardClassPage,
} from "../page-content";

interface PageProps {
  params: Promise<{ board: string; classLevel: string }>;
}

export { generateStaticParams };

export async function generateMetadata({ params }: PageProps) {
  const { board, classLevel } = await params;
  return getBoardClassPageMetadata(board, classLevel);
}

export default async function CanonicalBoardClassPage({ params }: PageProps) {
  const { board, classLevel } = await params;
  return renderBoardClassPage(board, classLevel);
}
