import { TutorApplication } from "@boardpefocus/types";

export const tutorApplicationStatusOptions = [
  "NEW",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "APPROVED",
  "REJECTED",
  "ARCHIVED",
  "PUBLISHED",
] as const;

function listToText(value?: string[] | null) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function splitLines(value?: string | null) {
  return String(value ?? "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function cleanOptionalString(value: unknown) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : null;
}

function cleanOptionalNumber(value: unknown) {
  if (value === undefined || value === null || value === "") return null;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

export const emptyTutorApplication = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  currentLocation: "",
  gender: "",
  experienceYears: 0,
  highestQualification: "",
  universityInstitution: "",
  subjectsHandledText: "",
  boardsHandledText: "",
  classesHandledText: "",
  preferredTeachingMode: "",
  areasWillingToServeText: "",
  schoolsFamiliarWithText: "",
  professionalBio: "",
  teachingApproach: "",
  availability: "",
  expectedFeeMin: "",
  expectedFeeMax: "",
  demoClassWilling: false,
  boardExamSpecialization: "",
  languageFluencyText: "",
  priorResults: "",
  portfolioLinksText: "",
  referenceDetails: "",
  resumeUrl: "",
  profilePhotoUrl: "",
  supportingDocumentUrlsText: "",
  consentAccepted: false,
  contactConsent: false,
  source: "",
  pageUrl: "",
  campaignParams: {},
  status: "NEW",
  adminNotes: "",
  mappedBoardIds: [] as string[],
  mappedSubjectIds: [] as string[],
  mappedClassLevelIds: [] as string[],
  mappedSchoolIds: [] as string[],
  mappedSectorIds: [] as string[],
  mappedSocietyIds: [] as string[],
  publishedTutor: null as TutorApplication["publishedTutor"] | null,
  createdAt: "",
  updatedAt: "",
  reviewedAt: null as string | null,
  publishedAt: null as string | null,
};

export function normalizeTutorApplicationForForm(data: any) {
  return {
    ...emptyTutorApplication,
    ...data,
    gender: data.gender ?? "",
    subjectsHandledText: listToText(data.subjectsHandled),
    boardsHandledText: listToText(data.boardsHandled),
    classesHandledText: listToText(data.classesHandled),
    areasWillingToServeText: listToText(data.areasWillingToServe),
    schoolsFamiliarWithText: listToText(data.schoolsFamiliarWith),
    languageFluencyText: listToText(data.languageFluency),
    portfolioLinksText: listToText(data.portfolioLinks),
    supportingDocumentUrlsText: listToText(data.supportingDocumentUrls),
    expectedFeeMin:
      data.expectedFeeMin === null || data.expectedFeeMin === undefined
        ? ""
        : String(data.expectedFeeMin),
    expectedFeeMax:
      data.expectedFeeMax === null || data.expectedFeeMax === undefined
        ? ""
        : String(data.expectedFeeMax),
    boardExamSpecialization: data.boardExamSpecialization ?? "",
    priorResults: data.priorResults ?? "",
    referenceDetails: data.referenceDetails ?? "",
    resumeUrl: data.resumeUrl ?? "",
    profilePhotoUrl: data.profilePhotoUrl ?? "",
    source: data.source ?? "",
    pageUrl: data.pageUrl ?? "",
    adminNotes: data.adminNotes ?? "",
    mappedBoardIds: Array.isArray(data.mappedBoardIds)
      ? data.mappedBoardIds
      : [],
    mappedSubjectIds: Array.isArray(data.mappedSubjectIds)
      ? data.mappedSubjectIds
      : [],
    mappedClassLevelIds: Array.isArray(data.mappedClassLevelIds)
      ? data.mappedClassLevelIds
      : [],
    mappedSchoolIds: Array.isArray(data.mappedSchoolIds)
      ? data.mappedSchoolIds
      : [],
    mappedSectorIds: Array.isArray(data.mappedSectorIds)
      ? data.mappedSectorIds
      : [],
    mappedSocietyIds: Array.isArray(data.mappedSocietyIds)
      ? data.mappedSocietyIds
      : [],
  };
}

export function buildTutorApplicationPayload(application: any) {
  return {
    fullName: cleanOptionalString(application.fullName),
    phone: cleanOptionalString(application.phone),
    email: cleanOptionalString(application.email),
    city: cleanOptionalString(application.city),
    currentLocation: cleanOptionalString(application.currentLocation),
    gender: cleanOptionalString(application.gender),
    experienceYears: Number(application.experienceYears) || 0,
    highestQualification: cleanOptionalString(application.highestQualification),
    universityInstitution: cleanOptionalString(
      application.universityInstitution,
    ),
    subjectsHandled: splitLines(application.subjectsHandledText),
    boardsHandled: splitLines(application.boardsHandledText),
    classesHandled: splitLines(application.classesHandledText),
    preferredTeachingMode: cleanOptionalString(
      application.preferredTeachingMode,
    ),
    areasWillingToServe: splitLines(application.areasWillingToServeText),
    schoolsFamiliarWith: splitLines(application.schoolsFamiliarWithText),
    professionalBio: cleanOptionalString(application.professionalBio),
    teachingApproach: cleanOptionalString(application.teachingApproach),
    availability: cleanOptionalString(application.availability),
    expectedFeeMin: cleanOptionalNumber(application.expectedFeeMin),
    expectedFeeMax: cleanOptionalNumber(application.expectedFeeMax),
    demoClassWilling: Boolean(application.demoClassWilling),
    boardExamSpecialization: cleanOptionalString(
      application.boardExamSpecialization,
    ),
    languageFluency: splitLines(application.languageFluencyText),
    priorResults: cleanOptionalString(application.priorResults),
    portfolioLinks: splitLines(application.portfolioLinksText),
    referenceDetails: cleanOptionalString(application.referenceDetails),
    resumeUrl: cleanOptionalString(application.resumeUrl),
    profilePhotoUrl: cleanOptionalString(application.profilePhotoUrl),
    supportingDocumentUrls: splitLines(application.supportingDocumentUrlsText),
    consentAccepted: Boolean(application.consentAccepted),
    contactConsent: Boolean(application.contactConsent),
    source: cleanOptionalString(application.source),
    pageUrl: cleanOptionalString(application.pageUrl),
    adminNotes: cleanOptionalString(application.adminNotes),
    status: application.status,
    mappedBoardIds: application.mappedBoardIds ?? [],
    mappedSubjectIds: application.mappedSubjectIds ?? [],
    mappedClassLevelIds: application.mappedClassLevelIds ?? [],
    mappedSchoolIds: application.mappedSchoolIds ?? [],
    mappedSectorIds: application.mappedSectorIds ?? [],
    mappedSocietyIds: application.mappedSocietyIds ?? [],
  };
}

export function getTutorApplicationStatusClasses(status: string) {
  const variants: Record<string, string> = {
    NEW: "bg-slate-100 text-slate-700 border-slate-200",
    UNDER_REVIEW: "bg-blue-50 text-blue-700 border-blue-200",
    SHORTLISTED: "bg-violet-50 text-violet-700 border-violet-200",
    APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
    ARCHIVED: "bg-slate-200 text-slate-700 border-slate-300",
    PUBLISHED: "bg-green-50 text-green-700 border-green-200",
  };

  return variants[status] ?? variants.NEW;
}
