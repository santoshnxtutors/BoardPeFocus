export interface TutorBoardReference {
  board?: {
    id?: string;
    name?: string;
  };
}

export interface TutorSchoolReference {
  school?: {
    name?: string;
  };
}

export interface TutorReviewItem {
  id: string;
  parentName: string;
  studentName?: string;
  rating: number;
  comment: string;
}

export interface TutorFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TutorProfileViewModel {
  slug?: string;
  name: string;
  photoUrl?: string;
  isVerified?: boolean;
  rating: number;
  reviewsCount: number;
  experienceYrs: number;
  studentsTaught: number;
  tagline?: string;
  about: string;
  methodology?: string;
  boards?: Array<string | TutorBoardReference>;
  subjects?: string[];
  schools?: Array<string | TutorSchoolReference>;
  reviews?: TutorReviewItem[];
  faqs?: TutorFaqItem[];
}
