import { MetadataRoute } from "next";
import {
  getAllBoardParams,
  getAllClassParams,
  getAllSubjectParams,
  getBoardClassPath,
  getBoardPath,
  getBoardSubjectPath,
} from "@/app/boards/_data/boards";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/boards",
    ...getAllBoardParams().map(({ board }) => getBoardPath(board)),
    ...getAllClassParams().map(({ board, classLevel }) => getBoardClassPath(board, classLevel)),
    ...getAllSubjectParams().map(({ board, classLevel, subjectSlug }) =>
      getBoardSubjectPath(board, classLevel, subjectSlug),
    ),
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/boards" ? 0.95 : 0.8,
  }));
}
