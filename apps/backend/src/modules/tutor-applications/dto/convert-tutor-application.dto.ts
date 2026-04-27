import { TutorStatus } from '@boardpefocus/database';
import { IsEnum, IsOptional } from 'class-validator';

export class ConvertTutorApplicationDto {
  @IsOptional()
  @IsEnum(TutorStatus)
  tutorStatus?: TutorStatus;
}
