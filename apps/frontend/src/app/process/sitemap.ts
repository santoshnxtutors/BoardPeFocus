import { MetadataRoute } from "next";
import { getAllProcessParams } from "@/app/process/_data/process";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/process", ...getAllProcessParams().map(({ slug }) => `/process/${slug}`)];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/process" ? 0.85 : 0.72,
  }));
}
