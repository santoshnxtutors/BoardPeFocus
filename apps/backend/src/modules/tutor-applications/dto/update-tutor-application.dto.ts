import { PartialType } from '@nestjs/swagger';
import { TutorApplicationStatus } from '@boardpefocus/database';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateTutorApplicationDto } from './create-tutor-application.dto';

export class UpdateTutorApplicationDto extends PartialType(
  CreateTutorApplicationDto,
) {
  @IsOptional()
  @IsEnum(TutorApplicationStatus)
  status?: TutorApplicationStatus;

  @IsOptional()
  @IsString()
  adminNotes?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mappedBoardIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mappedSubjectIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mappedClassLevelIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mappedSchoolIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mappedSectorIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mappedSocietyIds?: string[];
}
