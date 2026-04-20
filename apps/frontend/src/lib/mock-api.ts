import { promises as fs } from "fs";
import path from "path";
import {
  mockBoards,
  mockSchools,
  mockSectors,
  mockSubjects,
  mockTutors,
} from "@/data/mock";

function toId(slug: string) {
  return slug;
}

export function getBoards() {
  return mockBoards.map((board) => ({
    id: toId(board.slug),
    slug: board.slug,
    name: board.name,
    description: board.description,
  }));
}

export function getBoard(slug: string) {
  return getBoards().find((board) => board.slug === slug) ?? null;
}

export function getSchools() {
  return mockSchools.map((school) => ({
    id: toId(school.slug),
    slug: school.slug,
    name: school.name,
    address: school.location,
    city: "Gurugram",
    boards: school.boards,
  }));
}

export function getLocations() {
  const sectors = mockSectors.map((sector) => ({
    id: toId(sector.slug),
    slug: sector.slug,
    name: sector.name,
    type: "sector" as const,
  }));

  const societies = mockSectors.flatMap((sector) =>
    sector.societies.map((society) => ({
      id: toId(`${sector.slug}-${society.toLowerCase().replace(/\s+/g, "-")}`),
      slug: society.toLowerCase().replace(/\s+/g, "-"),
      name: society,
      type: "society" as const,
      parentId: sector.slug,
    })),
  );

  return [...sectors, ...societies];
}

export function getTutors(filters?: {
  q?: string | null;
  board?: string | null;
  subject?: string | null;
}) {
  const q = filters?.q?.trim().toLowerCase() ?? "";
  const board = filters?.board?.trim().toLowerCase() ?? "";
  const subject = filters?.subject?.trim().toLowerCase() ?? "";

  return mockTutors
    .filter((tutor) => {
      const matchesQuery =
        !q ||
        tutor.name.toLowerCase().includes(q) ||
        tutor.subjects.some((item) => item.toLowerCase().includes(q)) ||
        tutor.boards.some((item) => item.toLowerCase().includes(q)) ||
        tutor.schools.some((item) => item.toLowerCase().includes(q));

      const matchesBoard =
        !board ||
        tutor.boards.some((item) => item.toLowerCase() === board) ||
        tutor.boards.some((item) => item.toLowerCase().replace(/\s+/g, "-") === board);

      const matchesSubject =
        !subject ||
        tutor.subjects.some((item) => item.toLowerCase() === subject) ||
        tutor.subjects.some((item) => item.toLowerCase().replace(/\s+/g, "-") === subject);

      return matchesQuery && matchesBoard && matchesSubject;
    })
    .map((tutor) => ({
      id: tutor.id,
      slug: tutor.slug,
      name: tutor.name,
      photoUrl: tutor.photoUrl,
      rating: tutor.rating,
      experienceYears: tutor.experienceYrs,
      studentsTaught: tutor.studentsTaught,
      subjects: tutor.subjects,
      boards: tutor.boards,
      about: tutor.about,
      methodology: tutor.methodology,
      schools: tutor.schools,
      areas: tutor.locations,
      results: [
        { label: "Top Score", value: "95%+" },
        { label: "Experience", value: `${tutor.experienceYrs} years` },
      ],
    }));
}

export function getTutor(slug: string) {
  return getTutors().find((tutor) => tutor.slug === slug) ?? null;
}

export function getSubjects() {
  return mockSubjects.map((subject) => ({
    id: toId(subject.slug),
    slug: subject.slug,
    name: subject.name,
  }));
}

export async function saveLead(payload: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), ".data");
  const leadsFile = path.join(dataDir, "leads.ndjson");
  await fs.mkdir(dataDir, { recursive: true });

  const id = `lead_${Date.now()}`;
  const record = {
    id,
    ...payload,
    createdAt: new Date().toISOString(),
  };

  await fs.appendFile(leadsFile, `${JSON.stringify(record)}\n`, "utf8");

  return { success: true, id };
}
