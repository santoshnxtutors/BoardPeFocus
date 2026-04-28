import { permanentRedirect } from "next/navigation";
import {
  generateStaticParams,
  getTutorPageMetadata,
} from "./page-content";
import { getTutorPath } from "@/lib/tutor-paths";

interface PageProps {
  params: Promise<{ tutorSlug: string }>;
}

export { generateStaticParams };

export async function generateMetadata({ params }: PageProps) {
  const { tutorSlug } = await params;
  return getTutorPageMetadata(tutorSlug);
}

export default async function TutorProfilePage({ params }: PageProps) {
  const { tutorSlug } = await params;
  permanentRedirect(getTutorPath(tutorSlug));
}
