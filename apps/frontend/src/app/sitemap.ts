import { MetadataRoute } from 'next';
import {
  getAllBoardParams,
  getAllClassParams,
  getAllSubjectParams,
  getBoardClassPath,
  getBoardPath,
  getBoardSubjectPath,
} from '@/app/boards/_data/boards';
import { getAllClassHubParams, getClassHubPath } from '@/app/classes/_data/classes';
import { getAllFaqTopicParams } from '@/app/faqs/_data/topics';
import { getAllProcessParams } from '@/app/process/_data/process';
import { getAllResourceArticleParams } from '@/app/resources/_data/articles';
import { getAllResourceCategoryParams } from '@/app/resources/_data/catalog';
import {
  getAllSchoolAreaParams,
  getAllSchoolBoardParams,
  getAllSchoolClassParams,
  getAllSchoolParams,
  getAllSchoolSubjectParams,
} from '@/app/schools/_data/schools';
import { siteConfig } from '@/lib/seo';
import { getTutorPath } from '@/lib/tutor-paths';
import { areaClusters } from '@/data/areas';
import { mockBoards, mockSchools, mockSectors, mockSubjects, mockTutors } from '@/data/mock';
import { getGeneratedSitemapRoutes } from '@/lib/generated-pages';

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
    '/boards',
    '/classes',
    '/schools',
    '/resources',
    '/result',
    '/process',
    '/support',
    '/site-map',
    '/gurugram',
    '/gurgaon-area',
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
  const boardsHubRoutes = getAllBoardParams().map(({ board }) => getBoardPath(board));
  const classHubRoutes = getAllClassHubParams().map(({ classLevel }) => getClassHubPath(classLevel));
  const faqTopicRoutes = getAllFaqTopicParams().map(({ topic }) => `/faqs/${topic}`);
  const processRoutes = getAllProcessParams().map(({ slug }) => `/process/${slug}`);
  const schoolHubRoutes = getAllSchoolParams().map(({ schoolSlug }) => `/schools/${schoolSlug}`);
  const schoolBoardHubRoutes = getAllSchoolBoardParams().map(
    ({ schoolSlug, boardSlug }) => `/schools/${schoolSlug}/boards/${boardSlug}`,
  );
  const schoolSubjectHubRoutes = getAllSchoolSubjectParams().map(
    ({ schoolSlug, subjectSlug }) => `/schools/${schoolSlug}/subjects/${subjectSlug}`,
  );
  const schoolClassHubRoutes = getAllSchoolClassParams().map(
    ({ schoolSlug, classLevel }) => `/schools/${schoolSlug}/classes/${classLevel}`,
  );
  const schoolAreaHubRoutes = getAllSchoolAreaParams().map(
    ({ schoolSlug, areaSlug }) => `/schools/${schoolSlug}/areas/${areaSlug}`,
  );
  const schoolFaqRoutes = getAllSchoolParams().map(({ schoolSlug }) => `/schools/${schoolSlug}/faq`);
  const resourceCategoryRoutes = getAllResourceCategoryParams().map(({ category }) => `/resources/${category}`);
  const resourceArticleRoutes = getAllResourceArticleParams().map(
    ({ category, slug }) => `/resources/${category}/${slug}`,
  );
  const boardsClassRoutes = getAllClassParams().map(({ board, classLevel }) =>
    getBoardClassPath(board, classLevel),
  );
  const boardsSubjectRoutes = getAllSubjectParams().map(({ board, classLevel, subjectSlug }) =>
    getBoardSubjectPath(board, classLevel, subjectSlug),
  );
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
  const areaClusterRoutes = areaClusters.map((cluster) => `/gurgaon-area/${cluster.slug}`);
  const societyRoutes = liveSectors.flatMap((sector) =>
    ('societies' in sector && Array.isArray(sector.societies) ? sector.societies : []).map(
      (society) => `/gurugram/sectors/${sector.slug}/${society.toLowerCase().replace(/\s+/g, '-')}`,
    ),
  );
  const tutorRoutes = liveTutors.map((tutor) => getTutorPath(tutor.slug));
  const manifestRoutes = getGeneratedSitemapRoutes();

  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...boardRoutes,
      ...boardsHubRoutes,
      ...classHubRoutes,
      ...faqTopicRoutes,
      ...processRoutes,
      ...schoolHubRoutes,
      ...schoolBoardHubRoutes,
      ...schoolSubjectHubRoutes,
      ...schoolClassHubRoutes,
      ...schoolAreaHubRoutes,
      ...schoolFaqRoutes,
      ...resourceCategoryRoutes,
      ...resourceArticleRoutes,
      ...boardsClassRoutes,
      ...boardsSubjectRoutes,
      ...boardSubjectRoutes,
      ...schoolRoutes,
      ...schoolBoardRoutes,
      ...schoolBoardSubjectRoutes,
      ...sectorRoutes,
      ...areaClusterRoutes,
      ...societyRoutes,
      ...tutorRoutes,
      ...manifestRoutes,
    ]),
  );

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : route.startsWith('/gurugram/') ? 0.9 : 0.7,
  }));
}
