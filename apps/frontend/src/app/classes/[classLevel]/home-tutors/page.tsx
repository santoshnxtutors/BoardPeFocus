import {
  generateStaticParams,
  getClassHubPageMetadata,
  renderClassHubDetailPage,
} from "../page-content";

interface PageProps {
  params: Promise<{ classLevel: string }>;
}

export { generateStaticParams };

export async function generateMetadata({ params }: PageProps) {
  const { classLevel } = await params;
  return getClassHubPageMetadata(classLevel);
}

export default async function CanonicalClassHubPage({ params }: PageProps) {
  const { classLevel } = await params;
  return renderClassHubDetailPage(classLevel);
}
