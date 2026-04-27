export interface Board {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
}

export interface School {
  id: string;
  name: string;
  slug: string;
  address?: string;
  city: string;
  boards: string[];
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  type: "sector" | "society";
  parentId?: string;
}

export interface Tutor {
  id: string;
  name: string;
  slug: string;
  photoUrl?: string;
  rating: number;
  experienceYears: number;
  studentsTaught: number;
  subjects: string[];
  boards: string[];
  about: string;
  teachingPhilosophy?: string;
  methodology?: string;
  schools?: string[];
  areas?: string[];
  results?: {
    label: string;
    value: string;
  }[];
  reviews?: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
    location: string;
  }[];
}

export interface Lead {
  name: string;
  email?: string;
  phone: string;
  board?: string;
  class?: string;
  subject?: string;
  school?: string;
  location?: string;
  preferredMode?: string;
  preferredTimeSlot?: string;
  message?: string;
}

export interface TutorApplicationPayload {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  currentLocation: string;
  gender?: string;
  experienceYears: number;
  highestQualification: string;
  universityInstitution: string;
  subjectsHandled: string[];
  boardsHandled: string[];
  classesHandled: string[];
  preferredTeachingMode: string;
  areasWillingToServe: string[];
  schoolsFamiliarWith?: string[];
  professionalBio: string;
  teachingApproach: string;
  availability: string;
  expectedFeeMin?: number;
  expectedFeeMax?: number;
  demoClassWilling?: boolean;
  boardExamSpecialization?: string;
  languageFluency?: string[];
  priorResults?: string;
  portfolioLinks?: string[];
  referenceDetails?: string;
  resumeUrl?: string;
  profilePhotoUrl?: string;
  supportingDocumentUrls?: string[];
  consentAccepted: boolean;
  contactConsent: boolean;
  source?: string;
  pageUrl?: string;
  campaignParams?: Record<string, string>;
}

export interface TutorApplicationSubmissionResponse {
  success: boolean;
  id: string;
  status: string;
}
