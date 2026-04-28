import { Metadata } from 'next';

export const siteConfig = {
  name: 'BoardPeFocus',
  url: 'https://www.boardpefocus.in',
  description: 'Specialized home tutoring for CBSE, ICSE, IGCSE, and IB boards in Gurugram. We aim to help students target 95%+.',
  ogImage: 'https://www.boardpefocus.in/og.jpg',
  links: {
    twitter: 'https://twitter.com/boardpefocus',
    github: 'https://github.com/boardpefocus',
  },
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@boardpefocus',
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateTutorJsonLd(tutor: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: tutor.name,
    jobTitle: 'Home Tutor',
    description: tutor.about,
    image: tutor.photoUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tutor.rating,
      reviewCount: tutor.studentsTaught,
    },
  };
}
