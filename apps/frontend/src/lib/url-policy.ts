export interface UrlPolicyRecord {
  normalizedPath: string;
  routeFamily?: string | null;
  primaryKeyword?: string | null;
}

export interface UrlPolicyRedirect {
  source: string;
  destination: string;
  statusCode: 301;
}

const LOCAL_COMMERCIAL_ROUTE_FAMILIES = new Set([
  "sector_detail",
  "school_service",
  "society_service",
]);

export function normalizeUrlPathname(pathname: string) {
  const value = pathname.trim();
  if (!value) {
    return "/";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  const normalized = withLeadingSlash.replace(/\/+/g, "/").toLowerCase();

  if (normalized.length > 1 && normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }

  return normalized;
}

function replaceLastSegment(pathname: string, replace: (segment: string) => string) {
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) {
    return pathname;
  }

  segments[segments.length - 1] = replace(segments[segments.length - 1]);
  return `/${segments.join("/")}`;
}

function canonicalizeLocalCommercialSegment(segment: string) {
  if (segment === "home-tuition") {
    return "home-tutors";
  }

  if (segment.endsWith("-home-tuition")) {
    return segment.replace(/-home-tuition$/, "-home-tutor");
  }

  if (segment.endsWith("-tuition")) {
    return segment.replace(/-tuition$/, "-home-tutor");
  }

  return segment;
}

export function getCanonicalCommercialPath(record: UrlPolicyRecord) {
  const pathname = normalizeUrlPathname(record.normalizedPath);

  if (record.routeFamily === "boards_subject_service" && pathname.endsWith("-tuition")) {
    return replaceLastSegment(pathname, (segment) =>
      segment.replace(/-tuition$/, "-home-tutor-gurgaon"),
    );
  }

  if (record.routeFamily === "boards_board") {
    return `${pathname}/home-tutors`;
  }

  if (record.routeFamily === "classes_overview") {
    return `${pathname}/home-tutors`;
  }

  if (record.routeFamily === "classes_service" && pathname.endsWith("-tuition")) {
    return replaceLastSegment(pathname, (segment) =>
      segment === "all-subjects-tuition"
        ? "all-subjects-home-tutors-gurgaon"
        : segment.replace(/-tuition$/, "-home-tutor-gurgaon"),
    );
  }

  if (record.routeFamily === "gurugram_support" && pathname === "/gurugram/home-tuition") {
    return "/gurugram/home-tutors";
  }

  if (record.routeFamily === "core_support" && pathname === "/home-tuition") {
    return "/home-tutors";
  }

  if (record.routeFamily === "programs" && pathname.endsWith("premium-home-tuition")) {
    return replaceLastSegment(pathname, (segment) =>
      segment.replace(/premium-home-tuition$/, "premium-home-tutors"),
    );
  }

  if (record.routeFamily && LOCAL_COMMERCIAL_ROUTE_FAMILIES.has(record.routeFamily)) {
    return replaceLastSegment(pathname, canonicalizeLocalCommercialSegment);
  }

  return pathname;
}

export function isCommercialPathRedirect(record: UrlPolicyRecord) {
  return getCanonicalCommercialPath(record) !== normalizeUrlPathname(record.normalizedPath);
}

function titleCase(value: string) {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export function getCommercialManifestTitle(record: UrlPolicyRecord, fallbackTitle: string) {
  const title = record.primaryKeyword ?? fallbackTitle;

  if (!isCommercialPathRedirect(record)) {
    return title;
  }

  if (record.routeFamily === "boards_subject_service" || record.routeFamily === "classes_service") {
    if (/all subjects tuition$/i.test(title)) {
      return title.replace(/all subjects tuition$/i, "All Subjects Home Tutors in Gurgaon");
    }

    return title.replace(/\btuition$/i, "home tutor in Gurgaon");
  }

  if (record.routeFamily === "gurugram_support") {
    return title.replace(/\bhome tuition\b/i, "home tutors");
  }

  if (record.routeFamily === "core_support") {
    return title.replace(/\bhome tuition\b/i, "home tutors");
  }

  if (record.routeFamily === "programs") {
    return title.replace(/\bpremium home tuition\b/i, "premium home tutors");
  }

  if (record.routeFamily === "boards_board" || record.routeFamily === "classes_overview") {
    if (/home tutors/i.test(title)) {
      return title;
    }

    return `${title} Home Tutors`;
  }

  if (record.routeFamily && LOCAL_COMMERCIAL_ROUTE_FAMILIES.has(record.routeFamily)) {
    return title
      .replace(/\bhome tuition\b/i, "home tutors")
      .replace(/\btuition\b/i, "home tutor");
  }

  return titleCase(title);
}

export function getCommercialRedirects(records: UrlPolicyRecord[]): UrlPolicyRedirect[] {
  const redirects = records
    .map((record) => ({
      source: normalizeUrlPathname(record.normalizedPath),
      destination: getCanonicalCommercialPath(record),
      statusCode: 301 as const,
    }))
    .filter((redirect) => redirect.source !== redirect.destination);

  const unique = new Map<string, UrlPolicyRedirect>();
  for (const redirect of redirects) {
    unique.set(redirect.source, redirect);
  }

  return Array.from(unique.values());
}
