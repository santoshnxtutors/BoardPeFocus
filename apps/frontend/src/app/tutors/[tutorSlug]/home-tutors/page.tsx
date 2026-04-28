import {
  generateStaticParams,
  getTutorPageMetadata,
  renderTutorProfilePage,
} from "../page-content";

interface PageProps {
  params: Promise<{ tutorSlug: string }>;
}

export { generateStaticParams };

export async function generateMetadata({ params }: PageProps) {
  const { tutorSlug } = await params;
  return getTutorPageMetadata(tutorSlug);
}

export default async function CanonicalTutorProfilePage({ params }: PageProps) {
  const { tutorSlug } = await params;
  return renderTutorProfilePage(tutorSlug);
}
