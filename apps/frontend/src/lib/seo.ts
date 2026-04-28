import { Metadata } from 'next';
import { TutorProfileViewModel } from '@/types/tutor-profile';
import { getTutorPath } from '@/lib/tutor-paths';

export const siteConfig = {
  name: 'BoardPeFocus',
  url: 'https://www.boardpefocus.in',
  description: 'Specialized home tutoring for CBSE, ICSE, IGCSE, and IB boards in Gurugram. We aim to help students target 95%+.',
  ogImage: 'https://www.boardpefocus.in/og.jpg',
  contact: {
    phone: '+91 87963 67754',
    email: 'boardpefocus@gmail.com',
    address: {
      streetAddress: '1st Floor, 497 Housing Board Colony, Sector 51',
      addressLocality: 'Gurgaon',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
  },
  links: {
    twitter: 'https://twitter.com/boardpefocus',
    github: 'https://github.com/boardpefocus',
  },
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;
}

export function absoluteUrl(pathname = '/') {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return new URL(path, getSiteUrl()).toString();
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/favicon.ico',
  noIndex = false,
  pathname,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  pathname?: string;
} = {}): Metadata {
  const canonicalUrl = pathname ? absoluteUrl(pathname) : undefined;

  return {
    title,
    description,
    applicationName: siteConfig.name,
    metadataBase: new URL(getSiteUrl()),
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'en_IN',
      type: 'website',
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
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
          },
        },
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

export function generateFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    url: getSiteUrl(),
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.contact.address,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    ],
    areaServed: 'Gurugram, Haryana, India',
    knowsAbout: [
      'CBSE home tutoring',
      'ICSE home tutoring',
      'IGCSE home tutoring',
      'IB tutoring',
      'Class 10 tutoring',
      'Class 12 tutoring',
    ],
    sameAs: [siteConfig.links.twitter],
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: getSiteUrl(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/search')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateTutorJsonLd(tutor: TutorProfileViewModel) {
  const boardNames = (tutor.boards ?? [])
    .map((board) => (typeof board === 'string' ? board : board.board?.name))
    .filter(Boolean);
  const knowsAbout = [...boardNames, ...(tutor.subjects ?? [])];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: tutor.name,
    jobTitle: 'Home Tutor',
    description: tutor.about,
    image: tutor.photoUrl,
    url: absoluteUrl(getTutorPath(tutor.slug ?? '')),
    homeLocation: {
      '@type': 'Place',
      name: 'Gurugram, Haryana, India',
    },
    worksFor: {
      '@type': 'EducationalOrganization',
      name: siteConfig.name,
      url: getSiteUrl(),
    },
    knowsAbout,
  };
}
