import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/boards/sitemap.xml`,
      `${baseUrl}/classes/sitemap.xml`,
      `${baseUrl}/schools/sitemap.xml`,
      `${baseUrl}/gurgaon-area/sitemap.xml`,
      `${baseUrl}/resources/sitemap.xml`,
      `${baseUrl}/process/sitemap.xml`,
      `${baseUrl}/faqs/sitemap.xml`,
      `${baseUrl}/result/sitemap.xml`,
    ],
    host: baseUrl,
  };
}
