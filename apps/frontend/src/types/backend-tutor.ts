export interface BackendTutorEntity {
  id?: string;
  name?: string;
  slug?: string;
}

export interface BackendTutorBoardRelation {
  board?: BackendTutorEntity;
  name?: string;
}

export interface BackendTutorSubjectRelation {
  subject?: BackendTutorEntity;
  name?: string;
}

export interface BackendTutorSchoolRelation {
  school?: BackendTutorEntity;
  name?: string;
}

export interface BackendTutorLocationRelation {
  sector?: BackendTutorEntity;
  society?: BackendTutorEntity;
  name?: string;
}

export interface BackendTutorReview {
  id?: string | number;
  parentName?: string;
  studentName?: string;
  rating?: number;
  comment?: string;
}

export interface BackendTutorFaq {
  id?: string | number;
  question?: string;
  answer?: string;
}

export interface BackendTutorResult {
  label?: string;
  value?: string;
}

export interface BackendTutorPayload {
  id: string;
  slug: string;
  displayName?: string;
  name?: string;
  photoUrl?: string;
  rating?: number;
  reviewsCount?: number;
  experienceYears?: number;
  experienceYrs?: number;
  studentsTaught?: number;
  about?: string;
  bio?: string;
  tagline?: string;
  teachingPhilosophy?: string;
  teachingMethod?: string;
  methodology?: string;
  boards?: Array<string | BackendTutorBoardRelation>;
  subjects?: Array<string | BackendTutorSubjectRelation>;
  schools?: Array<string | BackendTutorSchoolRelation>;
  areas?: string[];
  locations?: Array<string | BackendTutorLocationRelation>;
  coverage?: {
    sectors?: string[];
    societies?: string[];
  };
  results?: BackendTutorResult[];
  reviews?: BackendTutorReview[];
  faqs?: BackendTutorFaq[];
}
