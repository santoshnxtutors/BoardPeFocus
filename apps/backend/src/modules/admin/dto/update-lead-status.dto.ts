import { LeadStatus } from '@boardpefocus/database';
import { IsEnum } from 'class-validator';

export class UpdateLeadStatusDto {
  @IsEnum(LeadStatus)
  status: LeadStatus;
}
