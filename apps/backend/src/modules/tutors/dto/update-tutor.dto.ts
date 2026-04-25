import { TutorStatus } from '@boardpefocus/database';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
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
    if (normalized === 'true') {
      return true;
    }
    if (normalized === 'false') {
      return false;
    }
  }

  return undefined;
}

export class UpdateTutorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  methodology?: string;

  @IsOptional()
  @IsString()
  teachingMethod?: string;

  @IsOptional()
  @IsString()
  seoTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  canonical?: string;

  @IsOptional()
  @IsString()
  ogTitle?: string;

  @IsOptional()
  @IsString()
  ogDescription?: string;

  @IsOptional()
  @IsString()
  ogImage?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  experienceYrs?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  studentsTaught?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  hourlyRateMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  hourlyRateMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  reviewsCount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priority?: number;

  @IsOptional()
  @Transform(({ value }) => toOptionalBoolean(value))
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @Transform(({ value }) => toOptionalBoolean(value))
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsEnum(TutorStatus)
  status?: TutorStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  boardIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjectIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  classLevelIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  schoolIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sectorIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  societyIds?: string[];

  @IsOptional()
  @IsArray()
  qualifications?: Array<{
    degree?: string;
    institution?: string;
    year?: number | null;
  }>;

  @IsOptional()
  @IsArray()
  achievements?: Array<{
    title?: string;
    description?: string | null;
    year?: number | null;
  }>;

  @IsOptional()
  @IsArray()
  faqs?: Array<{
    question?: string;
    answer?: string;
    order?: number | null;
  }>;
}
