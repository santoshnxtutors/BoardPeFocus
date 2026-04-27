import { generateStaticParams, getBoardPageMetadata, renderBoardPage } from "../page";

interface PageProps {
  params: Promise<{ board: string }>;
}

export { generateStaticParams };

export async function generateMetadata({ params }: PageProps) {
  const { board } = await params;
  return getBoardPageMetadata(board);
}

export default async function CanonicalBoardPage({ params }: PageProps) {
  const { board } = await params;
  return renderBoardPage(board);
}
