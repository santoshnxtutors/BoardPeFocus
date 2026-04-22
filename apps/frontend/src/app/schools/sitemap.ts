import { MetadataRoute } from "next";
import {
  getAllSchoolAreaParams,
  getAllSchoolBoardParams,
  getAllSchoolClassParams,
  getAllSchoolParams,
  getAllSchoolSubjectParams,
} from "@/app/schools/_data/schools";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/schools",
    ...getAllSchoolParams().map(({ schoolSlug }) => `/schools/${schoolSlug}`),
    ...getAllSchoolBoardParams().map(({ schoolSlug, boardSlug }) => `/schools/${schoolSlug}/boards/${boardSlug}`),
    ...getAllSchoolClassParams().map(({ schoolSlug, classLevel }) => `/schools/${schoolSlug}/classes/${classLevel}`),
    ...getAllSchoolSubjectParams().map(
      ({ schoolSlug, subjectSlug }) => `/schools/${schoolSlug}/subjects/${subjectSlug}`,
    ),
    ...getAllSchoolAreaParams().map(({ schoolSlug, areaSlug }) => `/schools/${schoolSlug}/areas/${areaSlug}`),
    ...getAllSchoolParams().map(({ schoolSlug }) => `/schools/${schoolSlug}/faq`),
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/schools" ? 0.95 : 0.8,
  }));
}
