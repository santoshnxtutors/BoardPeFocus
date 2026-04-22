import { MetadataRoute } from "next";
import { getAllResourceArticleParams } from "@/app/resources/_data/articles";
import { getAllResourceCategoryParams } from "@/app/resources/_data/catalog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/resources",
    ...getAllResourceCategoryParams().map(({ category }) => `/resources/${category}`),
    ...getAllResourceArticleParams().map(({ category, slug }) => `/resources/${category}/${slug}`),
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/resources" ? 0.9 : 0.75,
  }));
}
