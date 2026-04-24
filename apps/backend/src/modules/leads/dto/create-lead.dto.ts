import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  board?: string;

  @IsString()
  @IsOptional()
  class?: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsOptional()
  school?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  preferredMode?: string;

  @IsString()
  @IsOptional()
  preferredTimeSlot?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  pageUrl?: string;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  campaignParams?: Record<string, string>;
}
