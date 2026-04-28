import { redirect } from "next/navigation";
import {
  generateStaticParams,
  getClassHubPageMetadata,
} from "./page-content";
import { getClassHubPath } from "@/app/classes/_data/classes";

interface PageProps {
  params: Promise<{ classLevel: string }>;
}

export { generateStaticParams };

export async function generateMetadata({ params }: PageProps) {
  const { classLevel } = await params;
  return getClassHubPageMetadata(classLevel);
}

export default async function ClassHubDetailPage({ params }: PageProps) {
  const { classLevel } = await params;
  redirect(getClassHubPath(classLevel));
}
