import { MetadataRoute } from "next";
import { getAllBoardParams, getAllClassParams, getAllSubjectParams } from "@/app/boards/_data/boards";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/boards",
    ...getAllBoardParams().map(({ board }) => `/boards/${board}`),
    ...getAllClassParams().map(({ board, classLevel }) => `/boards/${board}/${classLevel}`),
    ...getAllSubjectParams().map(
      ({ board, classLevel, subjectSlug }) => `/boards/${board}/${classLevel}/${subjectSlug}`,
    ),
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/boards" ? 0.95 : 0.8,
  }));
}
