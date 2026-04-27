import { MetadataRoute } from "next";
import { mockTutors } from "@/data/mock";
import { absoluteUrl } from "@/lib/seo";
import { getTutorPath } from "@/lib/tutor-paths";

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json() as Promise<T>;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:3001/api";
  const apiV1Base = apiBaseUrl.endsWith("/v1") ? apiBaseUrl : `${apiBaseUrl}/v1`;
  const tutors = await getJson<Array<{ slug: string }>>(`${apiV1Base}/public/tutors`);
  const liveTutors = tutors ?? mockTutors;

  return liveTutors.map((tutor) => ({
    url: absoluteUrl(getTutorPath(tutor.slug)),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.72,
  }));
}
