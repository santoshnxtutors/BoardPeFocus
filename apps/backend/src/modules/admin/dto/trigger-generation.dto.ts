import { IsNotEmpty, IsString } from 'class-validator';

export class TriggerGenerationDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}
