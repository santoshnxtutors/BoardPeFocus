import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export const ADMIN_USER_ROLES = ['SUPERADMIN', 'ADMIN', 'EDITOR', 'MODERATOR'] as const;

export class CreateAdminUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsIn(ADMIN_USER_ROLES)
  role: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
