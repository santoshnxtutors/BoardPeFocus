import { MetadataRoute } from "next";
import { areaClusters } from "@/data/areas";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/gurgaon-area", ...areaClusters.map((cluster) => `/gurgaon-area/${cluster.slug}`)];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/gurgaon-area" ? 0.9 : 0.78,
  }));
}
