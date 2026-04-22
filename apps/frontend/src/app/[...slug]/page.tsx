import { notFound } from "next/navigation";
import { GeneratedManifestPage } from "@/components/generated-pages/GeneratedManifestPage";
import {
  buildGeneratedMetadata,
  getCatchAllManifestParams,
  getManifestPage,
  isCatchAllManifestPath,
} from "@/lib/generated-pages";
import { constructMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export function generateStaticParams() {
  return getCatchAllManifestParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`.replace(/\/+/g, "/");
  const record = getManifestPage(pathname);

  if (!record || !isCatchAllManifestPath(pathname)) {
    return constructMetadata({ title: "Page Not Found", noIndex: true });
  }

  return constructMetadata(buildGeneratedMetadata(record));
}

export default async function ManifestCatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`.replace(/\/+/g, "/");
  const record = getManifestPage(pathname);

  if (!record || !isCatchAllManifestPath(pathname)) {
    notFound();
  }

  return <GeneratedManifestPage record={record} />;
}
