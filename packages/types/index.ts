
export type TutorStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
export type PageStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED' | 'SPAM';
export type JobStatus = 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED';
export type DeliveryStatus = 'PENDING' | 'SENT' | 'FAILED' | 'DELIVERED';
export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Board {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description?: string;
  shortDescription?: string;
  longDescription?: string;
  status?: PageStatus;
  seoTitle?: string;
  metaDescription?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassLevel {
  id: string;
  slug: string;
  name: string;
  level?: number;
  description?: string;
  status?: PageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  slug: string;
  name: string;
  description?: string;
  shortDescription?: string;
  longDescription?: string;
  status?: PageStatus;
  seoTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface School {
  id: string;
  slug: string;
  name: string;
  description?: string;
  address?: string;
  website?: string;
  locality?: string;
  curriculumMix?: string;
  safeSupportWording?: string;
  status?: PageStatus;
  seoTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sector {
  id: string;
  slug: string;
  name: string;
  description?: string;
  city?: string;
  corridor?: string;
  status?: PageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Society {
  id: string;
  slug: string;
  name: string;
  sectorId: string;
  description?: string;
  status?: PageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tutor {
  id: string;
  slug: string;
  name: string;
  displayName?: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  tagline?: string;
  bio?: string;
  about?: string;
  methodology?: string;
  teachingMethod?: string;
  experienceYrs: number;
  studentsTaught: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isVerified: boolean;
  status: TutorStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  class?: string;
  subject?: string;
  board?: string;
  location?: string;
  school?: string;
  preferredMode?: string;
  preferredTimeSlot?: string;
  message?: string;
  source?: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
  status: PageStatus;
  visibility: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  category?: string;
  summary?: string;
  body?: string;
  status: PageStatus;
  seoTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResultStory {
  id: string;
  slug: string;
  kind: string;
  title: string;
  parentName?: string;
  studentName?: string;
  context?: string;
  story: string;
  rating?: number;
  scoreLabel?: string;
  status: ReviewStatus;
  visibility: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PageRecord {
  id: string;
  slug: string;
  title: string;
  status: PageStatus;
  templateId?: string;
  boardId?: string;
  subjectId?: string;
  schoolId?: string;
  sectorId?: string;
  societyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SeoMeta {
  id: string;
  pageRecordId: string;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noIndex: boolean;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  altText?: string;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  oldData?: any;
  newData?: any;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}
