import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Max,
  Min,
} from 'class-validator';

function toOptionalBoolean(value: unknown): boolean | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }

  return undefined;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean);
}

export class CreateTutorApplicationDto {
  @IsString()
  fullName: string;

  @IsString()
  @Matches(/^\+?[0-9\s-]{10,15}$/, {
    message: 'Phone number must be 10 to 15 digits.',
  })
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  city: string;

  @IsString()
  currentLocation: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(60)
  experienceYears: number;

  @IsString()
  highestQualification: string;

  @IsString()
  universityInstitution: string;

  @Transform(({ value }) => toStringArray(value))
  @IsArray()
  @IsString({ each: true })
  subjectsHandled: string[];

  @Transform(({ value }) => toStringArray(value))
  @IsArray()
  @IsString({ each: true })
  boardsHandled: string[];

  @Transform(({ value }) => toStringArray(value))
  @IsArray()
  @IsString({ each: true })
  classesHandled: string[];

  @IsString()
  preferredTeachingMode: string;

  @Transform(({ value }) => toStringArray(value))
  @IsArray()
  @IsString({ each: true })
  areasWillingToServe: string[];

  @IsOptional()
  @Transform(({ value }) => toStringArray(value))
  @IsArray()
  @IsString({ each: true })
  schoolsFamiliarWith?: string[];

  @IsString()
  professionalBio: string;

  @IsString()
  teachingApproach: string;

  @IsString()
  availability: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  expectedFeeMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  expectedFeeMax?: number;

  @IsOptional()
  @Transform(({ value }) => toOptionalBoolean(value))
  @IsBoolean()
  demoClassWilling?: boolean;

  @IsOptional()
  @IsString()
  boardExamSpecialization?: string;

  @IsOptional()
  @Transform(({ value }) => toStringArray(value))
  @IsArray()
  @IsString({ each: true })
  languageFluency?: string[];

  @IsOptional()
  @IsString()
  priorResults?: string;

  @IsOptional()
  @Transform(({ value }) => toStringArray(value))
  @IsArray()
  @IsUrl({}, { each: true })
  portfolioLinks?: string[];

  @IsOptional()
  @IsString()
  referenceDetails?: string;

  @IsOptional()
  @IsUrl()
  resumeUrl?: string;

  @IsOptional()
  @IsUrl()
  profilePhotoUrl?: string;

  @IsOptional()
  @Transform(({ value }) => toStringArray(value))
  @IsArray()
  @IsUrl({}, { each: true })
  supportingDocumentUrls?: string[];

  @Transform(({ value }) => toOptionalBoolean(value))
  @IsBoolean()
  consentAccepted: boolean;

  @Transform(({ value }) => toOptionalBoolean(value))
  @IsBoolean()
  contactConsent: boolean;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  pageUrl?: string;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  campaignParams?: Record<string, string>;
}
