import { MetadataRoute } from "next";
import { getAllClassHubParams } from "@/app/classes/_data/classes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/classes", ...getAllClassHubParams().map(({ classLevel }) => `/classes/${classLevel}`)];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/classes" ? 0.9 : 0.8,
  }));
}
