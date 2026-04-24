import { PageStatus } from '@boardpefocus/database';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePageDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(PageStatus)
  status?: PageStatus;
}
