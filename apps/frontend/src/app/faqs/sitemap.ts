import { MetadataRoute } from "next";
import { getAllFaqTopicParams } from "@/app/faqs/_data/topics";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/faqs", ...getAllFaqTopicParams().map(({ topic }) => `/faqs/${topic}`)];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/faqs" ? 0.8 : 0.68,
  }));
}
