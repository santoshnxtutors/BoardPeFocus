import { mockTutors } from "@/data/mock";
import { fetchBackend } from "@/lib/backend-api";
import { Tutor } from "@/types";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeNameList(items: unknown, relationKey: "board" | "subject" | "school") {
  return (Array.isArray(items) ? items : [])
    .map((item: any) => {
      if (typeof item === "string") return item;
      return item?.[relationKey]?.name ?? item?.name ?? null;
    })
    .filter(Boolean) as string[];
}

function normalizeLocationList(items: unknown) {
  return (Array.isArray(items) ? items : [])
    .map((item: any) => {
      if (typeof item === "string") return item;
      return item?.sector?.name ?? item?.society?.name ?? item?.name ?? null;
    })
    .filter(Boolean) as string[];
}

export function normalizeTutorCard(rawTutor: any): Tutor {
  const boards = normalizeNameList(rawTutor.boards, "board");
  const subjects = normalizeNameList(rawTutor.subjects, "subject");
  const schools = normalizeNameList(rawTutor.schools, "school");
  const areas =
    rawTutor.areas ??
    rawTutor.locations ??
    normalizeLocationList(rawTutor.locations);

  return {
    id: rawTutor.id,
    slug: rawTutor.slug,
    name: rawTutor.displayName || rawTutor.name,
    photoUrl: rawTutor.photoUrl || undefined,
    rating: Number(rawTutor.rating ?? 0),
    experienceYears: Number(rawTutor.experienceYears ?? rawTutor.experienceYrs ?? 0),
    studentsTaught: Number(rawTutor.studentsTaught ?? 0),
    subjects,
    boards,
    about:
      rawTutor.about ||
      rawTutor.bio ||
      rawTutor.tagline ||
      `${rawTutor.displayName || rawTutor.name} is a BoardPeFocus tutor in Gurugram.`,
    teachingPhilosophy: rawTutor.teachingPhilosophy || rawTutor.teachingMethod,
    methodology: rawTutor.methodology || rawTutor.teachingMethod,
    schools,
    areas: Array.isArray(areas) ? normalizeLocationList(areas) : [],
    results: rawTutor.results,
    reviews: rawTutor.reviews,
  };
}

function normalizeMockTutor(tutor: (typeof mockTutors)[number]): Tutor {
  return {
    ...tutor,
    experienceYears: tutor.experienceYrs,
    studentsTaught: tutor.studentsTaught,
    areas: tutor.locations,
    about: tutor.about || "",
  };
}

function mergeTutors(liveTutors: Tutor[], fallbackTutors: Tutor[]) {
  const bySlug = new Map<string, Tutor>();

  for (const tutor of liveTutors) {
    bySlug.set(tutor.slug, tutor);
  }

  for (const tutor of fallbackTutors) {
    if (!bySlug.has(tutor.slug)) {
      bySlug.set(tutor.slug, tutor);
    }
  }

  return Array.from(bySlug.values());
}

export async function getLiveTutorCards() {
  try {
    const response = await fetchBackend("/public/tutors");
    if (!response.ok) return [];

    const rawTutors = await response.json();
    return (Array.isArray(rawTutors) ? rawTutors : []).map(normalizeTutorCard);
  } catch {
    return [];
  }
}

export async function getPublicTutorCards() {
  const liveTutors = await getLiveTutorCards();
  return mergeTutors(liveTutors, mockTutors.map(normalizeMockTutor));
}

export function tutorMatchesFilters(
  tutor: Tutor,
  filters: { query?: string; board?: string; subject?: string },
) {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const board = filters.board?.trim().toLowerCase() ?? "";
  const subject = filters.subject?.trim().toLowerCase() ?? "";

  const matchesQuery =
    !query ||
    tutor.name.toLowerCase().includes(query) ||
    tutor.subjects.some((item) => item.toLowerCase().includes(query)) ||
    tutor.boards.some((item) => item.toLowerCase().includes(query)) ||
    (tutor.schools ?? []).some((item) => item.toLowerCase().includes(query));

  const matchesBoard =
    !board ||
    tutor.boards.some((item) => {
      const normalized = item.toLowerCase();
      return normalized === board || slugify(normalized) === board;
    });

  const matchesSubject =
    !subject ||
    tutor.subjects.some((item) => {
      const normalized = item.toLowerCase();
      return normalized === subject || slugify(normalized) === subject;
    });

  return matchesQuery && matchesBoard && matchesSubject;
}
