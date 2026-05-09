import { Metadata } from 'next';
import { TutorProfileViewModel } from '@/types/tutor-profile';
import { getTutorPath } from '@/lib/tutor-paths';
import { BusinessProfile, DEFAULT_BUSINESS_PROFILE } from '@/lib/business-profile';

export const siteConfig = {
  name: DEFAULT_BUSINESS_PROFILE.name,
  url: DEFAULT_BUSINESS_PROFILE.websiteUrl,
  description: DEFAULT_BUSINESS_PROFILE.description,
  ogImage: 'https://www.boardpefocus.in/og.jpg',
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
  icons = '/logo/logo.png',
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

function toAbsoluteAssetUrl(path?: string | null) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return absoluteUrl(path);
}

export function generateProfessionalServiceJsonLd(profile: BusinessProfile) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': absoluteUrl('/#business'),
    name: profile.name,
    url: getSiteUrl(),
    logo: toAbsoluteAssetUrl(profile.logoPath),
    image: toAbsoluteAssetUrl(profile.imagePath),
    description: profile.description,
    telephone: profile.phone,
    email: profile.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: profile.streetAddress,
      addressLocality: profile.addressLocality,
      addressRegion: profile.addressRegion,
      postalCode: profile.postalCode ?? undefined,
      addressCountry: profile.addressCountryCode,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: profile.phone,
        email: profile.email,
        areaServed: profile.addressCountryCode,
        availableLanguage: ['en', 'hi'],
      },
    ],
    areaServed: profile.areaServed,
    knowsAbout: [
      'CBSE home tutoring',
      'ICSE home tutoring',
      'ISC home tutoring',
      'IGCSE home tutoring',
      'IB tutoring',
      'Class 10 tutoring',
      'Class 12 tutoring',
    ],
  };

  if (profile.hasMapUrl) {
    schema.hasMap = profile.hasMapUrl;
  }

  if (profile.googleMapsUrl) {
    schema.sameAs = [profile.googleMapsUrl];
  }

  if (
    typeof profile.latitude === 'number' &&
    Number.isFinite(profile.latitude) &&
    typeof profile.longitude === 'number' &&
    Number.isFinite(profile.longitude)
  ) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: profile.latitude,
      longitude: profile.longitude,
    };
  }

  if (profile.openingHours && profile.openingHours.length > 0) {
    schema.openingHoursSpecification = profile.openingHours.map((row) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: row.daysOfWeek,
      opens: row.opens,
      closes: row.closes,
    }));
  }

  return schema;
}

export function generateOrganizationJsonLd(profile: BusinessProfile = DEFAULT_BUSINESS_PROFILE) {
  return generateProfessionalServiceJsonLd(profile);
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
  const visibleReviews = (tutor.reviews ?? []).filter(
    (review) => review.comment.trim().length > 0,
  );
  const ratedReviews = visibleReviews.filter((review) => review.rating > 0);
  const reviewAverage =
    ratedReviews.length > 0
      ? Number(
          (
            ratedReviews.reduce((sum, review) => sum + review.rating, 0) /
            ratedReviews.length
          ).toFixed(1),
        )
      : null;

  const schema: Record<string, unknown> = {
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
      '@type': 'ProfessionalService',
      name: DEFAULT_BUSINESS_PROFILE.name,
      url: getSiteUrl(),
    },
    knowsAbout,
  };

  if (reviewAverage !== null) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviewAverage,
      reviewCount: ratedReviews.length,
    };
  }

  if (visibleReviews.length > 0) {
    schema.review = visibleReviews.slice(0, 5).map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.parentName,
      },
      reviewBody: review.comment,
      itemReviewed: {
        '@type': 'Person',
        name: tutor.name,
      },
      reviewRating:
        review.rating > 0
          ? {
              '@type': 'Rating',
              ratingValue: review.rating,
              bestRating: 5,
              worstRating: 1,
            }
          : undefined,
    }));
  }

  return schema;
}
