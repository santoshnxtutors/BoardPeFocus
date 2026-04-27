import pageManifest from "@/data/generated/page-manifest.json";
import {
  getAllBoardParams,
  getAllClassParams,
  getAllSubjectParams,
  getBoardClassPath,
  getBoardPath,
  getLegacyBoardClassPath,
  getLegacyBoardPath,
} from "@/app/boards/_data/boards";
import { getAllClassHubParams, getClassHubPath, getLegacyClassHubPath } from "@/app/classes/_data/classes";
import { getAllFaqTopicParams } from "@/app/faqs/_data/topics";
import { getAllProcessParams } from "@/app/process/_data/process";
import { getAllResourceArticleParams } from "@/app/resources/_data/articles";
import { getAllResourceCategoryParams } from "@/app/resources/_data/catalog";
import {
  getAllSchoolAreaParams,
  getAllSchoolBoardParams,
  getAllSchoolClassParams,
  getAllSchoolParams,
  getAllSchoolSubjectParams,
} from "@/app/schools/_data/schools";
import { areaClusters, sectorDetails } from "@/data/areas";
import { mockBoards, mockSchools, mockSubjects, mockTutors } from "@/data/mock";
import { absoluteUrl } from "@/lib/seo";
import { getLegacyTutorPath, getTutorPath } from "@/lib/tutor-paths";
import {
  getCanonicalCommercialPath,
  getCommercialManifestTitle,
  normalizeUrlPathname,
} from "@/lib/url-policy";

export interface ManifestPageRecord {
  id: number;
  publishingWave: string | null;
  url: string | null;
  path: string | null;
  normalizedPath: string;
  routeFamily: string;
  category: string | null;
  tier: string | null;
  priority: string | null;
  board: string | null;
  classLabel: string | null;
  subject: string | null;
  locationType: string | null;
  locationName: string | null;
  primaryKeyword: string | null;
  searchIntent: string | null;
  wordCountTarget: number | null;
  indexationAdvice: string | null;
  parentHub: string | null;
  links: Array<string | null>;
  suggestedSchema: string | null;
  contentAngle: string | null;
  uniquenessBlock: string | null;
  sourceUrl: string | null;
}

export interface GeneratedLinkCard {
  title: string;
  href: string;
  description: string;
}

export interface GeneratedSection {
  title: string;
  paragraphs: string[];
  bullets: string[];
}

export interface GeneratedFaqItem {
  question: string;
  answer: string;
}

const manifest = pageManifest as ManifestPageRecord[];

export function normalizeManifestPath(pathname: string) {
  return normalizeUrlPathname(pathname);
}

export function getManifestRoutePath(record: ManifestPageRecord) {
  return getCanonicalCommercialPath(record);
}

function humanizeSlug(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function titleCase(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function splitUniquenessBlock(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getSegments(pathname: string) {
  return pathname.split("/").filter(Boolean);
}

function getStaticRoutes() {
  return [
    "/",
    "/about",
    "/boards",
    "/blog",
    "/classes",
    "/contact",
    "/faqs",
    "/gurgaon-area",
    "/gurugram",
    "/privacy-policy",
    "/process",
    "/resources",
    "/result",
    "/results",
    "/search",
    "/site-map",
    "/support",
    "/schools",
    "/terms",
    "/transparency",
  ];
}

function buildExistingExactRouteSet() {
  const routes = new Set(getStaticRoutes().map((route) => normalizeManifestPath(route)));

  for (const { board } of getAllBoardParams()) {
    routes.add(getBoardPath(board));
    routes.add(getLegacyBoardPath(board));
  }

  for (const { board, classLevel } of getAllClassParams()) {
    routes.add(getBoardClassPath(board, classLevel));
    routes.add(getLegacyBoardClassPath(board, classLevel));
  }

  for (const { board, classLevel, subjectSlug } of getAllSubjectParams()) {
    routes.add(`/boards/${board}/${classLevel}/${subjectSlug}`);
  }

  for (const { classLevel } of getAllClassHubParams()) {
    routes.add(getClassHubPath(classLevel));
    routes.add(getLegacyClassHubPath(classLevel));
  }

  for (const { topic } of getAllFaqTopicParams()) {
    routes.add(`/faqs/${topic}`);
  }

  for (const { slug } of getAllProcessParams()) {
    routes.add(`/process/${slug}`);
  }

  for (const { category } of getAllResourceCategoryParams()) {
    routes.add(`/resources/${category}`);
  }

  for (const { category, slug } of getAllResourceArticleParams()) {
    routes.add(`/resources/${category}/${slug}`);
  }

  for (const { schoolSlug } of getAllSchoolParams()) {
    routes.add(`/schools/${schoolSlug}`);
    routes.add(`/schools/${schoolSlug}/faq`);
  }

  for (const { schoolSlug, boardSlug } of getAllSchoolBoardParams()) {
    routes.add(`/schools/${schoolSlug}/boards/${boardSlug}`);
  }

  for (const { schoolSlug, subjectSlug } of getAllSchoolSubjectParams()) {
    routes.add(`/schools/${schoolSlug}/subjects/${subjectSlug}`);
  }

  for (const { schoolSlug, classLevel } of getAllSchoolClassParams()) {
    routes.add(`/schools/${schoolSlug}/classes/${classLevel}`);
  }

  for (const { schoolSlug, areaSlug } of getAllSchoolAreaParams()) {
    routes.add(`/schools/${schoolSlug}/areas/${areaSlug}`);
  }

  for (const cluster of areaClusters) {
    routes.add(`/gurgaon-area/${cluster.slug}`);
  }

  for (const sector of sectorDetails) {
    routes.add(`/gurugram/sectors/${sector.slug}`);
    for (const society of sector.societies) {
      routes.add(`/gurugram/sectors/${sector.slug}/${society.slug}`);
    }
  }

  for (const board of mockBoards) {
    routes.add(`/gurugram/${board.slug}`);
    for (const subject of mockSubjects) {
      routes.add(`/gurugram/${board.slug}/${subject.slug}`);
    }
  }

  for (const school of mockSchools) {
    routes.add(`/gurugram/schools/${school.slug}`);
    for (const board of mockBoards) {
      routes.add(`/gurugram/schools/${school.slug}/${board.slug}`);
      for (const subject of mockSubjects) {
        routes.add(`/gurugram/schools/${school.slug}/${board.slug}/${subject.slug}`);
      }
    }
  }

  for (const tutor of mockTutors) {
    routes.add(getTutorPath(tutor.slug));
    routes.add(getLegacyTutorPath(tutor.slug));
  }

  return routes;
}

const existingExactRoutes = buildExistingExactRouteSet();
const manifestByPath = new Map<string, ManifestPageRecord>();

for (const record of manifest) {
  manifestByPath.set(record.normalizedPath, record);
  manifestByPath.set(getManifestRoutePath(record), record);
}

export function getManifestPage(pathname: string) {
  return manifestByPath.get(normalizeManifestPath(pathname)) ?? null;
}

export function getManifestRedirectTarget(pathname: string) {
  const normalized = normalizeManifestPath(pathname);
  const record = getManifestPage(normalized);

  if (!record) {
    return null;
  }

  const canonicalPath = getManifestRoutePath(record);
  return canonicalPath !== normalized ? canonicalPath : null;
}

export function getAllManifestPages() {
  return manifest;
}

export function isExistingExactRoute(pathname: string) {
  return existingExactRoutes.has(normalizeManifestPath(pathname));
}

function isPathAssignedToBoardFallback(pathname: string) {
  const segments = getSegments(pathname);
  return segments[0] === "boards" && segments.length === 4 && !isExistingExactRoute(pathname);
}

function isPathAssignedToClassFallback(pathname: string) {
  const segments = getSegments(pathname);
  return segments[0] === "classes" && segments.length === 2 && !isExistingExactRoute(pathname);
}

function isPathAssignedToGurugramFallback(pathname: string) {
  const segments = getSegments(pathname);

  if (segments[0] !== "gurugram" || segments.length !== 2 || isExistingExactRoute(pathname)) {
    return false;
  }

  return ["home-tuition", "home-tutors", "premium-schools", "premium-societies"].includes(segments[1]);
}

function isPathAssignedToSectorFallback(pathname: string) {
  const segments = getSegments(pathname);
  return segments[0] === "gurugram" && segments[1] === "sectors" && segments.length === 4 && !isExistingExactRoute(pathname);
}

function isPathAssignedToSchoolServiceFallback(pathname: string) {
  const segments = getSegments(pathname);
  return segments[0] === "gurugram" && segments[1] === "schools" && segments.length === 4 && !isExistingExactRoute(pathname);
}

function isAssignedToCatchAll(pathname: string) {
  if (normalizeManifestPath(pathname) === "/faq") {
    return false;
  }

  return Boolean(
    getManifestPage(pathname) &&
      !isExistingExactRoute(pathname) &&
      !isPathAssignedToBoardFallback(pathname) &&
      !isPathAssignedToClassFallback(pathname) &&
      !isPathAssignedToGurugramFallback(pathname) &&
      !isPathAssignedToSectorFallback(pathname) &&
      !isPathAssignedToSchoolServiceFallback(pathname),
  );
}

export function getBoardSubjectFallbackParams() {
  return manifest
    .filter((record) => isPathAssignedToBoardFallback(getManifestRoutePath(record)))
    .map((record) => {
      const [board, classLevel, subjectSlug] = getSegments(getManifestRoutePath(record)).slice(1);

      return {
        board,
        classLevel,
        subjectSlug,
      };
    });
}

export function getClassFallbackParams() {
  return manifest
    .filter((record) => isPathAssignedToClassFallback(getManifestRoutePath(record)))
    .map((record) => ({
      classLevel: getSegments(getManifestRoutePath(record))[1],
    }));
}

export function getGurugramFallbackParams() {
  return manifest
    .filter((record) => isPathAssignedToGurugramFallback(getManifestRoutePath(record)))
    .map((record) => ({
      board: getSegments(getManifestRoutePath(record))[1],
    }));
}

export function getSectorFallbackParams() {
  return manifest
    .filter((record) => isPathAssignedToSectorFallback(getManifestRoutePath(record)))
    .map((record) => {
      const [, , sector, society] = getSegments(getManifestRoutePath(record));

      return {
        sector,
        society,
      };
    });
}

export function getSchoolServiceFallbackParams() {
  return manifest
    .filter((record) => isPathAssignedToSchoolServiceFallback(getManifestRoutePath(record)))
    .map((record) => {
      const [, , schoolSlug, board] = getSegments(getManifestRoutePath(record));

      return {
        schoolSlug,
        board,
      };
    });
}

export function getCatchAllManifestParams() {
  return manifest
    .filter((record) => isAssignedToCatchAll(getManifestRoutePath(record)))
    .map((record) => ({
      slug: getSegments(getManifestRoutePath(record)),
    }));
}

export function isCatchAllManifestPath(pathname: string) {
  return isAssignedToCatchAll(normalizeManifestPath(pathname));
}

export function isIndexableManifestPage(record: ManifestPageRecord) {
  const advice = record.indexationAdvice?.toLowerCase().trim();

  if (!advice) {
    return true;
  }

  if (advice.includes("noindex") || advice.includes("no index")) {
    return false;
  }

  if (advice.includes("after")) {
    return false;
  }

  return advice.startsWith("index");
}

export function getGeneratedSitemapRoutes() {
  const routes = manifest
    .filter((record) => isIndexableManifestPage(record))
    .map((record) => getManifestRoutePath(record))
    .filter((route) => !isExistingExactRoute(route) && route !== "/faq");

  return Array.from(new Set(routes));
}

function getBadgeLabel(record: ManifestPageRecord) {
  const category = record.category?.replace(/_/g, " ");
  const intent = record.searchIntent?.replace(/-/g, " ");
  return [titleCase(category), titleCase(intent)].filter(Boolean).join(" · ");
}

function buildPrimaryDescription(record: ManifestPageRecord) {
  if (record.contentAngle) {
    return record.contentAngle;
  }

  const keyword = getManifestPageTitle(record);
  const board = record.board?.toUpperCase();
  const classLabel = record.classLabel;
  const subject = titleCase(record.subject);
  const location = record.locationName;

  const context = [board, classLabel, subject, location].filter(Boolean).join(" · ");

  if (context) {
    return `${keyword} built for ${context}, aligned to the existing BoardPeFocus path, internal-linking structure, and premium tutoring positioning.`;
  }

  return `${keyword} built to fit the existing BoardPeFocus design system, route structure, and SEO flow without duplicating completed pages.`;
}

export function getManifestPageTitle(record: ManifestPageRecord) {
  const fallbackTitle = humanizeSlug(getSegments(getManifestRoutePath(record)).slice(-1)[0] ?? "Page");
  return getCommercialManifestTitle(record, fallbackTitle);
}

export function getManifestMetaDescription(record: ManifestPageRecord) {
  const description = buildPrimaryDescription(record);

  if (description.length <= 158) {
    return description;
  }

  return `${description.slice(0, 155).trimEnd()}...`;
}

export function buildGeneratedMetadata(record: ManifestPageRecord) {
  return {
    title: `${getManifestPageTitle(record)} | BoardPeFocus`,
    description: getManifestMetaDescription(record),
    pathname: getManifestRoutePath(record),
    noIndex: !isIndexableManifestPage(record),
  };
}

function resolveManifestLink(value: string | null) {
  if (!value) {
    return null;
  }

  const normalized = normalizeManifestPath(value.replace(/^https?:\/\/[^/]+/i, ""));

  if (normalized === "/faq" && isExistingExactRoute("/faqs")) {
    return "/faqs";
  }

  const manifestRecord = getManifestPage(normalized);
  if (manifestRecord) {
    return getManifestRoutePath(manifestRecord);
  }

  if (isExistingExactRoute(normalized)) {
    return normalized;
  }

  return null;
}

function makeLinkTitle(pathname: string) {
  const segments = getSegments(pathname);

  if (!segments.length) {
    return "Home";
  }

  return humanizeSlug(segments[segments.length - 1]);
}

function makeLinkDescription(record: ManifestPageRecord, pathname: string) {
  if (pathname === getManifestRoutePath(record)) {
    return "Current page";
  }

  const target = getManifestPage(pathname);
  if (target?.contentAngle) {
    return target.contentAngle;
  }

  return `Continue into ${makeLinkTitle(pathname)} within the BoardPeFocus journey.`;
}

export function getManifestInternalLinks(record: ManifestPageRecord) {
  const rawLinks = [record.parentHub, ...record.links].map(resolveManifestLink);
  const deduped = Array.from(new Set(rawLinks.filter(Boolean))) as string[];
  const currentPath = getManifestRoutePath(record);

  return deduped
    .filter((href) => href !== currentPath)
    .slice(0, 6)
    .map((href) => ({
      title: makeLinkTitle(href),
      href,
      description: makeLinkDescription(record, href),
    }));
}

function findRelatedManifestPages(record: ManifestPageRecord) {
  const matches = manifest.filter((candidate) => {
    if (candidate.normalizedPath === record.normalizedPath) {
      return false;
    }

    if (record.board && candidate.board === record.board) {
      return true;
    }

    if (record.classLabel && candidate.classLabel === record.classLabel) {
      return true;
    }

    if (record.subject && candidate.subject === record.subject) {
      return true;
    }

    if (record.locationName && candidate.locationName === record.locationName) {
      return true;
    }

    return false;
  });

  return matches.slice(0, 4).map((candidate) => ({
    title: getManifestPageTitle(candidate),
    href: getManifestRoutePath(candidate),
    description: buildPrimaryDescription(candidate),
  }));
}

export function getManifestRelatedLinks(record: ManifestPageRecord) {
  const directLinks = getManifestInternalLinks(record);

  if (directLinks.length >= 4) {
    return directLinks.slice(0, 4);
  }

  const related = findRelatedManifestPages(record);
  const combined = [...directLinks];

  for (const item of related) {
    if (!combined.some((entry) => entry.href === item.href)) {
      combined.push(item);
    }
  }

  return combined.slice(0, 6);
}

export function getManifestDescriptorItems(record: ManifestPageRecord) {
  return [
    record.board ? `Board: ${record.board.toUpperCase()}` : null,
    record.classLabel ? `Class: ${record.classLabel}` : null,
    record.subject ? `Subject: ${titleCase(record.subject)}` : null,
    record.locationType ? `Location type: ${titleCase(record.locationType)}` : null,
    record.locationName ? `Location: ${record.locationName}` : null,
    record.priority ? `Priority: ${record.priority}` : null,
  ].filter(Boolean) as string[];
}

export function getManifestFeatureCards(record: ManifestPageRecord) {
  const uniqueness = splitUniquenessBlock(record.uniquenessBlock);
  const firstThree = uniqueness.slice(0, 3);

  if (firstThree.length) {
    return firstThree.map((item) => ({
      title: humanizeSlug(item),
      description: `${humanizeSlug(item)} is kept visible on this page so the route does not drift into generic, interchangeable copy.`,
    }));
  }

  return [
    {
      title: "Search intent aware",
      description: `This page is framed for ${record.searchIntent ?? "the right"} intent while staying aligned to the existing BoardPeFocus conversion flow.`,
    },
    {
      title: "Manifest linked",
      description: "Parent hub and related links are resolved from the Excel manifest instead of being guessed page by page.",
    },
    {
      title: "Native to the site",
      description: "The layout, CTAs, spacing rhythm, and metadata stay consistent with the current frontend system.",
    },
  ];
}

export function getManifestAudienceCards(record: ManifestPageRecord) {
  const keyword = getManifestPageTitle(record);
  const locationLabel = record.locationName ? ` in ${record.locationName}` : "";

  return [
    {
      title: "When this route helps most",
      description: `${keyword} is most useful when the family already knows the core pressure point${locationLabel} and wants a cleaner next step than a generic directory path.`,
    },
    {
      title: "How it should be used",
      description: "This route is designed to connect naturally into boards, classes, resources, schools, sectors, societies, and contact paths without duplicating existing hubs.",
    },
    {
      title: "Why the copy stays specific",
      description: record.uniquenessBlock
        ? `The uniqueness block for this route centers on ${splitUniquenessBlock(record.uniquenessBlock).slice(0, 3).join(", ")}.`
        : "The page stays specific through board, class, subject, location, and search-intent metadata from the spreadsheet.",
    },
  ];
}

export function getManifestSections(record: ManifestPageRecord): GeneratedSection[] {
  const uniqueness = splitUniquenessBlock(record.uniquenessBlock);
  const internalLinks = getManifestInternalLinks(record);
  const descriptorItems = getManifestDescriptorItems(record);
  const pageTitle = getManifestPageTitle(record);
  const locationLine = record.locationName ? ` for ${record.locationName}` : "";

  return [
    {
      title: `Why ${pageTitle} exists on BoardPeFocus`,
      paragraphs: [
        buildPrimaryDescription(record),
        `The route is generated from the Excel manifest so that ${pageTitle.toLowerCase()} fits the existing BoardPeFocus information architecture instead of behaving like a detached campaign page.`,
      ],
      bullets: descriptorItems,
    },
    {
      title: "What makes this page specific",
      paragraphs: [
        record.contentAngle
          ? record.contentAngle
          : `This route is shaped around ${pageTitle.toLowerCase()}${locationLine}, with section focus adjusted by category, search intent, and parent-hub context.`,
        `The page avoids fabricated results, fake affiliations, and weak filler. It leans on the route metadata to stay distinct from sibling pages while preserving the current premium white-first design language.`,
      ],
      bullets: uniqueness.length
        ? uniqueness
        : [
            "Board, class, subject, and location context stay visible where available.",
            "Internal links are kept local when equivalent BoardPeFocus routes exist.",
            "Indexation is handled conservatively when the sheet asks for proof before indexing.",
          ],
    },
    {
      title: "How to move forward from here",
      paragraphs: [
        `The cleanest next step after this page depends on whether the user still needs discovery, wants a deeper informational read, or is ready to move into a service conversation.`,
        internalLinks.length
          ? "The related links below are resolved directly from the workbook's parent-hub and linking columns, so the page stays connected to the broader route graph."
          : "Where the spreadsheet does not provide a safe local equivalent, the page skips the external destination instead of sending users away from the site.",
      ],
      bullets: internalLinks.map((link) => `${link.title}: ${link.href}`),
    },
  ];
}

export function getManifestFaqs(record: ManifestPageRecord): GeneratedFaqItem[] {
  const keyword = getManifestPageTitle(record);
  const boardLabel = record.board ? record.board.toUpperCase() : "this route";
  const locationLabel = record.locationName ? ` in ${record.locationName}` : " in Gurugram";

  return [
    {
      question: `Who is ${keyword.toLowerCase()} most relevant for?`,
      answer: `${keyword} is intended for families or students who are already searching around ${boardLabel}, the current class or subject context, and the next most useful page path${locationLabel}.`,
    },
    {
      question: "Does this page replace an existing BoardPeFocus hub?",
      answer: "No. The route is designed to extend the current site structure without replacing completed hubs, existing template families, or the current navigation flow.",
    },
    {
      question: "How does BoardPeFocus keep this page distinct from similar routes?",
      answer: record.uniquenessBlock
        ? `The page follows the manifest's uniqueness direction: ${splitUniquenessBlock(record.uniquenessBlock).slice(0, 3).join(", ")}.`
        : "The page stays differentiated through the board, class, subject, location, internal-link, and search-intent metadata stored in the manifest.",
    },
  ];
}

export function getManifestLeadDefaults(record: ManifestPageRecord) {
  return {
    board: record.board ? record.board.toUpperCase() : undefined,
    class: record.classLabel ?? undefined,
    subject: record.subject ? titleCase(record.subject) : undefined,
    school: record.routeFamily === "school_service" ? getManifestPageTitle(record) : undefined,
    location: record.locationName ?? undefined,
  };
}

export function isEditorialManifestPage(record: ManifestPageRecord) {
  return (
    record.category === "resource_page" ||
    record.category === "concept_page" ||
    record.routeFamily === "guides" ||
    record.routeFamily === "resources_deep"
  );
}

export function getManifestEyebrow(record: ManifestPageRecord) {
  return getBadgeLabel(record) || "Generated Page";
}

export function getManifestBreadcrumbs(record: ManifestPageRecord) {
  const segments = getSegments(getManifestRoutePath(record));
  const crumbs: Array<{ label: string; href?: string }> = [{ label: "Home", href: "/" }];

  if (!segments.length) {
    return crumbs;
  }

  let path = "";
  segments.forEach((segment, index) => {
    path += `/${segment}`;
    const isLast = index === segments.length - 1;
    crumbs.push({
      label: isLast ? getManifestPageTitle(record) : humanizeSlug(segment),
      href: isLast ? undefined : path,
    });
  });

  return crumbs;
}

export function buildManifestJsonLd(record: ManifestPageRecord) {
  const schema = record.suggestedSchema?.toLowerCase();
  const title = getManifestPageTitle(record);
  const description = getManifestMetaDescription(record);
  const base = {
    "@context": "https://schema.org",
    name: title,
    headline: title,
    description,
    url: absoluteUrl(getManifestRoutePath(record)),
  };

  if (schema === "service") {
    return {
      ...base,
      "@type": "Service",
      areaServed: record.locationName ?? "Gurugram, Haryana, India",
      provider: {
        "@type": "EducationalOrganization",
        name: "BoardPeFocus",
        url: absoluteUrl("/"),
      },
      serviceType: title,
    };
  }

  if (schema === "article") {
    return {
      ...base,
      "@type": "Article",
      author: {
        "@type": "Organization",
        name: "BoardPeFocus",
      },
      publisher: {
        "@type": "Organization",
        name: "BoardPeFocus",
        url: absoluteUrl("/"),
      },
      datePublished: "2026-04-22",
      dateModified: "2026-04-22",
    };
  }

  if (schema === "collectionpage") {
    return {
      ...base,
      "@type": "CollectionPage",
    };
  }

  if (schema === "localbusiness") {
    return {
      ...base,
      "@type": "LocalBusiness",
      areaServed: record.locationName ?? "Gurugram, Haryana, India",
    };
  }

  return {
    ...base,
    "@type": "WebPage",
  };
}
