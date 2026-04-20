import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';
import { mockBoards, mockSchools, mockSectors, mockSubjects, mockTutors } from '@/data/mock';

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json() as Promise<T>;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:3001/api';
  const apiV1Base = apiBaseUrl.endsWith('/v1') ? apiBaseUrl : `${apiBaseUrl}/v1`;

  const staticRoutes = [
    '',
    '/gurugram',
    '/contact',
    '/about',
    '/faqs',
    '/privacy-policy',
    '/terms',
    '/transparency',
  ];

  const [boards, schools, locations, tutors] = await Promise.all([
    getJson<Array<{ slug: string }>>(`${apiV1Base}/public/boards`),
    getJson<Array<{ slug: string }>>(`${apiV1Base}/content/schools`),
    getJson<Array<{ slug: string; type: 'sector' | 'society' }>>(
      `${apiV1Base}/content/locations`,
    ),
    getJson<Array<{ slug: string }>>(`${apiV1Base}/public/tutors`),
  ]);

  const liveBoards = boards ?? mockBoards;
  const liveSchools = schools ?? mockSchools;
  const liveSectors =
    locations?.filter((location) => location.type === 'sector') ?? mockSectors;
  const liveTutors = tutors ?? mockTutors;
  const liveSubjects = mockSubjects;
  const boardSeoInventory = mockBoards;
  const tutorSeoInventory = mockTutors;

  const boardRoutes = liveBoards.map((board) => `/gurugram/${board.slug}`);
  const boardSubjectRoutes = boardSeoInventory.flatMap((board) =>
    liveSubjects
      .filter((subject) =>
        tutorSeoInventory.some(
          (tutor) =>
            tutor.subjects.some((tutorSubject) => tutorSubject.toLowerCase() === subject.name.toLowerCase()) &&
            tutor.boards.some(
              (tutorBoard) =>
                tutorBoard.toLowerCase() === board.slug.toLowerCase() ||
                tutorBoard.toLowerCase() === board.name.toLowerCase(),
            ),
        ),
      )
      .map((subject) => `/gurugram/${board.slug}/${subject.slug}`),
  );
  const schoolRoutes = liveSchools.map((school) => `/gurugram/schools/${school.slug}`);
  const schoolBoardRoutes = liveSchools.flatMap((school) =>
    ('boards' in school && Array.isArray(school.boards) ? school.boards : []).flatMap((schoolBoard) => {
      const board = boardSeoInventory.find(
        (item) => item.name.toLowerCase() === schoolBoard.toLowerCase(),
      );

      return board ? [`/gurugram/schools/${school.slug}/${board.slug}`] : [];
    }),
  );
  const schoolBoardSubjectRoutes = liveSchools.flatMap((school) =>
    ('boards' in school && Array.isArray(school.boards) ? school.boards : []).flatMap((schoolBoard) => {
      const board = boardSeoInventory.find((item) => item.name.toLowerCase() === schoolBoard.toLowerCase());

      if (!board) {
        return [];
      }

      return liveSubjects
        .filter((subject) =>
          tutorSeoInventory.some(
            (tutor) =>
              tutor.subjects.some((tutorSubject) => tutorSubject.toLowerCase() === subject.name.toLowerCase()) &&
              tutor.boards.some(
                (tutorBoard) =>
                  tutorBoard.toLowerCase() === board.slug.toLowerCase() ||
                  tutorBoard.toLowerCase() === board.name.toLowerCase(),
              ),
          ),
        )
        .map((subject) => `/gurugram/schools/${school.slug}/${board.slug}/${subject.slug}`);
    }),
  );
  const sectorRoutes = liveSectors.map((sector) => `/gurugram/sectors/${sector.slug}`);
  const societyRoutes = liveSectors.flatMap((sector) =>
    ('societies' in sector && Array.isArray(sector.societies) ? sector.societies : []).map(
      (society) => `/gurugram/sectors/${sector.slug}/${society.toLowerCase().replace(/\s+/g, '-')}`,
    ),
  );
  const tutorRoutes = liveTutors.map((tutor) => `/tutors/${tutor.slug}`);

  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...boardRoutes,
      ...boardSubjectRoutes,
      ...schoolRoutes,
      ...schoolBoardRoutes,
      ...schoolBoardSubjectRoutes,
      ...sectorRoutes,
      ...societyRoutes,
      ...tutorRoutes,
    ]),
  );

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : route.startsWith('/gurugram/') ? 0.9 : 0.7,
  }));
}
