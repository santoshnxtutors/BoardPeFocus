import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;

  // In production, fetch dynamic routes from the backend here
  const routes = [
    '',
    '/gurugram',
    '/gurugram/cbse',
    '/search',
    '/contact',
    '/about',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));
}
